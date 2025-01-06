function Footer() {
    const thisYear = new Date().getFullYear()

    return (
        <footer className="relative w-full bottom-0 text-center">
            <p className="text-sm text-muted-foreground">© {thisYear} Minju Kim</p>
        </footer>
    );
}

export default Footer;