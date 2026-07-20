import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { montserrat, brittany, veneer, caveat, mynerve } from "@/lib/fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://georgearabas.org",
  ),
  title: "Βαπτίζεται ο George",
  description:
    "Σας προσκαλούμε στη βάπτιση του George, στις 12 Σεπτεμβρίου 2026.",
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${brittany.variable} ${veneer.variable} ${caveat.variable} ${mynerve.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
