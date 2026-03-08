import type { Metadata } from "next";

import { guides } from "@/content/guides";
import { guideHighlights, openRepos, templateAssets, toolAssets } from "@/content/resources";
import { GuideCard } from "@/components/guide-card";
import { ResourceCard } from "@/components/resource-card";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Free Resources",
  description:
    "Free tools, guides, templates, and open resources to improve your digital privacy and account hygiene.",
};

export default function FreeResourcesPage() {
  const featuredGuides = guideHighlights
    .map((highlight) => guides.find((entry) => entry.slug === highlight.slug))
    .filter((guide): guide is (typeof guides)[number] => Boolean(guide))
    .slice(0, 3);

  return (
    <>
      <section className="pb-18 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">Free Resources</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
            A simpler starting point.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Tools, guides, and templates to help you clean up the basics before you ever need
            private help.
          </p>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Tools" title="Core tools" body="The fastest way to start." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {toolAssets.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Guides" title="Short practical reading" body="A few guides to cover the essentials." />
          <div className="mt-10 grid gap-4">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionHeading eyebrow="Templates" title="Templates" body="Simple assets you can reuse." />
            <div className="mt-8 space-y-3">
              {templateAssets.map((resource) => (
                <div key={resource.slug} className="rounded-[1.4rem] border border-line bg-white px-5 py-4">
                  <p className="text-sm font-semibold text-ink">{resource.title}</p>
                  <p className="mt-1 text-sm leading-7 text-muted">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Open" title="GitHub" body="Open resources outside the site." />
            <div className="mt-8 space-y-3">
              {openRepos.slice(0, 4).map((repo) => (
                <a
                  key={repo.slug}
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[1.4rem] border border-line bg-white px-5 py-4 transition hover:border-ink/30"
                >
                  <p className="text-sm font-semibold text-ink">{repo.name}</p>
                  <p className="mt-1 text-sm leading-7 text-muted">{repo.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
