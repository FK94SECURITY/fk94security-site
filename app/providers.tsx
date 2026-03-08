"use client";

import { LocaleProvider } from "@/lib/locale-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SiteHeader />
      <main className="min-h-screen pt-20">{children}</main>
      <SiteFooter />
    </LocaleProvider>
  );
}
