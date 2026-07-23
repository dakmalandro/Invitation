import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { montserrat, brittany, veneer, caveat, mynerve } from "@/lib/fonts";
import { InAppViewportFix } from "@/components/in-app-viewport-fix";
import "./globals.css";

// runs before paint so the corrected height is applied on first render
// instead of flashing the broken lvh height and then snapping to fix —
// keep in sync with the detection in InAppViewportFix
const IN_APP_VIEWPORT_FIX_SCRIPT = `
(function () {
  if (!/Instagram|FBAN|FBAV/.test(navigator.userAgent)) return;
  document.documentElement.classList.add("ig-webview");
  document.documentElement.style.setProperty("--ig-vh", window.innerHeight + "px");
})();
`;

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
      // the in-app-viewport-fix script below mutates this tag's class/style
      // before hydration when it detects Instagram's webview
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${brittany.variable} ${veneer.variable} ${caveat.variable} ${mynerve.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="in-app-viewport-fix"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: IN_APP_VIEWPORT_FIX_SCRIPT }}
        />
        <InAppViewportFix />
        {children}
      </body>
    </html>
  );
}
