import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Добавьте для canary-версий
    experimental: {
        optimizeCss: false,
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/music/main',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;