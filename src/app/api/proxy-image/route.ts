import { NextRequest, NextResponse } from 'next/server';

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

    if (requestedUrl.origin !== backendUrl.origin) {
      return NextResponse.json(
        { error: 'Invalid image source' },
        { status: 403 }
      );
    }

    const response = await fetch(requestedUrl, {
      method: 'GET',
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS)',
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(buffer.byteLength),
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    );
  }
}
