import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { NAV_LINKS, SITE } from '../../data/site';

export function MainLayout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de contratar o show do Márcio Leite.')}`;
  const headerSolid = scrolled || open;

  return (
    <div id="topo" className="min-h-screen flex flex-col bg-primary text-support">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          headerSolid
            ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(26,20,20,0.08)] text-support'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <a href="#topo" className="leading-none">
            <span className="font-display text-2xl md:text-3xl tracking-[0.08em]">{SITE.name.toUpperCase()}</span>
          </a>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SITE.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className={`group w-10 h-10 rounded-full flex items-center justify-center transition-[transform,background-color] duration-[250ms] hover:bg-secondary hover:text-white hover:scale-110 ${
                headerSolid ? 'bg-black/5' : 'bg-white/10'
              }`}
              aria-label="Facebook"
            >
              <FaFacebookF className="social-icon" />
            </a>
            <a
              href={SITE.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className={`group w-10 h-10 rounded-full flex items-center justify-center transition-[transform,background-color] duration-[250ms] hover:bg-secondary hover:text-white hover:scale-110 ${
                headerSolid ? 'bg-black/5' : 'bg-white/10'
              }`}
              aria-label="Instagram"
            >
              <FaInstagram className="social-icon" />
            </a>
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className={`group w-10 h-10 rounded-full flex items-center justify-center transition-[transform,background-color] duration-[250ms] hover:bg-secondary hover:text-white hover:scale-110 ${
                headerSolid ? 'bg-black/5' : 'bg-white/10'
              }`}
              aria-label="YouTube"
            >
              <FaYoutube className="social-icon" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 !text-xs">
              Contratar Show
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 uppercase tracking-[0.2em] text-sm font-bold transition-transform duration-[250ms] hover:scale-[1.03]"
              aria-label="Menu"
            >
              <span className="hidden md:inline">Menu</span>
              {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-xl transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-5 md:gap-7 px-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl md:text-6xl tracking-[0.12em] text-support hover:text-secondary transition-colors"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
          <a href={wa} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="btn-primary mt-6">
            <FaWhatsapp /> Contratar Show
          </a>
        </nav>
      </div>

      <main className="flex-grow">
        <Outlet />
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-night text-white border-t border-white/5 pt-14 pb-8"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-script text-accent-light text-2xl mb-1">{SITE.tagline}</p>
            <p className="font-display text-3xl tracking-wider mb-4">{SITE.name.toUpperCase()}</p>
            <p className="text-white/65 text-sm leading-relaxed">{SITE.base}</p>
            <p className="text-white/40 text-xs mt-3">Marca registrada · INPI</p>
          </div>
          <div>
            <h4 className="font-display text-xl tracking-wider mb-4 text-accent-light">Navegação</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/65">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-secondary transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-xl tracking-wider mb-4 text-accent-light">Comercial</h4>
            <p className="text-sm text-white/65 mb-1">{SITE.phones[0]}</p>
            <p className="text-sm text-white/65 mb-3 break-all">{SITE.emails[0]}</p>
            <p className="text-xs text-white/40">{SITE.address}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
          </p>
          <p>{SITE.company}</p>
        </div>
      </motion.footer>

      {/* Above the centered music player */}
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="
          fixed right-5 sm:right-6 z-50
          bottom-[5.75rem] sm:bottom-24
          w-14 h-14 rounded-full bg-[#25D366] text-white
          flex items-center justify-center text-2xl
          shadow-[0_8px_30px_rgba(37,211,102,0.45)]
          transition-[transform,box-shadow] duration-[250ms]
          hover:scale-[1.08] hover:shadow-[0_12px_36px_rgba(37,211,102,0.55)]
        "
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
