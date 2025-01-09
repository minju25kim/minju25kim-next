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