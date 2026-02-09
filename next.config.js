const nextConfig = {
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