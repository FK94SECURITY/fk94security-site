import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { blogPosts, type BlogPost } from "@/content/blog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryLabels: Record<BlogPost["category"], string> = {
  "breach-alert": "Breach Alert",
  "security-tip": "Security Tip",
  "tool-update": "Tool Update",
  news: "News",
};

const categoryColors: Record<BlogPost["category"], string> = {
  "breach-alert": "border-danger/30 bg-danger/10 text-danger",
  "security-tip": "border-accent/30 bg-accent/10 text-accent",
  "tool-update": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  news: "border-warning/30 bg-warning/10 text-warning",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getRelatedPosts(current: BlogPost): BlogPost[] {
  return blogPosts
    .filter((post) => post.slug !== current.slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post);

  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card px-6 py-10 sm:px-10">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${categoryColors[post.category]}`}
              >
                {categoryLabels[post.category]}
              </span>
              <span className="text-xs text-muted">{formatDate(post.date)}</span>
              <span className="text-xs text-muted">{post.readTime}</span>
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="rounded-xl border border-line bg-card p-6 sm:p-10">
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* CTA */}
          <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">
              Need help with this?
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              If this article raised concerns about your own security, or if you need
              personalized guidance, book a 1:1 session with FK94 Security.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:bg-accent-strong"
            >
              Book a 1:1 Session
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">
                Related articles
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="card-hover rounded-xl border border-line bg-card p-5"
                  >
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${categoryColors[rel.category]}`}
                    >
                      {categoryLabels[rel.category]}
                    </span>
                    <h4 className="mt-3 text-sm font-semibold leading-snug text-ink">
                      {rel.title}
                    </h4>
                    <p className="mt-2 text-xs text-muted">{rel.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:text-accent-strong"
            >
              &larr; Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
