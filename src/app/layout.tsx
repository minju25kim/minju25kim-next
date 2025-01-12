import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from '@/ui/fonts';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppComponents/Sidebar"
import Container from "@/components/AppComponents/Container"
import Footer from "@/components/AppComponents/Footer"
import { cookies } from "next/headers"
import Header from "@/components/AppComponents/Header";

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
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="touch-icon-iphone.png" />

        <meta name="google-site-verification" content="MjAuu-Lc3CGp0xic4er0P409B4fueoITgV8_IAFPQLU" />
        <meta property="twitter:image" content="/opengraph-image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="opengraph-image.png" />
        <meta property="twitter:description" content="Minju25kim dev blog" />
        <meta property="description" content="Minju25kim dev blog" />
        <meta property="og:image" content="/opengraph-image.png.png" />
        <meta property="og:site_name" content="Minju25kim.fly.dev" />
        <meta property="og:title" content="Minju25kim" />
        <meta property="og:description" content="Minju25kim dev blog" />
        <meta property="og:url" content="minju25kim.fly.dev" />
      </head>
      <body className={`${pretendard.className} antialiased`}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SidebarTrigger className="fixed" />
          <AppSidebar />
          <div className="container mx-auto max-w-7xl grid grid-rows-[auto_1fr_auto] gap-4 min-h-screen w-full pt-12 px-4">
            <Header />
            <Container>
              {children}
            </Container>
            <Footer />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

export default RootLayout;