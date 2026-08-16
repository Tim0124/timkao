import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// 取代 next/link、next/navigation:自動帶上目前 locale 的前綴
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
