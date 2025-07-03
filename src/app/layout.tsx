import type { Metadata } from "next";
import { Roboto, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ClientWalletWrapper } from "@/components/ClientWalletWrapper";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AnimatedBackground from "@/components/AnimatedBackground";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-royal",
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-elegant",
});

export const metadata: Metadata = {
  title: "Royalty - Music Investment Platform",
  description: "Stake in artists' NFTs to earn music royalties. A decentralized music investment and royalty-sharing platform built on Avalanche blockchain.",
  keywords: "music, NFT, royalties, blockchain, investment, Avalanche, staking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${cinzel.variable} ${playfair.variable} font-sans antialiased min-h-screen`}>
        <ThemeProvider>
          <AnimatedBackground />
          <ClientWalletWrapper>
            <div className="flex flex-col min-h-screen relative z-10">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ClientWalletWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
