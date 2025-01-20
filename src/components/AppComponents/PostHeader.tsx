import PostTitle from '@/components/AppComponents/SecondaryTitle';
import { dateString } from "@/lib/utils";
import Keywords from '@/components/AppComponents/Keywords'

type Props = {
    title: string;
    coverImage: string;
    date: string;
    author: string;
    keywords: string[]
};

export function PostHeader({ title, date, author, keywords }: Props) {
    // console.log(keywords)
    return (
        <div className="mb-4">
            <PostTitle title={title} />
            <div className="text-center md:text-justify text-sm text-muted-foreground">{author} | {dateString(date)} | 0 views</div>
            <Keywords keywords={keywords} />
        </div>
    )
}