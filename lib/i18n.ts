export type Locale = "en" | "es";

export const translations = {
  en: {
    nav: {
      services: "Services",
      tools: "Free Tools",
      guides: "Guides",
      about: "About",
      contact: "Contact",
      requestAudit: "Request Audit",
    },
    hero: {
      kicker: "Personal Security Services",
      title: "Protect your digital life.",
      subtitle: "Free tools, expert guides, and private 1:1 consulting to secure your accounts, reduce exposure, and stay ahead of threats.",
      cta: "Request a Security Audit",
      ctaSecondary: "Explore Free Tools",
      trusted: "Trusted by individuals and professionals worldwide",
    },
    services: {
      kicker: "Services",
      title: "What we do",
      subtitle: "Comprehensive personal security services, from basic hardening to advanced OPSEC advisory.",
      items: [
        {
          name: "Privacy Review",
          description: "Complete audit of your accounts, recovery paths, MFA setup, and exposure. We identify weak spots and give you a clear action plan.",
        },
        {
          name: "Account Hardening",
          description: "Hands-on implementation: we harden your email, cloud, social media, and financial accounts. Recovery paths, MFA, and cleanup.",
        },
        {
          name: "Incident Response",
          description: "Calm, structured support for phishing scares, suspicious activity, access loss, or account compromise. Immediate triage and containment.",
        },
        {
          name: "OPSEC Advisory",
          description: "For high-exposure individuals, sensitive situations, or cases that need deeper, private support. Identity separation, threat modeling, and safer habits.",
        },
        {
          name: "Device Hardening",
          description: "Lock down your phone, laptop, and browser. Platform-specific security settings, encryption, and hygiene for iOS, Android, Mac, and Windows.",
        },
        {
          name: "Security Training",
          description: "Personalized training on phishing detection, password management, social engineering awareness, and safe browsing habits.",
        },
      ],
    },
    tools: {
      kicker: "Free Tools",
      title: "Use our tools. No signup. No tracking.",
      subtitle: "Interactive security tools that run entirely in your browser. Your data never leaves your device.",
      items: [
        { name: "OPSEC Checklist", description: "Interactive checklist to improve your account, device, and exposure habits step by step.", cta: "Start Checklist" },
        { name: "Password Analyzer", description: "Check how strong your passwords really are. Entropy analysis, pattern detection, crack time estimates.", cta: "Analyze Password" },
        { name: "Phishing Quiz", description: "Can you spot the difference between real messages and phishing? Test yourself with 10 realistic scenarios.", cta: "Take the Quiz" },
        { name: "Device Hardening", description: "Step-by-step hardening guides for iPhone, Android, Mac, and Windows. Track your progress.", cta: "Harden Device" },
        { name: "Exposure Self-Check", description: "Quick self-assessment to identify account dependencies, identity overlap, and avoidable exposure.", cta: "Run Check" },
        { name: "Incident Triage", description: "First-response tool for suspicious logins, phishing scares, lost access, or device problems.", cta: "Start Triage" },
      ],
    },
    stats: {
      items: [
        { value: "7", label: "Free Tools" },
        { value: "10+", label: "Expert Guides" },
        { value: "100%", label: "Client-Side" },
        { value: "24h", label: "Response Time" },
      ],
    },
    audit: {
      kicker: "Security Audit",
      title: "Request a Security Audit",
      subtitle: "Tell us about your situation. We will review it and suggest the best path forward, whether that is a free resource or a private session.",
      price: "Starting from",
      priceValue: "$150 USD",
      priceArs: "ARS $150.000",
      priceNote: "Final price depends on scope and complexity",
      form: {
        name: "Full name",
        email: "Email",
        topic: "What do you need help with?",
        urgency: "Urgency",
        message: "Tell us what is going on",
        send: "Send Request",
        sending: "Sending...",
        success: "Message sent! We will get back to you soon.",
        topics: [
          { value: "privacy-review", label: "Privacy review" },
          { value: "account-hardening", label: "Account hardening" },
          { value: "incident", label: "Incident / suspicious activity" },
          { value: "opsec", label: "OPSEC advisory" },
          { value: "device", label: "Device hardening" },
          { value: "training", label: "Security training" },
          { value: "other", label: "Other" },
        ],
        urgencies: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High - need help now" },
        ],
      },
    },
    about: {
      kicker: "About FK94",
      title: "Practical security for real people",
      description: "FK94 exists because most people do not need an enterprise security brand. They need a clearer place to start, better defaults, and private help when things get personal or urgent.",
      method: "Our method is simple: start with basics, reduce exposure, and only add complexity when the situation requires it. Everything on this site is free. If you need personal help, we are here.",
      casesTitle: "What we help with",
      cases: [
        "Privacy cleanup and account organization",
        "Recovery, MFA, and account hardening",
        "Suspicious activity and phishing aftermath",
        "Crypto basics and safer operational habits",
        "Public exposure and identity concerns",
        "Device and browser security",
      ],
    },
    footer: {
      description: "Free security tools and expert guides. Private 1:1 consulting when you need it.",
      services: "Services",
      resources: "Resources",
      company: "Company",
      rights: "All Rights Reserved",
    },
    guides: {
      kicker: "Guides",
      title: "Learn at your own pace",
      subtitle: "In-depth security guides written in plain language. All free, no signup required.",
      readGuide: "Read guide",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      tools: "Herramientas",
      guides: "Guías",
      about: "Nosotros",
      contact: "Contacto",
      requestAudit: "Solicitar Auditoría",
    },
    hero: {
      kicker: "Servicios de Seguridad Personal",
      title: "Protegé tu vida digital.",
      subtitle: "Herramientas gratuitas, guías de expertos y consultoría privada 1:1 para asegurar tus cuentas, reducir tu exposición y estar un paso adelante.",
      cta: "Solicitar Auditoría de Seguridad",
      ctaSecondary: "Explorar Herramientas Gratis",
      trusted: "Confianza de individuos y profesionales en todo el mundo",
    },
    services: {
      kicker: "Servicios",
      title: "Qué hacemos",
      subtitle: "Servicios integrales de seguridad personal, desde hardening básico hasta asesoría OPSEC avanzada.",
      items: [
        {
          name: "Revisión de Privacidad",
          description: "Auditoría completa de tus cuentas, recuperación, MFA y exposición. Identificamos puntos débiles y te damos un plan de acción claro.",
        },
        {
          name: "Hardening de Cuentas",
          description: "Implementación práctica: endurecemos tu email, nube, redes sociales y cuentas financieras. Recuperación, MFA y limpieza.",
        },
        {
          name: "Respuesta a Incidentes",
          description: "Soporte calmo y estructurado para phishing, actividad sospechosa, pérdida de acceso o compromiso de cuentas. Triage y contención inmediata.",
        },
        {
          name: "Asesoría OPSEC",
          description: "Para personas de alto perfil, situaciones sensibles o casos que necesitan soporte profundo y privado. Separación de identidad, modelado de amenazas.",
        },
        {
          name: "Hardening de Dispositivos",
          description: "Asegurá tu teléfono, laptop y navegador. Configuraciones de seguridad específicas por plataforma, encriptación e higiene para iOS, Android, Mac y Windows.",
        },
        {
          name: "Capacitación en Seguridad",
          description: "Entrenamiento personalizado en detección de phishing, gestión de contraseñas, ingeniería social y navegación segura.",
        },
      ],
    },
    tools: {
      kicker: "Herramientas Gratis",
      title: "Usá nuestras herramientas. Sin registro. Sin tracking.",
      subtitle: "Herramientas interactivas que corren 100% en tu navegador. Tus datos nunca salen de tu dispositivo.",
      items: [
        { name: "Checklist OPSEC", description: "Checklist interactivo para mejorar tus hábitos de seguridad en cuentas, dispositivos y exposición.", cta: "Empezar Checklist" },
        { name: "Analizador de Contraseñas", description: "Verificá qué tan fuertes son tus contraseñas. Análisis de entropía, detección de patrones, tiempo de crackeo.", cta: "Analizar Contraseña" },
        { name: "Quiz de Phishing", description: "¿Podés distinguir mensajes reales de intentos de phishing? Probate con 10 escenarios realistas.", cta: "Hacer el Quiz" },
        { name: "Hardening de Dispositivos", description: "Guías paso a paso para endurecer iPhone, Android, Mac y Windows. Seguí tu progreso.", cta: "Endurecer Dispositivo" },
        { name: "Auto-Check de Exposición", description: "Evaluación rápida para identificar dependencias de cuentas, superposición de identidad y exposición evitable.", cta: "Ejecutar Check" },
        { name: "Triage de Incidentes", description: "Herramienta de primera respuesta para logins sospechosos, sustos de phishing, pérdida de acceso.", cta: "Iniciar Triage" },
      ],
    },
    stats: {
      items: [
        { value: "7", label: "Herramientas Gratis" },
        { value: "10+", label: "Guías de Expertos" },
        { value: "100%", label: "Client-Side" },
        { value: "24h", label: "Tiempo de Respuesta" },
      ],
    },
    audit: {
      kicker: "Auditoría de Seguridad",
      title: "Solicitá una Auditoría de Seguridad",
      subtitle: "Contanos tu situación. La revisamos y te sugerimos el mejor camino, ya sea un recurso gratuito o una sesión privada.",
      price: "Desde",
      priceValue: "$150 USD",
      priceArs: "ARS $150.000",
      priceNote: "El precio final depende del alcance y complejidad",
      form: {
        name: "Nombre completo",
        email: "Email",
        topic: "¿Con qué necesitás ayuda?",
        urgency: "Urgencia",
        message: "Contanos qué está pasando",
        send: "Enviar Solicitud",
        sending: "Enviando...",
        success: "¡Mensaje enviado! Te respondemos pronto.",
        topics: [
          { value: "privacy-review", label: "Revisión de privacidad" },
          { value: "account-hardening", label: "Hardening de cuentas" },
          { value: "incident", label: "Incidente / actividad sospechosa" },
          { value: "opsec", label: "Asesoría OPSEC" },
          { value: "device", label: "Hardening de dispositivos" },
          { value: "training", label: "Capacitación en seguridad" },
          { value: "other", label: "Otro" },
        ],
        urgencies: [
          { value: "low", label: "Baja" },
          { value: "medium", label: "Media" },
          { value: "high", label: "Alta - necesito ayuda ya" },
        ],
      },
    },
    about: {
      kicker: "Sobre FK94",
      title: "Seguridad práctica para personas reales",
      description: "FK94 existe porque la mayoría de las personas no necesitan una marca de seguridad empresarial. Necesitan un lugar más claro para empezar, mejores defaults y ayuda privada cuando las cosas se ponen personales o urgentes.",
      method: "Nuestro método es simple: empezar por lo básico, reducir la exposición, y solo agregar complejidad cuando la situación lo requiere. Todo en este sitio es gratis. Si necesitás ayuda personal, estamos acá.",
      casesTitle: "En qué ayudamos",
      cases: [
        "Limpieza de privacidad y organización de cuentas",
        "Recuperación, MFA y hardening de cuentas",
        "Actividad sospechosa y secuelas de phishing",
        "Crypto basics y hábitos operacionales más seguros",
        "Exposición pública y preocupaciones de identidad",
        "Seguridad de dispositivos y navegador",
      ],
    },
    footer: {
      description: "Herramientas de seguridad gratuitas y guías de expertos. Consultoría privada 1:1 cuando la necesités.",
      services: "Servicios",
      resources: "Recursos",
      company: "Empresa",
      rights: "Todos los derechos reservados",
    },
    guides: {
      kicker: "Guías",
      title: "Aprendé a tu ritmo",
      subtitle: "Guías de seguridad detalladas escritas en lenguaje simple. Todas gratis, sin registro.",
      readGuide: "Leer guía",
    },
  },
} as const;

// Recursively widen literal string types to `string` and strip `readonly`
// so both locales share a single structural type while keeping shape enforced.
type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepStringify<U>[]
    : T extends object
      ? { -readonly [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type Translations = DeepStringify<typeof translations.en>;

export function getTranslations(locale: Locale): Translations {
  return translations[locale] as unknown as Translations;
}

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language || "";
  if (lang.startsWith("es")) return "es";
  return "en";
}

export function detectArgentina(): boolean {
  // Will be enhanced with actual geo-detection
  if (typeof window === "undefined") return false;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return tz.includes("Argentina") || tz.includes("Buenos_Aires");
}
