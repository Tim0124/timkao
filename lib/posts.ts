import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description?: string;
  eyebrow?: string;
  date?: string; // 發佈日期,YYYY-MM-DD
};

// gray-matter 會把 YAML 日期解析成 Date 物件,統一轉回 YYYY-MM-DD 字串
const toDateString = (value: unknown): string | undefined => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return undefined;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// 手動排序:與作品區的說服順序一致(旗艦 → 重點 → 佐證)
const ORDER = [
  "mcp-server",
  "把架構從 Next.js 換成 Vite：一次失敗兩次才成功的遷移紀錄",
  "formu",
];

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPost(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const ia = ORDER.indexOf(a.meta.slug);
      const ib = ORDER.indexOf(b.meta.slug);
      return (ia === -1 ? ORDER.length : ia) - (ib === -1 ? ORDER.length : ib);
    });
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description,
      eyebrow: data.eyebrow,
      date: toDateString(data.date ?? data.created),
    },
    content,
  };
}
