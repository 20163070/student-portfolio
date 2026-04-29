const navItems = [
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "实验", href: "#labs" },
  { label: "课程", href: "#courses" },
  { label: "思考", href: "#thoughts" },
  { label: "技能", href: "#skills" },
];

export function Navbar() {
  return (
    <header className="section-shell flex items-center justify-between py-6">
      <a className="text-lg font-black tracking-tight text-ink" href="#top">
        Learning Archive
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
