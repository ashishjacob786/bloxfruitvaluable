import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bloxfruitvaluable.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | BloxFruitValuable.com",
    default: "Blox Fruit Valuable | Real-Time Trades & Calculator",
  },
  description: "Discover real-time values, create trade ads, and calculate W/F/L trades with our smart calculator for Blox Fruits.",
  keywords: ["blox fruits values", "blox fruits trading", "roblox blox fruits", "blox fruits calculator", "blox fruit tier list"],
  authors: [{ name: "BloxFruitValuable" }],
  openGraph: {
    title: "Blox Fruit Valuable | Real-Time Trades & Calculator",
    description: "Discover real-time values, create trade ads, and calculate W/F/L trades for Blox Fruits.",
    url: "https://www.bloxfruitvaluable.com",
    siteName: "BloxFruitValuable",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blox Fruit Valuable Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blox Fruit Valuable | Real-Time Trades & Calculator",
    description: "Discover real-time values and calculate trades for Blox Fruits.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/Official_logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "i79HKED2YV3kZv0OOp4QXGgYiFVwW_ULqyUPmJ5SE0w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
