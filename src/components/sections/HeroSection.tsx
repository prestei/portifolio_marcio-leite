import { motion } from 'framer-motion';
import { FaBookOpen, FaHeadphones, FaWhatsapp } from 'react-icons/fa';
import { SITE } from '../../data/site';
import { asset } from '../../utils/asset';

export function HeroSection() {
  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Quero contratar o show do Márcio Leite.')}`;

  return (
    <section className="relative min-h-screen flex items-end md:items-center overflow-hidden bg-primary">
      {/* Full-bleed hero photo — Adelmario style */}
      <div className="absolute inset-0">
        <img
          src={asset('images/extracted/img-01.jpg')}
          alt="Márcio Leite no palco"
          className="w-full h-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,10,10,0.45)_100%)]" />
      </div>

      {/* Triangle divider bottom like Adelmario */}
      <div className="absolute bottom-0 left-0 right-0 text-primary-light z-20 leading-none">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-12 md:h-16 block">
          <path className="fill-current" d="M500.2,94.7L0,0v100h1000V0L500.2,94.7z" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-28 md:pb-32 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-script text-accent text-3xl md:text-5xl mb-2"
        >
          {SITE.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-[0.04em] max-w-4xl"
        >
          MÁRCIO
          <br />
          <span className="text-secondary">LEITE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-6 max-w-xl text-support-muted text-base md:text-lg leading-relaxed"
        >
          {SITE.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4"
        >
          <a href="#discografia" className="btn-primary">
            <FaHeadphones /> Ouvir agora
          </a>
          <a href="#sobre" className="btn-outline">
            <FaBookOpen /> Conhecer história
          </a>
          <a href={wa} target="_blank" rel="noreferrer" className="btn-primary !bg-accent !text-primary hover:!bg-accent-light shadow-[0_8px_24px_rgba(214,174,13,0.35)]">
            <FaWhatsapp /> Contratar Show
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs tracking-[0.3em] uppercase text-support-dark"
        >
          {SITE.base}
        </motion.p>
      </div>

      <a
        href="#destaques"
        className="arrow-bounce absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-white text-2xl"
        aria-label="Rolar para baixo"
      >
        ↓
      </a>
    </section>
  );
}
