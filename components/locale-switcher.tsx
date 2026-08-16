"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// 切到另一個語言,停留在同一頁(usePathname 回傳不含 locale 前綴的路徑)
const LocaleSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "zh" ? "en" : "zh";

  return (
    <Link
      href={pathname}
      locale={other}
      className="font-mono text-caption text-muted transition-colors hover:text-foreground"
      aria-label={other === "en" ? "Switch to English" : "切換為中文"}
    >
      {other === "en" ? "EN" : "中文"}
    </Link>
  );
};

export default LocaleSwitcher;
