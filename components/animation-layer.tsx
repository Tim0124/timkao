"use client";

import { useEffect, useState } from "react";
import IntroOverlay from "@/components/intro-overlay";
import ScrollPlane from "@/components/scroll-plane";
import StickyTrooper from "@/components/sticky-trooper";
import ReplayButton from "@/components/replay-button";

const SEEN_KEY = "intro-seen";

// 統籌所有 GSAP client island,並持有進場/重播狀態。
// 內容本體永遠由 server 渲染,IntroOverlay 只是覆蓋層,跑完即 unmount。
const AnimationLayer = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem(SEEN_KEY);
    // sessionStorage / matchMedia 只能在 client 讀,只能掛載後再決定是否播進場,
    // 否則 SSR 會 hydration mismatch。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!reduced && !seen) setShowIntro(true);
  }, []);

  const finishIntro = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroOverlay onComplete={finishIntro} />}
      <ScrollPlane />
      <StickyTrooper />
      <ReplayButton onReplay={() => setShowIntro(true)} hidden={showIntro} />
    </>
  );
};

export default AnimationLayer;
