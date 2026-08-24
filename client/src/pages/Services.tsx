/** اتجاه «ممرّات الميناء»: صفحة خدمات عملية تستخدم بطاقات داكنة تتحول بصريًا عند التفاعل. */
import { ArrowLeft, Check, Clock3 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Reveal from "@/components/Reveal";
import { serviceData } from "@/lib/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { toLocalePath } = useLanguage();
  return (
    <SiteLayout>
      <section className="page-hero services-page-hero"><div className="page-wrap page-hero-inner"><p className="breadcrumb">الرئيسية <span>/</span> خدماتنا</p><span className="section-kicker gold-kicker">خدمات نوافذ</span><h1>كل نوع شحنة له <em>مسار أدق</em></h1><p>اختر الخدمة التي تلائم توقيت التجارة وطبيعة البضائع، ثم دع فريقنا يساعدك في قراءة الخطوة التالية.</p></div></section>
      <section className="services-directory"><div className="page-wrap"><div className="directory-intro"><div className="section-heading"><span className="section-kicker">اختر نقطة البداية</span><h2>حلول تكبر أو تصغر مع حجم شحنتك</h2></div><p>مرّر المؤشر فوق أي خدمة لاستكشافها، أو افتح صفحة الخدمة لمزيد من التفاصيل.</p></div><div className="directory-grid">{serviceData.map((service, index) => { const Icon = service.icon; return <Reveal key={service.slug} delay={index * 75} className="directory-reveal"><a className={`directory-card directory-card-${service.slug}`} href={toLocalePath(`/services/${service.slug}`)}><div className="directory-card-top"><span className="service-icon"><Icon size={22} /></span><span className="service-index">0{index + 1}</span></div><p>{service.english}</p><h3>{service.title}</h3><strong>{service.lead}</strong><div className="directory-meta"><span><Clock3 size={15} /> {service.duration}</span><span>{service.coverage}</span></div><ul>{service.features.slice(0, 2).map((feature) => <li key={feature}><Check size={14} /> {feature}</li>)}</ul><span className="directory-link">عرض تفاصيل الخدمة <ArrowLeft size={17} /></span></a></Reveal>; })}</div></div></section>
    </SiteLayout>
  );
}
