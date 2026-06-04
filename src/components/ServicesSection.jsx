import { motion } from 'framer-motion'
import { Globe, QrCode, ShoppingBag, Zap, Palette, BookOpen, ArrowUpRight } from 'lucide-react'

const wa = (msg) => `https://wa.me/541134076364?text=${encodeURIComponent(msg)}`

const SERVICES = [
  {
    icon: Globe,
    title: 'Páginas Web',
    subtitle: 'Profesionales',
    description: 'Presencia digital elegante y funcional para cualquier tipo de negocio. Diseñadas para impresionar y convertir.',
    cta: 'Quiero mi web',
    msg: 'Hola! Me interesa una página web profesional. ¿Podemos hablar?',
  },
  {
    icon: QrCode,
    title: 'Menú Digital',
    subtitle: 'con Código QR',
    description: 'Modernizá tu restaurante o café con un menú digital moderno accesible desde cualquier celular con un escaneo.',
    cta: 'Quiero mi menú',
    msg: 'Hola! Me interesa un menú digital QR. ¿Podemos hablar?',
  },
  {
    icon: ShoppingBag,
    title: 'Tienda Online',
    subtitle: 'E-Commerce',
    description: 'Vendé tus productos las 24 horas del día con carrito de compras, pagos integrados y gestión de inventario.',
    cta: 'Quiero mi tienda',
    msg: 'Hola! Me interesa crear una tienda online. ¿Podemos hablar?',
  },
  {
    icon: Zap,
    title: 'Landing Page',
    subtitle: 'Alta Conversión',
    description: 'Sitios de una página diseñados con un objetivo claro: convertir visitas en clientes y leads reales.',
    cta: 'Quiero mi landing',
    msg: 'Hola! Me interesa una landing page de alta conversión. ¿Podemos hablar?',
  },
  {
    icon: Palette,
    title: 'Identidad Visual',
    subtitle: 'Branding Digital',
    description: 'Diseño de marca digital que transmite la personalidad, valores y profesionalismo de tu negocio.',
    cta: 'Quiero mi marca',
    msg: 'Hola! Me interesa identidad visual digital y branding. ¿Podemos hablar?',
  },
  {
    icon: BookOpen,
    title: 'Blog Personal',
    subtitle: 'Tu Voz Digital',
    description: 'Espacios digitales cuidadosamente diseñados para compartir ideas y construir autoridad en tu área.',
    cta: 'Quiero mi blog',
    msg: 'Hola! Me interesa crear un blog personal. ¿Podemos hablar?',
  },
]

const ease = [0.25, 0.1, 0.25, 1]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

function ServiceCard({ service }) {
  const Icon = service.icon
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="card-surface rounded-2xl p-7 flex flex-col gap-5 cursor-default group"
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center transition-all duration-300 group-hover:bg-brand/18 group-hover:border-brand/30">
        <Icon size={20} className="text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="font-inter font-extrabold text-white text-[18px] leading-tight mb-0.5">{service.title}</p>
        <p className="font-jakarta font-bold text-brand/70 text-[11px] uppercase tracking-widest mb-3">{service.subtitle}</p>
        <p className="font-inter text-white/50 text-[14px] leading-relaxed">{service.description}</p>
      </div>

      {/* CTA */}
      <motion.a
        href={wa(service.msg)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 font-inter font-semibold text-[13px] text-white/40 hover:text-brand transition-colors duration-200 group/link w-fit"
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {service.cta}
        <ArrowUpRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      </motion.a>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative py-28 md:py-36 overflow-hidden">
      {/* Subtle dots bg */}
      <div className="absolute inset-0 bg-dots opacity-100 pointer-events-none" aria-hidden="true" />
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #070b0a, transparent)' }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #070b0a, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-label mb-4">Lo que hacemos</p>
          <h2 className="section-heading mb-5">
            Soluciones Digitales<br />
            para tu <span className="gradient-text">Negocio</span>
          </h2>
          <p className="font-inter text-white/50 text-[15px] leading-relaxed">
            Cada servicio está diseñado para que tu negocio destaque en internet y convierta más clientes.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <p className="font-inter text-white/35 text-[14px] mb-5">
            ¿No encontrás lo que buscás? Hablemos de tu proyecto.
          </p>
          <motion.a
            href={`https://wa.me/541134076364?text=${encodeURIComponent('Hola! Tengo un proyecto digital y quiero saber si pueden ayudarme. ¿Podemos hablar?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-inter font-semibold text-[13px] text-brand border border-brand/30 px-6 py-3 rounded-full hover:bg-brand/10 transition-all duration-200"
            whileHover={{ scale: 1.04, borderColor: 'rgba(94,210,156,0.6)' }}
            whileTap={{ scale: 0.97 }}
          >
            Consultar proyecto a medida
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
