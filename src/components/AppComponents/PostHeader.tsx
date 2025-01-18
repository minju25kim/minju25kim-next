import PostTitle from '@/components/AppComponents/SecondaryTitle';
import { dateString } from "@/lib/utils";

type Props = {
    title: string;
    coverImage: string;
    date: string;
    author: string;
};

export function PostHeader({ title, date,author }: Props) {
    // console.log({ title, date,author })
    return (
        <div className="mb-4">
            <PostTitle title={title} />
            <span className="text-sm text-muted-foreground">{author} | {dateString(date)} | 0 views</span>
        </div>
    )
}