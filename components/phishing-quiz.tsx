"use client";

import { useState } from "react";

type ScenarioType = "email" | "sms" | "website" | "dm";

type Scenario = {
  id: number;
  type: ScenarioType;
  from: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  indicators: string[];
  explanation: string;
};

const scenarios: Scenario[] = [
  {
    id: 1,
    type: "email",
    from: "support@chasebank-secure.com",
    subject: "Urgent: Unusual activity detected on your account",
    body: "Dear valued customer, we have detected unusual login activity on your Chase account. To protect your funds, please verify your identity immediately by clicking the link below. Failure to verify within 12 hours will result in a temporary account freeze.\n\nVerify Now: https://chasebank-secure.com/verify-identity",
    isPhishing: true,
    indicators: [
      "Domain is 'chasebank-secure.com' instead of the real 'chase.com'",
      "Creates artificial urgency with a 12-hour deadline",
      "Generic greeting ('Dear valued customer') instead of your actual name",
      "Asks you to click a link to 'verify identity' -- a classic credential harvesting tactic",
    ],
    explanation:
      "Real banks use their primary domain (chase.com) and will never ask you to verify your identity through an email link. If you are concerned, go directly to chase.com or call the number on your card.",
  },
  {
    id: 2,
    type: "email",
    from: "notifications@github.com",
    subject: "[GitHub] A new sign-in to your account",
    body: "Hey @johndoe,\n\nA new sign-in was detected on your GitHub account.\n\nDevice: Chrome on macOS\nLocation: San Francisco, CA\nTime: March 7, 2026 at 3:42 PM PST\n\nIf this was you, no action is needed. If you don't recognize this activity, please review your account security settings at https://github.com/settings/security",
    isPhishing: false,
    indicators: [
      "Sent from the real github.com domain",
      "Uses your actual username (@johndoe), not a generic greeting",
      "Provides specific device, location, and time details",
      "Links to the real github.com domain for security settings",
      "Does not create panic or demand immediate action",
    ],
    explanation:
      "This is a standard GitHub security notification. It comes from the real domain, addresses you by username, includes specific login details, and links to the actual GitHub settings page. The calm tone is typical of legitimate notifications.",
  },
  {
    id: 3,
    type: "sms",
    from: "+1 (833) 555-0199",
    subject: "Account security alert",
    body: "ALERT: Your bank account has been locked due to suspicious activity. Verify your identity immediately to restore access: https://bit.ly/3xR9kWm",
    isPhishing: true,
    indicators: [
      "Uses a shortened URL (bit.ly) to hide the real destination",
      "Does not identify which bank or institution sent the message",
      "Creates panic with 'account has been locked' language",
      "Asks you to click a link in an SMS, which banks rarely do",
      "No way to verify the sender's identity from a random phone number",
    ],
    explanation:
      "Legitimate banks identify themselves clearly, never use URL shorteners, and almost never ask you to click links in text messages. If your account were truly locked, you could call the bank directly or visit their website.",
  },
  {
    id: 4,
    type: "email",
    from: "no-reply@coinbase-withdrawal.net",
    subject: "Withdrawal Confirmation: 2.4 BTC sent to external wallet",
    body: "A withdrawal of 2.4 BTC ($163,200.00) has been initiated from your Coinbase account to an external wallet address.\n\nWallet: bc1q42lja79elem0anu8q860g3ez....\nIf you did not authorize this withdrawal, cancel immediately:\nhttps://coinbase-withdrawal.net/cancel-transfer\n\nYou have 30 minutes to cancel before the transaction is confirmed on-chain.",
    isPhishing: true,
    indicators: [
      "Domain is 'coinbase-withdrawal.net' instead of the real 'coinbase.com'",
      "Designed to cause panic with a large financial amount",
      "30-minute deadline pressures you to act without thinking",
      "Cancel link goes to a fake domain, not coinbase.com",
      "Real crypto withdrawals require confirmation before they happen, not after",
    ],
    explanation:
      "This exploits fear of losing a large sum. Real Coinbase emails come from coinbase.com and require you to confirm withdrawals before they process, not after. The fake domain and artificial time pressure are dead giveaways.",
  },
  {
    id: 5,
    type: "email",
    from: "no-reply@accounts.google.com",
    subject: "Your Google Account password was changed",
    body: "Hi Francisco,\n\nYour Google Account password was just changed. If you made this change, no further action is needed.\n\nIf you didn't change your password, your account may have been compromised. Review your account activity and secure your account:\nhttps://myaccount.google.com/security\n\nYou received this email to let you know about important changes to your Google Account.\n\nGoogle LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043",
    isPhishing: false,
    indicators: [
      "Sent from the real accounts.google.com domain",
      "Addresses you by your first name",
      "Links to the real myaccount.google.com domain",
      "Includes Google's real corporate address",
      "Calm, informational tone without threats or deadlines",
      "Explains both scenarios (you did it vs. you didn't)",
    ],
    explanation:
      "This is a standard Google account notification. The real domain, personalized greeting, legitimate link, corporate address, and measured tone all indicate authenticity. Google always sends these when your password changes.",
  },
  {
    id: 6,
    type: "email",
    from: "account-security@microsoft-verify365.com",
    subject: "ACTION REQUIRED: Your Microsoft 365 account will be deleted in 24 hours",
    body: "IMPORTANT NOTICE\n\nDue to a recent policy update, your Microsoft 365 account has been flagged for deletion. All emails, files, and OneDrive data will be permanently removed within 24 hours unless you re-verify your account.\n\nRe-verify your account now:\nhttps://microsoft-verify365.com/reactivate\n\nMicrosoft Account Team",
    isPhishing: true,
    indicators: [
      "Domain is 'microsoft-verify365.com' instead of 'microsoft.com'",
      "Threatens permanent deletion within 24 hours to create panic",
      "Uses all-caps 'ACTION REQUIRED' and 'IMPORTANT NOTICE' to pressure you",
      "Vague 'policy update' with no specific details",
      "Microsoft would never delete an active account with 24-hour notice",
    ],
    explanation:
      "Microsoft will never threaten to delete your account via email with a 24-hour deadline. The fake domain, aggressive language, and vague justification are hallmarks of phishing. Real policy changes come with weeks of notice through official channels.",
  },
  {
    id: 7,
    type: "email",
    from: "tracking@fedex-shipment-notice.com",
    subject: "FedEx: Your package could not be delivered -- action required",
    body: "FedEx Delivery Notification\n\nWe attempted to deliver your package today but were unable to complete delivery. Please review the attached shipping label and delivery details to schedule a new delivery attempt.\n\nTracking Number: 7489 2103 8847\nSee attached: FedEx_ShippingLabel_7489.pdf.exe\n\nThank you for choosing FedEx.",
    isPhishing: true,
    indicators: [
      "Domain is 'fedex-shipment-notice.com' instead of 'fedex.com'",
      "Attachment disguised as PDF but is actually an executable (.pdf.exe)",
      "No specific delivery address or recipient name mentioned",
      "FedEx provides tracking through their website, not email attachments",
      "Does not reference any specific order or shipment you are expecting",
    ],
    explanation:
      "The double file extension (.pdf.exe) is a classic malware delivery trick. FedEx sends tracking updates from fedex.com and never asks you to open attachments to schedule deliveries. Always check tracking directly on fedex.com.",
  },
  {
    id: 8,
    type: "email",
    from: "sarah.chen@company.com",
    subject: "Team sync -- Thursday 2pm?",
    body: "Hi team,\n\nWanted to check if Thursday at 2pm works for our weekly sync. Same Zoom link as usual.\n\nAgenda:\n- Q1 planning update\n- New client onboarding timeline\n- Open items from last week\n\nLet me know if the time works or if we need to shift. Calendar invite will follow once confirmed.\n\nThanks,\nSarah",
    isPhishing: false,
    indicators: [
      "Sent from a recognizable colleague's real company email",
      "References an ongoing recurring meeting ('same Zoom link as usual')",
      "Specific, mundane agenda items that match normal work context",
      "No links, attachments, or requests for credentials",
      "Natural, conversational tone consistent with workplace communication",
    ],
    explanation:
      "This is a routine workplace email. It comes from a known colleague, references familiar meetings, contains no suspicious links or attachments, and reads like a normal conversation. The specificity and context are things an attacker would struggle to fake convincingly.",
  },
  {
    id: 9,
    type: "dm",
    from: "@crypto_gains_official",
    subject: "Instagram Direct Message",
    body: "Hey! I saw your post about investing. I've been making $5K-$10K/week with a new trading platform. My mentor showed me how and it's literally changed my life. I can connect you with them if you're interested. Check it out: https://t.me/crypto_mentor_vip\n\nSeriously, don't sleep on this opportunity.",
    isPhishing: true,
    indicators: [
      "Unsolicited message from a stranger on social media",
      "Unrealistic income claims ($5K-$10K per week)",
      "Redirects to Telegram, a common channel for scams",
      "Uses pressure language ('don't sleep on this opportunity')",
      "Mentions a 'mentor' -- a common romance/investment scam pattern",
      "Too-good-to-be-true financial promises",
    ],
    explanation:
      "This is a classic social media investment scam. No legitimate opportunity arrives as an unsolicited DM from a stranger. The unrealistic returns, redirection to Telegram, and 'mentor' structure are textbook scam patterns used in pig-butchering and advance-fee fraud.",
  },
  {
    id: 10,
    type: "email",
    from: "it-helpdesk@yourcompany-portal.net",
    subject: "IT Department: Mandatory password update required by end of day",
    body: "Dear Employee,\n\nAs part of our quarterly security compliance review, all employees must update their network credentials by end of business today. Failure to comply may result in temporary account suspension.\n\nPlease update your password using the secure portal below:\nhttps://yourcompany-portal.net/password-reset\n\nThank you,\nIT Support Team",
    isPhishing: true,
    indicators: [
      "Domain is 'yourcompany-portal.net' instead of your actual company domain",
      "Generic 'Dear Employee' greeting instead of your name",
      "End-of-day deadline creates unnecessary urgency",
      "Threatens account suspension for non-compliance",
      "Real IT departments use internal systems, not external portal links",
      "No IT ticket number, department phone number, or way to verify",
    ],
    explanation:
      "Fake IT department emails are among the most successful phishing attacks because people tend to trust internal-sounding senders. Real IT departments use your company's actual domain, address you by name, and provide ways to verify (phone, ticket number). When in doubt, call IT directly.",
  },
];

