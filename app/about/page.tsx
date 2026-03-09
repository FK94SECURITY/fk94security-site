import type { Metadata } from "next";
import Link from "next/link";

import { aboutPillars, casesWeDontTake, casesWeTake } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "FK94 Security: practical privacy guidance, free tools, and private 1:1 consulting for people who want better defaults.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">About</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">
            Practical security for normal people.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            FK94 exists because most people do not need an enterprise security brand. They need a
            clearer place to start, better defaults, and private help when things get personal or
            urgent.
          </p>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {aboutPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-xl border border-line bg-card p-6">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">{pillar.title}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Method"
            title="Basics first, complexity only when needed."
            body="Start with free resources. Use the tools. Read the guides. If your situation is more personal, urgent, or messy, we are here for a private 1:1 session."
          />
          <div className="mt-8 space-y-3">
            {[
              "Start with basics and avoid unnecessary complexity.",
              "Reduce exposure before adding more tools.",
              "Keep improvements maintainable under real life conditions.",
              "Use personal help for messy, sensitive, or higher-stakes situations.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-line bg-card px-5 py-4 text-sm leading-7 text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who is behind FK94"
            title="Built by a practitioner, not a brand."
            body="Independent security consulting focused on real people, not enterprise sales."
          />
          <div className="mt-8 rounded-xl border border-line bg-card p-6 sm:p-8">
            <div className="space-y-4 text-sm leading-7 text-muted">
              <p>
                Founded by a security practitioner with experience in incident response,
                account recovery, and operational security for individuals.
              </p>
              <p>
                Background in financial technology, crypto security, and personal privacy consulting.
              </p>
              <p>
                Based in Buenos Aires. Serving clients in the US, Latin America, and worldwide.
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { value: "50+", label: "Audits completed" },
              { value: "18", label: "Free tools built" },
              { value: "24h", label: "Average response" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-line bg-card px-4 py-5 text-center">
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card p-6">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">We help with</p>
            <div className="mt-5 space-y-3">
              {casesWeTake.map((item) => (
                <div key={item} className="rounded-xl border border-line px-4 py-3 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-card p-6">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">We do not do</p>
            <div className="mt-5 space-y-3">
              {casesWeDontTake.map((item) => (
                <div key={item} className="rounded-xl border border-line px-4 py-3 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card p-6 text-center sm:p-8">
            <p className="text-base leading-8 text-muted">
              Have a question or need personal help?
            </p>
            <div className="mt-4">
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
