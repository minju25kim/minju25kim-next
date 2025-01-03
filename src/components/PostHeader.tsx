
type Props = {
    title: string;
    coverImage: string;
    date: string;
};

export function PostHeader({ title, date }: Props) {
    const dateString = new Date(date).toISOString().split('T')[0].replace(/-/g, '/');
    return (
        <>
            <h1>{title}</h1>
            <span>{dateString}</span>
        </>
    )
}