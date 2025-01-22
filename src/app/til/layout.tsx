import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TIL",
  description: 'Today I Learn.',
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
}

export default Layout