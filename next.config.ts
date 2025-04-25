import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ["@storefront-ui/react"],
  images: {
    remotePatterns: [new URL("https://fakestoreapi.com/img/**")],
  },
};

export default nextConfig;
