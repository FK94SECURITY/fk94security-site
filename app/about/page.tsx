"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { SectionHeading } from "@/components/section-heading";

const content = {
  en: {
    eyebrow: "About",
    heading: "Practical security for normal people.",
    subheading:
      "FK94 exists because most people do not need an enterprise security brand. They need a clearer place to start, better defaults, and private help when things get personal or urgent.",
    pillars: [
      {
        title: "Why FK94 exists",
        body: "Most people do not need paranoia. They need a calmer, clearer way to improve the things that actually matter.",
      },
      {
        title: "How we work",
        body: "We start with practical guidance, focus on basics first, and only go deeper when the situation really requires it.",
      },
      {
        title: "Privacy by design",
        body: "The goal is to reduce exposure and unnecessary data collection, not create more tracking, more dashboards, or more noise.",
      },
    ],
    methodEyebrow: "Method",
    methodTitle: "Basics first, complexity only when needed.",
    methodBody:
      "Start with free resources. Use the tools. Read the guides. If your situation is more personal, urgent, or messy, we are here for a private 1:1 session.",
    methodItems: [
      "Start with basics and avoid unnecessary complexity.",
      "Reduce exposure before adding more tools.",
      "Keep improvements maintainable under real life conditions.",
      "Use personal help for messy, sensitive, or higher-stakes situations.",
    ],
    founderEyebrow: "Who is behind FK94",
    founderTitle: "Built by a practitioner, not a brand.",
    founderBody: "Independent security consulting focused on real people, not enterprise sales.",
    founderParagraphs: [
      "Founded by a security practitioner with experience in incident response, account recovery, and operational security for individuals.",
      "Background in financial technology, crypto security, and personal privacy consulting.",
      "Based in Buenos Aires. Serving clients in the US, Latin America, and worldwide.",
    ],
    stats: [
      { value: "50+", label: "Audits completed" },
      { value: "18", label: "Free tools built" },
      { value: "24h", label: "Average response" },
    ],
    weHelpWith: "We help with",
    casesWeTake: [
      "General privacy cleanup and account organization",
      "Recovery, MFA, and account hardening issues",
      "Suspicious activity and phishing aftermath",
      "Crypto basics and safer operational habits",
      "Public exposure concerns that need a private review",
    ],
    weDontDo: "We do not do",
    casesWeDontTake: [
      "Corporate enterprise security programs",
      "Offensive security work or active intrusion operations",
      "24/7 managed monitoring retainers disguised as consulting",
      "Requests that require unsafe, unethical, or illegal actions",
    ],
    ctaText: "Have a question or need personal help?",
    ctaButton: "Get Help",
  },
  es: {
    eyebrow: "Nosotros",
    heading: "Seguridad pr\u00e1ctica para personas normales.",
    subheading:
      "FK94 existe porque la mayor\u00eda de las personas no necesitan una marca de seguridad empresarial. Necesitan un lugar m\u00e1s claro para empezar, mejores configuraciones por defecto, y ayuda privada cuando las cosas se ponen personales o urgentes.",
    pillars: [
      {
        title: "Por qu\u00e9 existe FK94",
        body: "La mayor\u00eda de las personas no necesitan paranoia. Necesitan una forma m\u00e1s tranquila y clara de mejorar lo que realmente importa.",
      },
      {
        title: "C\u00f3mo trabajamos",
        body: "Empezamos con gu\u00eda pr\u00e1ctica, nos enfocamos en lo b\u00e1sico primero, y solo profundizamos cuando la situaci\u00f3n realmente lo requiere.",
      },
      {
        title: "Privacidad por dise\u00f1o",
        body: "El objetivo es reducir la exposici\u00f3n y la recolecci\u00f3n innecesaria de datos, no crear m\u00e1s tracking, m\u00e1s dashboards, ni m\u00e1s ruido.",
      },
    ],
    methodEyebrow: "M\u00e9todo",
    methodTitle: "Lo b\u00e1sico primero, complejidad solo cuando es necesario.",
    methodBody:
      "Empez\u00e1 con los recursos gratuitos. Us\u00e1 las herramientas. Le\u00e9 las gu\u00edas. Si tu situaci\u00f3n es m\u00e1s personal, urgente o complicada, estamos ac\u00e1 para una sesi\u00f3n privada 1:1.",
    methodItems: [
      "Empez\u00e1 por lo b\u00e1sico y evit\u00e1 complejidad innecesaria.",
      "Reduc\u00ed la exposici\u00f3n antes de agregar m\u00e1s herramientas.",
      "Manten\u00e9 las mejoras sostenibles en condiciones de vida real.",
      "Us\u00e1 ayuda personal para situaciones complicadas, sensibles o de alto riesgo.",
    ],
    founderEyebrow: "Qui\u00e9n est\u00e1 detr\u00e1s de FK94",
    founderTitle: "Construido por un profesional, no una marca.",
    founderBody: "Consultor\u00eda de seguridad independiente enfocada en personas reales, no en ventas empresariales.",
    founderParagraphs: [
      "Fundado por un profesional de seguridad con experiencia en respuesta a incidentes, recuperaci\u00f3n de cuentas y seguridad operacional para individuos.",
      "Experiencia en tecnolog\u00eda financiera, seguridad cripto y consultor\u00eda de privacidad personal.",
      "Con base en Buenos Aires. Atendiendo clientes en EE.UU., Latinoam\u00e9rica y el mundo.",
    ],
    stats: [
      { value: "50+", label: "Auditor\u00edas completadas" },
      { value: "18", label: "Herramientas gratis" },
      { value: "24h", label: "Respuesta promedio" },
    ],
    weHelpWith: "En qu\u00e9 ayudamos",
    casesWeTake: [
      "Limpieza general de privacidad y organizaci\u00f3n de cuentas",
      "Problemas de recuperaci\u00f3n, MFA y fortalecimiento de cuentas",
      "Actividad sospechosa y consecuencias de phishing",
      "Fundamentos de cripto y h\u00e1bitos operativos m\u00e1s seguros",
      "Preocupaciones de exposici\u00f3n p\u00fablica que necesitan revisi\u00f3n privada",
    ],
    weDontDo: "Lo que no hacemos",
    casesWeDontTake: [
      "Programas de seguridad corporativa empresarial",
      "Trabajo de seguridad ofensiva u operaciones de intrusi\u00f3n activa",
      "Monitoreo 24/7 disfrazado de consultor\u00eda",
      "Pedidos que requieran acciones inseguras, no \u00e9ticas o ilegales",
    ],
    ctaText: "\u00bfTen\u00e9s una pregunta o necesit\u00e1s ayuda personal?",
    ctaButton: "Pedir Ayuda",
  },
};

