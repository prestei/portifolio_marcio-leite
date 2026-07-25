import { useEffect, useState, type RefObject } from 'react';

const STICKY_MQ = '(min-width: 768px)';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Maps scroll through a tall runway into timeline progress (0–1) and discrete index.
 * Sticky panel stays pinned; page scroll only advances past the section after the last marco.
 */
export function useStickyTimeline(
  runwayRef: RefObject<HTMLElement | null>,
  itemCount: number,
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(STICKY_MQ);
    const syncMq = () => setEnabled(mq.matches);
    syncMq();
    mq.addEventListener('change', syncMq);
    return () => mq.removeEventListener('change', syncMq);
  }, []);

  useEffect(() => {
    if (!enabled || itemCount <= 0) {
      setActiveIndex(0);
      setProgress(0);
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const el = runwayRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        setActiveIndex(0);
        return;
      }

      const scrolled = clamp(-rect.top, 0, scrollable);
      const p = scrolled / scrollable;
      setProgress(p);

      const next = Math.min(itemCount - 1, Math.floor(p * itemCount + 1e-6));
      setActiveIndex(next);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled, itemCount, runwayRef]);

  return { activeIndex, progress, stickyEnabled: enabled };
}
