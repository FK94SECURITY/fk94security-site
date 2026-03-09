"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

export function ContactForm() {
  const { t, isArgentina } = useLocale();
  const f = t.audit.form;
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "privacy-review",
    urgency: "low",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          countryTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          helpType: formData.topic,
          urgency: formData.urgency,
          usedResources: "no",
          details: formData.message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </div>
        <p className="text-lg font-semibold text-ink">Something went wrong. Please try again later.</p>
        <button
          onClick={() => setError(false)}
          className="mt-4 rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black transition hover:bg-accent-strong"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <p className="text-lg font-semibold text-ink">{f.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">{f.name} *</span>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
            className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/50"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">{f.email} *</span>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
            className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/50"
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">{f.topic} *</span>
          <select
            value={formData.topic}
            onChange={(e) => setFormData((d) => ({ ...d, topic: e.target.value }))}
            className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/50"
          >
            {f.topics.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">{f.urgency} *</span>
          <select
            value={formData.urgency}
            onChange={(e) => setFormData((d) => ({ ...d, urgency: e.target.value }))}
            className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/50"
          >
            {f.urgencies.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink">{f.message} *</span>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
          className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm leading-6 text-ink outline-none transition focus:border-accent/50"
        />
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">{t.audit.price}</p>
          <p className="text-xl font-bold text-accent">{isArgentina ? t.audit.priceArs : t.audit.priceValue}</p>
          <p className="text-xs text-muted">{t.audit.priceNote}</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-black transition hover:bg-accent-strong disabled:opacity-50"
        >
          {loading ? f.sending : f.send}
        </button>
      </div>
    </form>
  );
}
