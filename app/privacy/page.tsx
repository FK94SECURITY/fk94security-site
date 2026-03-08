import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the FK94 website, intake flow, and free resources.",
};

export default function PrivacyPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="panel rounded-[2.6rem] border border-line px-6 py-10 sm:px-10">
          <p className="font-display text-sm uppercase tracking-[0.34em] text-brand">Privacy Policy</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.96] text-ink sm:text-6xl">Privacy-first by design.</h1>
          <div className="mt-8 space-y-6 text-base leading-8 text-muted">
            <p>
              FK94 tries to collect as little data as possible while still running the site,
              improving resources, and responding to intake submissions.
            </p>
            <p>
              If you use free resources, basic analytics may be used to understand which pages and
              tools are useful. If you submit the intake, the information you provide is used to
              review fit, urgency, and suggested next steps.
            </p>
            <p>
              Intake data may be sent to email, CRM, or automation tools used to manage responses.
              FK94 does not sell personal data. Sensitive cases should avoid sending unnecessary
              secrets or credentials through the form.
            </p>
            <p>
              If you need a stricter or more private communication path, use the intake to request
              it. Policies should be reviewed and finalized with legal counsel before production use.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
