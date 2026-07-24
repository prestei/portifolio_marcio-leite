import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { RECOGNITIONS, STATS } from '../../data/site';

function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    const from = value > 100 ? value - 20 : 0;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="count-glow font-display text-5xl md:text-6xl text-accent tracking-wide">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function HighlightsSection() {
  return (
    <section id="destaques" className="relative section-pad bg-primary-light">
      <div className="absolute top-0 left-0 right-0 text-primary-light -translate-y-[99%] leading-none pointer-events-none">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-10 md:h-14 block">
          <path className="fill-current" d="M0,6V0h1000v100L0,6z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Destaques" subtitle="Métricas & Conquistas" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-primary border border-white/5 p-6 md:p-8 text-center hover:border-secondary/40 transition-colors"
            >
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="mt-3 text-sm text-support-muted leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-4">
          {RECOGNITIONS.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-start gap-4 bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/30 p-5"
            >
              <span className="font-display text-3xl text-accent leading-none">★</span>
              <p className="text-support/90 text-sm md:text-base leading-relaxed pt-1">{item}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-support-muted text-sm md:text-base max-w-3xl mx-auto">
          Palco dos maiores eventos: <span className="text-accent">Micareta de Feira</span>, São João de Santo Estevão,
          São Pedro de Humildes e Ipecaetá.
        </p>
      </div>
    </section>
  );
}
