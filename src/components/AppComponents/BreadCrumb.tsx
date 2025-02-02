'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getContentById } from "@/lib/api";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppBreadCrumb() {
    const pathname = usePathname();
    const parts = pathname?.split('/').slice(1) || [];
    const [dir, id] = parts;
    const [title, setTitle] = useState('');

    // Fetch title when id changes
    useEffect(() => {
        if (id) {
            getContentById(id).then(data => setTitle(data.title));
        } else {
            setTitle(''); // Reset title when no id
        }
    }, [id]);

    // Available sections for dropdown
    const sections = ['Dev', 'Resume', 'Terminology', 'TIL'];

    return (
        <Breadcrumb className="flex justify-center md:justify-start md:pl-2">
            <BreadcrumbList>
                {/* Home link */}
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">~</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Directory section */}
                {dir && (
                    <>
                        <BreadcrumbItem>
                            <span className="mx-1">/</span>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1">
                                    <BreadcrumbLink href={`/${dir.toLowerCase()}`}>
                                        {dir.toLowerCase()}
                                    </BreadcrumbLink>
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {sections.map((section) => (
                                        <DropdownMenuItem key={section}>
                                            <BreadcrumbLink href={`/${section.toLowerCase()}`}>
                                                {section}
                                            </BreadcrumbLink>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                    </>
                )}

                {/* Content section */}
                {id && (
                    <>
                        <BreadcrumbItem>
                            <span className="mx-1">/</span>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${dir}/${id}`}>
                                {title || 'Loading...'}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}