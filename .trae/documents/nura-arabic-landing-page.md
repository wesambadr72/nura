# خطة تنفيذ موقع نُورا (NŪRA) — صفحة هبوط عربية

## 1. الملخص

بناء صفحة هبوط واحدة (Single Page) عربية بالكامل باتجاه RTL لاستوديو **نُورا** داخل تطبيق React Router v8 الموجود في `apps/web`، تتكون من:

- شريط تنقل ثابت (Sticky) + قائمة موبايل.
- 7 أقسام رئيسية: Hero، من نحن، خدماتنا، منهجيتنا، إنجازاتنا، الأسئلة الشائعة، تواصل معنا.
- فوتر + زر العودة للأعلى.
- هوية بصرية كاملة (فحمي داكن `#252B2A` / بنفسجي `#A746A6` / أخضر `#25C96D` / أبيض ناعم `#F5F6FA` / رمادي `#A6AAA9`).
- خطوط عربية: **Alexandria** للعناوين + **IBM Plex Sans Arabic** للنصوص.
- حركات تفاعلية مبنية على مفهوم «العناصر الثلاثة» (الفكرة / التعاون / الأثر).

المحتوى النصي العربي الكامل مأخوذ حرفياً من مواصفات المشروع.

---

## 2. تحليل الوضع الحالي

