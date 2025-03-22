import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from '@/fonts';
import Container from "@/components/AppComponents/Container"
import Footer from "@/components/AppComponents/Footer"

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
    images: ['opengraph-image.png'],
  },
  twitter: {
    images: ['opengraph-image.png'],
    card: 'summary_large_image'
  },
  metadataBase: new URL('https://minju25kim.fly.dev/'),
};

export default function RootLayout({ children, breadcrumb, }: Readonly<{ children: React.ReactNode, breadcrumb: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://minju25kim.fly.dev" />

        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="touch-icon-iphone.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="google-site-verification" content="MjAuu-Lc3CGp0xic4er0P409B4fueoITgV8_IAFPQLU" />
      </head>

      <body className={`${pretendard.className} antialiased`}>
        <div className="mx-auto container max-w-3xl grid-rows-[auto_auto_1fr_auto] min-h-[100dvh] p-4">
          <Container>
            {children}
          </Container>
          <Footer />
        </div>
      </body>
    </html>
  );
}
