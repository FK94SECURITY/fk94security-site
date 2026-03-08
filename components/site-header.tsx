"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-line/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <span className="text-sm font-bold text-black">FK</span>
          </div>
          <span className="text-lg font-bold text-ink">FK94</span>
          <span className="text-lg font-light text-muted">Security</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <a href="#services" className="text-sm text-muted transition hover:text-ink">{t.nav.services}</a>
          <a href="#tools" className="text-sm text-muted transition hover:text-ink">{t.nav.tools}</a>
          <Link href="/guides" className="text-sm text-muted transition hover:text-ink">{t.nav.guides}</Link>
          <a href="#about" className="text-sm text-muted transition hover:text-ink">{t.nav.about}</a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="rounded-md border border-line px-2 py-1 text-xs font-medium text-muted transition hover:text-ink"
          >
            {locale === "en" ? "ES" : "EN"}
          </button>
          <a
            href="#contact"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent-strong"
          >
            {t.nav.requestAudit}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="rounded-md border border-line px-2 py-1 text-xs font-medium text-muted"
          >
            {locale === "en" ? "ES" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((c) => !c)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink"
            aria-label="Menu"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line/50 bg-background/95 backdrop-blur-xl px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            <a href="#services" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm text-muted hover:bg-card hover:text-ink">{t.nav.services}</a>
            <a href="#tools" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm text-muted hover:bg-card hover:text-ink">{t.nav.tools}</a>
            <Link href="/guides" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm text-muted hover:bg-card hover:text-ink">{t.nav.guides}</Link>
            <a href="#about" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm text-muted hover:bg-card hover:text-ink">{t.nav.about}</a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-accent px-4 py-3 text-center text-sm font-semibold text-black"
            >
              {t.nav.requestAudit}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
