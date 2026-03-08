"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LogoMark } from "@/components/logo-mark";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/96 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <LogoMark />
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition",
                isActive(pathname, link.href)
                  ? "text-ink"
                  : "text-ink/62 hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/get-help"
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
          >
            Get Help
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/75 text-ink lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>
      {open ? (
        <div className="border-t border-line/80 bg-background/96 px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive(pathname, link.href) ? "bg-white text-ink" : "text-ink/70",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-help"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-line bg-white px-4 py-3 text-center text-sm font-semibold text-ink"
            >
              Get Help
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
