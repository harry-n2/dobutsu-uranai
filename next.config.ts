import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/dobutsu-uranai',
  assetPrefix: '/dobutsu-uranai/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
