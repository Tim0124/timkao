"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const jokes = [
  "嗨,需要幫忙嗎?",
  "我從 C-130 跳下來的,有點累。",
  "你的 build time 還好嗎?",
  "用心做的東西,真的看得出來。",
  "蜂巢又多一格了 🐝",
  "21 倍速啟動,比我跳傘還快。",
  "Shadcn/ui 真香。",
  "細節是魔鬼,也是我朋友。",
];

// 固定右下角的傘兵彩蛋:持續輕微搖擺,點擊輪播台詞。
const StickyTrooper = () => {
  const root = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [joke, setJoke] = useState<string | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".trooper-img",
          { rotation: -2 },
          {
            rotation: 2,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "50% 100%",
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleClick = () => {
    setJoke(jokes[idxRef.current % jokes.length]);
    idxRef.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setJoke(null), 3500);
  };

  return (
    <div ref={root} className="fixed bottom-4 right-4 z-30">
      {joke && (
        <div className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-2xl bg-[#111] px-4 py-3 text-sm text-white shadow-lg">
          {joke}
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-l-[8px] border-y-transparent border-l-[#111]" />
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        aria-label="跟傘兵打個招呼"
        className="block cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/paratrooper.png"
          alt=""
          aria-hidden
          className="trooper-img ink-drawing w-[100px] sm:w-[130px]"
        />
      </button>
    </div>
  );
};

export default StickyTrooper;
