import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPause, FaPlay, FaTimes, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { SITE } from '../data/site';
import { asset } from '../utils/asset';

const TRACK = {
  src: 'audio/se-nao-for-por-amor.mp3',
  title: 'Se Não For Por Amor',
  artist: SITE.name,
};

const STORAGE_VOLUME = 'ml-audio-volume';
const STORAGE_PAUSED = 'ml-audio-paused';
const DEFAULT_VOLUME = 0.3;
const DESKTOP_MQ = '(min-width: 768px)';

function readStoredVolume(): number {
  try {
    const raw = localStorage.getItem(STORAGE_VOLUME);
    if (raw == null) return DEFAULT_VOLUME;
    const value = Number(raw);
    if (!Number.isFinite(value)) return DEFAULT_VOLUME;
    return Math.min(1, Math.max(0, value));
  } catch {
    return DEFAULT_VOLUME;
  }
}

function readStoredPaused(): boolean {
  try {
    return localStorage.getItem(STORAGE_PAUSED) === '1';
  } catch {
    return false;
  }
}

function persistVolume(volume: number) {
  try {
    localStorage.setItem(STORAGE_VOLUME, String(volume));
  } catch {
    /* ignore */
  }
}

function persistPaused(paused: boolean) {
  try {
    localStorage.setItem(STORAGE_PAUSED, paused ? '1' : '0');
  } catch {
    /* ignore */
  }
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_MQ).matches : true,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
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

const playBtnClass = `
  shrink-0 rounded-full bg-secondary text-white flex items-center justify-center
  shadow-[0_4px_18px_rgba(204,44,47,0.5)]
  transition-[transform,box-shadow,background-color] duration-[250ms] ease-out
  hover:bg-secondary-dark hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(204,44,47,0.55)]
  active:scale-95
  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
`;

