/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.holidaytaxis.com",
        port: "",
        pathname: "/imgs/**",
      },
    ],
  },
};

export default nextConfig;
