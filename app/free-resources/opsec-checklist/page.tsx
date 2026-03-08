import type { Metadata } from "next";

import { ChecklistLab } from "@/components/checklist-lab";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "OPSEC Checklist",
  description: "Interactive OPSEC checklist for account recovery, devices, and digital exposure basics.",
};

export default function OpsecChecklistPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="An interactive OPSEC checklist for cleaner digital habits."
          body="Use it to work through critical accounts, recovery paths, device hygiene, and public exposure without needing a login."
        />
        <div className="mt-12">
          <ChecklistLab />
        </div>
      </div>
    </section>
  );
}
