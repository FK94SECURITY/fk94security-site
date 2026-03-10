import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";

import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fk94security.com"),
  title: {
    default: "FK94 Security | Personal Security & OPSEC Services",
    template: "%s | FK94 Security",
  },
  description:
    "Free security tools, expert guides, and private 1:1 consulting. Protect your accounts, reduce exposure, and stay ahead of threats.",
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_TOKEN_HERE",
  },
  openGraph: {
    title: "FK94 Security | Personal Security & OPSEC Services",
    description:
      "Free security tools, expert guides, and private 1:1 consulting. Protect your accounts, reduce exposure, and stay ahead of threats.",
    url: "https://fk94security.com",
    siteName: "FK94 Security",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} bg-background text-foreground antialiased`}>
        <Providers>{children}</Providers>
        <Script
          defer
          data-domain="fk94security.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
