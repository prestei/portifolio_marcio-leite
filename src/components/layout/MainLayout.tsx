import { useEffect, useState } from 'react';
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

  return (
    <div id="topo" className="min-h-screen flex flex-col bg-primary text-support">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || open ? 'bg-primary/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <a href="#topo" className="flex flex-col leading-none">
            <span className="font-script text-accent text-xl md:text-2xl">{SITE.tagline}</span>
            <span className="font-display text-2xl md:text-3xl tracking-[0.08em]">{SITE.name.toUpperCase()}</span>
          </a>

          <div className="hidden lg:flex items-center gap-3">
            <a href={SITE.socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href={SITE.socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={SITE.socials.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 !text-xs">
              Contratar Show
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 uppercase tracking-[0.2em] text-sm font-bold"
              aria-label="Menu"
            >
              <span className="hidden md:inline">Menu</span>
              {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu like Adelmario burger */}
      <div
        className={`fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-5 md:gap-7 px-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl md:text-6xl tracking-[0.12em] hover:text-secondary transition-colors"
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

      <footer className="bg-primary-light border-t border-white/5 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-script text-accent text-2xl mb-1">{SITE.tagline}</p>
            <p className="font-display text-3xl tracking-wider mb-4">{SITE.name.toUpperCase()}</p>
            <p className="text-support-muted text-sm leading-relaxed">{SITE.base}</p>
            <p className="text-support-dark text-xs mt-3">Marca registrada · INPI</p>
          </div>
          <div>
            <h4 className="font-display text-xl tracking-wider mb-4 text-accent">Navegação</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-support-muted">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-secondary transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-xl tracking-wider mb-4 text-accent">Comercial</h4>
            <p className="text-sm text-support-muted mb-1">{SITE.phones[0]}</p>
            <p className="text-sm text-support-muted mb-3 break-all">{SITE.emails[0]}</p>
            <p className="text-xs text-support-dark">{SITE.address}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-support-dark">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <p>{SITE.company}</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
