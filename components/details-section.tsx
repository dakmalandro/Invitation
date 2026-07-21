import Image from "next/image";
import { ChefHat, Heart } from "lucide-react";
import {
  AddToCalendar,
  type CalendarEvent,
} from "@/components/add-to-calendar";

const EVENT: CalendarEvent = {
  title: "George Baptism Day ❤️",
  // 12/09/2026, 18:00–21:00 Athens time (EEST, UTC+3) → 15:00–18:00 UTC
  start: new Date("2026-09-12T15:00:00Z"),
  end: new Date("2026-09-12T18:00:00Z"),
  locationUrl: "https://maps.app.goo.gl/oSWt7UYK8dCXf7Tn8",
  // TODO: swap for the real domain once the invitation is deployed
  invitationUrl: "https://georgearabas.org",
};

function ScallopedDivider() {
  return (
    <div
      aria-hidden='true'
      className='h-4 w-full'
      style={{
        backgroundImage:
          "radial-gradient(circle at 12px 0, transparent 12px, var(--accent) 12.5px)",
        backgroundSize: "24px 24px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

function DottedHeartDivider() {
  return (
    <div className='flex w-2/3 items-center gap-3 mt-[clamp(0.25rem,2dvmin,1rem)]'>
      <div className='h-px flex-1 border-t border border-accent' />
      <Heart className='h-3 w-3 shrink-0 fill-accent text-accent' />
      <div className='h-px flex-1 border-t border border-accent' />
    </div>
  );
}

function PeopleRow({ label, names }: { label: string; names: string }) {
  return (
    <div className='flex flex-col items-center gap-1 px-4'>
      <span className='text-mynerve  text-sm short:text-[80%] tracking-widest text-accent-foreground/70'>
        {label}
      </span>
      <span className='text-monte text-md short:text-[75%] text-accent-foreground'>
        {names}
      </span>
    </div>
  );
}

function DateTag() {
  return (
    <div className='relative flex items-center'>
      <div className='absolute -left-[clamp(0.5rem,2.2dvmin,1.125rem)] h-[clamp(0.625rem,2.2dvmin,1rem)] w-[clamp(0.625rem,2.2dvmin,1rem)] rounded-full bg-primary' />
      <div className='rounded-full bg-primary px-[clamp(1rem,7dvmin,4rem)] py-[clamp(0.3rem,1.6dvmin,0.5rem)] text-monte text-fluid-sm tracking-widest text-primary-foreground shadow-md whitespace-nowrap'>
        12 | 09 | 2026
      </div>
      <div className='absolute -right-[clamp(0.5rem,2.2dvmin,1.125rem)] h-[clamp(0.625rem,2.2dvmin,1rem)] w-[clamp(0.625rem,2.2dvmin,1rem)] rounded-full bg-primary' />
    </div>
  );
}

export function DetailsSection() {
  return (
    <section className='relative flex h-dvh w-full max-w-md flex-col items-center overflow-x-hidden bg-background'>
      <div className='flex flex-col items-center gap-0.5 pt-[clamp(0.75rem,4dvmin,2rem)]'>
        <Image
          src='/heart484x516.png'
          alt=''
          width={484}
          height={516}
          className='h-[clamp(2rem,10dvmin,4rem)] big:h-18 w-auto object-contain'
        />
        <h2 className='text-mynerve text-center text-fluid-3xl text-accent-foreground'>
          Λεπτομέρειες
        </h2>
      </div>

      <div className='flex w-full flex-1 flex-col items-center justify-center-safe overflow-y-auto gap-[clamp(0.375rem,1.6dvmin,0.75rem)] px-[clamp(1rem,6dvmin,2rem)] py-[clamp(0.25rem,2dvmin,1rem)] text-center'>
        <p className='text-cave text-lg big:text-2xl big:leading-6 big:-mt-10  -mt-1.5 text-accent-foreground leading-snug'>
          Με χαρά σας προσκαλούμε <br />
          στη βάπτιση του γιου μας
        </p>

        <h3 className='text-brittany text-[120%] big:pb-4 big:mt-2 big:text-4xl mt-[clamp(0.25rem,1dvmin,0.5rem)] text-accent-foreground'>
          George
        </h3>

        <DottedHeartDivider />

        <PeopleRow
          label='ΓΟΝΕΙΣ'
          names='Μαυρουδής Αραμπατζής & Γεωργία Κουσαρίδου'
        />
        <PeopleRow
          label='ΑΔΕΛΦΙΑ'
          names='Σμαράγδα Αραμπατζή'
        />
        <PeopleRow
          label='ΝΟΝΑ'
          names='Τριανταφυλλιά Ζαχαριάδου'
        />

        <div className='mt-[clamp(0.5rem,2dvmin,1rem)]'>
          <DateTag />
        </div>
        <span className='text-monte text-fluid-base tracking-widest mt-[clamp(0.25rem,1dvmin,0.5rem)] text-accent-foreground/70'>
          ΣΑΒΒΑΤΟ - 04:00 μ.μ.
        </span>

        <p className='max-w-[85%] big:mt-1 text-monte text-[75%] big:text-[16px] mt-[clamp(0.25rem,1dvmin,0.5rem)] leading-relaxed text-accent-foreground'>
          Ετοιμαστείτε για μια γλυκιά περιπέτεια! Θα έχει ψωμάκια, χαμόγελα και
          πολύ αγάπη! Σας περιμένουμε να φουρνίσουμε μαζί τις πιο όμορφες
          αναμνήσεις!
        </p>
      </div>

      <div className='w-full '>
        <ScallopedDivider />
        <div className='flex flex-col items-center gap-[clamp(0.375rem,1.6dvmin,0.75rem)] bg-accent/60 py-6'>
          <AddToCalendar event={EVENT} />
          <h3 className='text-brittany text-2xl mt-2 text-accent-foreground'>
            Save the Date
          </h3>
          {/* <p className='text-monte text-xs tracking-widest text-accent-foreground/70'>
            ΜΗΝ ΤΟ ΧΑΣΕΤΕ!
          </p> */}
        </div>
      </div>
    </section>
  );
}
