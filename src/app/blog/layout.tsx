import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: 'Blog contents.'
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
}

export default Layout