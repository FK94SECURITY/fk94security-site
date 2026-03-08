import { type Guide } from "@/content/guides";

import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="rounded-xl border border-line bg-card p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">
        {guide.category} · {guide.readTime}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-ink">{guide.title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{guide.description}</p>
      <TrackedLink
        href={`/guides/${guide.slug}`}
        eventName={analyticsEvents.guideOpen}
        eventProps={{ guide: guide.slug }}
        className="mt-5 inline-flex text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:text-accent-strong"
      >
        Read guide
      </TrackedLink>
    </article>
  );
}
