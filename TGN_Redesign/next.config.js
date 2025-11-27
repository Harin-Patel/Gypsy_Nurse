/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'static.thegypsynurse.com',
      },
      {
        protocol: 'https',
        hostname: 'ariohealthcare.com',
      },
      {
        protocol: 'https',
        hostname: 'staffinghub.com',
      },
      {
        protocol: 'https',
        hostname: 'www.rapidtemps.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fstv8-3.fna.fbcdn.net',
      },
    ],
  },
}

module.exports = nextConfig

