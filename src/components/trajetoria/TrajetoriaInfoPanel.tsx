import { Mic2 } from 'lucide-react';
import type { TrajetoriaItem } from '../../data/site';

interface TrajetoriaInfoPanelProps {
  item: TrajetoriaItem;
  className?: string;
}

/**
 * Fills the Trajetória media frame when a marco has no photo —
 * same footprint as the image, with glass + gold identity.
 */
export function TrajetoriaInfoPanel({ item, className = '' }: TrajetoriaInfoPanelProps) {
  const body = item.infoText?.trim() || item.desc;

  return (
    <div
      className={`
        absolute inset-0 flex flex-col items-center justify-center
        px-6 py-8 sm:px-8 sm:py-10 md:px-10
        bg-gradient-to-br from-[#141010] via-[#0c0a0a] to-[#1a1210]
        ${className}
      `}
      role="img"
      aria-label={`${item.year} — ${item.title}. ${body}`}
    >
      {/* Soft gold ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(212,176,106,0.14),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(122,91,42,0.1),transparent_50%)]"
        aria-hidden="true"
      />

      <div
        className="
          relative z-10 w-full max-w-md text-center
          rounded-2xl border border-accent/30
          bg-black/35 backdrop-blur-xl
          px-6 py-8 sm:px-8 sm:py-10
          shadow-[0_20px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]
        "
      >
        <div
          className="
            mx-auto mb-5 sm:mb-6
            flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center
            rounded-full border border-accent/40
            bg-accent/10 text-accent
          "
          aria-hidden="true"
        >
          <Mic2 className="h-7 w-7 sm:h-8 sm:w-8 opacity-90" strokeWidth={1.4} />
        </div>

        <p className="font-display text-accent-light text-2xl sm:text-3xl tracking-wide">{item.year}</p>
        <h3 className="font-semibold text-white text-base sm:text-lg mt-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-sm sm:text-[0.9375rem] text-white/70 mt-4 leading-relaxed">
          {body}
        </p>

        {item.highlight ? (
          <p className="mt-6 pt-5 border-t border-accent/20 font-script text-accent-light text-xl sm:text-2xl leading-snug opacity-90">
            &ldquo;{item.highlight}&rdquo;
          </p>
        ) : null}
      </div>
    </div>
  );
}
