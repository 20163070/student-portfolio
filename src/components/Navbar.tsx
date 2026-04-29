import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Links", href: "/links" },
  { label: "Archive", href: "/archive" },
  { label: "Tags", href: "/tags" },
  { label: "About", href: "/about" },
  { label: "Search", href: "/search" },
];

export function Navbar() {
  return (
    <header className="section-shell flex items-center justify-between py-6">
      <Link className="text-lg font-black tracking-tight text-ink" href="/">
        Learning Archive
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/70 sm:flex">
        {navItems.map((item) => (
          <Link className="transition hover:text-clay" href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
      <MobileMenu items={navItems} />
    </header>
  );
}
