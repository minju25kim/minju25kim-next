import type { NextConfig } from "next";

const nextConfig: NextConfig = (phase: string) => {
  console.log(`Current Phase: ${phase}`);
  const env = {
    'phase-development': '.env.local',
    'phase-production-build': '.env.production',
    'phase-production-server': '.env.production',
  }[phase];

  if (env) {
    require('dotenv').config({ path: `${env}` });
  }

  return {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    reactStrictMode: true,
    output: "standalone",
  };
};

export default nextConfig;
