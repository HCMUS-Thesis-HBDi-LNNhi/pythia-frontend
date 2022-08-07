/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/redirect/:path*",
        destination: `https://pythia-backend-staging.herokuapp.com/:path*`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
