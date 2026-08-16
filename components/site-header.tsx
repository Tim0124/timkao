import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/locale-switcher";
import ThemeToggle from "@/components/theme-toggle";
import { Link } from "@/i18n/navigation";

const navLink =
  "text-body-sm font-medium text-secondary transition-colors hover:text-foreground";

const SiteHeader = () => {
  const t = useTranslations("nav");

  return (
    <header className="mx-auto flex w-full max-w-(--max-content) items-center justify-between px-5 py-10 sm:px-8 lg:px-10">
      <Link href="/" className="text-body-sm font-medium">
        Tim Kao
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/#work" className={navLink}>
          {t("work")}
        </Link>
        <Link href="/blog" className={navLink}>
          {t("writing")}
        </Link>
        <Link href="/#about" className={navLink}>
          {t("about")}
        </Link>
        <ThemeToggle />
        <LocaleSwitcher />
      </nav>
    </header>
  );
};

export default SiteHeader;
