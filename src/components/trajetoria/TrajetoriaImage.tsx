import { useEffect, useRef, useState } from 'react';
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

type FitMode = 'contain' | 'cover';

const SWAP = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

/**
 * Prefer contain (full image, no stretch).
 * Fall back to cover only when contain would leave the photo too small in the frame.
 */
function pickFit(imgW: number, imgH: number, boxW: number, boxH: number): FitMode {
  if (imgW <= 0 || imgH <= 0 || boxW <= 0 || boxH <= 0) return 'contain';
  const scale = Math.min(boxW / imgW, boxH / imgH);
  const shownArea = imgW * scale * (imgH * scale);
  const boxArea = boxW * boxH;
  if (shownArea / boxArea < 0.42) return 'cover';
  return 'contain';
}

export function TrajetoriaImage({ items, activeIndex, fillViewport = false }: TrajetoriaImageProps) {
  const active = items[activeIndex] ?? items[0];
  const showImage = hasTrajetoriaImage(active);
  const frameRef = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState<Record<string, FitMode>>({});

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const boxW = frame.clientWidth;
      const boxH = frame.clientHeight;
      if (boxW <= 0 || boxH <= 0) return;

      setFits((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const item of items) {
          if (!hasTrajetoriaImage(item)) continue;
          const img = frame.querySelector<HTMLImageElement>(`img[data-src="${item.image}"]`);
          if (!img?.naturalWidth) continue;
          const mode = pickFit(img.naturalWidth, img.naturalHeight, boxW, boxH);
          if (next[item.image] !== mode) {
            next[item.image] = mode;
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [items]);

  const onImgLoad = (imageKey: string, img: HTMLImageElement) => {
    const frame = frameRef.current;
    if (!frame) return;
    const mode = pickFit(img.naturalWidth, img.naturalHeight, frame.clientWidth, frame.clientHeight);
    setFits((prev) => (prev[imageKey] === mode ? prev : { ...prev, [imageKey]: mode }));
  };

  return (
    <div
      className={`
        relative w-full
        ${fillViewport ? 'h-full min-h-0' : 'h-full min-h-[22rem] sm:min-h-[28rem] lg:min-h-[34rem] xl:min-h-[38rem]'}
      `}
    >
      <div
        ref={frameRef}
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
          const fit = fits[item.image] ?? 'contain';
          return (
            <motion.img
              key={item.image}
              data-src={item.image}
              src={asset(item.image)}
              alt=""
              aria-hidden={!isActive}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.04 : 1,
              }}
              transition={SWAP}
              onLoad={(e) => onImgLoad(item.image, e.currentTarget)}
              className={`
                absolute inset-0 w-full h-full pointer-events-none
                object-center
                ${fit === 'cover' ? 'object-cover' : 'object-contain'}
              `}
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
