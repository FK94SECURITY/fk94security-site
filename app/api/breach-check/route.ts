import { NextResponse } from "next/server";

/**
 * Breach check API route.
 *
 * Priority chain:
 * 1. HaveIBeenPwned API v3 (if HIBP_API_KEY is set, $3.50/month)
 * 2. XposedOrNot API (free, no key required)
 * 3. Demo mode (mock data fallback)
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

// --- HIBP (paid, gold standard) ---
async function checkHIBP(email: string, apiKey: string): Promise<BreachResult[] | null> {
  try {
    const resp = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      {
        headers: {
          "hibp-api-key": apiKey,
          "user-agent": "FK94Security-BreachChecker",
        },
      },
    );
    if (resp.status === 404) return [];
    if (!resp.ok) return null;
    return resp.json();
  } catch {
    return null;
  }
}

// --- XposedOrNot (free, no key) ---
async function checkXposedOrNot(email: string): Promise<BreachResult[] | null> {
  try {
    const resp = await fetch(
      `https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`,
      {
        headers: { "User-Agent": "FK94Security-BreachChecker" },
      },
    );

    if (resp.status === 404) return [];

    if (!resp.ok) return null;

    const data = await resp.json();

    // XposedOrNot returns breaches in ExposedBreaches.breaches_details array
    if (data?.ExposedBreaches?.breaches_details) {
      const details = Array.isArray(data.ExposedBreaches.breaches_details)
        ? data.ExposedBreaches.breaches_details
        : JSON.parse(data.ExposedBreaches.breaches_details);

      return details.map(
        (b: {
          breach: string;
          domain: string;
          xposed_date: string;
          xposed_records: number;
          xposed_data: string;
          details: string;
          logo: string;
        }) => ({
          Name: b.breach || b.domain || "Unknown",
          BreachDate: b.xposed_date || "Unknown",
          DataClasses: b.xposed_data
            ? b.xposed_data.split(";").map((s: string) => s.trim()).filter(Boolean)
            : [],
          Description: b.details || `Data breach at ${b.breach || b.domain}.`,
          LogoPath: b.logo || "",
          PwnCount: b.xposed_records || 0,
          IsVerified: true,
        }),
      );
    }

    return [];
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();

  // 1. Try HIBP (paid, best data)
  const hibpKey = process.env.HIBP_API_KEY;
  if (hibpKey) {
    const hibpResult = await checkHIBP(email, hibpKey);
    if (hibpResult !== null) {
      return NextResponse.json({ breaches: hibpResult, demo: false, source: "hibp" });
    }
  }

  // 2. Try XposedOrNot (free)
  const xonResult = await checkXposedOrNot(email);
  if (xonResult !== null) {
    return NextResponse.json({ breaches: xonResult, demo: false, source: "xposedornot" });
  }

  // 3. Fallback to demo
  return NextResponse.json({
    breaches: [
      {
        Name: "Service unavailable",
        BreachDate: "",
        DataClasses: [],
        Description:
          "Breach checking services are temporarily unavailable. Please try again in a few minutes.",
        LogoPath: "",
        PwnCount: 0,
        IsVerified: false,
      },
    ],
    demo: true,
    source: "fallback",
  });
}
