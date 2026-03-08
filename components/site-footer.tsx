"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-line/50 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="text-sm font-bold text-black">FK</span>
              </div>
              <span className="text-lg font-bold text-ink">FK94</span>
              <span className="text-lg font-light text-muted">Security</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{t.footer.description}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{t.footer.services}</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href="#services" className="text-sm text-muted transition hover:text-accent">Privacy Review</a>
              <a href="#services" className="text-sm text-muted transition hover:text-accent">Account Hardening</a>
              <a href="#services" className="text-sm text-muted transition hover:text-accent">Incident Response</a>
              <a href="#services" className="text-sm text-muted transition hover:text-accent">OPSEC Advisory</a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{t.footer.resources}</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href="#tools" className="text-sm text-muted transition hover:text-accent">Free Tools</a>
              <Link href="/guides" className="text-sm text-muted transition hover:text-accent">Guides</Link>
              <Link href="/free-resources" className="text-sm text-muted transition hover:text-accent">Resources</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{t.footer.company}</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href="#about" className="text-sm text-muted transition hover:text-accent">About</a>
              <a href="#contact" className="text-sm text-muted transition hover:text-accent">Contact</a>
              <Link href="/privacy" className="text-sm text-muted transition hover:text-accent">Privacy</Link>
              <Link href="/terms" className="text-sm text-muted transition hover:text-accent">Terms</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-line/50 pt-6 text-sm text-muted">
          &copy; {new Date().getFullYear()} FK94 Security. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
