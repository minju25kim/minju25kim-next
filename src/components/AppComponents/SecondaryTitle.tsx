function PostTitle({ title }: { title: string }) {
    return (
        <h2 className="text-center md:text-justify scroll-m-20 text-2xl font-extrabold tracking-tight md:text-3xl my-4 text-wrap">
            {title}
        </h2>
    )
}

export default PostTitle