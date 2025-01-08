function Title({ title }: { title: string }) {
    return (
        <h1 className="text-center sm:text-justify scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4 ">
            {title}
        </h1>
    )
}

export default Title