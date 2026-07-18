import { Montserrat, Caveat, Mynerve } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const mynerve = Mynerve({
  variable: "--font-mynerve",
  weight: "400",
  subsets: ["latin", "greek"],
});

export const brittany = localFont({
  src: "../public/fonts/BrittanySignatureScript.ttf",
  variable: "--font-brittany",
  display: "swap",
});

export const veneer = localFont({
  src: "../public/fonts/VeneerTwo.ttf",
  variable: "--font-veneer",
  display: "swap",
});
