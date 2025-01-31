import type { NextConfig } from "next";

const nextConfig: NextConfig = () => {
  return {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'd19nzf9df6lwtm.cloudfront.net',
        },
      ],
    },
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
