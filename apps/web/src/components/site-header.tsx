import { cn } from "@nura/ui/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { id: "home", label: "الرئيسية" },
  { id: "about", label: "من نحن" },
  { id: "services", label: "خدماتنا" },
  { id: "approach", label: "منهجيتنا" },
  { id: "impact", label: "إنجازاتنا" },
  { id: "faq", label: "الأسئلة الشائعة" },
  { id: "contact", label: "تواصل معنا" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border/60 bg-charcoal/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
          aria-label="نُورا — الرئيسية"
        >
          <img src="/Symbol.webp" alt="نُورا" className="h-8 w-auto object-contain" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand transition-opacity duration-300",
                  active === item.id ? "opacity-100" : "opacity-0",
                )}
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden h-10 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-soft-white transition-colors hover:bg-brand/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 lg:inline-flex"
          >
            لنعمل معاً
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border/60 bg-charcoal lg:hidden",
          open ? "max-h-[80vh]" : "max-h-0 border-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "border-b border-border/40 py-3 text-base font-medium transition-colors last:border-0",
                active === item.id ? "text-brand" : "text-foreground/80 hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="my-3 inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-soft-white transition-colors hover:bg-brand/85"
          >
            لنعمل معاً
          </a>
        </nav>
      </div>
    </header>
  );
}
