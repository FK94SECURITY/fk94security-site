import type { Metadata } from "next";

import { services } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Private 1:1 privacy and OPSEC services for account cleanup, hardening, incidents, and more sensitive cases.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pb-18 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">Services</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
            Private help, kept simple.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Focused 1:1 sessions, implementation support, incident help, and private advisory for
            more sensitive cases.
          </p>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4">
            {services.map((service) => (
              <div id={service.slug} key={service.slug} className="scroll-mt-32">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.8rem] border border-line bg-white p-6 sm:p-8">
            <SectionHeading
              eyebrow="Process"
              title="One simple flow."
              body="Use the intake, get a suggested path, and move into the right kind of help if the case fits."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/book-review"
                eventName={analyticsEvents.serviceOpen}
                eventProps={{ service: "services-page" }}
                className="rounded-full border border-line px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Book a Review
              </TrackedLink>
              <TrackedLink
                href="/free-resources"
                eventName={analyticsEvents.resourceOpen}
                eventProps={{ resource: "free-resources-hub" }}
                className="rounded-full border border-line px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Explore Free Resources
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
