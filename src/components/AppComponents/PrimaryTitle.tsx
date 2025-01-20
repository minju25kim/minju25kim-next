function Title({ title }: { title: string }) {
    return (
        <h1 className="text-center md:text-justify scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl mb-4 ">
            {title}
        </h1>
    )
}

export default Title