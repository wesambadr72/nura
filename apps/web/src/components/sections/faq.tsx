import { cn } from "@nura/ui/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const FAQS = [
  {
    q: "كيف تبدأ رحلة العمل مع نُورا؟",
    a: "تبدأ بجلسة تعارف نفهم فيها فكرتك وأهدافك، ثم نقترح نطاقاً واضحاً للعمل وخطة زمنية، وبعدها ننطلق في مرحلة الاستكشاف.",
  },
  {
    q: "كم يستغرق إنجاز المشروع؟",
    a: "يعتمد الأمر على حجم المشروع ونطاقه؛ بعض المشاريع تكتمل في أسابيع، وتحتاج المشاريع المتكاملة فترة أطول. نحدّد الجدول بوضوح قبل البدء.",
  },
  {
    q: "هل تعملون مع العلامات الناشئة؟",
    a: "نعم، نعمل مع العلامات الناشئة والقائمة على حدّ سواء، ونصمّم نطاق العمل بما يناسب مرحلتك وميزانيتك.",
  },
  {
    q: "ما الذي يميّز منهجيتكم؟",
    a: "نعتمد على ثلاثة عناصر: الفكرة، والتعاون، والأثر. لا نسلّم تصميماً فحسب، بل نبني حلاً ينبع من فهم عميق ويقود إلى نتيجة ملموسة.",
  },
  {
    q: "هل تقدّمون خدمات التطوير التقني؟",
    a: "نعم، نمتلك فريقاً يحوّل التصاميم إلى منتجات حقيقية قابلة للاستخدام والتوسع، من النموذج الأولي حتى الإطلاق.",
  },
  {
    q: "كيف تضمنون جودة النتائج؟",
    a: "نعتمد على مراجعات منتظمة ونقاط تسليم واضحة، ونقيس أثر العمل بعد الإطلاق لنطوّر ما يمكن تحسينه باستمرار.",
  },
] as const;

function FaqItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        className={cn(
          "rounded-2xl border bg-card/40 transition-colors",
          open ? "border-brand/50 bg-card/70" : "border-border/60",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 p-5 text-start"
        >
          <span
            className={cn(
              "font-display text-base font-semibold transition-colors",
              open ? "text-brand" : "text-foreground",
            )}
          >
            {q}
          </span>
          <span
            className={cn(
              "inline-flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors",
              open
                ? "border-brand bg-brand text-soft-white"
                : "border-border/70 text-muted-foreground",
            )}
          >
            {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
          </span>
        </button>
        <div
          className={cn(
            "grid transition-all duration-300 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-5 text-sm/relaxed text-muted-foreground">{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <SectionHeading label="الأسئلة الشائعة" title="لديك تساؤلات؟ نبدأ من هنا." />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {FAQS.slice(0, 3).map((faq, index) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} delay={index * 80} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.slice(3).map((faq, index) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} delay={index * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
