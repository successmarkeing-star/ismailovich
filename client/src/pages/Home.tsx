// Design system: Atlas Corridors — bilingual Arabic/English logistics interface with directional motion, route markers, paper texture, and copper signal accents.
import { useEffect, useState, type FormEvent } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { toast } from "sonner";
import {
  ArrowDownLeft,
  ArrowUpLeft,
  Check,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  FileCheck2,
  Menu,
  PackageSearch,
  Ship,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

type Language = "ar" | "en";

const asset = {
  hero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663232981300/kmcQAGjHnZydddcy.jpg",
  sourcing: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663232981300/gCeXHAJDZDYCpumY.jpg",
  shipping: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663232981300/SBsWXalTPwfLVaBl.jpg",
  delivery: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663232981300/hDRLKDEnioYcOahG.jpg",
  mark: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663232981300/BFCeELLRyxUBYfvF.png",
};

const content = {
  ar: {
    brand: "الرائدة الفضية",
    brandSub: "SILVER PIONEER",
    nav: { services: "خدماتنا", route: "كيف نعمل", about: "عن الرائدة", contact: "تواصل معنا", portal: "بوابة العملاء" },
    language: "EN",
    quote: "اطلب عرضًا",
    routeTag: "من الصين إلى مستودعك",
    heroTitle: <>من المصنع<br /><span className="text-[var(--steel-silver)]">إلى مستودعك.</span><br /><span className="text-[var(--copper-signal)]">بخطوات محسوبة.</span></>,
    heroDescription: "شريكك المتكامل في الاستيراد من الصين: نبحث، نتحقق، نشحن، نخلّص وننقل — لتبقى أنت مركزًا على نمو تجارتك.",
    start: "ابدأ مسار استيرادك",
    discover: "اكتشف الرحلة",
    coordinates: "34° 18′ N / 120° 10′ E",
    visionKicker: "/ 01 — الرؤية",
    visionTitle: "الاستيراد ليس شحنة واحدة. إنه مسار كامل.",
    visionText: "في الرائدة الفضية، نرى الصورة من الأعلى وننتبه إلى التفاصيل في الأسفل. ننسق رحلة الاستيراد حول قرار واضح، مورد موثوق، ومسار لوجستي يناسب تجارتك فعلًا.",
    visionStat: "نقطة اتصال واحدة<br />لرحلة متكاملة",
    servicesKicker: "/ 02 — خدماتنا",
    servicesTitle: "كل خطوة في مكانها الصحيح.",
    servicesDescription: "حلول مترابطة تبدأ من سؤال بسيط: ما الذي تريد استيراده؟ وتنتهي بوصوله إلى المكان الذي تحتاجه.",
    servicesMeta: "04 مسارات، قرار واحد",
    requestService: "اطلب هذه الخدمة",
    routeKicker: "/ 03 — كيف نعمل",
    routeTitle: "خط واضح، حتى عندما تكون التفاصيل كثيرة.",
    routeDescription: "نحوّل العملية إلى أربع محطات مفهومة، مع نقطة اتصال واحدة وفريق يعرف ما الذي يأتي بعد ذلك.",
    talk: "تحدث مع فريقنا",
    whyKicker: "/ 04 — لماذا نحن",
    whyTitle: "نخطط للمسار قبل أن تتحرك الشحنة.",
    whyDescription: "المسار الجيد لا يعتمد على الحظ. نعتمد على وضوح المواصفات، فحص الخيارات، وتنسيق المراحل حتى لا تضطر لإدارة خمسة أطراف في وقت واحد.",
    flexible: "مسارات مرنة",
    whyBullets: ["فهم كامل لاحتياجك", "خيارات موردين أوضح", "متابعة من نقطة واحدة", "حلول بحرية وجوية"],
    contactKicker: "/ 05 — بداية المسار",
    contactTitle: <>لديك منتج في بالك؟<br />خلّنا نرسم طريقه.</>,
    contactDescription: "شاركنا التفاصيل الأولية وسنعود إليك بخطوة واضحة تالية، من دون تعقيد أو التزام مسبق.",
    contactNote: "استشارة أولية حول مسار الاستيراد",
    form: { name: "الاسم", namePlaceholder: "كيف نناديك؟", phone: "رقم التواصل", phonePlaceholder: "05X XXX XXXX", request: "ما الذي تبحث عنه؟", requestPlaceholder: "منتج، كمية تقريبية، أو مسار شحن تفكر فيه...", submit: "أرسل التفاصيل", sending: "جارٍ تجهيز واتساب...", sent: "تم تجهيز رسالتك، سيتم فتح واتساب الآن", privacy: "نستخدم بياناتك فقط للتواصل حول طلبك." },
    footerTag: "نرتب الطريق. أنت تبني تجارتك.",
    email: "البريد الإلكتروني",
    phone: "+966 54 374 9292",
    footerCopy: "© 2026 الرائدة الفضية. جميع الحقوق محفوظة.",
    success: "تم استلام طلبك مبدئيًا",
    successDescription: "سيتواصل معك فريق الرائدة الفضية لترتيب التفاصيل.",
    serviceData: [
      { number: "01", icon: PackageSearch, title: "بحث وتوريد", description: "نحوّل فكرتك إلى مواصفات واضحة، ثم نبحث عن المنتج والمورد والمصنع الأنسب في الصين.", meta: "PRODUCT / SUPPLIER", image: asset.sourcing },
      { number: "02", icon: Ship, title: "شحن بحري وجوي", description: "نختار مسار الشحن المناسب لوقتك وميزانيتك، مع متابعة واضحة من نقطة الانطلاق حتى الوصول.", meta: "SEA / AIR FREIGHT", image: asset.shipping },
      { number: "03", icon: FileCheck2, title: "تخليص جمركي", description: "نرتب الوثائق وننسق الإجراءات الجمركية لتصل شحنتك إلى الخطوة التالية دون تعقيد غير ضروري.", meta: "CUSTOMS / CLEARANCE", image: asset.delivery },
      { number: "04", icon: Truck, title: "نقل وتسليم", description: "من الميناء إلى مستودعك، نكمل الرحلة بنقل منسق وتسليم يعتمد على الموعد المتفق عليه.", meta: "LAST MILE / DELIVERY", image: asset.delivery },
    ],
    routeSteps: [{ code: "A-01", title: "نحدد المطلوب", detail: "منتج، كمية، مواصفات" }, { code: "B-02", title: "نبحث ونتحقق", detail: "مصنع، سعر، عينة" }, { code: "C-03", title: "نشحن ونتابع", detail: "بحري أو جوي" }, { code: "D-04", title: "نسلّم بثقة", detail: "تخليص، نقل، وصول" }],
  },
  en: {
    brand: "Silver Pioneer",
    brandSub: "الرائدة الفضية",
    nav: { services: "Services", route: "How it works", about: "About us", contact: "Contact", portal: "Client portal" },
    language: "العربية",
    quote: "Request a quote",
    routeTag: "From China to your warehouse",
    heroTitle: <>From the factory<br /><span className="text-[var(--steel-silver)]">to your warehouse.</span><br /><span className="text-[var(--copper-signal)]">With every step measured.</span></>,
    heroDescription: "Your integrated China sourcing and logistics partner. We research, verify, ship, clear, and deliver — so you can stay focused on growing your business.",
    start: "Start your import route",
    discover: "Explore the journey",
    coordinates: "34° 18′ N / 120° 10′ E",
    visionKicker: "/ 01 — OUR VIEW",
    visionTitle: "Importing is not one shipment. It is a complete route.",
    visionText: "At Silver Pioneer, we see the full picture and stay close to the details. We shape every import journey around a clear decision, a trusted supplier, and a logistics route that fits your business.",
    visionStat: "One point of contact<br />for the complete journey",
    servicesKicker: "/ 02 — SERVICES",
    servicesTitle: "Every step in the right place.",
    servicesDescription: "Connected solutions that begin with one simple question: what do you want to import? And end with it arriving where you need it.",
    servicesMeta: "04 ROUTES, ONE DECISION",
    requestService: "Request this service",
    routeKicker: "/ 03 — HOW IT WORKS",
    routeTitle: "A clear route, even when the details are many.",
    routeDescription: "We turn a complex operation into four understandable stops, with one point of contact and a team that knows what comes next.",
    talk: "Talk to our team",
    whyKicker: "/ 04 — WHY US",
    whyTitle: "We plan the route before the shipment moves.",
    whyDescription: "A good route is not left to chance. We bring clarity to specifications, review the options, and coordinate every stage so you do not have to manage five parties at once.",
    flexible: "Flexible routes",
    whyBullets: ["A clear read of your needs", "Better supplier options", "One point of follow-up", "Sea and air solutions"],
    contactKicker: "/ 05 — START THE ROUTE",
    contactTitle: <>Have a product in mind?<br />Let us draw its route.</>,
    contactDescription: "Share the first details and we will come back with a clear next step — without unnecessary complexity or commitment.",
    contactNote: "An initial consultation for your import route",
    form: { name: "Name", namePlaceholder: "What should we call you?", phone: "Contact number", phonePlaceholder: "+966 5X XXX XXXX", request: "What are you looking for?", requestPlaceholder: "Product, estimated quantity, or shipping route...", submit: "Send details", sending: "Preparing WhatsApp...", sent: "Your message is ready. WhatsApp will open now", privacy: "We use your details only to respond to your request." },
    footerTag: "We arrange the route. You build the business.",
    email: "Email us",
    phone: "+966 54 374 9292",
    footerCopy: "© 2026 Silver Pioneer. All rights reserved.",
    success: "Your request has been received",
    successDescription: "The Silver Pioneer team will contact you to arrange the details.",
    serviceData: [
      { number: "01", icon: PackageSearch, title: "Sourcing & supply", description: "We turn your idea into clear specifications, then find the right product, supplier, and factory in China.", meta: "PRODUCT / SUPPLIER", image: asset.sourcing },
      { number: "02", icon: Ship, title: "Sea & air freight", description: "We select the shipping route that fits your timing and budget, with clear follow-up from origin to arrival.", meta: "SEA / AIR FREIGHT", image: asset.shipping },
      { number: "03", icon: FileCheck2, title: "Customs clearance", description: "We organize the documents and coordinate customs procedures so your shipment keeps moving without unnecessary friction.", meta: "CUSTOMS / CLEARANCE", image: asset.delivery },
      { number: "04", icon: Truck, title: "Transport & delivery", description: "From port to warehouse, we complete the journey with coordinated transport and delivery around the agreed timing.", meta: "LAST MILE / DELIVERY", image: asset.delivery },
    ],
    routeSteps: [{ code: "A-01", title: "Define the need", detail: "Product, quantity, specs" }, { code: "B-02", title: "Search & verify", detail: "Factory, price, sample" }, { code: "C-03", title: "Ship & follow up", detail: "Sea or air" }, { code: "D-04", title: "Deliver with confidence", detail: "Clearance, transport, arrival" }],
  },
} as const;

function useScrollMotion() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".motion-right"));
    let frame = 0;
    const update = () => {
      const viewport = window.innerHeight;
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (viewport * 0.82 - rect.top) / (viewport + rect.height)));
        const depth = Number(element.dataset.depth || 12);
        element.style.setProperty("--scroll-x", `${Math.round(progress * depth)}px`);
        element.style.setProperty("--scroll-opacity", `${0.55 + Math.min(0.45, Math.max(0, progress + 0.2))}`);
      });
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  });
}

