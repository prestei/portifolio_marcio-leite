import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { asset } from '../../utils/asset';

const IMPACT_VIDEO_URL =
  'https://www.youtube.com/watch?v=dGORY0W6aD8&list=RDdGORY0W6aD8&start_radio=1';

export function VideoSection() {
  return (
    <section id="video" className="section-pad bg-primary relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Vídeo de Impacto" subtitle="Experiência do Show" />
        <p className="text-center text-support-muted max-w-2xl mx-auto mb-10 -mt-6">
          Multidão, bastidores, luz e coro — a energia de contratar Márcio Leite.
        </p>

        <motion.a
          href={IMPACT_VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative block aspect-video overflow-hidden border-4 border-secondary/40 transition-[transform,box-shadow] duration-[250ms] hover:scale-[1.01] hover:shadow-[0_16px_48px_rgba(26,20,20,0.2)]"
          aria-label="Assistir vídeo de impacto no YouTube"
        >
          <img
            src={asset('images/hero/cartaz.jpg')}
            alt="Gravação Audiovisual Hangar 5.0"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-night/55 group-hover:bg-night/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
            <span className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(200,16,46,0.55)] group-hover:scale-110 transition-transform">
              <FaPlay className="text-3xl text-white" />
            </span>
            <span className="font-display text-2xl md:text-3xl tracking-[0.15em]">ASSISTIR NO YOUTUBE</span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
