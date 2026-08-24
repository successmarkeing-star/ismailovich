/** اتجاه «ممرّات الميناء»: صفحة معرفة تحافظ على البطاقات التحريرية الهادئة وسط ألوان العلامة البحرية. */
import { ArrowLeft, BookOpen, Clock3, FileText, Tags } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const articles = [
  ["دليل عملي", "قبل أن تحجز شحنتك الجوية: أسئلة تحدد المسار الصحيح", "6 دقائق", BookOpen],
  ["مستندات", "المستندات التي تستحق مراجعة إضافية قبل وصول الشحنة", "4 دقائق", FileText],
  ["إدارة التكلفة", "متى تكون الشحنة المجمعة اختيارًا اقتصاديًا مناسبًا؟", "5 دقائق", Tags],
  ["ممرات عالمية", "كيف ترتب موعد الشحن قبل موسم التجارة المرتفع؟", "7 دقائق", Clock3],
  ["دليل المورد", "ما المعلومات التي تسأل عنها المورد قبل استلام الشحنة؟", "5 دقائق", BookOpen],
  ["التخليص", "قائمة مبسطة لملف شحنة أوضح قبل الوصول", "3 دقائق", FileText],
];

export default function Insights() {
  const { toLocalePath } = useLanguage();
  return (
    <SiteLayout>
      <section className="page-hero insights-page-hero"><div className="page-wrap page-hero-inner"><p className="breadcrumb">الرئيسية <span>/</span> المعرفة</p><span className="section-kicker gold-kicker">معرفة نوافذ</span><h1>ملاحظات تُعينك على <em>قرار شحن أوضح</em></h1><p>أدلة قصيرة ومدخلات عملية تساعد فرق التجارة والمشتريات على طرح الأسئلة الصحيحة قبل أن تتحرك البضاعة.</p></div></section>
      <section className="insights-directory"><div className="page-wrap"><div className="insight-filter"><span>كل المواضيع</span><button className="is-active">أدلة عملية</button><button>مستندات وتخليص</button><button>إدارة التكلفة</button></div><div className="articles-grid">{articles.map(([category, title, readingTime, Icon], index) => { const ArticleIcon = Icon as typeof BookOpen; return <Reveal key={title as string} delay={index * 55}><article className={`article-card article-card-${index % 3}`}><span className="article-icon"><ArticleIcon size={22} /></span><p className="article-meta">{category as string} · {readingTime as string}</p><h2>{title as string}</h2><p>مقدمة موجزة تضع نقطة البداية لتفكير أكثر تنظيمًا حول الشحنة القادمة.</p><a href={toLocalePath("/contact")}>اقرأ الفكرة <ArrowLeft size={16} /></a></article></Reveal>; })}</div></div></section>
    </SiteLayout>
  );
}
