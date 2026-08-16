import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  // 中文不帶前綴(/ = 中文,/en = 英文)
  localePrefix: "as-needed",
  // 不看瀏覽器語言,/ 永遠是中文
  localeDetection: false,
});
