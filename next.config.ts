import type { NextConfig } from "next";

const isItchBuild = process.env.NEXT_PUBLIC_ITCH_BUILD === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  assetPrefix: isItchBuild ? "./" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
