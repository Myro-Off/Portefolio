import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'skins.nationsglory.fr', pathname: '/**' },
            { protocol: 'https', hostname: 'minotar.net' },
            { protocol: 'https', hostname: '*.r2.dev' },
            { protocol: 'https', hostname: 'i.imgur.com' },
            { protocol: 'https', hostname: 'imgur.com' },
            { protocol: 'https', hostname: 'pub-2491d450ead34e3ebeec036edbad317f.r2.dev', port: '', pathname: '/**' },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "100mb",
        },
    },
    eslint: { ignoreDuringBuilds: false },
    typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
