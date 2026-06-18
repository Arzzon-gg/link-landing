import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const DEFAULT_WIDTH = 860;
const MAX_WIDTH = 1280;
const DEFAULT_QUALITY = 72;
const MIN_QUALITY = 45;
const MAX_QUALITY = 82;
const REMOTE_FETCH_TIMEOUT_MS = 45000;
const IMAGE_CACHE_MAX_ITEMS = 48;
const IMAGE_CACHE_TTL_MS = 1000 * 60 * 60 * 6;

type OutputFormat = 'image/webp' | 'image/jpeg' | 'image/png';
type CachedImageResponse = {
  body: Uint8Array;
  contentType: string;
  byteLength: number;
  cachedAt: number;
};

const optimizedImageCache = new Map<string, CachedImageResponse>();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Missing image URL parameter' },
        { status: 400 }
      );
    }

    const requestedWidth = clampNumber(
      Number.parseInt(searchParams.get('w') ?? '', 10),
      240,
      MAX_WIDTH,
      DEFAULT_WIDTH
    );
    const requestedQuality = clampNumber(
      Number.parseInt(searchParams.get('q') ?? '', 10),
      MIN_QUALITY,
      MAX_QUALITY,
      DEFAULT_QUALITY
    );
    const apiUrl = process.env.CLOUDHUB_API_URL?.trim();

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'Image proxy is not configured' },
        { status: 500 }
      );
    }

    let backendUrl: URL;
    let requestedUrl: URL;

    try {
      backendUrl = new URL(apiUrl);
      requestedUrl = new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid image source' },
        { status: 400 }
      );
    }

    const isBackendOrigin = requestedUrl.origin === backendUrl.origin;
    const isAllowedPath =
      requestedUrl.pathname.startsWith('/restaurant-images/') ||
      requestedUrl.pathname.startsWith('/package-images/');

    if (!isBackendOrigin || !isAllowedPath) {
      return NextResponse.json(
        { error: 'Invalid image source' },
        { status: 403 }
      );
    }

    const requestedFormat = selectRequestedFormat(
      req.headers.get('accept'),
      requestedUrl.pathname
    );
    const cacheKey = buildCacheKey({
      url: requestedUrl.toString(),
      width: requestedWidth,
      quality: requestedQuality,
      format: requestedFormat,
    });
    const cachedImage = getCachedImage(cacheKey);

    if (cachedImage) {
      return createImageResponse(cachedImage.body, cachedImage.contentType, {
        byteLength: cachedImage.byteLength,
        cacheStatus: 'HIT',
      });
    }

    const response = await fetch(requestedUrl, {
      method: 'GET',
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS)',
      },
      signal: AbortSignal.timeout(REMOTE_FETCH_TIMEOUT_MS),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const sourceBuffer = Buffer.from(await response.arrayBuffer());

    if (isSvgAsset(contentType, requestedUrl.pathname)) {
      const svgResponse = {
        body: new Uint8Array(sourceBuffer),
        contentType: 'image/svg+xml',
        byteLength: sourceBuffer.byteLength,
        cachedAt: Date.now(),
      } satisfies CachedImageResponse;

      setCachedImage(cacheKey, svgResponse);

      return createImageResponse(svgResponse.body, svgResponse.contentType, {
        byteLength: svgResponse.byteLength,
        cacheStatus: 'MISS',
      });
    }

    const outputFormat = selectOutputFormat(
      req.headers.get('accept'),
      contentType
    );
    const optimizedBuffer = await optimizeImage({
      buffer: sourceBuffer,
      width: requestedWidth,
      quality: requestedQuality,
      format: outputFormat,
    }).catch(() => sourceBuffer);
    const optimizedResponse = {
      body: new Uint8Array(optimizedBuffer),
      contentType:
        optimizedBuffer === sourceBuffer ? contentType : outputFormat,
      byteLength: optimizedBuffer.byteLength,
      cachedAt: Date.now(),
    } satisfies CachedImageResponse;

    setCachedImage(cacheKey, optimizedResponse);

    return createImageResponse(optimizedResponse.body, optimizedResponse.contentType, {
      byteLength: optimizedResponse.byteLength,
      cacheStatus: 'MISS',
    });
  } catch (error) {
    const staleResponse = getLatestCachedImageForRequest(req.url);

    if (staleResponse) {
      return createImageResponse(staleResponse.body, staleResponse.contentType, {
        byteLength: staleResponse.byteLength,
        cacheStatus: 'STALE',
      });
    }

    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    );
  }
}

