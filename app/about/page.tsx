import type { Metadata } from "next";

import { aboutPillars, casesWeDontTake, casesWeTake } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About / Method",
  description:
    "The FK94 method: practical privacy guidance, privacy-conscious consulting, and clear limits around what the service does and does not do.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel rounded-[2.6rem] border border-line px-6 py-10 sm:px-10">
            <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">About / Method</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
              A practical privacy project built for normal people, not enterprise theater.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              FK94 exists to make digital privacy and OPSEC more accessible: free where possible,
              private where necessary, and grounded in useful changes instead of spectacle.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-3">
            {aboutPillars.map((pillar) => (
              <article key={pillar.title} className="panel rounded-[2rem] border border-line p-6">
                <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">{pillar.title}</p>
                <p className="mt-4 text-base leading-8 text-muted">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="How FK94 works"
              title="Advice first, then implementation support if needed."
              body="The method is intentionally simple: start with free resources, use the intake when the situation is more personal or urgent, then move into the right service instead of a generic package."
            />
            <div className="mt-8 space-y-4">
              {[
                "Start with basics first and avoid unnecessary complexity.",
                "Reduce exposure before adding more tools and more moving parts.",
                "Keep privacy improvements maintainable under stress, travel, and normal life.",
                "Use personal help for messy, sensitive, or higher-stakes situations.",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-line bg-white/78 px-5 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="dark-panel rounded-[2.3rem] border border-black/10 p-8">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-signal">Founder note</p>
            <p className="mt-5 text-base leading-8 text-sand/78">
              FK94 exists because most people do not need another intimidating security brand. They
              need a clearer place to start, better defaults, and private help when things get
              personal, public, or urgent.
            </p>
            <p className="mt-5 text-base leading-8 text-sand/78">
              The project is intentionally narrow: personal privacy, account safety, digital
              exposure, and calmer operational habits. It is not a managed SOC, not a spyware lab,
              and not a promise to solve every technical problem on the internet.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="panel rounded-[2rem] border border-line p-6 sm:p-8">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">Cases FK94 takes</p>
            <div className="mt-5 space-y-3">
              {casesWeTake.map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-line bg-white/78 px-4 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="panel rounded-[2rem] border border-line p-6 sm:p-8">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">Cases FK94 does not take</p>
            <div className="mt-5 space-y-3">
              {casesWeDontTake.map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-line bg-white/78 px-4 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
