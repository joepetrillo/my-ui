import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@my-ui/ui"],
  },
  transpilePackages: ["@my-ui/ui"],
};

export default nextConfig;
