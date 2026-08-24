/**
 * اتجاه «ممرّات الميناء»: واجهة RTL من الأزرق البحري والذهبي الرملي، بطاقات تشغيل شفافة
 * وإيقاع تحريري طويل مستلهم من طبقات الحركة بين الميناء والمطار.
 */
import { FormEvent, useEffect, useState } from "react";
import {
  Anchor,
  ArrowLeft,
  ArrowUpLeft,
  Box,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  Container,
  Facebook,
  Globe2,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Plane,
  Search,
  Send,
  ShieldCheck,
  Ship,
  Truck,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const heroImage = "/manus-storage/nawafid-hero-saudi-logistics_9dedc280.jpg";
const airImage = "/manus-storage/nawafid-airfreight_92dffb38.jpg";
const seaImage = "/manus-storage/nawafid-sea-freight_d9f534dd.jpg";
const brandSymbol = "/manus-storage/nawafid-symbol_372748d2.png";

const heroSlides = [
  {
    eyebrow: "مسار الصين — المملكة",
    title: "شحنٌ يصل إلى السعودية\nبثقةٍ وخطةٍ واضحة",
    body: "حلول شحن متكاملة للمستوردين: جوي وبحري وسريع، مع تخليص واستلام حتى باب عملك.",
  },
  {
    eyebrow: "من الميناء إلى المستودع",
    title: "كل محطة محسوبة\nقبل أن تتحرك شحنتك",
    body: "ننسق مساحة الشحن، المستندات والتخليص المحلي ضمن مسار واحد يفهم أولويات تجارتك.",
  },
  {
    eyebrow: "للتجارة التي لا تنتظر",
    title: "سرعةٌ مدروسة\nوتتبعٌ أقرب إليك",
    body: "خدمة تشغيلية واضحة من أول عرض السعر حتى إشعار التسليم، لفِرق الشراء والمتاجر النامية.",
  },
];

const services = [
  {
    title: "الشحن الجوي",
    slug: "air-freight",
    en: "AIR FREIGHT",
    icon: Plane,
    label: "الأسرع للطلبات الحساسة للوقت",
    description: "رحلات مجدولة وحلول أولوية للشحنات التجارية بين المراكز العالمية ومطارات المملكة.",
    stats: ["3–7 أيام", "+120 مطار"],
    image: airImage,
    tone: "air",
  },
  {
    title: "الشحن البحري",
    slug: "sea-freight",
    en: "SEA FREIGHT",
    icon: Ship,
    label: "سعة مستقرة وتكلفة محسوبة",
    description: "حاويات كاملة أو شحنات مجمعة مع إدارة المناولة وخيارات الوصول إلى موانئ البحر الأحمر والخليج.",
    stats: ["FCL / LCL", "+40 ميناء"],
    image: seaImage,
    tone: "sea",
  },
  {
    title: "الشحن السريع",
    slug: "express",
    en: "EXPRESS",
    icon: Truck,
    label: "من الباب إلى الباب",
    description: "استلام موثوق للشحنات الصغيرة والعينات والطلبات ذات الأولوية، بخيارات تسليم مرنة.",
    stats: ["1–4 أيام", "220 وجهة"],
    image: "",
    tone: "express",
  },
  {
    title: "تخليص جمركي",
    slug: "customs-clearance",
    en: "CUSTOMS",
    icon: ShieldCheck,
    label: "مستندات أدق، عبور أسلس",
    description: "مراجعة المستندات وإعداد الملف التشغيلي ومساندة إجراءات الفسح بما يتوافق مع متطلبات الاستيراد.",
    stats: ["24/7 متابعة", "98% جاهزية"],
    image: "",
    tone: "customs",
  },
];

const serviceTiles = [
  { label: "جوي", icon: Plane, target: "services" },
  { label: "بحري", icon: Ship, target: "services" },
  { label: "سريع", icon: Truck, target: "services" },
  { label: "تخليص", icon: ShieldCheck, target: "quote" },
];

const journey = [
  ["01", "نتعرف على الشحنة", "الوزن والمنشأ والموعد والوجهة."],
  ["02", "نرسم المسار", "خيارات جوي أو بحري أو سريع واضحة."],
  ["03", "ندير المستندات", "مراجعة استباقية لكل المتطلبات."],
  ["04", "نسلّم ونغلق الحلقة", "تحديثات حتى الوصول إلى وجهتك."],
];

const faqs = [
  ["كيف أطلب عرض سعر؟", "أرسل تفاصيل شحنتك من النموذج أدناه، وسيتولى فريقنا تجهيز الخيارات التشغيلية المناسبة خلال يوم عمل."],
  ["هل تتوفر خدمة التخليص في السعودية؟", "نعم، نرتب الملف التشغيلي ونساند مستندات الفسح والتنسيق مع الأطراف ذات العلاقة ضمن نطاق الخدمة المطلوب."],
  ["كيف أعرف مسار شحنتي؟", "استخدم رقم بوليصة الشحن أو مرجع نوافذ في حقل التتبع. في هذا النموذج التجريبي تظهر حالة توضيحية فورية."],
  ["هل تناسب الخدمة المتاجر الإلكترونية؟", "الخدمات مصممة لتلائم الشحنات التجارية المتكررة والطلبات الموسمية، مع إمكانية تنسيق الأولويات بحسب طبيعة النشاط."],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const { dir, language, setLanguage, toLocalePath } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [trackingValue, setTrackingValue] = useState("");
  const [trackingMessage, setTrackingMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [quoteSent, setQuoteSent] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((current) => (current + 1) % heroSlides.length);
  const previousSlide = () => setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);

  const submitTracking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const identifier = trackingValue.trim();
    setTrackingMessage(
      identifier
        ? `المرجع ${identifier} في مرحلة «مغادرة مركز المناولة» — هذه حالة عرض توضيحية.`
        : "أدخل رقم المرجع أو بوليصة الشحن أولًا.",
    );
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuoteSent(true);
    event.currentTarget.reset();
  };

  const navItems = [
    ["الرئيسية", toLocalePath("/")],
    ["من نحن", toLocalePath("/about")],
    ["خدماتنا", toLocalePath("/services")],
    ["المعرفة", toLocalePath("/insights")],
    ["تواصل", toLocalePath("/contact")],
  ];

  return (
    <main dir={dir} className="site-shell" id="top">
      <a className="skip-link" href="#content">تجاوز إلى المحتوى</a>

      <div className="utility-bar">
        <div className="page-wrap utility-inner">
          <p><Globe2 size={13} /> شبكة شحن سعودية متصلة بالممرات العالمية</p>
          <div className="utility-actions" aria-label="اختيار اللغة">
            <button type="button" onClick={() => setLanguage("ar")} className={language === "ar" ? "active-language" : ""}>العربية</button>
            <span />
            <button type="button" onClick={() => setLanguage("en")} className={language === "en" ? "active-language" : ""}>EN</button>
            <span />
            <button type="button" onClick={() => setLanguage("zh")} className={language === "zh" ? "active-language" : ""}>中文</button>
          </div>
        </div>
      </div>

      <header className="main-header">
        <div className="page-wrap header-inner">
          <a className="brand" href={toLocalePath("/")} aria-label="نوافذ، العودة للرئيسية">
            <img src={brandSymbol} alt="رمز نوافذ" />
            <span className="brand-words"><strong>نوافذ</strong><small>للشحن والخدمات اللوجستية</small></span>
          </a>
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {navItems.map(([label, href]) => (
              <a key={href} className={href === "/" ? "is-current" : ""} href={href}>{label}</a>
            ))}
          </nav>
          <div className="header-contact">
            <a href="mailto:hello@nawafid.example"><Mail size={17} /> hello@nawafid.example</a>
            <button className="mobile-menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-nav">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowLeft size={16} /></a>
            ))}
            <a href="mailto:hello@nawafid.example"><Mail size={16} /> hello@nawafid.example</a>
          </div>
        )}
      </header>

      <section className="hero" aria-label="نوافذ للشحن والخدمات اللوجستية">
        <img className="hero-image" src={heroImage} alt="سفينة وطائرة شحن ضمن مشهد لوجستي سعودي" />
        <div className="hero-overlay" />
        <div className="route-grid" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="page-wrap hero-content">
          <button className="hero-arrow hero-arrow-right" type="button" onClick={previousSlide} aria-label="الشريحة السابقة"><ChevronRight size={25} /></button>
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">{heroSlides[activeSlide].eyebrow}</span>
            <h1>{heroSlides[activeSlide].title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
            <p>{heroSlides[activeSlide].body}</p>
            <a className="primary-button light-button" href={toLocalePath("/contact")}>
              <Mail size={18} /> احصل على خطة شحن <ArrowLeft size={17} />
            </a>
          </div>
          <div className="hero-service-grid" aria-label="الخدمات الرئيسية">
            {serviceTiles.map(({ label, icon: Icon, target }) => (
              <button className="hero-service-tile" key={label} type="button" onClick={() => scrollTo(target)}>
                <span><Icon size={25} /></span><strong>{label}</strong><small>حلول نوافذ</small>
              </button>
            ))}
          </div>
          <button className="hero-arrow hero-arrow-left" type="button" onClick={nextSlide} aria-label="الشريحة التالية"><ChevronLeft size={25} /></button>
          <div className="hero-dots" role="tablist" aria-label="شرائح التعريف">
            {heroSlides.map((_, index) => <button key={index} type="button" onClick={() => setActiveSlide(index)} className={index === activeSlide ? "is-active" : ""} aria-label={`عرض الشريحة ${index + 1}`} aria-selected={index === activeSlide} />)}
          </div>
        </div>
      </section>

      <section className="quick-track-section" aria-label="تتبع سريع">
        <div className="page-wrap quick-track-inner">
          <div className="quick-track-copy"><span className="section-kicker">تتبع سريع</span><h2>اعرف أين تقف شحنتك الآن</h2></div>
          <form className="tracking-form" onSubmit={submitTracking}>
            <label htmlFor="tracking">رقم البوليصة أو المرجع</label>
            <div><input id="tracking" value={trackingValue} onChange={(event) => setTrackingValue(event.target.value)} placeholder="مثال: NW-584210" /><button type="submit"><Search size={18} /> تتبع</button></div>
            {trackingMessage && <p className="tracking-message" role="status"><CircleCheck size={16} /> {trackingMessage}</p>}
          </form>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="page-wrap" id="content">
          <div className="section-heading center-heading">
            <span className="section-kicker">خدمات لوجستية متصلة</span>
            <h2>اختَر المسار، واترك التفاصيل لنا</h2>
            <p>نقرب الموانئ والمطارات ومراكز التوزيع من خطة واحدة تناسب توقيت تجارتك ووجهتها.</p>
          </div>
          <div className="service-grid">
            {services.map(({ title, slug, en, icon: Icon, label, description, stats, image, tone }, index) => (
              <article className={`service-card service-${tone}`} key={title}>
                {image ? <img src={image} alt={`${title} لدى نوافذ`} /> : <div className="service-art"><Icon size={72} strokeWidth={1.1} /></div>}
                <div className="service-veil" />
                <div className="service-number">0{index + 1}</div>
                <div className="service-content">
                  <span className="service-icon"><Icon size={21} /></span>
                  <p className="service-en">{en}</p>
                  <h3>{title}</h3>
                  <p className="service-label">{label}</p>
                  <p className="service-description">{description}</p>
                  <div className="service-stats"><span>{stats[0]}</span><span>{stats[1]}</span></div>
                  <a href={toLocalePath(`/services/${slug}`)}>اطلب هذه الخدمة <ArrowLeft size={16} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-visual" aria-hidden="true">
          <div className="about-orbit orbit-one" /><div className="about-orbit orbit-two" />
          <div className="port-marker marker-one"><Plane size={20} /></div><div className="port-marker marker-two"><Anchor size={20} /></div><div className="port-marker marker-three"><Truck size={20} /></div>
          <div className="about-stamp"><span>+12</span><small>عامًا من الحركة الذكية</small></div>
        </div>
        <div className="about-copy">
          <span className="section-kicker gold-kicker">عن نوافذ</span>
          <h2>نفتح نافذة واضحة بين <em>مصدر الشحنة</em> ووجهتها</h2>
          <p>نوافذ فريق سعودي يربط التخطيط التشغيلي بالتواصل الواضح. ننظر إلى كل شحنة كسلسلة من القرارات الصغيرة التي تستحق أن تُدار بدقة؛ من مساحة الناقل إلى الورقة الأخيرة في الملف.</p>
          <div className="about-points"><span><Check size={17} /> خيارات واضحة قبل الحجز</span><span><Check size={17} /> فريق يتحدث لغة التجارة</span><span><Check size={17} /> متابعة من نقطة واحدة</span></div>
          <a className="text-button" href={toLocalePath("/about")}>تعرف على منهجنا <ArrowLeft size={17} /></a>
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="page-wrap">
          <div className="journey-topline"><div className="section-heading"><span className="section-kicker">رحلة واحدة، رؤية كاملة</span><h2>كيف تتحرك شحنتك معنا؟</h2></div><p>نحوّل التعقيد التشغيلي إلى نقاط متابعة يفهمها فريقك دون مصطلحات لا تحتاجها.</p></div>
          <div className="journey-line" aria-hidden="true" />
          <div className="journey-grid">
            {journey.map(([number, title, body]) => <article key={number} className="journey-card"><span>{number}</span><div className="journey-dot" /><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="metrics-section">
        <div className="page-wrap metrics-grid">
          <div><strong>+35</strong><span>بوابة جوية وبحرية نتابعها</span></div>
          <div><strong>24<span>/7</span></strong><span>إتاحة المتابعة للشحنات النشطة</span></div>
          <div><strong>+18</strong><span>مدينة سعودية ضمن شبكتنا المحلية</span></div>
          <div><strong>01</strong><span>نقطة اتصال لتنظيم المسار</span></div>
        </div>
      </section>

      <section className="advantage-section">
        <div className="page-wrap advantage-layout">
          <div className="advantage-panel">
            <span className="section-kicker">القيمة في التفاصيل</span>
            <h2>تشغيلٌ منضبط لا يضيع بين الأطراف</h2>
            <p>نعمل كامتداد منظم لفريق التوريد لديك؛ نُبقي القرار قريبًا ونرسل ما تحتاجه من معلومات حين تحتاجه.</p>
            <a className="primary-button" href={toLocalePath("/contact")}>تحدث مع مستشار شحن <ArrowLeft size={18} /></a>
          </div>
          <div className="advantage-list">
            <article><span><Headphones size={24} /></span><div><h3>إنسان حقيقي في المسار</h3><p>قناة تواصل واحدة تفهم تاريخ الشحنة وليس مجرد رقمها.</p></div><ArrowUpLeft size={21} /></article>
            <article><span><Container size={24} /></span><div><h3>حلول قابلة للتوسّع</h3><p>من عينة أولى حتى جدولة شحنات موسمية متكررة.</p></div><ArrowUpLeft size={21} /></article>
            <article><span><PackageCheck size={24} /></span><div><h3>مستندات تسبق الحركة</h3><p>نراجع العناصر الحساسة مبكرًا حتى لا تكتشفها عند الوصول.</p></div><ArrowUpLeft size={21} /></article>
          </div>
        </div>
      </section>

      <section className="network-section" id="insights">
        <div className="page-wrap network-layout">
          <div className="network-copy"><span className="section-kicker">شبكة تصل إلى عملك</span><h2>عالمك التجاري، أقرب إلى <em>السعودية</em></h2><p>من منشأ البضاعة في آسيا وأوروبا إلى موانئ ومطارات المملكة ثم مستودعك؛ نساعدك على رؤية الشبكة كمسار مفهوم لا كمجموعة وسطاء.</p><div className="network-tags"><span>شرق آسيا</span><span>أوروبا</span><span>الخليج</span><span>البحر الأحمر</span></div></div>
          <div className="network-map" aria-label="خريطة مفاهيمية لوجهات شبكة نوافذ">
            <div className="map-line line-a" /><div className="map-line line-b" /><div className="map-line line-c" />
            <div className="map-city city-riyadh"><b>الرياض</b><small>مركز التشغيل</small></div>
            <div className="map-city city-jeddah"><b>جدة</b><small>البحر الأحمر</small></div>
            <div className="map-city city-dammam"><b>الدمام</b><small>الخليج</small></div>
            <div className="map-origin origin-china">شنتشن</div><div className="map-origin origin-europe">روتردام</div>
          </div>
        </div>
      </section>

      <section className="insights-section">
        <div className="page-wrap">
          <div className="insight-titlebar"><div className="section-heading"><span className="section-kicker">معرفة تشغّل قرارك</span><h2>ملاحظات من طريق الشحن</h2></div><a className="text-button" href={toLocalePath("/insights")}>كل المقالات <ArrowLeft size={17} /></a></div>
          <div className="insight-grid">
            <article className="featured-insight"><div className="insight-art"><Plane size={70} strokeWidth={1} /><span>إضاءة الممر</span></div><div><p className="article-meta">دليل عملي · 6 دقائق</p><h3>قبل أن تحجز شحنتك الجوية: 5 أسئلة تحدد المسار الصحيح</h3><a href={toLocalePath("/insights")}>اقرأ الدليل <ArrowLeft size={16} /></a></div></article>
            <article className="text-insight"><p className="article-meta">معلومة جمركية · 4 دقائق</p><h3>المستندات التي تستحق مراجعة إضافية قبل وصول الشحنة</h3><p>قائمة مختصرة تساعد فريق المشتريات على ترتيب ملف استيراد أوضح.</p><a href={toLocalePath("/insights")}>اكتشف المزيد <ArrowLeft size={16} /></a></article>
            <article className="text-insight warm-insight"><p className="article-meta">إدارة التكاليف · 5 دقائق</p><h3>متى تكون الشحنة المجمعة اختيارًا اقتصاديًا مناسبًا؟</h3><p>ليس الحجم وحده هو ما يحسم الخيار؛ نوضح العوامل التي تغيّر القرار.</p><a href={toLocalePath("/insights")}>اكتشف المزيد <ArrowLeft size={16} /></a></article>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="page-wrap faq-layout"><div className="faq-lead"><span className="section-kicker">أسئلة تتكرر قبل الحجز</span><h2>إجابات مباشرة قبل أن تبدأ</h2><p>إذا لم تجد ما تبحث عنه، أرسل لنا تفاصيل شحنتك وسنساعدك في قراءة خياراتها.</p><a href="tel:+966550000000"><Phone size={18} /> 055 000 0000</a></div><div className="faq-list">{faqs.map(([question, answer], index) => <article className={openFaq === index ? "faq-item is-open" : "faq-item"} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<ChevronDown size={20} /></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></div>
      </section>

      <section className="quote-section" id="quote">
        <div className="quote-route" aria-hidden="true"><i /><i /><i /></div>
        <div className="page-wrap quote-layout">
          <div className="quote-copy"><span className="section-kicker gold-kicker">ابدأ بالخطوة التالية</span><h2>دعنا نرسم لشحنتك <em>الممر الأنسب</em></h2><p>أرسل المعلومات الأولية، وسيتواصل معك فريق نوافذ لاقتراح مسار يلائم الموعد والميزانية وطبيعة البضائع.</p><div className="quote-contact"><span><Mail size={18} /> hello@nawafid.example</span><span><Phone size={18} /> 055 000 0000</span></div></div>
          <form className="quote-form" onSubmit={submitQuote}>
            <div className="form-row"><label>الاسم<input required placeholder="اسمك الكامل" /></label><label>اسم الشركة<input required placeholder="اسم المنشأة" /></label></div>
            <div className="form-row"><label>البريد الإلكتروني<input type="email" required placeholder="name@company.sa" /></label><label>رقم الجوال<input required placeholder="05x xxx xxxx" /></label></div>
            <div className="form-row"><label>بلد المنشأ<select defaultValue=""><option value="" disabled>اختر بلد المنشأ</option><option>الصين</option><option>الإمارات العربية المتحدة</option><option>ألمانيا</option><option>تركيا</option><option>غير ذلك</option></select></label><label>نوع الخدمة<select defaultValue=""><option value="" disabled>اختر الخدمة</option><option>شحن جوي</option><option>شحن بحري</option><option>شحن سريع</option><option>تخليص جمركي</option></select></label></div>
            <label>نبذة عن الشحنة<textarea rows={3} placeholder="نوع البضاعة، الوزن التقريبي، مدينة الوصول والموعد المتوقع…" /></label>
            <button className="primary-button form-submit" type="submit"><Send size={18} /> أرسل طلب الاستشارة <ArrowLeft size={17} /></button>
            {quoteSent && <p className="quote-success" role="status"><CircleCheck size={17} /> وصل طلبك المبدئي، شكرًا لتواصلك مع نوافذ.</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-wrap footer-grid">
          <div><a className="brand footer-brand" href={toLocalePath("/")}><img src={brandSymbol} alt="رمز نوافذ" /><span className="brand-words"><strong>نوافذ</strong><small>للشحن والخدمات اللوجستية</small></span></a><p>شريك تشغيل سعودي يقرّب لك طريق التجارة، من أول مستند إلى لحظة التسليم.</p><div className="social-links"><a href={toLocalePath("/")} aria-label="انستغرام"><Instagram size={18} /></a><a href={toLocalePath("/")} aria-label="فيسبوك"><Facebook size={18} /></a><a href={toLocalePath("/")} aria-label="لينكدإن"><Box size={18} /></a></div></div>
          <div><h3>الوصول السريع</h3>{navItems.slice(1).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
          <div><h3>الخدمات</h3><a href={toLocalePath("/services/air-freight")}>الشحن الجوي</a><a href={toLocalePath("/services/sea-freight")}>الشحن البحري</a><a href={toLocalePath("/services/express")}>الشحن السريع</a><a href={toLocalePath("/services/customs-clearance")}>التخليص الجمركي</a></div>
          <div><h3>تواصل معنا</h3><a href="mailto:hello@nawafid.example"><Mail size={16} /> hello@nawafid.example</a><a href="tel:+966550000000"><Phone size={16} /> 055 000 0000</a><p className="address"><MapPin size={16} /> الرياض، المملكة العربية السعودية</p></div>
        </div>
        <div className="page-wrap footer-bottom"><span>© 2026 نوافذ للشحن والخدمات اللوجستية</span><div><a href="#top">سياسة الخصوصية</a><a href="#top">شروط الاستخدام</a></div></div>
      </footer>
      <button className="scroll-top" type="button" onClick={() => scrollTo("top")} aria-label="العودة إلى الأعلى"><ChevronRight size={21} /></button>
    </main>
  );
}
