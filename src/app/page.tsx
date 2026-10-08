import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Engineering } from "@/components/Engineering";
import { BlogPreview } from "@/components/BlogPreview";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
export const metadata = {
  alternates: { canonical: "https://20163070.github.io/student-portfolio/" },
};
export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Engineering />
      <BlogPreview />
      <About />
      <Contact />
    </main>
  );
}
