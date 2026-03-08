import { type ResourceAsset } from "@/content/resources";

import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

export function ResourceCard({ resource }: { resource: ResourceAsset }) {
  return (
    <article className="rounded-[1.5rem] border border-line bg-white p-5">
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
      <p className="mt-4 text-sm text-ink/72">
        {resource.audience} · {resource.time}
      </p>
      <TrackedLink
        href={resource.href}
        eventName={analyticsEvents.resourceOpen}
        eventProps={{ resource: resource.slug }}
        className="mt-5 inline-flex text-sm font-semibold text-ink underline decoration-line underline-offset-4 transition hover:text-brand-strong"
      >
        {resource.cta}
      </TrackedLink>
    </article>
  );
}
