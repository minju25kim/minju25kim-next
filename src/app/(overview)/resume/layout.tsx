import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
}

export default Layout