function clampNumber(
  value: number,
  min: number,
  max: number,
  fallback: number
) {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, value));
}

function isSvgAsset(contentType: string, pathname: string) {
  return contentType.includes('image/svg') || pathname.toLowerCase().endsWith('.svg');
}

function selectRequestedFormat(
  acceptHeader: string | null,
  pathname: string
): OutputFormat {
  const normalizedAccept = acceptHeader?.toLowerCase() ?? '';
  const normalizedPath = pathname.toLowerCase();

  if (normalizedAccept.includes('image/webp')) {
    return 'image/webp';
  }

  if (normalizedPath.endsWith('.png')) {
    return 'image/png';
  }

  return 'image/jpeg';
}

function selectOutputFormat(
  acceptHeader: string | null,
  sourceContentType: string
): OutputFormat {
  const normalizedAccept = acceptHeader?.toLowerCase() ?? '';

  if (normalizedAccept.includes('image/webp')) {
    return 'image/webp';
  }

  if (sourceContentType.includes('png')) {
    return 'image/png';
  }

  return 'image/jpeg';
}

async function optimizeImage({
  buffer,
  width,
  quality,
  format,
}: {
  buffer: Buffer;
  width: number;
  quality: number;
  format: OutputFormat;
}) {
  const { default: sharp } = await import('sharp');
  const source = sharp(buffer, {
    failOn: 'none',
    sequentialRead: true,
    limitInputPixels: 64 * 1024 * 1024,
  }).rotate();
  const metadata = await source.metadata();
  const targetWidth = metadata.width
    ? Math.min(width, metadata.width, MAX_WIDTH)
    : Math.min(width, MAX_WIDTH);

  const resized = source.resize({
    width: targetWidth,
    fit: 'inside',
    withoutEnlargement: true,
  });

  if (format === 'image/webp') {
    return resized.webp({
      quality,
      effort: 4,
      smartSubsample: true,
    }).toBuffer();
  }

  if (format === 'image/png') {
    return resized.png({
      compressionLevel: 9,
      palette: true,
      effort: 8,
      quality,
    }).toBuffer();
  }

  return resized.jpeg({
    quality,
    mozjpeg: true,
    progressive: true,
  }).toBuffer();
}

function buildCacheKey({
  url,
  width,
  quality,
  format,
}: {
  url: string;
  width: number;
  quality: number;
  format: OutputFormat;
}) {
  return `${url}|w=${width}|q=${quality}|f=${format}`;
}

function getCachedImage(key: string) {
  const cached = optimizedImageCache.get(key);

  if (!cached) {
    return null;
  }

  if (Date.now() - cached.cachedAt > IMAGE_CACHE_TTL_MS) {
    optimizedImageCache.delete(key);
    return null;
  }

  optimizedImageCache.delete(key);
  optimizedImageCache.set(key, cached);

  return cached;
}

function setCachedImage(key: string, value: CachedImageResponse) {
  optimizedImageCache.set(key, value);

  while (optimizedImageCache.size > IMAGE_CACHE_MAX_ITEMS) {
    const firstKey = optimizedImageCache.keys().next().value;

    if (!firstKey) {
      break;
    }

    optimizedImageCache.delete(firstKey);
  }
}

function getLatestCachedImageForRequest(requestUrl: string) {
  const { searchParams } = new URL(requestUrl);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return null;
  }

  const matchingEntries = Array.from(optimizedImageCache.entries())
    .filter(([key, value]) => key.startsWith(`${imageUrl}|`) && Date.now() - value.cachedAt <= IMAGE_CACHE_TTL_MS)
    .sort((left, right) => right[1].cachedAt - left[1].cachedAt);

  return matchingEntries[0]?.[1] ?? null;
}

function createImageResponse(
  body: Uint8Array,
  contentType: string,
  {
    byteLength,
    cacheStatus,
  }: {
    byteLength: number;
    cacheStatus: 'HIT' | 'MISS' | 'STALE';
  }
) {
  const bodyCopy = new Uint8Array(body.byteLength);
  bodyCopy.set(body);
  const responseBody = new Blob([bodyCopy.buffer], { type: contentType });

  return new NextResponse(responseBody, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(byteLength),
      'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
      'CDN-Cache-Control': 'no-store',
      'Netlify-CDN-Cache-Control': 'no-store',
      Pragma: 'no-cache',
      Expires: '0',
      Vary: 'Accept, Accept-Encoding',
      'X-Image-Cache': cacheStatus,
    },
  });
}
