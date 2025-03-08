import withLess from 'next-with-less';

/** @type {import('next').NextConfig} */
const nextConfig = withLess({
  reactStrictMode: true,
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
});

export default nextConfig;
