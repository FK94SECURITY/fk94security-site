import type { Metadata } from "next";

import { AccountMapper } from "@/components/account-mapper";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Account Dependency Mapper",
  description:
    "Map how your accounts are connected. See which accounts are single points of failure and what happens if one is compromised.",
};

export default function AccountMapperPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free tool"
          title="See how your accounts are connected — and where the risk is."
          body="Select the accounts you use, map their recovery paths, and instantly see which accounts are single points of failure. If one gets compromised, this shows you what else falls."
        />
        <div className="mt-12">
          <AccountMapper />
        </div>
      </div>
    </section>
  );
}
