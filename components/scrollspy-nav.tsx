"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const SECTIONS = [
  { id: "about", num: "01" },
  { id: "work", num: "02" },
  { id: "writing", num: "03" },
] as const;

// 左欄章節導覽:mono 編號呼應 Work 的 tag 系統,active 以顏色/字重表示
const ScrollspyNav = () => {
  const t = useTranslations("nav");
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="mt-16 hidden lg:block" aria-label={t("sections")}>
      <ul className="flex flex-col gap-3">
        {SECTIONS.map(({ id, num }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              {/* 用 next/link 而非 <a>:原生 hash 跳轉的 history entry 不含
                  router state,之後按「返回」會 URL 變了但畫面不重繪 */}
              <Link
                href={`#${id}`}
                className={`group flex items-baseline gap-3 py-1 transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="font-mono text-caption tabular-nums">
                  {num}
                </span>
                <span
                  className={`text-overline uppercase ${isActive ? "font-semibold" : ""}`}
                >
                  {t(id)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ScrollspyNav;
