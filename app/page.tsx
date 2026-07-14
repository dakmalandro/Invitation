import Image from "next/image";
import BackgroundVideo from "next-video/background-video";
import { IntroEnvelope } from "@/components/intro-envelope";
import hello3 from "@videos/hello3.mp4";

export default function Home() {
  return (
    <IntroEnvelope>
      <div className='flex min-h-dvh w-full justify-center bg-accent'>
        <div className='relative flex w-full max-w-md flex-col items-center bg-background'>
          <h1 className='text-brittany pt-8 text-center text-4xl text-accent-foreground sm:text-5xl'>
            Baptism Day
          </h1>

          <div className='flex w-full flex-col items-center'>
            <div className='mx-auto'>
              <Image
                src='/kiosk.png'
                alt=''
                width={500}
                height={500}
                className='h-full w-80 max-w-full object-cover'
                preload
              />
            </div>
            <div className='h-60 w-60 -mt-30  overflow-hidden rounded-full'>
              <BackgroundVideo
                src={hello3}
                controls={false}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='mx-auto'>
              <Image
                src='/bag.png'
                alt=''
                width={500}
                height={500}
                className='h-full w-80 max-w-full object-cover'
                preload
              />
            </div>
          </div>
        </div>
      </div>
    </IntroEnvelope>
  );
}
