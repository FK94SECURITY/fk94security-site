"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CountryCode = {
  code: string;
  dial: string;
  name: string;
  flag: string;
};

type PhoneType = "mobile" | "landline" | "unknown";

type Platform = {
  name: string;
  description: string;
  checkUrl: string | null;
  removeUrl: string | null;
  removeSteps: string[];
  likelihood: "high" | "medium" | "low";
};

type ExposureReport = {
  phoneFormatted: string;
  phoneType: PhoneType;
  countryName: string;
  platforms: Platform[];
  riskLevel: "High" | "Medium" | "Low";
  riskScore: number;
  tips: string[];
};

/* ------------------------------------------------------------------ */
/*  Country codes                                                      */
/* ------------------------------------------------------------------ */

const COUNTRY_CODES: CountryCode[] = [
  { code: "US", dial: "+1", name: "United States", flag: "US" },
  { code: "GB", dial: "+44", name: "United Kingdom", flag: "GB" },
  { code: "AR", dial: "+54", name: "Argentina", flag: "AR" },
  { code: "BR", dial: "+55", name: "Brazil", flag: "BR" },
  { code: "MX", dial: "+52", name: "Mexico", flag: "MX" },
  { code: "CO", dial: "+57", name: "Colombia", flag: "CO" },
  { code: "CL", dial: "+56", name: "Chile", flag: "CL" },
  { code: "DE", dial: "+49", name: "Germany", flag: "DE" },
  { code: "FR", dial: "+33", name: "France", flag: "FR" },
  { code: "ES", dial: "+34", name: "Spain", flag: "ES" },
  { code: "IT", dial: "+39", name: "Italy", flag: "IT" },
  { code: "CA", dial: "+1", name: "Canada", flag: "CA" },
  { code: "AU", dial: "+61", name: "Australia", flag: "AU" },
  { code: "IN", dial: "+91", name: "India", flag: "IN" },
  { code: "JP", dial: "+81", name: "Japan", flag: "JP" },
  { code: "VE", dial: "+58", name: "Venezuela", flag: "VE" },
  { code: "PE", dial: "+51", name: "Peru", flag: "PE" },
  { code: "UY", dial: "+598", name: "Uruguay", flag: "UY" },
  { code: "PY", dial: "+595", name: "Paraguay", flag: "PY" },
];

/* ------------------------------------------------------------------ */
/*  Platforms database                                                 */
/* ------------------------------------------------------------------ */

