import { NextResponse } from "next/server";

/**
 * Breach check API route.
 * Uses HaveIBeenPwned API v3 (k-anonymity model for passwords is free,
 * email breach check requires API key at $3.50/month).
 *
 * Set HIBP_API_KEY in environment variables to enable live lookups.
 * Without it, returns demo data so the tool still works.
 */

type BreachResult = {
  Name: string;
  BreachDate: string;
  DataClasses: string[];
  Description: string;
  LogoPath: string;
  PwnCount: number;
  IsVerified: boolean;
};

const MOCK_BREACHES: BreachResult[] = [
  {
    Name: "LinkedIn",
    BreachDate: "2012-05-05",
    DataClasses: ["Email addresses", "Passwords"],
    Description: "In May 2012, LinkedIn had 164 million email addresses and passwords exposed.",
    LogoPath: "",
    PwnCount: 164611595,
    IsVerified: true,
  },
  {
    Name: "Adobe",
    BreachDate: "2013-10-04",
    DataClasses: ["Email addresses", "Passwords", "Password hints", "Usernames"],
    Description: "In October 2013, 153 million Adobe accounts were breached with emails, encrypted passwords, and password hints.",
    LogoPath: "",
    PwnCount: 152445165,
    IsVerified: true,
  },
  {
    Name: "Canva",
    BreachDate: "2019-05-24",
    DataClasses: ["Email addresses", "Names", "Passwords", "Usernames"],
    Description: "In May 2019, the graphic design tool Canva suffered a data breach that impacted 137 million users.",
    LogoPath: "",
    PwnCount: 137272116,
    IsVerified: true,
  },
];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const apiKey = process.env.HIBP_API_KEY;

  if (apiKey) {
    try {
      const resp = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(body.email)}?truncateResponse=false`,
        {
          headers: {
            "hibp-api-key": apiKey,
            "user-agent": "FK94Security-BreachChecker",
          },
        },
      );

      if (resp.status === 404) {
        return NextResponse.json({ breaches: [], demo: false });
      }

      if (resp.status === 429) {
        return NextResponse.json(
          { error: "Rate limited. Please wait a moment and try again." },
          { status: 429 },
        );
      }

      if (!resp.ok) {
        throw new Error(`HIBP returned ${resp.status}`);
      }

      const breaches: BreachResult[] = await resp.json();
      return NextResponse.json({ breaches, demo: false });
    } catch (error) {
      console.error("HIBP API error, falling back to demo:", error);
    }
  }

  // Demo mode: return mock data
  return NextResponse.json({ breaches: MOCK_BREACHES, demo: true });
}
