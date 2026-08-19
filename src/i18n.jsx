import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'idea-lang'

export const TRANSLATIONS = {
  es: {
    nav: {
      tagline: 'Innovación Digital para Empresas y Agencias',
      links: ['Servicios', 'Portfolio', 'Proceso', 'Nosotros'],
      contact: 'Contacto',
      close: 'cerrar ✕',
    },
    hero: {
      label: 'Agencia de IA y Marketing Digital',
      lines: ['Presencia digital.', 'Soluciones.', 'Resultados.'],
      sub: 'Webs, automatizaciones, tiendas online y más — todo lo que tu negocio necesita para crecer en internet.',
      cta1: 'Quiero mi web →',
      cta2: 'Ver trabajos',
      scroll: 'scroll',
      ticker: ['Sitios Web', 'E-commerce', 'Software a Medida', 'Automatizaciones', 'Inteligencia Artificial', 'Branding'],
    },
    services: {
      label: 'Servicios',
      title: 'Todo lo que necesitás',
      titleAccent: 'online.',
      hint: 'Hacé click en cualquier servicio para saber más.',
      items: [
        { title: 'Sitios Web y Landing Pages', desc: 'Tu presencia profesional en internet: diseño a medida, carga rápida, optimizado para Google y perfecto en celular. La base de todo negocio digital.' },
        { title: 'Tiendas Online', desc: 'E-commerce completo con carrito, filtros, pasarela de pago y panel de administración. Vendé tus productos las 24 horas, sin intermediarios.' },
        { title: 'Sistemas de Reservas y Turnos', desc: 'Calendario online, confirmación automática y panel de gestión. Ideal para barberías, consultorios, veterinarias, salones y estudios.' },
        { title: 'Portales y Catálogos', desc: 'Listados con filtros avanzados, galería y formulario de consulta. Para inmobiliarias, productos, propiedades, cursos o cualquier catálogo.' },
        { title: 'Paneles de Gestión', desc: 'Fichas de clientes con historial, próximas citas, notas y métricas de tu negocio. Toda tu operación ordenada en un solo lugar.' },
        { title: 'Desarrollo de Software a Medida', desc: '¿Tu negocio necesita algo que no existe? Lo construimos desde cero: aplicaciones web, sistemas internos, calculadoras, integraciones con APIs y herramientas hechas exactamente para tu operación.' },
        { title: 'Automatizaciones e IA', desc: 'Recordatorios por WhatsApp, respuestas automáticas, emails, chatbots con inteligencia artificial y conexión entre tus herramientas. Ahorrás tiempo y no perdés ningún cliente.' },
        { title: 'Branding e Identidad Visual', desc: 'Logo, paleta de colores, tipografías y guía de estilo. Una identidad coherente en tu web, tus redes y todo tu material digital.' },
        { title: 'Mantenimiento y Soporte', desc: 'Plan mensual con cambios, actualizaciones, corrección de errores y mejoras continuas. No te dejamos solo después del lanzamiento.' },
      ],
      customTitle: '¿No encontrás lo que buscás?',
      customDesc: 'Contanos tu idea y vemos si podemos hacerlo. Los precios siempre se hablan por privado.',
      customBtn: 'Hablemos →',
      customWa: 'Hola! Tengo una idea que no está en el listado, ¿podemos hablar?',
    },
    portfolio: {
      label: 'Portfolio',
      title: 'Proyectos que',
      title2: 'hablan por sí',
      titleAccent: 'solos.',
      sub: 'Diseño a medida para cada rubro y objetivo.',
      cats: ['Limpieza Láser y Restauración', 'Inmobiliaria', 'Veterinaria', 'Gastronomía'],
      tags: ['Restauración de superficies', 'Inmuebles · CABA', 'Clínica · Caballito', 'Bar & Cocina · Buenos Aires'],
    },
    process: {
      label: 'Cómo trabajamos',
      title: 'Simple, claro',
      title2: 'y',
      titleAccent: 'sin vueltas.',
      steps: [
        { title: 'Consulta', desc: 'Nos contás tu proyecto, entendemos tus objetivos y te damos un presupuesto claro.' },
        { title: 'Diseño', desc: 'Creamos el diseño visual para que lo apruebes antes de escribir una línea de código.' },
        { title: 'Desarrollo', desc: 'Construimos tu web con tecnología moderna, rápida y optimizada para Google.' },
        { title: 'Lanzamiento', desc: 'Publicamos tu web y te entregamos todo. Ofrecemos mantenimiento mensual para cambios, actualizaciones y corrección de errores.' },
      ],
    },
    about: {
      label: 'Nosotros',
      title: 'Somos',
      titleAccent: 'I.D.E.A Code.',
      p1: 'Somos dos adolescentes estudiantes de ORT que creen que cada negocio merece una presencia digital profesional y efectiva — sin importar el tamaño.',
      p2: 'Trabajamos de forma rápida y transparente: te mostramos avances reales durante todo el proceso, sin sorpresas ni esperas eternas.',
      p3a: 'Incorporamos ',
      p3b: 'inteligencia artificial',
      p3c: ' en nuestro flujo de trabajo para entregar resultados más rápidos, más creativos y con mayor nivel de detalle — sin perder el toque humano.',
      stats: ['Proyectos entregados', 'Clientes satisfechos', 'Tipos de soluciones', 'Tiempo de respuesta'],
      faqLabel: 'Preguntas frecuentes',
      qa: [
        { q: '¿Quiénes son?', a: 'Somos Benicio Nasello Bruno y Andrés Mayo, dos adolescentes estudiantes de ORT apasionados por el desarrollo web y la tecnología. Armamos I.D.E.A Code con una misión clara: que cualquier negocio pueda tener una presencia digital profesional sin pagar una fortuna.' },
        { q: '¿Qué significa I.D.E.A?', a: 'Innovación Digital para Empresas y Agencias. Creemos que una buena idea, bien ejecutada, puede transformar un negocio — y eso es exactamente lo que hacemos.' },
        { q: '¿Cómo trabajan?', a: 'Arrancamos entendiendo tu negocio y te pasamos un diseño para que lo apruebes antes de programar nada. Incorporamos inteligencia artificial en el proceso para entregar resultados más rápidos y creativos. Vas viendo avances reales en cada etapa.' },
        { q: '¿Dónde están?', a: 'Somos 100% remotos y trabajamos desde Argentina para todo el mundo. Nos manejamos por WhatsApp, video llamada o donde te sea más cómodo.' },
        { q: '¿Cuánto cuesta?', a: 'Cada proyecto es distinto, por eso los precios se hablan por privado. Escribinos por WhatsApp y te damos un presupuesto sin compromiso en menos de 24 horas.' },
      ],
    },
    cta: {
      lines: ['¿Listo para', 'llevar tu negocio', 'online?'],
      sub: 'Escribinos hoy y te respondemos antes de las 24 horas. Sin compromiso.',
      btn: 'Escribinos por WhatsApp',
      note: 'Respondemos en menos de 24hs',
    },
    footer: {
      desc: 'Soluciones digitales que hacen crecer tu negocio. Estudiantes de ORT comprometidos con cada proyecto.',
      navLabel: 'Navegación',
      contactLabel: 'Contacto',
      mailSoon: 'Mail próximamente',
      rights: 'Todos los derechos reservados.',
      https: 'Sitio protegido con HTTPS',
      madeBy: 'Diseñado y desarrollado por I.D.E.A Code',
    },
    wa: {
      title: '¡Hablemos de tu proyecto!',
      sub: 'Respuesta en menos de 24h',
      msg: 'Hola! Me interesa saber más sobre I.D.E.A Code. ¿Podemos hablar?',
      msgLong: 'Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?',
    },
    intro: { tagline: 'Agencia de IA y Marketing Digital' },
    meta: {
      title: 'I.D.E.A Code — Agencia de IA y Marketing Digital',
      desc: 'I.D.E.A Code: sitios web profesionales, tiendas online, desarrollo de software a medida, automatizaciones con inteligencia artificial y branding.',
    },
  },

  en: {
    nav: {
      tagline: 'Digital Innovation for Businesses and Agencies',
      links: ['Services', 'Portfolio', 'Process', 'About'],
      contact: 'Contact',
      close: 'close ✕',
    },
    hero: {
      label: 'AI & Digital Marketing Agency',
      lines: ['Digital presence.', 'Solutions.', 'Results.'],
      sub: 'Websites, automations, online stores and more — everything your business needs to grow online.',
      cta1: 'Get my website →',
      cta2: 'View work',
      scroll: 'scroll',
      ticker: ['Websites', 'E-commerce', 'Custom Software', 'Automations', 'Artificial Intelligence', 'Branding'],
    },
    services: {
      label: 'Services',
      title: 'Everything you need',
      titleAccent: 'online.',
      hint: 'Click any service to learn more.',
      items: [
        { title: 'Websites & Landing Pages', desc: 'Your professional presence online: custom design, fast loading, optimized for Google and flawless on mobile. The foundation of every digital business.' },
        { title: 'Online Stores', desc: 'Full e-commerce with cart, filters, payment gateway and admin panel. Sell your products 24/7, with no middlemen.' },
        { title: 'Booking & Appointment Systems', desc: 'Online calendar, automatic confirmations and management panel. Ideal for barbershops, clinics, vets, salons and studios.' },
        { title: 'Portals & Catalogs', desc: 'Listings with advanced filters, gallery and inquiry form. For real estate, products, properties, courses or any catalog.' },
        { title: 'Management Dashboards', desc: 'Client records with history, upcoming appointments, notes and business metrics. Your whole operation organized in one place.' },
        { title: 'Custom Software Development', desc: 'Does your business need something that doesn\'t exist yet? We build it from scratch: web apps, internal systems, calculators, API integrations and tools made exactly for your operation.' },
        { title: 'Automations & AI', desc: 'WhatsApp reminders, automatic replies, emails, AI-powered chatbots and connections between your tools. Save time and never lose a client.' },
        { title: 'Branding & Visual Identity', desc: 'Logo, color palette, typography and style guide. A consistent identity across your website, social media and all your digital material.' },
        { title: 'Maintenance & Support', desc: 'Monthly plan with changes, updates, bug fixes and continuous improvements. We don\'t leave you alone after launch.' },
      ],
      customTitle: 'Can\'t find what you\'re looking for?',
      customDesc: 'Tell us your idea and we\'ll see if we can build it. Pricing is always discussed privately.',
      customBtn: 'Let\'s talk →',
      customWa: 'Hi! I have an idea that isn\'t on the list, can we talk?',
    },
    portfolio: {
      label: 'Portfolio',
      title: 'Projects that',
      title2: 'speak for',
      titleAccent: 'themselves.',
      sub: 'Custom design for every industry and goal.',
      cats: ['Laser Cleaning & Restoration', 'Real Estate', 'Veterinary', 'Restaurant'],
      tags: ['Surface restoration', 'Properties · Buenos Aires', 'Clinic · Caballito', 'Bar & Kitchen · Buenos Aires'],
    },
    process: {
      label: 'How we work',
      title: 'Simple, clear',
      title2: 'and',
      titleAccent: 'straightforward.',
      steps: [
        { title: 'Consultation', desc: 'You tell us about your project, we understand your goals and give you a clear quote.' },
        { title: 'Design', desc: 'We create the visual design for you to approve before writing a single line of code.' },
        { title: 'Development', desc: 'We build your site with modern technology — fast and optimized for Google.' },
        { title: 'Launch', desc: 'We publish your site and hand everything over. We offer monthly maintenance for changes, updates and bug fixes.' },
      ],
    },
    about: {
      label: 'About us',
      title: 'We are',
      titleAccent: 'I.D.E.A Code.',
      p1: 'We are two teenage students at ORT who believe every business deserves a professional and effective digital presence — no matter its size.',
      p2: 'We work fast and transparently: you see real progress throughout the entire process, with no surprises or endless waiting.',
      p3a: 'We bring ',
      p3b: 'artificial intelligence',
      p3c: ' into our workflow to deliver faster, more creative results with greater attention to detail — without losing the human touch.',
      stats: ['Projects delivered', 'Happy clients', 'Types of solutions', 'Response time'],
      faqLabel: 'Frequently asked questions',
      qa: [
        { q: 'Who are you?', a: 'We are Benicio Nasello Bruno and Andrés Mayo, two teenage ORT students passionate about web development and technology. We built I.D.E.A Code with a clear mission: that any business can have a professional digital presence without paying a fortune.' },
        { q: 'What does I.D.E.A mean?', a: 'Digital Innovation for Businesses and Agencies (Innovación Digital para Empresas y Agencias). We believe a good idea, well executed, can transform a business — and that\'s exactly what we do.' },
        { q: 'How do you work?', a: 'We start by understanding your business and send you a design to approve before writing any code. We use artificial intelligence in the process to deliver faster and more creative results. You see real progress at every stage.' },
        { q: 'Where are you based?', a: 'We are 100% remote and work from Argentina for clients worldwide. We communicate via WhatsApp, video call or wherever is most comfortable for you.' },
        { q: 'How much does it cost?', a: 'Every project is different, so pricing is discussed privately. Message us on WhatsApp and we\'ll give you a no-commitment quote in less than 24 hours.' },
      ],
    },
    cta: {
      lines: ['Ready to take', 'your business', 'online?'],
      sub: 'Message us today and we\'ll reply within 24 hours. No commitment.',
      btn: 'Message us on WhatsApp',
      note: 'We reply in under 24h',
    },
    footer: {
      desc: 'Digital solutions that grow your business. ORT students committed to every project.',
      navLabel: 'Navigation',
      contactLabel: 'Contact',
      mailSoon: 'Email coming soon',
      rights: 'All rights reserved.',
      https: 'Site secured with HTTPS',
      madeBy: 'Designed and developed by I.D.E.A Code',
    },
    wa: {
      title: 'Let\'s talk about your project!',
      sub: 'Reply in under 24h',
      msg: 'Hi! I\'d like to know more about I.D.E.A Code. Can we talk?',
      msgLong: 'Hi! I\'d like to bring my business online with I.D.E.A Code. Can we talk?',
    },
    intro: { tagline: 'AI & Digital Marketing Agency' },
    meta: {
      title: 'I.D.E.A Code — AI & Digital Marketing Agency',
      desc: 'I.D.E.A Code: professional websites, online stores, custom software development, AI-powered automations and branding.',
    },
  },
}

const LangContext = createContext(null)

function detectInitial() {
  if (typeof window === 'undefined') return 'es'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitial)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    const t = TRANSLATIONS[lang].meta
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.desc)
  }, [lang])

  const toggle = () => setLang(l => (l === 'es' ? 'en' : 'es'))

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: TRANSLATIONS[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
