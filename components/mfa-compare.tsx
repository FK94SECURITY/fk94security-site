"use client";

import { useState } from "react";

/* ── Types ─────────────────────────────────────────────────────────── */

type MfaMethod = {
  id: string;
  name: string;
  description: string;
  securityLevel: number;
  easeOfUse: number;
  cost: "$" | "$$" | "$$$" | "Free";
  setupDifficulty: "Easy" | "Moderate" | "Advanced";
  pros: string[];
  cons: string[];
  vulnerableTo: string[];
  bestFor: string;
  guideHref: string;
};

type FilterKey = "security" | "ease" | "free" | "beginner";

/* ── Data ──────────────────────────────────────────────────────────── */

const methods: MfaMethod[] = [
  {
    id: "sms",
    name: "SMS Codes",
    description:
      "A one-time code sent to your phone via text message each time you log in.",
    securityLevel: 2,
    easeOfUse: 5,
    cost: "Free",
    setupDifficulty: "Easy",
    pros: [
      "Available on every phone with a SIM card",
      "No app installation required",
      "Familiar and intuitive for most users",
    ],
    cons: [
      "Vulnerable to SIM-swap attacks",
      "Requires cellular signal to receive codes",
      "Codes can be intercepted via SS7 network exploits",
      "Tied to a phone number that can be ported",
    ],
    vulnerableTo: ["SIM swapping", "SS7 interception", "Social engineering at carrier", "Phone theft"],
    bestFor: "Users who need a quick start and have no other option. Better than no MFA at all.",
    guideHref: "/guides/mfa-setup",
  },
  {
    id: "authenticator",
    name: "Authenticator App",
    description:
      "A TOTP app (Google Authenticator, Authy, Aegis) generates time-based codes that refresh every 30 seconds.",
    securityLevel: 4,
    easeOfUse: 4,
    cost: "Free",
    setupDifficulty: "Easy",
    pros: [
      "Works offline -- no cellular signal needed",
      "Codes are generated locally on your device",
      "Not vulnerable to SIM-swap attacks",
      "Free and widely supported by most services",
    ],
    cons: [
      "Codes can be phished if you enter them on a fake site",
      "Losing your phone without backup codes means losing access",
      "Requires scanning a QR code during initial setup",
      "Not as strong as push or hardware-based methods",
    ],
    vulnerableTo: ["Real-time phishing (attacker relays code)", "Device theft without screen lock", "Malware on device"],
    bestFor: "Most people. A strong balance of security and convenience that is free and works everywhere.",
    guideHref: "/guides/mfa-setup",
  },
  {
    id: "push",
    name: "Push Notifications",
    description:
      "An app (Microsoft Authenticator, Duo) sends a push notification to your phone that you approve or deny with one tap.",
    securityLevel: 4,
    easeOfUse: 5,
    cost: "$",
    setupDifficulty: "Moderate",
    pros: [
      "One-tap approval is faster than typing codes",
      "Shows login context (location, device) so you can spot unauthorized attempts",
      "Harder to phish than typed codes",
      "Some implementations include number matching for extra verification",
    ],
    cons: [
      "Requires internet connection to receive push",
      "Vulnerable to MFA fatigue attacks (repeated push spam)",
      "Tied to a specific app and ecosystem",
      "May require an organizational license for full features",
    ],
    vulnerableTo: ["MFA fatigue / push bombing", "Device compromise", "Accidental approval"],
    bestFor: "Professionals and teams who want fast, low-friction MFA with better phishing resistance than codes.",
    guideHref: "/guides/mfa-setup",
  },
  {
    id: "hardware",
    name: "Hardware Security Key",
    description:
      "A physical device (YubiKey, Google Titan) that you plug in or tap via NFC. Uses FIDO2/WebAuthn protocol.",
    securityLevel: 5,
    easeOfUse: 3,
    cost: "$$$",
    setupDifficulty: "Advanced",
    pros: [
      "Virtually immune to phishing -- cryptographically bound to the real site",
      "No codes to type or push notifications to approve",
      "Cannot be remotely compromised -- requires physical possession",
      "Works across multiple services and platforms",
    ],
    cons: [
      "Costs $25-$70+ per key (you need at least two)",
      "Can be lost or damaged -- requires backup keys",
      "Not supported by every service yet",
      "Requires USB or NFC, which not all devices have",
    ],
    vulnerableTo: ["Physical theft of the key", "Limited to: attacker must have your key in hand"],
    bestFor: "High-risk users, executives, journalists, activists, and anyone protecting critical accounts.",
    guideHref: "/guides/mfa-setup",
  },
];

