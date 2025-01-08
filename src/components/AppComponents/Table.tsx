import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Post } from "@/interfaces/post";

interface TableProps {
    directory: string;
    allPosts: Post[];
}



function AppTable({ directory, allPosts }: TableProps) {
    const dateString = (date: string) => new Date(date).toISOString().split('T')[0].replace(/-/g, '/');

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
                        <TableRow key={post.slug}>
                            <TableCell className="font-medium">
                                <Link href={`/${directory}/${post.slug}`} key={post.slug}>
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