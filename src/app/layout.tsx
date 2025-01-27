import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from '@/ui/fonts';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppComponents/Sidebar"
import Container from "@/components/AppComponents/Container"
import Footer from "@/components/AppComponents/Footer"
import { cookies } from "next/headers"
// import Header from "@/components/AppComponents/Header";
import BreadCrumb from '@/components/AppComponents/BreadCrumb'
import Search from '@/components/AppComponents/Search'

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

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()

  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

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
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div className="mx-auto w-full container max-w-2xl grid grid-rows-[auto_auto_1fr_auto] gap-4 min-h-screen p-4">
            <header className='flex flex-row items-center justify-between w-full'>
              <SidebarTrigger />
              <Search />
            </header>
            {/* <BreadCrumb  /> */}
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
