/** اتجاه «ممرّات الميناء»: صفحة تعريفية عربية، متوازنة بين المساحات الهادئة وإشارات التشغيل البحرية. */
import { Check, Compass, Eye, Handshake, ShieldCheck } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <SiteLayout>
      <section className="page-hero about-page-hero"><div className="page-wrap page-hero-inner"><p className="breadcrumb">الرئيسية <span>/</span> من نحن</p><span className="section-kicker gold-kicker">عن نوافذ</span><h1>نفتح للتجارة <em style={{ color: "#5ebaf3" }}>مساراً مفهوماً</em> حتى آخر محطة</h1><p>نوافذ فريق سعودي يجمع التخطيط التشغيلي والتواصل الواضح لتبقى رحلة شحنتك تحت نظر فريقك.</p></div></section>
      <section className="story-section"><div className="page-wrap story-layout"><Reveal className="story-copy"><span className="section-kicker">كيف نفكر</span><h2>التفاصيل الصغيرة هي التي تحمي <em>مساراً كبيراً</em></h2><p>لا نعامل الشحنة كسطر في جدول. نبدأ من فهم نوع البضاعة وموعدها ووجهتها، ثم نرتب مسارًا يمكن لفريقك متابعته دون ضجيج أو تحويلات بين أطراف كثيرة.</p><div className="story-points"><span><Check size={17} /> قرار شحن مبني على معلومات أولية واضحة</span><span><Check size={17} /> متابعة تشغيلية عبر نقطة اتصال واحدة</span><span><Check size={17} /> لغة تواصل تناسب فرق المشتريات والتجارة</span></div></Reveal><Reveal className="story-visual" delay={90}><div className="story-arch"><div className="story-orbit" /><span>من المورّد<br />إلى وجهتك</span></div><div className="story-caption">نحوّل سلسلة النقل إلى خطوات يعرفها فريقك.</div></Reveal></div></section>
      <section className="values-section"><div className="page-wrap"><div className="section-heading center-heading"><span className="section-kicker">قيم توجه حركتنا</span><h2>بسيطة في عبارتها، حاضرة في كل شحنة</h2></div><div className="values-grid"><Reveal><article><span><Eye size={24} /></span><h3>وضوح تشغيلي</h3><p>نعرض الخيارات كما هي، مع ما تحتاجه من معلومات لاتخاذ قرار الشحن.</p></article></Reveal><Reveal delay={80}><article><span><Compass size={24} /></span><h3>مسار متعمد</h3><p>نربط المواعيد والوجهات والخدمة في خطة تؤدي دورًا محددًا.</p></article></Reveal><Reveal delay={160}><article><span><Handshake size={24} /></span><h3>تواصل قريب</h3><p>يبقى فريقك على معرفة بما يتحرك الآن وما ينتظر الخطوة التالية.</p></article></Reveal></div></div></section>
      <section className="commitment-section"><div className="page-wrap commitment-layout"><div><span className="section-kicker gold-kicker">التزامنا</span><h2>التجارة لا تحتاج إلى وعود أكثر؛ بل إلى <em>تنفيذٍ أهدأ</em></h2></div><p>نحافظ على بساطة التجربة من خلال تنظيم المعلومات، والاستجابة العملية، وقراءة ما تحتاجه الشحنة قبل أن تبدأ الحركة. لأن الوقت في التجارة مورد لا يمكن استعادته.</p><div className="commitment-mark"><ShieldCheck size={35} /><span>نقطة مسؤولية واحدة</span></div></div></section>
    </SiteLayout>
  );
}
