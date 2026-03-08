import type { Metadata } from "next";

import { BookingForm } from "@/components/booking-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Book a 1:1 Session",
  description:
    "Schedule a private 1:1 security consultation. Account hardening, incident response, OPSEC advisory, and more.",
};

export default function BookPage() {
  return (
    <>
      <section className="pb-10 pt-14 sm:pb-14 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Book a Session"
            title="Private 1:1 security consultation."
            body="Tell us about your situation, pick a time, and we will set up a private session. No contracts, no packages, no pressure."
          />
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <BookingForm />

            <div className="space-y-6">
              <div className="rounded-xl border border-line bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Pricing
                </p>
                <p className="mt-4 text-2xl font-bold text-ink">$150 USD</p>
                <p className="text-sm text-muted">ARS $150.000 in Argentina</p>
                <p className="mt-2 text-xs text-muted/70">Starting price. Final quote depends on scope.</p>
                <div className="mt-6 space-y-3">
                  {[
                    "30-minute initial assessment",
                    "Full account & privacy audit",
                    "Personalized action plan",
                    "Follow-up support included",
                  ].map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-muted">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Trust
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "Encrypted communication",
                    "24h response time",
                    "No pressure, cancel anytime",
                    "Stay anonymous if needed",
                  ].map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-muted">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
