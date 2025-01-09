"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";


function AppBreadCrumb() {
    const pathname = usePathname();
    const [directory, slug] = pathname
        .split("/")
        .filter((segment) => segment.length > 0);

    return (
        <Breadcrumb className="px-1">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">~</BreadcrumbLink>
                </BreadcrumbItem>

                {
                    directory &&
                    <>
                        /
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${directory}`}>{directory}</BreadcrumbLink>
                        </BreadcrumbItem>

                    </>
                }
                {
                    slug &&
                    <>
                        /
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${directory}/${slug}`}>{slug}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                }
            </BreadcrumbList>
        </Breadcrumb >
    );
}

export default AppBreadCrumb;