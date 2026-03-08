import type { Metadata } from "next";

import { toolAssets } from "@/content/resources";
import { ResourceCard } from "@/components/resource-card";
import { SectionHeading } from "@/components/section-heading";
import { getRecommendedResourceSlugs } from "@/lib/intake";

type PageProps = {
  searchParams: Promise<{
    fit?: string;
    help?: string;
    service?: string;
    urgency?: string;
    window?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Thanks",
  description:
    "Thank you for submitting the FK94 intake. Review your suggested path and recommended resources.",
};

export default async function BookReviewThanksPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const helpType = params.help ?? "general-privacy-cleanup";
  const recommendedResources = toolAssets.filter((resource) =>
    getRecommendedResourceSlugs(helpType).includes(resource.slug),
  );
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel rounded-[2.6rem] border border-line px-6 py-10 sm:px-10">
            <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">Thank you</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
              Your intake was sent.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              FK94 uses the intake to sort urgency, fit, and which kind of help makes sense next.
              While you wait, start with the resources below.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Suggested path"
              title={params.service ?? "Personal Privacy Review"}
              body={
                params.fit === "high"
                  ? "This looks like a stronger consulting fit. FK94 will review the request with urgency and scope in mind."
                  : params.fit === "medium"
                    ? "This looks like a good fit for a focused review, with free resources helping while you wait."
                    : "This looks closer to a basics-first case. The recommended resources below are the best place to start."
              }
            />
            <div className="mt-8 grid gap-4">
              <div className="rounded-[1.6rem] border border-line bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-muted">Urgency</p>
                <p className="mt-3 text-sm leading-7 text-ink">{formatLabel(params.urgency ?? "low")}</p>
              </div>
              <div className="rounded-[1.6rem] border border-line bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-muted">Response expectation</p>
                <p className="mt-3 text-sm leading-7 text-ink">
                  {params.window ?? "We aim to respond within 3 business days."}
                </p>
              </div>
              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
                >
                  Continue to booking
                </a>
              ) : null}
            </div>
          </div>
          <div className="dark-panel rounded-[2.3rem] border border-black/10 p-8">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-signal">While you wait</p>
            <p className="mt-5 text-base leading-8 text-sand/76">
              These resources match the type of help you asked for and should give you a better
              starting point right away.
            </p>
            <div className="mt-8 grid gap-4">
              {recommendedResources.map((resource) => (
                <div key={resource.slug} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-sm font-semibold text-sand">{resource.title}</p>
                  <p className="mt-2 text-sm leading-6 text-sand/72">{resource.description}</p>
                  <a
                    href={resource.href}
                    className="mt-4 inline-flex rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-sand transition hover:border-white/28"
                  >
                    {resource.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recommended resources"
            title="Start with these first"
            body="If your case is not urgent, working through the basics here will usually make any later 1:1 session faster and more useful."
          />
          <div className="mt-12 grid gap-5 xl:grid-cols-2">
            {recommendedResources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function formatLabel(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (match) => match.toUpperCase());
}
