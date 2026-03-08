import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-xl border border-line bg-card px-6 py-10 sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">Not found</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            That page does not exist in the current FK94 site.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            Head back to the free resources, read a guide, or book a private review if you need help.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-lg bg-accent px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-accent-strong"
            >
              Go home
            </Link>
            <Link
              href="/free-resources"
              className="rounded-lg border border-line bg-card px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-accent/30"
            >
              Explore free resources
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
