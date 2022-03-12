/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/l/:shortUrl*',
        destination: '/api/l/:shortUrl*',
        permanent: true,
      },
    ]
  },
}
