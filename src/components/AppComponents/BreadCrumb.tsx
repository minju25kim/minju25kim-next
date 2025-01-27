import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { getContentById } from "@/lib/api";

type Props = {
    currentUrl: string;
}


function AppBreadCrumb({ currentUrl }: Props) {
    console.log(currentUrl)
    return (
        <Breadcrumb className="flex justify-center md:justify-start md:pl-2">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">~</BreadcrumbLink>
                </BreadcrumbItem>

                {/* {directory && (
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
                )} */}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default AppBreadCrumb;
