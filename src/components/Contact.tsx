import { profile } from "@/data/profile";
export function Contact() {
  return (
    <section id="contact" className="section-shell pb-24">
      <div className="rounded-2xl border border-ink/10 bg-paper p-8 sm:p-12">
        <p className="section-kicker">Contact</p>
        <h2 className="section-title">从一个技术问题开始交流。</h2>
        <p className="mt-4 max-w-2xl leading-7 text-ink/70">
          欢迎交流 Harness、算法与 AI
          Infra，也欢迎讨论项目、实验室与技术实习机会。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="button-primary" href={"mailto:" + profile.email}>
            {profile.email}
          </a>
          <a className="button-secondary" href={profile.githubUrl}>
            GitHub / {profile.name} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
