import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dev",
    description: 'Dev blog contents.'
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
}

export default Layout