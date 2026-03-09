import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Rate limiting (simple in-memory, resets on cold start)             */
/* ------------------------------------------------------------------ */

const rateMap = new Map<string, number>();
const RATE_LIMIT_MS = 10_000; // 1 check per 10 seconds per IP

function isRateLimited(ip: string): boolean {
  const last = rateMap.get(ip);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_MS) return true;
  rateMap.set(ip, now);
  return false;
}

/* ------------------------------------------------------------------ */
/*  Platform list                                                      */
/* ------------------------------------------------------------------ */

type Platform = {
  name: string;
  urlTemplate: string;
  /** Some platforms return 200 even for missing users; skip advanced heuristics */
};

const PLATFORMS: Platform[] = [
  { name: "GitHub", urlTemplate: "https://github.com/{}" },
  { name: "Twitter / X", urlTemplate: "https://x.com/{}" },
  { name: "Instagram", urlTemplate: "https://instagram.com/{}" },
  { name: "Reddit", urlTemplate: "https://reddit.com/user/{}" },
  { name: "TikTok", urlTemplate: "https://tiktok.com/@{}" },
  { name: "YouTube", urlTemplate: "https://youtube.com/@{}" },
  { name: "LinkedIn", urlTemplate: "https://linkedin.com/in/{}" },
  { name: "Pinterest", urlTemplate: "https://pinterest.com/{}" },
  { name: "Twitch", urlTemplate: "https://twitch.tv/{}" },
  { name: "Steam", urlTemplate: "https://steamcommunity.com/id/{}" },
  { name: "Spotify", urlTemplate: "https://open.spotify.com/user/{}" },
  { name: "Medium", urlTemplate: "https://medium.com/@{}" },
  { name: "Dev.to", urlTemplate: "https://dev.to/{}" },
  { name: "Mastodon", urlTemplate: "https://mastodon.social/@{}" },
  { name: "Keybase", urlTemplate: "https://keybase.io/{}" },
  { name: "Gravatar", urlTemplate: "https://gravatar.com/{}" },
  { name: "HackerNews", urlTemplate: "https://news.ycombinator.com/user?id={}" },
  { name: "GitLab", urlTemplate: "https://gitlab.com/{}" },
  { name: "Bitbucket", urlTemplate: "https://bitbucket.org/{}" },
  { name: "Telegram", urlTemplate: "https://t.me/{}" },
  { name: "Flickr", urlTemplate: "https://flickr.com/people/{}" },
  { name: "Vimeo", urlTemplate: "https://vimeo.com/{}" },
  { name: "SoundCloud", urlTemplate: "https://soundcloud.com/{}" },
  { name: "Behance", urlTemplate: "https://behance.net/{}" },
  { name: "Dribbble", urlTemplate: "https://dribbble.com/{}" },
  { name: "ProductHunt", urlTemplate: "https://producthunt.com/@{}" },
  { name: "Cash App", urlTemplate: "https://cash.app/${}" },
  { name: "Patreon", urlTemplate: "https://patreon.com/{}" },
  { name: "About.me", urlTemplate: "https://about.me/{}" },
  { name: "Replit", urlTemplate: "https://replit.com/@{}" },
];

/* ------------------------------------------------------------------ */
/*  Check one platform                                                 */
/* ------------------------------------------------------------------ */

type PlatformResult = {
  platform: string;
  url: string;
  exists: boolean;
  status: number | null;
  error: boolean;
};

async function checkPlatform(
  platform: Platform,
  username: string,
): Promise<PlatformResult> {
  const url = platform.urlTemplate.replace("{}", encodeURIComponent(username));

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const resp = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    clearTimeout(timeout);

    return {
      platform: platform.name,
      url,
      exists: resp.status === 200,
      status: resp.status,
      error: false,
    };
  } catch {
    // Timeout or network error — try GET as fallback for sites that block HEAD
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const resp = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      clearTimeout(timeout);

      return {
        platform: platform.name,
        url,
        exists: resp.status === 200,
        status: resp.status,
        error: false,
      };
    } catch {
      return {
        platform: platform.name,
        url,
        exists: false,
        status: null,
        error: true,
      };
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  // Extract IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limited. Please wait 10 seconds between checks." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.username !== "string" ||
    body.username.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "A username is required." },
      { status: 400 },
    );
  }

  const username = body.username.trim();

  // Basic validation: alphanumeric, underscores, hyphens, dots (common across platforms)
  if (!/^[\w.\-]{1,64}$/i.test(username)) {
    return NextResponse.json(
      { error: "Invalid username format. Use only letters, numbers, dots, hyphens, and underscores." },
      { status: 400 },
    );
  }

  // Check all platforms in parallel
  const results = await Promise.allSettled(
    PLATFORMS.map((p) => checkPlatform(p, username)),
  );

  const platformResults: PlatformResult[] = results.map((r, i) => {
    if (r.status === "fulfilled") return r.value;
    return {
      platform: PLATFORMS[i].name,
      url: PLATFORMS[i].urlTemplate.replace("{}", encodeURIComponent(username)),
      exists: false,
      status: null,
      error: true,
    };
  });

  const found = platformResults.filter((r) => r.exists).length;
  const errors = platformResults.filter((r) => r.error).length;

  return NextResponse.json({
    username,
    total: PLATFORMS.length,
    found,
    errors,
    results: platformResults,
  });
}
