import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { StreamingLink } from '../ui/StreamingLink';
import { ALBUMS, PLATFORMS } from '../../data/site';
import { asset } from '../../utils/asset';

export function MusicSection() {
  return (
    <section id="discografia" className="section-pad bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle title="Discografia" subtitle="O Catálogo Musical" />
        <p className="text-center text-support-muted max-w-2xl mx-auto mb-14 -mt-6">
          Do Vol. 01 ao Hangar 5.0 — uma coleção que atravessa mais de uma década de “A Voz Cigana”.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-20">
          {ALBUMS.map((album, i) => (
            <motion.article
              key={album.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative aspect-[4/5] overflow-hidden bg-surface border border-[var(--border-gold)] card-lift shadow-[var(--shadow-soft)]"
            >
              <img
                src={asset(album.image)}
                alt={album.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-16 h-16 rounded-full bg-accent flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(179,138,69,0.45)]">
                  <FaPlay className="text-xl text-white" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
                <span className="text-accent-light text-xs font-bold tracking-[0.2em] uppercase">{album.year}</span>
                <h3 className="font-display text-2xl tracking-wide mt-1 leading-tight">{album.title}</h3>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">{album.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <a
                    href="https://www.youtube.com/@marcioleiteofficial"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] tracking-wider uppercase px-3 py-1.5 bg-white/10 hover:bg-accent transition-colors"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.suamusica.com.br/marcioleiteoficials"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] tracking-wider uppercase px-3 py-1.5 bg-white/10 hover:bg-accent-light hover:text-night transition-colors"
                  >
                    Sua Música
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="border-t border-[var(--border-gold)] pt-14 text-center">
          <h3 className="font-display text-3xl md:text-5xl tracking-[0.08em] mb-3">
            ESCOLHA UMA <span className="text-accent">PLATAFORMA DIGITAL</span>
          </h3>
          <p className="text-support-muted mb-10">Ouça e acompanhe Márcio Leite nas redes oficiais</p>
          <div className="flex flex-wrap justify-center items-start gap-5 sm:gap-6 md:gap-8">
            {PLATFORMS.map((p) => (
              <StreamingLink key={p.name} name={p.name} href={p.href} icon={p.icon} labeled />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
