import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Courses } from "@/components/Courses";
import { Hero } from "@/components/Hero";
import { Labs } from "@/components/Labs";
import { BlogPreview } from "@/components/BlogPreview";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { SiteStats } from "@/components/SiteStats";
import { Thoughts } from "@/components/Thoughts";

export default function Home() {
  return (
    <main>
      <Hero />
      <SiteStats />
      <About />
      <Projects />
      <BlogPreview />
      <Labs />
      <Courses />
      <Thoughts />
      <Skills />
      <Contact />
    </main>
  );
}
