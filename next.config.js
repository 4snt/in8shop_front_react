const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";
const hostname = backendUrl ? new URL(backendUrl).hostname : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: hostname ? [hostname] : [],
  },
};

module.exports = nextConfig;
