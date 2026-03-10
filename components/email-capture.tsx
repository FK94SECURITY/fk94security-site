"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

type EmailCaptureProps = {
  variant?: "full" | "compact";
};

export function EmailCapture({ variant = "full" }: EmailCaptureProps) {
  const { t } = useLocale();
  const s = t.subscribe;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  if (variant === "compact") {
    return (
      <div className="rounded-xl border border-line bg-card p-4">
        <p className="text-sm font-semibold text-ink">{s.compactTitle}</p>
        {status === "success" ? (
          <p className="mt-2 text-sm text-accent">{s.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={s.placeholder}
              className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition focus:border-accent/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent-strong disabled:opacity-50"
            >
              {loading ? "..." : s.ctaCompact}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-xs text-red-400">{s.error}</p>
        )}
      </div>
    );
  }

  return (
    <section className="section-space border-t border-line/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {s.kicker}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          {s.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          {s.subtitle}
        </p>
        {status === "success" ? (
          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-6">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-base font-semibold text-ink">{s.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={s.placeholder}
              className="rounded-lg border border-line bg-surface px-4 py-3.5 text-sm text-ink outline-none transition focus:border-accent/50 sm:w-80"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-accent-strong disabled:opacity-50"
            >
              {loading ? s.sending : s.cta}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">{s.error}</p>
        )}
        <p className="mt-4 text-xs text-muted/60">{s.privacy}</p>
      </div>
    </section>
  );
}
