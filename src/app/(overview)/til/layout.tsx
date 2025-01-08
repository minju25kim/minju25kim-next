import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TIL",
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
}

export default Layout