const PLATFORMS: Platform[] = [
  {
    name: "Truecaller",
    description:
      "The world's largest caller ID database with over 300 million users. When anyone installs Truecaller, it uploads their entire contact list - meaning your number may be listed even if you never signed up.",
    checkUrl: "https://www.truecaller.com/search",
    removeUrl: "https://www.truecaller.com/unlisting",
    removeSteps: [
      "Go to truecaller.com/unlisting",
      "Enter your phone number with country code",
      "Complete the CAPTCHA verification",
      "Click 'Unlist' to submit your request",
      "Removal takes up to 24 hours",
      "Important: If you have the Truecaller app, deactivate your account first in Settings > Privacy Center > Deactivate",
    ],
    likelihood: "high",
  },
  {
    name: "Sync.me",
    description:
      "A caller ID and spam blocking app similar to Truecaller. It also aggregates contacts from users who install the app, creating a massive database of phone numbers and associated names.",
    checkUrl: "https://sync.me/search/",
    removeUrl: "https://sync.me/unsubscribe/",
    removeSteps: [
      "Go to sync.me/unsubscribe/",
      "Enter your phone number with country code",
      "Click 'Unsubscribe'",
      "You may need to verify via SMS",
      "Removal may take a few days to propagate",
    ],
    likelihood: "high",
  },
  {
    name: "WhitePages / FastPeopleSearch",
    description:
      "People search engines that aggregate public records, social media data, and data broker information. They often display your name, address, relatives, and phone number to anyone who searches.",
    checkUrl: "https://www.fastpeoplesearch.com/",
    removeUrl: "https://www.whitepages.com/suppression-requests",
    removeSteps: [
      "Search for your number on the site to find your listing",
      "Copy the URL of your listing page",
      "Go to the opt-out page (usually found in the privacy policy footer)",
      "Submit your listing URL for removal",
      "You may need to verify your identity via email",
      "Repeat for each people-search site separately (they do not share removal requests)",
    ],
    likelihood: "medium",
  },
  {
    name: "Facebook / Meta",
    description:
      "If your phone number was associated with a Facebook account, it may have been part of the 2019 Facebook data scrape affecting 533 million users. Even deleted accounts may still be in leaked datasets.",
    checkUrl: null,
    removeUrl: null,
    removeSteps: [
      "Go to Facebook Settings > Personal Information",
      "Remove your phone number or set visibility to 'Only Me'",
      "Go to Settings > Privacy > Who can look you up using the phone number you provided > change to 'Only Me'",
      "Note: If your number was in the 2019 leak, it cannot be removed from circulating datasets",
    ],
    likelihood: "high",
  },
  {
    name: "LinkedIn",
    description:
      "LinkedIn stores phone numbers in profiles and has been subject to large-scale data scraping. If you added your phone number for 2FA or your profile, it may be accessible via search or leaked datasets.",
    checkUrl: null,
    removeUrl: null,
    removeSteps: [
      "Go to LinkedIn > Settings > Visibility > Phone number visibility",
      "Set to 'Only visible to me' or remove the number entirely",
      "Review your Privacy settings for data sharing preferences",
    ],
    likelihood: "medium",
  },
  {
    name: "Spokeo",
    description:
      "A people search engine that aggregates data from social networks, public records, and marketing databases to build detailed profiles. Often used for reverse phone lookups.",
    checkUrl: "https://www.spokeo.com/",
    removeUrl: "https://www.spokeo.com/optout",
    removeSteps: [
      "Search for your phone number on spokeo.com",
      "Copy the URL of your profile page",
      "Go to spokeo.com/optout",
      "Paste the profile URL and enter your email",
      "Click 'Remove This Listing'",
      "Confirm removal via the email they send you",
    ],
    likelihood: "medium",
  },
  {
    name: "Caller ID Databases (CNAM)",
    description:
      "Telecom carriers maintain CNAM (Caller Name) databases that associate your name with your phone number. This is how your name appears on caller ID when you call someone. This data is shared across carriers.",
    checkUrl: null,
    removeUrl: null,
    removeSteps: [
      "Contact your carrier and ask about CNAM listing options",
      "Request your number be listed as 'Wireless Caller' or 'Unknown' instead of your name",
      "Note: Not all carriers allow this, and changes may take weeks to propagate",
      "Alternatively, use a VoIP number or Google Voice for calls where you want anonymity",
    ],
    likelihood: "high",
  },
  {
    name: "Data Brokers (Acxiom, Oracle, etc.)",
    description:
      "Large-scale data brokers collect and sell consumer data including phone numbers. This data flows into marketing databases, spam call lists, and other aggregators. Removal requires contacting each broker individually.",
    checkUrl: null,
    removeUrl: null,
    removeSteps: [
      "Search for your name and phone number on major data broker sites",
      "Submit opt-out requests to each (Acxiom, Oracle Data Cloud, Epsilon, etc.)",
      "Consider using a service like DeleteMe or Privacy Duck to automate removals",
      "Be aware that data brokers re-collect data, so removal must be repeated periodically",
    ],
    likelihood: "medium",
  },
];

/* ------------------------------------------------------------------ */
/*  Phone type detection (basic heuristic)                             */
/* ------------------------------------------------------------------ */

function detectPhoneType(digits: string, countryCode: string): PhoneType {
  const clean = digits.replace(/\D/g, "");

  if (countryCode === "US" || countryCode === "CA") {
    // US/CA: 10 digits, area codes starting with 2-9
    if (clean.length === 10 || clean.length === 11) return "mobile"; // Can't reliably distinguish without carrier DB
    return "unknown";
  }

  if (countryCode === "AR") {
    // Argentina: mobile numbers typically start with 9 after country code, or 11/15 prefix
    if (clean.startsWith("9") || clean.startsWith("11") || clean.startsWith("15")) {
      return "mobile";
    }
    if (clean.length >= 8) return "mobile"; // Most AR numbers are mobile now
    return "unknown";
  }

  if (countryCode === "GB") {
    // UK: mobile starts with 07
    if (clean.startsWith("07") || clean.startsWith("7")) return "mobile";
    if (clean.startsWith("01") || clean.startsWith("02") || clean.startsWith("1") || clean.startsWith("2")) return "landline";
    return "unknown";
  }

  // Generic: if 8+ digits, assume mobile (majority of phone numbers today)
  if (clean.length >= 8) return "mobile";
  return "unknown";
}

/* ------------------------------------------------------------------ */
/*  Risk calculation                                                   */
/* ------------------------------------------------------------------ */

function calculateRisk(phoneType: PhoneType): {
  level: "High" | "Medium" | "Low";
  score: number;
} {
  // Mobile numbers have higher exposure risk
  if (phoneType === "mobile") {
    return { level: "High", score: 75 };
  }
  if (phoneType === "landline") {
    return { level: "Medium", score: 50 };
  }
  return { level: "Medium", score: 60 };
}

