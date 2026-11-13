import { Mail } from "lucide-react";

const QUICK_LINKS = [
  { id: "about", label: "من نحن" },
  { id: "services", label: "خدماتنا" },
  { id: "approach", label: "منهجيتنا" },
  { id: "impact", label: "إنجازاتنا" },
  { id: "faq", label: "الأسئلة الشائعة" },
  { id: "contact", label: "تواصل معنا" },
] as const;

const SOCIALS = [
  { label: "إنستغرام", href: "#" },
  { label: "لينكدإن", href: "#" },
  { label: "دريبل", href: "#" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-charcoal-soft/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <img src="/Symbol.webp" alt="نُورا" className="h-9 w-auto object-contain" />
            <p className="max-w-sm text-sm/relaxed text-muted-foreground">
              استوديو للإبداع والابتكار، يحوّل الأفكار الطموحة إلى هويات وتجارب رقمية تترك أثراً
              حقيقياً. من الفكرة تبدأ الحكاية، وبالإبداع نصنع الأثر.
            </p>
          </div>

          <nav aria-label="روابط سريعة" className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-semibold text-foreground">روابط سريعة</h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-semibold text-foreground">تواصل معنا</h3>
            <a
              href="mailto:hello@nura.studio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
              dir="ltr"
            >
              <Mail className="size-4 shrink-0" />
              hello@nura.studio
            </a>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 px-4 text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© ٢٠٢٦ نُورا. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full bg-brand" aria-hidden="true" />
            <span className="inline-block size-2 rounded-full bg-brand-green" aria-hidden="true" />
            <span className="text-muted-gray">ثلاثة عناصر، نقطة واحدة، وأثر مختلف.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
