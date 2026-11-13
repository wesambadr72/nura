import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const SERVICES = [
  {
    number: "٠١",
    title: "العلامة التجارية",
    description:
      "نبني الهوية من جوهرها: الاستراتيجية، الاسم، النظام البصري، ودليل الاستخدام الذي يجعل علامتك متسقة في كل نقطة تواصل.",
    keywords: ["استراتيجية العلامة", "الهوية البصرية", "دليل الهوية"],
    accent: "brand" as const,
  },
  {
    number: "٠٢",
    title: "التصميم الرقمي",
    description:
      "نصمم تجارب رقمية تضع المستخدم في المقدّمة، من تدفقات الاستخدام والواجهات إلى المواقع والتطبيقات الجاهزة للانطلاق.",
    keywords: ["تجربة المستخدم", "واجهات المستخدم", "مواقع وتطبيقات"],
    accent: "green" as const,
  },
  {
    number: "٠٣",
    title: "المحتوى الإبداعي",
    description:
      "نصوغ الحكاية بأسلوب يحمل صوت علامتك، من السرد والكتابة إلى الحملات التي تصل إلى الناس وتُذكَر.",
    keywords: ["سرد العلامة", "كتابة إبداعية", "حملات"],
    accent: "brand" as const,
  },
  {
    number: "٠٤",
    title: "الحلول التقنية",
    description:
      "نحوّل التصميم إلى منتج حقيقي عبر التطوير والنماذج الأولية، بحلول قابلة للتوسع ومناسبة لأهداف العمل.",
    keywords: ["تطوير", "نماذج أولية", "حلول قابلة للتوسع"],
    accent: "green" as const,
  },
] as const;

export function Services() {
  return (
    <section id="services" className="border-t border-border/60 bg-charcoal-soft/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            label="خدماتنا"
            title="مساحات مختلفة للإبداع، وحلول تصنع الفرق."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <Reveal key={service.number} delay={index * 90}>
              <article className="group flex h-full flex-col gap-4 rounded-2xl border border-border/60 bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-card">
                <span
                  className={
                    service.accent === "brand"
                      ? "font-display text-3xl font-bold text-brand/70 transition-colors group-hover:text-brand"
                      : "font-display text-3xl font-bold text-brand-green/70 transition-colors group-hover:text-brand-green"
                  }
                >
                  {service.number}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm/relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="flex flex-wrap gap-2 pt-2">
                  {service.keywords.map((keyword) => (
                    <li
                      key={keyword}
                      className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
