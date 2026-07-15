"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-09-12T18:00:00");

const FLIP_DURATION = 600;

type TimeParts = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
};

function getTimeParts(target: Date, now: Date): TimeParts {
  if (now >= target) return { months: 0, days: 0, hours: 0, minutes: 0 };

  let months =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth());

  const probe = new Date(now);
  probe.setMonth(probe.getMonth() + months);
  if (probe > target) {
    months -= 1;
    probe.setMonth(probe.getMonth() - 1);
  }

  const remainingMs = target.getTime() - probe.getTime();
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  return { months, days, hours, minutes };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  const [current, setCurrent] = useState(display);
  const [previous, setPrevious] = useState(display);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (display === current) return;
    setPrevious(current);
    setCurrent(display);
    setFlipping(true);
  }, [display, current]);

  useEffect(() => {
    if (!flipping) return;
    const timeout = setTimeout(() => {
      setPrevious(current);
      setFlipping(false);
    }, FLIP_DURATION);
    return () => clearTimeout(timeout);
  }, [flipping, current]);

  return (
    <div className='flex flex-col items-center gap-2'>
      <div
        className='relative h-14 w-12 sm:h-16 sm:w-14'
        style={{ perspective: "300px" }}>
        <div
          className='absolute inset-0 flex items-center justify-center rounded-lg border border-primary bg-primary/70 text-2xl font-medium tabular-nums text-primary-foreground shadow-md'
          style={{
            backfaceVisibility: "hidden",
            transform: flipping ? "rotateX(-180deg)" : "rotateX(0deg)",
            transition: flipping
              ? `transform ${FLIP_DURATION}ms ease-in-out`
              : "none",
          }}>
          {previous}
        </div>
        <div
          className='absolute inset-0 flex items-center justify-center rounded-lg border border-primary bg-primary/70 text-2xl font-medium tabular-nums text-primary-foreground shadow-md'
          style={{
            backfaceVisibility: "hidden",
            transform: flipping ? "rotateX(0deg)" : "rotateX(180deg)",
            transition: flipping
              ? `transform ${FLIP_DURATION}ms ease-in-out`
              : "none",
          }}>
          {current}
        </div>
        <div className='pointer-events-none absolute inset-x-0 top-1/2 h-px bg-primary-foreground/10' />
      </div>
      <span className='text-[10px] font-semibold text-monte text-center text-black'>
        {label}
      </span>
    </div>
  );
}

export function FlipCountdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const { months, days, hours, minutes } = getTimeParts(TARGET_DATE, now);

  return (
    <div className='flex w-full flex-col items-center gap-4 -mt-2 mb-6 py-6 z-40'>
      <p className='text-cave text-center text-md text-accent-foreground '>
        We will be OPEN for your orders in ....
      </p>
      <div className='flex items-center gap-2'>
        <FlipUnit
          value={months}
          label='MONTHS'
        />
        <span className='mb-5 text-xl font-light text-foreground'>:</span>
        <FlipUnit
          value={days}
          label='DAYS'
        />
        <span className='mb-5 text-xl font-light text-foreground'>:</span>
        <FlipUnit
          value={hours}
          label='HOURS'
        />
        <span className='mb-5 text-xl font-light text-foreground'>:</span>
        <FlipUnit
          value={minutes}
          label='MINUTES'
        />
      </div>
    </div>
  );
}
