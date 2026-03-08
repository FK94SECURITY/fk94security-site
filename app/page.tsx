import { toolAssets } from "@/content/resources";
import { services } from "@/content/site";
import { ResourceCard } from "@/components/resource-card";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

const opsecSteps = [
  {
    title: "Accounts",
    body: "Protect the accounts that matter most first: email, recovery, cloud, banking, and any service tied to identity.",
  },
  {
    title: "Recovery",
    body: "Review recovery paths, MFA, and backup codes so convenience does not become your weakest point.",
  },
  {
    title: "Exposure",
    body: "Reduce unnecessary overlap between public identity, old accounts, phone numbers, and handles.",
  },
  {
    title: "Incidents",
    body: "Know what to do when something feels wrong instead of improvising under stress.",
  },
];

const audiences = [
  "People who want better privacy without turning it into a lifestyle project.",
  "Freelancers and remote workers with too much tied to one inbox or phone number.",
  "Crypto users who want safer defaults and less unnecessary overlap.",
  "Anyone dealing with a phishing scare, suspicious login, or messy account setup.",
];

export default function Home() {
  return (
    <>
      <section className="pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">FK94</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl lg:text-7xl">
            OPSEC and privacy made simple.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Free tools and practical guidance for everyday digital privacy. Private 1:1 help when
            you need more than a checklist.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/free-resources/opsec-checklist"
              eventName={analyticsEvents.heroFree}
              className="rounded-full border border-line bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
            >
              Start Free Checklist
            </TrackedLink>
            <TrackedLink
              href="/book-review"
              eventName={analyticsEvents.heroReview}
              className="rounded-full border border-line px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
            >
              Book a Review
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why it matters"
            title="You do not need to be famous to have weak defaults."
            body="Most people do not need paranoia. They need cleaner recovery, safer accounts, and fewer avoidable mistakes."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              "The same email or phone number is often tied to everything.",
              "Recovery settings are usually weaker than passwords.",
              "Old accounts and public handles create unnecessary overlap.",
              "Incidents get worse when there is no calm response plan.",
            ].map((item) => (
              <div key={item} className="rounded-[1.4rem] border border-line bg-white px-5 py-4 text-sm leading-7 text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What is OPSEC?"
            title="A cleaner way to think about digital habits."
            body="For FK94, OPSEC means reducing obvious weak points before they turn into bigger problems."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {opsecSteps.map((step) => (
              <article key={step.title} className="rounded-[1.5rem] border border-line bg-white p-5">
                <h2 className="text-lg font-semibold text-ink">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who this helps"
            title="Built for normal people, not only high-profile targets."
            body="FK94 is for people who want a calmer, more practical starting point."
          />
          <div className="mt-10 space-y-3">
            {audiences.map((item) => (
              <div key={item} className="rounded-[1.4rem] border border-line bg-white px-5 py-4 text-sm leading-7 text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Free tools"
            title="Start free."
            body="Use the tools first. If the situation gets more personal, urgent, or messy, move into a private review."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {toolAssets.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.8rem] border border-line bg-white p-6 sm:p-8">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-brand">Need personal help?</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Private help when free resources are not enough.
            </h2>
            <div className="mt-6 space-y-3">
              {services.map((service) => (
                <p key={service.slug} className="text-sm leading-7 text-muted">
                  <span className="font-semibold text-ink">{service.name}.</span> {service.summary}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/services"
                eventName={analyticsEvents.serviceOpen}
                eventProps={{ service: "home-services" }}
                className="rounded-full border border-line px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                View Services
              </TrackedLink>
              <TrackedLink
                href="/book-review"
                eventName={analyticsEvents.heroReview}
                className="rounded-full border border-line px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Book a Review
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