function riskColor(level: "High" | "Medium" | "Low"): string {
  switch (level) {
    case "High":
      return "text-red-400";
    case "Medium":
      return "text-yellow-400";
    case "Low":
      return "text-emerald-400";
  }
}

function riskBorder(level: "High" | "Medium" | "Low"): string {
  switch (level) {
    case "High":
      return "border-red-500/30";
    case "Medium":
      return "border-yellow-500/30";
    case "Low":
      return "border-emerald-500/30";
  }
}

function riskBg(level: "High" | "Medium" | "Low"): string {
  switch (level) {
    case "High":
      return "bg-red-500/10";
    case "Medium":
      return "bg-yellow-500/10";
    case "Low":
      return "bg-emerald-500/10";
  }
}

function likelihoodColor(likelihood: "high" | "medium" | "low"): string {
  switch (likelihood) {
    case "high":
      return "text-red-400";
    case "medium":
      return "text-yellow-400";
    case "low":
      return "text-emerald-400";
  }
}

function likelihoodLabel(likelihood: "high" | "medium" | "low"): string {
  switch (likelihood) {
    case "high":
      return "Likely Listed";
    case "medium":
      return "Possibly Listed";
    case "low":
      return "Unlikely";
  }
}

/* ------------------------------------------------------------------ */
/*  Tips                                                               */
/* ------------------------------------------------------------------ */

