function Keywords({ keywords, className }: { keywords: string[]; className?: string }) {
    return (
        <div className="flex justify-center md:justify-start">
            <div className={`flex overflow-x-auto scroll-smooth gap-2  ${className || ''}`}>
                {keywords.map((keyword) => (
                    <span key={keyword} className="flex-shrink-0 text-xs text-muted-foreground rounded-md smooth-corners-md bg-slate-100 py-1 px-1">
                        {keyword}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Keywords 