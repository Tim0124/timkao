import type { Metadata } from "next";
import type { Components } from "react-markdown";
import type { ReactNode } from "react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, getPostSlugs } from "@/lib/posts";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// params 是 URL-encoded 原始值,中文 slug 需先解碼才能對到檔名
const decodeSlug = (slug: string) => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(decodeSlug(slug));
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.description };
}

// h2 錨點:目錄與標題共用同一組 id(直接用標題文字,中文可當 fragment)
const textOf = (node: ReactNode): string =>
  Array.isArray(node) ? node.map(textOf).join("") : String(node ?? "");

// react-markdown 元素 → case study 版型(design/Portfolio Pages.dc.html)
const components: Components = {
  h2: ({ children }) => (
    <h2
      id={textOf(children).trim()}
      className="mt-16 scroll-mt-24 border-t border-line pt-10 text-h2"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="mt-10 text-h3">{children}</h3>,
  p: ({ children }) => <p className="mt-5 text-body">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-body">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-body">{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-l-2 border-line-strong pl-5 text-body-lg">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-1 underline-offset-[3px] transition-colors hover:text-accent-hover"
    >
      {children}
    </a>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-md border border-line bg-surface p-5 font-mono text-mono">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const isBlock =
      /language-/.test(className ?? "") || /\n/.test(String(children));
    return isBlock ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded-sm border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.8125rem]">
        {children}
      </code>
    );
  },
  hr: () => <hr className="my-12 border-line" />,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-body-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-line-strong py-2 pr-4 text-left font-medium">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line py-2 pr-4 align-top text-secondary">
      {children}
    </td>
  ),
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(decodeSlug(slug));
  if (!post) notFound();

  const t = await getTranslations("blog");
  const format = await getFormatter();
  const headings = [...post.content.matchAll(/^## (.+)$/gm)].map((m) =>
    m[1].trim(),
  );

  return (
    <main className="mx-auto w-full max-w-(--max-content) px-5 pb-30 pt-10 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-start gap-16">
        <article className="max-w-[68ch] flex-[1_1_480px]">
          <header className="flex flex-col gap-6">
            {post.meta.eyebrow && (
              <p className="text-overline uppercase text-muted">
                {post.meta.eyebrow}
              </p>
            )}
            <h1 className="text-balance text-h1">{post.meta.title}</h1>
            {locale === "en" && (
              <p className="text-caption text-muted">{t("zhNote")}</p>
            )}
            {post.meta.description && (
              <p className="text-body-lg text-secondary">
                {post.meta.description}
              </p>
            )}
            {post.meta.date && (
              <time
                dateTime={post.meta.date}
                className="text-caption text-muted"
              >
                {format.dateTime(new Date(post.meta.date), {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </header>

          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {post.content}
          </ReactMarkdown>
        </article>

        {headings.length > 1 && (
          <aside className="sticky top-16 hidden min-w-[200px] flex-[0_1_220px] flex-col gap-3 border-l border-line pl-6 xl:flex">
            <p className="text-overline uppercase text-muted">{t("toc")}</p>
            <nav className="flex flex-col items-start gap-1">
              {headings.map((heading) => (
                <NextLink
                  key={heading}
                  href={`#${heading}`}
                  className="py-0.5 text-body-sm text-secondary transition-colors hover:text-foreground"
                >
                  {heading}
                </NextLink>
              ))}
            </nav>
          </aside>
        )}
      </div>
    </main>
  );
}
