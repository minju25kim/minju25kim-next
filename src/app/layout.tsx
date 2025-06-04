import { Providers } from "@/components/providers";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | minju25kim",
    default: "minju25kim",
  },
  description: "The official minju25kim website.",
  openGraph: {
    type: "website",
    title: {
      template: "%s | minju25kim",
      default: "minju25kim",
    },
    images: ["opengraph-image.webp"],
  },
  twitter: {
    images: ["opengraph-image.webp"],
    card: "summary_large_image",
  },
  metadataBase: new URL("https://minju25kim.fly.dev/"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon1.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icon0.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "minju25kim",
  },
  applicationName: "minju25kim",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Menu links
  const menuLinks = [
    { href: "/blog", label: "blog" },
    { href: "/dev", label: "dev" },
    { href: "/timeline", label: "timeline" },
    { href: "/video", label: "video" },
    { href: "/meta", label: "meta" },
  ];

  return (
    <html suppressHydrationWarning lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="MjAuu-Lc3CGp0xic4er0P409B4fueoITgV8_IAFPQLU"
        />
        <link rel="canonical" href="https://minju25kim.fly.dev" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
            {/* Logo (Avatar) */}
            <Link href="/" className="flex items-center gap-2">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/minju25kim.webp" alt="minju25kim" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="w-7 h-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 flex flex-col h-full">
                  <div className="flex-1 flex flex-col justify-center items-center w-full">
                    <SheetHeader className="w-full flex justify-center">
                      <SheetTitle className="text-center w-full">Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col items-center gap-4 w-full">
                      {menuLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <main className="flex-1 mt-16 ">{children}</main>
          <Footer />
        </Providers>

        <Script
          async src="https://www.googletagmanager.com/gtag/js?id=G-PHKNKBN90P"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-PHKNKBN90P');
     `}
        </Script>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
