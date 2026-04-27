const Footer = () => {
  return (
    <footer className="px-6 md:px-16 pt-24 md:pt-32 pb-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-neutral-500">
        <div className="flex items-center gap-2">
          <a
            href="mailto:timkao.dev@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
          <span>·</span>
          <a
            href="https://github.com/timkao"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
        <p>© 2026 Tim Kao</p>
      </div>
    </footer>
  );
};

export default Footer;
