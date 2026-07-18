import type { Metadata } from "next";
import { Alegreya_Sans, Alegreya_Sans_SC, Montez } from "next/font/google";
import "./globals.css";
import Navigation from "./components/sections/Navigation";
import Cursor from "./components/global/Cursor";
import LightboxProvider from "./providers/LightboxProvider";

const AlegreyaSans = Alegreya_Sans({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-alegreya-sans",
});

const AlegreyaSansSC = Alegreya_Sans_SC({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-alegreya-sans-sc",
});

const MontezFont = Montez({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-montez",
});

export const metadata: Metadata = {
	title: "KMD's Portfolio",
	description: "UX Design student met een passie voor gebruiksvriendelijke digitale producten. In mijn projecten combineer ik gebruikersonderzoek, creatief denken en prototyping om betekenisvolle gebruikerservaringen te ontwerpen.",
	openGraph: {
		title: "KMD's Portfolio",
		description: "UX Design student met een passie voor gebruiksvriendelijke digitale producten. In mijn projecten combineer ik gebruikersonderzoek, creatief denken en prototyping om betekenisvolle gebruikerservaringen te ontwerpen.",
		type: "website",
		locale: "nl_NL",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="nl"
			className={`${AlegreyaSans.variable} ${AlegreyaSansSC.variable} ${MontezFont.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<Navigation />
				<Cursor />
				<LightboxProvider />
				{children}
			</body>
		</html>
	);
}
