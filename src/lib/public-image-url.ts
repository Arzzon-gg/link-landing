export function resolvePublicPromotionImageUrl(imageUrl?: string | null) {
  const normalized = imageUrl?.trim();

  if (!normalized) {
    return null;
  }

  if (normalized.startsWith("/images/")) {
    return normalized;
  }

  if (/^https:\/\//i.test(normalized)) {
    return normalized;
  }

  // Restaurant artwork is served through the landing site's image proxy. The
  // proxy resolves and validates the CloudHub origin on the server, so a client
  // carousel does not need access to backend configuration.
  return `/api/proxy-image?path=${encodeURIComponent(normalized)}`;
}
