import { Lightbulb, Users, TrendingUp } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const PHASES = [
  {
    index: "١",
    icon: Lightbulb,
    title: "الفكرة",
    description:
      "نبدأ بالإنصات وطرح الأسئلة الصحيحة لفهم الجوهر، ونحوّل الفكرة الغامضة إلى اتجاه واضح يمكن البناء عليه بثقة.",
    keywords: ["بحث", "استكشاف", "تحديد الفرص"],
  },
  {
    index: "٢",
    icon: Users,
    title: "التعاون",
    description:
      "نعمل معك جنباً إلى جنب في حوار مفتوح، نصيغ الحل معاً لا من أجلك فقط، ونتأكد أن كل تفصيل يخدم الهدف.",
    keywords: ["شراكة", "حوار", "عمل مشترك"],
  },
  {
    index: "٣",
    icon: TrendingUp,
    title: "الأثر",
    description:
      "نطلق الحل ونتابع أثره، ونقيس النتائج لنطوّر ما بعد الإطلاق نحو أثر أكبر وأكثر استدامة.",
    keywords: ["قياس", "نمو", "تأثير"],
  },
] as const;

export function Approach() {
  return (
    <section id="approach" className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            label="منهجيتنا"
            title="ثلاثة عناصر، تعمل معاً لصناعة شيء مختلف."
            description="نتبع عملية واحدة تبدأ بالفكرة، تنمو بالتعاون، وتنتهي بأثر يمكن قياسه."
          />
        </Reveal>

        <ol className="relative mt-14 flex flex-col gap-12 md:grid md:grid-cols-3 md:gap-8">
          <div
            className="absolute inset-y-0 start-8 w-px bg-gradient-to-b from-brand/40 via-brand-green/40 to-transparent md:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-8 hidden h-px bg-gradient-to-l from-transparent via-brand/40 to-brand-green/40 md:block"
            aria-hidden="true"
          />

          {PHASES.map((phase, index) => (
            <li key={phase.title} className="relative flex flex-col gap-4">
              <Reveal delay={index * 120}>
                <div className="flex items-start gap-4 md:flex-col md:gap-5">
                  <span className="relative z-10 inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-charcoal text-brand ring-1 ring-brand/30">
                    <phase.icon className="size-7" />
                    <span className="absolute -top-2 -end-2 inline-flex size-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-soft-white">
                      {phase.index}
                    </span>
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {phase.title}
                    </h3>
                    <p className="text-sm/relaxed text-muted-foreground">{phase.description}</p>
                    <ul className="flex flex-wrap gap-2">
                      {phase.keywords.map((keyword) => (
                        <li
                          key={keyword}
                          className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
