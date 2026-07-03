import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function usePortfolioAnimations() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;

    const ctx = gsap.context(() => {
      const opening = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      opening
        .set('.opening-panel-top', { yPercent: 0 })
        .set('.opening-panel-bottom', { yPercent: 0 })
        .set('.hero-avatar-stage', {
          clipPath: 'circle(0% at 50% 50%)',
          filter: 'blur(18px)',
          scale: 1.18,
          force3D: true,
        })
        .set('.hero-name-line', {
          yPercent: 120,
          scaleX: 0.72,
          filter: 'blur(14px)',
        })
        .set('.hero-tagline-line', {
          yPercent: 130,
          filter: 'blur(10px)',
        })
        .set('.hero-socials', { y: 34, filter: 'blur(8px)', opacity: 0 })
        .set('.hero-scroll-cue', { y: 18, opacity: 0 })
        .set('.hero-side-dots', { x: 24, opacity: 0 })
        .set('.hero-audio', { scale: 0.82, opacity: 0, filter: 'blur(8px)' })
        .to('.opening-panel-top', { yPercent: -102, duration: 1.35 }, 0.15)
        .to('.opening-panel-bottom', { yPercent: 102, duration: 1.35 }, 0.15)
        .to('.hero-avatar-stage', {
          clipPath: 'circle(50% at 50% 50%)',
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.35,
          force3D: true,
        }, 0.48)
        .to('.hero-name-line', {
          yPercent: 0,
          scaleX: 1,
          filter: 'blur(0px)',
          duration: 1.2,
        }, 0.76)
        .to('.hero-tagline-line', {
          yPercent: 0,
          filter: 'blur(0px)',
          duration: 0.98,
        }, 0.94)
        .to('.hero-socials', {
          y: 0,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.9,
        }, 1.08)
        .to('.hero-audio', {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.85,
        }, 1.08)
        .to('.hero-scroll-cue', {
          y: 0,
          opacity: 1,
          duration: 0.8,
        }, 1.32)
        .to('.hero-side-dots', {
          x: 0,
          opacity: 1,
          duration: 0.8,
        }, 1.34)
        .set('.opening-panel-top, .opening-panel-bottom', { pointerEvents: 'none' });

      gsap.utils.toArray<HTMLElement>('.motion-section').forEach((section) => {
        const title = section.querySelector('.section-title');
        const kicker = section.querySelector('.section-kicker');
        const body = section.querySelector('.section-copy');
        const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.stagger-card'));
        const imageWraps = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.image-reveal'));
        const images = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.parallax-image'));

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 96%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
          defaults: { ease: 'power4.out' },
        });

        if (kicker) {
          timeline.from(kicker, {
            y: isSmallScreen ? 22 : 34,
            filter: isSmallScreen ? 'blur(4px)' : 'blur(10px)',
            opacity: 0,
            duration: 0.8,
          }, 0);
        }

        if (title) {
          timeline.from(title, {
            y: isSmallScreen ? 72 : 120,
            scaleX: isSmallScreen ? 0.86 : 0.72,
            transformOrigin: 'left center',
            filter: isSmallScreen ? 'blur(8px)' : 'blur(18px)',
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.25,
            force3D: true,
          }, 0.08);
        }

        if (body) {
          timeline.from(body, {
            y: isSmallScreen ? 28 : 44,
            filter: isSmallScreen ? 'blur(5px)' : 'blur(10px)',
            opacity: 0,
            duration: 0.9,
          }, 0.34);
        }

        if (cards.length) {
          gsap.fromTo(
            cards,
            {
              y: isSmallScreen ? 54 : 96,
              scale: isSmallScreen ? 0.98 : 0.94,
              filter: isSmallScreen ? 'blur(6px)' : 'blur(14px)',
              opacity: 0,
            },
            {
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              opacity: 1,
              duration: 1.05,
              stagger: 0.16,
              ease: 'power4.out',
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }

        imageWraps.forEach((wrap) => {
          const veil = wrap.querySelector('.image-veil');
          if (!veil) return;
          gsap.fromTo(
            veil,
            { xPercent: 0 },
            {
              xPercent: 104,
              duration: 1.15,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: wrap,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        });

        if (isSmallScreen) return;

        images.forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -5, scale: 1.08 },
            {
              yPercent: 5,
              scale: 1.13,
              ease: 'none',
              scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.65,
              },
            },
          );
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
