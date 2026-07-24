import { motion } from 'framer-motion';
import { FaPlay, FaYoutube, FaInstagram, FaFacebookF, FaMusic } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { ALBUMS, PLATFORMS } from '../../data/site';
import { asset } from '../../utils/asset';

const ICONS = {
  youtube: FaYoutube,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  music: FaMusic,
} as const;

export function MusicSection() {
  return (
    <section id="discografia" className="section-pad bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

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
              className="group relative aspect-[4/5] overflow-hidden bg-primary-light border border-white/5"
            >
              <img
                src={asset(album.image)}
                alt={album.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(204,44,47,0.5)]">
                  <FaPlay className="text-xl" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{album.year}</span>
                <h3 className="font-display text-2xl tracking-wide mt-1 leading-tight">{album.title}</h3>
                <p className="text-sm text-support-muted mt-2 leading-relaxed">{album.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <a
                    href="https://www.youtube.com/@marcioleiteofficial"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] tracking-wider uppercase px-3 py-1.5 bg-white/10 hover:bg-secondary transition-colors"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.suamusica.com.br/marcioleiteoficials"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] tracking-wider uppercase px-3 py-1.5 bg-white/10 hover:bg-accent hover:text-primary transition-colors"
                  >
                    Sua Música
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Platforms block — Adelmario "ESCOLHA UMA PLATAFORMA" */}
        <div className="border-t border-white/10 pt-14 text-center">
          <h3 className="font-display text-3xl md:text-5xl tracking-[0.08em] mb-3">
            ESCOLHA UMA <span className="text-secondary">PLATAFORMA DIGITAL</span>
          </h3>
          <p className="text-support-muted mb-10">Ouça e acompanhe Márcio Leite nas redes oficiais</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {PLATFORMS.map((p, i) => {
              const Icon = ICONS[p.icon as keyof typeof ICONS] ?? FaMusic;
              return (
                <motion.a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 px-6 py-4 bg-primary-light border border-white/10 hover:border-secondary hover:bg-secondary/10 transition-all min-w-[160px] justify-center"
                >
                  <Icon className="text-2xl text-accent" />
                  <span className="font-bold text-sm tracking-wide">{p.name}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
