import { motion } from 'framer-motion'

const contacts = [
  { label: 'EMAIL', type: 'email', detail: 'hello@gauravi.com' },
  { label: 'PHONE', type: 'phone', detail: '+1 (212) 555-0182' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Contact</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        {/* Giant Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[12vw] lg:text-hero leading-none tracking-tight mb-8"
        >
          Get in touch
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="w-full h-px bg-gray-700 mb-12 lg:mb-16"
        />

        {/* Informal Text */}
        <motion.div
          {...fadeInUp}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-tight mb-4">
            I'M NOTORIOUSLY<br />
            SLOW AT GETTING<br />
            BACK TO EMAILS
          </h3>
          <p className="text-sm text-gray-500 tracking-widest uppercase">
            IN A HURRY? PLEASE CONTACT MY AWESOME PRODUCERS
          </p>
        </motion.div>

        {/* Contact Links */}
        <div className="space-y-0 max-w-2xl">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between border-t border-gray-800 py-5 md:py-6 group px-4 -mx-4"
            >
              <span className="text-sm text-gray-400 tracking-widest">
                {contact.label}
              </span>
              <span className="text-gray-500">
                {contact.type === 'email' ? contact.detail : contact.detail}
              </span>
            </motion.div>
          ))}
          <div className="border-t border-gray-800" />
        </div>

        {/* Social Links */}
        <motion.div
          {...fadeInUp}
          className="mt-16 lg:mt-24 pt-12 lg:pt-16 border-t border-gray-800"
        >
          <p className="text-sm text-gray-500 mb-6 lg:mb-8 tracking-widest uppercase">
            Social
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16">
            <a
              href="https://instagram.com/brucebanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg lg:text-xl text-gray-300 hover:text-white transition-colors underline underline-offset-4 decoration-gray-600 hover:decoration-white"
            >
              Instagram
            </a>
            <a
              href="https://vimeo.com/brucebanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg lg:text-xl text-gray-300 hover:text-white transition-colors underline underline-offset-4 decoration-gray-600 hover:decoration-white"
            >
              Twitter / X
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          {...fadeInUp}
          className="mt-24 lg:mt-32 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Gauravi Ahire Photography. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            New York / London
          </p>
        </motion.footer>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="back-to-top"
        aria-label="Back to top"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </section>
  )
}