| الملف | الحالة | الملاحظة |
|---|---|---|
| [package.json](file:///c:/Users/Admin/nura/package.json) | npm workspaces + turbo | لا توجد تبعيات جديدة مطلوبة (zod و lucide متوفران) |
| [apps/web/package.json](file:///c:/Users/Admin/nura/apps/web/package.json) | React Router 8 + Vite 8 + Tailwind 4 + `zod` + `lucide-react` | جاهز |
| [src/root.tsx](file:///c:/Users/Admin/nura/apps/web/src/root.tsx) | `<html lang="en">` + Header + Toaster + `grid h-svh` | يحتاج تحويل إلى RTL + إعادة هيكلة الـ layout |
| [src/routes/_index.tsx](file:///c:/Users/Admin/nura/apps/web/src/routes/_index.tsx) | صفحة ASCII مؤقتة | ستُستبدل بتركيب الأقسام |
| [src/routes.ts](file:///c:/Users/Admin/nura/apps/web/src/routes.ts) | `flatRoutes()` | الأقسام ستُوضع في `src/components/` لتفادي إنشاء مسارات |
| [src/components/header.tsx](file:///c:/Users/Admin/nura/apps/web/src/components/header.tsx) | هيدر بسيط بزر تبديل الثيم | سيُستبدل بشريط تنقل نُورا |
| [src/components/theme-provider.tsx](file:///c:/Users/Admin/nura/apps/web/src/components/theme-provider.tsx) | `next-themes` | يبقى كما هو (افتراضي dark) |
| [packages/ui/src/styles/globals.css](file:///c:/Users/Admin/nura/packages/ui/src/styles/globals.css) | رموز shadcn الافتراضية + `--font-sans: Inter` | ستُضاف رموز الهوية والخطوط العربية |
| [apps/web/src/index.css](file:///c:/Users/Admin/nura/apps/web/src/index.css) | `@import "@nura/ui/globals.css"` | نقطة الدخول للأنماط |
| [apps/web/public/Symbol.webp](file:///c:/Users/Admin/nura/apps/web/public/Symbol.webp) | شعار أفقي (3 أشكال بنفسجية + wordmark فاتح) | يُستخدم في الهيدر والفوتر |
| [apps/web/public/SymbolV.webp](file:///c:/Users/Admin/nura/apps/web/public/SymbolV.webp) | شعار عمودي | يُستخدم في الهيرو/الفوتر |

**المكوّنات المتاحة في `@nura/ui`:** `button`, `card`, `input`, `textarea`, `label`, `dropdown-menu`, `sonner`, `checkbox`, `empty`, `skeleton`, `tooltip`, إلخ.
**غير متوفّر:** `accordion`, `select`, `sheet`, `dialog` → سيُبنى الأكورديون والقائمة المنسدلة يدوياً (بدون تبعيات جديدة).

**نمط الاستيراد:** `@nura/ui/components/<name>` و `@nura/ui/lib/utils` (عبر alias في [tsconfig.json](file:///c:/Users/Admin/nura/apps/web/tsconfig.json#L11-L14)).

---

## 3. القرارات والافتراضات

1. **الموقع داكن-أولاً (dark-only):** الخلفية الأساسية فحمي غامق كما في المواصفات. سيُضبط `defaultTheme="dark"` (موجود مسبقاً) ولن يُعرض زر تبديل الثيم في الهيدر لأن قائمة التنقل في المواصفات لا تتضمنه.
2. **الشعار بخلفية شفافة:** نُفترض أن ملفي `.webp` شفافان (الـ wordmark بلون `#F5F6FA` الفاتح يظهر على الخلفية الداكنة). إن تبيّن أن لهما خلفية بيضاء صلبة، سنحتاج نسخة شفافة — سيُوثّق ذلك كتحقق بصري.
3. **لا تعديل على الشعار:** لن نعيد رسم/تشويه الشعار. الأشكال الثلاثية الزخرفية في الهيرو/المنهجية/التواصل ستكون **تركيبات SVG جديدة مستوحاة** من الهندسة، منفصلة عن ملف الشعار الرسمي.
4. **لا backend:** نموذج التواصل سيُنفّذ تحقّقاً كامل من جهة العميل + حالة إرسال تجريبية واضحة (بدون ادّعاء الإرسال الفعلي).
5. **الخطوط:** تُحمّل من Google Fonts عبر `<link>` في `root.tsx` (بدون حزم جديدة).
6. **المحتوى:** كل النصوص العربية توضع كثوابت (constants) أعلى ملف كل قسم لتسهيل التحديث.
7. **بدون مكتبة حركات:** الحركات تُنفّذ بـ CSS + `IntersectionObserver` + `requestAnimationFrame`، مع احترام `prefers-reduced-motion`.
8. **الصور الفوتوغرافية:** المواصفات تفضّل visuals أصلية/تجريدية. سنعتمد على تركيبات SVG/تدرّجات بدل صور خارجية. (إن رغب المستخدم بصور، تُضاف لاحقاً).

---

## 4. التغييرات المقترحة

### 4.1 رموز التصميم (Design Tokens)

**الملف:** [packages/ui/src/styles/globals.css](file:///c:/Users/Admin/nura/packages/ui/src/styles/globals.css)

- إضافة ألوان الهوية داخل كتلة `@theme inline`:
  ```css
  --color-charcoal: #252B2A;
  --color-charcoal-soft: #2E3534;   /* أسطح أفتح قليلاً للبطاقات */
  --color-brand: #A746A6;           /* بنفسجي أساسي */
  --color-brand-green: #25C96D;     /* أخضر ثانوي */
  --color-soft-white: #F5F6FA;
  --color-muted-gray: #A6AAA9;
  ```
- الخطوط:
  ```css
  --font-sans: "IBM Plex Sans Arabic", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Alexandria", ui-sans-serif, system-ui, sans-serif;
  ```
  (توفّر `font-display` و `font-sans` كأدوات Tailwind v4).
- إعادة تعريف رموز الثيم في `.dark` لتتبنّى الهوية:
  - `--background: #252B2A`, `--foreground: #F5F6FA`
  - `--card: #2E3534`, `--border`, `--input`, `--muted`, `--muted-foreground: #A6AAA9`
  - `--primary: #A746A6`, `--primary-foreground: #F5F6FA`, `--ring: #A746A6`
- قواعد `@layer base`: إضافة `html { scroll-behavior: smooth; }` و `[id] { scroll-margin-top: 5.5rem; }`.
- تعريف `@keyframes` للحركات: `nura-converge` (تقارب الأشكال الثلاثة)، `reveal-up`، `float-soft`.
- إضافة `@media (prefers-reduced-motion: reduce)` لتعطيل/تقليل الحركات.
- تعريف utility `cn-font-heading` (المستخدم في بطاقات `@nura/ui` وهو غير معرّف حالياً) ليربط بخط العرض.

### 4.2 الطبقة الجذرية

**الملف:** [apps/web/src/root.tsx](file:///c:/Users/Admin/nura/apps/web/src/root.tsx)

- `<html lang="ar" dir="rtl">`.
- إضافة روابط Google Fonts (Alexandria + IBM Plex Sans Arabic) داخل `links`.
- استبدال الـ layout:
  ```tsx
  <div className="flex min-h-svh flex-col">
    <SiteHeader />
    <main className="flex-1"><Outlet /></main>
    <SiteFooter />
    <BackToTop />
  </div>
  ```
- إبقاء `ThemeProvider` (`defaultTheme="dark"`) و `Toaster`.
- إبقاء `ErrorBoundary` (ترجمة النصوص للإنجليزية لا ضرورة؛ تبقى كما هي).

### 4.3 المكوّنات المشتركة (`apps/web/src/components/`)

| الملف | الوصف |
|---|---|
| `site-header.tsx` | شريط تنقل RTL: شعار (`/Symbol.webp`) + 7 روابط + CTA «لنعمل معاً». Sticky مع تغيّر خلفية عند التمرير، تمييز القسم النشط بـ `IntersectionObserver`، قائمة موبايل (زر Menu/X + لوحة منسدلة). |
| `site-footer.tsx` | شعار + وصف + روابط سريعة + البريد + أيقونات تواصل (روابط placeholder) + حقوق النشر. |
| `back-to-top.tsx` | زر يظهر بعد التمرير ويعود للأعلى بسلاسة. |
| `reveal.tsx` | غلاف لحركة الظهور عند الدخول للـ viewport (يستخدم `useInView`). |
| `brand-shapes.tsx` | تركيبة SVG من 3 أشكال عضوية (بنفسجي/أخضر/رمادي) متقاربة نحو مركز — تُستخدم في الهيرو/المنهجية/التواصل + الحركة المميزة. |
| `section-heading.tsx` | مكوّن موحّد لعرض (label + عنوان + نص مساند). |
| `hooks/use-in-view.ts` | hook لـ IntersectionObserver. |
| `hooks/use-count-up.ts` | hook لعدّاد الأرقام. |

> سيُحذف/يُستبدل محتوى [header.tsx](file:///c:/Users/Admin/nura/apps/web/src/components/header.tsx) (يُعاد استخدامه كـ `site-header.tsx` أو يُعاد كتابته). `mode-toggle.tsx` سيبقى دون استخدام.

### 4.4 الأقسام (`apps/web/src/components/sections/`)

| الملف | القسم / ID | المحتوى الأساسي |
|---|---|---|
| `hero.tsx` | `#home` | **تخطيط متمركز (center)** فوق خلفية فحمية: تسمية «استوديو للإبداع والابتكار»، العنوان الرئيسي، النص المساند، زرّان CTA («اكتشف خدماتنا» / «تعرّف على نُورا»)، عبارة «ثلاثة عناصر، نقطة واحدة، وأثر مختلف.»، تركيبة `BrandShapes` متحركة خلف/أسفل المحتوى المتمركز. |
| `about.tsx` | `#about` | تخطيط تحريري منقسم (نص يمين / تركيبة بصرية يسار)، رسالتنا + رؤيتنا، عبارة «نحن لا نبحث عن الحل المعتاد…». |
| `services.tsx` | `#services` | شبكة 4 بطاقات مرقّمة (01–04) بعناوين/أوصاف/كلمات مفتاحية، أسطح فحمية، لمسات بنفسجية/خضراء، hover ناعم. |
| `approach.tsx` | `#approach` | 3 مراحل (الفكرة/التعاون/الأثر) كعملية متصلة أفقياً على الديسكتوب وعمودياً (Timeline) على الموبايل، مع تركيبة الأشكال الثلاثة المتقاربة + كلمات مفتاحية. |
| `impact.tsx` | `#impact` | 4 أرقام (35+ / 18+ / 12+ / 95%) بخط عرضي كبير + عدّاد تصاعدي عند الدخول، فواصل ناعمة. |
| `faq.tsx` | `#faq` | أكورديون مخصّص (state) بـ 6 أسئلة، مؤشرات +/−، لمسة بنفسجية للحالة النشطة، تخطيط عمودين على الديسكتوب. |
| `contact.tsx` | `#contact` | معلومات تواصل + نموذج (الاسم، البريد، الشركة اختياري، نوع المشروع `select`، الرسالة) + تحقّق بـ zod + حالة loading + toast نجاح/خطأ عربي، عبارة ختامية «الأفكار لا تصنع أثرها وحدها.» مع `BrandShapes`. |

### 4.5 الصفحة الرئيسية

**الملف:** [apps/web/src/routes/_index.tsx](file:///c:/Users/Admin/nura/apps/web/src/routes/_index.tsx)

- `meta`: العنوان «نُورا | استوديو للإبداع والابتكار» + الوصف المحدد في المواصفات.
- تركيب الأقسام السبعة بالترتيب داخل `<main>`.

---

## 5. خريطة المحتوى (مطابقة المواصفات)

- **Hero:** «استوديو للإبداع والابتكار» / «من الفكرة تبدأ الحكاية، وبالإبداع نصنع الأثر.» / النص المساند / CTA.
- **About:** «نؤمن أن الأفكار العظيمة تبدأ من نقطة التقاء.» + رسالتنا + رؤيتنا.
- **Services:** «مساحات مختلفة للإبداع، وحلول تصنع الفرق.» + 4 خدمات.
- **Approach:** «ثلاثة عناصر، تعمل معاً لصناعة شيء مختلف.» + 3 مراحل.
- **Impact:** «أفكار تتحول إلى نتائج.» + الأرقام.
- **FAQ:** «لديك تساؤلات؟ نبدأ من هنا.» + 6 أسئلة/أجوبة.
- **Contact:** «لديك فكرة؟ دعنا نكتشف إمكاناتها معاً.» + النموذج + معلومات التواصل + العبارة الختامية.
- **Footer:** وصف + روابط + `hello@nura.studio` + «© 2026 نُورا. جميع الحقوق محفوظة.»

---

## 6. التفاعل والحركة

1. تنقل ثابت + تمرير سلس (CSS `scroll-behavior`).
2. تمييز القسم النشط عبر `IntersectionObserver`.
3. قائمة موبايل RTL.
4. ظهور تدريجي (`Reveal`) للأقسام/البطاقات.
5. الحركة المميزة: تقارب 3 أشكال نحو مركز مشترك (`@keyframes nura-converge`).
6. حالات hover/active للأزرار.
7. أكورديون تفاعلي.
8. تحقّق النموذج + feedback.
9. عدّادات الأرقام.
10. زر العودة للأعلى.
11. احترام `prefers-reduced-motion`.

---

## 7. المتجاوبية

- Desktop ≥1440، Laptop 1024–1439، Tablet 768–1023، Mobile 320–767.
- Hero عمودي على الموبايل، البطاقات عمود واحد، المنهجية Timeline عمودي، الأرقام عمودان/عمود واحد، منع التمرير الأفقي، استخدام خصائص CSS المنطقية (`ms/me`, `ps/pe`, `text-start/end`, `inset-inline`).

---

## 8. خطوات التنفيذ (الترتيب)

1. تحديث رموز الهوية والخطوط والحركات في `globals.css`.
2. تحديث `root.tsx` (RTL + الخطوط + layout + Footer + BackToTop).
3. بناء المكوّنات المشتركة: `use-in-view`, `use-count-up`, `reveal`, `brand-shapes`, `section-heading`, `back-to-top`.
4. بناء `site-header.tsx` + `site-footer.tsx`.
5. بناء الأقسام السبعة بالترتيب.
6. تركيب الأقسام في `_index.tsx` + تحديث `meta`.
7. التحقق والتشغيل.

---

## 9. خطوات التحقق

1. `npm run dev` → فتح `http://localhost:5173/` والتأكد من عدم وجود أخطاء Vite/TS.
2. `npm run check-types` (أو `turbo run check-types`) → صفر أخطاء.
3. فحص بصري:
   - الاتجاه RTL صحيح في كل الأقسام والنموذج والقائمة.
   - ظهور الشعار بخلفية شفافة (إن ظهرت خلفية بيضاء → مطلوب ملف شفاف).
   - الخطوط العربية تُحمّل (Alexandria للعناوين، IBM Plex للنص).
   - تمييز القسم النشط، الأكورديون، العدّادات، زر العودة للأعلى تعمل.
   - اختبار النموذج: حقول مطلوبة + صيغة بريد + select + حالة loading + toast.
4. تجربة المتجاوبية على عرض 375px و768px و1440px (لا تمرير أفقي).

---

## 10. خارج النطاق

- لا أقسام رئيسية إضافية تتجاوز السبعة.
- لا backend للتواصل (إرسال تجريبي فقط).
- لا مكتبات حركات/UI جديدة.
- لا إعادة تصميم للشعار.
