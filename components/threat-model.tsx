"use client";

import { useState } from "react";

/* ── Types ─────────────────────────────────────────────────────────── */

type QuestionKind = "single" | "multi";

type Question = {
  id: string;
  text: string;
  kind: QuestionKind;
  options: string[];
};

type Answers = Record<string, string[]>;

type ThreatResult = {
  profileName: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  topThreats: { name: string; explanation: string }[];
  actionPlan: string[];
  recommendedTools: { name: string; href: string }[];
  needsConsultation: boolean;
};

/* ── Questions ─────────────────────────────────────────────────────── */

const questions: Question[] = [
  {
    id: "role",
    text: "What describes you best?",
    kind: "single",
    options: [
      "Regular person",
      "Public figure",
      "Journalist",
      "Activist",
      "Business owner",
      "High-net-worth individual",
      "Other",
    ],
  },
  {
    id: "concerns",
    text: "What are you most worried about?",
    kind: "multi",
    options: [
      "Account takeover",
      "Stalking",
      "Doxxing",
      "Financial fraud",
      "Identity theft",
      "Government surveillance",
      "Corporate espionage",
      "General privacy",
    ],
  },
  {
    id: "online",
    text: "How much of your life is online?",
    kind: "single",
    options: ["Minimal", "Moderate", "Heavy", "Everything"],
  },
  {
    id: "devices",
    text: "What devices do you use?",
    kind: "multi",
    options: ["iPhone", "Android", "Mac", "Windows", "Linux"],
  },
  {
    id: "sensitive",
    text: "Do you handle sensitive information?",
    kind: "single",
    options: ["No", "Sometimes", "Regularly", "It's my job"],
  },
  {
    id: "targeted",
    text: "Have you been targeted before?",
    kind: "single",
    options: ["Never", "Once", "Multiple times", "Currently under threat"],
  },
  {
    id: "technical",
    text: "What's your technical comfort level?",
    kind: "single",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
];

/* ── Result generation ─────────────────────────────────────────────── */

function generateResult(answers: Answers): ThreatResult {
  const role = answers.role?.[0] ?? "Regular person";
  const concerns = answers.concerns ?? [];
  const online = answers.online?.[0] ?? "Moderate";
  const sensitive = answers.sensitive?.[0] ?? "No";
  const targeted = answers.targeted?.[0] ?? "Never";
  const technical = answers.technical?.[0] ?? "Beginner";

  // --- Risk score ---
  let riskScore = 0;
  if (["Public figure", "Journalist", "Activist"].includes(role)) riskScore += 3;
  if (["Business owner", "High-net-worth individual"].includes(role)) riskScore += 2;
  if (concerns.length >= 4) riskScore += 2;
  if (["Stalking", "Government surveillance", "Corporate espionage"].some((c) => concerns.includes(c))) riskScore += 2;
  if (["Heavy", "Everything"].includes(online)) riskScore += 1;
  if (["Regularly", "It's my job"].includes(sensitive)) riskScore += 2;
  if (targeted === "Currently under threat") riskScore += 4;
  else if (targeted === "Multiple times") riskScore += 3;
  else if (targeted === "Once") riskScore += 1;

  const riskLevel: ThreatResult["riskLevel"] =
    riskScore >= 8 ? "Critical" : riskScore >= 5 ? "High" : riskScore >= 3 ? "Medium" : "Low";

  // --- Profile name ---
  const profileNames: Record<string, string> = {
    "Public figure": "High-Visibility Public Figure",
    Journalist: "Investigative Media Professional",
    Activist: "At-Risk Advocate",
    "Business owner": "Business & IP Guardian",
    "High-net-worth individual": "High-Value Target",
    "Regular person": "Privacy-Conscious Individual",
    Other: "Custom Risk Profile",
  };
  let profileName = profileNames[role] ?? "Custom Risk Profile";
  if (targeted === "Currently under threat") profileName = "Active Threat Target";

  // --- Top threats ---
  const threatPool: { name: string; explanation: string; weight: number }[] = [];

  if (concerns.includes("Account takeover"))
    threatPool.push({ name: "Account Takeover", explanation: "Your online accounts are at risk of being hijacked through credential stuffing, phishing, or weak passwords. A single compromised account can cascade into others.", weight: 3 });
  if (concerns.includes("Stalking"))
    threatPool.push({ name: "Stalking & Harassment", explanation: "Location data, social media activity, and public records can be weaponized by stalkers. Your digital footprint may reveal more than you realize.", weight: 4 });
  if (concerns.includes("Doxxing"))
    threatPool.push({ name: "Doxxing", explanation: "Personal details like your address, phone number, workplace, and family members can be aggregated from data brokers and social media, then published to cause harm.", weight: 3 });
  if (concerns.includes("Financial fraud"))
    threatPool.push({ name: "Financial Fraud", explanation: "SIM swapping, phishing, and credential theft can give attackers access to bank accounts, crypto wallets, and payment platforms.", weight: 3 });
  if (concerns.includes("Identity theft"))
    threatPool.push({ name: "Identity Theft", explanation: "Stolen personal information can be used to open accounts, file tax returns, or take out loans in your name. Recovery can take months or years.", weight: 3 });
  if (concerns.includes("Government surveillance"))
    threatPool.push({ name: "State-Level Surveillance", explanation: "Government agencies may monitor communications, metadata, and device activity. Standard security measures are insufficient against this threat.", weight: 5 });
  if (concerns.includes("Corporate espionage"))
    threatPool.push({ name: "Corporate Espionage", explanation: "Competitors or foreign actors may target trade secrets, client data, internal communications, and strategic plans through digital infiltration.", weight: 4 });
  if (concerns.includes("General privacy"))
    threatPool.push({ name: "Data Privacy Erosion", explanation: "Data brokers, trackers, and oversharing on social media create a comprehensive profile of you that can be exploited for targeted attacks.", weight: 2 });

  if (threatPool.length === 0) {
    threatPool.push(
      { name: "Credential Compromise", explanation: "Weak or reused passwords put every account at risk. This is the most common entry point for attackers.", weight: 3 },
      { name: "Phishing", explanation: "Deceptive emails, messages, and websites designed to steal your credentials or install malware remain the most prevalent attack vector.", weight: 2 },
      { name: "Data Exposure", explanation: "Previous breaches may have already exposed your email, passwords, and personal data. Attackers reuse this information in future attacks.", weight: 2 },
    );
  }

  threatPool.sort((a, b) => b.weight - a.weight);
  const topThreats = threatPool.slice(0, 3).map(({ name, explanation }) => ({ name, explanation }));

  // --- Action plan ---
  const actionPlan: string[] = [];

  actionPlan.push("Audit all accounts connected to your primary email and enable MFA on every one.");

  if (["Account takeover", "Financial fraud"].some((c) => concerns.includes(c))) {
    actionPlan.push("Use a hardware security key (YubiKey) for critical accounts like email, banking, and crypto.");
  }

  if (concerns.includes("Doxxing") || concerns.includes("Stalking")) {
    actionPlan.push("Remove your personal information from data broker sites (use our Exposure Self-Check tool).");
    actionPlan.push("Separate your public-facing identity from your private accounts and real address.");
  }

  if (["Heavy", "Everything"].includes(online)) {
    actionPlan.push("Reduce your digital footprint by auditing social media privacy settings and removing old accounts.");
  }

  actionPlan.push("Use a unique, randomly generated password for every account via a password manager.");

  if (concerns.includes("Government surveillance") || concerns.includes("Corporate espionage")) {
    actionPlan.push("Switch to end-to-end encrypted communication (Signal) for sensitive conversations.");
    actionPlan.push("Use a hardened device with full-disk encryption for sensitive work.");
  }

  if (technical === "Beginner") {
    actionPlan.push("Start with the basics: password manager, MFA on email, and our Phishing Quiz to build awareness.");
  }

  if (targeted !== "Never") {
    actionPlan.push("Document all suspicious activity and preserve evidence before making changes.");
  }

  actionPlan.push("Review your security posture quarterly using our OPSEC Checklist.");

  // --- Recommended tools ---
  const recommendedTools: { name: string; href: string }[] = [
    { name: "Phishing Detection Quiz", href: "/free-tools#phishing-quiz" },
    { name: "Password Strength Analyzer", href: "/free-tools#password-analyzer" },
  ];

  if (concerns.includes("Doxxing") || concerns.includes("Stalking")) {
    recommendedTools.push({ name: "Exposure Self-Check", href: "/free-tools#exposure-check" });
  }

  recommendedTools.push(
    { name: "OPSEC Checklist", href: "/free-tools#opsec-checklist" },
    { name: "Account Dependency Mapper", href: "/free-tools#account-mapper" },
  );

  // --- Consultation? ---
  const needsConsultation = riskScore >= 5 || targeted !== "Never" || ["Journalist", "Activist", "Public figure"].includes(role);

  return { profileName, riskLevel, topThreats, actionPlan: actionPlan.slice(0, 8), recommendedTools, needsConsultation };
}

/* ── Risk level colours ────────────────────────────────────────────── */

const riskColors: Record<ThreatResult["riskLevel"], { bg: string; text: string; border: string }> = {
  Low: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/30" },
  Medium: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
  High: { bg: "bg-[#f97316]/10", text: "text-[#f97316]", border: "border-[#f97316]/30" },
  Critical: { bg: "bg-danger/10", text: "text-danger", border: "border-danger/30" },
};

/* ── Component ─────────────────────────────────────────────────────── */

export function ThreatModel() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finished, setFinished] = useState(false);

  const question = questions[step];
  const total = questions.length;
  const currentAnswer = answers[question?.id] ?? [];

  const handleSelect = (option: string) => {
    if (!question) return;

    if (question.kind === "single") {
      setAnswers((prev) => ({ ...prev, [question.id]: [option] }));
    } else {
      setAnswers((prev) => {
        const current = prev[question.id] ?? [];
        const next = current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option];
        return { ...prev, [question.id]: next };
      });
    }
  };

  const canAdvance = currentAnswer.length > 0;

  const handleNext = () => {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setFinished(false);
  };

  if (finished) {
    return <ResultCard result={generateResult(answers)} onRestart={handleRestart} />;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      {/* Question card */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Question {step + 1} of {total}
          </p>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {question.kind === "multi" ? "Select all that apply" : "Choose one"}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 w-full rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${((step + (canAdvance ? 1 : 0)) / total) * 100}%` }}
          />
        </div>

        <h3 className="mt-6 text-xl font-bold text-ink">{question.text}</h3>

        <div className="mt-6 space-y-3">
          {question.options.map((option) => {
            const active = currentAnswer.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-accent/30 bg-accent/10 text-ink"
                    : "border-line bg-background text-ink hover:border-accent/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                      active ? "border-accent bg-accent" : "border-line bg-card"
                    }`}
                  >
                    {active && (
                      <svg className="h-3 w-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg border border-line bg-card px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-accent/30"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance}
            className={`flex-1 rounded-lg px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition ${
              canAdvance
                ? "bg-accent text-black hover:bg-accent-strong"
                : "cursor-not-allowed bg-line text-muted"
            }`}
          >
            {step < total - 1 ? "Next" : "Generate threat model"}
          </button>
        </div>
      </section>

      {/* Side panel */}
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Progress</p>

        <div className="mt-5 rounded-xl border border-line bg-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Completed</p>
          <p className="mt-3 text-4xl font-bold text-accent">
            {step}
            <span className="text-xl text-muted">/{total}</span>
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Answer each question honestly for the most accurate threat model. Your answers stay in your browser and are never stored or sent anywhere.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {questions.map((q, idx) => {
            const answered = (answers[q.id] ?? []).length > 0;
            const isCurrent = idx === step;
            return (
              <div
                key={q.id}
                className={`rounded-xl border px-4 py-3 text-sm transition ${
                  isCurrent
                    ? "border-accent/30 bg-accent/10 font-medium text-ink"
                    : answered
                      ? "border-line bg-card text-muted"
                      : "border-line bg-card/60 text-muted/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      answered && !isCurrent ? "bg-accent text-black" : isCurrent ? "bg-accent/20 text-accent" : "bg-line text-muted"
                    }`}
                  >
                    {answered && !isCurrent ? (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span>{q.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ── Result card ───────────────────────────────────────────────────── */

function ResultCard({ result, onRestart }: { result: ThreatResult; onRestart: () => void }) {
  const colors = riskColors[result.riskLevel];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      {/* Left column */}
      <section className="space-y-6">
        {/* Profile header */}
        <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Your threat model</p>
          <h3 className="mt-3 text-2xl font-bold text-ink">{result.profileName}</h3>

          <div className={`mt-5 inline-flex rounded-full border px-4 py-1.5 text-sm font-bold uppercase tracking-[0.2em] ${colors.bg} ${colors.text} ${colors.border}`}>
            {result.riskLevel} Risk
          </div>
        </div>

        {/* Top threats */}
        <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Top threats</p>
          <div className="mt-5 space-y-4">
            {result.topThreats.map((threat, idx) => (
              <div key={threat.name} className="rounded-xl border border-line bg-background p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{threat.name}</p>
                    <p className="mt-2 text-sm leading-7 text-muted">{threat.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restart */}
        <button
          type="button"
          onClick={onRestart}
          className="w-full rounded-lg border border-line bg-card px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-accent/30"
        >
          Start over
        </button>
      </section>

      {/* Right column */}
      <section className="space-y-6">
        {/* Action plan */}
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Prioritized action plan</p>
          <div className="mt-5 space-y-3">
            {result.actionPlan.map((step, idx) => (
              <div key={idx} className="rounded-xl border border-line bg-card px-4 py-4 text-sm leading-7 text-muted">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-md bg-accent/10 text-[10px] font-bold text-accent">
                  {idx + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended tools */}
        <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Recommended tools</p>
          <div className="mt-5 space-y-3">
            {result.recommendedTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                className="flex items-center justify-between rounded-xl border border-line bg-background px-4 py-3.5 text-sm font-medium text-ink transition hover:border-accent/30"
              >
                <span>{tool.name}</span>
                <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Consultation CTA */}
        {result.needsConsultation && (
          <div className="rounded-xl border border-warning/30 bg-warning/8 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-warning">Recommendation</p>
            <h4 className="mt-3 text-lg font-bold text-ink">Consider a 1:1 consultation</h4>
            <p className="mt-2 text-sm leading-7 text-muted">
              Based on your profile and risk level, a personalized security review would help address your specific
              situation. We can evaluate your setup, identify blind spots, and build a hardened plan tailored to you.
            </p>
            <a
              href="/get-help"
              className="mt-5 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-accent-strong"
            >
              Book a session
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
