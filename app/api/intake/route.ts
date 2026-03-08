import { NextResponse } from "next/server";

import { scoreIntake, type IntakePayload } from "@/lib/intake";

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

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = scoreIntake(body);
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

  return NextResponse.json(result);
}
