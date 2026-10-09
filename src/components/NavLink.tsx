"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        className +
        (active
          ? " font-bold text-clay underline decoration-clay/50 underline-offset-4"
          : "")
      }
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
