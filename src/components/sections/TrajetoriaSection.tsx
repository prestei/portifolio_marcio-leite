import { SectionTitle } from '../ui/SectionTitle';
import { TRAJETORIA } from '../../data/site';
import { HorizontalTimeline } from '../trajetoria/HorizontalTimeline';

export function TrajetoriaSection() {
  return (
    <section id="trajetoria" className="bg-primary relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 right-0 w-[28rem] h-[28rem] rounded-full bg-accent/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[22rem] h-[22rem] rounded-full bg-accent/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="section-trajetoria-intro px-4 md:px-6 xl:px-10 pb-16 md:pb-24 relative z-10">
        <div className="max-w-[96rem] mx-auto">
          <SectionTitle title="Trajetória" subtitle="Linha do Tempo" />
          <p className="text-center text-support-muted max-w-2xl mx-auto -mt-6 mb-10 md:mb-12 text-sm md:text-base">
            Deslize para percorrer dezoito anos de estrada — da feira livre da Chapada aos palcos da Micareta.
          </p>

          <HorizontalTimeline items={TRAJETORIA} />
        </div>
      </div>
    </section>
  );
}
