import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // We lint via `npm run lint` (ESLint CLI). Avoid duplicate warnings in `next build`.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
