import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getContentById } from "@/lib/api";

export default async function BreadcrumbSlot(props: { params: Promise<{ id: string }> }) {
	// Fetch our cat information from the database
	const params = await props.params;
	const content = await getContentById(params.id);

	return (
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/terminology">terminology</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>{content.title}</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	);
}