function Footer() {
    const thisYear = new Date().getFullYear()

    return (
        <footer className="sticky bottom-0 text-center bg-white">
            <p className="text-sm text-muted-foreground">© {thisYear} Minju Kim</p>
        </footer>
    );
}

export default Footer;