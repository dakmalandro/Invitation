"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const OLIVE = "#aca58b";
const OLIVE_GLOW = "rgba(172,165,139,0.65)";
const AMBER = "#ffb703";
const AMBER_GLOW = "rgba(255,183,3,0.65)";
const IDLE_MS = 3000;

function BigScrollPill() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-hint-dot]", { y: 0 });
      gsap
        .timeline({
          repeat: -1,
          yoyo: true,
          defaults: { duration: 1.15, ease: "sine.inOut" },
        })
        .to(
          "[data-hint-mouse]",
          {
            scale: 1.16,
            borderColor: OLIVE,
            filter: `drop-shadow(0 0 10px ${OLIVE_GLOW})`,
          },
          0,
        )
        .to(
          "[data-hint-dot]",
          {
            y: 26,
            backgroundColor: OLIVE,
            boxShadow: `0 0 10px 2px ${OLIVE_GLOW}`,
          },
          0,
        );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef}>
      <div
        data-hint-mouse
        style={{
          borderColor: AMBER,
          filter: `drop-shadow(0 0 10px ${AMBER_GLOW})`,
        }}
        className='flex h-16 w-10 shrink-0 items-start justify-center rounded-full border-[3px] pt-2.5'>
        <span
          data-hint-dot
          style={{
            backgroundColor: AMBER,
            boxShadow: `0 0 10px 2px ${AMBER_GLOW}`,
          }}
          className='h-2.5 w-2.5 shrink-0 rounded-full'
        />
      </div>
    </div>
  );
}

/**
 * Center-screen "keep scrolling" popup for sections that pin the page
 * without any other visual feedback. Appears over a darkened, blurred
 * backdrop once the user stops scrolling for a beat while the section is
 * active, and disappears the instant they scroll again.
 */
export function ScrollIdleHint({ active }: { active: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => setMounted(true), []);

  // dismisses the popup and restarts the idle countdown — used for both
  // scroll and a direct tap on the backdrop
  const arm = useCallback(() => {
    setVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (activeRef.current) {
      timerRef.current = setTimeout(() => setVisible(true), IDLE_MS);
    }
  }, []);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    arm();
    window.addEventListener("scroll", arm, { passive: true });
    return () => {
      window.removeEventListener("scroll", arm);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, arm]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={arm}
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/55 backdrop-blur-md transition-opacity ${
        visible
          ? "pointer-events-auto opacity-100 duration-500"
          : "pointer-events-none opacity-0 duration-200"
      }`}>
      <BigScrollPill />
    </div>,
    document.body,
  );
}
