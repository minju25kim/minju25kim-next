function Container({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="container px-4 py-4 mx-auto max-w-7xl">
            {children}
        </main>
    )
}

export default Container