/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
  env: {
    SERVER_URL: 'http://localhost:3080',
    CLIENT_URL: 'http://localhost:3000',
    MONGO_URI: 'mongodb+srv://gbhattarai55:Tuktuk_747@cluster0.znt6hdi.mongodb.net/project-backend?retryWrites=true&w=majority',
    JWT_SECRET: 'P@$$W0RDJWTSECRET',
    SGMAIL_API: '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',
    AUTH_KEYS: 'GBTechnologyPvtLtd',
    GOOGLE_CLIENT_ID: '423422452185-96oc5m6gojkd6ej27tngldq8j4cqd5vk.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    GITHUB_CLIENT_ID: 'fc13f76c7a21768d3041',
    GITHUB_CLIENT_SECRET: '2013af7fc8339e7d0aba2e90378ef4480fbbd53f',
    FACEBOOK_APP_ID: '1868058756886478',
    FACEBOOK_APP_SECRET: '5bf3cf48a76d1147ca51772fedb89d53'
  },
}

module.exports = nextConfig

