import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TrajetoriaItem } from '../../data/site';
import { TimelineCard } from './TimelineCard';

interface HorizontalTimelineProps {
  items: TrajetoriaItem[];
}

export function HorizontalTimeline({ items }: HorizontalTimelineProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const updateFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const pct = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setProgress(Math.min(1, Math.max(0, pct)));

    const scrollerRect = el.getBoundingClientRect();
    const centerX = scrollerRect.left + scrollerRect.width / 2;
    let best = 0;
    let bestDist = Infinity;

    itemRefs.current.forEach((node, i) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const mid = rect.left + rect.width / 2;
      const dist = Math.abs(mid - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    setActiveIndex(best);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateFromScroll();
    el.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);
    return () => {
      el.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, [updateFromScroll, items.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    const node = itemRefs.current[index];
    if (!el || !node) return;

    const scrollerRect = el.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const delta =
      nodeRect.left + nodeRect.width / 2 - (scrollerRect.left + scrollerRect.width / 2);
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goNext = () => scrollToIndex(Math.min(items.length - 1, activeIndex + 1));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToIndex(items.length - 1);
    }
  };

  const isFinePointer = () => window.matchMedia('(pointer: fine)').matches;

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || e.button !== 0 || !isFinePointer()) return;
    if ((e.target as HTMLElement).closest('button, a')) return;

    dragging.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
    el.style.scrollSnapType = 'none';
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !scrollerRef.current) return;
    const dx = e.clientX - dragStartX.current;
    scrollerRef.current.scrollLeft = dragScrollLeft.current - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !dragging.current) return;
    dragging.current = false;
    el.style.cursor = '';
    el.style.scrollSnapType = '';
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    updateFromScroll();
  };

  const active = items[activeIndex];
  const progressPct = `${progress * 100}%`;

  return (
    <div
      className="relative outline-none"
      tabIndex={0}
      role="region"
      aria-roledescription="linha do tempo horizontal"
      aria-label="Trajetória artística de Márcio Leite"
      onKeyDown={onKeyDown}
    >
      <div className="mb-6 md:mb-8 px-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-display text-sm text-accent tracking-wide shrink-0">{items[0]?.year}</span>
          <div
            className="relative flex-1 h-0.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-label="Progresso da trajetória"
          >
            <div className="timeline-progress-fill absolute inset-y-0 left-0" style={{ width: progressPct }} />
          </div>
          <span className="font-display text-sm text-accent tracking-wide shrink-0">
            {items[items.length - 1]?.year}
          </span>
        </div>
        <div className="hidden sm:flex items-center justify-between gap-1 px-1" aria-hidden="true">
          {items.map((item, i) => (
            <button
              key={`dot-${item.year}-${i}`}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`
                w-2 h-2 rounded-full transition-[transform,background-color] duration-[250ms]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
                ${i <= activeIndex ? 'bg-accent scale-110' : 'bg-[var(--bg-tertiary)]'}
              `}
              aria-label={`Ir para ${item.year}`}
              tabIndex={-1}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex <= 0}
          className="
            absolute left-0 top-1/2 z-20
            hidden md:inline-flex
            w-11 h-11 rounded-full
            items-center justify-center
            bg-surface border border-[var(--border-gold)] text-accent-light
            shadow-[var(--shadow-soft)]
            transition-[transform,background-color,opacity] duration-[250ms]
            hover:bg-accent/10 hover:scale-105
            disabled:opacity-35 disabled:pointer-events-none
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
            -translate-y-1/2 -translate-x-1 lg:-translate-x-3
          "
          aria-label="Ver fase anterior da trajetória"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex >= items.length - 1}
          className="
            absolute right-0 top-1/2 z-20
            hidden md:inline-flex
            w-11 h-11 rounded-full
            items-center justify-center
            bg-surface border border-[var(--border-gold)] text-accent-light
            shadow-[var(--shadow-soft)]
            transition-[transform,background-color,opacity] duration-[250ms]
            hover:bg-accent/10 hover:scale-105
            disabled:opacity-35 disabled:pointer-events-none
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
            -translate-y-1/2 translate-x-1 lg:translate-x-3
          "
          aria-label="Ver próxima fase da trajetória"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
        </button>

        <div
          ref={scrollerRef}
          className="timeline-scroll gap-5 md:gap-8 px-4 md:px-14 py-2 md:cursor-grab"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="relative flex items-stretch min-w-min">
            <div
              className="timeline-track pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0 hidden md:block"
              aria-hidden="true"
            />

            <ol className="relative z-10 flex gap-5 md:gap-8">
              {items.map((item, i) => {
                const above = i % 2 === 0;
                const isActive = i === activeIndex;

                return (
                  <li
                    key={`${item.year}-${item.title}`}
                    ref={(node) => {
                      itemRefs.current[i] = node;
                    }}
                    className={`timeline-card-shell timeline-item ${isActive ? 'is-active' : ''}`}
                  >
                    <div className="hidden md:flex flex-col h-full min-h-[34rem]">
                      {above ? (
                        <>
                          <div className="flex-1 flex flex-col justify-end pb-5">
                            <TimelineCard item={item} index={i} active={isActive} />
                          </div>
                          <div className="relative flex items-center justify-center h-8 shrink-0">
                            <span className="absolute left-1/2 top-0 bottom-1/2 w-px bg-accent/40 -translate-x-1/2" />
                            <button
                              type="button"
                              className="timeline-marker relative z-10"
                              onClick={() => scrollToIndex(i)}
                              aria-label={`Ir para ${item.year}: ${item.title}`}
                              aria-current={isActive ? 'step' : undefined}
                            />
                          </div>
                          <div className="flex-1 pt-5" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          <div className="flex-1 pb-5" aria-hidden="true" />
                          <div className="relative flex items-center justify-center h-8 shrink-0">
                            <span className="absolute left-1/2 top-1/2 bottom-0 w-px bg-accent/40 -translate-x-1/2" />
                            <button
                              type="button"
                              className="timeline-marker relative z-10"
                              onClick={() => scrollToIndex(i)}
                              aria-label={`Ir para ${item.year}: ${item.title}`}
                              aria-current={isActive ? 'step' : undefined}
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-start pt-5">
                            <TimelineCard item={item} index={i} active={isActive} />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="md:hidden flex flex-col gap-4">
                      <TimelineCard item={item} index={i} active={isActive} />
                      <div className="relative flex flex-col items-center gap-2">
                        <div className="timeline-track w-full absolute top-[5px] left-0 right-0" aria-hidden="true" />
                        <button
                          type="button"
                          className="timeline-marker relative z-10"
                          onClick={() => scrollToIndex(i)}
                          aria-label={`Ir para ${item.year}: ${item.title}`}
                          aria-current={isActive ? 'step' : undefined}
                        />
                        <span
                          className={`font-display text-sm tracking-wide ${
                            isActive ? 'text-accent-light' : 'text-support-dark'
                          }`}
                        >
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-1">
        <p className="text-sm text-support-muted text-center sm:text-left">
          <span className="font-display text-accent tracking-wide mr-2">{active?.year}</span>
          {active?.title}
        </p>
        <div className="flex items-center justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex <= 0}
            className="
              w-11 h-11 rounded-full inline-flex items-center justify-center
              bg-surface border border-[var(--border-gold)] text-accent-light
              disabled:opacity-35
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
            "
            aria-label="Ver fase anterior da trajetória"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
          </button>
          <span className="text-xs tabular-nums text-support-muted min-w-[3.5rem] text-center">
            {activeIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex >= items.length - 1}
            className="
              w-11 h-11 rounded-full inline-flex items-center justify-center
              bg-surface border border-[var(--border-gold)] text-accent-light
              disabled:opacity-35
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
            "
            aria-label="Ver próxima fase da trajetória"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
