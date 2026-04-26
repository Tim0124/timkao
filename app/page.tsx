export default function Home() {
  return (
    <main className="px-6 md:px-16 max-w-5xl mx-auto">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center">
        <p className="text-sm text-neutral-500 mb-6">
          Tim Kao — Frontend Engineer
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
          在 AI 什麼都能做的時代,
          <br />
          我還是相信
          <br />
          <span className="text-neutral-500">「用心做的東西看得出來」</span>
        </h1>
      </section>

      {/* Works */}
      <section className="py-24 md:py-32">
        <h2 className="text-sm text-neutral-500 mb-12">Selected Works</h2>

        <div className="space-y-16">
          {/* Work 1 */}
          <article>
            <p className="text-sm text-neutral-500 mb-2">
              01 / Component Library
            </p>
            <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">
              重建公司內部 UI Library
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 max-w-2xl">
              將公司產品元件從 MUI 遷移到 Shadcn/ui,以 wrapper pattern 重建 50
              個元件,並建立完整的元件測試規範。
            </p>
            <ul className="text-sm text-neutral-500 space-y-1">
              <li>· 50 個元件對齊 design system</li>
              <li>· 1,627 個測試案例,測試覆蓋率 90%+</li>
              <li>· 整套測試 13 秒內跑完</li>
            </ul>
          </article>

          {/* Work 2 */}
          <article>
            <p className="text-sm text-neutral-500 mb-2">02 / Architecture</p>
            <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">
              從共用 Next.js 到獨立 SPA
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 max-w-2xl">
              主導產品架構解耦——webapp 與官網原本共用 Next.js,將 webapp 從
              Next.js 遷移到 Vite 7 + TanStack Router,純 SPA 架構,啟動速度提升
              21 倍。
            </p>
            <ul className="text-sm text-neutral-500 space-y-1">
              <li>· 冷啟動 21.3s → ~1s(快 21 倍)</li>
              <li>· 熱重載 ~1075ms → ~138ms(快 7.8 倍)</li>
              <li>· Build 時間 96.4s → 25.2s(快 3.8 倍)</li>
            </ul>
          </article>

          {/* Work 3 */}
          <article>
            <p className="text-sm text-neutral-500 mb-2">03 / Side Project</p>
            <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">
              BeeHabit
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 max-w-2xl">
              用 LINE 訊息養成習慣的個人作品。Rich menu 一鍵記錄,
              蜂巢視覺化進度——完成一個習慣,就填入一格蜂蜜。
            </p>
            <ul className="text-sm text-neutral-500 space-y-1">
              <li>· LINE Messaging API + Webhook 架構</li>
              <li>· 蜂巢 dashboard 視覺化</li>
              <li>· 從構想到上線的完整個人專案</li>
            </ul>
          </article>

          {/* Work 4 */}
          <article>
            <p className="text-sm text-neutral-500 mb-2">04 / AI Tooling</p>
            <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">
              內部 AI 工具集
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 max-w-2xl">
              為內部團隊整合 MCP Server、CLI 工具與 Skills Chatbot,讓 sales
              和行銷能用自然語言操作產品功能。
            </p>
            <ul className="text-sm text-neutral-500 space-y-1">
              <li>· MCP Server:讓 AI agent 直接呼叫產品 API</li>
              <li>· CLI Tools:高頻操作的省 token 替代方案</li>
              <li>· Skills Chatbot:行銷團隊的問題分析助手</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
