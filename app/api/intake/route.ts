import { NextResponse } from "next/server";

import { scoreIntake, type IntakePayload, type IntakeResult } from "@/lib/intake";

function isValidPayload(value: unknown): value is IntakePayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.countryTimezone === "string" &&
    typeof candidate.helpType === "string" &&
    typeof candidate.urgency === "string" &&
    typeof candidate.usedResources === "string" &&
    typeof candidate.details === "string"
  );
}

function sendTelegramNotification(payload: IntakePayload, result: IntakeResult) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const text = [
    `\u{1F514} <b>New FK94 Intake</b>`,
    ``,
    `<b>Name:</b> ${payload.name}`,
    `<b>Email:</b> ${payload.email}`,
    `<b>Help type:</b> ${payload.helpType}`,
    `<b>Urgency:</b> ${payload.urgency}`,
    `<b>Timezone:</b> ${payload.countryTimezone}`,
    ``,
    `<b>Details:</b>`,
    payload.details,
    ``,
    `---`,
    `<b>Fit:</b> ${result.fit}`,
    `<b>Service:</b> ${result.suggestedService}`,
    `<b>Response window:</b> ${result.responseWindow}`,
  ].join("\n");

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  }).catch((err) => {
    console.error("FK94 Telegram notification failed", err);
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = scoreIntake(body);

  // n8n webhook (blocking)
  const webhookUrl = process.env.N8N_INTAKE_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "fk94_intake",
          capturedAt: new Date().toISOString(),
          payload: body,
          result,
        }),
      });
    } catch (error) {
      console.error("FK94 intake webhook failed", error);
    }
  }

  // Telegram notification (non-blocking, fire-and-forget)
  sendTelegramNotification(body, result);

  return NextResponse.json(result);
}
