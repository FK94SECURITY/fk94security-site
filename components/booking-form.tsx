"use client";

import { useState } from "react";

const topics = [
  { value: "privacy-review", label: "Privacy Review" },
  { value: "account-hardening", label: "Account Hardening" },
  { value: "incident", label: "Incident Response" },
  { value: "opsec", label: "OPSEC Advisory" },
  { value: "device", label: "Device Hardening" },
  { value: "training", label: "Security Training" },
  { value: "other", label: "Other" },
];

export function BookingForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          helpType: data.topic,
          urgency: "medium",
          countryTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          usedResources: "no",
          details: `[BOOKING REQUEST]\nPreferred date: ${data.date}\nPreferred time: ${data.time}\n\n${data.message}`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 p-12">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-4 text-lg font-semibold text-ink">Something went wrong</p>
          <p className="mt-2 text-sm text-muted">We could not send your request. Please try again.</p>
          <button
            onClick={() => setError(false)}
            className="mt-4 rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black transition hover:bg-accent-strong"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-accent/20 bg-accent/5 p-12">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-lg font-semibold text-ink">Request sent!</p>
          <p className="mt-2 text-sm text-muted">We will get back to you within 24 hours to confirm your session.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="book-name" className="mb-1.5 block text-xs font-medium text-muted">
            Full name
          </label>
          <input
            id="book-name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
        <div>
          <label htmlFor="book-email" className="mb-1.5 block text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="book-email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
        <div>
          <label htmlFor="book-topic" className="mb-1.5 block text-xs font-medium text-muted">
            Topic
          </label>
          <select
            id="book-topic"
            name="topic"
            required
            className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-ink focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
          >
            <option value="">Select...</option>
            {topics.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="book-date" className="mb-1.5 block text-xs font-medium text-muted">
            Preferred date
          </label>
          <input
            id="book-date"
            name="date"
            type="date"
            required
            className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-ink focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="book-time" className="mb-1.5 block text-xs font-medium text-muted">
            Preferred time
          </label>
          <select
            id="book-time"
            name="time"
            required
            className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-ink focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
          >
            <option value="">Select time slot...</option>
            <option value="morning">Morning (9:00 - 12:00)</option>
            <option value="afternoon">Afternoon (13:00 - 17:00)</option>
            <option value="evening">Evening (18:00 - 21:00)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="book-message" className="mb-1.5 block text-xs font-medium text-muted">
            Brief description of your situation
          </label>
          <textarea
            id="book-message"
            name="message"
            rows={4}
            required
            className="w-full rounded-lg border border-line bg-background px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
            placeholder="Tell us what you need help with..."
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={sending}
        className="mt-6 w-full rounded-lg bg-accent py-3 text-sm font-semibold text-black transition hover:bg-accent-strong disabled:opacity-50"
      >
        {sending ? "Sending..." : "Request Session"}
      </button>
    </form>
  );
}
