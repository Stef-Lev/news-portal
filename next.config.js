/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SCRIPT_CODE_01: process.env.SCRIPT_CODE_01,
    SCRIPT_CODE_02: process.env.SCRIPT_CODE_02,
  }
}

module.exports = nextConfig
