"use client";

import { useActionState, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Form from "next/form";
import { ChefHat, Heart, Minus, Plus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { submitPresenceConfirmation } from "@/app/actions";
import { initialPresenceConfirmationState } from "@/lib/presence-confirmation-state";

const fieldLabelClass =
  "text-monte text-fluid-2xs tracking-widest text-accent-foreground/70";
const fieldControlClass =
  "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-monte text-fluid-base text-accent-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary";

function TextField({
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email";
}) {
  return (
    <label
      data-form-field
      className='flex w-full flex-col gap-1.5 text-left'>
      <span className={fieldLabelClass}>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={fieldControlClass}
      />
    </label>
  );
}

function AttendanceField() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const options: { value: "yes" | "no"; label: string }[] = [
    { value: "yes", label: "Ναι, με χαρά!" },
    { value: "no", label: "Δυστυχώς, δεν μπορώ" },
  ];

  return (
    <fieldset
      data-form-field
      className='flex w-full flex-col gap-1.5 text-left'>
      <legend className={fieldLabelClass}>ΘΑ ΠΑΡΕΥΡΕΘΕΙΤΕ; *</legend>
      <div className='flex flex-col gap-2'>
        {options.map((option) => (
          <label
            key={option.value}
            className='flex items-center gap-2.5 text-monte text-fluid-base text-accent-foreground'>
            <input
              type='radio'
              name='attending'
              value={option.value}
              checked={attending === option.value}
              onChange={() => setAttending(option.value)}
              required
              className='h-4 w-4 accent-primary'
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function StepperField({
  label,
  name,
  defaultValue,
  min = 0,
}: {
  label: string;
  name: string;
  defaultValue: number;
  min?: number;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div
      data-form-field
      className='flex w-full flex-col gap-1.5 text-left'>
      <span className={fieldLabelClass}>{label}</span>
      <div className='flex items-center overflow-hidden rounded-lg border border-input bg-card'>
        <button
          type='button'
          onClick={() => setValue((v) => Math.max(min, v - 1))}
          aria-label={`Μείωση - ${label}`}
          className='flex h-10 w-10 shrink-0 items-center justify-center text-accent-foreground transition-colors hover:bg-accent/40'>
          <Minus className='h-4 w-4' />
        </button>
        <span className='flex-1 text-center text-monte text-fluid-base text-accent-foreground'>
          {value}
        </span>
        <button
          type='button'
          onClick={() => setValue((v) => v + 1)}
          aria-label={`Αύξηση - ${label}`}
          className='flex h-10 w-10 shrink-0 items-center justify-center text-accent-foreground transition-colors hover:bg-accent/40'>
          <Plus className='h-4 w-4' />
        </button>
        <input
          type='hidden'
          name={name}
          value={value}
        />
      </div>
    </div>
  );
}

export function PresenceConfirmation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [state, formAction, pending] = useActionState(
    submitPresenceConfirmation,
    initialPresenceConfirmationState,
  );

  useEffect(() => {
    if (state.status !== "success" || !state.submittedAt) return;

    const origins = [
      { x: 0.2, y: 0.7 },
      { x: 0.5, y: 0.6 },
      { x: 0.8, y: 0.7 },
    ];

    origins.forEach((origin, i) => {
      window.setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 75,
          startVelocity: 35,
          origin,
          colors: ["#a37b4c", "#cdb99f", "#ede1cf", "#4a3f33"],
        });
      }, i * 150);
    });
  }, [state.submittedAt, state.status]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const fieldEls =
        sectionRef.current?.querySelectorAll<HTMLElement>(
          "[data-form-field]",
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
          fieldEls,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
          ">-0.1",
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
          imageRef.current,
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
        className='flex flex-col items-center gap-1.5 px-[clamp(1.5rem,8dvmin,2.5rem)] pt-[clamp(0.75rem,4dvmin,2rem)] text-center'>
        <ChefHat className='h-[clamp(1.5rem,6dvmin,2rem)] w-[clamp(1.5rem,6dvmin,2rem)] text-accent-foreground' />
        <h2 className='text-mynerve text-fluid-3xl text-accent-foreground leading-tight'>
          Επιβεβαιώστε την παρουσία σας
        </h2>
        <p className='text-monte text-fluid-sm leading-relaxed text-accent-foreground/70'>
          Σας παρακαλούμε ενημερώστε μας έως 20 Αυγούστου 2026
        </p>
      </div>

      <Form
        action={formAction}
        className='flex w-full min-h-0 flex-1 flex-col items-center gap-[clamp(0.75rem,3dvmin,1.25rem)] overflow-y-auto px-[clamp(1.5rem,8dvmin,2.5rem)] py-[clamp(0.5rem,2dvmin,1rem)]'>
        <TextField
          label='ΟΝΟΜΑΤΕΠΩΝΥΜΟ *'
          name='fullName'
          placeholder='π.χ. Μαρία Παπαδοπούλου'
          required
        />

        <AttendanceField />

        <StepperField
          label='ΑΡΙΘΜΟΣ ΕΝΗΛΙΚΩΝ *'
          name='adults'
          defaultValue={2}
          min={0}
        />

        <StepperField
          label='ΑΡΙΘΜΟΣ ΠΑΙΔΙΩΝ'
          name='children'
          defaultValue={1}
          min={0}
        />

        <TextField
          label='EMAIL *'
          name='email'
          type='email'
          placeholder='π.χ. maria@example.com'
          required
        />

        <button
          ref={buttonRef}
          type='submit'
          disabled={pending}
          className='mt-[clamp(0.25rem,1dvmin,0.5rem)] flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-fluid-sm text-monte tracking-widest text-primary-foreground shadow-md transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70'>
          {pending ? "ΑΠΟΣΤΟΛΗ..." : "ΑΠΟΣΤΟΛΗ"}
          <Heart className='h-4 w-4 shrink-0 fill-primary-foreground' />
        </button>

        {state.status === "error" && (
          <p className='text-monte text-fluid-2xs text-destructive text-center'>
            {state.message}
          </p>
        )}

        {state.status === "success" && (
          <p className='text-monte text-fluid-2xs text-accent-foreground text-center'>
            Ευχαριστούμε! Η παρουσία σας επιβεβαιώθηκε.
          </p>
        )}
      </Form>

      <div
        ref={imageRef}
        className='relative z-10 mt-auto w-full'>
        <div className='aspect-200/100 w-full -mb-10 overflow-hidden'>
          <Image
            src='/bye2.png'
            alt=''
            width={666}
            height={375}
            className='h-full w-full object-cover object-bottom'
            preload
          />
        </div>
      </div>
    </section>
  );
}
