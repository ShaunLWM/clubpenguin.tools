import "@repo/ui/styles.css";
import type { Metadata } from "next";
import "./globals.css";

import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import localFont from "next/font/local";
import { Providers } from "../_lib/Providers";

const myFont = localFont({
	src: "../../public/assets/fonts/burbankbigcondensed-medium-webfont.ttf",
});

export const metadata: Metadata = {
	title: "ClubPenguin - Card Jitsu Tracker",
	description:
		"Track your card jitsu cards and decks. Share them with your Club Penguin friends.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<Providers>
			<ClerkProvider>
				<html lang="en">
					<head>
						<link
							rel="apple-touch-icon"
							sizes="180x180"
							href="/favicon/apple-touch-icon.png"
						/>
						<link
							rel="icon"
							type="image/png"
							sizes="32x32"
							href="/favicon/favicon-32x32.png"
						/>
						<link
							rel="icon"
							type="image/png"
							sizes="16x16"
							href="/favicon/favicon-16x16.png"
						/>
						<link rel="manifest" href="/favicon/site.webmanifest" />
					</head>
					<body className={myFont.className}>
						<header>
							<SignedOut>
								<SignInButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</header>
						{children}
					</body>
				</html>
			</ClerkProvider>
		</Providers>
	);
}
