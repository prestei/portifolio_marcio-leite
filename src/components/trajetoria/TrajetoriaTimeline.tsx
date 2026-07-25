import { motion } from 'framer-motion';
import type { TrajetoriaItem } from '../../data/site';

interface TrajetoriaTimelineProps {
  items: TrajetoriaItem[];
  activeIndex: number;
  /** Continuous 0–1 progress through the sticky runway (desktop/tablet). */
  progress?: number;
}

export function TrajetoriaTimeline({ items, activeIndex, progress = 0 }: TrajetoriaTimelineProps) {
  /** Continuous travel along the line; item highlight stays discrete via activeIndex. */
  const markerPct = Math.min(100, Math.max(0, progress * 100));

  return (
    <div className="relative h-full flex flex-col justify-center pl-8 md:pl-10">
      <div
        className="absolute left-[11px] md:left-[13px] top-[6%] bottom-[6%] w-px bg-gradient-to-b from-secondary/30 via-accent/50 to-secondary/20"
        aria-hidden="true"
      />
      <div
        className="absolute left-[11px] md:left-[13px] top-[6%] w-px bg-gradient-to-b from-secondary via-accent to-accent/80 origin-top transition-[height] duration-300 ease-out"
        style={{ height: `calc(88% * ${markerPct / 100})` }}
        aria-hidden="true"
      />
      <div
        className="
          absolute left-[5px] md:left-[7px] z-10
          w-3.5 h-3.5 rounded-full bg-accent border-2 border-white
          shadow-[0_0_16px_rgba(166,124,0,0.55)]
          transition-[top] duration-300 ease-out
          -translate-y-1/2
        "
        style={{ top: `calc(6% + 88% * ${markerPct / 100})` }}
        aria-hidden="true"
      />

      <ol className="relative flex flex-col justify-between gap-0.5 py-[3%] h-full min-h-0 overflow-hidden">
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <motion.li
              key={item.year}
              animate={{
                opacity: isActive ? 1 : isPast ? 0.55 : 0.28,
                x: isActive ? 4 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-0"
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={`
                  absolute -left-[1.55rem] md:-left-[1.65rem] top-1/2 -translate-y-1/2
                  w-2.5 h-2.5 rounded-full border-2 border-primary-light transition-all duration-300
                  ${isActive ? 'opacity-0 scale-75' : isPast ? 'bg-accent/70 opacity-100' : 'bg-support-dark/35 opacity-80'}
                `}
                aria-hidden="true"
              />

              <div className="pr-2">
                <span
                  className={`
                    font-display tracking-wide block transition-colors duration-300 leading-none
                    ${isActive ? 'text-accent text-lg lg:text-2xl' : 'text-support-dark text-base lg:text-xl'}
                  `}
                >
                  {item.year}
                </span>
                <span
                  className={`
                    font-semibold leading-snug block mt-0.5 transition-colors duration-300 line-clamp-1
                    ${isActive ? 'text-support text-xs lg:text-base' : 'text-support-muted/80 text-[11px] lg:text-sm'}
                  `}
                >
                  {item.title}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
