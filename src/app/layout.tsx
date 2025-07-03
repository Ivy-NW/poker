import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ClientWalletWrapper } from "@/components/ClientWalletWrapper";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
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
      <body className={`${roboto.variable} font-sans antialiased min-h-screen bg-[#1E293B] text-white`}>
        <ClientWalletWrapper>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ClientWalletWrapper>
      </body>
    </html>
  );
}
