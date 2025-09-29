
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow build even if there are type errors
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
