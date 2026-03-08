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
          <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">About</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
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
              <article key={pillar.title} className="rounded-[1.6rem] border border-line bg-white p-6">
                <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">{pillar.title}</p>
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
              <div key={item} className="rounded-[1.4rem] border border-line bg-white px-5 py-4 text-sm leading-7 text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="rounded-[1.6rem] border border-line bg-white p-6">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">We help with</p>
            <div className="mt-5 space-y-3">
              {casesWeTake.map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-line px-4 py-3 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.6rem] border border-line bg-white p-6">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">We do not do</p>
            <div className="mt-5 space-y-3">
              {casesWeDontTake.map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-line px-4 py-3 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.8rem] border border-line bg-white p-6 text-center sm:p-8">
            <p className="text-base leading-8 text-muted">
              Have a question or need personal help?
            </p>
            <div className="mt-4">
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
    </>
  );
}
