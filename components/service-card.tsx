import { type Service } from "@/content/site";

import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="rounded-[1.6rem] border border-line bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{service.pricingNote}</p>
      <h3 className="mt-3 font-display text-3xl text-ink">{service.name}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{service.summary}</p>
      <div className="mt-5 space-y-2.5">
        {service.points.map((point) => (
          <div key={point} className="flex gap-3 text-sm text-muted">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
            <span>{point}</span>
          </div>
        ))}
      </div>
      <TrackedLink
        href={service.href}
        eventName={analyticsEvents.serviceOpen}
        eventProps={{ service: service.slug }}
        className="mt-6 inline-flex text-sm font-semibold text-ink underline decoration-line underline-offset-4 transition hover:text-brand-strong"
      >
        {service.cta}
      </TrackedLink>
    </article>
  );
}
