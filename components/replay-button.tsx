"use client";

const ReplayButton = ({
  onReplay,
  hidden,
}: {
  onReplay: () => void;
  hidden: boolean;
}) => {
  if (hidden) return null;

  return (
    <button
      type="button"
      onClick={onReplay}
      className="fixed bottom-4 left-4 z-30 text-sm text-neutral-400 transition-colors hover:text-neutral-700"
    >
      ↻ 重播動畫
    </button>
  );
};

export default ReplayButton;
