"use client";

import { LocaleProvider } from "@/lib/locale-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingWidget } from "@/components/floating-widget";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SiteHeader />
      <main className="min-h-screen pt-20">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
      <FloatingWidget />
    </LocaleProvider>
  );
}
