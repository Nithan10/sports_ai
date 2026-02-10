import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.international-football-institute.com',
      },
      {
        protocol: 'https',
        hostname: 'hunarho.com',
      },
      {
        protocol: 'https',
        hostname: 'datasportsgroup.com',
      },
      {
        protocol: 'https',
        hostname: 'd3.harvard.edu',
      },
      {
        protocol: 'https',
        hostname: 'cdn.analyticsvidhya.com', // <--- Added specific domain
      },
      // 👇 This wildcard allows ALL external HTTPS images. 
      // Keep this if you want to stop getting "Invalid src prop" errors for new sites.
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;