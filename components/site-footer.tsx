import Link from "next/link";

import { LogoMark } from "@/components/logo-mark";
import { footerGroups } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <LogoMark />
            <p className="max-w-md text-sm leading-7 text-muted">
              Free tools and practical guidance for everyday digital privacy. Private 1:1 help when it matters more.
            </p>
          </div>
          <Link
            href="/book-review"
            className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
          >
            Book a Review
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line/80 pt-5 text-sm text-muted">
          {footerGroups.flatMap((group) => group.links).map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="text-sm text-muted">
          © 2026 FK94.
        </div>
      </div>
   </footer>
  );
}
