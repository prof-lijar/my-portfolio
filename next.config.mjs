/** @type {import('next').NextConfig} */
//const nextConfig = {};

//export default nextConfig;

// next.config.js
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // Increase server timeout for large file uploads
  experimental: {
    serverComponentsExternalPackages: ["formidable"],
  },
  // Configure API routes timeout
  async headers() {
    return [
      {
        source: "/api/upload",
        headers: [
          {
            key: "Connection",
            value: "keep-alive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
