function Container({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex-grow w-full h-full">
            {children}
        </main>
    )
}

export default Container