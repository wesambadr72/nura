import { Button } from "@nura/ui/components/button";
import { Input } from "@nura/ui/components/input";
import { Label } from "@nura/ui/components/label";
import { Textarea } from "@nura/ui/components/textarea";
import { cn } from "@nura/ui/lib/utils";
import { Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const PROJECT_TYPES = [
  "هوية بصرية",
  "موقع إلكتروني",
  "تطبيق",
  "محتوى وتسويق",
  "أخرى",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "الرجاء إدخال الاسم الكامل."),
  email: z
    .string()
    .trim()
    .min(1, "الرجاء إدخال بريدك الإلكتروني.")
    .email("الرجاء إدخال بريد إلكتروني صحيح."),
  company: z.string().trim().optional(),
  projectType: z.string().trim().min(1, "الرجاء اختيار نوع المشروع."),
  message: z.string().trim().min(10, "الرجاء كتابة رسالة لا تقل عن ١٠ أحرف."),
});

type FieldName = keyof z.infer<typeof schema>;

const FIELD_CLASS = "h-11 rounded-xl border-border/60 bg-card/50 px-4 text-sm";

export function Contact() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [pending, setPending] = useState(false);

  function clearError(field: FieldName) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const parsed = schema.safeParse({
      name: formData.get("name") ?? "",
      email: formData.get("email") ?? "",
      company: formData.get("company") ?? "",
      projectType: formData.get("projectType") ?? "",
      message: formData.get("message") ?? "",
    });

    if (!parsed.success) {
      const nextErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName | undefined;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      toast.error("تعذّر الإرسال، الرجاء التحقق من الحقول المطلوبة.");
      return;
    }

    setErrors({});
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setPending(false);
    form.reset();
    toast.success("وصلتنا رسالتك! سنتواصل معك قريباً.");
  }

  return (
    <section id="contact" className="border-t border-border/60 bg-charcoal-soft/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionHeading
                label="تواصل معنا"
                title="لديك فكرة؟ دعنا نكتشف إمكاناتها معاً."
                description="أخبرنا عن مشروعك أو تحدّيك، وسنعود إليك بخطوة أولى واضحة."
              />
            </Reveal>

            <Reveal delay={100}>
              <a
                href="mailto:hello@nura.studio"
                className="inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 text-sm font-medium text-foreground transition-colors hover:border-brand/50 hover:text-brand"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Mail className="size-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-muted-foreground">راسلنا مباشرةً</span>
                  <span dir="ltr" className="text-start">
                    hello@nura.studio
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={160}>
              <div className="relative flex flex-col items-center gap-4 rounded-[2rem] border border-border/60 bg-gradient-to-br from-brand/10 via-transparent to-brand-green/10 p-8 text-center">
                <p className="font-display text-xl font-bold text-foreground">
                  الأفكار لا تصنع أثرها وحدها.
                </p>
                <p className="text-sm text-muted-foreground">
                  لنبدأ من نقطة التقاء واحدة، ونصنع معاً شيئاً مختلفاً.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-[2rem] border border-border/60 bg-card/50 p-6 sm:p-8"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  الاسم الكامل
                </Label>
                <Input
                  id="name"
                  name="name"
                  className={FIELD_CLASS}
                  placeholder="مثال: نورة العبدالله"
                  aria-invalid={Boolean(errors.name)}
                  onChange={() => clearError("name")}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  className={cn(FIELD_CLASS, "text-start")}
                  placeholder="name@example.com"
                  aria-invalid={Boolean(errors.email)}
                  onChange={() => clearError("email")}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company" className="text-sm font-medium text-foreground">
                    الشركة <span className="text-muted-foreground">(اختياري)</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    className={FIELD_CLASS}
                    placeholder="اسم الشركة"
                    onChange={() => clearError("company")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="projectType" className="text-sm font-medium text-foreground">
                    نوع المشروع
                  </Label>
                  <select
                    id="projectType"
                    name="projectType"
                    defaultValue=""
                    aria-invalid={Boolean(errors.projectType)}
                    onChange={() => clearError("projectType")}
                    className={cn(
                      FIELD_CLASS,
                      "w-full text-foreground outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50",
                    )}
                  >
                    <option value="" disabled>
                      اختر نوع المشروع
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-charcoal text-foreground">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="text-xs text-destructive">{errors.projectType}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  رسالتك
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="min-h-32 rounded-xl border-border/60 bg-card/50 px-4 py-3 text-sm"
                  placeholder="أخبرنا عن فكرتك، أهدافك، والنتيجة التي تطمح إليها…"
                  aria-invalid={Boolean(errors.message)}
                  onChange={() => clearError("message")}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="h-12 w-full gap-2 rounded-full bg-brand text-sm font-semibold text-soft-white hover:bg-brand/85 disabled:opacity-70"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    جارٍ الإرسال…
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    أرسل الرسالة
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                نرد عادةً خلال ٢٤ ساعة، ونحترم خصوصية بياناتك.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
