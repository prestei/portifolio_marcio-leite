import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { CLIENTS, PRESS, TESTIMONIAL } from '../../data/site';

export function PressSection() {
  return (
    <section id="imprensa" className="section-pad bg-primary-light">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Prova Social" subtitle="Credibilidade & Mídia" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl tracking-wide mb-6 text-accent">O Que Falam</h3>
            <blockquote className="bg-white border-l-4 border-secondary p-6 md:p-8 mb-8 shadow-[0_8px_28px_rgba(26,20,20,0.05)]">
              <p className="text-lg md:text-xl leading-relaxed text-support/90 italic">“{TESTIMONIAL.quote}”</p>
              <footer className="mt-4 text-sm">
                <span className="text-accent font-bold">{TESTIMONIAL.author}</span>
                <span className="text-support-dark"> — {TESTIMONIAL.role}</span>
              </footer>
            </blockquote>

            <h4 className="text-xs tracking-[0.25em] uppercase text-support-dark mb-4">Já contrataram</h4>
            <ul className="space-y-3">
              {CLIENTS.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-support-muted leading-snug">
                  <span className="text-secondary mt-0.5">▸</span>
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-3xl tracking-wide mb-6 text-accent">Na Mídia</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {PRESS.map((p) => (
                <div
                  key={p.source}
                  className="bg-white border border-black/8 p-5 hover:border-accent/40 transition-colors shadow-[0_6px_20px_rgba(26,20,20,0.04)]"
                >
                  <p className="font-display text-xl tracking-wide text-support mb-2">{p.source}</p>
                  <p className="text-sm text-support-muted leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-support-dark">
              Rádios: Paraguassu FM (87.9), Bahia FM e Patos FM.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
