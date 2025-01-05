import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"

type AppBreadCrumbProps = {
    directory?: string;
    slug?: string;
}

function AppBreadCrumb({ directory, slug }: AppBreadCrumbProps) {
    return (
        <Breadcrumb className="px-1 pt-2">
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