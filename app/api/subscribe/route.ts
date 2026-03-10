import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8383283489:AAGwLZvWPod91_mq1S9ItpqAAN4d11jq0ZI";
const TELEGRAM_CHAT_ID = "593174229";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email } = body as { email?: string };

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Send notification to Telegram
  try {
    const message = `📩 *New FK94 subscriber*\n\nEmail: \`${email}\`\nTime: ${new Date().toISOString()}`;
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );
  } catch (error) {
    console.error("FK94 Telegram notification failed", error);
  }

  return NextResponse.json({ ok: true });
}
