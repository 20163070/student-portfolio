import { courses } from "@/data/courses";

export function Courses() {
  return (
    <section id="courses" className="section-shell">
      <p className="section-kicker">Courses</p>
      <div className="rounded-[2rem] border border-ink/10 bg-paper p-8 shadow-soft sm:p-10">
        <h2 className="section-title">课程学习</h2>
        <p className="mt-4 max-w-2xl leading-7 text-ink/68">
          这里记录我上过的课、每门课关注的内容，以及对我有帮助的一句话总结。
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {courses.map((course) => (
            <article className="rounded-[1.5rem] bg-cream p-5" key={course.name}>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-clay">
                {course.semester}
              </p>
              <h3 className="mt-3 text-xl font-black text-ink">{course.name}</h3>
              <p className="mt-4 text-sm leading-6 text-ink/65">{course.focus}</p>
              <p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-6 text-ink/75">
                {course.takeaway}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
