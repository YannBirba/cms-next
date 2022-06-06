/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  productionBrowserSourceMaps: process.env.NODE_ENV !== 'development',
  swcMinify: process.env.NODE_ENV !== 'development',
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  compress: process.env.NODE_ENV !== 'development',
  pwa: {
    dest: "public",
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});
