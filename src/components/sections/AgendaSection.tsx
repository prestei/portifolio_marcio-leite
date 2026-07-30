import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { CalendarDays } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { SITE } from '../../data/site';
import { asset } from '../../utils/asset';
import {
  fetchUpcomingShows,
  isGoogleCalendarConfigured,
  type CalendarShow,
} from '../../services/googleCalendar';

export function AgendaSection() {
  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Quero saber sobre a agenda e contratar o show.')}`;
  const [shows, setShows] = useState<CalendarShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isGoogleCalendarConfigured()) {
        if (!cancelled) {
          setShows([]);
          setLoading(false);
        }
        return;
      }

      try {
        const events = await fetchUpcomingShows();
        if (!cancelled) {
          setShows(events);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setShows([]);
          setError('Não foi possível carregar a agenda no momento.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="agenda" className="section-pad bg-primary relative">
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-fixed pointer-events-none"
        style={{ backgroundImage: `url('${asset('images/gallery/show-01.jpg')}')` }}
      />
      <div className="absolute inset-0 bg-primary/85" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-3"
        >
          <span
            className="
              inline-flex items-center justify-center
              w-11 h-11 rounded-full
              border border-[var(--border-gold)] bg-surface
              text-accent shadow-[var(--shadow-soft)]
            "
            aria-hidden="true"
          >
            <CalendarDays className="w-5 h-5" strokeWidth={1.6} />
          </span>
        </motion.div>
        <SectionTitle title="Próximos Shows" subtitle="Agenda" />

        {loading && <p className="text-center text-support-muted py-10">Carregando agenda…</p>}

        {!loading && error && <p className="text-center text-support-muted py-6">{error}</p>}

        {!loading && !error && shows.length === 0 && (
          <p className="text-center text-support-muted text-lg py-10 max-w-xl mx-auto">
            Novas apresentações serão divulgadas em breve.
          </p>
        )}

        {!loading && shows.length > 0 && (
          <div className="space-y-4">
            {shows.map((show, i) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 sm:grid-cols-[110px_1fr] border border-[var(--border-gold)] overflow-hidden card-lift shadow-[var(--shadow-soft)]"
              >
                <div className="bg-accent text-white flex flex-col items-center justify-center py-6 sm:py-8 px-4 text-center">
                  <span className="font-display text-4xl md:text-5xl leading-none">{show.day}</span>
                  <span className="font-display text-xl tracking-wider mt-1">{show.month}</span>
                </div>
                <div className="bg-surface/95 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl tracking-wide">{show.title}</h3>
                    <p className="text-accent text-sm font-bold tracking-wider uppercase mt-2">{show.city}</p>
                    <p className="flex items-center gap-2 text-support-muted mt-2 text-sm">
                      <FaMapMarkerAlt className="text-accent shrink-0" /> {show.place}
                    </p>
                    <p className="flex items-center gap-2 text-support-muted mt-1.5 text-sm">
                      <FaClock className="text-accent shrink-0" /> {show.time}
                    </p>
                  </div>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary !py-3 whitespace-nowrap">
                    Solicitar data
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <p className="text-center text-support-muted text-sm mt-10 max-w-xl mx-auto">
          A agenda é atualizada automaticamente. Para contratações, fale direto pelo WhatsApp.
        </p>
      </div>
    </section>
  );
}
