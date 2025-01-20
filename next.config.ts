import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { config } from "dotenv";

const nextConfig: NextConfig = (phase: string) => {
  console.log(`Current Phase: ${phase}`);

  if (phase === PHASE_PRODUCTION_BUILD) {
    config({
      path: ".env.production",
    });
  } else {
    config({
      path: ".env.local",
    });
  }

  return {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    reactStrictMode: true,
    // output: "standalone",
  };
};

export default nextConfig;
