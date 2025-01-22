import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
    description: 'Minju Kim\'s Resume in Korean/English.',
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
}

export default Layout