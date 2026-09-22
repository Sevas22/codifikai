"use client"

import * as React from "react"
import { createContext, useContext } from "react"

type Language = "es" | "en"

type LanguageProviderProps = {
  children: React.ReactNode
  /** Idioma de la ruta actual. Lo inyecta el layout raíz de cada idioma. */
  language: Language
}

type LanguageProviderState = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Diccionario de traducciones
const translations: Record<Language, Record<string, string>> = {
  es: {
    "nav.home": "Plataforma",
    "nav.about": "Sobre nosotros",
    "nav.services": "Servicios",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.getStarted": "Agendar demo",
    "nav.languageLabel": "Idioma",
    "nav.languageEs": "Español",
    "nav.languageEn": "English",
    "legal.backToHome": "Volver al inicio",
    "legal.contactHint": "Para consultas sobre estos documentos:",
    "legal.privacy.title": "Política de privacidad",
    "legal.privacy.updated": "Última actualización: marzo de 2026",
    "legal.privacy.s1.title": "1. Responsable del tratamiento",
    "legal.privacy.s1.body": "El responsable del tratamiento de los datos personales es Codifikai, en adelante «Codifikai», con domicilio a efectos de notificaciones en Colombia y correo de contacto codifikai@gmail.com.\n\nEl uso de este sitio web y la contratación de servicios puede implicar el tratamiento de datos personales conforme a la legislación aplicable en Colombia (Ley 1581 de 2012 y normas concordantes) y, cuando corresponda, al marco europeo de protección de datos.",
    "legal.privacy.s2.title": "2. Datos que podemos tratar",
    "legal.privacy.s2.body": "Según la interacción con nosotros, podemos tratar datos identificativos y de contacto (nombre, correo electrónico, teléfono, empresa), datos de navegación y técnicos (dirección IP, tipo de dispositivo, navegador, páginas visitadas) y, en su caso, información que nos facilite voluntariamente a través de formularios o comunicaciones.\n\nNo solicitamos datos especialmente protegidos salvo que sea estrictamente necesario y con su consentimiento explícito cuando la ley lo exija.",
    "legal.privacy.s3.title": "3. Finalidades y legitimación",
    "legal.privacy.s3.body": "Tratamos los datos para: gestionar consultas y solicitudes de contacto; prestar y mejorar nuestros servicios de desarrollo de software, automatización e inteligencia artificial; enviar comunicaciones relacionadas con la relación contractual o precontractual cuando exista interés legítimo o consentimiento; cumplir obligaciones legales; y garantizar la seguridad del sitio y la continuidad del servicio.\n\nLa base jurídica puede ser el consentimiento, la ejecución de un contrato, el interés legítimo en la medida aplicable o el cumplimiento de obligaciones legales, según cada tratamiento.",
    "legal.privacy.s4.title": "4. Conservación y comunicación a terceros",
    "legal.privacy.s4.body": "Conservamos los datos el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales. Transcurrido ese plazo, los suprimimos o anonimizamos cuando sea posible.\n\nPodemos recurrir a proveedores de hosting, analítica, correo o herramientas cloud que actúen como encargados del tratamiento bajo instrucciones y medidas contractuales adecuadas. No vendemos sus datos personales a terceros.",
    "legal.privacy.s5.title": "5. Derechos del titular",
    "legal.privacy.s5.body": "Puede ejercer los derechos de conocer, actualizar, rectificar y suprimir sus datos, revocar la autorización o solicitar prueba de la misma, acceder de forma gratuita a sus datos, presentar quejas ante la autoridad competente y las demás que considere la Ley 1581 de 2012 y el decreto reglamentario.\n\nPara ejercer sus derechos, escriba a codifikai@gmail.com indicando el derecho que desea ejercer y su identidad. Podremos solicitar información adicional razonable para verificar su identidad.",
    "legal.privacy.s6.title": "6. Cookies, seguridad y cambios",
    "legal.privacy.s6.body": "Este sitio puede utilizar cookies y tecnologías similares para medir audiencia y mejorar la experiencia. Puede configurar su navegador para rechazar cookies, aunque algunas funciones podrían verse limitadas.\n\nAplicamos medidas técnicas y organizativas razonables para proteger la información. Ningún sistema es 100% seguro.\n\nPodemos modificar esta política; la versión vigente se publicará en esta página con la fecha de actualización indicada arriba.",
    "legal.terms.title": "Términos y condiciones de uso",
    "legal.terms.updated": "Última actualización: marzo de 2026",
    "legal.terms.s1.title": "1. Aceptación",
    "legal.terms.s1.body": "El acceso y uso del sitio web de Codifikai (en adelante, el «Sitio») implica la aceptación de estos términos y condiciones. Si no está de acuerdo, debe abstenerse de utilizar el Sitio.\n\nCodifikai se reserva el derecho de modificar el presente documento en cualquier momento. Los cambios serán efectivos desde su publicación en la web.",
    "legal.terms.s2.title": "2. Identificación y servicios",
    "legal.terms.s2.body": "Codifikai ofrece servicios profesionales de desarrollo de software, automatización, inteligencia artificial y soluciones digitales afines, según lo acordado en cada propuesta o contrato particular.\n\nLos contenidos del Sitio tienen carácter informativo y general. No constituyen asesoramiento jurídico ni garantía de resultados específicos salvo pacto expreso por escrito.",
    "legal.terms.s3.title": "3. Uso permitido",
    "legal.terms.s3.body": "Se compromete a utilizar el Sitio de forma lícita, sin vulnerar derechos de terceros, sin introducir malware ni realizar actividades que puedan dañar, interrumpir o sobrecargar los sistemas.\n\nQueda prohibida la reproducción no autorizada del contenido del Sitio con fines comerciales, la extracción automatizada abusiva (scraping) y cualquier uso que contravenga la ley aplicable o la buena fe.",
    "legal.terms.s4.title": "4. Propiedad intelectual",
    "legal.terms.s4.body": "Los textos, marcas, logotipos, diseño, código y demás elementos del Sitio son protegidos por la legislación aplicable. Los derechos sobre entregables de proyectos se regirán por el contrato correspondiente con cada cliente.\n\nSalvo licencia expresa, no se le otorga ningún derecho de uso sobre los materiales del Sitio más allá de la navegación personal.",
    "legal.terms.s5.title": "5. Limitación de responsabilidad",
    "legal.terms.s5.body": "El Sitio se ofrece «tal cual» y «según disponibilidad». En la medida permitida por la ley, Codifikai no será responsable por daños indirectos, lucro cesante, pérdida de datos o interrupciones derivadas del uso o imposibilidad de uso del Sitio.\n\nLos enlaces a sitios de terceros son meramente informativos; Codifikai no controla los contenidos de esos sitios ni asume responsabilidad por ellos.",
    "legal.terms.s6.title": "6. Ley aplicable y contacto",
    "legal.terms.s6.body": "Salvo disposición imperativa en contrario, las relaciones derivadas del uso del Sitio se interpretarán conforme a la legislación de la República de Colombia. Para controversias, se someterán a los jueces competentes en Colombia, salvo norma especial aplicable.\n\nPara cualquier consulta sobre estos términos: codifikai@gmail.com.",
    "contact.whatsapp": "Respuesta inmediata",
    "contactPage.eyebrow": "Hablemos",
    "contactPage.subtitle":
      "Cuéntanos tu reto en 1 minuto o agenda una llamada estratégica. Respondemos en menos de 24 horas hábiles.",
    "contactPage.formSubtitle": "Mientras más contexto, mejor podemos prepararnos para la llamada.",
    "contactPage.name": "Nombre",
    "contactPage.namePlaceholder": "Tu nombre",
    "contactPage.email": "Correo corporativo",
    "contactPage.emailPlaceholder": "tunombre@empresa.com",
    "contactPage.company": "Empresa",
    "contactPage.companyPlaceholder": "Nombre de tu empresa",
    "contactPage.budget": "Presupuesto estimado",
    "contactPage.budget.unset": "Selecciona un rango",
    "contactPage.budget.small": "Menos de $5.000 USD",
    "contactPage.budget.mid": "$5.000 – $15.000 USD",
    "contactPage.budget.large": "$15.000 – $50.000 USD",
    "contactPage.budget.enterprise": "Más de $50.000 USD",
    "contactPage.budget.undecided": "Aún por definir",
    "contactPage.message": "¿Qué quieres resolver?",
    "contactPage.messagePlaceholder": "Describe tu reto, objetivo o el sistema que tienes en mente…",
    "contactPage.submit": "Enviar solicitud",
    "contactPage.submitting": "Enviando…",
    "contactPage.successTitle": "¡Mensaje enviado!",
    "contactPage.successDesc": "Gracias. Revisaremos tu solicitud y te contactaremos en menos de 24 horas hábiles.",
    "contactPage.errorTitle": "No pudimos enviar el formulario",
    "contactPage.errorDesc": "Inténtalo de nuevo o escríbenos directamente:",
    "contactPage.required": "Este campo es obligatorio",
    "contactPage.emailInvalid": "Ingresa un correo válido",
    "contactPage.bookingTitle": "O agenda una llamada directa",
    "contactPage.bookingSubtitle": "Elige el horario que más te convenga. Sin compromiso.",
    "contactPage.bookingFallbackTitle": "Agenda por WhatsApp",
    "contactPage.bookingFallbackDesc": "Escríbenos y coordinamos una llamada estratégica en el horario que prefieras.",
    "contactPage.bookingFallbackCta": "Coordinar por WhatsApp",
    "contactPage.directWhatsapp": "WhatsApp",
    "contactPage.directEmail": "Correo",
    "contactPage.directPhone": "Teléfono",
  },
  en: {
    "nav.home": "Platform",
    "nav.about": "About us",
    "nav.services": "Services",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getStarted": "Book a Demo",
    "nav.languageLabel": "Language",
    "nav.languageEs": "Español",
    "nav.languageEn": "English",
    "legal.backToHome": "Back to home",
    "legal.contactHint": "For questions about these documents:",
    "legal.privacy.title": "Privacy policy",
    "legal.privacy.updated": "Last updated: March 2026",
    "legal.privacy.s1.title": "1. Data controller",
    "legal.privacy.s1.body": "The controller of personal data is Codifikai, hereinafter «Codifikai», with address for notifications in Colombia and contact email codifikai@gmail.com.\n\nUse of this website and the provision of services may involve processing of personal data in accordance with applicable law in Colombia (Law 1581 of 2012 and related rules) and, where relevant, the European data protection framework.",
    "legal.privacy.s2.title": "2. Data we may process",
    "legal.privacy.s2.body": "Depending on how you interact with us, we may process identification and contact data (name, email, phone, company), browsing and technical data (IP address, device type, browser, pages visited) and, where applicable, information you voluntarily provide via forms or communications.\n\nWe do not request specially protected data unless strictly necessary and with your explicit consent where required by law.",
    "legal.privacy.s3.title": "3. Purposes and legal basis",
    "legal.privacy.s3.body": "We process data to: manage enquiries and contact requests; deliver and improve our software development, automation and artificial intelligence services; send communications related to the contractual or pre-contractual relationship where there is legitimate interest or consent; comply with legal obligations; and ensure site security and service continuity.\n\nThe legal basis may be consent, performance of a contract, legitimate interest where applicable, or compliance with legal obligations, depending on each processing activity.",
    "legal.privacy.s4.title": "4. Retention and disclosure to third parties",
    "legal.privacy.s4.body": "We retain data for as long as necessary to fulfil the purposes described and legal obligations. After that period, we delete or anonymise it where possible.\n\nWe may use hosting, analytics, email or cloud providers who act as processors under appropriate contractual safeguards. We do not sell your personal data.",
    "legal.privacy.s5.title": "5. Your rights",
    "legal.privacy.s5.body": "You may exercise rights to access, update, rectify and delete your data, revoke consent, obtain proof of authorisation, access your data free of charge, lodge complaints with the competent authority, and others provided under Law 1581 of 2012 and its regulations.\n\nTo exercise your rights, write to codifikai@gmail.com stating the right you wish to exercise and your identity. We may request reasonable additional information to verify your identity.",
    "legal.privacy.s6.title": "6. Cookies, security and changes",
    "legal.privacy.s6.body": "This site may use cookies and similar technologies for analytics and to improve the experience. You can configure your browser to reject cookies, although some features may be limited.\n\nWe apply reasonable technical and organisational measures to protect information. No system is 100% secure.\n\nWe may change this policy; the current version will be published on this page with the update date shown above.",
    "legal.terms.title": "Terms and conditions of use",
    "legal.terms.updated": "Last updated: March 2026",
    "legal.terms.s1.title": "1. Acceptance",
    "legal.terms.s1.body": "Access to and use of Codifikai’s website (the «Site») implies acceptance of these terms and conditions. If you do not agree, you must not use the Site.\n\nCodifikai may modify this document at any time. Changes take effect from publication on the web.",
    "legal.terms.s2.title": "2. Identification and services",
    "legal.terms.s2.body": "Codifikai provides professional software development, automation, artificial intelligence and related digital solutions, as agreed in each proposal or individual contract.\n\nSite content is general and informational. It does not constitute legal advice or a guarantee of specific results unless expressly agreed in writing.",
    "legal.terms.s3.title": "3. Permitted use",
    "legal.terms.s3.body": "You agree to use the Site lawfully, without infringing third-party rights, without introducing malware or engaging in activities that may damage, disrupt or overload systems.\n\nUnauthorized commercial reproduction of Site content, abusive automated extraction (scraping) and any use that violates applicable law or good faith are prohibited.",
    "legal.terms.s4.title": "4. Intellectual property",
    "legal.terms.s4.body": "Text, trademarks, logos, design, code and other elements of the Site are protected under applicable law. Rights in project deliverables are governed by the relevant contract with each client.\n\nUnless expressly licensed, no right to use Site materials is granted beyond personal browsing.",
    "legal.terms.s5.title": "5. Limitation of liability",
    "legal.terms.s5.body": "The Site is provided «as is» and «as available». To the extent permitted by law, Codifikai shall not be liable for indirect damages, lost profits, data loss or interruptions arising from use or inability to use the Site.\n\nLinks to third-party sites are for information only; Codifikai does not control those sites or assume responsibility for their content.",
    "legal.terms.s6.title": "6. Governing law and contact",
    "legal.terms.s6.body": "Unless mandatory law provides otherwise, relations arising from use of the Site shall be governed by the laws of the Republic of Colombia. Disputes shall be submitted to the competent courts in Colombia, unless special rules apply.\n\nFor questions about these terms: codifikai@gmail.com.",
    "contact.whatsapp": "Instant response",
    "contactPage.eyebrow": "Let's talk",
    "contactPage.subtitle":
      "Tell us about your challenge in 1 minute or book a strategy call. We reply within 24 business hours.",
    "contactPage.formSubtitle": "The more context you share, the better we can prepare for the call.",
    "contactPage.name": "Name",
    "contactPage.namePlaceholder": "Your name",
    "contactPage.email": "Work email",
    "contactPage.emailPlaceholder": "you@company.com",
    "contactPage.company": "Company",
    "contactPage.companyPlaceholder": "Your company name",
    "contactPage.budget": "Estimated budget",
    "contactPage.budget.unset": "Select a range",
    "contactPage.budget.small": "Under $5,000 USD",
    "contactPage.budget.mid": "$5,000 – $15,000 USD",
    "contactPage.budget.large": "$15,000 – $50,000 USD",
    "contactPage.budget.enterprise": "Over $50,000 USD",
    "contactPage.budget.undecided": "Not sure yet",
    "contactPage.message": "What do you want to solve?",
    "contactPage.messagePlaceholder": "Describe your challenge, goal, or the system you have in mind…",
    "contactPage.submit": "Send request",
    "contactPage.submitting": "Sending…",
    "contactPage.successTitle": "Message sent!",
    "contactPage.successDesc": "Thank you. We'll review your request and get back to you within 24 business hours.",
    "contactPage.errorTitle": "We couldn't submit the form",
    "contactPage.errorDesc": "Please try again or reach us directly:",
    "contactPage.required": "This field is required",
    "contactPage.emailInvalid": "Enter a valid email",
    "contactPage.bookingTitle": "Or book a call directly",
    "contactPage.bookingSubtitle": "Pick the time that works best for you. No commitment.",
    "contactPage.bookingFallbackTitle": "Book via WhatsApp",
    "contactPage.bookingFallbackDesc": "Message us and we'll set up a strategy call at the time you prefer.",
    "contactPage.bookingFallbackCta": "Coordinate on WhatsApp",
    "contactPage.directWhatsapp": "WhatsApp",
    "contactPage.directEmail": "Email",
    "contactPage.directPhone": "Phone",
  },
}

const initialState: LanguageProviderState = {
  language: "es",
  setLanguage: () => null,
  t: () => "",
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

/**
 * El idioma lo determina la ruta, no un estado del navegador.
 *
 * Antes esto era un traductor: una sola URL por página y el texto se cambiaba
 * en el cliente. El buscador solo veía español y el inglés no existía como
 * página indexable. Ahora cada idioma tiene su propia URL y este proveedor se
 * limita a repartir el idioma de la ruta y sus traducciones.
 *
 * Se conserva `setLanguage` por compatibilidad con el código que aún lo llama,
 * pero no cambia nada: para cambiar de idioma hay que navegar (ver
 * `LanguageSwitch` en la navegación).
 */
export function LanguageProvider({
  children,
  language,
  ...props
}: LanguageProviderProps) {
  const t = (key: string): string => translations[language][key] || key

  const value = {
    language,
    // No-op deliberado: cambiar de idioma es una navegación, no un estado.
    setLanguage: () => {},
    t,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
