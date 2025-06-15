import type { NextConfig } from 'next';

const backendUrl = process.env.NEXT_PUBLIC_API_URL || '';
const hostname = backendUrl ? new URL(backendUrl).hostname : '';

const nextConfig: NextConfig = {
  images: {
    domains: hostname ? [hostname] : [],
  },
};

export default nextConfig;
