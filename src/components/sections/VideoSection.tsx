import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { asset } from '../../utils/asset';

const IMPACT_VIDEO_ID = 'dGORY0W6aD8';
const IMPACT_VIDEO_URL = `https://www.youtube.com/watch?v=${IMPACT_VIDEO_ID}`;

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section id="video" className="section-pad bg-primary-light relative overflow-hidden">
      <div
        className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionTitle title="Audiovisual" subtitle="Experiência do Show" />
        <p className="font-script text-accent text-2xl md:text-3xl text-center -mt-4 mb-3">
          Mais do que um show, uma experiência para recordar.
        </p>
        <p className="text-center text-support-muted max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          Multidão, bastidores, luz e coro — a energia de contratar Márcio Leite.
        </p>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative mx-auto
            rounded-xl overflow-hidden
            border border-[var(--border-gold)]
            bg-surface
            shadow-[var(--shadow-soft)]
            ring-1 ring-accent/15
          "
        >
          <div className="relative aspect-video bg-night">
            {playing ? (
              <iframe
                title="Vídeo institucional — Márcio Leite"
                src={`https://www.youtube-nocookie.com/embed/${IMPACT_VIDEO_ID}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-inset"
                aria-label="Reproduzir vídeo institucional"
              >
                <img
                  src={asset('images/hero/cartaz.jpg')}
                  alt="Gravação Audiovisual Hangar 5.0"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/45 to-night/25" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white px-4">
                  <span
                    className="
                      w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 rounded-full
                      bg-accent text-white
                      flex items-center justify-center pl-1
                      shadow-[0_10px_36px_rgba(179,138,69,0.4)]
                      transition-transform duration-[250ms] group-hover:scale-105
                    "
                  >
                    <FaPlay className="text-2xl md:text-3xl" />
                  </span>
                  <span className="font-display text-xl md:text-2xl tracking-[0.18em] text-center">
                    ASSISTIR AGORA
                  </span>
                  <span className="text-xs tracking-[0.2em] uppercase text-white/60">YouTube · Hangar 5.0</span>
                </div>
              </button>
            )}
          </div>
        </motion.div>

        <p className="text-center mt-5">
          <a
            href={IMPACT_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-support-muted hover:text-accent-light underline-offset-4 hover:underline transition-colors"
          >
            Abrir no YouTube
          </a>
        </p>
      </div>
    </section>
  );
}
