"use client";

import { useEffect } from "react";

// Instagram's (and Facebook's) in-app "safe browser" webview keeps its own
// persistent chrome on screen but doesn't subtract it from dvh/lvh the way
// real mobile browsers do, so those units end up reporting more height than
// is actually visible. window.innerHeight stays accurate there, so measure
// it directly and only apply the correction inside that specific webview.
function isInAppWebview() {
  return /Instagram|FBAN|FBAV/.test(navigator.userAgent);
}

export function InAppViewportFix() {
  useEffect(() => {
    if (!isInAppWebview()) return;

    document.documentElement.classList.add("ig-webview");

    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--ig-vh",
        `${window.innerHeight}px`,
      );
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    window.visualViewport?.addEventListener("resize", setHeight);

    return () => {
      window.removeEventListener("resize", setHeight);
      window.visualViewport?.removeEventListener("resize", setHeight);
    };
  }, []);

  return null;
}
