import { useMemo, type CSSProperties } from 'react';

type ParticleStyle = CSSProperties & {
  '--float-x': string;
  '--float-y': string;
};

type Particle = {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
  style: ParticleStyle;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 999) * 10000;
  return value - Math.floor(value);
}

export default function ParticleLayer() {
  const particles = useMemo<Particle[]>(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.matchMedia('(max-width: 767px)').matches;
    const count = reducedMotion ? 0 : smallScreen ? 18 : 32;

    return Array.from({ length: count }, (_, index) => {
      const x = seededRandom(index + 1);
      const y = seededRandom(index + 11);
      const size = 1 + seededRandom(index + 21) * 3.8;
      const floatX = (seededRandom(index + 31) - 0.5) * 58;
      const floatY = (seededRandom(index + 41) - 0.5) * 72;

      return {
        id: index,
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        size: `${size}px`,
        delay: `${seededRandom(index + 51) * -7}s`,
        duration: `${5.5 + seededRandom(index + 61) * 8}s`,
        opacity: 0.25 + seededRandom(index + 71) * 0.5,
        style: {
          '--float-x': `${floatX}px`,
          '--float-y': `${floatY}px`,
        },
      };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <span
          className="particle-float absolute rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.38)]"
          key={particle.id}
          style={{
            ...particle.style,
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}
