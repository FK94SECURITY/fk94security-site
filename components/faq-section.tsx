"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/lib/locale-context";

type FaqItem = {
  q: string;
  a: string;
};

const faqEn: FaqItem[] = [
  {
    q: "Is everything really free?",
    a: "Yes. All tools, guides, and checklists are 100% free with no signup required. The only paid service is 1:1 consulting for situations that need personal attention.",
  },
  {
    q: "How does the 1:1 consulting work?",
    a: "You describe your situation through our intake form. We assess fit and urgency, then set up a private, encrypted session where we work through your specific security concerns together. No contracts, no packages.",
  },
  {
    q: "What does a security audit include?",
    a: "A full review of your accounts, MFA configuration, recovery paths, exposure check across data breaches and public databases, device security assessment, and password practices. You get a personalized action plan with prioritized steps.",
  },
  {
    q: "Do you store my data?",
    a: "No. All tools run entirely in your browser — nothing is sent to our servers. Form submissions are encrypted in transit and deleted after your case is resolved.",
  },
  {
    q: "How fast do you respond?",
    a: "Within 24 hours for standard requests. Urgent cases (active incidents, account compromise) are prioritized and typically addressed within a few hours.",
  },
  {
    q: "Can you help if I've been hacked?",
    a: "Yes. Start with our free Incident Triage tool for immediate guidance, then request urgent help through the intake form if you need private, hands-on assistance. We will walk you through containment and recovery.",
  },
  {
    q: "What's the difference between you and antivirus?",
    a: "We focus on account security, privacy practices, digital exposure, and operational security. Antivirus software handles malware detection and removal. Both are important, but they solve different problems. We help with the human and configuration side that antivirus does not cover.",
  },
  {
    q: "Do you work with businesses?",
    a: "We focus on individuals and personal security. For business-specific needs like corporate security audits, penetration testing, or compliance, we can recommend trusted partners in that space.",
  },
  {
    q: "How much does consulting cost?",
    a: "Starting at $150 USD (ARS $150.000 in Argentina). The final price depends on scope and complexity. You always know the cost before committing — no surprise billing.",
  },
  {
    q: "Can I stay anonymous?",
    a: "Yes. You can use any name and a temporary email address. We do not require government ID, phone verification, or real names. Your privacy is respected from the first interaction.",
  },
];

const faqEs: FaqItem[] = [
  {
    q: "¿Es realmente todo gratis?",
    a: "Sí. Todas las herramientas, guías y checklists son 100% gratis sin necesidad de registro. El único servicio pago es la consultoría 1:1 para situaciones que necesitan atención personal.",
  },
  {
    q: "¿Cómo funciona la consultoría 1:1?",
    a: "Describís tu situación a través de nuestro formulario. Evaluamos el ajuste y la urgencia, y armamos una sesión privada encriptada donde trabajamos juntos tus preocupaciones de seguridad. Sin contratos, sin paquetes.",
  },
  {
    q: "¿Qué incluye una auditoría de seguridad?",
    a: "Una revisión completa de tus cuentas, configuración MFA, caminos de recuperación, verificación de exposición en bases de datos filtradas, seguridad de dispositivos y prácticas de contraseñas. Recibís un plan de acción personalizado con pasos priorizados.",
  },
  {
    q: "¿Almacenan mis datos?",
    a: "No. Todas las herramientas corren 100% en tu navegador — nada se envía a nuestros servidores. Los envíos del formulario se encriptan en tránsito y se eliminan después de resolver tu caso.",
  },
  {
    q: "¿Qué tan rápido responden?",
    a: "Dentro de 24 horas para solicitudes estándar. Los casos urgentes (incidentes activos, cuentas comprometidas) se priorizan y generalmente se atienden en pocas horas.",
  },
  {
    q: "¿Pueden ayudar si me hackearon?",
    a: "Sí. Empezá con nuestra herramienta gratuita de Triage de Incidentes para orientación inmediata, después usá el formulario urgente si necesitás ayuda privada. Te acompañamos en la contención y recuperación.",
  },
  {
    q: "¿Cuál es la diferencia con un antivirus?",
    a: "Nos enfocamos en seguridad de cuentas, prácticas de privacidad, exposición digital y seguridad operacional. El antivirus maneja detección y eliminación de malware. Ambos son importantes, pero resuelven problemas distintos.",
  },
  {
    q: "¿Trabajan con empresas?",
    a: "Nos enfocamos en individuos y seguridad personal. Para necesidades empresariales como auditorías corporativas, pentesting o cumplimiento, podemos recomendar socios de confianza.",
  },
  {
    q: "¿Cuánto cuesta la consultoría?",
    a: "Desde $150 USD (ARS $150.000 en Argentina). El precio final depende del alcance y complejidad. Siempre te lo decimos por adelantado — sin sorpresas.",
  },
  {
    q: "¿Puedo mantenerme anónimo?",
    a: "Sí. Podés usar cualquier nombre y un email temporal. No requerimos documento de identidad, verificación telefónica ni nombres reales. Tu privacidad se respeta desde la primera interacción.",
  },
];

export function FaqSection() {
  const { locale } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const items = locale === "es" ? faqEs : faqEn;

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query)
    );
  }, [searchQuery, items]);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="faq" className="section-space border-t border-line/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {locale === "es" ? "Preguntas frecuentes" : "FAQ"}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          {locale === "es"
            ? "Preguntas comunes, respuestas directas."
            : "Common questions, straight answers."}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          {locale === "es"
            ? "Si tu pregunta no está acá, escribinos por el formulario de contacto o reservá una sesión."
            : "If your question is not here, reach out through the contact form or book a session."}
        </p>

        {/* Search */}
        <div className="relative mt-8">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={locale === "es" ? "Buscar preguntas..." : "Search questions..."}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            className="w-full rounded-xl border border-line bg-card py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted/60 focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20"
          />
        </div>

        {/* FAQ list */}
        <div className="mt-8 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-line bg-card p-6 text-center">
              <p className="text-sm text-muted">
                {locale === "es"
                  ? "No se encontraron preguntas. Probá con otro término."
                  : "No matching questions found. Try a different search term."}
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const actualIndex = items.indexOf(item);
              const isOpen = openIndex === actualIndex;
              return (
                <div
                  key={actualIndex}
                  className="rounded-xl border border-line bg-card transition-colors hover:border-accent/20"
                >
                  <button
                    type="button"
                    onClick={() => toggle(actualIndex)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4 text-sm font-semibold text-ink sm:text-base">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-45 border-accent/40 text-accent" : ""
                      }`}
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-line/50 px-6 pb-5 pt-4 text-sm leading-7 text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
