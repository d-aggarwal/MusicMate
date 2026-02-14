import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MusicMate — Let Your Fans Choose the Music",
  description:
    "The ultimate fan-powered music streaming platform. Creators share their stream, fans vote on what plays next. Real-time voting, live queues, and community-driven playlists.",
  keywords: ["music streaming", "fan voting", "live music", "creator tools", "music queue"],
  openGraph: {
    title: "MusicMate — Let Your Fans Choose the Music",
    description: "The ultimate fan-powered music streaming platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
