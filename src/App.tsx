import { lazy, Suspense, useEffect, useState } from 'react';
import Hero from './components/Hero';
import usePortfolioAnimations from './hooks/usePortfolioAnimations';

const Grainient = lazy(() => import('./components/Grainient'));

const works = [
  {
    title: 'RHYTHM CUT',
    image: '/images/works/work-01.webp',
    fallbackImage: '/images/works/work-01.png',
    description: 'Blue-pink anime cover design with split character contrast and glowing texture.',
  },
  {
    title: 'LIGHT SEQUENCE',
    image: '/images/works/work-02.webp',
    fallbackImage: '/images/works/work-02.jpg',
    description: 'Cinematic anime collage with soft prism highlights and layered character focus.',
  },
  {
    title: 'NOISE STUDY',
    image: '/images/works/work-03.webp',
    fallbackImage: '/images/works/work-03.png',
    description: 'High-energy visual edit cover with glitch color, impact typography and sharp contrast.',
  },
];

function useShouldRenderWebGL() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.matchMedia('(max-width: 767px)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    setShouldRender(!reducedMotion && !smallScreen && !coarsePointer && !connection?.saveData);
  }, []);

  return shouldRender;
}

export default function App() {
  usePortfolioAnimations();
  const shouldRenderWebGL = useShouldRenderWebGL();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Hero />

      <div className="relative overflow-hidden bg-[#050505]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_0%,rgba(236,138,163,0.045),transparent_18%),radial-gradient(circle_at_84%_34%,rgba(255,255,255,0.028),transparent_20%),linear-gradient(135deg,rgba(7,7,8,0.98),rgba(5,5,5,1)_38%)]" />
        {shouldRenderWebGL ? (
          <Suspense fallback={null}>
            <Grainient
              className="pointer-events-none absolute inset-0 opacity-38"
              color1="#ec8aa3"
              color2="#080608"
              color3="#5b5a60"
              timeSpeed={0.12}
              colorBalance={0.15}
              warpStrength={0.48}
              warpFrequency={3.4}
              warpSpeed={0.9}
              warpAmplitude={82}
              blendAngle={18}
              blendSoftness={0.14}
              rotationAmount={180}
              noiseScale={1.45}
              grainAmount={0.025}
              grainScale={1.4}
              contrast={1.18}
              saturation={0.36}
              centerX={-0.05}
              centerY={0.05}
              zoom={0.78}
              maxDpr={1}
              frameRate={24}
            />
          </Suspense>
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.92),rgba(5,5,5,0.48)_18%,rgba(5,5,5,0.76)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,transparent,rgba(0,0,0,0.84)_68%)]" />

        <section
          id="works"
          className="motion-section relative mx-auto min-h-screen w-full max-w-[1700px] border-t border-white/10 px-5 pb-24 pt-4 sm:px-8 sm:pt-5 lg:px-14 lg:pb-32 lg:pt-6"
        >
          <div className="relative">
            <p className="section-kicker mb-5 text-[11px] uppercase tracking-[0.28em] text-white/40">
              Archive / 002
            </p>
            <h2 className="section-title font-display text-[clamp(3.2rem,9vw,9.5rem)] font-black italic leading-[0.86] text-white/90">
              SELECTED MOTION
            </h2>
            <p className="section-copy mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
              A compact archive for AMV edits, PV visuals, motion tests and experimental frames.
            </p>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {works.map((work, index) => (
                <article
                  className="stagger-card group min-h-[420px] overflow-hidden border border-white/12 bg-black/35 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-accent/[0.055] hover:shadow-glow"
                  key={work.title}
                >
                  <div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/35 transition-colors duration-300 group-hover:text-accent/75">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>Motion / 2025</span>
                  </div>
                  <div className="image-reveal relative h-56 overflow-hidden bg-black sm:h-64">
                    <picture>
                      <source srcSet={work.image} type="image/webp" />
                      <img
                        className="parallax-image h-full w-full object-cover brightness-90 contrast-110 saturate-[0.28] transition duration-700 group-hover:scale-105 group-hover:brightness-95 group-hover:saturate-[0.38]"
                        src={work.fallbackImage}
                        alt={`${work.title} cover`}
                        width="1400"
                        height="1048"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </picture>
                    <div className="image-veil pointer-events-none absolute inset-0 z-10 bg-[#050505]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(0,0,0,0.24)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply" />
                  </div>
                  <h3 className="mt-8 font-display text-3xl font-black italic text-white/84 transition-colors duration-300 group-hover:text-accent-soft">
                    {work.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/48">{work.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="motion-section relative mx-auto grid min-h-[80vh] w-full max-w-[1700px] gap-10 border-t border-white/10 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-14 lg:py-32">
          <div>
            <p className="section-kicker mb-5 text-[11px] uppercase tracking-[0.28em] text-white/40">
              Profile / 003
            </p>
            <h2 className="section-title font-display text-[clamp(3rem,7vw,7rem)] font-black italic leading-[0.9]">
              VISUAL STORIES
            </h2>
          </div>
          <div className="section-copy self-end text-xl leading-9 text-white/58 sm:text-2xl">
            I build cinematic interfaces and motion-led visual systems with a grayscale base, soft
            blur, controlled contrast and rhythm-first composition.
          </div>
        </section>

        <section className="motion-section relative mx-auto flex min-h-[70vh] w-full max-w-[1700px] flex-col justify-center border-t border-white/10 px-5 py-24 sm:px-8 lg:px-14">
          <p className="section-kicker mb-5 text-[11px] uppercase tracking-[0.28em] text-white/40">
            Contact / 004
          </p>
          <h2 className="section-title max-w-5xl font-display text-[clamp(3rem,8vw,8rem)] font-black italic leading-[0.88]">
            LET THE NEXT FRAME MOVE.
          </h2>
        </section>
      </div>
    </main>
  );
}
