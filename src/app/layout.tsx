import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { authStorage } from "@/services/auth/auth";
import LoggedOutHeader from "@/components/headers/loggedOutHeader";
import LoggedInHeader from "@/components/headers/loggedInHeader";
import Script from "next/script";
import Head from "next/head";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "MediaHub",
	description: "MediaHub"
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
				<header className="flex justify-center bg-base-200">{authStorage.isAuthorized() ? <LoggedInHeader /> : <LoggedOutHeader />}</header>
				<main className="flex justify-center h-full w-full">{children}</main>
			</body>
		</html>
	);
}

