import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terminology",
    description: 'Terminology summaries.',
  };

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
}

export default Layout