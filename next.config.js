/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src", "cypress/e2e"],
  },
  output: "standalone",
  reactStrictMode: false,
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
      {
        protocol: "https",
        hostname: "flowbite.com",
      },
    ],
  },
}

module.exports = nextConfig
