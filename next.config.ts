import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	async headers() {
		return [
			{
				// Apply caching only to fontawesome.js
				source: "/fontawesome.js",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable" // Cache for one year
					}
				]
			}
		];
	}
};

export default nextConfig;

