import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // We lint via `npm run lint` (ESLint CLI). Avoid duplicate warnings in `next build`.
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["sanity", "@sanity/vision", "next-sanity"],
};

export default nextConfig;
