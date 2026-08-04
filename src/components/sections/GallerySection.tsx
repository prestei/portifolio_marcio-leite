import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { GALLERY } from '../../data/site';
import { asset } from '../../utils/asset';

type GalleryPhoto = (typeof GALLERY)[number];

/** Original gallery had 5 photos; keep the same px/s when the set grows. */
const GALLERY_BASE_COUNT = 5;

function GalleryItems({
  photos,
  onSelect,
  inert,
  idPrefix,
}: {
  photos: readonly GalleryPhoto[];
  onSelect?: (index: number) => void;
  inert?: boolean;
  idPrefix: string;
}) {
  return (
    <div className="gallery-set" aria-hidden={inert || undefined}>
      {photos.map((photo, index) => (
        <button
          key={`${idPrefix}-${photo.src}-${index}`}
          type="button"
          tabIndex={inert ? -1 : 0}
          className="gallery-item"
          onClick={() => onSelect?.(index)}
          aria-label={inert ? undefined : `Ampliar foto: ${photo.title} (${photo.cat})`}
        >
          <img
            src={asset(photo.src)}
            alt={
              inert ? '' : `${photo.title} — ${photo.cat}. Márcio Leite em apresentação.`
            }
            draggable={false}
            loading={index < 3 && !inert ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className="gallery-item__meta">
            <span className="gallery-item__cat">{photo.cat}</span>
            <span className="gallery-item__title">{photo.title}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * Continuous horizontal gallery (infinite marquee).
 * Movement via transform only — no GSAP (not in project); CSS for visuals.
 */
export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTsRef = useRef(0);
  const rafRef = useRef(0);
  const resumeTimerRef = useRef(0);

  const measure = useCallback(() => {
    const setEl = trackRef.current?.querySelector('.gallery-set');
    if (setEl instanceof HTMLElement) {
      setWidthRef.current = setEl.offsetWidth;
    }
  }, []);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const w = setWidthRef.current;
    if (w > 0) {
      // Keep offset in [0, w) for a seamless wrap.
      offsetRef.current = ((offsetRef.current % w) + w) % w;
    }
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    measure();
    applyTransform();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const ro = new ResizeObserver(() => {
      measure();
      applyTransform();
    });
    ro.observe(viewport);
    const firstSet = trackRef.current?.querySelector('.gallery-set');
    if (firstSet instanceof HTMLElement) ro.observe(firstSet);

    return () => ro.disconnect();
  }, [measure, applyTransform]);

  useEffect(() => {
    if (reducedMotion) {
      offsetRef.current = 0;
      applyTransform();
      return;
    }

    const baseCycleMs = window.matchMedia('(max-width: 640px)').matches ? 55_000 : 42_000;
    const cycleMs = baseCycleMs * (GALLERY.length / GALLERY_BASE_COUNT);

    const tick = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min(64, ts - lastTsRef.current);
      lastTsRef.current = ts;

      const viewport = viewportRef.current;
      const hovered = Boolean(viewport?.matches(':hover'));
      const hold = pausedRef.current || draggingRef.current || hovered;
      if (viewport) viewport.classList.toggle('is-paused', hold);

      const w = setWidthRef.current;
      if (w > 0 && !hold) {
        const speed = w / cycleMs; // px per ms → full set in cycleMs
        offsetRef.current += speed * dt;
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = 0;
    };
  }, [reducedMotion, applyTransform]);

  const clearResume = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = 0;
    }
  };

  const pause = () => {
    clearResume();
    pausedRef.current = true;
    viewportRef.current?.classList.add('is-paused');
  };

  const scheduleResume = () => {
    clearResume();
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      viewportRef.current?.classList.remove('is-paused');
      resumeTimerRef.current = 0;
    }, 850);
  };

  useEffect(() => () => clearResume(), []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    pause();
    draggingRef.current = true;
    dragMovedRef.current = false;
    lastXRef.current = e.clientX;
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    if (Math.abs(dx) > 2) dragMovedRef.current = true;
    // Drag left → content moves left (same direction as autoplay).
    offsetRef.current -= dx;
    applyTransform();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      viewportRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    scheduleResume();
  };

  const onItemSelect = (index: number) => {
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    setActive(index);
  };

  return (
    <section id="galeria" className="section-pad bg-primary-light overflow-x-clip !px-0">
      <div className="gallery-section-inner">
        <div className="gallery-section-title">
          <SectionTitle title="Galeria" subtitle="Shows · Público · Bastidores" />
        </div>

        <div
          ref={viewportRef}
          className={`gallery-viewport${reducedMotion ? ' is-static' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="region"
          aria-label="Galeria de shows e bastidores de Márcio Leite"
        >
          <div ref={trackRef} className="gallery-track">
            <GalleryItems photos={GALLERY} onSelect={onItemSelect} idPrefix="a" />
            {/* Visual duplicate for seamless loop — identical URLs reuse browser cache */}
            {!reducedMotion ? (
              <GalleryItems photos={GALLERY} inert idPrefix="b" />
            ) : null}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY[active].title}
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-white text-2xl hover:text-secondary min-h-11 min-w-11 flex items-center justify-center"
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
              alt={`${GALLERY[active].title} — ${GALLERY[active].cat}. Márcio Leite em apresentação.`}
              className="max-h-[88vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-8 left-0 right-0 text-center text-white/70 px-4">
              {GALLERY[active].title}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
