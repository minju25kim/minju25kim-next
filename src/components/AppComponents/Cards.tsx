import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Content } from '@/interfaces'
import Link from "next/link";
import Image from "next/image";
import Keywords from "./Keywords";
import { dateString } from "@/lib/utils";
import Views from "@/components/AppComponents/Views";

interface CardProps {
    directory?: string;
    allContent: Content[];
}


export default function AppCard({ allContent }: CardProps) {

    const defaultCoverImage = '/opengraph-image.png'
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
            {allContent.map((content: Content) => (
                <Card className="min-w-[350px] w-[350px] flex flex-col gap-2 p-2 smooth-corners-md mx-auto" key={content._id}>
                    <CardContent className="p-0 m-0 rounded-md smooth-corners-md border border-gray-200 flex justify-center items-center max-h-[200px]">
                        <Link href={`/${content.dir}/${content._id}`}>
                            <Image
                                className="rounded-md smooth-corners-md object-contain h-[180px]"
                                width={500}
                                height={500}
                                alt={content.title}
                                src={content.coverImage || defaultCoverImage}
                                loading="lazy"
                            />
                        </Link>
                    </CardContent>
                    <CardHeader className="p-0 m-0">
                        <Link href={`/${content.dir}/${content._id}`}>
                            <CardTitle className="truncate whitespace-nowrap overflow-hidden text-ellipsis leading-snug">
                                {content.title}
                            </CardTitle>
                        </Link>
                        <CardDescription>
                            {content.author} | {dateString(content.date)} | <Views contentId={content._id} /> views
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-0 m-0">
                        <Keywords keywords={content.keywords} />
                    </CardFooter>
                </Card>
            ))
            }
        </div >

    )
}