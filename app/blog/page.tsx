"use client";

import { useState } from "react";
import Link from "next/link";

import { useLocale } from "@/lib/locale-context";
import { blogPosts, blogCategories, type BlogPost } from "@/content/blog";

const categoryColors: Record<BlogPost["category"], string> = {
  "breach-alert": "border-danger/30 bg-danger/10 text-danger",
  "security-tip": "border-accent/30 bg-accent/10 text-accent",
  "tool-update": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  news: "border-warning/30 bg-warning/10 text-warning",
};

const categoryLabelsI18n = {
  en: {
    "breach-alert": "Breach Alert",
    "security-tip": "Security Tip",
    "tool-update": "Tool Update",
    news: "News",
  } as Record<BlogPost["category"], string>,
  es: {
    "breach-alert": "Alerta de Brecha",
    "security-tip": "Consejo de Seguridad",
    "tool-update": "Actualizaci\u00f3n de Herramienta",
    news: "Noticias",
  } as Record<BlogPost["category"], string>,
};

const blogCategoriesI18n = {
  en: {
    all: "All",
    "breach-alert": "Breach Alerts",
    "security-tip": "Security Tips",
    "tool-update": "Tool Updates",
    news: "News",
  } as Record<string, string>,
  es: {
    all: "Todas",
    "breach-alert": "Alertas de Brechas",
    "security-tip": "Consejos de Seguridad",
    "tool-update": "Actualizaciones",
    news: "Noticias",
  } as Record<string, string>,
};

const content = {
  en: {
    eyebrow: "Blog",
    heading: "Security alerts, tips, and news you can actually use.",
    subheading:
      "Practical security writing for normal people. Breach alerts when they matter, tips that reduce real risk, and news about the tools and threats that affect everyday users.",
    noPostsMessage: "No posts in this category yet.",
    readArticle: "Read article",
  },
  es: {
    eyebrow: "Blog",
    heading: "Alertas de seguridad, consejos y noticias que realmente pod\u00e9s usar.",
    subheading:
      "Escritura de seguridad pr\u00e1ctica para personas normales. Alertas de brechas cuando importan, consejos que reducen riesgo real, y noticias sobre herramientas y amenazas que afectan a usuarios comunes.",
    noPostsMessage: "Todav\u00eda no hay publicaciones en esta categor\u00eda.",
    readArticle: "Leer art\u00edculo",
  },
};

function formatDate(iso: string, locale: "en" | "es"): string {
  return new Date(iso).toLocaleDateString(locale === "es" ? "es-AR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const { locale } = useLocale();
  const t = content[locale];
  const categoryLabels = categoryLabelsI18n[locale];
  const catLabels = blogCategoriesI18n[locale];

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card px-6 py-10 sm:px-10">
            <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">
              {t.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">
              {t.heading}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {t.subheading}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    activeCategory === cat.key
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line bg-card/80 text-muted hover:border-accent/30 hover:text-ink"
                  }`}
                >
                  {catLabels[cat.key] ?? cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-line bg-card p-10 text-center">
              <p className="text-muted">{t.noPostsMessage}</p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {filtered.map((post) => (
                <article
                  key={post.slug}
                  className="card-hover rounded-xl border border-line bg-card p-6"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${categoryColors[post.category]}`}
                    >
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-xs text-muted">
                      {formatDate(post.date, locale)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-muted">{post.readTime}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:text-accent-strong"
                    >
                      {t.readArticle}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
