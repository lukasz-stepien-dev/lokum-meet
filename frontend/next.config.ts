import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  i18n: {
    locales: ['pl'],
    defaultLocale: 'pl'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig