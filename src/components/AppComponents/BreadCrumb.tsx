import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getContentById } from "@/lib/api";
import { ChevronDown } from "lucide-react";
import { headers } from "next/headers";

export default async function AppBreadCrumb() {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    const parts = pathname?.split('/').slice(1) || [];
    const [dir, id] = parts;
    async function getTitle(id: string) {
        const data = await getContentById(id)
        return data.title
    }

    return (
        <Breadcrumb className="flex justify-center md:justify-start md:pl-2">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">~</BreadcrumbLink>
                </BreadcrumbItem>
                {dir &&
                    <>
                        /
                        < BreadcrumbItem >
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1">
                                    <BreadcrumbLink href={`/${dir.toLowerCase()}`}>{dir.toLowerCase()}</BreadcrumbLink>
                                    <ChevronDown />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {['Dev', 'Resume', 'Terminology', 'TIL'].map((item) => (
                                        <DropdownMenuItem key={item}>
                                            <BreadcrumbLink href={`/${item.toLowerCase()}`}>{item}</BreadcrumbLink>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                    </>
                }
                {id &&
                    <>
                        /
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${dir}/${id}`}>{getTitle(id)}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                }

            </BreadcrumbList>
        </Breadcrumb >
    );
}
