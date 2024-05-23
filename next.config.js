/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ik.imagekit.io',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: '**.gw.ipfs-lens.dev',
            pathname: '**',
          },
        ],
      }, }

module.exports = nextConfig
