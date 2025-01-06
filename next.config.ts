import type { NextConfig } from "next";
// import rehypeCodeTitles from 'rehype-code-titles';
// import rehypePrism from 'rehype-prism-plus';

import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  output: "standalone"
};

export default withMDX(nextConfig);

