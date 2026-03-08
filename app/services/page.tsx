import type { Metadata } from "next";
import Link from "next/link";

import { services } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Private 1:1 consulting for personal privacy, account hardening, incident response, and OPSEC.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pb-14 pt-14 sm:pb-18 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">Consulting</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">
            Private help when you need it.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Everything on this site is free. If your situation needs personal attention, we offer
            1:1 sessions. No packages, no tiers. We talk, understand the problem, and help you fix it.
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
              eyebrow="How it works"
              title="Simple process."
              body="Tell us what is going on. We suggest a path. If a 1:1 session makes sense, we set it up. If free resources are enough, we tell you that."
            />
            <div className="mt-8">
              <Link
                href="/get-help"
                className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:bg-accent-strong"
              >
                Get Help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
