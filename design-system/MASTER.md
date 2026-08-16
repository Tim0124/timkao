# timkao.dev — Design System

> Source of truth:`design/Portfolio Design Tokens.dc.html` + `design/Portfolio Pages.dc.html`(2026-08-15 拍板)。
> Token 已落地於 `app/globals.css`;頁面重設計進行中。
> 定位:為長文技術 case study 設計——中性色承擔所有結構,單一主色只出現在可互動元素上,層次由字級、字重與留白建立。

## 核心原則

1. **主色 = 「可點擊」的訊號**。連結、primary button、focus ring 以外不得出現 accent;每一次出現都有意義。
2. **同一平面用邊框分區,陰影只表達「脫離頁面平面」**(下拉、tooltip、對話框)。Card、程式碼區塊、表格一律 0 陰影。
3. **語意化命名**:元件只引用用途(`text-secondary`),不引用色階編號(`--neutral-600`)。中性色階僅供語意色定義引用。
4. **行寬以 ch 控制**(68ch,上限 75 / 下限 65),字級改變時自動維持閱讀區間。
5. **focus-visible 全域統一**:2px accent outline + 2px offset,不改邊框寬度、無版面位移。
6. **Tag 不用主色與彩色底**:分類是資訊不是行動。

## 色彩(zinc 系冷灰 + 藍 accent)

命名分兩層:**root 變數存值(短名,light/dark 各一組)**,`@theme inline` 映射成 Tailwind utilities。元件一律用 utility,不寫任意值語法。

| Root 變數           | Utility 例                  | Light           | Dark            | 用途                                      |
| ------------------- | --------------------------- | --------------- | --------------- | ----------------------------------------- |
| `--background`      | `bg-background`             | #FFFFFF         | #101012         | 頁面底色                                  |
| `--surface`         | `bg-surface`                | #FAFAFA         | #17181B         | 卡片、程式碼區塊底色                      |
| `--line`            | `border-line`               | #E4E4E7         | #26272B         | 預設 1px 分隔線                           |
| `--line-strong`     | `border-line-strong`        | #D4D4D8         | #3A3B40         | Input、hover 邊框、dark 浮層標示          |
| `--foreground`      | `text-foreground`           | #18181B(17.7:1) | #F4F4F5(17.3:1) | 標題與正文(body 預設)                     |
| `--secondary`       | `text-secondary`            | #52525B(7.7:1)  | #B4B4BC(9.2:1)  | 摘要、圖說、次要段落                      |
| `--muted`           | `text-muted`                | #71717A(4.8:1)  | #8E8E97(5.9:1)  | metadata;**僅限 background/surface 之上** |
| `--accent`          | `text-accent` / `bg-accent` | #1D4ED8(6.7:1)  | #7D9CFF(7.3:1)  | 連結、primary button、focus ring          |
| `--accent-hover`    | `hover:bg-accent-hover`     | #1A43B8         | #9DB4FF         | hover / active(dark 往更亮)               |
| `--accent-contrast` | `text-accent-contrast`      | #FFFFFF         | #101012         | accent 底上的文字                         |

Dark mode 三態:預設跟隨 `prefers-color-scheme`,`ThemeToggle` 按鈕(首頁左欄 + blog header)可手動覆寫,寫入 `data-theme` + localStorage;防閃爍 inline script 在 `app/[locale]/layout.tsx` 的 body 開頭(以 `dangerouslySetInnerHTML` 包裝——React 不視其為 script 元素,locale 切換 re-render 才不會觸發警告)。globals.css 有兩份深色值(`[data-theme="dark"]` 與 media query 內的 `:root:not([data-theme="light"])`)**必須同步**。utilities 編譯成 `var(--secondary)` 這類 runtime 引用,主題切換自動生效。

## Typography(Inter + JetBrains Mono)

Tailwind utilities 已由 `@theme inline` 產生,**直接用 `text-display` / `text-h1` / … 即帶行高、字重、字距**:

| Utility         | 規格                       | 用途                                    |
| --------------- | -------------------------- | --------------------------------------- |
| `text-display`  | 44 / 1.1 / 650 / -0.03em   | 首頁主標,全站僅一次                     |
| `text-h1`       | 34 / 1.15 / 620 / -0.022em | Case study 標題                         |
| `text-h2`       | 26 / 1.25 / 600 / -0.018em | 章節標題                                |
| `text-h3`       | 20 / 1.35 / 600 / -0.011em | 小節標題、卡片標題                      |
| `text-body-lg`  | 18 / 1.75 / 400 / -0.003em | 文章導言、摘要                          |
| `text-body`     | 16 / 1.7 / 400             | 正文預設,行寬 68ch                      |
| `text-body-sm`  | 14 / 1.6 / 400             | 附註、表格內文、UI 文字                 |
| `text-caption`  | 13 / 1.5 / 450 / 0.005em   | 圖說、日期、metadata                    |
| `text-overline` | 12 / 1.4 / 560 / 0.08em    | 區塊眉標(自行加 `uppercase`),取代裝飾線 |
| `text-mono`     | 14 / 1.65                  | 程式碼、識別碼、數值(搭 `font-mono`)    |

Inter 以 variable font 載入(需要 450/560/620/650 中間字重);中文 fallback PingFang TC / Noto Sans TC。

