import type { Metadata } from "next";

import { openRepos, templateAssets } from "@/content/resources";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Open Resources",
  description:
    "Open FK94 resources on GitHub, including checklists, templates, starter packs, and guide indexes.",
};

export default function OpenResourcesPage() {
  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel rounded-[2.6rem] border border-line px-6 py-10 sm:px-10">
            <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">GitHub / Open Resources</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
              Open materials that support the FK94 ecosystem.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              FK94 keeps starter checklists, templates, and guide collections available in open
              formats so people can use them outside the site too.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Repositories"
            title="Public repos"
            body="Each repo should stay simple, readable, and easy to share. The site adds guidance and a path to private help when needed."
          />
          <div className="mt-12 grid gap-5 xl:grid-cols-3">
            {openRepos.map((repo) => (
              <article key={repo.slug} className="rounded-[1.9rem] border border-line bg-white/80 p-6 shadow-[0_18px_45px_rgba(19,24,34,0.08)]">
                <p className="text-xs uppercase tracking-[0.22em] text-muted">{repo.license}</p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">{repo.name}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{repo.description}</p>
                <p className="mt-3 text-sm leading-7 text-ink/70">{repo.audience}</p>
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand transition hover:bg-brand-strong"
                >
                  {repo.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Templates"
              title="Starter assets"
              body="These templates help people map accounts, plan cleanup work, and reduce exposure without starting from a blank page."
            />
          </div>
          <div className="grid gap-4">
            {templateAssets.map((template) => (
              <article
                key={template.slug}
                id={template.slug}
                className="panel scroll-mt-32 rounded-[1.8rem] border border-line p-6"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-muted">{template.time}</p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">{template.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{template.description}</p>
                <p className="mt-3 text-sm leading-7 text-ink/70">{template.audience}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
