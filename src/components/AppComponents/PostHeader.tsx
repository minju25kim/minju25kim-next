import PostTitle from '@/components/AppComponents/SecondaryTitle';

type Props = {
    title: string;
    coverImage: string;
    date: string;
};

export function PostHeader({ title, date }: Props) {
    const dateString = new Date(date).toISOString().split('T')[0].replace(/-/g, '/');
    return (
        <div className="mb-4">
            <PostTitle title={title} />
            <span className="text-sm text-muted-foreground">{dateString} | 0 views</span>
        </div>
    )
}