/**
 * Single music player component:
 * - Desktop/tablet (≥768px): full centered pill
 * - Mobile: red FAB; expands to full controls on tap
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isDesktop = useIsDesktop();
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const userPausedRef = useRef(false);
  const volumeBeforeMuteRef = useRef(DEFAULT_VOLUME);

  useEffect(() => {
    if (isDesktop) setExpanded(false);
  }, [isDesktop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const initialVolume = readStoredVolume();
    const initiallyPaused = readStoredPaused();

    userPausedRef.current = initiallyPaused;
    volumeBeforeMuteRef.current = initialVolume > 0 ? initialVolume : DEFAULT_VOLUME;
    setVolume(initialVolume);
    setMuted(initialVolume === 0);

    audio.loop = true;
    audio.volume = initialVolume;

    const syncPlaying = () => setPlaying(!audio.paused);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener('play', syncPlaying);
    audio.addEventListener('pause', syncPlaying);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('durationchange', onMeta);

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
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPausedRef.current = false;
      persistPaused(false);
      void audio.play().catch(() => undefined);
    } else {
      userPausedRef.current = true;
      persistPaused(true);
      audio.pause();
    }
  };

  const applyVolume = (next: number) => {
    const audio = audioRef.current;
    const clamped = Math.min(1, Math.max(0, next));
    setVolume(clamped);
    setMuted(clamped === 0);
    if (audio) audio.volume = clamped;
    persistVolume(clamped);
    if (clamped > 0) volumeBeforeMuteRef.current = clamped;
  };

  const toggleMute = () => {
    if (muted || volume === 0) {
      applyVolume(volumeBeforeMuteRef.current || DEFAULT_VOLUME);
    } else {
      volumeBeforeMuteRef.current = volume;
      applyVolume(0);
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration) || duration <= 0) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const progressStyle = { '--progress': `${progress}%` } as CSSProperties;
  const volumeStyle = { '--progress': `${volume * 100}%` } as CSSProperties;

  return (
    <div
      className="
        fixed z-50 left-1/2 -translate-x-1/2 pointer-events-none
        bottom-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+0.75rem))]
        md:bottom-[30px]
      "
    >
      <audio ref={audioRef} src={asset(TRACK.src)} preload="auto" playsInline />

      {isDesktop ? (
        <div
          className="
            pointer-events-auto
            flex items-center gap-2.5 sm:gap-3
            w-[min(28rem,90vw)] lg:w-[min(32rem,92vw)]
            rounded-full border border-white/12
            bg-[#0c0a0a]/72 backdrop-blur-2xl
            shadow-[0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(214,174,13,0.1)]
            pl-2 pr-3 sm:pl-2.5 sm:pr-4 py-2
          "
          role="region"
          aria-label="Player de música"
        >
          <button
            type="button"
            onClick={togglePlay}
            className={`${playBtnClass} w-10 h-10`}
            aria-label={playing ? 'Pausar' : 'Tocar'}
          >
            {playing ? <FaPause className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
          </button>

          <div className="flex-1 min-w-0 py-0.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-[13px] font-semibold text-white truncate leading-tight">
                  {TRACK.title}
                </p>
                <p className="text-[10px] text-white/50 truncate leading-tight mt-px">{TRACK.artist}</p>
              </div>
              <EqBars active={playing} />
            </div>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Number.isFinite(currentTime) ? currentTime : 0}
              onChange={(e) => seek(Number(e.target.value))}
              className="music-slider music-slider--thin w-full mt-1.5"
              style={progressStyle}
              aria-label="Progresso da música"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={toggleMute}
              className="text-white/55 hover:text-accent-light p-1.5 rounded-full transition-[transform,color] duration-[250ms] hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label={muted || volume === 0 ? 'Ativar som' : 'Silenciar'}
            >
              {muted || volume === 0 ? <FaVolumeMute className="text-sm" /> : <FaVolumeUp className="text-sm" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => applyVolume(Number(e.target.value))}
              className="music-slider music-slider--thin w-14 sm:w-16 lg:w-[4.5rem]"
              style={volumeStyle}
              aria-label="Volume"
            />
          </div>
        </div>
      ) : (
        <div className="pointer-events-auto flex flex-col items-center">
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 28, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.94 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="
                  w-[min(22rem,92vw)]
                  rounded-[1.75rem] border border-white/12
                  bg-[#0c0a0a]/85 backdrop-blur-2xl
                  shadow-[0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(214,174,13,0.1)]
                  px-3.5 py-3.5
                "
                role="region"
                aria-label="Player de música"
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className={`${playBtnClass} w-11 h-11`}
                    aria-label={playing ? 'Pausar' : 'Tocar'}
                  >
                    {playing ? <FaPause className="text-sm" /> : <FaPlay className="text-sm ml-0.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate leading-tight">{TRACK.title}</p>
                        <p className="text-[11px] text-white/50 truncate mt-0.5">{TRACK.artist}</p>
                      </div>
                      <EqBars active={playing} />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpanded(false)}
                    className="
                      shrink-0 w-8 h-8 rounded-full bg-white/10 text-white/55
                      hover:text-white hover:bg-white/15
                      flex items-center justify-center transition-colors duration-[250ms]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                    "
                    aria-label="Fechar player"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>

                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Number.isFinite(currentTime) ? currentTime : 0}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="music-slider music-slider--thin w-full mt-3"
                  style={progressStyle}
                  aria-label="Progresso da música"
                />

                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-white/55 hover:text-accent-light p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
                    aria-label={muted || volume === 0 ? 'Ativar som' : 'Silenciar'}
                  >
                    {muted || volume === 0 ? <FaVolumeMute className="text-sm" /> : <FaVolumeUp className="text-sm" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => applyVolume(Number(e.target.value))}
                    className="music-slider music-slider--thin flex-1"
                    style={volumeStyle}
                    aria-label="Volume"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="fab"
                type="button"
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setExpanded(true)}
                className={`${playBtnClass} w-14 h-14`}
                style={{ width: 60, height: 60 }}
                aria-label={playing ? 'Abrir player (tocando)' : 'Abrir player'}
              >
                {playing ? <FaPause className="text-lg" /> : <FaPlay className="text-lg ml-0.5" />}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
