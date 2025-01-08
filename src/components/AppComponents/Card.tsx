import {
    Card,
    // CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Post } from '@/interfaces/post'
import Link from "next/link";
import Keywords from "./Keywords";

interface CardProps {
    directory: string;
    allPosts: Post[];
}


export default function AppCard({ directory, allPosts }: CardProps) {
    const dateString = (date: string) => new Date(date).toISOString().split('T')[0].replace(/-/g, '/');

    return (
        <div className="grid gap-4 flex-col md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post: Post) => (
                <Card key={post.slug}>
                    <Link href={`/${directory}/${post.slug}`}>
                        <CardHeader>
                            <CardTitle className="truncate whitespace-nowrap overflow-hidden text-ellipsis">
                                {post.title}
                            </CardTitle>
                            <CardDescription>
                                {dateString(post.date)} | 0 views
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Keywords keywords={post.keywords} />
                        </CardFooter>
                    </Link>
                </Card>
            ))}
        </div>

    )
}