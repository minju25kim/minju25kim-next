import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | minju25kim',
    default: 'minju25kim',
  },
  description: 'The official minju25kim website.',
  openGraph: {
    type: 'website',
    title: {
      template: '%s | minju25kim',
      default: 'minju25kim',
    },
    images: ['opengraph-image.webp'],
  },
  twitter: {
    images: ['opengraph-image.webp'],
    card: 'summary_large_image'
  },
  metadataBase: new URL('https://minju25kim.fly.dev/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="MjAuu-Lc3CGp0xic4er0P409B4fueoITgV8_IAFPQLU" />

        <link rel="canonical" href="https://minju25kim.fly.dev" />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}
