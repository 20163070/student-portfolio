const navItems = [
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "技能", href: "#skills" },
  { label: "联系", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="section-shell flex items-center justify-between py-6">
      <a className="text-lg font-black tracking-tight text-ink" href="#top">
        Portfolio
      </a>
      <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/70 sm:flex">
        {navItems.map((item) => (
          <a className="transition hover:text-clay" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
