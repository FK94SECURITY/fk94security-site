"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { ContactForm } from "@/components/contact-form";
import { FaqSection } from "@/components/faq-section";

const toolHrefs = [
  "/free-resources/breach-checker",
  "/free-resources/security-score",
  "/free-resources/phone-lookup",
  "/free-resources/opsec-checklist",
  "/free-resources/password-analyzer",
  "/free-resources/phishing-quiz",
  "/free-resources/threat-model",
  "/free-resources/account-mapper",
  "/free-resources/device-hardening",
  "/free-resources/mfa-compare",
  "/free-resources/exposure-self-check",
  "/free-resources/incident-triage",
  "/free-resources/password-breach",
  "/free-resources/dns-scanner",
  "/free-resources/email-analyzer",
  "/free-resources/username-osint",
  "/free-resources/website-scanner",
  "/free-resources/os-hardening",
];

const serviceIcons = [
  <svg key="s1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  <svg key="s2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg key="s3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  <svg key="s4" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  <svg key="s5" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg key="s6" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
];

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden pt-4 pb-20 sm:pt-12 sm:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/3 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.hero.kicker}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl" style={{ textWrap: "balance" }}>
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="rounded-lg bg-accent px-6 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-accent-strong"
              >
                {t.hero.cta}
              </a>
              <a
                href="#tools"
                className="rounded-lg border border-line px-6 py-3.5 text-center text-sm font-semibold text-ink transition hover:border-accent/30 hover:bg-card"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line/50 bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-line/50 lg:grid-cols-4">
            {t.stats.items.map((stat) => (
              <div key={stat.label} className="px-4 py-8 text-center sm:px-6">
                <p className="text-3xl font-bold text-accent">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-space">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.services.kicker}</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{t.services.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{t.services.subtitle}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((service, i) => (
              <div
                key={service.name}
                className="card-hover rounded-xl border border-line bg-card p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {serviceIcons[i]}
                </div>
                <h3 className="text-lg font-semibold text-ink">{service.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section id="tools" className="section-space border-t border-line/50 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.tools.kicker}</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{t.tools.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{t.tools.subtitle}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.tools.items.slice(0, 6).map((tool, i) => (
              <Link
                key={tool.name}
                href={toolHrefs[i]}
                className="card-hover group rounded-xl border border-line bg-card p-6"
              >
                <h3 className="text-lg font-semibold text-ink">{tool.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
                <p className="mt-4 text-sm font-semibold text-accent transition group-hover:text-accent-strong">
                  {tool.cta} &rarr;
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/free-resources"
              className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:bg-card"
            >
              {t.tools.items.length} {t.tools.kicker} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-space">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.about.kicker}</p>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{t.about.title}</h2>
              <p className="mt-6 text-base leading-7 text-muted">{t.about.description}</p>
              <p className="mt-4 text-base leading-7 text-muted">{t.about.method}</p>
            </div>
            <div className="rounded-xl border border-line bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.about.casesTitle}</p>
              <div className="mt-6 space-y-3">
                {t.about.cases.map((c) => (
                  <div key={c} className="flex gap-3 text-sm text-muted">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-space border-t border-line/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.testimonials.kicker}</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{t.testimonials.title}</h2>
          <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {t.testimonials.items.map((item, i) => (
              <div
                key={i}
                className="min-w-[320px] max-w-[400px] shrink-0 snap-start rounded-xl border border-line bg-card p-6"
              >
                <svg className="mb-4 h-8 w-8 text-accent/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.3 2.6C6 5.1 2.8 9.7 2.8 15v5.2h7V15H5.6c0-3.8 2.4-7 5.7-8.4L11.3 2.6zm12 0C18 5.1 14.8 9.7 14.8 15v5.2h7V15h-4.2c0-3.8 2.4-7 5.7-8.4L23.3 2.6z" />
                </svg>
                <p className="text-sm italic leading-7 text-muted">{item.quote}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-ink">{item.author}</p>
                  <p className="text-xs text-muted/70">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-space border-t border-line/50 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.blog.kicker}</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{t.blog.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{t.blog.subtitle}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.blog.posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-hover group rounded-xl border border-line bg-card p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-accent/70">{post.category}</span>
                <h3 className="mt-2 text-base font-semibold text-ink">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted line-clamp-2">{post.excerpt}</p>
                <p className="mt-3 text-xs text-muted/60">{post.date}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-sm font-semibold text-accent transition hover:text-accent-strong">
              {t.blog.viewAll} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-space">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.faq.kicker}</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{t.faq.title}</h2>
          <div className="mt-10">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-space border-t border-line/50 bg-surface/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.audit.kicker}</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{t.audit.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{t.audit.subtitle}</p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
