import type { Metadata } from "next";

import { UsernameOsint } from "@/components/username-osint";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Username OSINT Search",
  description:
    "Search a username across 30+ platforms to see where it exists. Assess your digital footprint and exposure.",
};

export default function UsernameOsintPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="Where does your username exist online?"
          body="Enter a username and we automatically check 30+ platforms — social media, developer sites, messaging apps, and more. See your digital footprint, assess your exposure, and find accounts you may have forgotten about."
        />
        <div className="mt-12">
          <UsernameOsint />
        </div>
      </div>
    </section>
  );
}
