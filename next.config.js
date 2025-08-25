// const isProd = process.env.NODE_ENV === 'production';

// module.exports = {
//   assetPrefix: isProd ? '/ai-ui-assessment/' : '',
//   images: {
//     unoptimized: true,
//   },
//   output: 'export',
// };
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

module.exports = nextConfig;