function Logo({ language, light = false }: { language: Language; light?: boolean }) {
  const t = content[language];
  return (
    <a href="#top" className="flex items-center gap-3" aria-label={language === "ar" ? "الرائدة الفضية - إلى الأعلى" : "Silver Pioneer - back to top"}>
      <span className={`flex h-11 w-11 items-center justify-center p-2 shadow-[4px_4px_0_var(--copper-signal)] ${light ? "bg-[var(--paper-ivory)]" : "bg-[var(--ink-navy)]"}`}><img src={asset.mark} alt="" className="h-full w-full object-contain" /></span>
      <span className="leading-none"><span className={`font-display block text-[0.92rem] font-bold tracking-[-0.05em] ${light ? "text-[var(--paper-ivory)]" : "text-[var(--ink-navy)]"}`}>{t.brand}</span><span className={`font-mono mt-1 block text-[0.53rem] font-medium tracking-[0.14em] ${light ? "text-white/50" : "text-[var(--muted-foreground)]"}`}>{t.brandSub}</span></span>
    </a>
  );
}

function SectionTitle({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return <div className={`max-w-2xl ${light ? "text-[var(--paper-ivory)]" : "text-[var(--ink-navy)]"}`}><p className="section-kicker">{eyebrow}</p><h2 className="font-display mt-4 text-3xl font-bold leading-[1.35] tracking-[-0.06em] sm:text-4xl lg:text-[3rem]">{title}</h2>{description && <p className={`mt-5 max-w-xl text-base leading-8 ${light ? "text-[rgba(245,241,232,0.7)]" : "text-[var(--muted-foreground)]"}`}>{description}</p>}</div>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "en" || requested === "ar") return requested;
    return (localStorage.getItem("silver-pioneer-language") as Language) || "ar";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = content[language];
  useScrollMotion();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = language === "ar" ? "الرائدة الفضية | بوابة الاستيراد واللوجستيات" : "Silver Pioneer | Import & Logistics Gateway";
    localStorage.setItem("silver-pioneer-language", language);
  }, [language]);

  const toggleLanguage = () => { setLanguage((current) => current === "ar" ? "en" : "ar"); setMenuOpen(false); };
  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const request = String(formData.get("request") || "").trim();
    const whatsappUrl = buildWhatsAppUrl(language, { name, phone, request });
    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    toast.success(t.form.sent, { description: t.successDescription });
    window.setTimeout(() => {
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        window.location.href = whatsappUrl;
      }
      form.reset();
      setIsSubmitting(false);
    }, 650);
  };
  const closeMenu = () => setMenuOpen(false);
  const arrow = language === "ar" ? <ArrowUpLeft size={17} /> : <ArrowUpLeft size={17} />;

  return (
    <div id="top" dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-x-hidden bg-[var(--paper-ivory)] text-[var(--graphite)]">
      <header className="absolute inset-x-0 top-0 z-50"><div className="container flex h-[84px] items-center justify-between"><Logo language={language} light /><nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation"><a className="nav-link text-sm font-medium text-[rgba(245,241,232,0.82)]" href="#services">{t.nav.services}</a><a className="nav-link text-sm font-medium text-[rgba(245,241,232,0.82)]" href="#route">{t.nav.route}</a><a className="nav-link text-sm font-medium text-[rgba(245,241,232,0.82)]" href="#about">{t.nav.about}</a><a className="nav-link text-sm font-medium text-[rgba(245,241,232,0.82)]" href="#contact">{t.nav.contact}</a></nav><div className="hidden items-center gap-4 lg:flex"><button onClick={toggleLanguage} className="font-mono text-[0.65rem] tracking-[0.13em] text-[rgba(245,241,232,0.72)] transition-colors hover:text-[var(--copper-signal)]" aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}>{t.language}</button><a href="/dashboard" className="text-xs font-medium text-[rgba(245,241,232,0.72)] transition-colors hover:text-[var(--copper-signal)]">{t.nav.portal}</a><a href="#contact" className="signal-button inline-flex items-center gap-2 bg-[var(--copper-signal)] px-5 py-3 text-sm font-bold text-white">{t.quote} <ArrowUpLeft size={16} strokeWidth={1.8} /></a></div><button className="inline-flex h-11 w-11 items-center justify-center border border-white/30 text-white lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>{menuOpen && <div className="mx-5 border-t border-white/15 bg-[var(--ink-navy)] px-6 py-6 shadow-2xl lg:hidden"><nav className="flex flex-col gap-5" aria-label="Mobile navigation">{[[t.nav.services, "#services"], [t.nav.route, "#route"], [t.nav.about, "#about"], [t.nav.contact, "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="border-b border-white/10 pb-4 text-sm font-medium text-white">{label}</a>)}<a href="/dashboard" onClick={closeMenu} className="border-b border-white/10 pb-4 text-sm font-medium text-white">{t.nav.portal}</a><div className="flex items-center gap-3"><a href="#contact" onClick={closeMenu} className="inline-flex w-fit items-center gap-2 bg-[var(--copper-signal)] px-5 py-3 text-sm font-bold text-white">{t.quote} <ArrowUpLeft size={16} /></a><button onClick={toggleLanguage} className="border border-white/20 px-4 py-3 font-mono text-xs text-white">{t.language}</button></div></nav></div>}</header>

      <main>
        <section className="relative min-h-[720px] overflow-hidden bg-[var(--ink-navy)] pt-28 sm:min-h-[780px] lg:min-h-[850px] lg:pt-36"><div className="absolute inset-0 opacity-60"><img src={asset.hero} alt={language === "ar" ? "حاويات شحن في ميناء حديث" : "Shipping containers in a modern port"} className="atlas-image h-full w-full object-cover object-center" /></div><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,42,67,0.72)_0%,rgba(16,42,67,0.78)_38%,rgba(16,42,67,0.9)_100%)]" /><div className="container relative z-10 flex min-h-[590px] flex-col justify-center pb-16 lg:min-h-[660px]"><div className="max-w-3xl"><div className="appear-up flex items-center gap-4"><span className="h-px w-14 bg-[var(--copper-signal)]" /><span className="section-kicker">{t.routeTag}</span></div><h1 className="font-display appear-up appear-up-delay-1 mt-7 max-w-4xl text-4xl font-bold leading-[1.48] tracking-[-0.07em] text-[var(--paper-ivory)] sm:text-6xl lg:text-[5.5rem] lg:leading-[1.38]">{t.heroTitle}</h1><p className="appear-up appear-up-delay-2 mt-7 max-w-xl text-base leading-8 text-[rgba(245,241,232,0.72)] sm:text-lg">{t.heroDescription}</p><div className="appear-up appear-up-delay-3 mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="#contact" className="signal-button inline-flex items-center gap-3 bg-[var(--copper-signal)] px-7 py-4 text-sm font-bold text-white">{t.start} {arrow}</a><a href="#route" className="inline-flex items-center gap-2 border-b border-white/40 pb-2 text-sm font-medium text-white transition-colors hover:border-[var(--copper-signal)] hover:text-[var(--copper-signal)]">{t.discover} <ArrowDownLeft size={16} /></a></div></div><div className="absolute bottom-8 left-0 hidden items-center gap-4 lg:flex"><div className="h-px w-20 bg-white/20" /><span className="font-mono text-[0.62rem] tracking-[0.18em] text-white/50">{t.coordinates}</span></div><div className="absolute bottom-9 right-0 hidden items-center gap-3 xl:flex"><span className="font-mono text-[0.6rem] tracking-[0.15em] text-white/50">ATLAS ROUTE / 2026</span><span className="motion-right h-2 w-2 rounded-full bg-[var(--copper-signal)] shadow-[0_0_0_5px_rgba(216,117,75,0.18)]" data-depth="18" /></div></div><div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--paper-ivory)] to-transparent opacity-95" /></section>

        <section id="about" className="paper-grid relative py-20 sm:py-28"><div className="container"><div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24"><div><p className="section-kicker">{t.visionKicker}</p><p className="font-display mt-5 max-w-sm text-2xl font-bold leading-[1.7] tracking-[-0.05em] text-[var(--ink-navy)] sm:text-3xl">{t.visionTitle}</p></div><div className="grid gap-8 sm:grid-cols-[1.1fr_0.9fr]"><p className="text-base leading-8 text-[var(--muted-foreground)]">{t.visionText}</p><div className="border-r border-[var(--copper-signal)] pr-5"><span className="motion-right font-mono text-4xl font-medium text-[var(--ink-navy)]" data-depth="14">01</span><p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]" dangerouslySetInnerHTML={{ __html: t.visionStat }} /></div></div></div></div></section>

        <section id="services" className="relative overflow-hidden bg-[var(--paper-ivory)] py-20 sm:py-28"><div className="pointer-events-none absolute bottom-24 right-[7%] top-44 hidden w-px route-line opacity-20 xl:block" /><div className="container"><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><SectionTitle eyebrow={t.servicesKicker} title={t.servicesTitle} description={t.servicesDescription} /><div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)] lg:pb-2"><span className="h-px w-10 bg-[var(--copper-signal)]" /> {t.servicesMeta}</div></div><div className="mt-14 grid gap-4 md:grid-cols-2">{t.serviceData.map((service, index) => { const Icon = service.icon; return <article key={service.number} className={`service-card group relative overflow-hidden ${index % 2 === 1 ? "md:mt-12" : ""}`}><div className="grid min-h-[285px] grid-cols-[0.95fr_1.05fr]"><div className="image-wash relative min-h-[285px] overflow-hidden bg-[var(--mist-blue)]"><img src={service.image} alt="" className="atlas-image h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" /><span className="absolute left-4 top-4 font-mono text-[0.58rem] tracking-[0.16em] text-white/80">{service.meta}</span><div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-white/25 pt-2 text-[0.55rem] text-white/75"><span className="font-mono tracking-[0.13em]">ROUTE / {service.number}</span><span className="motion-right h-1.5 w-1.5 rounded-full bg-[var(--copper-signal)]" data-depth="15" /></div></div><div className="flex flex-col justify-between p-6 sm:p-8"><div><div className="flex items-start justify-between gap-4"><span className="motion-right font-mono text-3xl text-[var(--steel-silver)]" data-depth="20">{service.number}</span><span className="motion-right flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--copper-signal)]" data-depth="10"><Icon size={19} strokeWidth={1.7} /></span></div><h3 className="font-display mt-7 text-xl font-bold tracking-[-0.05em] text-[var(--ink-navy)]">{service.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{service.description}</p></div><a href="#contact" className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-bold text-[var(--ink-navy)] transition-colors group-hover:text-[var(--copper-signal)]">{t.requestService} <ChevronLeft size={15} /></a></div></div></article>; })}</div></div></section>

        <section id="route" className="relative overflow-hidden bg-[var(--ink-navy)] py-20 sm:py-28"><div className="absolute -left-24 top-0 h-[520px] w-[520px] rounded-full border border-white/10" /><div className="absolute -left-10 top-14 h-[390px] w-[390px] rounded-full border border-white/10" /><div className="container relative"><div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24"><div><SectionTitle light eyebrow={t.routeKicker} title={t.routeTitle} description={t.routeDescription} /><a href="#contact" className="signal-button mt-9 inline-flex items-center gap-3 border border-[var(--copper-signal)] px-6 py-3.5 text-sm font-bold text-[var(--paper-ivory)] hover:bg-[var(--copper-signal)]">{t.talk} <ArrowUpLeft size={17} /></a></div><div className="relative lg:pt-4"><div className="absolute bottom-5 right-[19px] top-5 w-px route-line opacity-70" /><div className="space-y-9">{t.routeSteps.map((step) => <div key={step.code} className="relative flex gap-6"><div className="motion-right route-dot relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full" data-depth="22"><span className="motion-right h-2 w-2 rounded-full bg-[var(--copper-signal)]" data-depth="8" /></div><div className="flex-1 border-b border-white/10 pb-8"><div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"><h3 className="font-display text-lg font-bold text-[var(--paper-ivory)]">{step.title}</h3><span className="font-mono text-[0.62rem] tracking-[0.14em] text-[var(--copper-signal)]">{step.code}</span></div><p className="mt-2 text-sm text-white/55">{step.detail}</p></div></div>)}</div></div></div></div></section>

        <section className="paper-grid relative py-20 sm:py-28"><div className="container"><div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"><div className="relative overflow-hidden border border-[var(--line)] bg-[var(--mist-blue)] p-3 sm:p-5"><div className="image-wash relative aspect-[4/3] overflow-hidden"><img src={asset.shipping} alt={language === "ar" ? "سفينة شحن وطائرة شحن ضمن مسار لوجستي" : "Cargo ship and freight plane on a logistics route"} className="atlas-image h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-navy)]/55 to-transparent" /><div className="absolute bottom-5 right-5 left-5 flex items-end justify-between text-white"><span className="font-display text-lg font-bold">{t.flexible}</span><span className="font-mono text-[0.6rem] tracking-[0.15em] text-white/70">SEA + AIR</span></div></div><div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-r border-t border-[var(--copper-signal)]" /><div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b border-l border-[var(--copper-signal)]" /></div><div><p className="section-kicker">{t.whyKicker}</p><h2 className="font-display mt-4 text-3xl font-bold leading-[1.45] tracking-[-0.06em] text-[var(--ink-navy)] sm:text-4xl">{t.whyTitle}</h2><p className="mt-5 max-w-lg text-base leading-8 text-[var(--muted-foreground)]">{t.whyDescription}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{t.whyBullets.map((item) => <div key={item} className="flex items-center gap-3 border-t border-[var(--line)] pt-4 text-sm font-medium text-[var(--ink-navy)]"><span className="motion-right flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--ink-navy)] text-[var(--copper-signal)]" data-depth="10"><Check size={13} strokeWidth={2.5} /></span>{item}</div>)}</div></div></div></div></section>

        <section id="contact" className="relative overflow-hidden bg-[var(--ink-navy)] py-20 sm:py-28"><div className="absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full border border-white/10" /><div className="absolute -bottom-16 left-28 h-[260px] w-[260px] rounded-full border border-white/10" /><div className="container relative"><div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24"><div className="text-white"><p className="section-kicker">{t.contactKicker}</p><h2 className="font-display mt-5 text-3xl font-bold leading-[1.5] tracking-[-0.07em] sm:text-5xl">{t.contactTitle}</h2><p className="mt-5 max-w-md text-base leading-8 text-white/70">{t.contactDescription}</p><div className="mt-9 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-white/70"><Sparkles size={17} className="motion-right text-[var(--copper-signal)]" data-depth="14" /> {t.contactNote}</div></div><form onSubmit={submitQuote} className="bg-[var(--paper-ivory)] p-6 shadow-[12px_12px_0_rgba(216,117,75,0.22)] sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-semibold text-[var(--ink-navy)]">{t.form.name}</span><input required name="name" type="text" placeholder={t.form.namePlaceholder} className="h-12 w-full border-b border-[var(--line)] bg-transparent px-0 text-sm text-[var(--ink-navy)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--copper-signal)]" /></label><label className="block"><span className="mb-2 block text-xs font-semibold text-[var(--ink-navy)]">{t.form.phone}</span><input required name="phone" type="tel" placeholder={t.form.phonePlaceholder} className="h-12 w-full border-b border-[var(--line)] bg-transparent px-0 text-left text-sm text-[var(--ink-navy)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--copper-signal)]" dir="ltr" /></label><label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold text-[var(--ink-navy)]">{t.form.request}</span><textarea required name="request" rows={3} placeholder={t.form.requestPlaceholder} className="w-full resize-none border-b border-[var(--line)] bg-transparent px-0 py-2 text-sm leading-7 text-[var(--ink-navy)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--copper-signal)]" /></label></div><button type="submit" disabled={isSubmitting} className={`signal-button mt-7 inline-flex w-full items-center justify-center gap-3 bg-[var(--ink-navy)] px-6 py-4 text-sm font-bold text-white hover:bg-[#183a59] disabled:cursor-wait disabled:opacity-90 ${isSubmitting ? "whatsapp-pending" : ""}`}>{isSubmitting ? <><Loader2 size={17} className="animate-spin" /> {t.form.sending}</> : <>{t.form.submit} <ArrowUpLeft size={17} /></>}</button>{isSubmitting && <p className="mt-3 flex items-center justify-center gap-2 text-center text-[0.72rem] font-semibold text-[var(--copper-signal)]" role="status" aria-live="polite"><CheckCircle2 size={15} /> {t.form.sent}</p>}<p className="mt-4 text-center text-[0.68rem] leading-6 text-[var(--muted-foreground)]">{t.form.privacy}</p></form></div></div></section>
      </main>

      <footer className="bg-[var(--ink-navy)] py-12 text-[var(--paper-ivory)]"><div className="container"><div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 lg:flex-row lg:items-end"><div><Logo language={language} light /><p className="mt-5 max-w-xs text-sm leading-7 text-white/55">{t.footerTag}</p></div><div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm text-white/65 sm:grid-cols-3 sm:gap-x-16"><a className="transition-colors hover:text-[var(--copper-signal)]" href="#services">{t.nav.services}</a><a className="transition-colors hover:text-[var(--copper-signal)]" href="#route">{t.nav.route}</a><a className="transition-colors hover:text-[var(--copper-signal)]" href="#contact">{t.quote}</a><a className="transition-colors hover:text-[var(--copper-signal)]" href="mailto:hello@silverpioneer.co">{t.email}</a><a className="transition-colors hover:text-[var(--copper-signal)]" href="tel:+966543749292" dir="ltr">{t.phone}</a></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[0.62rem] text-white/40 sm:flex-row sm:items-center"><span>{t.footerCopy}</span><span className="font-mono tracking-[0.12em]">SILVER PIONEER LOGISTICS / CN → GCC</span></div></div></footer>
    </div>
  );
}
