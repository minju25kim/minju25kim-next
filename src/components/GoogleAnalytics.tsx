"use client";
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag ) {
      window.gtag("config", "G-PHKNKBN90P", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}