const { withContentlayer } = require("next-contentlayer")

// Use an async function to allow top-level await for dynamic import
module.exports = async () => {
  // Dynamically import the ESM module
  await import("./env.mjs")

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["avatars.githubusercontent.com"],
    },
    experimental: {
      // appDir is stable, but serverComponentsExternalPackages still belongs here
      serverComponentsExternalPackages: ["@prisma/client"],
    },
    // serverComponentsExternalPackages: ["@prisma/client"], // Moved back into experimental
  }

  return withContentlayer(nextConfig)
} 