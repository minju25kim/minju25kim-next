import {
    Card,
    // CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Post } from '@/interfaces/Data'
import Link from "next/link";
import Keywords from "./Keywords";
import { dateString } from "@/lib/utils";

interface CardProps {
    directory: string;
    allPosts: Post[];
}


export default function AppCard({ directory, allPosts }: CardProps) {
    // allPosts.map((post: Post) => {
    //     console.log(post.title, post.date, dateString(post.date))
    // })
    return (
        <div className="grid gap-4 flex-col md:grid-cols-2">
            {allPosts.map((post: Post) => (
                <Card key={post._id}>
                    <Link href={`/${directory}/${post._id}`}>
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