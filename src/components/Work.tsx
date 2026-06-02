import { motion } from 'framer-motion'

type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
  span?: 'tall' | 'wide' | 'square'
}

type Project = {
  title: string
  year: string
  location: string
  description: string
  media: MediaItem[]
}

// Placeholder projects — replace media URLs with your own photos/videos.
const projects: Project[] = [
  {
    title: 'Monsoon Diaries',
    year: '2025',
    location: 'Western Ghats, India',
    description: 'A documentary series capturing the moods of the monsoon across hill villages and tea estates.',
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1200&q=80', alt: 'Misty mountain', span: 'tall' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80', alt: 'Rain landscape', span: 'wide' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80', alt: 'Lake view', span: 'square' },
    ],
  },
  {
    title: 'Threads of Tradition',
    year: '2024',
    location: 'Rajasthan, India',
    description: 'Portraits of artisans and textile workers preserving generations of craft.',
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80', alt: 'Portrait', span: 'tall' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80', alt: 'Textiles', span: 'square' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80', alt: 'Artisan hands', span: 'wide' },
    ],
  },
  {
    title: 'City After Dark',
    year: '2024',
    location: 'Mumbai, India',
    description: 'A short film and photo series exploring the rhythm of the city between midnight and dawn.',
    media: [
      { type: 'video', src: 'https://cdn.coverr.co/videos/coverr-night-traffic-in-the-city-2633/1080p.mp4', span: 'wide' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80', alt: 'Neon street', span: 'square' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80', alt: 'City lights', span: 'tall' },
    ],
  },
  {
    title: 'Wedding — Aanya & Rohan',
    year: '2023',
    location: 'Udaipur, India',
    description: 'Three days of rituals, light and quiet moments between a family reunited.',
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', alt: 'Wedding', span: 'square' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80', alt: 'Couple', span: 'tall' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80', alt: 'Ceremony', span: 'wide' },
    ],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: 'easeOut' }
}

const spanClass: Record<NonNullable<MediaItem['span']>, string> = {
  tall: 'md:row-span-2 aspect-[3/4] md:aspect-auto',
  wide: 'md:col-span-2 aspect-[16/10]',
  square: 'aspect-square',
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Selected Work</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          PROJECTS<br />&amp; EVENTS
        </motion.h2>

        {/* Projects */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="group"
            >
              {/* Project header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 mb-8 border-t border-gray-800 pt-8">
                <div className="lg:col-span-7">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500">{project.location}</p>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-500 tracking-widest uppercase">{project.year}</p>
                </div>
                <p className="lg:col-span-3 text-sm lg:text-base text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Media grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[16rem] md:auto-rows-[20rem] gap-3 md:gap-4">
                {project.media.map((item, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden bg-gray-900 ${spanClass[item.span ?? 'square']}`}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.alt ?? project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] hover:!scale-105"
                      />
                    ) : (
                      <video
                        src={item.src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
