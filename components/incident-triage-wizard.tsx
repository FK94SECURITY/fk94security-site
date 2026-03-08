"use client";

import { useState } from "react";

const incidentPrompts = [
  {
    id: "clicked-link",
    label: "I clicked something suspicious",
    help: "You clicked a phishing link, opened a suspicious attachment, or signed into something weird.",
  },
  {
    id: "lost-access",
    label: "I lost access to an important account",
    help: "You cannot log in, recovery is failing, or something changed without your consent.",
  },
  {
    id: "strange-activity",
    label: "I noticed strange account activity",
    help: "Unexpected logins, password resets, forwarding rules, or unknown sessions.",
  },
  {
    id: "device-issue",
    label: "A device may be compromised or lost",
    help: "A device is missing, behaving strangely, or was exposed to unsafe conditions.",
  },
];

export function IncidentTriageWizard() {
  const [selected, setSelected] = useState<string[]>([]);

  const urgent = selected.length >= 2 || selected.includes("lost-access") || selected.includes("device-issue");

  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Triage</p>
        <h3 className="mt-3 text-2xl font-bold text-ink">Incident Triage Wizard</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Use this to slow the situation down. Pick what matches your case and focus on order, not panic.
        </p>
        <div className="mt-8 space-y-4">
          {incidentPrompts.map((prompt) => {
            const active = selected.includes(prompt.id);
            return (
              <button
                key={prompt.id}
                type="button"
                onClick={() =>
                  setSelected((current) =>
                    current.includes(prompt.id)
                      ? current.filter((item) => item !== prompt.id)
                      : [...current, prompt.id],
                  )
                }
                className={`w-full rounded-xl border p-5 text-left transition ${
                  active ? "border-accent/30 bg-accent/10 text-ink" : "border-line bg-card/80 text-ink"
                }`}
              >
                <p className="text-base font-semibold">{prompt.label}</p>
                <p className={`mt-2 text-sm leading-7 ${active ? "text-muted" : "text-muted"}`}>
                  {prompt.help}
                </p>
              </button>
            );
          })}
        </div>
      </section>
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">First response</p>
        <div className="mt-6 space-y-4">
          <Tip text="Protect your primary email and recovery path first. That is usually the critical account behind everything else." />
          <Tip text="Check recent sessions, forwarding rules, recovery settings, and unfamiliar devices before changing everything at random." />
          <Tip text="Document what happened, what you noticed, and what you changed. That makes later cleanup clearer." />
          {urgent ? (
            <UrgentCallout />
          ) : (
            <Tip text="If the situation feels uncertain but not urgent, work through the checklist and consider booking focused help." />
          )}
        </div>
      </section>
    </div>
  );
}

function Tip({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-line bg-card px-4 py-4 text-sm leading-7 text-muted">
      {text}
    </div>
  );
}

function UrgentCallout() {
  return (
    <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-4 text-sm leading-7 text-ink">
      This looks closer to an urgent case. Do the first-response steps, then use the Incident Help intake if you want private support.
    </div>
  );
}
