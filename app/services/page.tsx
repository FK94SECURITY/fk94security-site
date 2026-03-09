"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { services } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";

const content = {
  en: {
    eyebrow: "Consulting",
    heading: "Private help when you need it.",
    subheading:
      "Everything on this site is free. If your situation needs personal attention, we offer 1:1 sessions. No packages, no tiers. We talk, understand the problem, and help you fix it.",
    howEyebrow: "How it works",
    howTitle: "Simple process.",
    howBody:
      "Tell us what is going on. We suggest a path. If a 1:1 session makes sense, we set it up. If free resources are enough, we tell you that.",
    cta: "Get Help",
  },
  es: {
    eyebrow: "Consultor\u00eda",
    heading: "Ayuda privada cuando la necesit\u00e1s.",
    subheading:
      "Todo en este sitio es gratis. Si tu situaci\u00f3n necesita atenci\u00f3n personal, ofrecemos sesiones 1:1. Sin paquetes, sin niveles. Hablamos, entendemos el problema y te ayudamos a resolverlo.",
    howEyebrow: "C\u00f3mo funciona",
    howTitle: "Proceso simple.",
    howBody:
      "Cont\u00e1nos qu\u00e9 est\u00e1 pasando. Sugerimos un camino. Si una sesi\u00f3n 1:1 tiene sentido, la armamos. Si los recursos gratuitos alcanzan, te lo decimos.",
    cta: "Pedir Ayuda",
  },
};

export default function ServicesPage() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <>
      <section className="pb-14 pt-14 sm:pb-18 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">
            {t.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {t.subheading}
          </p>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
            <SectionHeading
              eyebrow={t.howEyebrow}
              title={t.howTitle}
              body={t.howBody}
            />
            <div className="mt-8">
              <Link
                href="/get-help"
                className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:bg-accent-strong"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
