/** اتجاه «ممرّات الميناء»: غلاف مشترك يحافظ على ترويسة بيضاء فوق شريط أزرق وتذييل بحري موحد. */
import { type ReactNode, useState } from "react";
import { Box, Facebook, Globe2, Instagram, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useLocation } from "wouter";
import { contactInfo } from "@/lib/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

const brandSymbol = "/manus-storage/nawafid-symbol_372748d2.png";
const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "خدماتنا", href: "/services" },
  { label: "المعرفة", href: "/insights" },
  { label: "تواصل", href: "/contact" },
];

type SiteLayoutProps = { children: ReactNode };

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { dir, language, setLanguage, toLocalePath } = useLanguage();
  const isSelected = (href: string) => href === toLocalePath("/") ? location === href : location.startsWith(href);
  const locale = (path: string) => toLocalePath(path);

  return (
    <main dir={dir} className="site-shell site-shell-subpage">
      <a className="skip-link" href="#content">تجاوز إلى المحتوى</a>
      <div className="utility-bar">
        <div className="page-wrap utility-inner">
          <p><Globe2 size={13} /> شبكة شحن سعودية متصلة بالممرات العالمية</p>
          <div className="utility-actions" aria-label="اختيار اللغة"><button type="button" onClick={() => setLanguage("ar")} className={language === "ar" ? "active-language" : ""}>العربية</button><span /><button type="button" onClick={() => setLanguage("en")} className={language === "en" ? "active-language" : ""}>EN</button><span /><button type="button" onClick={() => setLanguage("zh")} className={language === "zh" ? "active-language" : ""}>中文</button></div>
        </div>
      </div>
      <header className="main-header">
        <div className="page-wrap header-inner">
          <a className="brand" href={locale("/")} aria-label="نوافذ، العودة للرئيسية"><img src={brandSymbol} alt="رمز نوافذ" /><span className="brand-words"><strong>نوافذ</strong><small>للشحن والخدمات اللوجستية</small></span></a>
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => { const href = locale(link.href); return <a key={link.href} className={isSelected(href) ? "is-current" : ""} href={href}>{link.label}</a>; })}
          </nav>
          <div className="header-contact"><a href={`mailto:${contactInfo.email}`}><Mail size={17} /> {contactInfo.email}</a><button className="mobile-menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={23} />}</button></div>
        </div>
        {menuOpen && <div className="mobile-nav">{navLinks.map((link) => <a key={link.href} href={locale(link.href)} onClick={() => setMenuOpen(false)}>{link.label}</a>)}<a href={`mailto:${contactInfo.email}`}><Mail size={16} /> {contactInfo.email}</a></div>}
      </header>
      <div id="content">{children}</div>
      <footer className="site-footer">
        <div className="page-wrap footer-grid">
          <div><a className="brand footer-brand" href={locale("/")}><img src={brandSymbol} alt="رمز نوافذ" /><span className="brand-words"><strong>نوافذ</strong><small>للشحن والخدمات اللوجستية</small></span></a><p>شريك تشغيل سعودي يقرّب لك طريق التجارة، من أول مستند إلى لحظة التسليم.</p><div className="social-links"><a href={locale("/")} aria-label="انستغرام"><Instagram size={18} /></a><a href={locale("/")} aria-label="فيسبوك"><Facebook size={18} /></a><a href={locale("/")} aria-label="لينكدإن"><Box size={18} /></a></div></div>
          <div><h3>الوصول السريع</h3>{navLinks.slice(1).map((link) => <a key={link.href} href={locale(link.href)}>{link.label}</a>)}</div>
          <div><h3>الخدمات</h3>{serviceLinks.map((link) => <a key={link.href} href={locale(link.href)}>{link.label}</a>)}</div>
          <div><h3>تواصل معنا</h3><a href={`mailto:${contactInfo.email}`}><Mail size={16} /> {contactInfo.email}</a><a href={`tel:${contactInfo.phoneLink}`}><Phone size={16} /> {contactInfo.phoneText}</a><p className="address"><MapPin size={16} /> الرياض، المملكة العربية السعودية</p></div>
        </div>
        <div className="page-wrap footer-bottom"><span>© 2026 نوافذ للشحن والخدمات اللوجستية</span><div><a href="/">سياسة الخصوصية</a><a href="/">شروط الاستخدام</a></div></div>
      </footer>
    </main>
  );
}

const serviceLinks = [
  { label: "الشحن الجوي", href: "/services/air-freight" },
  { label: "الشحن البحري", href: "/services/sea-freight" },
  { label: "الشحن السريع", href: "/services/express" },
  { label: "التخليص الجمركي", href: "/services/customs-clearance" },
];
