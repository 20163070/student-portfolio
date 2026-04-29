"use client";

import Link from "next/link";
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
    <div className="sm:hidden">
      <button
        className="rounded-full border border-ink/15 px-4 py-2 text-sm font-black text-ink"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Menu
      </button>
      {open ? (
        <div className="absolute left-5 right-5 top-20 z-20 rounded-[1.5rem] border border-ink/10 bg-paper p-5 shadow-soft">
          <div className="grid gap-3">
            {items.map((item) => (
              <Link
                className="rounded-2xl bg-cream px-4 py-3 text-sm font-black text-ink"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
