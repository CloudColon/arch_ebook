import type { NextConfig } from "next";

// Two builds from one codebase:
//   npm run build       the real store: server orders, signed access cookie, payment gateway callbacks.
//   npm run build:demo  a static demo for GitHub Pages: no server, orders and access live in the browser.
// Route files ending in .srv.tsx / .srv.ts exist only in the real build; .demo.tsx only in the demo.
const demo = process.env.NEXT_PUBLIC_DEMO === "1";

const turbopack: NextConfig["turbopack"] = {
  rules: {
    "*.css": {
      loaders: ["@tailwindcss/turbopack"],
      as: "*.css",
    },
  },
};

const nextConfig: NextConfig = demo
  ? {
      output: "export",
      basePath: process.env.PAGES_BASE_PATH ?? "/knowledgebag",
      trailingSlash: true,
      images: { unoptimized: true },
      pageExtensions: ["demo.tsx", "tsx", "ts"],
      turbopack,
    }
  : {
      cacheComponents: true,
      partialPrefetching: true,
      pageExtensions: ["srv.tsx", "srv.ts", "tsx", "ts"],
      turbopack,
    };

export default nextConfig;