const GENERAL_TIPS = [
  "Use a secondary phone number (Google Voice, Burner, MySudo) for online sign-ups, shopping, and services you do not fully trust.",
  "Never use your real phone number for social media verification if possible - use an authenticator app instead.",
  "Regularly search for your phone number on people-search sites and submit removal requests.",
  "Consider a data removal service like DeleteMe or Privacy Duck to automate ongoing removals from data brokers.",
  "Set your social media accounts to private and remove phone numbers from visible profile fields.",
  "Be cautious about giving your phone number to retail stores, loyalty programs, and online forms.",
  "Enable call screening features on your phone (built into Google Phone app and iOS 13+ Silence Unknown Callers).",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PhoneLookup() {
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [report, setReport] = useState<ExposureReport | null>(null);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const country = COUNTRY_CODES.find((c) => c.code === selectedCountry);

  const handleCheck = useCallback(() => {
    const clean = phoneNumber.replace(/\D/g, "");
    if (clean.length < 7) return;

    const phoneType = detectPhoneType(clean, selectedCountry);
    const risk = calculateRisk(phoneType);
    const formatted = `${country?.dial ?? ""} ${phoneNumber}`;

    setReport({
      phoneFormatted: formatted,
      phoneType,
      countryName: country?.name ?? selectedCountry,
      platforms: PLATFORMS,
      riskLevel: risk.level,
      riskScore: risk.score,
      tips: GENERAL_TIPS,
    });
    setChecked(true);
    setExpandedPlatform(null);
  }, [phoneNumber, selectedCountry, country]);

  const cleanDigits = phoneNumber.replace(/\D/g, "");
  const isValid = cleanDigits.length >= 7;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* ---- Left panel: input + tips ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Phone Lookup
        </p>
        <h3 className="mt-3 text-2xl font-bold text-ink">
          Phone Number Exposure Check
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Find out how exposed your phone number is across caller ID databases,
          people-search engines, and data brokers. This tool shows you where to
          check and how to remove your information.
        </p>

        {/* Phone input */}
        <div className="mt-8">
          <label htmlFor="phone-input" className="sr-only">
            Phone number
          </label>
          <div className="flex gap-3">
            {/* Country selector */}
            <div className="relative shrink-0">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="h-full appearance-none rounded-xl border border-line bg-background py-4 pl-4 pr-10 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.dial}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
            </div>

            {/* Number input */}
            <div className="relative flex-1">
              <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="phone-input"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isValid) handleCheck();
                }}
                placeholder="Phone number"
                autoComplete="tel"
                className="w-full rounded-xl border border-line bg-background py-4 pl-11 pr-4 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheck}
            disabled={!isValid}
            className={cn(
              "mt-4 w-full rounded-xl px-6 py-4 text-sm font-semibold transition",
              isValid
                ? "bg-accent text-background hover:bg-accent-strong"
                : "cursor-not-allowed border border-line bg-card text-muted",
            )}
          >
            Check Exposure
          </button>
        </div>

        {/* Privacy notice */}
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3">
          <ShieldIcon className="mt-0.5 shrink-0 text-accent" />
          <p className="text-xs leading-5 text-muted">
            This tool runs entirely in your browser. Your phone number is never
            sent to any server or API. We guide you to check external services
            yourself.
          </p>
        </div>

        {/* General tips */}
        <div className="mt-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Reduce your phone exposure
          </p>
          {(checked ? GENERAL_TIPS : GENERAL_TIPS.slice(0, 4)).map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-muted"
            >
              <span className="mt-0.5 shrink-0 text-accent">{i + 1}.</span>
              {tip}
            </div>
          ))}
        </div>
      </section>

      {/* ---- Right panel: results ---- */}
      <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Exposure Report
        </p>

        {!checked && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <PhoneSearchIcon className="mb-4 text-muted/30" />
            <p className="text-lg font-medium text-muted/50">
              Enter a phone number to check
            </p>
            <p className="mt-2 text-sm text-muted/30">
              We will show you where your number may be listed
            </p>
          </div>
        )}

        {checked && report && (
          <div className="mt-5 space-y-4">
            {/* Risk summary */}
            <div
              className={cn(
                "rounded-xl border p-5",
                riskBorder(report.riskLevel),
                riskBg(report.riskLevel),
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">
                    Estimated Exposure
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-3xl font-bold",
                      riskColor(report.riskLevel),
                    )}
                  >
                    {report.riskLevel} Risk
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "text-4xl font-bold tabular-nums",
                      riskColor(report.riskLevel),
                    )}
                  >
                    {report.riskScore}
                  </p>
                  <p className="text-xs text-muted">/100</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">
                {report.phoneType === "mobile"
                  ? "Mobile numbers are highly exposed due to app-based caller ID services, social media links, and data broker aggregation."
                  : report.phoneType === "landline"
                    ? "Landline numbers have moderate exposure, primarily through public directory listings and people-search engines."
                    : "This number has moderate exposure risk across common data aggregation platforms."}
              </p>
            </div>

            {/* Phone details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Number
                </p>
                <p className="mt-2 font-mono text-sm text-ink">
                  {report.phoneFormatted}
                </p>
              </div>
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Type
                </p>
                <p className="mt-2 text-sm capitalize text-ink">
                  {report.phoneType} ({report.countryName})
                </p>
              </div>
            </div>

            {/* Platform checks */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Where your number may be listed
              </p>

              {report.platforms.map((platform) => {
                const isExpanded = expandedPlatform === platform.name;

                return (
                  <div
                    key={platform.name}
                    className="rounded-xl border border-line bg-card overflow-hidden"
                  >
                    {/* Platform header */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPlatform(
                          isExpanded ? null : platform.name,
                        )
                      }
                      className="flex w-full items-center justify-between p-5 text-left transition hover:bg-surface"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-semibold text-ink">
                            {platform.name}
                          </p>
                          <span
                            className={cn(
                              "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                              platform.likelihood === "high"
                                ? "border-red-500/20 bg-red-500/10 text-red-400"
                                : platform.likelihood === "medium"
                                  ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                                  : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
                            )}
                          >
                            {likelihoodLabel(platform.likelihood)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted line-clamp-1">
                          {platform.description}
                        </p>
                      </div>
                      <ChevronIcon
                        className={cn(
                          "ml-3 shrink-0 text-muted transition-transform",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="border-t border-line px-5 pb-5 pt-4">
                        <p className="text-sm leading-6 text-muted">
                          {platform.description}
                        </p>

                        {/* Action links */}
                        {(platform.checkUrl || platform.removeUrl) && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {platform.checkUrl && (
                              <a
                                href={platform.checkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/20"
                              >
                                <ExternalLinkIcon />
                                Check your listing
                              </a>
                            )}
                            {platform.removeUrl && (
                              <a
                                href={platform.removeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                              >
                                <ExternalLinkIcon />
                                Remove your number
                              </a>
                            )}
                          </div>
                        )}

                        {/* Removal steps */}
                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                            How to remove
                          </p>
                          <ol className="mt-2 space-y-2">
                            {platform.removeSteps.map((step, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2.5 text-sm leading-6 text-muted"
                              >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                                  {j + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-5">
              <p className="font-semibold text-accent">
                Need help cleaning up your phone exposure?
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">
                Removing your number from dozens of data brokers and
                people-search sites is tedious and must be repeated regularly.
                Get a 1-on-1 session where we walk through the full removal
                process for your specific situation.
              </p>
              <p className="mt-3 text-sm font-medium text-accent">
                Book a privacy consultation &rarr;
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function PhoneSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
      <circle cx="12" cy="10" r="3" />
      <path d="m15 13-1-1" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
