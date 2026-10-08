"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem("theme");
    } catch {
      /* Use system theme when storage is blocked. */
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    const syncTheme = () =>
      setDark(document.documentElement.classList.contains("dark"));
    window.addEventListener("portfolio-theme-change", syncTheme);
    return () =>
      window.removeEventListener("portfolio-theme-change", syncTheme);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.dispatchEvent(new Event("portfolio-theme-change"));
    try {
      window.localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* Theme remains usable without storage. */
    }
  }

  return (
    <button
      aria-label={dark ? "切换至浅色模式" : "切换至深色模式"}
      aria-pressed={dark}
      className="rounded-full border border-ink/15 px-3 py-2 text-sm font-black text-ink/70 transition hover:border-clay hover:text-clay"
      onClick={toggleTheme}
      type="button"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
