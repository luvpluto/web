import { type CSSProperties, type MouseEvent, useEffect, useRef, useState } from 'react';
import ParticleLayer from './ParticleLayer';
import SocialLinks from './SocialLinks';
import VideoBackground from './VideoBackground';

type HeroStyle = CSSProperties & {
  '--mx': string;
  '--my': string;
};

export default function Hero() {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef(0);
  const nextParallaxRef = useRef({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    nextParallaxRef.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const target = heroRef.current;
      if (!target) return;
      target.style.setProperty('--mx', `${nextParallaxRef.current.x * 22}px`);
      target.style.setProperty('--my', `${nextParallaxRef.current.y * 18}px`);
    });
  }

  function handleMouseLeave() {
    nextParallaxRef.current = { x: 0, y: 0 };
    const target = heroRef.current;
    if (!target) return;
    target.style.setProperty('--mx', '0px');
    target.style.setProperty('--my', '0px');
  }

  const style: HeroStyle = {
    '--mx': '0px',
    '--my': '0px',
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-black text-white"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <VideoBackground />
      <ParticleLayer />
      <div className="opening-panel-top pointer-events-none fixed inset-x-0 top-0 z-50 h-1/2 bg-black" />
      <div className="opening-panel-bottom pointer-events-none fixed inset-x-0 bottom-0 z-50 h-1/2 bg-black" />

      <div className="pointer-events-none absolute inset-0 translate-x-[calc(var(--mx)*-0.25)] translate-y-[calc(var(--my)*-0.25)] bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.12),transparent_36%,rgba(0,0,0,0.22)_100%)] mix-blend-overlay transition-transform duration-300" />

      <button
        className="hero-audio absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-2xl border border-white/18 bg-white/[0.08] text-white/84 shadow-[0_0_28px_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-accent/70 hover:bg-accent/16 hover:text-accent-soft hover:shadow-glow sm:left-5 sm:top-5 sm:h-14 sm:w-14"
        type="button"
        aria-label={audioOn ? 'Turn audio off' : 'Turn audio on'}
        aria-pressed={audioOn}
        onClick={() => setAudioOn((value) => !value)}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 9.5v5h3.2L12 18V6L7.2 9.5H4Z"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path
            d={audioOn ? 'M15.2 8.2a5 5 0 0 1 0 7.6M17.8 5.8a8.7 8.7 0 0 1 0 12.4' : 'M16 9l4 6M20 9l-4 6'}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
      </button>

      <section className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1700px] flex-col px-5 py-6 sm:px-8 lg:px-14">
        <div className="flex flex-1 items-center justify-center pt-[6svh]">
          <div className="relative grid w-full place-items-center text-center">
            <div className="absolute left-1/2 top-1/2 h-[min(72vw,620px)] w-[min(72vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />

            <div className="relative z-10 flex translate-y-[2svh] flex-col items-center sm:translate-y-[4svh]">
              <div className="avatar-float group/avatar relative z-20 mb-4 grid h-28 w-28 translate-x-[calc(var(--mx)*0.2)] place-items-center rounded-full sm:mb-5 sm:h-36 sm:w-36 lg:mb-6 lg:h-44 lg:w-44">
                <div className="avatar-glow pointer-events-none absolute inset-[-16%] rounded-full bg-accent/35 blur-2xl" />
                <div className="hero-avatar-stage relative h-full w-full overflow-hidden rounded-full shadow-[0_8px_60px_rgba(255,255,255,0.24)] ring-1 ring-white/35 transition duration-500 [clip-path:circle(50%_at_50%_50%)] group-hover/avatar:scale-105 group-hover/avatar:ring-accent/80 group-hover/avatar:shadow-glow">
                  {!avatarFailed ? (
                    <picture className="block h-full w-full overflow-hidden rounded-full">
                      <source srcSet="/avatar-nier.webp" type="image/webp" />
                      <img
                        className="block h-full w-full rounded-full object-cover brightness-95 contrast-105 saturate-[0.45] transition duration-700 [clip-path:circle(50%_at_50%_50%)] group-hover/avatar:brightness-105 group-hover/avatar:saturate-[0.62]"
                        src="/avatar-nier.jpg"
                        alt="Creator avatar"
                        width="360"
                        height="360"
                        decoding="async"
                        fetchPriority="high"
                        onError={() => setAvatarFailed(true)}
                      />
                    </picture>
                  ) : (
                    <span className="block h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.68),rgba(255,255,255,0.18)_58%,rgba(255,255,255,0.06))]" />
                  )}
                </div>
              </div>

              <div className="overflow-hidden">
                <p className="hero-name-line max-w-[88vw] text-[clamp(1.08rem,1.85vw,1.65rem)] font-normal tracking-[0.14em] text-white/86 drop-shadow-[0_1px_18px_rgba(0,0,0,0.62)]">
                  灰色海胆
                </p>
              </div>

              <div className="mt-3 overflow-hidden">
                <p className="hero-tagline-line text-[11px] uppercase tracking-[0.34em] text-white/42 sm:text-xs">
                  TRYING MY BEST
                </p>
              </div>

              <div className="hero-socials mt-6">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>

        <a
          className="hero-scroll-cue absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] tracking-[0.02em] text-white/58 transition hover:text-accent-soft sm:bottom-7"
          href="#works"
        >
          <span>Scroll for more</span>
          <span className="arrow-float text-xl leading-none">↓</span>
        </a>

        <div className="hero-side-dots absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex">
          <span className="h-3 w-3 rounded-full bg-accent shadow-[0_0_18px_rgba(236,138,163,0.72)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent/35" />
        </div>
      </section>
    </section>
  );
}
