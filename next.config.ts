import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.cdn4dd.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
