"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { intakeOptions, urgencyOptions } from "@/content/site";
import { trackEvent, analyticsEvents } from "@/lib/analytics";
import { type IntakePayload, type IntakeResult } from "@/lib/intake";

const defaultPayload: IntakePayload = {
  name: "",
  email: "",
  countryTimezone: "",
  helpType: "general-privacy-cleanup",
  urgency: "low",
  usedResources: "no",
  details: "",
};

export function IntakeForm({ defaultHelpType }: { defaultHelpType?: string }) {
  const router = useRouter();
  const [payload, setPayload] = useState<IntakePayload>({
    ...defaultPayload,
    helpType: defaultHelpType ?? defaultPayload.helpType,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to send the request right now.");
      }

      const data = (await response.json()) as IntakeResult;
      trackEvent(analyticsEvents.intakeSubmit, {
        help_type: payload.helpType,
        urgency: payload.urgency,
        fit: data.fit,
      });

      const params = new URLSearchParams({
        help: payload.helpType,
        fit: data.fit,
        urgency: data.urgency,
        service: data.suggestedService,
        window: data.responseWindow,
      });

      router.push(`/get-help/thanks?${params.toString()}`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel rounded-[2rem] border border-line p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <input
            required
            value={payload.name}
            onChange={(event) => setPayload((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:border-ink/30"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            value={payload.email}
            onChange={(event) => setPayload((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:border-ink/30"
          />
        </Field>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Country / Timezone">
          <input
            required
            value={payload.countryTimezone}
            onChange={(event) =>
              setPayload((current) => ({ ...current, countryTimezone: event.target.value }))
            }
            placeholder="e.g. Argentina, US East Coast"
            className="w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-ink/30"
          />
        </Field>
        <Field label="What do you need help with?">
          <select
            value={payload.helpType}
            onChange={(event) =>
              setPayload((current) => ({ ...current, helpType: event.target.value }))
            }
            className="w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:border-ink/30"
          >
            {intakeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Urgency">
          <select
            value={payload.urgency}
            onChange={(event) =>
              setPayload((current) => ({
                ...current,
                urgency: event.target.value as IntakePayload["urgency"],
              }))
            }
            className="w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:border-ink/30"
          >
            {urgencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Have you used any FK94 free resources?">
          <select
            value={payload.usedResources}
            onChange={(event) =>
              setPayload((current) => ({ ...current, usedResources: event.target.value }))
            }
            className="w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:border-ink/30"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Tell us what is going on">
          <textarea
            required
            rows={5}
            value={payload.details}
            onChange={(event) => setPayload((current) => ({ ...current, details: event.target.value }))}
            placeholder="Describe your situation briefly. The more context, the better we can help."
            className="w-full rounded-[1.6rem] border border-line bg-white/70 px-4 py-3 text-sm leading-7 text-ink outline-none placeholder:text-muted focus:border-ink/30"
          />
        </Field>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-7 text-muted">
          We will review your request and suggest the best next step, whether that is a free resource or a 1:1 session.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      {error ? <p className="mt-4 text-sm text-warning">{error}</p> : null}
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
