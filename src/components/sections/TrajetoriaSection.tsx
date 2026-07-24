import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { TRAJETORIA } from '../../data/site';

export function TrajetoriaSection() {
  return (
    <section id="trajetoria" className="section-pad bg-primary-light relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle title="Trajetória" subtitle="Linha do Tempo" />
        <p className="text-center text-support-muted max-w-2xl mx-auto mb-14 -mt-6">
          Dezoito anos de estrada — da feira livre da Chapada aos palcos da Micareta de Feira de Santana.
        </p>

        {/* Horizontal scroll timeline on desktop-ish, stacked on mobile */}
        <div className="hidden md:block overflow-x-auto pb-4 -mx-4 px-4">
          <div className="relative min-w-[1100px] px-4">
            <div className="absolute top-8 left-0 right-0 h-[3px] bg-gradient-to-r from-secondary via-accent to-secondary" />
            <div className="flex gap-6">
              {TRAJETORIA.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="relative flex-1 min-w-[200px] pt-16"
                >
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-[3px] border-accent shadow-[0_0_16px_rgba(214,174,13,0.6)]" />
                  <div className="bg-primary border border-white/8 p-5 h-full hover:border-secondary/50 transition-colors">
                    <span className="font-display text-2xl text-accent">{item.year}</span>
                    <h4 className="font-bold text-support mt-2 mb-2 leading-snug">{item.title}</h4>
                    <p className="text-sm text-support-muted leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden relative pl-8 space-y-8">
          <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-secondary/40" />
          {TRAJETORIA.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <div className="absolute -left-[1.4rem] top-2 w-3.5 h-3.5 rounded-full bg-accent border-2 border-primary" />
              <div className="bg-primary border border-white/8 p-5">
                <span className="font-display text-xl text-accent">{item.year}</span>
                <h4 className="font-bold mt-1 mb-2">{item.title}</h4>
                <p className="text-sm text-support-muted leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
