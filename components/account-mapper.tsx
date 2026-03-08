"use client";

import { useState } from "react";

/* ── Types ─────────────────────────────────────────────────────────── */

type AccountCategory = "email" | "social" | "ecosystem" | "messaging" | "financial" | "services";

type AccountDef = {
  id: string;
  name: string;
  category: AccountCategory;
  icon: string;
};

type AccountLink = {
  accountId: string;
  linkedEmail: string;
  recoveryMethod: "same-email" | "phone" | "other-email" | "none";
};

type DependencyNode = {
  accountId: string;
  name: string;
  dependents: string[];
  riskScore: number;
  isSinglePointOfFailure: boolean;
};

/* ── Account definitions ───────────────────────────────────────────── */

const categoryLabels: Record<AccountCategory, string> = {
  email: "Email",
  social: "Social Media",
  ecosystem: "Ecosystem",
  messaging: "Messaging",
  financial: "Financial",
  services: "Services",
};

const categoryColors: Record<AccountCategory, string> = {
  email: "bg-accent/10 text-accent border-accent/20",
  social: "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20",
  ecosystem: "bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20",
  messaging: "bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20",
  financial: "bg-warning/10 text-warning border-warning/20",
  services: "bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20",
};

const accounts: AccountDef[] = [
  { id: "gmail", name: "Gmail", category: "email", icon: "G" },
  { id: "outlook", name: "Outlook", category: "email", icon: "O" },
  { id: "yahoo", name: "Yahoo Mail", category: "email", icon: "Y" },
  { id: "facebook", name: "Facebook", category: "social", icon: "Fb" },
  { id: "instagram", name: "Instagram", category: "social", icon: "Ig" },
  { id: "twitter", name: "Twitter / X", category: "social", icon: "X" },
  { id: "linkedin", name: "LinkedIn", category: "social", icon: "Li" },
  { id: "tiktok", name: "TikTok", category: "social", icon: "Tk" },
  { id: "apple", name: "Apple ID", category: "ecosystem", icon: "Ap" },
  { id: "google", name: "Google Account", category: "ecosystem", icon: "Go" },
  { id: "whatsapp", name: "WhatsApp", category: "messaging", icon: "Wa" },
  { id: "telegram", name: "Telegram", category: "messaging", icon: "Tg" },
  { id: "signal", name: "Signal", category: "messaging", icon: "Si" },
  { id: "bank", name: "Banks", category: "financial", icon: "Bk" },
  { id: "crypto", name: "Crypto Exchanges", category: "financial", icon: "Cx" },
  { id: "amazon", name: "Amazon", category: "services", icon: "Az" },
  { id: "netflix", name: "Netflix", category: "services", icon: "Nf" },
  { id: "spotify", name: "Spotify", category: "services", icon: "Sp" },
];

const emailAccounts = accounts.filter((a) => a.category === "email");

const recoveryOptions: { value: AccountLink["recoveryMethod"]; label: string }[] = [
  { value: "same-email", label: "Same email" },
  { value: "phone", label: "Phone number" },
  { value: "other-email", label: "Different email" },
  { value: "none", label: "None / unknown" },
];

/* ── Analysis ──────────────────────────────────────────────────────── */

function analyzeLinks(selected: string[], links: AccountLink[]): DependencyNode[] {
  const emailIds = selected.filter((id) => emailAccounts.some((e) => e.id === id));
  const nodes: DependencyNode[] = [];

  for (const emailId of emailIds) {
    const email = accounts.find((a) => a.id === emailId);
    if (!email) continue;

    const dependents = links
      .filter((l) => l.linkedEmail === emailId)
      .map((l) => {
        const acc = accounts.find((a) => a.id === l.accountId);
        return acc?.name ?? l.accountId;
      });

    const noRecovery = links.filter(
      (l) => l.linkedEmail === emailId && l.recoveryMethod === "none",
    ).length;

    const riskScore = Math.min(10, dependents.length * 2 + noRecovery * 3);

    nodes.push({
      accountId: emailId,
      name: email.name,
      dependents,
      riskScore,
      isSinglePointOfFailure: dependents.length >= 3,
    });
  }

  return nodes.sort((a, b) => b.riskScore - a.riskScore);
}

