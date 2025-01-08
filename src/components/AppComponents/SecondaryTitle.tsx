function PostTitle({ title }: { title: string }) {
    return (
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl my-4 text-wrap">
            {title}
        </h2>
    )
}

export default PostTitle