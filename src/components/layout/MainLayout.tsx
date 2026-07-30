import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { MusicPlayer } from '../MusicPlayer';
import { NAV_LINKS, SITE } from '../../data/site';

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id.replace(/^#/, '')))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: '-28% 0px -55% 0px', threshold: [0.08, 0.2, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out ${
          open ? 'translate-y-[7px] rotate-45' : ''
        }`}
      />
      <span
        className={`absolute left-0 top-[7px] h-[1.5px] w-full rounded-full bg-current transition-opacity duration-200 ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-0 top-[14px] h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out ${
          open ? '-translate-y-[7px] -rotate-45' : ''
        }`}
      />
    </span>
  );
}

export function MainLayout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Close the mobile drawer when the desktop nav (xl) becomes visible.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de contratar o show do Márcio Leite.')}`;
  const headerSolid = scrolled || open;

  return (
    <div id="topo" className="min-h-screen flex flex-col bg-primary text-support">
      <motion.header
        initial={reduceMotion ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,border-color,padding] duration-300 ${
          headerSolid
            ? 'bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] backdrop-blur-md border-b border-[var(--border-gold)] shadow-[var(--shadow-soft)] text-support'
            : 'bg-transparent border-b border-transparent text-white'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4 transition-[padding] duration-300 ${
            headerSolid ? 'py-3 md:py-3.5' : 'py-4 md:py-5'
          }`}
        >
          <a href="#topo" className="leading-none shrink-0" onClick={() => setOpen(false)}>
            <span className="font-display text-2xl md:text-[1.75rem] tracking-[0.08em]">
              {SITE.name.toUpperCase()}
            </span>
          </a>

          <nav className="hidden xl:flex items-center gap-6" aria-label="Principal">
            {NAV_LINKS.filter((l) => l.href !== '#topo').map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-active={isActive}
                  className={`nav-link text-[0.7rem] font-bold uppercase tracking-[0.18em] ${
                    isActive
                      ? 'text-accent-light'
                      : headerSolid
                        ? 'text-support-muted hover:text-support'
                        : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-2">
              {(
                [
                  { href: SITE.socials.facebook, label: 'Facebook', Icon: FaFacebookF },
                  { href: SITE.socials.instagram, label: 'Instagram', Icon: FaInstagram },
                  { href: SITE.socials.youtube, label: 'YouTube', Icon: FaYoutube },
                ] as const
              ).map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group w-9 h-9 rounded-full flex items-center justify-center transition-[transform,background-color,color] duration-[250ms] hover:bg-accent hover:text-white hover:scale-105 ${
                    headerSolid ? 'bg-support/5 text-support' : 'bg-white/10 text-white'
                  }`}
                  aria-label={label}
                >
                  <Icon className="social-icon text-sm" />
                </a>
              ))}
            </div>

            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 !text-xs"
            >
              Contratar Show
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`
                menu-toggle
                inline-flex xl:hidden items-center justify-center gap-2.5
                min-h-11 min-w-11 px-3 rounded-full
                uppercase tracking-[0.18em] text-xs font-bold
                transition-[background-color,transform,color] duration-[250ms]
                hover:scale-[1.02]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                ${headerSolid ? 'bg-support/5 hover:bg-support/10' : 'bg-white/10 hover:bg-white/15'}
              `}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls={menuId}
            >
              <span className="hidden md:inline">{open ? 'Fechar' : 'Menu'}</span>
              <HamburgerIcon open={open} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[55] bg-night/35 backdrop-blur-[2px]"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="menu-panel"
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              initial={reduceMotion ? { opacity: 0 } : { x: '100%', opacity: 0.85 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%', opacity: 0.85 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="
                fixed top-0 right-0 z-[60] h-dvh max-h-dvh
                w-[min(22rem,100vw)]
                bg-[color-mix(in_srgb,var(--surface)_96%,transparent)]
                backdrop-blur-xl
                border-l border-[var(--border-gold)]
                shadow-[var(--shadow-hover)]
                flex flex-col
                pt-[max(1rem,env(safe-area-inset-top))]
                pb-[max(1.25rem,env(safe-area-inset-bottom))]
              "
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-gold)]">
                <div>
                  <p className="font-script text-accent text-xl leading-none">{SITE.tagline}</p>
                  <p className="font-display text-xl tracking-[0.1em] text-support mt-1">
                    {SITE.name.toUpperCase()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="min-h-11 min-w-11 rounded-full bg-support/5 flex items-center justify-center text-support hover:bg-support/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Fechar menu"
                >
                  <HamburgerIcon open />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href || (link.href === '#topo' && !activeSection);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`
                        relative rounded-xl px-4 py-3.5
                        font-display text-2xl tracking-[0.1em]
                        transition-colors duration-[250ms]
                        ${
                          isActive
                            ? 'text-accent-light bg-accent/10'
                            : 'text-support hover:text-accent-light hover:bg-accent/5'
                        }
                      `}
                    >
                      {link.label.toUpperCase()}
                      {isActive ? (
                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-accent" />
                      ) : null}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="px-5 pt-2 pb-2 border-t border-[var(--border-gold)] space-y-4">
                <a href={wa} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="btn-primary w-full">
                  <FaWhatsapp /> Contratar Show
                </a>
                <div className="flex items-center justify-center gap-3 pb-1">
                  {(
                    [
                      { href: SITE.socials.facebook, label: 'Facebook', Icon: FaFacebookF },
                      { href: SITE.socials.instagram, label: 'Instagram', Icon: FaInstagram },
                      { href: SITE.socials.youtube, label: 'YouTube', Icon: FaYoutube },
                    ] as const
                  ).map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-support/5 text-support flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                      aria-label={label}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <main className="flex-grow">
        <Outlet />
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-night text-white border-t border-accent/20 pt-14 pb-8"
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
                <a key={l.href} href={l.href} className="hover:text-accent-light transition-colors">
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

      {/* Floating actions: player (top) → WhatsApp (bottom) */}
      <div
        className="
          floating-actions
          fixed z-[70]
          right-[max(1rem,env(safe-area-inset-right,0px))]
          bottom-[calc(max(1rem,env(safe-area-inset-bottom,0px)))]
          sm:right-6 sm:bottom-6
          flex flex-col items-center gap-2.5 sm:gap-3.5
          pointer-events-none
        "
      >
        <div className="pointer-events-auto">
          <MusicPlayer />
        </div>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="
            whatsapp-button pointer-events-auto
            min-w-12 min-h-12 w-12 h-12 sm:w-14 sm:h-14 rounded-full
            bg-[var(--whatsapp-green)] text-white
            flex items-center justify-center text-xl sm:text-2xl
            shadow-[0_8px_28px_rgba(37,211,102,0.38)]
            transition-[transform,box-shadow,background-color] duration-[250ms]
            hover:scale-[1.05] hover:bg-[var(--whatsapp-green-hover)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.48)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
          "
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
}
