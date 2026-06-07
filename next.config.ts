import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bloxfruitvaluable.com',
          },
        ],
        destination: 'https://www.bloxfruitvaluable.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
