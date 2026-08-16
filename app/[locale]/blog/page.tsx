import type { Metadata } from "next";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "writing" });
  return { title: t("metaTitle"), description: t("indexDescription") };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("writing");
  const tNav = await getTranslations("nav");
  const format = await getFormatter();
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-(--max-content) px-5 pb-30 pt-10 sm:px-8 lg:px-10">
      <header className="flex max-w-[68ch] flex-col gap-6">
        <p className="text-overline uppercase text-muted">{tNav("writing")}</p>
        <h1 className="text-h1">{t("indexTitle")}</h1>
        <p className="text-body-lg text-secondary">{t("indexDescription")}</p>
        {locale === "en" && (
          <p className="text-caption text-muted">{t("zhNote")}</p>
        )}
      </header>

      <div className="mt-16 flex max-w-[68ch] flex-col">
        {posts.map((post) => (
          <article key={post.meta.slug} className="border-t border-line py-8">
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
            <h2 className="mt-2 text-h3">
              <Link
                href={`/blog/${post.meta.slug}`}
                className="transition-colors hover:text-accent"
              >
                {post.meta.title}
              </Link>
            </h2>
            {post.meta.description && (
              <p className="mt-3 text-body text-secondary">
                {post.meta.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
