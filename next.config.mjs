/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "*.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
            },
            // Add other patterns as needed
        ],
    },
};

export default nextConfig;
