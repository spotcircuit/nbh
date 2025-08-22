/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true, // For local images
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig