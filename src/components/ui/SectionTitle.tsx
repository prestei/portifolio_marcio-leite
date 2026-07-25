import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  alignment?: 'left' | 'center';
  /** Tighter spacing for sticky / constrained viewports. */
  compact?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  light = false,
  alignment = 'center',
  compact = false,
}: SectionTitleProps) {
  return (
    <div
      className={`${compact ? 'mb-4 md:mb-5' : 'mb-12 md:mb-16'} ${
        alignment === 'center' ? 'text-center flex flex-col items-center' : 'text-left'
      }`}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-sm font-bold tracking-[0.25em] uppercase block ${compact ? 'mb-1.5' : 'mb-3'} ${
            light ? 'text-accent-light' : 'text-accent'
          }`}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`font-display tracking-[0.06em] ${
          compact ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-4xl md:text-5xl lg:text-6xl'
        } ${light ? 'text-white' : 'text-support'}`}
      >
        {title.toUpperCase()}
      </motion.h2>
      {alignment === 'center' && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className={`w-20 h-1 ${compact ? 'mt-3' : 'mt-6'} ${
            light
              ? 'bg-gradient-to-r from-secondary via-accent-light to-secondary'
              : 'bg-gradient-to-r from-secondary via-accent to-secondary'
          }`}
        />
      )}
    </div>
  );
}
