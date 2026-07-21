"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DESTINATION_LAT = 41.1426889;
const DESTINATION_LNG = 24.8964629;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${DESTINATION_LAT},${DESTINATION_LNG}&travelmode=driving`;

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const driverRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const infoEls =
        sectionRef.current?.querySelectorAll<HTMLElement>(
          "[data-location-info]",
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
          infoEls,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          ">-0.1",
        )
        .from(
          mapRef.current,
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "<0.1",
        )
        .from(
          buttonRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "<0.2",
        )
        .from(
          driverRef.current,
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
      className='relative flex h-dvh w-full max-w-md flex-col items-center overflow-hidden bg-background'>
      <div
        ref={headerRef}
        className='flex flex-col items-center gap-0.5 pt-[clamp(0.75rem,4dvmin,2rem)]'>
        <Image
          src='/pin677x369.png'
          alt=''
          width={677}
          height={369}
          className='h-[clamp(1.75rem,7dvmin,2.5rem)] w-auto object-contain'
        />
        <h2 className='text-mynerve text-center text-fluid-3xl text-accent-foreground'>
          Πού θα είμαστε;
        </h2>
      </div>

      <div className='flex w-full flex-1 flex-col items-center justify-center-safe gap-[clamp(0.5rem,2dvmin,1rem)] overflow-y-auto px-[clamp(1.5rem,8dvmin,2.5rem)] py-[clamp(0.25rem,2dvmin,1rem)] text-center'>
        <p
          data-location-info
          className='text-monte text-fluid-base mb-4 leading-relaxed text-accent-foreground'>
          Η βάπτιση θα τελεστεί στον Ιερό Ναό όπου θα μοιραστούμε μαζί μια
          ξεχωριστή και ευλογημένη στιγμή.
        </p>

        <div
          data-location-info
          className='flex flex-col items-center gap-0.5'>
          <span className='text-monte text-fluid-base font-semibold mb-2 text-accent-foreground'>
            Τοποθεσία
          </span>
          <span className='text-monte text-fluid-2xl short:text-[16px] text-accent-foreground'>
            Ιερός Ναός Κωνσταντίνου και Ελένης
          </span>
        </div>

        <div
          ref={mapRef}
          className='relative aspect-square w-[clamp(11rem,45dvmin,15rem)] shrink-0 overflow-hidden rounded-full drop-shadow-lg'>
          <Image
            src='/location.png'
            alt='Χάρτης τοποθεσίας'
            fill
            className='object-cover'
          />
        </div>

        <a
          ref={buttonRef}
          href={DIRECTIONS_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-[clamp(0.25rem,1dvmin,0.5rem)] flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-fluid-sm text-monte tracking-widest text-primary-foreground shadow-md transition-colors hover:bg-primary/90'>
          <MapPin className='h-4 w-4 shrink-0' />
          ΟΔΗΓΙΕΣ / ΠΛΟΗΓΗΣΗ
        </a>
      </div>

      <div
        ref={driverRef}
        className='relative z-10 mt-auto w-full'>
        <div className='aspect-200/100 w-full overflow-hidden'>
          <Image
            src='/car.png'
            alt=''
            width={666}
            height={375}
            className='h-full w-full object-cover object-bottom brightness-80'
            preload
          />
        </div>
      </div>
    </section>
  );
}
