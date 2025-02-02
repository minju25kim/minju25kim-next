import PostTitle from '@/components/AppComponents/SecondaryTitle';
import { dateString } from "@/lib/utils";
import Keywords from '@/components/AppComponents/Keywords'
import Views from '@/components/AppComponents/Views'

type Props = {
    title: string;
    coverImage: string;
    date: string;
    author: string;
    keywords: string[]
    contentId: string
};

export function PostHeader({ title, date, author, keywords, contentId }: Props) {
    return (
        <div className="mb-4">
            <PostTitle title={title} />
            <div className="text-center md:text-justify text-sm text-muted-foreground">
                {author} | {dateString(date)} | <Views contentId={contentId} incrementOnMount={true} /> views
            </div>
            <Keywords keywords={keywords} className="mt-2" />
        </div>
    )
}