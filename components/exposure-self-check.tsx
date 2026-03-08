"use client";

import { useState } from "react";

const prompts = [
  {
    id: "single-recovery",
    question: "Do most of your important accounts depend on the same email or phone number for recovery?",
    riskyAnswer: "yes",
  },
  {
    id: "public-overlap",
    question: "Do you reuse the same public handle, email, or phone number across multiple public platforms?",
    riskyAnswer: "yes",
  },
  {
    id: "mfa-review",
    question: "Have you reviewed your MFA and recovery settings in the last 12 months?",
    riskyAnswer: "no",
  },
  {
    id: "old-accounts",
    question: "Do you still have old accounts, old devices, or old recovery options connected to critical services?",
    riskyAnswer: "yes",
  },
  {
    id: "crypto-overlap",
    question: "If you use crypto, do your wallet habits overlap heavily with your public identity?",
    riskyAnswer: "yes",
  },
];

export function ExposureSelfCheck() {
  const [answers, setAnswers] = useState<Record<string, "yes" | "no">>({});

  const riskCount = prompts.reduce((count, prompt) => {
    return answers[prompt.id] === prompt.riskyAnswer ? count + 1 : count;
  }, 0);

  const level = riskCount >= 4 ? "Needs attention" : riskCount >= 2 ? "Mixed" : "Good baseline";

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Self-check</p>
        <h3 className="mt-3 text-2xl font-bold text-ink">Exposure Self-Check</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          This is not a scan. It is a quick way to notice obvious dependencies, overlap, and cleanup priorities.
        </p>
        <div className="mt-8 space-y-4">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="rounded-xl border border-line bg-card/80 p-5">
              <p className="text-sm font-medium leading-7 text-ink">{prompt.question}</p>
              <div className="mt-4 flex gap-3">
                {(["yes", "no"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [prompt.id]: value }))}
                    className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                      answers[prompt.id] === value
                        ? "bg-accent text-black"
                        : "border border-line bg-card text-ink"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Result</p>
        <div className="mt-5 rounded-xl border border-line bg-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Current baseline</p>
          <p className="mt-3 text-4xl font-bold text-accent">{level}</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            {riskCount} of {prompts.length} answers point to avoidable overlap or weak recovery habits.
          </p>
        </div>
        <div className="mt-6 space-y-3">
          {riskCount >= 4 ? (
            <>
              <Tip text="Start with your primary email and recovery settings before making broader changes." />
              <Tip text="Use the OPSEC checklist and consider booking a Personal Privacy Review." />
            </>
          ) : riskCount >= 2 ? (
            <>
              <Tip text="You likely have a few strong habits and a few risky defaults living side by side." />
              <Tip text="A focused hardening plan will probably give you the fastest improvement." />
            </>
          ) : (
            <>
              <Tip text="Your baseline looks healthier than average, but a periodic review still helps." />
              <Tip text="Use the hardening planner to keep improving what matters first." />
            </>
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
