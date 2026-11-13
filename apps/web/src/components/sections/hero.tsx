import { ArrowLeft, Sparkles } from "lucide-react";

import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(167,70,166,0.22) 0%, transparent 70%), radial-gradient(50% 45% at 85% 90%, rgba(37,201,109,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center gap-8 px-4 pt-24 pb-20 text-center sm:px-6 lg:px-8">


        <Reveal delay={180}>
          <h1 className="font-display text-4xl font-bold leading-[1.2] text-foreground sm:text-5xl lg:text-6xl">
            من الفكرة تبدأ الحكاية،
            <br className="hidden sm:block" /> وبالإبداع نصنع الأثر.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="max-w-2xl text-base/relaxed text-muted-foreground sm:text-lg/relaxed">
            في نُورا نمزج التفكير الاستراتيجي بالتصميم والتقنية، لنحوّل الأفكار الطموحة إلى هويات
            وتجارب رقمية متماسكة تترك أثراً حقيقياً لدى الجمهور.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-soft-white transition-colors hover:bg-brand/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            >
              اكتشف خدماتنا
              <ArrowLeft className="size-4" />
            </a>
            <a
              href="#about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border/70 px-7 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            >
              تعرّف على نُورا
            </a>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <p className="text-sm font-medium text-muted-gray">
            ثلاثة عناصر، نقطة واحدة، وأثر مختلف.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
