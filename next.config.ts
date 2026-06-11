import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Work around a local Windows lock on `.next/trace` by writing build output
  // to a dedicated dist directory instead of the default `.next`.
  distDir: '.next-app',
};

export default nextConfig;
