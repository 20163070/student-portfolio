import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
export const metadata = {
  alternates: {
    canonical: "https://20163070.github.io/student-portfolio/about/",
  },
  title: "About",
  description: "复旦大学 2025 级本科生，关注 Harness、算法与 AI Infra。",
};
export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <h1 className="sr-only">关于 20163070</h1>
      <About />
      <Contact />
    </main>
  );
}
