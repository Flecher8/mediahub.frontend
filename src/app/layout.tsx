import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { authStorage } from "@/services/auth/auth";
import LoggedOutHeader from "@/components/headers/loggedOutHeader";
import LoggedInHeader from "@/components/headers/loggedInHeader";
import Script from "next/script";
import Head from "next/head";

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
			<Head>
				<link rel="preload" href="/fontawesome.js" as="script" />
			</Head>
			<body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
				<header>{authStorage.isAuthorized() ? <LoggedInHeader /> : <LoggedOutHeader />}</header>
				<main className="flex-grow h-100">{children}</main>
				<Script src="./fontawesome.js" async={false} strategy="beforeInteractive" />
			</body>
		</html>
	);
}

