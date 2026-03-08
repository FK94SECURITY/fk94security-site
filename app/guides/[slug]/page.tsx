import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { guides } from "@/content/guides";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((entry) => entry.slug === slug);

  if (!guide) {
    return {
      title: "Guide not found",
    };
  }

  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides.find((entry) => entry.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="panel rounded-[2.6rem] border border-line px-6 py-10 sm:px-10">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-line bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                {guide.category}
              </span>
              <span className="rounded-full border border-line bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                {guide.readTime}
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.96] text-ink sm:text-6xl">
              {guide.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">{guide.intro}</p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <aside className="space-y-4">
            <div className="panel rounded-[2rem] border border-line p-6">
              <p className="font-display text-sm uppercase tracking-[0.28em] text-brand">Tags</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-white/78 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="dark-panel rounded-[2rem] border border-black/10 p-6">
              <p className="font-display text-sm uppercase tracking-[0.28em] text-signal">Need help applying this?</p>
              <p className="mt-4 text-sm leading-7 text-sand/76">
                If the guide surfaces a messier or more sensitive situation than expected, move into
                a private review instead of trying to untangle everything alone.
              </p>
              <TrackedLink
                href="/book-review"
                eventName={analyticsEvents.serviceOpen}
                eventProps={{ service: guide.slug }}
                className="mt-6 inline-flex rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ink transition hover:bg-signal/88"
              >
                Book a Review
              </TrackedLink>
            </div>
          </aside>

          <article className="panel rounded-[2.4rem] border border-line p-6 sm:p-8">
            <div className="space-y-10">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <SectionHeading
                    eyebrow={guide.category}
                    title={section.heading}
                    body={section.paragraphs[0] ?? ""}
                  />
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.slice(1).map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-muted">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets ? (
                      <div className="space-y-3">
                        {section.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="rounded-[1.4rem] border border-line bg-white/78 px-5 py-4 text-sm leading-7 text-muted"
                          >
                            {bullet}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-[1.8rem] border border-line bg-white/80 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Takeaway</p>
              <p className="mt-3 font-display text-3xl leading-tight text-ink">{guide.takeaway}</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