const filters: { key: FilterKey; label: string; highlight: string; explanation: string }[] = [
  { key: "security", label: "Maximum security", highlight: "hardware", explanation: "Hardware security keys provide the strongest protection against phishing and remote attacks. They are the gold standard." },
  { key: "ease", label: "Easiest to use", highlight: "push", explanation: "Push notifications require just one tap to approve. No codes to remember or type, and they show you login context." },
  { key: "free", label: "Free option", highlight: "authenticator", explanation: "Authenticator apps are completely free, work offline, and provide strong security. The best value in MFA." },
  { key: "beginner", label: "I'm a beginner", highlight: "sms", explanation: "SMS is the simplest starting point, but upgrade to an authenticator app as soon as possible. Any MFA is better than none." },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function MfaCompare() {
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);

  const activeFilterData = filters.find((f) => f.key === activeFilter);
  const highlightedId = activeFilterData?.highlight ?? null;

  return (
    <div className="space-y-6">
      {/* Filter toggles */}
      <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          What matters most to you?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {filters.map((f) => {
            const active = activeFilter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(active ? null : f.key)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-line bg-background text-ink hover:border-accent/20"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {activeFilterData && (
          <div className="mt-4 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4">
            <p className="text-sm font-semibold text-accent">
              For you, we recommend: {methods.find((m) => m.id === highlightedId)?.name}
            </p>
            <p className="mt-1 text-sm leading-7 text-muted">{activeFilterData.explanation}</p>
          </div>
        )}
      </div>

      {/* Method cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {methods.map((method) => {
          const isHighlighted = method.id === highlightedId;
          return (
            <div
              key={method.id}
              className={`rounded-xl border p-6 transition sm:p-8 ${
                isHighlighted
                  ? "border-accent/40 bg-accent/5 ring-1 ring-accent/20"
                  : "border-line bg-card"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-ink">{method.name}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted">{method.description}</p>
                </div>
                {isHighlighted && (
                  <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    Recommended
                  </span>
                )}
              </div>

              {/* Ratings row */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <RatingBlock label="Security" value={method.securityLevel} max={5} />
                <RatingBlock label="Ease of use" value={method.easeOfUse} max={5} />
                <div className="rounded-xl border border-line bg-background p-3 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Cost</p>
                  <p className="mt-1 text-sm font-bold text-ink">{method.cost}</p>
                </div>
              </div>

              {/* Setup difficulty */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Setup:</span>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                    method.setupDifficulty === "Easy"
                      ? "bg-accent/10 text-accent"
                      : method.setupDifficulty === "Moderate"
                        ? "bg-warning/10 text-warning"
                        : "bg-[#f97316]/10 text-[#f97316]"
                  }`}
                >
                  {method.setupDifficulty}
                </span>
              </div>

              {/* Pros & Cons */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-accent">Pros</p>
                  <div className="space-y-2">
                    {method.pros.map((pro) => (
                      <div key={pro} className="rounded-lg border border-accent/10 bg-accent/5 px-3 py-2 text-xs leading-6 text-muted">
                        {pro}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-danger">Cons</p>
                  <div className="space-y-2">
                    {method.cons.map((con) => (
                      <div key={con} className="rounded-lg border border-danger/10 bg-danger/5 px-3 py-2 text-xs leading-6 text-muted">
                        {con}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vulnerable to */}
              <div className="mt-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-warning">Vulnerable to</p>
                <div className="flex flex-wrap gap-2">
                  {method.vulnerableTo.map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-warning/20 bg-warning/8 px-3 py-1 text-xs font-medium text-warning"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Best for */}
              <div className="mt-5 rounded-xl border border-line bg-background px-4 py-3.5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Best for</p>
                <p className="mt-1 text-sm leading-7 text-muted">{method.bestFor}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Need help?</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              Not sure which method fits your situation? Book a session and we will help you set up the right MFA for every account.
            </p>
          </div>
          <a
            href="/get-help"
            className="shrink-0 rounded-lg bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-accent-strong"
          >
            Book a session
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────────── */

function RatingBlock({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="rounded-xl border border-line bg-background p-3 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <div className="mt-1.5 flex items-center justify-center gap-1">
        {Array.from({ length: max }).map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-4 rounded-full ${
              idx < value ? "bg-accent" : "bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
