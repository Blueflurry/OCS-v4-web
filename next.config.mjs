/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // minimumCacheTTL: 60, // Cache optimized images for 60 seconds
        // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Define device sizes
        // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Define image sizes
        // formats: ["image/webp", "image/avif"], // Modern formats
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
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
            {
                protocol: "https",
                hostname: "*.cloudinary.com",
            },

            // Add other patterns as needed
        ],
    },
};

export default nextConfig;
