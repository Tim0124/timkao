---
title: 把架構從 Next.js 換成 Vite：一次失敗兩次才成功的遷移紀錄
created: 2026-06-26
tags:
  - blog
  - frontend
  - nextjs
  - vite
  - migration
  - architecture
description: 將官網與 webapp 從單一 Next.js 拆成 Next + Vite SPA 的實戰紀錄——前兩次失敗、1:1 複製策略、21x 冷啟動，以及用 AI agent 加速遷移的 guardrails。
draft: true
---

# 把架構從 Next.js 換成 Vite：一次失敗兩次才成功的遷移紀錄

## 為什麼要動架構（商業 + 技術）

我在工作上負責前端，主要做建築專案管理軟體，團隊大概十人，產品是 webapp，另外還有行銷官網。兩者原本包在同一個 Next.js 裡。

問題來自行銷團隊，他們想頻繁快速迭代官網，但每次上線都要等 webapp 一起 deploy。對一個十人團隊來說，這不是「有點不方便」，而是直接拖慢 GTM Strategy。同時，隨著 codebase 變大，開發體驗也明顯惡化，本地首次載入一個頁面常常要等十秒以上。另外的是，webapp 本質上是純 SPA，用不太到 Next.js 的 SSR。

我主動評估後提案：把官網和 webapp 拆開，各自獨立部署、獨立網域。我們中期已經是 monorepo 架構，拆分的邊界相當清楚。

## 怎麼拆：官網留 Next、Webapp 改 Vite

官網繼續用 Next.js，它需要 SEO，爬蟲要能直接讀取到內容。i18n 也從 next-i18next 換成 next-intl 對，原因是對App router 的支援度比較高，在配置上較簡單。

Webapp 改成 Vite + TanStack Router。選 Vite 是因為這就是純 Client-side app，不需要 SSR 那套重量級工具。冷啟動、HMR、打包也快，React + TypeScript 生態也成熟。路由我比過 React Router 和 TanStack Router，選擇後者：File-based routing 可以自動產生 route tree，不用手動維護路由表。params、search params、loader 都有比較完整的型別推導。從 Next.js 遷過來，資料夾夠的思維可以沿用，遷移成本比較低。i18n 這邊改用 react-i18next。

## 兩次失敗教會我的事

最難的不是選技術，是怎麼遷移才不破壞既有功能。
前兩次我都試著「複製程式碼過去」，結果要嘛 UI 跟原版對不上，要嘛功能直接壞掉，兩次都遷移到一半重來。

更大的坑是我一開始野心太大，一邊遷移還想一邊重構，lib 怎麼分、utils 放哪、 state 要不要再分一個 store 資料夾，全部重新規劃。在有限時間和 token 預算下，遷移 + 重構同時很難做到完整。我後來把目標砍到只剩一件事，就是1:1複製，畫面和功能先跟原版一模一樣，優化留到下一階段。

## 第三次：1:1 複製策略

策略改成：

1. 以模組為單位逐塊遷移，不做大規模遷移。
2. 逐檔檢查 Next.js 的 hook 在 TanStack Router 上都不能用，i18n hook 也要換成 react-i18next 的寫法。
3. 維護一份遷移清單，追蹤每個模組的狀態。
4. 用 AI agent 加速重複性工作，寫了 migration skill 約束規則，哪些要改、哪些不動。實際踩過的坑，agent 會擅自改跟任無無關的 Code，沒約束反而增加 review 成本。

同時補上 GitLab CI/CD，加入 typecheck 和測試，確保每次遷移模組合進去不會壞掉。

## 結果

遷移完成後，webapp 開發體驗差距很明顯：

| 指標   | 改善  |
| ------ | ----- |
| 冷啟動 | ~21x  |
| HMR    | ~7.8x |
| Build  | ~3.8x |

官網獨立部署後，官網可以自行發佈，不再被 webapp release 卡住。官網的 Lighthouse 從 50~60 分拉到 80-90分。

## 如果重來

三件事：

1. 一開始就要決定好一個方向「只遷移、不重構」，省掉兩次白做的時間。
2. 先拆 deploy pipeline，再拆 codebase，行銷的痛會更快被解決。
3. CI 和測試跟遷移同步建，不要等全部遷移完才補。

這次讓我更理解整體架構的邊界在哪，也學到架構遷移的核心不是選框架，是控制 scope、確保每次更動可以驗證。對一個小團隊來說，能獨立交付這種跨產品的架構決策，比單純會用某個框架更有價值。
