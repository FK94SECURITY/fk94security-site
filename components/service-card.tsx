import { type Service } from "@/content/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="rounded-xl border border-line bg-card p-6">
      <h3 className="text-2xl font-bold text-ink">{service.name}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{service.summary}</p>
      <div className="mt-5 space-y-2.5">
        {service.points.map((point) => (
          <div key={point} className="flex gap-3 text-sm text-muted">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
