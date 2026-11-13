import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useCountUp } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";

const STATS = [
  { value: 35, suffix: "+", label: "مشروعاً منجزاً" },
  { value: 18, suffix: "+", label: "عميلاً شريكاً" },
  { value: 12, suffix: "+", label: "قطاعاً مختلفاً" },
  { value: 95, suffix: "٪", label: "رضا العملاء" },
] as const;

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const count = useCountUp(value, inView);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <span className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
        {count}
        <span className="text-brand">{suffix}</span>
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export function Impact() {
  return (
    <section id="impact" className="border-t border-border/60 bg-charcoal-soft/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            label="إنجازاتنا"
            title="أفكار تتحول إلى نتائج."
            description="أرقام تعكس رحلة من العمل المشترك مع علامات اختارت أن تترك أثراً."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 90}
              className="border-border/50 lg:[&:not(:first-child)]:border-s"
            >
              <Stat value={stat.value} suffix={stat.suffix} label={stat.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
