import { motion } from 'framer-motion'
import { useState } from 'react'
import { Lightbox } from './Lightbox'
import { ProjectExpanded } from './ProjectExpanded'

export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
  span?: 'tall' | 'wide' | 'square'
}

export type Project = {
  title: string
  year: string
  location: string
  description: string
  media: MediaItem[]
  audioSrc?: string
  slideshow?: boolean
}

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
      { type: 'image', src: 'https://picsum.photos/seed/monsoon4/800/1200', alt: 'Tea estates', span: 'tall' },
      { type: 'image', src: 'https://picsum.photos/seed/monsoon5/1200/800', alt: 'Monsoon road', span: 'wide' },
      { type: 'image', src: 'https://picsum.photos/seed/monsoon6/800/800', alt: 'Mist valley', span: 'square' },
      { type: 'image', src: 'https://picsum.photos/seed/monsoon7/1200/800', alt: 'Forest trail', span: 'wide' },
      { type: 'image', src: 'https://picsum.photos/seed/monsoon8/800/1200', alt: 'River view', span: 'tall' },
      { type: 'image', src: 'https://picsum.photos/seed/monsoon9/800/800', alt: 'Hill station', span: 'square' },
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
      { type: 'image', src: 'https://picsum.photos/seed/tradition4/800/1200', alt: 'Craft work', span: 'tall' },
      { type: 'image', src: 'https://picsum.photos/seed/tradition5/1200/800', alt: 'Weaving loom', span: 'wide' },
      { type: 'image', src: 'https://picsum.photos/seed/tradition6/800/800', alt: 'Market colors', span: 'square' },
      { type: 'image', src: 'https://picsum.photos/seed/tradition7/1200/800', alt: 'Craft village', span: 'wide' },
      { type: 'image', src: 'https://picsum.photos/seed/tradition8/800/1200', alt: 'Handicrafts', span: 'tall' },
    ],
  },
  {
    title: 'City After Dark',
    year: '2024',
    location: 'Mumbai, India',
    description: 'A short film and photo series exploring the rhythm of the city between midnight and dawn.',
    media: [
      { type: 'video', src: 'https://assets.mixkit.co/videos/1146/1146-720.mp4', span: 'wide' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80', alt: 'Neon street', span: 'square' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80', alt: 'City lights', span: 'tall' },
      { type: 'image', src: 'https://picsum.photos/seed/city4/1200/800', alt: 'Night skyline', span: 'wide' },
      { type: 'image', src: 'https://picsum.photos/seed/city5/800/800', alt: 'Street lights', span: 'square' },
      { type: 'image', src: 'https://picsum.photos/seed/city6/800/1200', alt: 'City street', span: 'tall' },
      { type: 'image', src: 'https://picsum.photos/seed/city7/1200/800', alt: 'Rainy night', span: 'wide' },
      { type: 'image', src: 'https://picsum.photos/seed/city8/800/800', alt: 'Neon sign', span: 'square' },
    ],
  },
  {
    title: 'Wedding — Gauravi & Harsh',
    year: '2023',
    location: 'Udaipur, India',
    description: 'Three days of rituals, light and quiet moments between a family reunited.',
    audioSrc: '/gwed/bayaan-sherazam-safar_kkXH4wn9.mp3',
    slideshow: true,
    media: [
      { type: 'image', src: '/gwed/5a8e7ecc-0de7-442a-b716-c1f5a0c3c342.JPG', alt: 'Wedding portrait', span: 'tall' },
      { type: 'image', src: '/gwed/74ef4953-08f6-433c-8c76-cf6d342cdab4.JPG', alt: 'Wedding ceremony', span: 'wide' },
      { type: 'image', src: '/gwed/IMG_1089.JPG', alt: 'Wedding decor', span: 'tall' },
      { type: 'image', src: '/gwed/IMG_1091.JPG', alt: 'Wedding rituals', span: 'wide' },
      { type: 'image', src: '/gwed/IMG_1094.JPG', alt: 'Wedding moments', span: 'square' },
      { type: 'image', src: '/gwed/IMG_9301.JPG', alt: 'Wedding celebration', span: 'square' },
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
  tall: 'md:row-span-2 md:aspect-[3/4] aspect-auto',
  wide: 'md:col-span-2 md:aspect-[16/10] aspect-auto',
  square: 'md:aspect-square aspect-auto',
}

export function Work() {
  const [lightbox, setLightbox] = useState<{ projectIndex: number; mediaIndex: number } | null>(null)
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

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
        <div className="space-y-16 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
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
              <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[14rem] md:auto-rows-[20rem] gap-3 md:gap-4">
                {project.media.slice(0, 3).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox({ projectIndex: index, mediaIndex: i })}
                    className={`relative overflow-hidden bg-gray-900 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 ${spanClass[item.span ?? 'square']}`}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.alt ?? project.title}
                        loading="lazy"
                        className="w-full h-full object-cover md:grayscale md:hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02] hover:!scale-105"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <video
                          src={item.src}
                          muted
                          loop
                          playsInline
                          autoPlay
                          controls
                          className="w-full h-full object-cover md:grayscale md:hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full bg-black/50 p-2">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                      </div>
                    </div>
                    )}
                  </button>
                ))}
              </div>

              {/* More button */}
              <div className="mt-6 text-center md:text-right">
                <button
                  onClick={() => setExpandedProject(index)}
                  className="inline-flex items-center gap-2 px-6 py-2 text-sm text-gray-400 border border-gray-700 rounded-full hover:text-white hover:border-white transition-colors"
                >
                  More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          media={projects[lightbox.projectIndex].media}
          index={lightbox.mediaIndex}
          onClose={() => setLightbox(null)}
          onIndexChange={(i) => setLightbox({ projectIndex: lightbox.projectIndex, mediaIndex: i })}
        />
      )}

      {expandedProject !== null && (
        <ProjectExpanded
          project={projects[expandedProject]}
          onClose={() => setExpandedProject(null)}
        />
      )}
    </section>
  )
}