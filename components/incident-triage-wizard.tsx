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
      <section className="panel rounded-[2rem] border border-line p-6 sm:p-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-brand">Triage</p>
        <h3 className="mt-3 font-display text-2xl text-ink">Incident Triage Wizard</h3>
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
                className={`w-full rounded-[1.6rem] border p-5 text-left transition ${
                  active ? "border-ink bg-ink text-sand" : "border-line bg-white/80 text-ink"
                }`}
              >
                <p className="text-base font-semibold">{prompt.label}</p>
                <p className={`mt-2 text-sm leading-7 ${active ? "text-sand/74" : "text-muted"}`}>
                  {prompt.help}
                </p>
              </button>
            );
          })}
        </div>
      </section>
      <section className="dark-panel rounded-[2rem] border border-black/10 p-6 sm:p-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-signal">First response</p>
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
    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-sand/76">
      {text}
    </div>
  );
}

function UrgentCallout() {
  return (
    <div className="rounded-[1.5rem] border border-signal/40 bg-signal/12 px-4 py-4 text-sm leading-7 text-sand">
      This looks closer to an urgent case. Do the first-response steps, then use the Incident Help intake if you want private support.
    </div>
  );
}
