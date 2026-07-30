import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { TestimonialsCarousel } from '../ui/TestimonialsCarousel';
import { CLIENTS, PRESS } from '../../data/site';

export function PressSection() {
  return (
    <section id="imprensa" className="section-pad bg-primary-light">
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
        <SectionTitle title="Prova Social" subtitle="Credibilidade & Mídia" />

        {/* Depoimentos */}
        <div className="-mt-6 md:-mt-10">
          <TestimonialsCarousel />
        </div>

        {/* Já Contrataram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-xs font-bold tracking-[0.28em] uppercase text-accent mb-4">Autoridade</p>
          <h3 className="contractors-title font-display text-support uppercase">
            Quem confia no
            <br />
            <span className="text-accent">trabalho de Márcio Leite</span>
          </h3>
          <p className="text-support-muted max-w-xl mx-auto mt-5 mb-10 text-sm md:text-base">
            Prefeituras, micaretas e eventos que já abriram espaço para o arrocha romântico.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto text-left">
            {CLIENTS.map((c) => (
              <li
                key={c}
                className="
                  flex gap-3 items-start
                  bg-surface border border-[var(--border-gold)]
                  px-4 py-4 md:px-5
                  shadow-[var(--shadow-soft)]
                "
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                <span className="text-sm text-support-muted leading-snug">{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Rádios e Imprensa — centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="w-full max-w-[900px] mx-auto">
            <p className="text-xs font-bold tracking-[0.28em] uppercase text-accent mb-3">Reconhecimento</p>
            <h3 className="font-display text-3xl md:text-5xl tracking-[0.06em] text-support mb-4">
              Rádios e Imprensa
            </h3>
            <p className="text-support-muted text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Presença em veículos locais e regionais que acompanham a trajetória do artista pela Bahia.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {PRESS.map((p) => (
                <div
                  key={p.source}
                  className="bg-surface border border-[var(--border-gold)] p-5 hover:border-accent/45 transition-colors shadow-[var(--shadow-soft)]"
                >
                  <p className="font-display text-xl tracking-wide text-support mb-2">{p.source}</p>
                  <p className="text-sm text-support-muted leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-support-dark tracking-wide">
              Rádios: Paraguassu FM (87.9), Bahia FM e Patos FM.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
