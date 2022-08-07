/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/redirect/:path*",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN}/:path*`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
