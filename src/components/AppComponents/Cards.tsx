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
import { dateString } from "@/lib/utils";
import Views from "@/components/AppComponents/Views";

interface CardProps {
    directory?: string;
    allContent: Content[];
}


export default function AppCard({ allContent }: CardProps) {


    const defaultCoverImage = '/opengraph-image.png'
    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {allContent.map((content: Content) => (
                <Card className="flex flex-col gap-2 p-2 smooth-corners-md" key={content._id}>
                    <CardContent className="p-0 m-0 max-w-full border-1 border-gray-200 rounded-md smooth-corners-md h-48">
                        <Link href={`/${content.dir}/${content._id}`}>
                            <Image
                                className="w-full h-full object-contain"
                                width={500}
                                height={500}
                                alt={content.title}
                                src={content.coverImage || defaultCoverImage}
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