import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: true,
  experimental: {
    optimizePackageImports: ["@my-ui/ui"],
  },
  transpilePackages: ["@my-ui/ui"],
};

export default nextConfig;
