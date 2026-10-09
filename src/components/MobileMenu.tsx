"use client";

import { NavLink } from "./NavLink";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

type MobileMenuProps = {
  items: {
    label: string;
    href: string;
  }[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        className="rounded-full border border-ink/15 px-4 py-2 text-sm font-black text-ink"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label="主导航菜单"
        type="button"
      >
        Menu
      </button>
      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="移动端主导航"
          className="absolute left-5 right-5 top-20 z-20 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.5rem] border border-ink/10 bg-paper p-5 shadow-soft"
        >
          <div className="grid gap-3">
            {items.map((item) => (
              <NavLink
                className="rounded-2xl bg-cream px-4 py-3 text-sm font-black text-ink"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
        </nav>
      ) : null}
    </div>
  );
}
