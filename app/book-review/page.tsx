import type { Metadata } from "next";

import { IntakeForm } from "@/components/intake-form";
import { SectionHeading } from "@/components/section-heading";

type PageProps = {
  searchParams: Promise<{
    focus?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Book a Review",
  description:
    "Use the FK94 intake flow to request a personal privacy review, hardening sprint, incident help, or private advisory.",
};

export default async function BookReviewPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel rounded-[2.6rem] border border-line px-6 py-10 sm:px-10">
            <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">Book a Review</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
              A private intake, not a generic contact form.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              Tell FK94 what you need help with, how urgent it feels, and what already happened. The
              intake is designed to filter fit, reduce back-and-forth, and point you to the right
              next step.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Before you submit"
              title="What this intake is for"
              body="Use this if you want a personal privacy review, help implementing changes, calm incident response, or a more private advisory conversation."
            />
            <div className="mt-8 space-y-4">
              {[
                "General privacy cleanup and account structure",
                "Hardening support for recovery, MFA, browser, and device basics",
                "Urgent incident or suspicious activity cases",
                "More exposed or more sensitive personal situations",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-line bg-white/80 px-5 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Expectations"
              title="What happens after submission"
              body="You will get a suggested path, a response expectation based on urgency, and relevant free resources while you wait."
            />
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IntakeForm defaultHelpType={params.focus} />
        </div>
      </section>
    </>
  );
}
