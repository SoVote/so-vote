/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverMinification: false
  },
  transpilePackages: [
    '@aws-sdk/client-lambda'
  ]
}

module.exports = nextConfig
