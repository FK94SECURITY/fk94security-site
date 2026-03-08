import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="panel rounded-[2.2rem] border border-line px-6 py-10 sm:px-10">
          <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">Not found</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            That page does not exist in the current FK94 site.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            Head back to the free resources, read a guide, or book a private review if you need help.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-sand transition hover:bg-brand-strong"
            >
              Go home
            </Link>
            <Link
              href="/free-resources"
              className="rounded-full border border-line bg-panel px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
            >
              Explore free resources
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
