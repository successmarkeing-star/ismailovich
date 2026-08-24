/** اتجاه «ممرّات الميناء»: صفحة تواصل مباشرة، يوازن نموذجها الواضح خلفية بحرية وخطوة تشغيل محددة. */
import { FormEvent, useState } from "react";
import { CircleCheck, Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { contactInfo } from "@/lib/siteData";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submitForm = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };
  return (
    <SiteLayout>
      <section className="page-hero contact-page-hero"><div className="page-wrap page-hero-inner"><p className="breadcrumb">الرئيسية <span>/</span> تواصل</p><span className="section-kicker gold-kicker">نقطة البداية</span><h1>لنبدأ من تفاصيل <em>شحنة واحدة</em></h1><p>أخبرنا بما تعرفه الآن عن البضاعة والوجهة والموعد، وسنساعدك في قراءة الخيارات التشغيلية الممكنة.</p></div></section>
      <section className="contact-page-section"><div className="page-wrap contact-page-layout"><div className="contact-info-panel"><span className="section-kicker">تواصل مباشر</span><h2>تفاصيل افتراضية للتجربة</h2><p>بيانات التواصل أدناه افتراضية ومخصصة لعرض الواجهة، ويمكن استبدالها بالبيانات التشغيلية الفعلية عند جاهزيتك.</p><a href={`mailto:${contactInfo.email}`}><span><Mail size={19} /></span><div><small>البريد الإلكتروني</small><strong>{contactInfo.email}</strong></div></a><a href={`tel:${contactInfo.phoneLink}`}><span><Phone size={19} /></span><div><small>الهاتف</small><strong dir="ltr">{contactInfo.phoneText}</strong></div></a><div className="contact-address"><span><MapPin size={19} /></span><div><small>الموقع</small><strong>الرياض، المملكة العربية السعودية</strong></div></div><div className="contact-hours"><Clock3 size={17} /> الأحد — الخميس، 09:00 — 17:00</div></div>
        <form className="contact-page-form" onSubmit={submitForm}><div className="form-row"><label>الاسم<input required placeholder="اسمك الكامل" /></label><label>اسم الشركة<input required placeholder="اسم المنشأة" /></label></div><div className="form-row"><label>البريد الإلكتروني<input required type="email" placeholder="name@company.sa" /></label><label>رقم الجوال<input required placeholder="05x xxx xxxx" /></label></div><div className="form-row"><label>بلد المنشأ<select defaultValue=""><option value="" disabled>اختر بلد المنشأ</option><option>الصين</option><option>الإمارات</option><option>ألمانيا</option><option>تركيا</option></select></label><label>نوع الخدمة<select defaultValue=""><option value="" disabled>اختر الخدمة</option><option>شحن جوي</option><option>شحن بحري</option><option>شحن سريع</option><option>تخليص جمركي</option></select></label></div><label>تفاصيل الشحنة<textarea required rows={5} placeholder="نوع البضاعة، الوزن التقريبي، مدينة الوصول والموعد المتوقع…" /></label><button className="primary-button form-submit" type="submit"><Send size={18} /> أرسل طلب الاستشارة</button>{sent && <p className="quote-success" role="status"><CircleCheck size={17} /> وصل طلبك المبدئي — هذه رسالة عرض توضيحية.</p>}</form>
      </div></section>
    </SiteLayout>
  );
}

