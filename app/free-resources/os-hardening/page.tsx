"use client";

import { useLocale } from "@/lib/locale-context";
import { OsHardening } from "@/components/os-hardening";

const content = {
  en: {
    kicker: "Free Tool",
    title: "OS Hardening Script Generator",
    subtitle:
      "Select your operating system, choose a security profile, and generate a ready-to-run hardening script. Download it, review it, run it.",
  },
  es: {
    kicker: "Herramienta Gratuita",
    title: "Generador de Scripts de Hardening",
    subtitle:
      "Elegí tu sistema operativo, seleccioná un perfil de seguridad y generá un script listo para ejecutar. Descargalo, revisalo, ejecutalo.",
  },
};

export default function OsHardeningPage() {
  const { locale } = useLocale();
  const t = content[locale];

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        {t.kicker}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
        {t.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        {t.subtitle}
      </p>
      <div className="mt-10">
        <OsHardening />
      </div>
    </section>
  );
}
