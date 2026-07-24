import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { GALLERY } from '../../data/site';
import { asset } from '../../utils/asset';

export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galeria" className="section-pad bg-primary-light">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Galeria" subtitle="Shows · Público · Bastidores" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY.map((photo, index) => (
            <motion.button
              type="button"
              key={photo.src + index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActive(index)}
              className={`relative overflow-hidden group text-left ${
                index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`w-full ${index === 0 || index === 3 ? 'aspect-[16/10] md:aspect-auto md:h-full min-h-[220px]' : 'aspect-square'}`}>
                <img
                  src={asset(photo.src)}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-3 group-hover:translate-y-0">
                <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{photo.cat}</span>
                <p className="text-support font-medium">{photo.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-white text-2xl hover:text-secondary"
              aria-label="Fechar"
              onClick={() => setActive(null)}
            >
              <FaTimes />
            </button>
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={asset(GALLERY[active].src)}
              alt={GALLERY[active].title}
              className="max-h-[88vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-8 left-0 right-0 text-center text-support-muted">
              {GALLERY[active].title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
