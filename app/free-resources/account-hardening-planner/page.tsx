import type { Metadata } from "next";

import { HardeningStudio } from "@/components/hardening-studio";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Account Hardening Planner",
  description: "Interactive planner to turn your current setup into a calmer hardening sequence.",
};

export default function AccountHardeningPlannerPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Build a calmer hardening plan around your real setup."
          body="Describe your current account, device, recovery, and exposure situation and FK94 will suggest what to fix first."
        />
        <div className="mt-12">
          <HardeningStudio />
        </div>
      </div>
    </section>
  );
}
