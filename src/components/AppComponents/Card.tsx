import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Content } from '@/interfaces/Data'
import Link from "next/link";
import Image from "next/image";
import Keywords from "./Keywords";
// import { dateString } from "@/lib/utils";
// import Views from "@/components/AppComponents/Views";

interface CardProps {
    directory?: string;
    allContent: Content[];
}


export default function AppCard({ directory, allContent }: CardProps) {


    const defaultCoverImage = '/opengraph-image.png'
    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {allContent.map((post: Content) => (
                <Card key={post._id}>
                    <Link href={`/${directory || post.dir}/${post._id}`}>
                        <CardHeader>
                            <CardTitle className="truncate whitespace-nowrap overflow-hidden text-ellipsis">
                                {post.title}
                            </CardTitle>
                            <CardDescription>
                                {/* {dateString(post.date)} | <Views contentId={post._id} /> views */}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-row justify-center">
                            {post.coverImage
                                ? <Image width={100} height={100} alt={post.title} src={post.coverImage} />
                                : <Image width={100} height={100} alt={post.title} src={defaultCoverImage} />
                            }
                        </CardContent>
                        <CardFooter>
                            <Keywords keywords={post.keywords} />
                        </CardFooter>
                    </Link>
                </Card>
            ))}
        </div>

    )
}