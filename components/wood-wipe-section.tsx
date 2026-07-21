"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollDownIndicator } from "@/components/scroll-down-indicator";

export function WoodWipeSection({
  children,
  zIndex,
  holdFraction = 0.4,
  showScrollLabel = false,
}: {
  children: React.ReactNode;
  zIndex: number;
  /** portion of the pin (0-1) the section spends fully static before the wipe runs */
  holdFraction?: number;
  /** show the "SCROLL DOWN" text badge above the chevrons, not just the arrows */
  showScrollLabel?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // mobile browsers resize the viewport as the address bar hides/shows
    // while scrolling; letting that trigger a recalculation desyncs the
    // pin timing from the dvh-based section heights and makes the next
    // section peek through mid-wipe.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const progress = { value: 0 };

      const applyProgress = () => {
        // the pin travels from below the viewport to above it, clipping the
        // current section away in its wake
        const pinScreenPct = 120 - 140 * progress.value;

        gsap.set(rollerRef.current, { yPercent: pinScreenPct - 50 });

        const clipBottom = gsap.utils.clamp(0, 100, 100 - pinScreenPct);
        gsap.set(contentRef.current, {
          clipPath: `inset(0 0 ${clipBottom}% 0)`,
        });

        gsap.set(pinRef.current, {
          rotate: gsap.utils.interpolate(-10, 10, progress.value),
        });
      };

      applyProgress();

      // the pin spans exactly one viewport of scroll — the same distance the
      // next section's own (unpinned) flow position needs to arrive at
      // top:0, so it lines up with zero gap once the wipe finishes.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.5,
          // pinSpacing: false keeps every following section already sitting
          // in place underneath, so nothing but the wood pin ever moves
          pin: true,
          pinSpacing: false,
        },
      });

      tl.to(progress, {
        value: 0,
        duration: holdFraction,
        onUpdate: applyProgress,
      }).to(progress, {
        value: 1,
        duration: 1 - holdFraction,
        ease: "none",
        onUpdate: applyProgress,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [holdFraction]);

  return (
    <div
      ref={sectionRef}
      style={{ zIndex }}
      // lvh (large viewport height) always matches the screen size with the
      // browser's toolbars fully retracted, so the section's own opaque
      // backing stays tall enough to sit behind the translucent address bar
      // no matter its current state — dvh instead shrinks to the visible
      // area and leaves whatever section sits document-adjacent showing
      // through that sliver
      className='pointer-events-none relative h-lvh w-full max-w-md overflow-hidden'>
      <div
        ref={contentRef}
        className='pointer-events-auto absolute inset-0'>
        {/* opaque backing, clipped together with children — some sections
            use a translucent background (e.g. bg-accent/60) that's meant to
            tint the page behind it, not the section stacked underneath here */}
        <div className='absolute inset-0 -z-10 bg-accent' />
        {children}
        <ScrollDownIndicator showLabel={showScrollLabel} />
      </div>

      <div
        ref={rollerRef}
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-10'>
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
  );
}
