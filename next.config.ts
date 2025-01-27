import type { NextConfig } from "next";

const nextConfig: NextConfig = () => {
  return {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    reactStrictMode: true,
    output: "standalone",
    async redirects() {
      return [];
    },
    async rewrites() {
      return [];
    },
  };
};

export default nextConfig;
