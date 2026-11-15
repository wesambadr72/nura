import { Compass, Target } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const PILLARS = [
  {
    icon: Target,
    title: "رسالتنا",
    text: "تحويل الأفكار الطموحة إلى هويات وتجارب رقمية واضحة ومتماسكة، تمزج الجمال بالمعنى وتضع الإنسان في مركز القرار.",
  },
  {
    icon: Compass,
    title: "رؤيتنا",
    text: "أن نكون الشريك الإبداعي الذي تثق به العلامات الطموحة، حين تبحث عن أثر حقيقي لا عن حل عابر.",
  },
] as const;

export function About() {
  return (
    <section id="about" className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionHeading label="من نحن" title="نؤمن أن الأفكار العظيمة تبدأ من نقطة الإلتقاء." />
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {PILLARS.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 100}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card/50 p-6">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                      <pillar.icon className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-sm/relaxed text-muted-foreground">{pillar.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <p className="text-base/relaxed font-medium text-foreground">
                نحن لا نبحث عن الحل المعتاد، بل عن النقطة التي تلتقي فيها الفكرة بالتنفيذ ليصنعا
                معاً فرقاً يُلاحَظ.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
