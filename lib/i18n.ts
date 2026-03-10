export type Locale = "en" | "es";

export const translations = {
  en: {
    nav: {
      services: "Services",
      tools: "Free Tools",
      guides: "Guides",
      blog: "Blog",
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
        { name: "Breach Checker", description: "Check if your email has appeared in known data breaches. See what was exposed and what to do.", cta: "Check Email" },
        { name: "Security Score", description: "2-minute assessment that gives you a personalized security score from 0-100 with recommendations.", cta: "Get Your Score" },
        { name: "Phone Exposure", description: "Check how exposed your phone number is across caller ID databases, data brokers, and social platforms.", cta: "Check Number" },
        { name: "OPSEC Checklist", description: "Interactive checklist to improve your account, device, and exposure habits step by step.", cta: "Start Checklist" },
        { name: "Password Analyzer", description: "Check how strong your passwords really are. Entropy analysis, pattern detection, crack time estimates.", cta: "Analyze Password" },
        { name: "Phishing Quiz", description: "Can you spot the difference between real messages and phishing? Test yourself with 10 realistic scenarios.", cta: "Take the Quiz" },
        { name: "Threat Model", description: "Answer 7 questions about your profile and get a personalized threat model with prioritized action steps.", cta: "Generate Model" },
        { name: "Account Mapper", description: "Map how your accounts are connected. See single points of failure and what falls if one is compromised.", cta: "Map Accounts" },
        { name: "Device Hardening", description: "Step-by-step hardening guides for iPhone, Android, Mac, and Windows. Track your progress.", cta: "Harden Device" },
        { name: "MFA Comparison", description: "Compare SMS, authenticator apps, push notifications, and hardware keys. Find what works for you.", cta: "Compare Methods" },
        { name: "Exposure Self-Check", description: "Quick self-assessment to identify account dependencies, identity overlap, and avoidable exposure.", cta: "Run Check" },
        { name: "Incident Triage", description: "First-response tool for suspicious logins, phishing scares, lost access, or device problems.", cta: "Start Triage" },
        { name: "Password Breach", description: "Check if your password is in 700M+ breached passwords. K-anonymity model — your password never leaves your browser.", cta: "Check Password" },
        { name: "DNS Scanner", description: "Scan any email domain for SPF, DMARC, DKIM. Detect spoofing vulnerabilities automatically.", cta: "Scan Domain" },
        { name: "Email Analyzer", description: "Paste email headers from a suspicious message. We detect spoofing, trace the sender, and verify authentication.", cta: "Analyze Headers" },
        { name: "Username OSINT", description: "Search a username across 30+ platforms automatically. See your complete digital footprint.", cta: "Search Username" },
        { name: "Website Scanner", description: "Scan any website for security headers, HTTPS, and vulnerabilities. Get a grade from A+ to F.", cta: "Scan Website" },
        { name: "OS Hardening Scripts", description: "Generate ready-to-run hardening scripts for macOS and Windows. Choose your profile, pick steps, download the script.", cta: "Generate Script" },
      ],
    },
    stats: {
      items: [
        { value: "19", label: "Free Tools" },
        { value: "40+", label: "Audits Completed" },
        { value: "100%", label: "Client-Side" },
        { value: "98%", label: "Client Retention" },
      ],
    },
    blog: {
      kicker: "Security Alerts",
      title: "Stay informed",
      subtitle: "Recent breach alerts, security tips, and practical advice to keep you ahead of threats.",
      viewAll: "View all posts",
      posts: [
        { slug: "me-hackearon-whatsapp-que-hacer", category: "Security Tip", title: "Me hackearon WhatsApp: Complete Recovery Guide", excerpt: "Step-by-step guide to recover your WhatsApp account, protect your contacts, and prevent it from happening again.", date: "2026-03-10" },
        { slug: "mfa-bypass-phishing-defense", category: "News", title: "New Phishing Technique Bypasses MFA", excerpt: "Adversary-in-the-middle attacks can bypass traditional MFA. Here is how to stay safe.", date: "2026-03-01" },
        { slug: "passkeys-what-you-need-to-know", category: "Security Tip", title: "Passkeys Are Here: What You Need to Know", excerpt: "The future of authentication is passwordless. Which services support passkeys and how to set them up.", date: "2026-01-05" },
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "Common questions",
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
    testimonials: {
      kicker: "What clients say",
      title: "Real results, real people",
      items: [
        { quote: "They found a VPN vulnerability that could have given anyone access to our entire network. Fixed in 48 hours. The ROI on that alone was 100x the cost of the audit.", author: "Operations Manager", location: "Logistics company, Buenos Aires" },
        { quote: "After the audit I changed everything in a weekend. Clear steps, no fluff. Worth every dollar.", author: "Software developer", location: "Austin, TX" },
        { quote: "We thought we were secure until they showed us 8 ex-employee accounts still active with full access. The report was clear, actionable, and the follow-up was included.", author: "IT Director", location: "Manufacturing, GBA" },
        { quote: "We needed a security baseline before signing a big client. FK94 delivered the assessment in a week, and we closed the deal. Professional, fast, no drama.", author: "CTO, SaaS startup", location: "Bariloche" },
        { quote: "Someone was trying to get into our accounts. FK94 walked us through containment in under an hour. Would have been a disaster without them.", author: "Small business owner", location: "Miami, FL" },
        { quote: "The phishing test was eye-opening. 40% of our team clicked. Now we do quarterly awareness sessions. Best investment in security we have made.", author: "Managing Partner", location: "Accounting firm, CABA" },
        { quote: "I needed someone who understood OPSEC without making me feel paranoid. The 1:1 session was exactly that. Practical, calm, no drama.", author: "Journalist", location: "Bogota" },
      ],
    },
    about: {
      kicker: "About FK94",
      title: "Practical security for real people",
      description: "FK94 Security has been helping businesses and individuals secure their digital infrastructure since 2024. We have completed 40+ security audits across industries including manufacturing, logistics, SaaS, healthcare IT, real estate, and professional services.",
      method: "Our method is simple: start with basics, reduce exposure, and only add complexity when the situation requires it. Every engagement includes a clear report, actionable remediation plan, and a 30-day follow-up at no extra cost. Everything on this site is free. If you need help, we are here.",
      casesTitle: "What we help with",
      cases: [
        "Full security audits for SMBs and startups",
        "Email security, DMARC, and anti-phishing",
        "Cloud infrastructure review (AWS, GCP, Azure)",
        "Employee awareness training and phishing tests",
        "Incident response and containment",
        "Compliance readiness (SOC2, ISO 27001, Ley 25.326)",
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
    subscribe: {
      kicker: "Stay Updated",
      title: "Get security alerts in your inbox",
      subtitle: "Breach alerts, practical tips, and new tool announcements. No spam, unsubscribe anytime.",
      placeholder: "you@email.com",
      cta: "Subscribe",
      ctaCompact: "Join",
      sending: "Subscribing...",
      success: "You're in! We'll keep you posted.",
      error: "Something went wrong. Please try again.",
      privacy: "We respect your privacy. No spam, no tracking, no selling your data.",
      compactTitle: "Get security alerts",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      tools: "Herramientas",
      guides: "Guías",
      blog: "Blog",
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
        { name: "Verificador de Filtraciones", description: "Comprobá si tu email apareció en filtraciones de datos conocidas. Mirá qué se expuso y qué hacer.", cta: "Verificar Email" },
        { name: "Puntaje de Seguridad", description: "Evaluación de 2 minutos que te da un puntaje personalizado de 0-100 con recomendaciones.", cta: "Obtener Puntaje" },
        { name: "Exposición Telefónica", description: "Comprobá cuán expuesto está tu número en bases de caller ID, data brokers y plataformas sociales.", cta: "Verificar Número" },
        { name: "Checklist OPSEC", description: "Checklist interactivo para mejorar tus hábitos de seguridad en cuentas, dispositivos y exposición.", cta: "Empezar Checklist" },
        { name: "Analizador de Contraseñas", description: "Verificá qué tan fuertes son tus contraseñas. Análisis de entropía, detección de patrones, tiempo de crackeo.", cta: "Analizar Contraseña" },
        { name: "Quiz de Phishing", description: "¿Podés distinguir mensajes reales de intentos de phishing? Probate con 10 escenarios realistas.", cta: "Hacer el Quiz" },
        { name: "Modelo de Amenazas", description: "Respondé 7 preguntas sobre tu perfil y obtené un modelo de amenazas personalizado con pasos priorizados.", cta: "Generar Modelo" },
        { name: "Mapa de Cuentas", description: "Mapeá cómo están conectadas tus cuentas. Identificá puntos únicos de fallo y qué cae si una se compromete.", cta: "Mapear Cuentas" },
        { name: "Hardening de Dispositivos", description: "Guías paso a paso para endurecer iPhone, Android, Mac y Windows. Seguí tu progreso.", cta: "Endurecer Dispositivo" },
        { name: "Comparador MFA", description: "Compará SMS, apps autenticadoras, notificaciones push y llaves de hardware. Encontrá lo que funciona.", cta: "Comparar Métodos" },
        { name: "Auto-Check de Exposición", description: "Evaluación rápida para identificar dependencias de cuentas, superposición de identidad y exposición evitable.", cta: "Ejecutar Check" },
        { name: "Triage de Incidentes", description: "Herramienta de primera respuesta para logins sospechosos, sustos de phishing, pérdida de acceso.", cta: "Iniciar Triage" },
        { name: "Contraseña Filtrada", description: "Verificá si tu contraseña está en 700M+ contraseñas filtradas. Modelo k-anonymity — nunca sale de tu navegador.", cta: "Verificar Contraseña" },
        { name: "Scanner DNS", description: "Escaneá cualquier dominio de email buscando SPF, DMARC, DKIM. Detectá vulnerabilidades de spoofing automáticamente.", cta: "Escanear Dominio" },
        { name: "Analizador de Email", description: "Pegá los headers de un email sospechoso. Detectamos spoofing, trazamos el remitente y verificamos autenticación.", cta: "Analizar Headers" },
        { name: "OSINT de Username", description: "Buscá un username en 30+ plataformas automáticamente. Mirá tu huella digital completa.", cta: "Buscar Username" },
        { name: "Scanner de Sitio Web", description: "Escaneá cualquier sitio web buscando headers de seguridad, HTTPS y vulnerabilidades. Nota de A+ a F.", cta: "Escanear Sitio" },
        { name: "Scripts de Hardening", description: "Generá scripts de hardening listos para ejecutar en macOS y Windows. Elegí tu perfil, seleccioná pasos, descargá el script.", cta: "Generar Script" },
      ],
    },
    stats: {
      items: [
        { value: "19", label: "Herramientas Gratis" },
        { value: "40+", label: "Auditorías Realizadas" },
        { value: "100%", label: "Client-Side" },
        { value: "98%", label: "Retención de Clientes" },
      ],
    },
    blog: {
      kicker: "Alertas de Seguridad",
      title: "Mantenete informado",
      subtitle: "Alertas de filtraciones recientes, tips de seguridad y consejos prácticos para estar un paso adelante.",
      viewAll: "Ver todas las notas",
      posts: [
        { slug: "me-hackearon-whatsapp-que-hacer", category: "Consejo", title: "Me hackearon WhatsApp: guia completa para recuperar tu cuenta", excerpt: "Paso a paso para recuperar tu WhatsApp, proteger a tus contactos y evitar que vuelva a pasar.", date: "2026-03-10" },
        { slug: "mfa-bypass-phishing-defense", category: "Noticias", title: "Nueva técnica de phishing que evade MFA", excerpt: "Los ataques adversary-in-the-middle pueden evadir MFA tradicional. Así podés protegerte.", date: "2026-03-01" },
        { slug: "passkeys-what-you-need-to-know", category: "Tip", title: "Passkeys: lo que necesitás saber", excerpt: "El futuro de la autenticación es sin contraseñas. Qué servicios ya las soportan y cómo configurarlas.", date: "2026-01-05" },
      ],
    },
    faq: {
      kicker: "Preguntas Frecuentes",
      title: "Preguntas comunes",
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
    testimonials: {
      kicker: "Lo que dicen los clientes",
      title: "Resultados reales, personas reales",
      items: [
        { quote: "Encontraron una vulnerabilidad en la VPN que le daba acceso a cualquiera a toda nuestra red. Resuelto en 48 horas. El ROI solo con eso fue 100x el costo de la auditoría.", author: "Gerente de Operaciones", location: "Empresa de logística, Buenos Aires" },
        { quote: "Después de la auditoría cambié todo en un fin de semana. Pasos claros, sin relleno. Valió cada peso.", author: "Desarrollador de software", location: "Austin, TX" },
        { quote: "Creíamos que estábamos seguros hasta que nos mostraron 8 cuentas de ex-empleados activas con acceso total. El reporte fue claro, accionable, y el follow-up estaba incluido.", author: "Director de IT", location: "Manufactura, GBA" },
        { quote: "Necesitábamos un baseline de seguridad antes de cerrar un cliente grande. FK94 entregó el assessment en una semana y cerramos el deal. Profesional, rápido, sin drama.", author: "CTO, startup SaaS", location: "Bariloche" },
        { quote: "Alguien estaba intentando entrar a nuestras cuentas. FK94 nos guió en la contención en menos de una hora. Hubiera sido un desastre sin ellos.", author: "Dueño de pyme", location: "Miami, FL" },
        { quote: "El test de phishing fue revelador. El 40% de nuestro equipo hizo click. Ahora hacemos sesiones de awareness trimestrales. La mejor inversión en seguridad que hicimos.", author: "Socio fundador", location: "Estudio contable, CABA" },
        { quote: "Necesitaba alguien que entendiera OPSEC sin hacerme sentir paranoico. La sesión 1:1 fue exactamente eso. Práctica, calma, sin drama.", author: "Periodista", location: "Bogotá" },
      ],
    },
    about: {
      kicker: "Sobre FK94",
      title: "Seguridad práctica para personas reales",
      description: "FK94 Security viene ayudando a empresas y personas a asegurar su infraestructura digital desde 2024. Llevamos más de 40 auditorías de seguridad en industrias como manufactura, logística, SaaS, salud IT, real estate y servicios profesionales.",
      method: "Nuestro método es simple: empezar por lo básico, reducir la exposición, y solo agregar complejidad cuando la situación lo requiere. Cada trabajo incluye reporte claro, plan de remediación accionable, y follow-up a 30 días sin costo extra. Todo en este sitio es gratis. Si necesitás ayuda, estamos acá.",
      casesTitle: "En qué ayudamos",
      cases: [
        "Auditorías de seguridad completas para PYMEs y startups",
        "Email security, DMARC y anti-phishing",
        "Revisión de infraestructura cloud (AWS, GCP, Azure)",
        "Capacitación de empleados y tests de phishing",
        "Respuesta a incidentes y contención",
        "Readiness de compliance (SOC2, ISO 27001, Ley 25.326)",
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
    subscribe: {
      kicker: "Mantenete Informado",
      title: "Recibí alertas de seguridad en tu email",
      subtitle: "Alertas de filtraciones, tips prácticos y anuncios de nuevas herramientas. Sin spam, te podés desuscribir cuando quieras.",
      placeholder: "tu@email.com",
      cta: "Suscribirme",
      ctaCompact: "Unirme",
      sending: "Suscribiendo...",
      success: "Listo! Te mantenemos al tanto.",
      error: "Algo salió mal. Intentá de nuevo.",
      privacy: "Respetamos tu privacidad. Sin spam, sin tracking, sin vender tus datos.",
      compactTitle: "Recibí alertas de seguridad",
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
