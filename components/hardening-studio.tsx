"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const options = {
  primaryAccount: ["Gmail", "Apple", "Microsoft", "Mixed / other"],
  setupStyle: ["Personal basics", "Work and personal mixed", "Public-facing profile", "Crypto involved"],
  supportModel: ["Solo", "With partner or assistant", "Small team"],
  deviceState: ["Clean primary device", "Multiple active devices", "Shared or old devices still around"],
  recoveryState: ["Not reviewed", "Partly cleaned", "Documented and tested"],
  publicExposure: ["Low", "Some public presence", "High or frequent posting"],
} as const;

type PlannerState = {
  primaryAccount: (typeof options.primaryAccount)[number];
  setupStyle: (typeof options.setupStyle)[number];
  supportModel: (typeof options.supportModel)[number];
  deviceState: (typeof options.deviceState)[number];
  recoveryState: (typeof options.recoveryState)[number];
  publicExposure: (typeof options.publicExposure)[number];
};

type Recommendation = {
  bucket: "Do first" | "This week" | "Keep watching";
  title: string;
  detail: string;
};

const initialState: PlannerState = {
  primaryAccount: "Gmail",
  setupStyle: "Personal basics",
  supportModel: "Solo",
  deviceState: "Clean primary device",
  recoveryState: "Not reviewed",
  publicExposure: "Low",
};

function buildRecommendations(state: PlannerState): Recommendation[] {
  const items: Recommendation[] = [
    {
      bucket: "Do first",
      title: `Harden your ${state.primaryAccount} account like it controls everything else`,
      detail:
        "Review recovery options, active sessions, forwarding rules, and MFA before spreading effort across lower-value accounts.",
    },
  ];

  if (state.recoveryState === "Not reviewed") {
    items.push({
      bucket: "Do first",
      title: "Clean up recovery before adding more tools",
      detail:
        "Choose the email, phone number, and backup code process you actually want to rely on under stress.",
    });
  }

  if (state.deviceState !== "Clean primary device") {
    items.push({
      bucket: "Do first",
      title: "Reduce old or shared device risk",
      detail:
        "Review where important accounts are still signed in and remove legacy access before making bigger privacy changes.",
    });
  }

  if (state.setupStyle === "Work and personal mixed") {
    items.push({
      bucket: "This week",
      title: "Separate admin work from everyday browsing",
      detail:
        "Use distinct browser profiles and account boundaries so work resets, personal recovery, and public activity do not overlap.",
    });
  }

  if (state.setupStyle === "Public-facing profile" || state.publicExposure !== "Low") {
    items.push({
      bucket: "This week",
      title: "Reduce public identity overlap",
      detail:
        "Map which handles, inboxes, and phone numbers are exposed publicly and cut the ones that do not need to be linked.",
    });
  }

  if (state.setupStyle === "Crypto involved") {
    items.push({
      bucket: "This week",
      title: "Separate public identity from wallet routines",
      detail:
        "Use calmer, cleaner habits for wallets, exchanges, and travel so convenience does not become attribution.",
    });
  }

  if (state.supportModel !== "Solo") {
    items.push({
      bucket: "Keep watching",
      title: "Document who can touch what",
      detail:
        "Assistants, partners, or small teams need clearer access boundaries, shared recovery notes, and an incident sequence that everyone understands.",
    });
  }

  if (state.recoveryState === "Documented and tested" && state.deviceState === "Clean primary device") {
    items.push({
      bucket: "Keep watching",
      title: "Set a quarterly cleanup rhythm",
      detail:
        "A calmer maintenance habit beats one intense privacy sprint followed by a year of drift.",
    });
  } else {
    items.push({
      bucket: "Keep watching",
      title: "Write down what you change as you go",
      detail:
        "Simple notes help you avoid self-lockout and make later cleanup much easier.",
    });
  }

  return items;
}

function buildServiceNudge(state: PlannerState) {
  if (state.setupStyle === "Crypto involved" || state.publicExposure === "High or frequent posting") {
    return "If the overlap feels sensitive or public-facing, a Private OPSEC Advisory is the cleaner next step.";
  }

  if (state.recoveryState === "Not reviewed" || state.deviceState !== "Clean primary device") {
    return "If you want help implementing the cleanup, a Hardening Sprint will move faster than doing it alone.";
  }

  return "If you want a second pair of eyes before changing anything major, start with a Personal Privacy Review.";
}

export function HardeningStudio() {
  const [state, setState] = useState<PlannerState>(initialState);

  const recommendations = buildRecommendations(state);
  const serviceNudge = buildServiceNudge(state);

  const setField = <Key extends keyof PlannerState>(key: Key, value: PlannerState[Key]) => {
    setState((current) => ({ ...current, [key]: value }));
  };

  const groups: Array<{ title: Recommendation["bucket"]; items: Recommendation[] }> = [
    { title: "Do first", items: recommendations.filter((item) => item.bucket === "Do first") },
    { title: "This week", items: recommendations.filter((item) => item.bucket === "This week") },
    { title: "Keep watching", items: recommendations.filter((item) => item.bucket === "Keep watching") },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Planner inputs</p>
        <h3 className="mt-3 text-2xl font-bold text-ink">Account hardening planner</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Describe your current setup and FK94 turns it into a calmer sequence of fixes. No login,
          no fear tactics, no fake score.
        </p>

        <div className="mt-8 space-y-6">
          {(Object.keys(options) as Array<keyof typeof options>).map((key) => (
            <div key={key}>
              <p className="text-sm font-semibold text-ink">{labelMap[key]}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {options[key].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setField(key, option)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition",
                      state[key] === option
                        ? "bg-accent text-black"
                        : "border border-line bg-card/80 text-ink hover:border-accent/30",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Suggested plan</p>
        <div className="mt-5 rounded-xl border border-line bg-card p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Current setup read</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            {state.setupStyle} around {state.primaryAccount}, {state.supportModel.toLowerCase()},
            {" "}{state.publicExposure.toLowerCase()} exposure, and recovery that is{" "}
            {state.recoveryState.toLowerCase()}.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {groups.map((group) => (
            <div key={group.title} className="rounded-xl border border-line bg-card p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">{group.title}</p>
              <div className="mt-4 space-y-4">
                {group.items.map((item) => (
                  <div key={item.title} className="rounded-xl border border-line bg-background/50 p-4">
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-5 text-sm leading-7 text-ink">
          {serviceNudge}
        </div>
      </section>
    </div>
  );
}

const labelMap: Record<keyof typeof options, string> = {
  primaryAccount: "Primary account",
  setupStyle: "Which situation fits best?",
  supportModel: "Who touches your setup?",
  deviceState: "Device situation",
  recoveryState: "Recovery status",
  publicExposure: "Public exposure",
};
