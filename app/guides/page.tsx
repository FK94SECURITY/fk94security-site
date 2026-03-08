import type { Metadata } from "next";

import { futureGuideIdeas, guideCategories, guides } from "@/content/guides";
import { GuideCard } from "@/components/guide-card";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "FK94 guides on privacy basics, accounts, recovery, crypto OPSEC, incidents, and digital footprint cleanup.",
};

export default function GuidesPage() {
  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel rounded-[2.6rem] border border-line px-6 py-10 sm:px-10">
            <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">Guides</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
              Practical writing for better digital privacy habits.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              FK94 guides focus on accounts, privacy basics, recovery, incidents, and digital
              exposure. They are written to be useful to normal users first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {guideCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-line bg-white/78 px-4 py-2 text-sm font-medium text-ink"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Editorial direction"
              title="The content map is built to support free value and consulting conversion."
              body="FK94 guides should educate, reduce confusion, and naturally move a portion of readers toward private help when their case gets more personal."
            />
          </div>
          <div className="panel rounded-[2rem] border border-line p-6 sm:p-8">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">Next guide ideas</p>
            <div className="mt-5 space-y-3">
              {futureGuideIdeas.map((idea) => (
                <div key={idea} className="rounded-[1.4rem] border border-line bg-white/78 px-4 py-4 text-sm leading-7 text-muted">
                  {idea}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
