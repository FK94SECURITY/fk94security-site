import type { Metadata } from "next";

import { DeviceChecklist } from "@/components/device-checklist";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Device Hardening Checklist",
  description:
    "Interactive platform-specific checklists for securing iPhone, Android, Mac, and Windows devices.",
};

export default function DeviceHardeningPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Lock down your devices with a step-by-step checklist."
          body="Choose your platform and work through the critical, important, and recommended settings. Progress is saved per device in your browser."
        />
        <div className="mt-12">
          <DeviceChecklist />
        </div>
      </div>
    </section>
  );
}
