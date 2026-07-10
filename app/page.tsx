import Image from "next/image";
import { IntroEnvelope } from "@/components/intro-envelope";

export default function Home() {
  return (
    <IntroEnvelope>
      <div className='flex flex-col flex-1 items-center justify-center bg-background font-sans'>
        <main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-card rounded-2xl sm:items-start'>
          <Image
            className='opacity-70'
            src='/next.svg'
            alt='Next.js logo'
            width={100}
            height={20}
            priority
          />
          <div className='flex bg-accent flex-col items-center gap-6 text-center sm:items-start sm:text-left'>
            <h1 className='max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground'>
              To get started, edit the page.tsx file.
            </h1>
            <p className='max-w-md text-lg text-veneer leading-8 text-muted-foreground'>
              Καλημέρα
              <br />
              <a
                href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
                className='font-medium text-foreground underline underline-offset-4'>
                Templates
              </a>{" "}
              or the{" "}
              <a
                href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
                className='font-medium text-foreground underline underline-offset-4'>
                Learning
              </a>{" "}
              center.
            </p>
          </div>
          <div className='flex flex-col gap-4 text-base font-medium sm:flex-row'>
            <a
              className='flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/85 md:w-39.5'
              href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
              target='_blank'
              rel='noopener noreferrer'>
              <Image
                className='invert'
                src='/vercel.svg'
                alt='Vercel logomark'
                width={16}
                height={16}
              />
              Deploy Now
            </a>
            <a
              className='flex h-12 w-full items-center justify-center rounded-full bg-secondary px-5 text-secondary-foreground transition-colors hover:bg-secondary/80 md:w-39.5'
              href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
              target='_blank'
              rel='noopener noreferrer'>
              Documentation
            </a>
          </div>
        </main>
      </div>
    </IntroEnvelope>
  );
}
