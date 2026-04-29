export function Contact() {
  return (
    <section id="contact" className="section-shell pb-24">
      <div className="rounded-[2rem] border border-ink/10 bg-paper p-8 text-center shadow-soft sm:p-12">
        <p className="section-kicker">Contact</p>
        <h2 className="section-title">一起做点有意思的东西</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink/68">
          如果你想交流项目、课程学习或实习机会，可以通过邮箱联系我。
          这里先放示例邮箱，部署前记得改成你自己的联系方式。
        </p>
        <a
          className="mt-8 inline-flex rounded-full bg-clay px-6 py-3 text-sm font-black text-paper transition hover:-translate-y-0.5 hover:bg-ink"
          href="mailto:student@example.com"
        >
          student@example.com
        </a>
      </div>
    </section>
  );
}
