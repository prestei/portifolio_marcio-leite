import { AnimatePresence, motion } from 'framer-motion';
import type { TrajetoriaItem } from '../../data/site';
import { hasTrajetoriaImage } from '../../data/site';
import { asset } from '../../utils/asset';
import { TrajetoriaInfoPanel } from './TrajetoriaInfoPanel';

interface TrajetoriaImageProps {
  items: TrajetoriaItem[];
  activeIndex: number;
  /** Fill available sticky viewport height. */
  fillViewport?: boolean;
}

const SWAP = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

export function TrajetoriaImage({ items, activeIndex, fillViewport = false }: TrajetoriaImageProps) {
  const active = items[activeIndex] ?? items[0];
  const showImage = hasTrajetoriaImage(active);

  return (
    <div
      className={`
        relative w-full
        ${fillViewport ? 'h-full min-h-0' : 'h-full min-h-[22rem] sm:min-h-[28rem] lg:min-h-[34rem] xl:min-h-[38rem]'}
      `}
    >
      <div
        className="
          absolute inset-0 overflow-hidden rounded-2xl
          bg-[#0a0808]
          shadow-[0_24px_60px_rgba(0,0,0,0.55)]
          ring-1 ring-accent/15
        "
      >
        {items.map((item, i) => {
          if (!hasTrajetoriaImage(item)) return null;
          const isActive = showImage && i === activeIndex;
          return (
            <motion.img
              key={item.image}
              src={asset(item.image)}
              alt=""
              aria-hidden={!isActive}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.04 : 1,
              }}
              transition={SWAP}
              className="absolute inset-0 w-full h-full pointer-events-none object-cover object-center"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          );
        })}

        <AnimatePresence mode="wait">
          {!showImage ? (
            <motion.div
              key={`info-${active.year}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={SWAP}
            >
              <TrajetoriaInfoPanel item={active} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {showImage ? (
          <>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"
              aria-hidden="true"
            />

            <div className="absolute bottom-0 left-0 p-4 sm:p-5 md:p-6 pointer-events-none max-w-[min(100%,22rem)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.year}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="
                    rounded-xl
                    border border-accent/35
                    bg-black/45 backdrop-blur-xl
                    px-4 py-3.5 sm:px-5 sm:py-4
                    shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]
                  "
                >
                  <p className="font-display text-accent-light text-xl sm:text-2xl tracking-wide">{active.year}</p>
                  <p className="font-bold text-white text-sm sm:text-base mt-1 leading-snug">{active.title}</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed line-clamp-4">
                    {active.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : null}
      </div>

      <span className="sr-only">
        {active.title} — {active.year}. {active.infoText ?? active.desc}
      </span>
    </div>
  );
}
