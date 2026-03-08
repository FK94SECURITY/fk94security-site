"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Locale, type Translations, getTranslations, detectLocale, detectArgentina } from "./i18n";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  isArgentina: boolean;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [isArgentina, setIsArgentina] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());
    setIsArgentina(detectArgentina());
  }, []);

  const t = getTranslations(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isArgentina }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within a LocaleProvider");
  return context;
}