function generateRecommendations(nodes: DependencyNode[], links: AccountLink[]): string[] {
  const recs: string[] = [];

  const spofs = nodes.filter((n) => n.isSinglePointOfFailure);
  if (spofs.length > 0) {
    recs.push(
      `${spofs.map((s) => s.name).join(" and ")} ${spofs.length === 1 ? "is" : "are"} a single point of failure. If compromised, ${spofs.reduce((sum, s) => sum + s.dependents.length, 0)} accounts become vulnerable. Enable hardware-key MFA immediately.`,
    );
  }

  const noRecovery = links.filter((l) => l.recoveryMethod === "none");
  if (noRecovery.length > 0) {
    recs.push(
      `${noRecovery.length} account${noRecovery.length > 1 ? "s have" : " has"} no recovery method configured. You could permanently lose access if something goes wrong.`,
    );
  }

  const sameEmail = links.filter((l) => l.recoveryMethod === "same-email");
  if (sameEmail.length >= 2) {
    recs.push(
      "Multiple accounts use their login email as the recovery method. This creates circular dependencies -- consider adding phone or alternative email recovery.",
    );
  }

  const emailsUsed = new Set(links.map((l) => l.linkedEmail));
  if (emailsUsed.size === 1 && links.length >= 3) {
    recs.push(
      "All your accounts are linked to a single email address. Consider creating a separate email exclusively for financial and sensitive accounts.",
    );
  }

  if (recs.length === 0) {
    recs.push("Your account structure looks reasonable. Continue to use unique passwords and MFA for every account.");
  }

  recs.push("Use a password manager to generate and store unique credentials for every account.");
  recs.push("Review these dependencies quarterly as you add or remove accounts.");

  return recs;
}

/* ── Component ─────────────────────────────────────────────────────── */

type Phase = "select" | "link" | "result";

