import { motion } from 'framer-motion'
import heroImage from '@/assets/gauravi-hero-2.jpeg.asset.json'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImage.url}
          alt="Gauravi Ahire"
          className="w-full h-full object-cover scale-[1.6] md:scale-100 object-[60%_30%] md:object-[center_85%]"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-6 sm:px-10 md:px-20 lg:px-28">
        <div className="w-full max-w-5xl">
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-display leading-[0.95] tracking-tighter text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8.5vw]">
              <span className="block text-white">Gauravi</span>
              <span className="block text-white">Ahire</span>
              <span className="block text-white">PHOTOGRAPHY</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 md:mt-8 text-sm sm:text-base text-white/80 max-w-sm md:max-w-md leading-relaxed"
            >
              Gauravi was named in Aperture Magazine's prestigious "Visual 100" list, as one of the Ten Most Compelling Photographers in 2023.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
