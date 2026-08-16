import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// 結構性資料留在程式碼;文案(title/body/stats…)在 messages/*.json
type WorkEntry = {
  key: "mcp" | "architecture" | "ui" | "beehabit" | "formu";
  tag: string;
  flagship?: boolean;
  hasHighlight?: boolean;
  metricValue?: string; // 數字不分語系,label 進 messages
  hasStats?: boolean;
  tech: string[];
  href?: string;
};

// 公司專案 — 強度遞減:旗艦(MCP) → 重點(架構、工程品質)
const selectedWork: WorkEntry[] = [
  {
    key: "mcp",
    tag: "01 / MCP Server",
    flagship: true,
    hasHighlight: true,
    hasStats: true,
    tech: ["TypeScript", "MCP", "SSE", "Zod"],
    href: "/blog/mcp-server",
  },
  {
    key: "architecture",
    tag: "02 / Architecture",
    metricValue: "21×",
    hasStats: true,
    tech: ["Vite 7", "TanStack Router", "React"],
    href: "/blog/把架構從 Next.js 換成 Vite：一次失敗兩次才成功的遷移紀錄",
  },
  {
    key: "ui",
    tag: "03 / Engineering Quality",
    metricValue: "1,627",
    hasStats: true,
    tech: ["Shadcn/ui", "Vitest", "Testing Library"],
  },
];

// 獨立出貨(佐證,降權)— 證明能端到端做產品
const sideProjects: WorkEntry[] = [
  {
    key: "beehabit",
    tag: "Side project",
    tech: ["LINE Bot"],
  },
  {
    key: "formu",
    tag: "Side project",
    tech: ["Vite", "Hono", "SQLite", "Astro"],
    href: "/blog/formu",
  },
];

// Tag 規格:不用主色與彩色底,分類是資訊不是行動
const TechPills = ({ tech }: { tech: string[] }) => (
  <ul className="mt-4 flex flex-wrap gap-2">
    {tech.map((t) => (
      <li
        key={t}
        className="rounded-sm border border-line bg-surface px-2 py-1 text-caption text-secondary"
      >
        {t}
      </li>
    ))}
  </ul>
);

// 條目:border-t 分隔的編輯風列表,左 tag 欄 + 右內容;連結用 standalone link
const WorkItem = ({ work }: { work: WorkEntry }) => {
  const t = useTranslations(`work.items.${work.key}`);
  const stats = work.hasStats ? (t.raw("stats") as string[]) : null;

  return (
    <article className="grid grid-cols-1 gap-3 border-t border-line pt-8 sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-6">
      <div className="pt-1">
        <p className="font-mono text-caption text-muted">{work.tag}</p>
        {work.flagship && (
          <p className="mt-1 text-overline uppercase">● Flagship</p>
        )}
      </div>

      <div>
        <h3 className="text-h3">{t("title")}</h3>

        {work.metricValue && (
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-mono text-h2 tabular-nums">
              {work.metricValue}
            </span>
            <span className="text-caption text-muted">{t("metricLabel")}</span>
          </div>
        )}
        {work.hasHighlight && (
          <p className="mt-3 text-body font-medium">{t("highlight")}</p>
        )}

        <p className="mt-3 text-body-sm text-secondary">{t("body")}</p>

        {stats && (
          <ul className="mt-3 flex list-disc flex-col gap-1 pl-4 text-body-sm text-muted marker:text-line-strong">
            {stats.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        )}

        <TechPills tech={work.tech} />

        {work.href && (
          <Link
            href={work.href}
            className="mt-5 inline-flex items-center gap-1.5 border-b border-line-strong py-1 text-body-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {t("linkLabel")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
};

const WorksSection = () => {
  const tNav = useTranslations("nav");

  return (
    <section id="work" className="mt-24 scroll-mt-24 lg:mt-30">
      <p className="mb-8 text-overline uppercase text-muted lg:sr-only">
        {tNav("work")}
      </p>

      <div className="flex flex-col gap-10">
        {selectedWork.map((work) => (
          <WorkItem key={work.key} work={work} />
        ))}
      </div>

      <p className="mb-6 mt-16 text-overline uppercase text-muted">
        Side projects
      </p>
      <div className="flex flex-col gap-8">
        {sideProjects.map((work) => (
          <WorkItem key={work.key} work={work} />
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
