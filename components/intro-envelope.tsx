"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const STORAGE_KEY = "invitation:intro-seen";

const PAPER_TEXTURE = "/paper.jpg";

function paperLayer(tint: string, shade: string): React.CSSProperties {
  return {
    backgroundColor: tint,
    backgroundImage: `${shade}, url(${PAPER_TEXTURE})`,
    backgroundSize: "cover, cover",
    backgroundPosition: "center, center",
    backgroundBlendMode: "multiply, multiply",
  };
}

const ENVELOPE_TINT = "var(--background)";

function SeamLines({ lines }: { lines: [number, number, number, number][] }) {
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
      className='pointer-events-none absolute inset-0 h-full w-full'>
      {lines.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke='rgba(0,0,0,0.22)'
          strokeWidth={0.6}
          vectorEffect='non-scaling-stroke'
        />
      ))}
    </svg>
  );
}

export function IntroEnvelope({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"intro" | "done">("intro");
  const isAnimatingRef = useRef(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const pocketRef = useRef<HTMLDivElement>(null);
  const leftFlapRef = useRef<HTMLDivElement>(null);
  const rightFlapRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const sealImageRef = useRef<HTMLDivElement>(null);
  const pulseTween = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";

    pulseTween.current = gsap.to(sealImageRef.current, {
      scale: 1.06,
      duration: 1.1,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      pulseTween.current?.kill();
      document.body.style.overflow = "";
    };
  }, []);

  const handleOpen = () => {
    if (isAnimatingRef.current || phase === "done") return;
    isAnimatingRef.current = true;
    pulseTween.current?.kill();

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        sessionStorage.setItem(STORAGE_KEY, "true");
        gsap.set(contentRef.current, { clearProps: "all" });
        document.body.style.overflow = "";
        setPhase("done");
        isAnimatingRef.current = false;
      },
    });

    tl.to(sealRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.35,
      ease: "back.in(2)",
    })
      .to(
        flapRef.current,
        {
          rotateX: -175,
          transformPerspective: 1000,
          duration: 0.8,
        },
        "-=0.15",
      )
      .to(flapRef.current, { opacity: 0, duration: 0.3 }, "-=0.25")
      .to(
        contentRef.current,
        {
          opacity: 1,
          scale: 0.42,
          y: "-6%",
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.6",
      )
      .to(
        [pocketRef.current, leftFlapRef.current, rightFlapRef.current],
        { opacity: 0, y: 24, duration: 0.4 },
        "-=0.35",
      )
      .to(backRef.current, { opacity: 0, scale: 0.85, duration: 0.5 }, "-=0.35")
      .to(
        contentRef.current,
        { scale: 1, y: "0%", duration: 1.1, ease: "power3.inOut" },
        "-=0.2",
      );
  };

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <>
      <div
        ref={contentRef}
        aria-hidden='true'
        className='pointer-events-none fixed inset-0 z-[41] flex flex-col overflow-hidden'
        style={{
          transform: "scale(0.14) translateY(6%)",
          opacity: 0,
          transformOrigin: "50% 50%",
        }}>
        {children}
      </div>

      <div
        ref={backRef}
        className='fixed inset-0 z-[40]'>
        <div
          className='absolute left-1/2 top-1/2 h-56 w-80 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-2xl ring-1 ring-black/10 sm:h-64 sm:w-96'
          style={paperLayer(
            ENVELOPE_TINT,
            "linear-gradient(155deg, rgba(255,255,255,0.25), transparent 45%, rgba(0,0,0,0.08))",
          )}
        />
      </div>

      <div className='fixed inset-0 z-[42]'>
        <div className='relative left-1/2 top-1/2 h-56 w-80 -translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-96'>
          <div
            ref={leftFlapRef}
            className='absolute inset-0'
            style={{
              clipPath: "polygon(0% 0%, 0% 100%, 50% 50%)",
              ...paperLayer(
                ENVELOPE_TINT,
                "linear-gradient(to right, rgba(0,0,0,0.12), transparent 60%)",
              ),
            }}>
            <SeamLines
              lines={[
                [0, 0, 50, 50],
                [0, 100, 50, 50],
              ]}
            />
          </div>
          <div
            ref={rightFlapRef}
            className='absolute inset-0'
            style={{
              clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)",
              ...paperLayer(
                ENVELOPE_TINT,
                "linear-gradient(to left, rgba(0,0,0,0.12), transparent 60%)",
              ),
            }}>
            <SeamLines
              lines={[
                [100, 0, 50, 50],
                [100, 100, 50, 50],
              ]}
            />
          </div>
          <div
            ref={pocketRef}
            className='absolute inset-0'
            style={{
              clipPath: "polygon(0% 100%, 100% 100%, 50% 50%)",
              ...paperLayer(
                ENVELOPE_TINT,
                "linear-gradient(to top, rgba(0,0,0,0.14), transparent 55%)",
              ),
            }}>
            <SeamLines
              lines={[
                [0, 100, 50, 50],
                [100, 100, 50, 50],
              ]}
            />
          </div>
          <div
            ref={flapRef}
            className='absolute inset-0 shadow-md [backface-visibility:hidden]'
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 50%)",
              transformOrigin: "50% 0%",
              ...paperLayer(
                ENVELOPE_TINT,
                "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent 40%, rgba(0,0,0,0.18))",
              ),
            }}>
            <SeamLines
              lines={[
                [0, 0, 50, 50],
                [100, 0, 50, 50],
              ]}
            />
          </div>
          <button
            ref={sealRef}
            type='button'
            onClick={handleOpen}
            aria-label='Άνοιξε την πρόσκληση'
            className='group absolute left-1/2 top-[45%] flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-2 focus:outline-none'>
            <span className='text-brittany text-2xl text-foreground drop-shadow-sm sm:text-3xl'>
              press here
            </span>
            <div
              ref={sealImageRef}
              className='relative h-30 w-24 drop-shadow-lg transition-transform duration-200 group-active:scale-90 sm:h-24 sm:w-[4.75rem]'>
              <Image
                src='/gFiles/gFile.png'
                alt=''
                fill
                sizes='96px'
                className='pointer-events-none select-none object-contain mix-blend-multiply'
                preload
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
