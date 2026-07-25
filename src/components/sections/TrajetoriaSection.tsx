import { useRef } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { TRAJETORIA, hasTrajetoriaImage } from '../../data/site';
import { TrajetoriaTimeline } from '../trajetoria/TrajetoriaTimeline';
import { TrajetoriaImage } from '../trajetoria/TrajetoriaImage';
import { TrajetoriaInfoPanel } from '../trajetoria/TrajetoriaInfoPanel';
import { useStickyTimeline } from '../../hooks/useStickyTimeline';
import { asset } from '../../utils/asset';

/** Viewport-heights of scroll runway per marco (desktop/tablet sticky). */
const VH_PER_STEP = 85;

export function TrajetoriaSection() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const { activeIndex, progress } = useStickyTimeline(runwayRef, TRAJETORIA.length);

  return (
    <section id="trajetoria" className="bg-primary relative">
      <div
        className="pointer-events-none absolute -top-32 right-0 w-[28rem] h-[28rem] rounded-full bg-secondary/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[22rem] h-[22rem] rounded-full bg-accent/8 blur-3xl"
        aria-hidden="true"
      />

      {/* ── Desktop / Tablet: sticky scroll storytelling ── */}
      <div
        ref={runwayRef}
        className="hidden md:block relative"
        style={{ height: `${TRAJETORIA.length * VH_PER_STEP}vh` }}
      >
        <div className="sticky top-0 h-svh max-h-svh overflow-hidden flex flex-col">
          <div className="max-w-[90rem] mx-auto w-full px-4 md:px-8 pt-16 lg:pt-20 pb-2 shrink-0 relative z-10">
            <SectionTitle title="Trajetória" subtitle="Linha do Tempo" compact />
            <p className="text-center text-support-muted max-w-2xl mx-auto -mt-4 mb-1 text-sm md:text-base">
              Role para percorrer dezoito anos de estrada — da feira livre da Chapada aos palcos da Micareta.
            </p>
          </div>

          <div className="flex-1 min-h-0 max-w-[90rem] mx-auto w-full px-4 md:px-8 pb-5 lg:pb-8 relative z-10">
            {/* Tablet: timeline above image. Desktop: side-by-side. */}
            <div className="flex flex-col lg:grid lg:grid-cols-[minmax(12rem,0.55fr)_minmax(0,1.8fr)] gap-4 lg:gap-10 xl:gap-12 h-full min-h-0">
              <div className="shrink-0 lg:min-h-0 lg:h-full lg:shrink max-h-[28%] lg:max-h-none overflow-hidden">
                <TrajetoriaTimeline items={TRAJETORIA} activeIndex={activeIndex} progress={progress} />
              </div>
              <div className="flex-1 min-h-0 lg:h-full">
                <TrajetoriaImage items={TRAJETORIA} activeIndex={activeIndex} fillViewport />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: natural scroll, one marco at a time ── */}
      <div className="md:hidden section-pad relative z-10">
        <SectionTitle title="Trajetória" subtitle="Linha do Tempo" />
        <p className="text-center text-support-muted max-w-2xl mx-auto mb-10 -mt-6 text-sm">
          Dezoito anos de estrada — da feira livre da Chapada aos palcos da Micareta de Feira de Santana.
        </p>

        <ol className="space-y-14">
          {TRAJETORIA.map((item, i) => (
            <li key={item.year} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(166,124,0,0.45)]" />
                <span className="font-display text-accent text-2xl tracking-wide">{item.year}</span>
              </div>
              <h3 className="font-semibold text-support text-lg mb-3">{item.title}</h3>
              <div className="relative overflow-hidden rounded-2xl bg-[#0a0808] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-accent/15 aspect-[3/4] max-h-[78vh]">
                {hasTrajetoriaImage(item) ? (
                  <>
                    <img
                      src={asset(item.image)}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="rounded-xl border border-accent/35 bg-black/45 backdrop-blur-xl px-4 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                        <p className="text-sm text-white/75 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <TrajetoriaInfoPanel item={item} />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
