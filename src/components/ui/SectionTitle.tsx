import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  alignment?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, light = false, alignment = 'center' }: SectionTitleProps) {
  return (
    <div className={`mb-12 md:mb-16 ${alignment === 'center' ? 'text-center flex flex-col items-center' : 'text-left'}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-sm font-bold tracking-[0.25em] uppercase block mb-3 ${light ? 'text-secondary' : 'text-accent'}`}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.06em] ${light ? 'text-primary' : 'text-support'}`}
      >
        {title.toUpperCase()}
      </motion.h2>
      {alignment === 'center' && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className={`w-20 h-1 mt-6 ${light ? 'bg-secondary' : 'bg-gradient-to-r from-secondary via-accent to-secondary'}`}
        />
      )}
    </div>
  );
}
