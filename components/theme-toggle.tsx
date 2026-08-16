"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";

// SSR 時 useLayoutEffect 無作用且 React 會警告,server 端退回 useEffect
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

// 主題狀態的來源是 DOM(data-theme)與系統偏好,不是 React state——
// 用 external store 訂閱,系統主題變更時 icon 也會即時跟上。
const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  return () => {
    listeners.delete(callback);
    mq.removeEventListener("change", callback);
  };
};

const getSnapshot = (): Theme => {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "dark" || explicit === "light") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// SSR 不知道使用者主題,先回 null 渲染佔位
const getServerSnapshot = (): Theme | null => null;

const setTheme = (next: Theme) => {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // localStorage 不可用(隱私模式等):切換仍生效,只是不記憶
  }
  listeners.forEach((listener) => listener());
};

const ThemeToggle = () => {
  const t = useTranslations("nav");
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // locale 切換會讓 React 重新 render <html>,清掉外部設定的 data-theme——
  // 用 layout effect 在「DOM 變更後、paint 前」同步校正,深色模式切語言才不會閃白
  useIsomorphicLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      return;
    }
    if (
      (stored === "dark" || stored === "light") &&
      document.documentElement.dataset.theme !== stored
    ) {
      document.documentElement.dataset.theme = stored;
      listeners.forEach((listener) => listener());
    }
  });

  return (
    <button
      type="button"
      onClick={() => theme && setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={t("theme")}
      className="block cursor-pointer text-muted transition-colors hover:text-foreground"
    >
      {theme === null ? (
        <span className="block size-5" />
      ) : theme === "dark" ? (
        <Sun className="size-5" aria-hidden />
      ) : (
        <Moon className="size-5" aria-hidden />
      )}
    </button>
  );
};

export default ThemeToggle;
