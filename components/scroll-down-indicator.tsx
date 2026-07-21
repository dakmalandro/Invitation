"use client";

import { useLayoutEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";

export function ScrollDownIndicator({
  showLabel = false,
}: {
  showLabel?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chevrons = gsap.utils.toArray<HTMLElement>("[data-scroll-chevron]");

      gsap.set(chevrons, { opacity: 0.25, y: -6 });
      gsap.to(chevrons, {
        opacity: 1,
        y: 6,
        duration: 0.55,
        ease: "power1.out",
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true,
        },
      });

      if (showLabel) {
        gsap.to("[data-scroll-badge]", {
          scale: 1.05,
          duration: 0.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [showLabel]);

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className='pointer-events-none absolute inset-x-0 bottom-[clamp(0.75rem,3dvmin,1.5rem)] z-20 flex flex-col items-center gap-1'>
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
      <div className='flex flex-col items-center -space-y-2.5'>
        <ChevronDown
          data-scroll-chevron
          style={{
            color: "#ffb703",
            filter: "drop-shadow(0 0 6px rgba(255,183,3,0.65))",
          }}
          className='h-5 w-5'
        />
        <ChevronDown
          data-scroll-chevron
          style={{
            color: "#ffb703",
            filter: "drop-shadow(0 0 6px rgba(255,183,3,0.65))",
          }}
          className='h-5 w-5'
        />
      </div>
    </div>
  );
}
