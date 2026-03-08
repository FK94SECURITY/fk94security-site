import type { Metadata } from "next";

import { IntakeForm } from "@/components/intake-form";

type PageProps = {
  searchParams: Promise<{
    focus?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Get Help",
  description:
    "Tell us what you need. We will point you to the right free resource or set up a private 1:1 session.",
};

export default async function GetHelpPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <>
      <section className="pb-10 pt-14 sm:pb-14 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">Get Help</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">
            Tell us what is going on.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            We will review your situation and suggest the best next step. Sometimes that is a free
            resource. Sometimes it is a private conversation. Either way, there is no pressure.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <IntakeForm defaultHelpType={params.focus} />
        </div>
      </section>
    </>
  );
}
