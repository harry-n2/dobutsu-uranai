import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = isVercel
  ? {
      images: {
        unoptimized: true,
      },
    }
  : {
      output: 'export',
      basePath: '/dobutsu-uranai',
      assetPrefix: '/dobutsu-uranai/',
      images: {
        unoptimized: true,
      },
      trailingSlash: true,
    };

export default nextConfig;
