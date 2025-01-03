import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: '%s',
        default: 'minju25kim',
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}