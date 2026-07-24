import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarPlus } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { AGENDA, SITE } from '../../data/site';
import { asset } from '../../utils/asset';

export function AgendaSection() {
  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Quero saber sobre a agenda e contratar o show.')}`;

  return (
    <section id="agenda" className="section-pad bg-primary relative">
      {/* Subtle stage texture */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-fixed pointer-events-none"
        style={{ backgroundImage: `url('${asset('images/gallery/show-01.jpg')}')` }}
      />
      <div className="absolute inset-0 bg-primary/85" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center">
            <FaCalendarPlus className="text-accent" />
          </div>
        </div>
        <SectionTitle title="Próximos Shows" subtitle="Agenda" />

        <div className="space-y-4">
          {AGENDA.map((show, i) => (
            <motion.div
              key={show.title + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-[110px_1fr] border border-white/10 overflow-hidden"
            >
              <div className="bg-secondary flex flex-col items-center justify-center py-6 sm:py-8 px-4 text-center">
                <span className="font-display text-4xl md:text-5xl leading-none">{show.day}</span>
                <span className="font-display text-xl tracking-wider mt-1">{show.month}</span>
              </div>
              <div className="bg-primary-light/80 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wide">{show.title}</h3>
                  <p className="flex items-center gap-2 text-support-muted mt-2 text-sm">
                    <FaMapMarkerAlt className="text-accent" /> {show.place}
                  </p>
                </div>
                <a href={wa} target="_blank" rel="noreferrer" className="btn-primary !py-3 whitespace-nowrap">
                  Solicitar data
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-support-muted text-sm mt-10 max-w-xl mx-auto">
          A agenda completa será publicada aqui assim que confirmada. Para contratações, fale direto pelo WhatsApp.
        </p>
      </div>
    </section>
  );
}
