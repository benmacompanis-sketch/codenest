import { motion } from 'framer-motion'
import { Globe, QrCode, ShoppingBag, Zap, Palette, FileText } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Páginas Web',
    description: 'Tu presencia online profesional, diseñada para convertir visitas en clientes.',
  },
  {
    icon: ShoppingBag,
    title: 'Tiendas Online',
    description: 'E-commerce completo con pasarela de pago, stock y gestión.',
  },
  {
    icon: QrCode,
    title: 'Menú Digital QR',
    description: 'Menú digital para tu restaurante o bar, actualizable en tiempo real.',
  },
  {
    icon: Zap,
    title: 'Landing Pages',
    description: 'Una página enfocada en un objetivo: captar leads o vender.',
  },
  {
    icon: Palette,
    title: 'Branding Digital',
    description: 'Identidad visual para tu negocio: logo, colores, tipografía.',
  },
  {
    icon: FileText,
    title: 'Blog Personal',
    description: 'Plataforma de contenido para posicionarte como experto.',
  },
]

const ease = [0.25, 0.1, 0.25, 1]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
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
      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group rounded-2xl p-7 flex flex-col gap-5 cursor-default"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.07)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#5ed29c'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(94,210,156,0.12)' }}
      >
        <Icon size={20} className="text-brand" strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="font-inter font-extrabold text-[#0a0a0a] text-[17px] leading-tight mb-2">
          {service.title}
        </p>
        <p className="font-inter text-[#0a0a0a]/55 text-[14px] leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative py-28 md:py-36 overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-label mb-4">Servicios</p>
          <h2 className="section-heading mb-5">
            Todo lo que tu negocio<br />necesita online.
          </h2>
          <p className="font-inter text-[#0a0a0a]/50 text-[15px] leading-relaxed">
            Cada servicio está diseñado para que tu negocio destaque en internet y convierta más clientes.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