const typeLabels: Record<ScenarioType, string> = {
  email: "Email",
  sms: "SMS / Text",
  website: "Website",
  dm: "Direct Message",
};

const typeColors: Record<ScenarioType, string> = {
  email: "bg-brand/12 text-brand-strong",
  sms: "bg-warning/12 text-warning",
  website: "bg-signal text-brand-strong",
  dm: "bg-ink/8 text-ink",
};

export function PhishingQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);

  const scenario = scenarios[currentIndex];
  const hasAnswered = currentIndex in answers;
  const wasCorrect = hasAnswered ? answers[currentIndex] : null;

  const correctCount = Object.entries(answers).reduce(
    (count, [idx, correct]) => (correct ? count + 1 : count),
    0,
  );

  const handleAnswer = (userSaidPhishing: boolean) => {
    const correct = userSaidPhishing === scenario.isPhishing;
    setAnswers((prev) => ({ ...prev, [currentIndex]: correct }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setFinished(false);
  };

  if (finished) {
    return <ScoreCard correctCount={correctCount} total={scenarios.length} answers={answers} onRestart={handleRestart} />;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      {/* Scenario card */}
      <section className="panel rounded-[2rem] border border-line p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-brand">
            Scenario {currentIndex + 1} of {scenarios.length}
          </p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${typeColors[scenario.type]}`}>
            {typeLabels[scenario.type]}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 w-full rounded-full bg-ink/8">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${((currentIndex + (showFeedback ? 1 : 0)) / scenarios.length) * 100}%` }}
          />
        </div>

        {/* Simulated message */}
        <div className="mt-6 rounded-[1.6rem] border border-line bg-white p-5">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">From</p>
            <p className="font-mono text-sm font-medium text-ink">{scenario.from}</p>
          </div>
          <div className="mt-4 space-y-1.5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Subject</p>
            <p className="text-base font-semibold text-ink">{scenario.subject}</p>
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <p className="whitespace-pre-line text-sm leading-7 text-ink/84">{scenario.body}</p>
          </div>
        </div>

        {/* Answer buttons */}
        {!showFeedback && (
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => handleAnswer(false)}
              className="flex-1 rounded-full border border-line bg-panel px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-ink/30 hover:bg-white"
            >
              Legitimate
            </button>
            <button
              type="button"
              onClick={() => handleAnswer(true)}
              className="flex-1 rounded-full border border-ink bg-ink px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-sand transition hover:bg-ink/85"
            >
              Phishing
            </button>
          </div>
        )}

        {/* Feedback after answering */}
        {showFeedback && (
          <div className="mt-6 space-y-4">
            <div
              className={`rounded-[1.4rem] border px-5 py-4 ${
                wasCorrect
                  ? "border-brand/30 bg-brand/8"
                  : "border-warning/30 bg-warning/8"
              }`}
            >
              <p className={`text-sm font-semibold ${wasCorrect ? "text-brand-strong" : "text-warning"}`}>
                {wasCorrect ? "Correct!" : "Not quite."}
                {" "}
                <span className="font-normal text-ink/72">
                  This was {scenario.isPhishing ? "a phishing attempt" : "a legitimate message"}.
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-full border border-ink bg-ink px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-sand transition hover:bg-ink/85"
            >
              {currentIndex < scenarios.length - 1 ? "Next scenario" : "See results"}
            </button>
          </div>
        )}
      </section>

      {/* Explanation panel */}
      <section className="dark-panel rounded-[2rem] border border-black/10 p-6 sm:p-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-signal">
          {showFeedback ? "Analysis" : "Your score"}
        </p>

        {!showFeedback && (
          <>
            <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-sand/54">Current score</p>
              <p className="mt-3 font-display text-4xl text-signal">
                {correctCount}
                <span className="text-xl text-sand/54">/{Object.keys(answers).length || "0"}</span>
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/76">
                Read the scenario carefully. Look at the sender, the domain, the tone, and any links before deciding.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <InfoTip text="Check the sender's domain carefully -- one extra word or character is a common trick." />
              <InfoTip text="Urgency and threats are the most reliable signs of phishing. Legitimate services rarely pressure you." />
              <InfoTip text="When in doubt, go directly to the service's website instead of clicking any link in the message." />
            </div>
          </>
        )}

        {showFeedback && (
          <>
            <h3 className="mt-4 font-display text-xl text-signal">
              {scenario.isPhishing ? "Why this is phishing" : "Why this is legitimate"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-sand/76">{scenario.explanation}</p>
            <div className="mt-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-sand/54">
                {scenario.isPhishing ? "Red flags" : "Trust signals"}
              </p>
              {scenario.indicators.map((indicator) => (
                <div
                  key={indicator}
                  className={`rounded-[1.4rem] border px-4 py-3.5 text-sm leading-7 ${
                    scenario.isPhishing
                      ? "border-warning/20 bg-warning/8 text-sand/90"
                      : "border-signal/20 bg-signal/8 text-sand/90"
                  }`}
                >
                  {indicator}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function ScoreCard({
  correctCount,
  total,
  answers,
  onRestart,
}: {
  correctCount: number;
  total: number;
  answers: Record<number, boolean>;
  onRestart: () => void;
}) {
  const percentage = Math.round((correctCount / total) * 100);

  const level =
    percentage >= 90
      ? "Excellent"
      : percentage >= 70
        ? "Good awareness"
        : percentage >= 50
          ? "Needs practice"
          : "High risk";

  const missedScenarios = scenarios.filter((_, idx) => answers[idx] === false);

  const tips = generateTips(missedScenarios);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <section className="panel rounded-[2rem] border border-line p-6 sm:p-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-brand">Final score</p>
        <h3 className="mt-3 font-display text-2xl text-ink">Phishing Detection Results</h3>

        <div className="mt-6 rounded-[1.6rem] border border-line bg-white/75 p-6">
          <p className="text-center font-display text-6xl text-ink">
            {correctCount}
            <span className="text-2xl text-muted">/{total}</span>
          </p>
          <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            {percentage}% correct
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-semibold text-ink">Scenario breakdown</h4>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {scenarios.map((s, idx) => (
              <div
                key={s.id}
                className={`flex h-10 w-full items-center justify-center rounded-[0.8rem] text-xs font-semibold ${
                  answers[idx]
                    ? "bg-brand/12 text-brand-strong"
                    : "bg-warning/12 text-warning"
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand/20 align-middle" /> Correct
            {" "}
            <span className="ml-2 inline-block h-2.5 w-2.5 rounded-sm bg-warning/20 align-middle" /> Wrong
          </p>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="mt-8 w-full rounded-full border border-ink bg-ink px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-sand transition hover:bg-ink/85"
        >
          Take the quiz again
        </button>
      </section>

      <section className="dark-panel rounded-[2rem] border border-black/10 p-6 sm:p-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-signal">Assessment</p>
        <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-sand/54">Awareness level</p>
          <p className="mt-3 font-display text-4xl text-signal">{level}</p>
          <p className="mt-3 text-sm leading-7 text-sand/76">
            {percentage >= 90
              ? "You have a strong instinct for spotting phishing. Stay sharp -- attackers keep evolving their tactics."
              : percentage >= 70
                ? "You caught most of the threats but missed a few subtle ones. Review the tips below to strengthen your weak spots."
                : percentage >= 50
                  ? "You identified some threats but missed several. Phishing awareness takes practice -- review the patterns below."
                  : "Phishing emails would likely trick you in real life. The tips below cover the most important patterns to learn."}
          </p>
        </div>

        {tips.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-sand/54">Based on what you missed</p>
            {tips.map((tip) => (
              <InfoTip key={tip} text={tip} />
            ))}
          </div>
        )}

        {missedScenarios.length === 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-sand/54">Keep in mind</p>
            <InfoTip text="Even strong awareness fades without practice. Revisit this quiz periodically to stay sharp." />
            <InfoTip text="Share this tool with friends and family -- they are often the weakest link in your security chain." />
            <InfoTip text="Consider the Account Hardening Planner and OPSEC Checklist to strengthen the rest of your setup." />
          </div>
        )}
      </section>
    </div>
  );
}

function generateTips(missedScenarios: Scenario[]): string[] {
  const tips: string[] = [];
  const missedIds = new Set(missedScenarios.map((s) => s.id));

  // Domain spoofing (scenarios 1, 4, 6, 7, 10)
  if ([1, 4, 6, 7, 10].some((id) => missedIds.has(id))) {
    tips.push(
      "Always check the sender's domain carefully. Phishing emails use domains that look similar to real ones but add extra words (e.g., 'chasebank-secure.com' instead of 'chase.com').",
    );
  }

  // Urgency/pressure (scenarios 1, 3, 4, 6, 10)
  if ([1, 3, 4, 6, 10].some((id) => missedIds.has(id))) {
    tips.push(
      "Be skeptical of any message that creates urgency or threatens consequences. Legitimate services give you time and options -- they don't pressure you into clicking a link within minutes or hours.",
    );
  }

  // Legitimate messages flagged as phishing (scenarios 2, 5, 8)
  if ([2, 5, 8].some((id) => missedIds.has(id))) {
    tips.push(
      "Not every security email is phishing. Legitimate notifications use real domains, address you by name, provide specific details, and don't pressure you into immediate action.",
    );
  }

  // Social media scams (scenario 9)
  if (missedIds.has(9)) {
    tips.push(
      "Unsolicited messages from strangers promising money or investment returns are almost always scams. No legitimate opportunity starts with a cold DM.",
    );
  }

  // Attachments (scenario 7)
  if (missedIds.has(7)) {
    tips.push(
      "Never open unexpected attachments, especially ones with double extensions like '.pdf.exe'. These are designed to disguise malware as normal documents.",
    );
  }

  // SMS phishing (scenario 3)
  if (missedIds.has(3)) {
    tips.push(
      "Be especially careful with SMS messages containing links. Banks and institutions rarely send text messages with clickable links, and URL shorteners are a major red flag.",
    );
  }

  // IT impersonation (scenario 10)
  if (missedIds.has(10)) {
    tips.push(
      "Fake IT department emails are highly effective because people trust 'internal' senders. Always verify password reset requests by contacting your IT team directly through a known channel.",
    );
  }

  return tips;
}

function InfoTip({ text }: { text: string }) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-sand/76">
      {text}
    </div>
  );
}
