import type { NextConfig } from "next";

// Derive a remotePattern entry from an arbitrary Strapi URL so production
// environments automatically match without touching this file.
function strapiPattern(rawUrl: string): { protocol: "http" | "https"; hostname: string; port?: string; pathname: string } {
  const url = new URL(rawUrl);
  return {
    protocol: url.protocol.replace(":", "") as "http" | "https",
    hostname: url.hostname,
    ...(url.port ? { port: url.port } : {}),
    pathname: "/uploads/**",
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:5001";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["framer-motion"],
  images: {
    loader: "custom",
    loaderFile: "./lib/strapi-image-loader.ts",
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
      // Always include the runtime Strapi URL
      strapiPattern(STRAPI_URL),
      // Keep static fallbacks for local Docker and bare-IP setups
      { protocol: "http", hostname: "75.119.135.164", port: "5001", pathname: "/uploads/**" },
      { protocol: "http", hostname: "localhost",       port: "5001", pathname: "/uploads/**" },
      { protocol: "http", hostname: "strapi",          port: "5001", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;
