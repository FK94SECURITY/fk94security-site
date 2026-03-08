import type { Metadata } from "next";

import { IncidentTriageWizard } from "@/components/incident-triage-wizard";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Incident Triage",
  description: "Calm first-pass triage for suspicious logins, phishing scares, lost access, and device issues.",
};

export default function IncidentTriagePage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Slow the situation down before you make random changes."
          body="Use the triage tool for suspicious emails, access loss, strange account activity, or device concerns. It is designed to create order, not panic."
        />
        <div className="mt-12">
          <IncidentTriageWizard />
        </div>
      </div>
    </section>
  );
}
