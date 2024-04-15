/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src", "cypress/e2e"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
}

module.exports = nextConfig
