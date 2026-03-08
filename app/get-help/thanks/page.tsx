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
  title: "Thank You",
  description: "Your request was sent. Here are your recommended next steps.",
};

export default async function GetHelpThanksPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const helpType = params.help ?? "general-privacy-cleanup";
  const recommendedResources = toolAssets.filter((resource) =>
    getRecommendedResourceSlugs(helpType).includes(resource.slug),
  );

  return (
    <>
      <section className="pb-10 pt-14 sm:pb-14 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">Thank you</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">
            We got your message.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {params.window ?? "We will respond within 3 days."}{" "}
            In the meantime, these resources match what you described.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Suggested path</p>
            <p className="mt-3 text-lg font-semibold text-ink">{params.service ?? "Privacy Review"}</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              {params.fit === "high"
                ? "Your situation needs personal attention. We will reach out soon."
                : params.fit === "medium"
                  ? "Looks like a good fit for a 1:1 session. Check the resources below while you wait."
                  : "Start with the free resources below. If you still need help after that, we are here."}
            </p>
          </div>

          {recommendedResources.length > 0 && (
            <div className="mt-8">
              <SectionHeading
                eyebrow="Start here"
                title="Recommended resources"
                body="These match the type of help you asked for."
              />
              <div className="mt-8 grid gap-4">
                {recommendedResources.map((resource) => (
                  <ResourceCard key={resource.slug} resource={resource} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
