"use client";

import { useState } from "react";

export function CounterDemo() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <div className="mt-6 rounded-2xl border border-ink/15 bg-paper p-6 sm:p-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-clay">
        Interactive Counter
      </p>
      <p className="mt-5 text-sm font-semibold text-ink/70">当前 count</p>
      <output
        aria-live="polite"
        aria-atomic="true"
        className="mt-2 block font-mono text-6xl font-bold tabular-nums text-ink"
      >
        {count}
      </output>
      <button
        type="button"
        onClick={handleClick}
        className="button-primary mt-6 min-h-12 font-mono text-base"
      >
        count is {count}
      </button>
      <p className="mt-4 text-sm leading-6 text-ink/70">
        每次点击加 1，也可以用 Tab 聚焦按钮，再按 Enter 或空格。刷新页面回到 0。
      </p>
    </div>
  );
}
