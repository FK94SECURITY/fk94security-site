import { toolAssets } from "@/content/resources";
import { services } from "@/content/site";
import { ResourceCard } from "@/components/resource-card";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">FK94 Security</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl lg:text-7xl">
            Privacy and security for real people.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Free tools, practical guides, and honest advice to protect your accounts, reduce your
            exposure, and fix weak spots. If you need personal help, we do 1:1 consulting.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/free-resources"
              className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-sand transition hover:bg-brand-strong"
            >
              Explore Free Tools
            </Link>
            <Link
              href="/get-help"
              className="rounded-full border border-line px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
            >
              Get Help
            </Link>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="pb-18 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why it matters"
            title="You do not need to be famous to have weak defaults."
            body="Most people do not need paranoia. They need cleaner recovery, safer accounts, and fewer avoidable mistakes."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              "The same email or phone number is tied to everything.",
              "Recovery settings are usually weaker than passwords.",
              "Old accounts and public handles create unnecessary exposure.",
              "Incidents get worse when there is no plan.",
            ].map((item) => (
              <div key={item} className="rounded-[1.4rem] border border-line bg-white px-5 py-4 text-sm leading-7 text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools */}
      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Free tools"
            title="Everything here is free."
            body="Use the tools, follow the guides, harden your accounts. No signup, no paywall, no tracking."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {toolAssets.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* 1:1 Consulting */}
      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.8rem] border border-line bg-white p-6 sm:p-8">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-brand">1:1 Consulting</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              When free resources are not enough.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Sometimes your situation is too personal, too urgent, or too messy for a checklist. That
              is what the consulting is for. We figure out what is wrong, fix what we can, and give you
              a clear path forward.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.slug} className="rounded-[1.4rem] border border-line px-5 py-4">
                  <p className="text-sm font-semibold text-ink">{service.name}</p>
                  <p className="mt-1 text-sm leading-7 text-muted">{service.summary}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/get-help"
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand transition hover:bg-brand-strong"
              >
                Get Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guides teaser */}
      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Guides"
            title="Learn at your own pace."
            body="In-depth guides on privacy, account hardening, phishing, crypto security, and more. All free."
          />
          <div className="mt-8">
            <Link
              href="/guides"
              className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
            >
              Browse Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
