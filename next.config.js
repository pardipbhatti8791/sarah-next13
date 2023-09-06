/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: "hellothere12345",
    NEXTAUTH_URL: "https://talezapp.gpcoders.dev",
  },
  // env: {
  //   NEXTAUTH_SECRET: "hellothere12345",
  //   // NEXTAUTH_URL: "https://rvacfe.gpcoders.dev",
  //   NEXTAUTH_URL: "http://localhost:3000",
  // },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
