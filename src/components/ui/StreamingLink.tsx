import type { ComponentType } from 'react';
import { FaYoutube, FaInstagram, FaFacebookF, FaMusic, FaSpotify } from 'react-icons/fa';

const ICONS = {
  youtube: FaYoutube,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  music: FaMusic,
  spotify: FaSpotify,
} as const;

export type StreamingIconName = keyof typeof ICONS;

interface StreamingLinkProps {
  name: string;
  href: string;
  icon: string;
  /** Show label under/beside the icon (default: icon-only circle). */
  labeled?: boolean;
}

export function StreamingLink({ name, href, icon, labeled = false }: StreamingLinkProps) {
  const Icon = (ICONS[icon as StreamingIconName] ?? FaMusic) as ComponentType<{ className?: string }>;

  if (labeled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group inline-flex flex-col items-center gap-2.5
          min-w-[4.5rem] focus:outline-none
        "
        aria-label={name}
      >
        <span className="streaming-link text-xl">
          <Icon className="w-[1.15rem] h-[1.15rem]" />
        </span>
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-support-muted group-hover:text-accent-light transition-colors">
          {name}
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="streaming-link text-xl"
      aria-label={name}
    >
      <Icon className="w-[1.15rem] h-[1.15rem]" />
    </a>
  );
}
