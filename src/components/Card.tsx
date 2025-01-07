import {
    Card,
    // CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Post } from '@/interfaces/post'
// import { getAllPosts } from '@/lib/api';
import Link from "next/link";

interface CardProps {
    directory: string;
    allPosts: Post[];
}


export default function AppCard({ directory, allPosts }: CardProps) {
    const dateString = (date: string) => new Date(date).toISOString().split('T')[0].replace(/-/g, '/');

    return (
        <div
            className="grid gap-4 flex-col md:grid-cols-2 lg:grid-cols-3"
        >
            {allPosts.map((post: Post) => (
                <Card key={post.slug} className="sm:aspect-square">
                    <Link href={`/${directory}/${post.slug}`}>
                        <CardHeader>
                            <CardTitle>
                                {post.title}
                            </CardTitle>
                            <CardDescription>
                                {dateString(post.date)} | 0 views
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <p>{post.content}</p>
                        </CardFooter>
                    </Link>
                </Card>
            ))}
        </div>

    )
}