import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Film,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PageRoute, RESTAURANT_INFO } from '../data/restaurantData';
import { formatMediaTime } from '../utils/menuMedia';

interface PromoVideoSectionProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export function PromoVideoSection({ onNavigate }: PromoVideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Automatically play when scrolled into view and pause cleanly when scrolled away
  useEffect(() => {
    const target = sectionRef.current;
    if (!target || videoError) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const attemptAutoPlay = async () => {
      const video = videoRef.current;
      if (!video || !video.paused || userPausedRef.current) return;

      // Try playing with audio first (succeeds after prior page interaction),
      // and fall back seamlessly to muted autoplay if browser gesture policy requires it.
      try {
        video.muted = false;
        await video.play();
        setIsMuted(false);
        setIsPlaying(true);
      } catch {
        try {
          video.muted = true;
          setIsMuted(true);
          await video.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          void attemptAutoPlay();
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.35] }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [videoError]);

  const handleTogglePlay = async () => {
    const video = videoRef.current;
    if (!video || videoError) return;

    if (video.paused) {
      userPausedRef.current = false;
      video.muted = isMuted;
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      userPausedRef.current = true;
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;
    if (video) {
      video.muted = nextMuted;
    }
    setIsMuted(nextMuted);
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const nextTime = Number(event.target.value);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleToggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore fullscreen denial in restricted iframes
    }
  };

  const handleRetry = () => {
    userPausedRef.current = false;
    setVideoError(false);
    setCurrentTime(0);
    setIsPlaying(false);
    videoRef.current?.load();
  };

  const progressMax = Math.max(duration, 1);

  return (
    <section
      ref={sectionRef}
      id="promo-film"
      aria-labelledby="promo-film-heading"
      className="py-16 md:py-24 bg-[#211D25] border-t border-[#D4AF37]/20 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#ECC55F] mb-2">
              <Film className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                Inside Hyderabadi Mehfil
              </span>
            </div>
            <h2
              id="promo-film-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F1E3] tracking-tight mb-3 text-balance"
            >
              Experience Our Kitchen
            </h2>
            <p className="text-sm sm:text-base text-[#D8CFC4] leading-relaxed">
              From hand-sealed copper biryani pots to charcoal-seared kebabs and slow-roasted
              mandi platters—step inside 290 Ilford Lane.
            </p>
          </div>

          <div className="self-start md:self-end shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#27222C] hover:bg-[#322B39] text-[#F7F1E3] text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs border border-[#D4AF37]/45 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]"
            >
              <span>View Menu</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ECC55F]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 16:9 Cinema Frame */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#18151B] border border-[#D4AF37]/45 shadow-xl"
        >
          {videoError ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={RESTAURANT_INFO.heroImageUrl}
                alt="Hyderabadi Mehfil Dum Biryani feast"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-[#18151B]/70 flex flex-col items-center justify-center px-6 text-center">
                <p className="font-serif text-xl sm:text-2xl text-[#F7F1E3] mb-3">
                  Unable to load the promotional film right now
                </p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#27222C] hover:bg-[#322B39] text-[#F7F1E3] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#ECC55F]" aria-hidden="true" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={RESTAURANT_INFO.promoVideoUrl}
                poster={RESTAURANT_INFO.heroImageUrl}
                muted={isMuted}
                playsInline
                preload="auto"
                onClick={handleTogglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={() => {
                  if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration);
                }}
                onEnded={() => {
                  userPausedRef.current = true;
                  setIsPlaying(false);
                }}
                onError={() => {
                  setVideoError(true);
                  setIsPlaying(false);
                }}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Subtle bottom gradient for paused poster visibility */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#18151B]/80 via-[#18151B]/15 to-transparent pointer-events-none" />
              )}

              {/* Quick Unmute button when browser started autoplay muted */}
              {isPlaying && isMuted && (
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#18151B]/85 hover:bg-[#27222C] text-[#ECC55F] border border-[#D4AF37]/50 backdrop-blur-sm text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tap for Sound</span>
                </button>
              )}

              {/* Centered Play Film Button when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label="Play promotional film"
                    className="pointer-events-auto flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#211D25]/90 hover:bg-[#2C2632] text-[#F7F1E3] border border-[#D4AF37]/60 shadow-2xl backdrop-blur-sm transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]"
                  >
                    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C99B35] to-[#F0C75E] text-[#1D1810] flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-[#1D1810] ml-0.5" aria-hidden="true" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                      {currentTime > 0 ? 'Replay Film' : 'Play Film'}
                    </span>
                  </button>
                </div>
              )}

              {/* Bottom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#141217]/95 via-[#18151B]/75 to-transparent px-4 sm:px-6 pt-6 pb-3.5 flex items-center gap-3 sm:gap-4 text-[#F7F1E3]">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="p-2 rounded-md hover:bg-white/10 text-[#ECC55F] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-[#F0C75E]"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-[#ECC55F]" aria-hidden="true" />
                  ) : (
                    <Play className="w-4 h-4 fill-[#ECC55F]" aria-hidden="true" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="p-2 rounded-md hover:bg-white/10 text-[#ECC55F] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-[#F0C75E]"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>

                <input
                  type="range"
                  min={0}
                  max={progressMax}
                  step={0.1}
                  value={Math.min(currentTime, progressMax)}
                  onChange={handleSeek}
                  aria-label="Seek video timeline"
                  className="flex-1 h-1.5 accent-[#F0C75E] cursor-pointer rounded-lg"
                />

                <span className="text-[11px] font-semibold text-[#D8CFC4] tabular-nums shrink-0">
                  {formatMediaTime(currentTime)} / {formatMediaTime(duration)}
                </span>

                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="p-2 rounded-md hover:bg-white/10 text-[#ECC55F] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-[#F0C75E]"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
