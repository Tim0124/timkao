# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server at http://localhost:3000
- `npm run build` — production build (also the correctness check: verify every route stays ○/● static, never ƒ dynamic)
- `npm run start` — serve the production build
- `npm run lint` — ESLint via the flat config (`eslint.config.mjs`)

There is no test runner configured in this repo.

## Architecture

Personal site (timkao.dev) on Next.js 16 + App Router + React 19 + Tailwind CSS v4, deployed on Vercel. Fully static (SSG) — keeping it that way is a hard requirement.

### i18n (next-intl) — shapes everything

- Locales: `zh` (default, unprefixed at `/`) and `en` (at `/en`). `localeDetection: false` — `/` is always Chinese. Config in `i18n/routing.ts`; `proxy.ts` (Next 16 middleware) does the locale rewrite.
- All routes live under `app/[locale]/`. **Every nested layout and page must call `setRequestLocale(locale)` before any translation call**, or that route silently falls back to dynamic rendering.
- UI copy lives in `messages/zh.json` + `messages/en.json` — the two files must stay key-compatible (exception: `zhNote` keys exist only in `en.json`, guarded by `locale === "en"` checks). Structural data (work item keys, tech pills, hrefs, metric values) stays in components; only translatable text goes in messages.
- Internal links use `Link` from `@/i18n/navigation` (locale-aware), **except** same-page hash anchors which use `next/link` — native `<a href="#...">` breaks back-button restoration because the history entry lacks router state.
- `proxy.ts` matcher excludes static files by **anchored extension** (`\.(?:ico|png|…)$`), not by "path contains a dot" — blog slugs contain `Next.js` and would be skipped otherwise.

### Content pipeline

- Blog posts are Markdown in `content/blog/*.md` (gray-matter frontmatter: `title`, `description`, `eyebrow`), read by `lib/posts.ts`, rendered with react-markdown in `app/[locale]/blog/[slug]/page.tsx`.
- **Slugs are the Chinese filenames** — dynamic route `params` arrive URL-encoded, so the slug page decodes with `decodeSlug()` before `getPost()`. Post order is the curated `ORDER` array in `lib/posts.ts` (persuasion order: flagship → key → supporting).
- Posts are Chinese-only in both locales; `/en` shows a `zhNote` notice instead of translated posts.

### Two page shells

- **Homepage** (`app/[locale]/page.tsx`) is self-contained: split layout with a sticky left identity panel (scrollspy nav via `components/scrollspy-nav.tsx`, the only stateful client component) and a scrolling right column (About → Work → Writing → colophon). No top nav.
- **Blog subtree** (`app/[locale]/blog/layout.tsx`) uses the traditional shell: `SiteHeader` + `Footer`.

### Design system

- `design-system/MASTER.md` is the design source of truth (tokens, type scale, layout decisions, deliberately-avoided anti-patterns). **Read it before content or visual changes**; update it when decisions shift.
- Tokens live in `app/globals.css`: raw values on `:root`, mapped to Tailwind utilities in `@theme inline`. Components use the registered utilities only — `text-secondary`, `text-muted`, `border-line`, `bg-surface`, `text-h2`, `text-overline`… — never raw hex, never `dark:` variants (dark mode is entirely token-driven).
- Dark mode is three-state: system default via `prefers-color-scheme`, manual override via `ThemeToggle` (`data-theme` + localStorage; the anti-FOUC script at the top of `<body>` is deliberately wrapped in `dangerouslySetInnerHTML` so React never treats it as a script element — a bare `<script>` or inline `next/script` triggers React warnings when the locale layout re-renders). The dark values exist **twice** in `globals.css` (`[data-theme="dark"]` and the media-query block) — keep them in sync when editing tokens.
- Type-scale utilities (`text-display`/`text-h1`/…/`text-mono`) carry size, line-height, weight, and tracking together.
- UI icons = `lucide-react`; brand icons = official assets in `components/icons.tsx`. No emoji as icons.

### Known leftovers (pending deletion, unmounted)

GSAP animation components (`components/intro-overlay.tsx`, `scroll-plane.tsx`, `sticky-trooper.tsx`, `replay-button.tsx`, `animation-layer.tsx`), `lib/gsap.ts`, the `gsap` deps, the legacy CSS tokens (`--sky`, `--bg`, `.text-hero`, `.text-lead`) and Space Grotesk font — all orphaned from an abandoned direction. Do not wire them back in; delete only when the owner confirms.

## Copy discipline

- Site copy is Traditional Chinese (`lang="zh-Hant"` for zh). Preserve full punctuation (`「」`, `——`, full-width `，。`) and do not insert spaces after Chinese commas.
- **No specific company names** — describe work as "公司產品元件"、"主導產品架構解耦" etc. BeeHabit and Formu are explicitly tagged as personal projects.
- **MCP Server outcome wording**: always「縮短了 Sales 幫客戶建置表單的時間」— never claims about specific customer counts.
- Accent color is for interactive elements only (links, primary button, focus ring); structure is carried by the neutral scale.
- Layout is credited to Brittany Chiang in the homepage colophon — keep the credit if the layout stays.
