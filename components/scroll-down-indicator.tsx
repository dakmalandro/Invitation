"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function ScrollDownIndicator({
  showLabel = false,
}: {
  showLabel?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // amber at rest, olive (the site's --accent) at the top of the breath
      const OLIVE = "#aca58b";
      const OLIVE_GLOW = "rgba(172,165,139,0.65)";

      gsap.set("[data-scroll-dot]", { y: 0 });

      // one shared timeline so the pill's scale, the dot's travel and the
      // amber->olive color shift all breathe in lockstep — yoyo handles the
      // reverse (scale down) automatically
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { duration: 1.15, ease: "sine.inOut" },
      });

      tl.to(
        "[data-scroll-mouse]",
        {
          scale: 1.16,
          borderColor: OLIVE,
          filter: `drop-shadow(0 0 6px ${OLIVE_GLOW})`,
        },
        0
      ).to(
        "[data-scroll-dot]",
        {
          y: 14,
          backgroundColor: OLIVE,
          boxShadow: `0 0 6px 1px ${OLIVE_GLOW}`,
        },
        0
      );

      if (showLabel) {
        tl.to("[data-scroll-badge]", { scale: 1.05 }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [showLabel]);

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className='pointer-events-none absolute inset-x-0 bottom-[clamp(0.75rem,3dvmin,1.5rem)] z-20 flex flex-col items-center gap-2.5'>
      {showLabel && (
        <span
          data-scroll-badge
          style={{
            backgroundColor: "#ffb703",
            boxShadow: "0 0 18px 2px rgba(255,183,3,0.65)",
          }}
          className='rounded-full px-4 py-1.5 text-fluid-2xs text-monte tracking-[0.2em] text-[#3d2b06]'>
          SCROLL DOWN
        </span>
      )}
      <div
        data-scroll-mouse
        style={{
          borderColor: "#ffb703",
          filter: "drop-shadow(0 0 6px rgba(255,183,3,0.65))",
        }}
        className='flex h-9 w-[1.35rem] shrink-0 items-start justify-center rounded-full border-2 pt-1.5'>
        <span
          data-scroll-dot
          style={{
            backgroundColor: "#ffb703",
            boxShadow: "0 0 6px 1px rgba(255,183,3,0.65)",
          }}
          className='h-1.5 w-1.5 shrink-0 rounded-full'
        />
      </div>
    </div>
  );
}
