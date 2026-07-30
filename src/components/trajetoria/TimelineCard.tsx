import { motion, useReducedMotion } from 'framer-motion';
import { Mic2 } from 'lucide-react';
import type { TrajetoriaItem } from '../../data/site';
import { hasTrajetoriaImage } from '../../data/site';
import { asset } from '../../utils/asset';

interface TimelineCardProps {
  item: TrajetoriaItem;
  index: number;
  active: boolean;
}

export function TimelineCard({ item, index, active }: TimelineCardProps) {
  const body = item.infoText?.trim() || item.desc;
  const showImage = hasTrajetoriaImage(item);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.28), ease: [0.22, 1, 0.36, 1] }}
      className={`
        timeline-card
        rounded-2xl overflow-hidden
        border border-[var(--border-gold)]
        bg-surface
        shadow-[var(--shadow-soft)]
      `}
      aria-current={active ? 'step' : undefined}
    >
      {showImage ? (
        <div className="relative overflow-hidden">
          <img
            src={asset(item.image)}
            alt={`${item.title} — ${item.year}`}
            className="timeline-image"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/70 to-transparent pointer-events-none" />
          <p className="absolute bottom-3 left-3 font-display text-accent-light text-xl tracking-wide drop-shadow">
            {item.year}
          </p>
        </div>
      ) : (
        <div
          className="
            relative aspect-[4/5] flex flex-col items-center justify-center text-center
            px-5 py-6
            bg-gradient-to-br from-primary-light via-surface to-[#1a1612]
          "
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(212,176,106,0.16),transparent_55%)]"
            aria-hidden="true"
          />
          <span
            className="
              relative z-10 mb-4
              flex h-12 w-12 items-center justify-center rounded-full
              border border-[var(--border-gold)] bg-accent/10 text-accent
            "
            aria-hidden="true"
          >
            <Mic2 className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <p className="relative z-10 font-display text-accent text-2xl tracking-wide">{item.year}</p>
          {item.highlight ? (
            <p className="relative z-10 mt-4 font-script text-accent-light text-xl leading-snug px-1">
              &ldquo;{item.highlight}&rdquo;
            </p>
          ) : null}
        </div>
      )}

      <div className="p-4 sm:p-5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">
          {showImage ? 'Marco' : 'Capítulo'}
        </p>
        <h3 className="font-display text-xl sm:text-2xl tracking-wide text-support leading-tight">
          {item.title}
        </h3>
        <p className="mt-2.5 text-sm text-support-muted leading-relaxed line-clamp-4">
          {showImage ? item.desc : body}
        </p>
      </div>
    </motion.article>
  );
}
