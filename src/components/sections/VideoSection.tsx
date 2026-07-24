import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { asset } from '../../utils/asset';

export function VideoSection() {
  return (
    <section id="video" className="section-pad bg-primary relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Vídeo de Impacto" subtitle="Experiência do Show" />
        <p className="text-center text-support-muted max-w-2xl mx-auto mb-10 -mt-6">
          Multidão, bastidores, luz e coro — a energia de contratar Márcio Leite.
        </p>

        <motion.a
          href="https://www.youtube.com/@marcioleiteofficial"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative block aspect-video overflow-hidden border-4 border-secondary/40"
        >
          <img
            src={asset('images/hero/cartaz.jpg')}
            alt="Gravação Audiovisual Hangar 5.0"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/35 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(204,44,47,0.6)] group-hover:scale-110 transition-transform">
              <FaPlay className="text-3xl text-white" />
            </span>
            <span className="font-display text-2xl md:text-3xl tracking-[0.15em]">ASSISTIR NO YOUTUBE</span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
