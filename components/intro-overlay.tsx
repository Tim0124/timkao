"use client";

import { useRef } from "react";
import { gsap, useGSAP, CustomEase } from "@/lib/gsap";

// 進場敘事:C-130 由右往左飛過,傘兵跳出降落,白幕淡入蓋過天空後整層 unmount。
// 時序與 easing 對齊 design/README.md 的規格(intro-duration = 4s)。
const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      CustomEase.create("c130", "0.4,0,0.6,1");
      CustomEase.create("jump", "0.34,0.04,0.58,1");

      // C-130 上下波動(獨立 infinite,與飛行的 left 位移互不衝突)
      gsap.to(".intro-c130", {
        y: -8,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const tl = gsap.timeline({ onComplete });

      // C-130 飛行:left 110% → -45%,4s
      tl.fromTo(
        ".intro-c130",
        { left: "110%" },
        { left: "-45%", duration: 4, ease: "c130" },
        0,
      );

      // 傘兵跳出(delay = 4 × 0.35 = 1.4s),拆成多段近似原 keyframes
      const trooper = gsap.timeline();
      trooper.set(".intro-trooper", {
        top: "32%",
        xPercent: -50,
        yPercent: -50,
        scale: 0.55,
        rotation: 10,
        opacity: 0,
      });
      trooper.to(
        ".intro-trooper",
        { opacity: 1, duration: 0.32, ease: "none" },
        0,
      );
      trooper.to(
        ".intro-trooper",
        { scale: 0.85, rotation: 4, duration: 1.4, ease: "jump" },
        0,
      );
      trooper.to(
        ".intro-trooper",
        { scale: 1, rotation: -2, duration: 1.4, ease: "jump" },
        1.4,
      );
      trooper.to(
        ".intro-trooper",
        {
          top: "78%",
          yPercent: 0,
          scale: 1.05,
          rotation: 2,
          duration: 1.2,
          ease: "jump",
        },
        2.8,
      );
      tl.add(trooper, 1.4);

      // 白幕淡入(delay = intro-duration + 0.2 = 4.2s)
      tl.fromTo(
        ".intro-veil",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        4.2,
      );
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: "var(--sky)" }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/c130.png"
        alt=""
        className="intro-c130 ink-drawing absolute top-[20%] h-auto"
        style={{ width: "clamp(380px, 38vw, 620px)" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/paratrooper.png"
        alt=""
        className="intro-trooper ink-drawing absolute left-[70%] w-[140px] h-auto"
      />
      {/* 收尾幕:跟隨頁面底色(dark mode 淡入深色而非白色) */}
      <div
        className="intro-veil absolute inset-0"
        style={{ background: "var(--bg)" }}
      />
    </div>
  );
};

export default IntroOverlay;
