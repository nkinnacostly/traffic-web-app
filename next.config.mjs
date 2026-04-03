/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_URL || "https://0fcnmzf2sg.execute-api.us-east-1.amazonaws.com/staging"}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
