"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

// 頂部 mini C-130:隨整頁滾動進度由右飛到左,輔以 sin 波動。
const ScrollPlane = () => {
  const ref = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const setX = gsap.quickSetter(el, "x", "px");
    const setY = gsap.quickSetter(el, "y", "px");

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        const startX = window.innerWidth - 130;
        const endX = -20;
        setX(startX + p * (endX - startX));
        setY(reduced ? 0 : Math.sin(p * Math.PI * 4) * 6);
      },
    });

    return () => st.kill();
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src="/images/c130.png"
      alt=""
      aria-hidden
      className="ink-drawing pointer-events-none fixed left-0 top-6 z-20 w-[110px]"
    />
  );
};

export default ScrollPlane;
