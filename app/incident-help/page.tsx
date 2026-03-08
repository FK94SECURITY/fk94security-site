import type { Metadata } from "next";

import { IncidentTriageWizard } from "@/components/incident-triage-wizard";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Incident Help",
  description:
    "Calm first-response guidance for suspicious logins, phishing scares, access loss, and other account incidents.",
};

export default function IncidentHelpPage() {
  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel rounded-[2.6rem] border border-line px-6 py-10 sm:px-10">
            <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">Incident Help</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
              Calm first-response help when something feels wrong.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              Suspicious logins, phishing scares, lost access, or weird account behavior usually get
              worse when you panic. Start with the basics, slow the situation down, and use the
              intake if you need private help.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/book-review?focus=incident-suspicious-activity"
                eventName={analyticsEvents.urgentHelp}
                className="rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-strong"
              >
                Request urgent help
              </TrackedLink>
              <TrackedLink
                href="/free-resources/incident-triage"
                eventName={analyticsEvents.resourceOpen}
                eventProps={{ resource: "incident-triage" }}
                className="rounded-full border border-line bg-white/80 px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Open the triage tool
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Common signs"
              title="Signals that deserve a calmer look"
              body="Not every odd email means compromise, but these are common reasons to stop and review your setup."
            />
            <div className="mt-8 space-y-4">
              {[
                "Unexpected password reset messages or MFA prompts.",
                "New forwarding rules, unknown sessions, or account activity you cannot explain.",
                "Recovery changes, unfamiliar support emails, or access you suddenly lost.",
                "A lost phone, exposed laptop, or device that started behaving strangely.",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-line bg-white/80 px-5 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="First 15 minutes"
              title="Protect the critical path first"
              body="When in doubt, prioritize the accounts and recovery settings that control the rest of your digital life."
            />
            <div className="mt-8 space-y-4">
              {[
                "Check your primary email and recovery paths before touching less important accounts.",
                "Review recent sessions, devices, forwarding rules, and recovery settings.",
                "Change credentials in a deliberate order instead of making random changes everywhere.",
                "Write down what happened, what you noticed, and what you changed.",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-line bg-white/80 px-5 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IncidentTriageWizard />
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="panel rounded-[2rem] border border-line p-6 sm:p-8">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">What not to do</p>
            <div className="mt-5 space-y-3">
              {[
                "Do not change everything at once without understanding which accounts matter most.",
                "Do not ignore recovery settings while focusing only on passwords.",
                "Do not keep clicking suspicious emails to see what happens.",
                "Do not hand the situation to a random person in DMs because you feel rushed.",
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-line bg-white/78 px-4 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="dark-panel rounded-[2.3rem] border border-black/10 p-8">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-signal">Need private help?</p>
            <p className="mt-5 text-base leading-8 text-sand/76">
              If the situation feels urgent, messy, or sensitive, use the intake. FK94 will sort fit,
              urgency, and the right next step without turning it into a generic support queue.
            </p>
            <TrackedLink
              href="/book-review?focus=incident-suspicious-activity"
              eventName={analyticsEvents.urgentHelp}
              className="mt-8 inline-flex rounded-full bg-signal px-6 py-3 text-sm font-semibold text-ink transition hover:bg-signal/88"
            >
              Use the urgent intake
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
