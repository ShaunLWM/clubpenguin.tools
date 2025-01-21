/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  async rewrites() {
    return [
      {
        source: "/@:username(.*)",
        destination: "/profile/:username",
      },
    ];
  },
};
