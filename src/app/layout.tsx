import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from '@/ui/fonts';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/Sidebar"
import Container from "@/components/Container"
import Footer from "@/components/Footer"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: {
    template: '%s | minju25kim',
    default: 'minju25kim',
  },
  description: 'The official minju25kim website.',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
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
          <AppSidebar />
          <SidebarTrigger className="sticky" />
          <Container>
            {children}
          </Container>
        </SidebarProvider>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;