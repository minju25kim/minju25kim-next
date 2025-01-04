import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from '@/ui/fonts';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/Sidebar"
import Container from "@/components/Container"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    template: '%s | minju25kim',
    default: 'minju25kim',
  },
  description: 'The official minju25kim website.',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
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