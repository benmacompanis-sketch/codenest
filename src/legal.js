// Legal texts for the privacy policy and legal notice pages.
// Keep them factual: every statement here must describe what the site actually
// does. If a third-party service is added or removed (analytics, forms, video
// provider), update the "data we process" section and bump UPDATED.

const UPDATED = { es: '23 de septiembre de 2026', en: 'September 23, 2026' }

const CONTACT = 'WhatsApp +54 11 3407-6364'

// Resolución 14/2018 AAIP, art. 3 — mandatory notice for data controllers.
const AAIP_NOTICE =
  'LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, ' +
  'tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus ' +
  'derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.'

export const LEGAL = {
  es: {
    back: '← Volver al sitio',
    updatedLabel: 'Última actualización',
    privacy: {
      title: 'Política de Privacidad',
      updated: UPDATED.es,
      notice: AAIP_NOTICE,
      sections: [
        {
          h: '1. Quiénes somos',
          body: [
            `I.D.E.A Code es una agencia de desarrollo digital con base en Argentina y es responsable del tratamiento de los datos personales descriptos en esta política. Podés contactarnos por ${CONTACT}.`,
          ],
        },
        {
          h: '2. Qué datos tratamos',
          body: [
            'Este sitio no tiene formularios, no pide registrarse y no utiliza cookies, herramientas de analítica ni rastreadores publicitarios. Los únicos datos que se tratan son:',
            { list: [
              'Datos técnicos de navegación: al visitar el sitio, nuestro proveedor de alojamiento (Vercel Inc.) registra automáticamente la dirección IP, el tipo de navegador y la fecha de acceso, con fines de seguridad y funcionamiento. No usamos estos datos para identificarte.',
              'Video de portada: el video de fondo se transmite desde los servidores de Mux, Inc., que recibe tu dirección IP para poder enviarlo.',
              'Preferencia de idioma: el idioma que elegís se guarda en el almacenamiento local de tu navegador. Permanece en tu dispositivo, no se nos envía y podés borrarlo desde la configuración del navegador.',
              'Datos de contacto: si nos escribís por WhatsApp, recibimos los datos que decidas compartir (nombre, número y contenido del mensaje). WhatsApp es un servicio de Meta Platforms, Inc. y se rige por sus propias condiciones y política de privacidad.',
            ] },
            'Las tipografías del sitio se sirven desde nuestro propio servidor, por lo que no se comparte tu información con servicios de fuentes externos.',
          ],
        },
        {
          h: '3. Para qué los usamos',
          body: [
            'Usamos los datos de contacto únicamente para responder tu consulta, preparar presupuestos y, si contratás un servicio, gestionar el proyecto. No vendemos, alquilamos ni cedemos tus datos a terceros, ni los usamos para enviarte publicidad que no hayas solicitado.',
          ],
        },
        {
          h: '4. Cuánto tiempo los conservamos',
          body: [
            'Conservamos las conversaciones mientras sean necesarias para atender tu consulta o la relación comercial, y luego durante el plazo que exijan las obligaciones legales aplicables. Podés pedir su eliminación en cualquier momento.',
          ],
        },
        {
          h: '5. Proveedores y transferencia internacional',
          body: [
            'Vercel Inc. y Mux, Inc. procesan datos en servidores ubicados, entre otros países, en Estados Unidos. Ambos proveedores aplican medidas de seguridad acordes a estándares internacionales.',
          ],
        },
        {
          h: '6. Tus derechos',
          body: [
            'Como titular de los datos podés solicitar el acceso, la rectificación, la actualización o la supresión de tus datos personales, conforme a la Ley N° 25.326 de Protección de los Datos Personales. El derecho de acceso puede ejercerse en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto (art. 14, inc. 3).',
            `Para ejercer estos derechos escribinos por ${CONTACT}. Te responderemos dentro de los plazos previstos por la ley.`,
            'Si visitás el sitio desde la Unión Europea, también te asisten los derechos previstos en el Reglamento General de Protección de Datos (acceso, rectificación, supresión, limitación, portabilidad y oposición) y el derecho a presentar una reclamación ante la autoridad de control de tu país.',
          ],
        },
        {
          h: '7. Seguridad',
          body: [
            'El sitio se sirve exclusivamente mediante conexiones cifradas (HTTPS) y aplica políticas de seguridad del navegador que impiden la carga de contenido no autorizado.',
          ],
        },
        {
          h: '8. Cambios en esta política',
          body: [
            'Si modificamos esta política, publicaremos la nueva versión en esta misma página indicando la fecha de actualización.',
          ],
        },
      ],
    },
    legal: {
      title: 'Aviso Legal',
      updated: UPDATED.es,
      sections: [
        {
          h: '1. Titular del sitio',
          body: [`Este sitio pertenece a I.D.E.A Code, con base en la República Argentina. Contacto: ${CONTACT}.`],
        },
        {
          h: '2. Carácter de la información',
          body: [
            'El contenido del sitio es informativo y describe los servicios que ofrecemos. No constituye una oferta vinculante. Cada servicio se contrata mediante una propuesta o presupuesto escrito que detalla alcance, plazos y precio, y que prevalece sobre lo publicado en este sitio.',
          ],
        },
        {
          h: '3. Portfolio y marcas de terceros',
          body: [
            'Los proyectos del portfolio fueron desarrollados por I.D.E.A Code. Las marcas, logotipos y nombres comerciales que aparecen en ellos pertenecen a sus respectivos titulares y se muestran únicamente como referencia de trabajos realizados.',
          ],
        },
        {
          h: '4. Propiedad intelectual',
          body: [
            'El diseño, los textos, el código y los elementos gráficos propios de este sitio pertenecen a I.D.E.A Code y están protegidos por la Ley N° 11.723 de Propiedad Intelectual. No pueden reproducirse con fines comerciales sin autorización escrita. El sitio utiliza software de código abierto y tipografías distribuidas bajo sus respectivas licencias.',
          ],
        },
        {
          h: '5. Enlaces a sitios de terceros',
          body: [
            'El sitio contiene enlaces a sitios de terceros, como proyectos del portfolio, redes sociales y WhatsApp. No controlamos su contenido ni sus políticas y no somos responsables por ellos.',
          ],
        },
        {
          h: '6. Disponibilidad y responsabilidad',
          body: [
            'Procuramos que el sitio funcione de forma continua y que su información sea correcta, pero no garantizamos la ausencia de interrupciones o errores. Nada de lo aquí dispuesto limita los derechos que la Ley N° 24.240 de Defensa del Consumidor reconoce a los usuarios.',
          ],
        },
        {
          h: '7. Ley aplicable',
          body: [
            'Este aviso se rige por las leyes de la República Argentina. Cualquier controversia se someterá a los tribunales competentes, sin perjuicio de los derechos que la normativa de defensa del consumidor otorga al usuario respecto de la jurisdicción de su domicilio.',
          ],
        },
      ],
    },
  },

  en: {
    back: '← Back to site',
    updatedLabel: 'Last updated',
    privacy: {
      title: 'Privacy Policy',
      updated: UPDATED.en,
      // The AAIP notice is a legal requirement in Argentina and is kept in Spanish.
      notice: AAIP_NOTICE,
      sections: [
        {
          h: '1. Who we are',
          body: [
            `I.D.E.A Code is a digital development agency based in Argentina and is the controller of the personal data described in this policy. You can reach us via ${CONTACT}.`,
          ],
        },
        {
          h: '2. What data we process',
          body: [
            'This site has no forms, requires no sign-up, and uses no cookies, analytics tools or advertising trackers. The only data processed is:',
            { list: [
              'Technical browsing data: when you visit the site, our hosting provider (Vercel Inc.) automatically logs your IP address, browser type and access time for security and operational purposes. We do not use this data to identify you.',
              'Hero video: the background video is streamed from the servers of Mux, Inc., which receives your IP address in order to deliver it.',
              'Language preference: the language you choose is stored in your browser\'s local storage. It stays on your device, is never sent to us, and can be cleared from your browser settings.',
              'Contact data: if you message us on WhatsApp, we receive whatever you choose to share (name, number and message content). WhatsApp is a service of Meta Platforms, Inc. and is governed by its own terms and privacy policy.',
            ] },
            'The site\'s fonts are served from our own server, so no information is shared with external font services.',
          ],
        },
        {
          h: '3. How we use it',
          body: [
            'We use contact data solely to answer your inquiry, prepare quotes and, if you hire a service, manage the project. We do not sell, rent or share your data with third parties, nor use it to send you unsolicited advertising.',
          ],
        },
        {
          h: '4. How long we keep it',
          body: [
            'We keep conversations for as long as needed to handle your inquiry or the business relationship, and afterwards for the period required by applicable legal obligations. You may request deletion at any time.',
          ],
        },
        {
          h: '5. Providers and international transfers',
          body: [
            'Vercel Inc. and Mux, Inc. process data on servers located in, among other countries, the United States. Both apply security measures in line with international standards.',
          ],
        },
        {
          h: '6. Your rights',
          body: [
            'You may request access to, correction, updating or deletion of your personal data under Argentine Law No. 25.326 on Personal Data Protection. The right of access may be exercised free of charge at intervals of no less than six months, unless a legitimate interest is shown (art. 14, sec. 3).',
            `To exercise these rights, message us via ${CONTACT}. We will reply within the legally established time frames.`,
            'If you visit from the European Union, you also have the rights granted by the General Data Protection Regulation (access, rectification, erasure, restriction, portability and objection) and the right to lodge a complaint with your local supervisory authority.',
          ],
        },
        {
          h: '7. Security',
          body: [
            'The site is served exclusively over encrypted connections (HTTPS) and enforces browser security policies that prevent unauthorized content from loading.',
          ],
        },
        {
          h: '8. Changes to this policy',
          body: [
            'If we change this policy, we will publish the new version on this page with its update date.',
          ],
        },
      ],
    },
    legal: {
      title: 'Legal Notice',
      updated: UPDATED.en,
      sections: [
        {
          h: '1. Site owner',
          body: [`This site belongs to I.D.E.A Code, based in the Argentine Republic. Contact: ${CONTACT}.`],
        },
        {
          h: '2. Nature of the information',
          body: [
            'The site\'s content is informational and describes the services we offer. It is not a binding offer. Every service is engaged through a written proposal or quote detailing scope, timeline and price, which prevails over anything published on this site.',
          ],
        },
        {
          h: '3. Portfolio and third-party trademarks',
          body: [
            'The portfolio projects were developed by I.D.E.A Code. The trademarks, logos and trade names shown in them belong to their respective owners and are displayed solely as references of completed work.',
          ],
        },
        {
          h: '4. Intellectual property',
          body: [
            'The design, text, code and original graphics of this site belong to I.D.E.A Code and are protected by Argentine Intellectual Property Law No. 11.723. They may not be reproduced for commercial purposes without written permission. The site uses open-source software and fonts distributed under their respective licenses.',
          ],
        },
        {
          h: '5. Third-party links',
          body: [
            'The site links to third-party sites such as portfolio projects, social networks and WhatsApp. We do not control their content or policies and are not responsible for them.',
          ],
        },
        {
          h: '6. Availability and liability',
          body: [
            'We strive to keep the site running continuously and its information accurate, but we do not guarantee it will be free of interruptions or errors. Nothing herein limits the rights granted to users by Argentine Consumer Protection Law No. 24.240.',
          ],
        },
        {
          h: '7. Governing law',
          body: [
            'This notice is governed by the laws of the Argentine Republic. Any dispute will be submitted to the competent courts, without prejudice to the rights consumer protection law grants users regarding the jurisdiction of their domicile.',
          ],
        },
      ],
    },
  },
}

export const LEGAL_PAGES = { '#privacidad': 'privacy', '#legal': 'legal' }
