import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fk94security.com"),
  title: {
    default: "FK94 | Digital Privacy and OPSEC for Everyday People",
    template: "%s | FK94",
  },
  description:
    "Free tools, practical guides, and private 1:1 help to improve digital privacy, protect critical accounts, and reduce unnecessary online exposure.",
  openGraph: {
    title: "FK94 | Digital Privacy and OPSEC for Everyday People",
    description:
      "Free tools, practical guides, and private 1:1 help to improve digital privacy, protect critical accounts, and reduce unnecessary online exposure.",
    url: "https://fk94security.com",
    siteName: "FK94",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FK94 | Digital Privacy and OPSEC for Everyday People",
    description:
      "Free tools, practical guides, and private 1:1 help to improve digital privacy, protect critical accounts, and reduce unnecessary online exposure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable} bg-background text-foreground antialiased`}
      >
        <div className="relative isolate min-h-screen overflow-x-hidden">
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
