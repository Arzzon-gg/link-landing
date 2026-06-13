import type { NextConfig } from 'next';

// CloudHub backend the embedded Flutter wheel talks to. The browser only ever
// calls our own origin (`/cloudhub/...`); Next.js forwards server-side to the
// real backend, sidestepping CORS and https→http mixed-content blocks.
const cloudHubApiUrl = (
  process.env.CLOUDHUB_API_URL ?? 'http://159.69.240.210:5021'
).replace(/\/+$/, '');

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/cloudhub/:path*',
        destination: `${cloudHubApiUrl}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
