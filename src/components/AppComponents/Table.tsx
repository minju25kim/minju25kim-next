import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Content } from "@/interfaces/Data";
import { dateString } from "@/lib/utils";
import Views from "@/components/AppComponents/Views";

interface TableProps {
    directory: string;
    allContent: Content[];
}

function AppTable({ directory, allContent }: TableProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-[100px] text-center">Date</TableHead>
                    <TableHead className="w-[100px] text-center">Views</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allContent.map((post: Content) => {
                    return (
                        <TableRow key={post._id}>
                            <TableCell className="font-medium">
                                <Link href={`/${directory}/${post._id}`} key={post._id}>
                                    {post.title}
                                </Link>
                            </TableCell>
                            <TableCell className="text-center">{dateString(post.date)}</TableCell>
                            <TableCell className="text-center"><Views contentId={post._id} /></TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>

    )
}

export default AppTable;