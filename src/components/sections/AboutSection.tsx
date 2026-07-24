import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { asset } from '../../utils/asset';

export function AboutSection() {
  return (
    <section id="sobre" className="relative section-pad bg-primary overflow-hidden">
      <div className="absolute -right-32 top-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Sobre o Artista" subtitle="Biografia" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden border-4 border-accent/40">
              <img
                src={asset('images/about/retrato.jpg')}
                alt="Márcio Leite"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 font-script text-accent text-4xl md:text-5xl drop-shadow-lg">
                Márcio Leite
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-secondary/30 -z-10 translate-x-3 translate-y-3" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-3xl md:text-4xl tracking-wide text-support leading-tight">
              A marca da paixão e do{' '}
              <span className="text-secondary">arrocha romântico</span>
            </h3>

            <p className="text-support-muted text-base md:text-lg leading-relaxed">
              O cantor Márcio Leite iniciou sua trajetória musical em 2007. Passou por diversas formações até consolidar
              sua carreira solo como a marca da paixão e do arrocha romântico.
            </p>
            <p className="text-support-muted text-base md:text-lg leading-relaxed">
              Conhecido pela sua garra e proximidade com o público — desde o tempo em que vendia seus próprios CDs em
              festivais e feiras livres na Chapada Diamantina até comandar multidões em praças públicas e micaretas —,
              Márcio traz no repertório uma conexão verdadeira que emociona e faz dançar.
            </p>

            <blockquote className="border-l-4 border-accent pl-5 py-2 my-8">
              <p className="font-script text-2xl md:text-3xl text-accent leading-snug">
                “À medida que vamos evoluindo artisticamente e nos conectando com o público, a paixão pela música me
                impulsiona a continuar tocando no coração das pessoas e fazendo história.”
              </p>
              <cite className="block mt-3 text-sm text-support-dark not-italic tracking-wider uppercase">
                — Márcio Leite
              </cite>
            </blockquote>

            <div className="flex flex-wrap gap-3 pt-2">
              {['Arrocha', 'Forró', 'Romântico', 'Voz Cigana', 'Bahia'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 border border-white/15 text-xs tracking-[0.2em] uppercase text-support-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
