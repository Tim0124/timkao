import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 略過 API、Next 內部資源,以及「以靜態副檔名結尾」的路徑。
  // 不能用 .*\\..* 排除所有含點路徑:中文 slug 內含「Next.js」也會被誤殺。
  matcher:
    "/((?!api|_next|_vercel|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|mjs|txt|xml|json|webmanifest|map|woff2?)$).*)",
};
