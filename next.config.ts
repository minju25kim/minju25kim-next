import type { NextConfig } from "next";

const nextConfig: NextConfig = () => {
  return {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    reactStrictMode: true,
    output: "standalone",
  };
};

export default nextConfig;
