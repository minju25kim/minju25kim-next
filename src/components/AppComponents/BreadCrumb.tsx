"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTitle } from "@/lib/api";

function AppBreadCrumb() {
    const pathname = usePathname();
    const [directory, id] = pathname
        .split("/")
        .filter((segment) => segment.length > 0);

    const [title, setTitle] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            async function getTitle() {
                const title = await fetchTitle(id);
                setTitle(title);
            }
            getTitle();
        }
    }, [id]);
    
    return (
        <Breadcrumb className="flex justify-center md:justify-start md:pl-2">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">~</BreadcrumbLink>
                </BreadcrumbItem>

                {directory && (
                    <>
                        /
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${directory}`}>{directory}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
                {title && (
                    <>
                        /
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${directory}/${id}`}>{title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default AppBreadCrumb;
