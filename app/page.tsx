import Image from "next/image";
import BackgroundVideo from "next-video/background-video";
import { Heart } from "lucide-react";
import { IntroEnvelope } from "@/components/intro-envelope";
import { FlipCountdown } from "@/components/flip-countdown";
import { WoodRollHero } from "@/components/wood-roll-hero";
import hello3 from "@videos/hello3.mp4";

function HeroSection() {
  return (
    <section className='relative flex h-dvh w-full max-w-md flex-col items-center bg-background'>
      <h1 className='text-brittany pt-8 text-center text-4xl text-accent-foreground sm:text-5xl'>
        Baptism Day
      </h1>
      <div className='flex w-2/3 items-center gap-3 py-4'>
        <div className='h-0.5 flex-1 bg-accent' />
        <Heart className='h-4 w-4 shrink-0 fill-accent text-accent' />
        <div className='h-0.5 flex-1 bg-accent' />
      </div>
      <h1 className='text-[10px] font-extralight text-monte text-center text-accent-foreground pb-4'>
        ΣΑΣ ΠΡΟΣΚΑΛΟΥΜΕ ΣΤΗ ΒΑΠΤΙΣΗ ΜΟΥ
      </h1>

      <div className='flex h-full w-full flex-1 flex-col items-center'>
        <div className='relative mx-auto h-60 w-92 max-w-full overflow-hidden'>
          <Image
            src='/kiosk.png'
            alt=''
            width={448}
            height={558}
            className='-mt-34 w-full max-w-full'
            preload
          />
        </div>
        <div className='relative flex h-60 w-60 -mt-28 items-center justify-center'>
          <Image
            src='/baket.png'
            alt=''
            width={200}
            height={200}
            className='absolute -left-16 top-1/3 w-24 max-w-none -translate-y-1/2 -rotate-45'
          />
          <div className='h-60 w-60 overflow-hidden mt-4 rounded-full'>
            <BackgroundVideo
              src={hello3}
              controls={false}
              className='h-full w-full object-cover'
            />
          </div>
          <Image
            src='/baket.png'
            alt=''
            width={200}
            height={200}
            className='absolute -right-16 top-1/3 w-24 max-w-none -translate-y-1/2 rotate-45'
          />
          <Image
            src='/donut.png'
            alt=''
            width={200}
            height={200}
            className='absolute -left-16 bottom-10 w-20 max-w-none -translate-y-1/2'
          />
          <Image
            src='/donut.png'
            alt=''
            width={200}
            height={200}
            className='absolute -left-18 top-10 w-20 max-w-none -translate-y-1/2'
          />
          <Image
            src='/donut.png'
            alt=''
            width={200}
            height={200}
            className='absolute -right-16 bottom-10 w-20 max-w-none -translate-y-1/2'
          />
          <Image
            src='/donut.png'
            alt=''
            width={200}
            height={200}
            className='absolute -right-18 top-8 w-20 max-w-none -translate-y-1/2'
          />

          <Image
            src='/muffin.png'
            alt=''
            width={200}
            height={200}
            className='absolute -right-10 -bottom-5 w-20 max-w-none -translate-y-1/2 -rotate-45'
          />

          <Image
            src='/muffin.png'
            alt=''
            width={200}
            height={200}
            className='absolute -right-18 -bottom-12 w-20 max-w-none -translate-y-1/2 rotate-45'
          />

          <Image
            src='/muffin.png'
            alt=''
            width={200}
            height={200}
            className='absolute -left-10 -bottom-5 w-20 max-w-none -translate-y-1/2 rotate-45'
          />
          <Image
            src='/muffin.png'
            alt=''
            width={200}
            height={200}
            className='absolute -left-18 -bottom-12 w-20 max-w-none -translate-y-1/2 -rotate-45'
          />
        </div>

        <FlipCountdown />

        <div className='mt-auto w-full'>
          <div className='aspect-448/255 w-full -mt-14 overflow-hidden'>
            <Image
              src='/bag.png'
              alt=''
              width={500}
              height={500}
              className='h-full w-full object-cover object-bottom'
              preload
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ComingSoonSection() {
  return (
    <section className='relative flex h-dvh w-full max-w-md flex-col items-center justify-center bg-background'>
      <h2 className='text-brittany text-center text-3xl text-accent-foreground sm:text-4xl'>
        Coming soon
      </h2>
    </section>
  );
}

export default function Home() {
  return (
    <IntroEnvelope>
      <div className='flex w-full flex-col items-center bg-accent'>
        <WoodRollHero
          hero={<HeroSection />}
          next={<ComingSoonSection />}
        />

        {/* next page — placeholder, content TBD */}
        <ComingSoonSection />
      </div>
    </IntroEnvelope>
  );
}
