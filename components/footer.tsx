import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

// Contact + Footer:單一明確 CTA(Email),GitHub 降權到 meta 列。
const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-(--max-content) px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <section className="flex max-w-[68ch] flex-col gap-6">
          <p className="text-overline uppercase text-muted">Contact</p>
          <p className="text-h2 text-balance">{t("contactLead")}</p>
          <a
            href="mailto:timkao.dev@gmail.com"
            className="inline-flex items-center gap-1.5 self-start border-b border-line-strong py-1 text-body font-medium transition-colors hover:border-accent hover:text-accent"
          >
            timkao.dev@gmail.com
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </section>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-body-sm text-muted md:flex-row md:items-center md:justify-between">
          <a
            href="https://github.com/timkao"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <p>© 2026 Tim Kao</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
