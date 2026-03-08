import { type ResourceAsset } from "@/content/resources";

import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

export function ResourceCard({ resource }: { resource: ResourceAsset }) {
  return (
    <article className="rounded-xl border border-line bg-card p-5">
      <div className="flex flex-wrap gap-2">
        {resource.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink">{resource.title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{resource.description}</p>
      <p className="mt-4 text-sm text-muted">
        {resource.audience} · {resource.time}
      </p>
      <TrackedLink
        href={resource.href}
        eventName={analyticsEvents.resourceOpen}
        eventProps={{ resource: resource.slug }}
        className="mt-5 inline-flex text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:text-accent-strong"
      >
        {resource.cta}
      </TrackedLink>
    </article>
  );
}
