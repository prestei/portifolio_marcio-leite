import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { SectionTitle } from '../ui/SectionTitle';
import { SITE } from '../../data/site';

export function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    date: '',
    message: '',
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `Olá! Solicito orçamento para o show do Márcio Leite.`,
      `Nome: ${form.name}`,
      `Telefone: ${form.phone}`,
      `E-mail: ${form.email}`,
      `Cidade do evento: ${form.city}`,
      `Data desejada: ${form.date}`,
      form.message ? `Mensagem: ${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contato" className="section-pad bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle title="Contratação" subtitle="Fechamento Comercial" />

        <p className="text-center text-support-muted max-w-2xl mx-auto mb-14 -mt-6 text-base md:text-lg">
          Garanta o show de Márcio Leite no seu município, festival, cavalgada ou evento privado. Leve a estrutura
          completa do arrocha que é sucesso garantido de público!
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-8 lg:min-h-[28rem]"
          >
            <h3 className="font-display text-3xl md:text-4xl tracking-wide">
              Fale com a <span className="text-secondary">produção</span>
            </h3>

            <div className="flex flex-col gap-5">
              {SITE.whatsapps.map((wa) => (
                <a
                  key={wa.number}
                  href={`https://wa.me/${wa.number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group w-fit max-w-full"
                >
                  <span className="w-12 h-12 rounded-full bg-surface border border-[var(--border-gold)] flex items-center justify-center shrink-0 group-hover:border-secondary group-hover:bg-secondary/10 transition-colors">
                    <FaWhatsapp className="text-accent text-xl" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs tracking-wider uppercase text-support-dark">WhatsApp</span>
                    <span className="text-lg font-bold group-hover:text-accent transition-colors">{wa.display}</span>
                  </div>
                </a>
              ))}

              <a
                href="mailto:marcioleitesimplesmenteromantico@hotmail.com"
                className="flex items-center gap-4 group w-fit max-w-full"
              >
                <span className="w-12 h-12 rounded-full bg-surface border border-[var(--border-gold)] flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                  <FaEnvelope className="text-accent" />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs tracking-wider uppercase text-support-dark">E-mail</span>
                  <span className="text-sm md:text-base break-all group-hover:text-accent transition-colors">
                    marcioleitesimplesmenteromantico@hotmail.com
                  </span>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-surface border border-[var(--border-gold)] p-6 md:p-8 space-y-5 card-lift shadow-[var(--shadow-soft)]"
          >
            <h4 className="font-display text-2xl tracking-wide mb-2">Orçamento rápido</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nome" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Telefone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
            </div>
            <Field label="E-mail" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Cidade do evento" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Field label="Data desejada" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-support-dark mb-2">Mensagem</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-surface border border-[var(--border-gold)] px-4 py-3 text-support focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tipo de evento, horário, observações..."
              />
            </div>
            <button type="submit" className="btn-primary w-full !py-4">
              <FaWhatsapp /> Enviar pelo WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs tracking-wider uppercase text-support-dark mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface border border-[var(--border-gold)] px-4 py-3 text-support focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
