import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            new URL("https://activities.osu.edu/posts/studentorgs/logos/**"),
        ],
    },
};

export default nextConfig;
