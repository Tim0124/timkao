# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint via the flat config (`eslint.config.mjs`)

There is no test runner configured in this repo.

## Architecture

Single-page personal site (timkao.dev) on Next.js 16 + App Router + React 19, deployed on Vercel.

- **Routing**: App Router lives at `app/` at the repo root (not `src/app/`). Currently one route — `app/page.tsx` — plus `app/layout.tsx` for the root shell and `app/globals.css` for global styles. `next.config.ts` sets `trailingSlash: false`.
- **Path alias**: `@/*` resolves to the repo root (see `tsconfig.json`). TypeScript runs in `strict` mode.
- **Styling**: Tailwind CSS **v4** via `@tailwindcss/postcss`. There is no `tailwind.config.*`; design tokens live inline in `app/globals.css` under `@theme inline { ... }`, and dark mode is driven entirely by `prefers-color-scheme` (no toggle, no `dark` class strategy).
- **Fonts**: Geist + Geist Mono are loaded with `next/font/google` in `app/layout.tsx` and exposed as the CSS variables `--font-geist-sans` / `--font-geist-mono`. Note: `body` in `globals.css` currently still falls back to Arial — switch to `var(--font-sans)` if/when typography work begins.
- **Language**: `<html lang="zh-Hant">`. Site copy is Traditional Chinese; preserve full punctuation (e.g. `「」`, `——`) and do not insert spaces after Chinese commas.

## Project context

`TODO.md` is the working handoff document for this site — it captures the brand positioning, the four case studies' copy, the visual style rules for the current week, and the outstanding TODO list. **Read it before making content or visual changes**, and update it (rather than inventing parallel notes) when scope shifts.

Discipline that overrides default instincts on this repo:

- **Do not abstract the four `<article>` blocks in `app/page.tsx` into a `<WorkCard>` component.** The TODO explicitly calls this out — inline JSX is the chosen approach for v1.
- **No animations, parallax, shaders, or 3D in the current phase.** Those are deferred to Week 3. If a change tempts you toward motion, skip it and note it in `TODO.md` instead.
- **No custom brand colors and no dark-mode toggle button** — stick to Tailwind's `neutral-*` greyscale and the `prefers-color-scheme` defaults.
- **No specific company names in copy** — describe work as "公司產品元件"、"主導產品架構解耦" etc. BeeHabit is explicitly tagged as a personal project.
