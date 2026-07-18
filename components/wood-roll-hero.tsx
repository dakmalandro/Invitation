"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function WoodRollHero({
  hero,
  next,
}: {
  hero: React.ReactNode;
  next: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const progress = { value: 0 };

      const applyProgress = () => {
        // the pin's current position on screen, in % of viewport height
        // (>100 = still below the screen, <0 = already exited above it)
        const pinScreenPct = 120 - 140 * progress.value;

        // the roller box is exactly one viewport tall, so shifting it by
        // yPercent moves the (vertically centered) pin by the same amount
        gsap.set(rollerRef.current, { yPercent: pinScreenPct - 50 });

        // hero is clipped away from the bottom up, right up to where the
        // pin currently sits — so the next section shows through exactly
        // in the pin's wake, like it's painting it away as it rises
        const clipBottom = gsap.utils.clamp(0, 100, 100 - pinScreenPct);
        gsap.set(heroRef.current, {
          clipPath: `inset(0 0 ${clipBottom}% 0)`,
        });

        gsap.set(pinRef.current, {
          rotate: gsap.utils.interpolate(-10, 10, progress.value),
        });
      };

      applyProgress();

      gsap.to(progress, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: applyProgress,
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className='relative h-[200dvh] w-full max-w-md'>
      <div className='sticky top-0 h-dvh w-full overflow-hidden'>
        {/* preview of the next section, revealed as the hero gets clipped away */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-0'>
          {next}
        </div>

        <div
          ref={heroRef}
          className='absolute inset-0 z-10'>
          {hero}
        </div>

        <div
          ref={rollerRef}
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-30'>
          <div
            ref={pinRef}
            className='absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 drop-shadow-xl sm:h-40'>
            <Image
              src='/wood.png'
              alt=''
              fill
              className='object-contain'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
