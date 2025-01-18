import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Post } from "@/interfaces/Data";
import { dateString } from "@/lib/utils";

interface TableProps {
    directory: string;
    allPosts: Post[];
}

function AppTable({ directory, allPosts }: TableProps) {

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
                {allPosts.map((post: Post) => {
                    return (
                        <TableRow key={post._id}>
                            <TableCell className="font-medium">
                                <Link href={`/${directory}/${post._id}`} key={post._id}>
                                    {post.title}
                                </Link>
                            </TableCell>
                            <TableCell className="text-center">{dateString(post.date)}</TableCell>
                            <TableCell className="text-center">0</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>

    )
}

export default AppTable;