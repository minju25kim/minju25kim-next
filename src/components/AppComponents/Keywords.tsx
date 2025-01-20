function Keywords({ keywords }: { keywords: string[] }) {

    return (
        <div className="relative flex overflow-x-auto scroll-smooth gap-2 pt-4 justify-center md:justify-start">
            {keywords.map((keyword) => (
                <span key={keyword} className="flex-shrink-0 text-sm text-muted-foreground rounded-md bg-slate-100 py-1 px-2">
                    {keyword}
                </span>
            ))}
        </div>


    )
}

export default Keywords 