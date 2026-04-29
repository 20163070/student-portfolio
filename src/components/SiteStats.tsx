import { getAllPosts, getAllTags } from "@/lib/posts";
import { courses } from "@/data/courses";
import { labs } from "@/data/labs";
import { projectGroups } from "@/data/projectGroups";

export function SiteStats() {
  const stats = [
    {
      label: "articles",
      value: getAllPosts().length,
    },
    {
      label: "projects",
      value: projectGroups.reduce((count, group) => count + group.items.length, 0),
    },
    {
      label: "labs",
      value: labs.length,
    },
    {
      label: "tags",
      value: getAllTags().length,
    },
    {
      label: "courses",
      value: courses.length,
    },
  ];

  return (
    <section className="section-shell py-8">
      <div className="grid gap-3 rounded-[2rem] border border-ink/10 bg-paper/80 p-4 shadow-soft sm:grid-cols-5">
        {stats.map((stat) => (
          <div className="rounded-[1.25rem] bg-cream p-5 text-center" key={stat.label}>
            <p className="text-3xl font-black text-ink">{stat.value}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-ink/45">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
