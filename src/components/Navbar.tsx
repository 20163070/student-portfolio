import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "作业", href: "/coursework" },
  { label: "Learning", href: "/learning" },
  { label: "Archive", href: "/archive" },
  { label: "Tags", href: "/tags" },
  { label: "About", href: "/about" },
  { label: "Search", href: "/search" },
];

export function Navbar() {
  return (
    <header className="section-shell flex items-center justify-between py-6">
      <Link
        className="font-mono text-base font-bold tracking-tight text-ink"
        href="/"
      >
        <span className="text-clay" aria-hidden="true">
          ~/
        </span>
        20163070
        <span className="text-clay" aria-hidden="true">
          _
        </span>
      </Link>
      <nav
        aria-label="主导航"
        className="hidden items-center gap-6 font-mono text-xs font-semibold text-ink/70 lg:flex"
      >
        {navItems.map((item) => (
          <Link
            className="transition hover:text-clay"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
      <MobileMenu items={navItems} />
    </header>
  );
}
