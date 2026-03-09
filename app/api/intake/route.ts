import { NextResponse } from "next/server";
import { Resend } from "resend";

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

  // Send email notification to info@fk94security.com
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "FK94 Security <notifications@fk94security.com>",
        to: "info@fk94security.com",
        replyTo: body.email,
        subject: `New inquiry: ${body.helpType} (${result.fit} fit)`,
        html: `
          <h2>New FK94 Security Inquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:140px;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.name}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Help type</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.helpType}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Urgency</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.urgency}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Timezone</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.countryTimezone}</td></tr>
          </table>
          <h3 style="margin-top:20px;">Details</h3>
          <p style="white-space:pre-wrap;background:#f9f9f9;padding:12px;border-radius:6px;font-family:sans-serif;">${body.details}</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
          <h3>Scoring</h3>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Fit</td><td>${result.fit}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Service</td><td>${result.suggestedService}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Response window</td><td>${result.responseWindow}</td></tr>
          </table>
          <p style="margin-top:16px;color:#888;font-size:12px;">Sent from fk94security.com intake form</p>
        `,
      });
    } catch (error) {
      console.error("FK94 email notification failed", error);
    }
  }

  return NextResponse.json(result);
}
