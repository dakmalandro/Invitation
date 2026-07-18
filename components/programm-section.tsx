"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Church, Camera, Croissant, Donut, Citrus, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

function ProgramIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-[clamp(2.25rem,7.5dvmin,2.75rem)] w-[clamp(2.25rem,7.5dvmin,2.75rem)] shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary shadow-sm [&>svg]:h-[clamp(1.1rem,3.8dvmin,1.375rem)] [&>svg]:w-auto'>
      {children}
    </div>
  );
}

function ProgramRow({
  time,
  icon,
  title,
  subtitle,
  connector = true,
}: {
  time?: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  connector?: boolean;
}) {
  return (
    <>
      <span
        data-program-row
        className='self-start pt-[clamp(0.4rem,1.6dvmin,0.65rem)] text-right text-monte text-fluid-sm text-accent-foreground/70 whitespace-nowrap'>
        {time}
      </span>
      <div
        data-program-row
        className='flex flex-col items-center'>
        <ProgramIcon>{icon}</ProgramIcon>
        {connector && (
          <div className='w-px flex-1 border-l border-dashed border-primary/50' />
        )}
      </div>
      <div
        data-program-row
        className={cn(
          "flex flex-col justify-start gap-0.5",
          connector &&
            "pb-[clamp(1.25rem,5.5dvmin,2.5rem)] short:pb-[clamp(0.5rem,3dvmin,1rem)]",
        )}>
        <h3 className='text-monte text-fluid-base font-medium text-accent-foreground'>
          {title}
        </h3>
        {subtitle && (
          <p className='text-monte text-fluid-2xs text-accent-foreground/60'>
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
}

export function ProgrammSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const plantRef = useRef<HTMLDivElement>(null);
  const babyRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rowEls =
        sectionRef.current?.querySelectorAll<HTMLElement>(
          "[data-program-row]",
        ) ?? [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(headerRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          rowEls,
          {
            y: 22,
            opacity: 0,
            scale: 0.9,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.07,
          },
          ">-0.1",
        )
        .from(
          plantRef.current,
          {
            opacity: 0,
            x: 24,
            duration: 0.9,
            ease: "power2.out",
          },
          "<",
        )
        .from(
          babyRef.current,
          {
            opacity: 0,
            y: 32,
            duration: 0.9,
            ease: "power2.out",
          },
          "<",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative flex h-dvh w-full max-w-md flex-col items-center overflow-hidden bg-accent/60'>
      <div
        ref={plantRef}
        className='pointer-events-none absolute -right-7 top-1/2 z-0 h-2/3 w-1/3 -translate-y-1/2'>
        <Image
          src='/plant211x1181.png'
          alt=''
          fill
          className='object-contain object-right brightness-90'
        />
      </div>

      <div
        ref={headerRef}
        className='relative z-10 flex flex-col items-center gap-0.5 pt-[clamp(0.75rem,4dvmin,2rem)]'>
        <Image
          src='/hat552x452.png'
          alt=''
          width={552}
          height={452}
          className='h-[clamp(2.5rem,9dvmin,3.75rem)] w-auto object-contain'
        />
        <h2 className='text-mynerve text-center text-fluid-3xl text-accent-foreground'>
          Πρόγραμμα
        </h2>
      </div>

      <div className='relative z-10 grid w-full flex-1 grid-cols-[clamp(2.75rem,7.5dvmin,3.5rem)_clamp(2.25rem,7.5dvmin,2.75rem)_1fr] content-center items-stretch gap-x-[clamp(0.5rem,2dvmin,0.875rem)] overflow-y-auto px-[clamp(1rem,6dvmin,2rem)] pt-[clamp(0.5rem,2dvmin,1rem)] pb-[clamp(2.75rem,9dvh,3.75rem)]'>
        <ProgramRow
          time='16:00'
          icon={<Church />}
          title='Τελετή'
          subtitle='Ιερός Ναός Αγίου Δημητρίου'
        />
        <ProgramRow
          time='17:00'
          icon={<Camera />}
          title='Φωτογραφίες & Ευχές'
          subtitle='Στην αυλή της εκκλησίας'
        />
        <ProgramRow
          time='17:30'
          icon={<Croissant />}
          title="George's Bakery Buffet"
        />
        <ProgramRow
          time='18:00'
          icon={<Donut />}
          title='Sweet Corner'
        />
        <ProgramRow
          time='18:30'
          icon={<Citrus />}
          title='Γωνία Λεμονάδας'
        />
        <ProgramRow
          icon={<Heart className='fill-primary' />}
          title='... μέχρι να τελειώσουν τα γλυκά.'
          connector={false}
        />
      </div>

      <div
        ref={babyRef}
        className='relative z-10 mt-auto w-full'>
        <div className='aspect-40/40 w-full -mb-26 -mt-24 overflow-hidden'>
          <Image
            src='/baby3448x558.png'
            alt=''
            width={3448}
            height={558}
            className='h-full w-full object-cover object-bottom'
            preload
          />
        </div>
      </div>
    </section>
  );
}
