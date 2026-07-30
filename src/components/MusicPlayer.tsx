import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward, X } from 'lucide-react';
import { PLAYLIST } from '../data/site';
import { asset } from '../utils/asset';

const STORAGE_PAUSED = 'ml-audio-paused';
const STORAGE_TRACK = 'ml-audio-track';
const DEFAULT_VOLUME = 0.3;
const RESTART_THRESHOLD_SEC = 3;

function readStoredPaused(): boolean {
  try {
    return localStorage.getItem(STORAGE_PAUSED) === '1';
  } catch {
    return false;
  }
}

function readStoredTrackIndex(): number {
  try {
    const raw = localStorage.getItem(STORAGE_TRACK);
    const value = Number(raw);
    if (!Number.isFinite(value)) return 0;
    return Math.min(PLAYLIST.length - 1, Math.max(0, Math.floor(value)));
  } catch {
    return 0;
  }
}

function persistPaused(paused: boolean) {
  try {
    localStorage.setItem(STORAGE_PAUSED, paused ? '1' : '0');
  } catch {
    /* ignore */
  }
}

function persistTrackIndex(index: number) {
  try {
    localStorage.setItem(STORAGE_TRACK, String(index));
  } catch {
    /* ignore */
  }
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function EqBars({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-3.5 shrink-0" aria-hidden="true">
      {[0, 0.15, 0.3, 0.12].map((delay, i) => (
        <span
          key={i}
          className={`w-[2.5px] rounded-full origin-bottom bg-accent-light ${
            active ? 'animate-[eq_0.75s_ease-in-out_infinite]' : 'opacity-35'
          }`}
          style={{
            height: `${9 + (i % 3) * 4}px`,
            animationDelay: active ? `${delay}s` : undefined,
            transform: active ? undefined : 'scaleY(0.35)',
          }}
        />
      ))}
    </div>
  );
}

const iconBtn = `
  shrink-0 inline-flex items-center justify-center rounded-full
  text-support/70 hover:text-accent-light hover:bg-accent/10
  transition-[transform,color,background-color] duration-200
  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
  disabled:opacity-35 disabled:pointer-events-none
`;

/**
 * Music player FAB + expandable control panel.
 * Positioned by the parent floating-actions stack (above WhatsApp).
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(() => readStoredTrackIndex());
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [skipFlash, setSkipFlash] = useState<'prev' | 'next' | null>(null);
  const userPausedRef = useRef(false);
  const shouldAutoplayRef = useRef(true);

  const track = PLAYLIST[trackIndex] ?? PLAYLIST[0];
  const multiTrack = PLAYLIST.length > 1;
  const prevTrackIndexRef = useRef(trackIndex);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const initiallyPaused = readStoredPaused();

    userPausedRef.current = initiallyPaused;
    shouldAutoplayRef.current = !initiallyPaused;

    audio.loop = PLAYLIST.length <= 1;
    audio.volume = DEFAULT_VOLUME;

    const syncPlaying = () => setPlaying(!audio.paused);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (PLAYLIST.length <= 1) return;
      setTrackIndex((i) => {
        const next = (i + 1) % PLAYLIST.length;
        persistTrackIndex(next);
        return next;
      });
      shouldAutoplayRef.current = true;
    };

    audio.addEventListener('play', syncPlaying);
    audio.addEventListener('pause', syncPlaying);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('durationchange', onMeta);
    audio.addEventListener('ended', onEnded);

    const tryPlay = () => {
      if (userPausedRef.current) return;
      void audio.play().catch(() => undefined);
    };

    void tryPlay();

    const unlock = () => {
      if (userPausedRef.current) return;
      void audio
        .play()
        .then(() => {
          window.removeEventListener('pointerdown', unlock);
          window.removeEventListener('keydown', unlock);
          window.removeEventListener('scroll', unlock);
          window.removeEventListener('touchstart', unlock);
        })
        .catch(() => undefined);
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock);
    window.addEventListener('scroll', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('scroll', unlock);
      window.removeEventListener('touchstart', unlock);
      audio.removeEventListener('play', syncPlaying);
      audio.removeEventListener('pause', syncPlaying);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('durationchange', onMeta);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (prevTrackIndexRef.current === trackIndex) return;
    prevTrackIndexRef.current = trackIndex;

    const audio = audioRef.current;
    if (!audio || !track) return;

    audio.src = asset(track.src);
    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (shouldAutoplayRef.current && !userPausedRef.current) {
      void audio.play().catch(() => undefined);
    }
  }, [trackIndex, track]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded]);

  const flashSkip = (dir: 'prev' | 'next') => {
    setSkipFlash(dir);
    window.setTimeout(() => setSkipFlash(null), 220);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPausedRef.current = false;
      shouldAutoplayRef.current = true;
      persistPaused(false);
      void audio.play().catch(() => undefined);
    } else {
      userPausedRef.current = true;
      shouldAutoplayRef.current = false;
      persistPaused(true);
      audio.pause();
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration) || duration <= 0) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const restartTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    userPausedRef.current = false;
    shouldAutoplayRef.current = true;
    persistPaused(false);
    void audio.play().catch(() => undefined);
  };

  const goPrev = () => {
    flashSkip('prev');
    if (currentTime > RESTART_THRESHOLD_SEC || !multiTrack) {
      restartTrack();
      return;
    }
    const next = (trackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    shouldAutoplayRef.current = true;
    userPausedRef.current = false;
    persistPaused(false);
    persistTrackIndex(next);
    setTrackIndex(next);
  };

  const goNext = () => {
    flashSkip('next');
    if (!multiTrack) {
      restartTrack();
      return;
    }
    const next = (trackIndex + 1) % PLAYLIST.length;
    shouldAutoplayRef.current = true;
    userPausedRef.current = false;
    persistPaused(false);
    persistTrackIndex(next);
    setTrackIndex(next);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const progressStyle = { '--progress': `${progress}%` } as CSSProperties;

  return (
    <div className="relative flex flex-col items-end pointer-events-none">
      <audio ref={audioRef} src={asset(track.src)} preload="auto" playsInline />

      <AnimatePresence>
        {expanded ? (
          <motion.div
            key="player-panel"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="
              pointer-events-auto
              absolute bottom-0 right-[calc(100%+0.75rem)]
              w-[min(20.5rem,calc(100vw-5.5rem))]
              rounded-2xl
              border border-[var(--border-gold)]
              bg-[color-mix(in_srgb,var(--surface)_94%,transparent)]
              backdrop-blur-xl
              shadow-[var(--shadow-hover)]
              px-4 py-4
              max-sm:right-0 max-sm:bottom-[calc(100%+0.75rem)]
              max-sm:w-[min(20.5rem,calc(100vw-2.5rem))]
            "
            role="region"
            aria-label="Player de música"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent">
                  {playing ? 'Tocando' : 'Pausado'}
                </p>
                <p className="font-semibold text-support text-sm truncate mt-1 leading-snug">{track.title}</p>
                <p className="text-xs text-support-muted truncate mt-0.5">{track.artist}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <EqBars active={playing} />
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className={`${iconBtn} w-8 h-8`}
                  aria-label="Fechar player"
                >
                  <X className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Number.isFinite(currentTime) ? currentTime : 0}
              onChange={(e) => seek(Number(e.target.value))}
              className="music-slider w-full"
              style={progressStyle}
              aria-label="Progresso da música"
            />

            <div className="flex items-center justify-between mt-1.5 mb-3 text-[0.7rem] tabular-nums text-support-muted">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <motion.button
                type="button"
                onClick={goPrev}
                className={`${iconBtn} w-10 h-10`}
                aria-label={multiTrack ? 'Faixa anterior' : 'Reiniciar música'}
                animate={skipFlash === 'prev' && !reduceMotion ? { scale: [1, 0.88, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <SkipBack className="w-[1.15rem] h-[1.15rem]" strokeWidth={1.75} />
              </motion.button>

              <button
                type="button"
                onClick={togglePlay}
                className="
                  w-12 h-12 rounded-full bg-accent text-white
                  flex items-center justify-center
                  shadow-[0_8px_22px_rgba(179,138,69,0.32)]
                  transition-[transform,background-color,box-shadow] duration-200
                  hover:bg-[var(--accent-hover)] hover:scale-[1.03]
                  active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
                "
                aria-label={playing ? 'Pausar' : 'Reproduzir'}
              >
                {playing ? (
                  <Pause className="w-5 h-5" fill="currentColor" strokeWidth={0} />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" strokeWidth={0} />
                )}
              </button>

              <motion.button
                type="button"
                onClick={goNext}
                className={`${iconBtn} w-10 h-10`}
                aria-label={multiTrack ? 'Próxima faixa' : 'Reiniciar música'}
                animate={skipFlash === 'next' && !reduceMotion ? { scale: [1, 0.88, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <SkipForward className="w-[1.15rem] h-[1.15rem]" strokeWidth={1.75} />
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        className={`
          pointer-events-auto
          music-player-button
          min-w-12 min-h-12 w-12 h-12 sm:w-14 sm:h-14 rounded-full
          flex items-center justify-center
          border border-[var(--border-gold)]
          bg-[color-mix(in_srgb,var(--surface)_94%,transparent)]
          backdrop-blur-md
          text-accent-light
          shadow-[var(--shadow-soft)]
          transition-[box-shadow,background-color] duration-[250ms]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
          ${playing ? 'player-fab-playing' : ''}
        `}
        aria-label={expanded ? 'Fechar player' : playing ? 'Abrir player (tocando)' : 'Abrir player'}
        aria-expanded={expanded}
      >
        {playing ? (
          <Pause className="w-5 h-5" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play className="w-5 h-5 ml-0.5" fill="currentColor" strokeWidth={0} />
        )}
      </motion.button>
    </div>
  );
}
