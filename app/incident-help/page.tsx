"use client";

import { useLocale } from "@/lib/locale-context";
import { IncidentTriageWizard } from "@/components/incident-triage-wizard";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { analyticsEvents } from "@/lib/analytics";

const content = {
  en: {
    eyebrow: "Incident Help",
    heading: "Calm first-response help when something feels wrong.",
    subheading:
      "Suspicious logins, phishing scares, lost access, or weird account behavior usually get worse when you panic. Start with the basics, slow the situation down, and use the intake if you need private help.",
    urgentCta: "Request urgent help",
    triageCta: "Open the triage tool",
    signsEyebrow: "Common signs",
    signsTitle: "Signals that deserve a calmer look",
    signsBody:
      "Not every odd email means compromise, but these are common reasons to stop and review your setup.",
    signsItems: [
      "Unexpected password reset messages or MFA prompts.",
      "New forwarding rules, unknown sessions, or account activity you cannot explain.",
      "Recovery changes, unfamiliar support emails, or access you suddenly lost.",
      "A lost phone, exposed laptop, or device that started behaving strangely.",
    ],
    firstMinEyebrow: "First 15 minutes",
    firstMinTitle: "Protect the critical path first",
    firstMinBody:
      "When in doubt, prioritize the accounts and recovery settings that control the rest of your digital life.",
    firstMinItems: [
      "Check your primary email and recovery paths before touching less important accounts.",
      "Review recent sessions, devices, forwarding rules, and recovery settings.",
      "Change credentials in a deliberate order instead of making random changes everywhere.",
      "Write down what happened, what you noticed, and what you changed.",
    ],
    whatNotEyebrow: "What not to do",
    whatNotItems: [
      "Do not change everything at once without understanding which accounts matter most.",
      "Do not ignore recovery settings while focusing only on passwords.",
      "Do not keep clicking suspicious emails to see what happens.",
      "Do not hand the situation to a random person in DMs because you feel rushed.",
    ],
    privateHelpEyebrow: "Need private help?",
    privateHelpBody:
      "If the situation feels urgent, messy, or sensitive, use the intake. FK94 will sort fit, urgency, and the right next step without turning it into a generic support queue.",
    privateHelpCta: "Use the urgent intake",
  },
  es: {
    eyebrow: "Ayuda con Incidentes",
    heading: "Ayuda calmada de primera respuesta cuando algo se siente mal.",
    subheading:
      "Inicios de sesi\u00f3n sospechosos, sustos de phishing, p\u00e9rdida de acceso o comportamiento raro de cuentas suelen empeorar cuando entr\u00e1s en p\u00e1nico. Empez\u00e1 por lo b\u00e1sico, fren\u00e1 la situaci\u00f3n, y us\u00e1 el formulario de contacto si necesit\u00e1s ayuda privada.",
    urgentCta: "Pedir ayuda urgente",
    triageCta: "Abrir la herramienta de triaje",
    signsEyebrow: "Se\u00f1ales comunes",
    signsTitle: "Se\u00f1ales que merecen una mirada m\u00e1s tranquila",
    signsBody:
      "No todo email extra\u00f1o significa que te hackearon, pero estas son razones comunes para frenar y revisar tu configuraci\u00f3n.",
    signsItems: [
      "Mensajes inesperados de reseteo de contrase\u00f1a o solicitudes de MFA.",
      "Nuevas reglas de reenv\u00edo, sesiones desconocidas o actividad que no pod\u00e9s explicar.",
      "Cambios en la recuperaci\u00f3n, emails de soporte desconocidos o acceso que perdiste de repente.",
      "Un tel\u00e9fono perdido, laptop expuesta o dispositivo que empez\u00f3 a comportarse raro.",
    ],
    firstMinEyebrow: "Primeros 15 minutos",
    firstMinTitle: "Proteg\u00e9 el camino cr\u00edtico primero",
    firstMinBody:
      "Ante la duda, prioriz\u00e1 las cuentas y configuraciones de recuperaci\u00f3n que controlan el resto de tu vida digital.",
    firstMinItems: [
      "Revis\u00e1 tu email principal y las opciones de recuperaci\u00f3n antes de tocar cuentas menos importantes.",
      "Revis\u00e1 sesiones recientes, dispositivos, reglas de reenv\u00edo y configuraciones de recuperaci\u00f3n.",
      "Cambi\u00e1 credenciales en un orden deliberado en vez de hacer cambios al azar en todos lados.",
      "Anot\u00e1 qu\u00e9 pas\u00f3, qu\u00e9 notaste y qu\u00e9 cambiaste.",
    ],
    whatNotEyebrow: "Lo que no hay que hacer",
    whatNotItems: [
      "No cambies todo a la vez sin entender qu\u00e9 cuentas importan m\u00e1s.",
      "No ignores las configuraciones de recuperaci\u00f3n mientras te enfoc\u00e1s solo en contrase\u00f1as.",
      "No sigas haciendo clic en emails sospechosos para ver qu\u00e9 pasa.",
      "No le pases la situaci\u00f3n a alguien random en DMs porque te sent\u00eds apurado.",
    ],
    privateHelpEyebrow: "\u00bfNecesit\u00e1s ayuda privada?",
    privateHelpBody:
      "Si la situaci\u00f3n se siente urgente, complicada o sensible, us\u00e1 el formulario de contacto. FK94 va a evaluar el caso, la urgencia y el pr\u00f3ximo paso sin convertirlo en una cola de soporte gen\u00e9rica.",
    privateHelpCta: "Usar el formulario urgente",
  },
};

export default function IncidentHelpPage() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <>
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card px-6 py-10 sm:px-10">
            <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">{t.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">
              {t.heading}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {t.subheading}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/get-help?focus=incident-suspicious-activity"
                eventName={analyticsEvents.urgentHelp}
                className="rounded-lg bg-accent px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-accent-strong"
              >
                {t.urgentCta}
              </TrackedLink>
              <TrackedLink
                href="/free-resources/incident-triage"
                eventName={analyticsEvents.resourceOpen}
                eventProps={{ resource: "incident-triage" }}
                className="rounded-lg border border-line bg-card/80 px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-accent/30"
              >
                {t.triageCta}
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow={t.signsEyebrow}
              title={t.signsTitle}
              body={t.signsBody}
            />
            <div className="mt-8 space-y-4">
              {t.signsItems.map((item) => (
                <div key={item} className="rounded-xl border border-line bg-card/80 px-5 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow={t.firstMinEyebrow}
              title={t.firstMinTitle}
              body={t.firstMinBody}
            />
            <div className="mt-8 space-y-4">
              {t.firstMinItems.map((item) => (
                <div key={item} className="rounded-xl border border-line bg-card/80 px-5 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IncidentTriageWizard />
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">{t.whatNotEyebrow}</p>
            <div className="mt-5 space-y-3">
              {t.whatNotItems.map((item) => (
                <div key={item} className="rounded-xl border border-line bg-card/80 px-4 py-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">{t.privateHelpEyebrow}</p>
            <p className="mt-5 text-base leading-8 text-muted">
              {t.privateHelpBody}
            </p>
            <TrackedLink
              href="/get-help?focus=incident-suspicious-activity"
              eventName={analyticsEvents.urgentHelp}
              className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent-strong"
            >
              {t.privateHelpCta}
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
