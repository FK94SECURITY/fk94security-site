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
            <div className="space-y-8">
              <BookingForm />

              {/* Cal.com embed alternative */}
              <div className="rounded-xl border border-line bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Or schedule directly
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Prefer to pick a slot yourself? Use the calendar below to book a time
                  that works for you.
                </p>
                <div className="mt-4 overflow-hidden rounded-lg border border-line">
                  <iframe
                    src="https://cal.com/fk94security/consultation"
                    className="h-[500px] w-full border-0 bg-background"
                    title="Book a consultation"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-line bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Pricing
                </p>
                <p className="mt-4 text-2xl font-bold text-ink">$150 USD</p>
                <p className="text-sm text-muted">ARS $150.000 in Argentina</p>
                <p className="mt-2 text-xs text-muted/70">
                  Starting price. Final quote depends on scope.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "30-minute initial assessment",
                    "Full account & privacy audit",
                    "Personalized action plan",
                    "Full audit: custom quote",
                    "Follow-up support included",
                  ].map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-muted">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
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
                    {
                      text: "Encrypted communication",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      ),
                    },
                    {
                      text: "24h response time",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      ),
                    },
                    {
                      text: "No pressure, cancel anytime",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      ),
                    },
                    {
                      text: "Stay anonymous if needed",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      ),
                    },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex gap-2 text-sm text-muted"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {item.icon}
                      </svg>
                      <span>{item.text}</span>
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
