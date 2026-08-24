/** اتجاه «ممرّات الميناء»: تفاصيل الخدمة تبقي النبرة العملية والزخارف الخطية البحرية للواجهة الأساسية. */
import { ArrowLeft, Check, CircleCheck, Mail, Phone } from "lucide-react";
import { useLocation } from "wouter";
import SiteLayout from "@/components/SiteLayout";
import Reveal from "@/components/Reveal";
import { contactInfo, serviceData } from "@/lib/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceDetail() {
  const [location] = useLocation();
  const { toLocalePath } = useLanguage();
  const slug = location.split("/").filter(Boolean).at(-1);
  const service = serviceData.find((item) => item.slug === slug) ?? serviceData[0];
  const Icon = service.icon;
  return (
    <SiteLayout>
      <section className="service-detail-hero"><div className="detail-rings" aria-hidden="true"><i /><i /></div><div className="page-wrap detail-hero-layout"><div><p className="breadcrumb">خدماتنا <span>/</span> {service.title}</p><span className="section-kicker gold-kicker">{service.english}</span><h1>{service.title}</h1><p>{service.description}</p><a className="primary-button light-button" href={toLocalePath("/contact")}><Mail size={17} /> اطلب استشارة لهذه الخدمة <ArrowLeft size={17} /></a></div><div className="detail-icon"><Icon size={94} strokeWidth={1} /><span>{service.duration}</span><small>{service.coverage}</small></div></div></section>
      <section className="service-detail-section"><div className="page-wrap service-detail-grid"><Reveal><div className="detail-intro"><span className="section-kicker">ما الذي تتضمنه الخدمة؟</span><h2>{service.lead}</h2><p>نرتب هذا المسار وفق معلومات الشحنة الأولية ونوضح لك نقاط القرار الرئيسية قبل بدء الحجز.</p></div></Reveal><Reveal delay={90}><div className="detail-feature-list">{service.features.map((feature, index) => <div key={feature}><span>0{index + 1}</span><p><Check size={17} /> {feature}</p></div>)}</div></Reveal></div></section>
      <section className="service-process"><div className="page-wrap process-layout"><div><span className="section-kicker gold-kicker">خطوات التنفيذ</span><h2>تبدأ من معلومة، وتنتهي بوصول واضح</h2></div><div className="process-steps"><span><b>01</b> فهم بيانات الشحنة</span><span><b>02</b> تقديم خيار المسار</span><span><b>03</b> تنسيق المستندات</span><span><b>04</b> تحديثات حتى الوصول</span></div></div></section>
      <section className="detail-contact-strip"><div className="page-wrap"><CircleCheck size={28} /><div><strong>هل تحتاج قراءة سريعة لاحتياج شحنتك؟</strong><span>تواصل مع فريق نوافذ عبر وسائل التواصل الافتراضية.</span></div><a href={`tel:${contactInfo.phoneLink}`}><Phone size={18} /> {contactInfo.phoneText}</a><a href={toLocalePath("/contact")}>أرسل التفاصيل <ArrowLeft size={17} /></a></div></section>
    </SiteLayout>
  );
}