## 間距(4px 基準,刻意稀疏)

用 Tailwind 原生 spacing(1 = 4px):元件內距 1–6、元素間距 5–8、區塊間距 12(手機)/16(桌機)、頁首頁尾 20、大段落切換 30。三種尺度不混用。

## 圓角 / 邊框 / 陰影

- `rounded-sm` 4px = Tag、Input、按鈕;`rounded-md` 8px = Card、Code block;`rounded-lg` 12px = 浮層
- 邊框預設 `--color-border`;需要被指認的互動容器用 `--color-border-strong`;焦點不加粗邊框,用 outline
- `shadow-sm` = 下拉、tooltip;`shadow-md` = 對話框;dark 時自動換成 border 型陰影

## 斷點與寬度

- Mobile < 640(邊距 20px 單欄)/ Tablet 640–1023(邊距 32px,內容 720px)/ Desktop ≥ 1024(內容 1280px)
- `--max-content: 1280px`、`--max-prose: 720px`、`--measure-prose: 68ch`;程式碼區塊可放寬到全寬
- 色彩在元件中用註冊過的 utilities:`bg-surface`、`text-secondary`、`border-line`(有 autocomplete 與 opacity modifier,如 `text-muted/60`);寬度類變數仍用任意值語法(`max-w-(--max-content)`)

## Icon 系統

- **UI icon 一律用 `lucide-react`**(stroke-based、`currentColor` 繼承文字色,dark mode 免處理);尺寸用 `size-*` utility,同層級維持同一種線寬
- **品牌 icon(GitHub、LinkedIn…)用官方資產**,收在 `components/icons.tsx`——Lucide 已棄用品牌類 icon,且品牌 mark 不可重繪
- 禁用 emoji 當 icon

## 元件基礎樣式(摘自 token mockup 07)

- **Button**:高度 40px(12px 內距 + 16px 行盒),radius-sm;Primary(accent 底)/ Secondary(白底 + border-strong)/ Ghost(透明)對應「唯一主要行動 / 並列次要行動 / 導覽類行動」;transition 120ms
- **Link**:inline 永遠帶底線(不依賴顏色);standalone 用 border-bottom + hover 變 accent
- **Card**:0 陰影,hover 只變邊框與底色(卡片沒有離開頁面平面)
- **Tag**:surface 底 + 細邊框,無彩色;可點擊的 Tag 才有邊框強化與 hover
- **Input**:border-strong,錯誤狀態不新增顏色 token(邊框改 text-primary + 13px 說明文字)
- **Code block**:不做語法上色,只用 mono 字體與 surface 底色分區——色彩預算留給互動元素

## 頁面版型

**首頁(2026-08-15 改版:split 雙欄,參考 brittanychiang.com 排版、配色維持本 token 系統)**

- **左欄 sticky**(lg 起滿高):overline + 名字 + 北極星句 + 現況一行 + scrollspy 導覽 + 底部社群 SVG icons;手機收成堆疊 header、導覽隱藏
- **scrollspy 指示器用 mono 編號(01/02/03)+ 顏色/字重變化**——刻意不用參考站的「線變長」簽名動畫(去指紋)
- **右欄捲動**:About 長文 → Work 條目 → Writing 列表 → colophon(含「版型靈感來自 Brittany Chiang」致謝)
- **Work 條目**:border-t 分隔的編輯風列表,左 128px tag 欄(mono caption + ● Flagship)+ 右內容(標題 / metric / body / stats / tech pills / standalone link)。**不用 hover 浮卡與 ↗ 位移**(參考站的質感語言),連結一律 standalone link 規格
- 首頁不用頂部 nav;blog 子樹(`app/blog/layout.tsx`)維持「頂部 nav + footer」

**Case study(source: Portfolio Pages.dc.html)**

- header(overline + h1 + 導言 + tags)→ 正文 68ch + sticky 目錄側欄(border-left)
- 引言用 border-left 2px + body-lg;程式碼區塊帶檔名列 + Copy 鈕

## 遷移狀態

- ✅ Token 層(`app/globals.css`)+ 字體(`app/layout.tsx`)
- ✅ 頁面重設計(2026-08-15):
  - `components/site-header.tsx` — 全站 nav(Work / Writing / About),掛在 layout
  - `components/hero.tsx` — 左主欄 + 右 aside(現況/聯絡/現在用的),server component、無 GSAP
  - `components/works.tsx` — 編輯風列表(200px meta 欄 + 68ch 內容,border-t 分隔);side projects 用 Card 規格
  - `components/about.tsx`、`components/footer.tsx`(Contact 單一 CTA)
  - `app/blog/[slug]/page.tsx` — case study 版型:overline + h1 + 導言、68ch 正文、sticky 目錄(xl↑,h2 錨點)、token 化 markdown 樣式
  - `app/blog/page.tsx` — Writing index(nav 落點)
- 已驗證:1280 / 375 無橫向捲動、dark mode(accent #7D9CFF)、目錄錨點、lint + build
- 待清理:GSAP 動畫元件(intro-overlay 等)與 `lib/gsap.ts` 已無人引用;舊 CSS aliases(`--ink`、`--sky`、`.text-hero`、`.text-lead`、Space Grotesk)僅供這些孤兒檔案,確定不用 C-130 敘事後一併刪除
