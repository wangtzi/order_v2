import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/order_v2',
  assetPrefix: '/order_v2/',
};

export default nextConfig;
