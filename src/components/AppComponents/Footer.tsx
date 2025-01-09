function Footer() {
    const thisYear = new Date().getFullYear()

    return (
        <footer className="w-full text-center">
            <p className="text-sm text-muted-foreground">© {thisYear} Minju Kim</p>
        </footer>
    );
}

export default Footer;