export default function AboutPage() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <>
      <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-accent">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.96] text-ink sm:text-6xl">
            {t.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            {t.subheading}
          </p>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {t.pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-xl border border-line bg-card p-6">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">{pillar.title}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.methodEyebrow}
            title={t.methodTitle}
            body={t.methodBody}
          />
          <div className="mt-8 space-y-3">
            {t.methodItems.map((item) => (
              <div key={item} className="rounded-xl border border-line bg-card px-5 py-4 text-sm leading-7 text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.founderEyebrow}
            title={t.founderTitle}
            body={t.founderBody}
          />
          <div className="mt-8 rounded-xl border border-line bg-card p-6 sm:p-8">
            <div className="space-y-4 text-sm leading-7 text-muted">
              {t.founderParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {t.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-line bg-card px-4 py-5 text-center">
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card p-6">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">{t.weHelpWith}</p>
            <div className="mt-5 space-y-3">
              {t.casesWeTake.map((item) => (
                <div key={item} className="rounded-xl border border-line px-4 py-3 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-card p-6">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">{t.weDontDo}</p>
            <div className="mt-5 space-y-3">
              {t.casesWeDontTake.map((item) => (
                <div key={item} className="rounded-xl border border-line px-4 py-3 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-line bg-card p-6 text-center sm:p-8">
            <p className="text-base leading-8 text-muted">
              {t.ctaText}
            </p>
            <div className="mt-4">
              <Link
                href="/get-help"
                className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:bg-accent-strong"
              >
                {t.ctaButton}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
