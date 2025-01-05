function Title({ title }: { title: string }) {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
            {title}
        </h1>
    )
}

export default Title