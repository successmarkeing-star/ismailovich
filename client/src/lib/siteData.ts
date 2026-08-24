/** اتجاه «ممرّات الميناء»: مصدر محتوى بسيط يضمن اتساق الخدمات بين كل الصفحات العربية. */
import { type LucideIcon, Plane, Ship, ShieldCheck, Truck } from "lucide-react";

export type ServiceItem = {
  slug: string;
  title: string;
  english: string;
  description: string;
  lead: string;
  duration: string;
  coverage: string;
  icon: LucideIcon;
  features: string[];
};

export const contactInfo = {
  email: "hello@nawafid.example",
  phoneText: "055 000 0000",
  phoneLink: "+966550000000",
};

export const serviceData: ServiceItem[] = [
  {
    slug: "air-freight",
    title: "الشحن الجوي",
    english: "AIR FREIGHT",
    lead: "للشحنات التي يحدد موعدها قيمة القرار.",
    description: "حلول جوية مجدولة وأولوية للشحنات التجارية بين مراكز الإمداد العالمية والمطارات الرئيسية في المملكة.",
    duration: "3–7 أيام",
    coverage: "+120 مطار",
    icon: Plane,
    features: ["خيارات أولوية وحجوزات مجدولة", "تجهيز وتنظيم ملف الشحنة", "تنسيق الاستلام عند الوصول", "تحديثات تشغيلية خلال الحركة"],
  },
  {
    slug: "sea-freight",
    title: "الشحن البحري",
    english: "SEA FREIGHT",
    lead: "سعة مستقرة وتكلفة محسوبة للشحنات التجارية.",
    description: "حاويات كاملة أو شحنات مجمعة تربط أسواق المنشأ بموانئ البحر الأحمر والخليج ضمن خطة وصول واضحة.",
    duration: "FCL / LCL",
    coverage: "+40 ميناء",
    icon: Ship,
    features: ["حاويات كاملة أو مجمعة", "تنسيق المناولة والمستندات", "خيارات دخول إلى الموانئ السعودية", "خطة تسليم نحو وجهتك"],
  },
  {
    slug: "express",
    title: "الشحن السريع",
    english: "EXPRESS",
    lead: "من الباب إلى الباب عند الحاجة إلى وقت أقصر.",
    description: "استلام موثوق للعينات والطلبات الصغيرة والشحنات ذات الأولوية، ضمن خيارات تسليم مرنة وواضحة.",
    duration: "1–4 أيام",
    coverage: "220 وجهة",
    icon: Truck,
    features: ["استلام من المورد", "خيار توصيل سريع للوجهة", "ملائم للعينات والطلبات الصغيرة", "متابعة مبسطة للمرجع"],
  },
  {
    slug: "customs-clearance",
    title: "التخليص الجمركي",
    english: "CUSTOMS",
    lead: "ملف مستندات أدق لعبور أكثر سلاسة.",
    description: "مراجعة أولية للمستندات ودعم تجهيز الملف التشغيلي بما يتوافق مع المتطلبات ذات العلاقة بفسح الشحنة.",
    duration: "24/7 متابعة",
    coverage: "98% جاهزية",
    icon: ShieldCheck,
    features: ["مراجعة استباقية للمستندات", "تنظيم بيانات ملف الشحنة", "متابعة خطوات الفسح", "تواصل واضح مع الأطراف المعنية"],
  },
];

