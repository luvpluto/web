import { useEffect, useState } from 'react';

type VideoBackgroundProps = {
  src?: string;
  poster?: string;
};

export default function VideoBackground({
  src = '/videos/background-optimized.mp4',
  poster = '/images/hero-poster.jpg',
}: VideoBackgroundProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.matchMedia('(max-width: 767px)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setShouldLoadVideo(!reducedMotion && !smallScreen && !connection?.saveData);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,#1a1a1c,#050505_60%,#000)]" />
      {(!shouldLoadVideo || !videoReady || videoFailed) ? (
        <div
          className="slow-drift absolute inset-0 scale-105 bg-cover bg-center opacity-70 grayscale blur-[1px]"
          style={{ backgroundImage: `url(${poster})` }}
        />
      ) : null}

      {shouldLoadVideo && !videoFailed ? (
        <video
          className="slow-drift absolute inset-0 h-full w-full object-cover opacity-78 blur-[1px] grayscale contrast-90 brightness-110"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          disablePictureInPicture
          onError={() => setVideoFailed(true)}
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : videoFailed ? (
        <div className="slow-drift absolute inset-0 bg-[radial-gradient(circle_at_45%_42%,rgba(240,240,240,0.18),transparent_24%),radial-gradient(circle_at_72%_28%,rgba(120,130,150,0.16),transparent_26%),linear-gradient(120deg,#171719,#050505_62%,#000)]" />
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.28)_68%,rgba(0,0,0,0.58)_100%)]" />
    </div>
  );
}
