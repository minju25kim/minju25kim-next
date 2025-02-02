import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getContentById } from "@/lib/api";
export default async function BreadcrumbSlot(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // Fetch our cat information from the database
    const content = await getContentById(params.id);

    return (
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink href="/til">til</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{content.title}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    );
}