export function AccountMapper() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selected, setSelected] = useState<string[]>([]);
  const [links, setLinks] = useState<AccountLink[]>([]);
  const [linkStep, setLinkStep] = useState(0);

  const selectedEmails = selected.filter((id) => emailAccounts.some((e) => e.id === id));
  const nonEmailSelected = selected.filter((id) => !emailAccounts.some((e) => e.id === id));

  const toggleAccount = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const startLinking = () => {
    if (selectedEmails.length === 0 || nonEmailSelected.length === 0) return;
    setLinks(
      nonEmailSelected.map((id) => ({
        accountId: id,
        linkedEmail: selectedEmails[0],
        recoveryMethod: "same-email",
      })),
    );
    setLinkStep(0);
    setPhase("link");
  };

  const updateLink = (field: keyof AccountLink, value: string) => {
    setLinks((prev) =>
      prev.map((l, idx) =>
        idx === linkStep ? { ...l, [field]: value } : l,
      ),
    );
  };

  const handleLinkNext = () => {
    if (linkStep < nonEmailSelected.length - 1) {
      setLinkStep(linkStep + 1);
    } else {
      setPhase("result");
    }
  };

  const handleLinkBack = () => {
    if (linkStep > 0) setLinkStep(linkStep - 1);
    else setPhase("select");
  };

  const handleRestart = () => {
    setPhase("select");
    setSelected([]);
    setLinks([]);
    setLinkStep(0);
  };

  /* ── Phase: Select accounts ──────────────────────────────────────── */
  if (phase === "select") {
    const categories = Object.keys(categoryLabels) as AccountCategory[];
    return (
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Step 1</p>
          <h3 className="mt-3 text-2xl font-bold text-ink">Select your accounts</h3>
          <p className="mt-2 text-sm leading-7 text-muted">
            Pick every account you actively use. We will map their dependencies in the next step.
          </p>

          <div className="mt-6 space-y-6">
            {categories.map((cat) => {
              const catAccounts = accounts.filter((a) => a.category === cat);
              return (
                <div key={cat}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-muted">
                    {categoryLabels[cat]}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {catAccounts.map((acc) => {
                      const active = selected.includes(acc.id);
                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => toggleAccount(acc.id)}
                          className={`rounded-xl border p-3 text-left transition ${
                            active
                              ? categoryColors[cat]
                              : "border-line bg-background text-ink hover:border-accent/20"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                                active ? "bg-white/10" : "bg-card"
                              }`}
                            >
                              {acc.icon}
                            </div>
                            <span className="text-sm font-medium">{acc.name}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={startLinking}
            disabled={selectedEmails.length === 0 || nonEmailSelected.length === 0}
            className={`mt-6 w-full rounded-lg px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition ${
              selectedEmails.length > 0 && nonEmailSelected.length > 0
                ? "bg-accent text-black hover:bg-accent-strong"
                : "cursor-not-allowed bg-line text-muted"
            }`}
          >
            Map dependencies
          </button>
        </section>

        <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">How it works</p>
          <div className="mt-5 rounded-xl border border-line bg-card p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">Selected</p>
            <p className="mt-3 text-4xl font-bold text-accent">
              {selected.length}
              <span className="text-xl text-muted"> accounts</span>
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <InfoTip text="Start by selecting at least one email account -- emails are usually the root of your account tree." />
            <InfoTip text="Then select every other account you actively use. The more complete, the more useful the analysis." />
            <InfoTip text="Your data stays in your browser. Nothing is stored or sent anywhere." />
          </div>
        </section>
      </div>
    );
  }

  /* ── Phase: Link accounts ────────────────────────────────────────── */
  if (phase === "link") {
    const currentLink = links[linkStep];
    const currentAccount = accounts.find((a) => a.id === currentLink.accountId);

    return (
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Account {linkStep + 1} of {nonEmailSelected.length}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-5 h-1.5 w-full rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${((linkStep + 1) / nonEmailSelected.length) * 100}%` }}
            />
          </div>

          <h3 className="mt-6 text-xl font-bold text-ink">{currentAccount?.name}</h3>
          <p className="mt-2 text-sm text-muted">
            Tell us how this account is connected to your email accounts.
          </p>

          {/* Linked email */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-muted">
              What email is this account linked to?
            </p>
            <div className="space-y-2">
              {selectedEmails.map((emailId) => {
                const email = accounts.find((a) => a.id === emailId);
                const active = currentLink.linkedEmail === emailId;
                return (
                  <button
                    key={emailId}
                    type="button"
                    onClick={() => updateLink("linkedEmail", emailId)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-accent/30 bg-accent/10 text-ink"
                        : "border-line bg-background text-ink hover:border-accent/20"
                    }`}
                  >
                    <span className="text-sm font-medium">{email?.name ?? emailId}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recovery method */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-muted">
              Recovery method for this account?
            </p>
            <div className="space-y-2">
              {recoveryOptions.map((opt) => {
                const active = currentLink.recoveryMethod === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateLink("recoveryMethod", opt.value)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-accent/30 bg-accent/10 text-ink"
                        : "border-line bg-background text-ink hover:border-accent/20"
                    }`}
                  >
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleLinkBack}
              className="rounded-lg border border-line bg-card px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-accent/30"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleLinkNext}
              className="flex-1 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-accent-strong"
            >
              {linkStep < nonEmailSelected.length - 1 ? "Next account" : "Generate report"}
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Mapping progress</p>
          <div className="mt-5 space-y-2">
            {nonEmailSelected.map((id, idx) => {
              const acc = accounts.find((a) => a.id === id);
              const link = links[idx];
              const done = idx < linkStep;
              const current = idx === linkStep;
              const emailName = accounts.find((a) => a.id === link?.linkedEmail)?.name ?? "---";
              return (
                <div
                  key={id}
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    current
                      ? "border-accent/30 bg-accent/10 text-ink"
                      : done
                        ? "border-line bg-card text-muted"
                        : "border-line bg-card/60 text-muted/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{acc?.name}</span>
                    {done && (
                      <span className="text-xs text-accent">{emailName}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  /* ── Phase: Result ───────────────────────────────────────────────── */
  const nodes = analyzeLinks(selected, links);
  const recommendations = generateRecommendations(nodes, links);

  const totalDependents = nodes.reduce((sum, n) => sum + n.dependents.length, 0);
  const spofs = nodes.filter((n) => n.isSinglePointOfFailure);
  const noRecoveryCount = links.filter((l) => l.recoveryMethod === "none").length;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      {/* Left: dependency tree */}
      <section className="space-y-6">
        <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Dependency report</p>
          <h3 className="mt-3 text-2xl font-bold text-ink">Account Dependency Map</h3>

          {/* Stats row */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-line bg-background p-4 text-center">
              <p className="text-2xl font-bold text-accent">{selected.length}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted">Accounts</p>
            </div>
            <div className={`rounded-xl border p-4 text-center ${spofs.length > 0 ? "border-danger/30 bg-danger/10" : "border-line bg-background"}`}>
              <p className={`text-2xl font-bold ${spofs.length > 0 ? "text-danger" : "text-accent"}`}>{spofs.length}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted">Single points</p>
            </div>
            <div className={`rounded-xl border p-4 text-center ${noRecoveryCount > 0 ? "border-warning/30 bg-warning/10" : "border-line bg-background"}`}>
              <p className={`text-2xl font-bold ${noRecoveryCount > 0 ? "text-warning" : "text-accent"}`}>{noRecoveryCount}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted">No recovery</p>
            </div>
          </div>
        </div>

        {/* Dependency tree */}
        <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            If compromised...
          </p>
          <div className="mt-5 space-y-4">
            {nodes.map((node) => (
              <div
                key={node.accountId}
                className={`rounded-xl border p-5 ${
                  node.isSinglePointOfFailure
                    ? "border-danger/30 bg-danger/5"
                    : "border-line bg-background"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                        node.isSinglePointOfFailure
                          ? "bg-danger/20 text-danger"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {accounts.find((a) => a.id === node.accountId)?.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{node.name}</p>
                      {node.isSinglePointOfFailure && (
                        <p className="text-xs font-medium text-danger">Single point of failure</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${node.riskScore >= 7 ? "text-danger" : node.riskScore >= 4 ? "text-warning" : "text-accent"}`}>
                      {node.riskScore}/10
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Risk</p>
                  </div>
                </div>

                {node.dependents.length > 0 && (
                  <div className="mt-4 border-t border-line pt-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {node.dependents.length} account{node.dependents.length > 1 ? "s" : ""} at risk
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {node.dependents.map((dep) => (
                        <span
                          key={dep}
                          className="rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-muted"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {nodes.length === 0 && (
              <div className="rounded-xl border border-line bg-background p-5 text-center text-sm text-muted">
                No email dependencies found. Make sure you selected email accounts and linked other accounts to them.
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="w-full rounded-lg border border-line bg-card px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-accent/30"
        >
          Start over
        </button>
      </section>

      {/* Right: recommendations */}
      <section className="space-y-6">
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Recommendations</p>
          <div className="mt-5 space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="rounded-xl border border-line bg-card px-4 py-4 text-sm leading-7 text-muted">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-md bg-accent/10 text-[10px] font-bold text-accent">
                  {idx + 1}
                </span>
                {rec}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Next steps</p>
          <div className="mt-5 space-y-3">
            <a
              href="/free-tools#mfa-compare"
              className="flex items-center justify-between rounded-xl border border-line bg-background px-4 py-3.5 text-sm font-medium text-ink transition hover:border-accent/30"
            >
              <span>Compare MFA methods for your root accounts</span>
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/free-tools#password-analyzer"
              className="flex items-center justify-between rounded-xl border border-line bg-background px-4 py-3.5 text-sm font-medium text-ink transition hover:border-accent/30"
            >
              <span>Test your password strength</span>
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/get-help"
              className="flex items-center justify-between rounded-xl border border-line bg-background px-4 py-3.5 text-sm font-medium text-ink transition hover:border-accent/30"
            >
              <span>Book a security review session</span>
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────────── */

function InfoTip({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-line bg-card px-4 py-4 text-sm leading-7 text-muted">
      {text}
    </div>
  );
}
