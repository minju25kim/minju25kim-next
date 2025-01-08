function Container({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="container p-4 mx-auto max-w-7xl">
            {children}
        </main>
    )
}

export default Container