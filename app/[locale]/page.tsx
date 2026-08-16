import { ArrowRight, Mail } from "lucide-react";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import AboutSection from "@/components/about";
import { GitHubIcon } from "@/components/icons";
import LocaleSwitcher from "@/components/locale-switcher";
import ThemeToggle from "@/components/theme-toggle";
import ScrollspyNav from "@/components/scrollspy-nav";
import WorksSection from "@/components/works";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/posts";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("writing");
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const format = await getFormatter();
  const posts = getAllPosts();

  return (
    <div className="mx-auto min-h-screen w-full max-w-(--max-content) px-5 py-16 sm:px-8 lg:flex lg:justify-between lg:gap-16 lg:px-10 lg:py-0">
      {/* 左欄:身份 + 章節導覽 + 社群,lg 起 sticky 滿高 */}
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24">
        <div>
          <p className="text-overline uppercase text-muted">
            Frontend Engineer · Taipei
          </p>
          <h1 className="mt-3 text-display">Tim Kao</h1>

          <ScrollspyNav />
        </div>

        <ul className="mt-10 flex items-center gap-5 lg:mt-0">
          <li>
            <a
              href="https://github.com/Tim0124"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="block text-muted transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-6" />
            </a>
          </li>
          <li>
            <a
              href="mailto:timkao.dev@gmail.com"
              aria-label="Email"
              className="block text-muted transition-colors hover:text-foreground"
            >
              <Mail className="size-6" aria-hidden />
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li className="ml-1">
            <LocaleSwitcher />
          </li>
        </ul>
      </header>

      {/* 右欄:About → Work → Writing → colophon */}
      <main className="pt-20 lg:w-[54%] lg:py-24">
        <AboutSection />
        <WorksSection />

        <section id="writing" className="mt-24 scroll-mt-24 lg:mt-30">
          <p className="mb-8 text-overline uppercase text-muted lg:sr-only">
            {tNav("writing")}
          </p>
          <ol className="flex flex-col gap-8">
            {posts.map((post) => (
              <li key={post.meta.slug} className="border-t border-line pt-6">
                {(post.meta.eyebrow || post.meta.date) && (
                  <p className="text-caption text-muted">
                    {[
                      post.meta.eyebrow,
                      post.meta.date &&
                        format.dateTime(new Date(post.meta.date), {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
                <h3 className="mt-1 text-h3">
                  <Link
                    href={`/blog/${post.meta.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {post.meta.title}
                  </Link>
                </h3>
                {post.meta.description && (
                  <p className="mt-2 text-body-sm text-secondary">
                    {post.meta.description}
                  </p>
                )}
              </li>
            ))}
          </ol>
          {locale === "en" && (
            <p className="mt-6 text-caption text-muted">{t("zhNote")}</p>
          )}
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-1.5 border-b border-line-strong py-1 text-body-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {t("viewAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </section>

        <footer className="mt-24 max-w-md pb-16 text-body-sm text-muted lg:mt-30 lg:pb-24">
          <p>
            {tFooter.rich("colophon", {
              link: (chunks) => (
                <a
                  href="https://brittanychiang.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline decoration-1 underline-offset-[3px] transition-colors hover:text-accent"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </footer>
      </main>
    </div>
  );
}
