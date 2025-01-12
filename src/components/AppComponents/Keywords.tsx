function Keywords({ keywords }: { keywords: string[] }) {

    return (
        <div className="flex flex-wrap gap-2">
            {
                keywords.map((keyword) => (
                    <span key={keyword} className="text-sm text-muted-foreground rounded-md bg-slate-100 py-1 px-2">{keyword}</span>
                ))
            }
        </div>
    )
}

export default Keywords 