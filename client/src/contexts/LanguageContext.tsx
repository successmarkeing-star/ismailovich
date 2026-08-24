/** اتجاه «ممرّات الميناء»: تعريب مركزي يحافظ على الهندسة المشتركة للموقع عبر العربية والإنجليزية والصينية. */
import { createContext, type ReactNode, useContext, useEffect, useMemo } from "react";
import { useLocation } from "wouter";

export type Language = "ar" | "en" | "zh";

type LanguageContextValue = {
  language: Language;
  dir: "rtl" | "ltr";
  toLocalePath: (path: string) => string;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type Translation = { en: string; zh: string };
const dictionary: Record<string, Translation> = {
  "تجاوز إلى المحتوى": { en: "Skip to content", zh: "跳至内容" },
  "شبكة شحن سعودية متصلة بالممرات العالمية": { en: "A Saudi shipping network connected to global trade lanes", zh: "连接全球贸易航线的沙特物流网络" },
  "الرئيسية": { en: "Home", zh: "首页" }, "من نحن": { en: "About us", zh: "关于我们" }, "خدماتنا": { en: "Services", zh: "服务" }, "المعرفة": { en: "Insights", zh: "知识中心" }, "تواصل": { en: "Contact", zh: "联系" },
  "نوافذ": { en: "Nawafid", zh: "纳瓦菲德" }, "للشحن والخدمات اللوجستية": { en: "Shipping & Logistics", zh: "航运与物流服务" },
  "مسار الصين — المملكة": { en: "China — Saudi Arabia route", zh: "中国 — 沙特阿拉伯航线" }, "شحنٌ يصل إلى السعودية": { en: "Shipping that reaches Saudi Arabia", zh: "抵达沙特的运输" }, "بثقةٍ وخطةٍ واضحة": { en: "with confidence and a clear plan", zh: "以信心与清晰计划" },
  "حلول شحن متكاملة للمستوردين: جوي وبحري وسريع، مع تخليص واستلام حتى باب عملك.": { en: "Integrated shipping solutions for importers: air, sea and express, with clearance and delivery to your door.", zh: "为进口商提供一体化物流方案：空运、海运和快递，含清关及送货上门。" },
  "من الميناء إلى المستودع": { en: "From port to warehouse", zh: "从港口到仓库" }, "كل محطة محسوبة": { en: "Every milestone is planned", zh: "每一环都经过规划" }, "قبل أن تتحرك شحنتك": { en: "before your shipment moves", zh: "在您的货物启运之前" },
  "ننسق مساحة الشحن، المستندات والتخليص المحلي ضمن مسار واحد يفهم أولويات تجارتك.": { en: "We coordinate space, documents and local clearance through one route that understands your trade priorities.", zh: "我们统筹舱位、文件和本地清关，为您的贸易优先级设计统一路径。" },
  "للتجارة التي لا تنتظر": { en: "For trade that cannot wait", zh: "为不容等待的贸易" }, "سرعةٌ مدروسة": { en: "Thoughtful speed", zh: "经过规划的速度" }, "وتتبعٌ أقرب إليك": { en: "and tracking closer to you", zh: "以及更贴近您的追踪服务" },
  "خدمة تشغيلية واضحة من أول عرض السعر حتى إشعار التسليم، لفِرق الشراء والمتاجر النامية.": { en: "A clear operating service from the first quote to delivery confirmation, for procurement teams and growing stores.", zh: "从首次报价到交付确认的透明运营服务，适合采购团队和成长型商店。" },
  "احصل على خطة شحن": { en: "Get a shipping plan", zh: "获取运输方案" }, "جوي": { en: "Air", zh: "空运" }, "بحري": { en: "Sea", zh: "海运" }, "سريع": { en: "Express", zh: "快递" }, "تخليص": { en: "Clearance", zh: "清关" }, "حلول نوافذ": { en: "Nawafid solutions", zh: "纳瓦菲德方案" },
  "تتبع سريع": { en: "Quick tracking", zh: "快速追踪" }, "اعرف أين تقف شحنتك الآن": { en: "Know where your shipment is now", zh: "了解您的货物当前位置" }, "رقم البوليصة أو المرجع": { en: "Waybill or reference number", zh: "运单或参考编号" }, "تتبع": { en: "Track", zh: "追踪" }, "مثال: NW-584210": { en: "Example: NW-584210", zh: "示例：NW-584210" },
  "خدمات لوجستية متصلة": { en: "Connected logistics services", zh: "互联物流服务" }, "اختَر المسار، واترك التفاصيل لنا": { en: "Choose the route, leave the details to us", zh: "选择路线，把细节交给我们" }, "نقرب الموانئ والمطارات ومراكز التوزيع من خطة واحدة تناسب توقيت تجارتك ووجهتها.": { en: "We bring ports, airports and distribution centers into one plan that fits your trade timing and destination.", zh: "我们将港口、机场和配送中心整合为一项符合您贸易时效与目的地的计划。" },
  "الشحن الجوي": { en: "Air freight", zh: "空运" }, "الشحن البحري": { en: "Sea freight", zh: "海运" }, "الشحن السريع": { en: "Express shipping", zh: "快递运输" }, "تخليص جمركي": { en: "Customs clearance", zh: "清关服务" },
  "الأسرع للطلبات الحساسة للوقت": { en: "Fastest for time-sensitive orders", zh: "适合时间敏感型订单" }, "سعة مستقرة وتكلفة محسوبة": { en: "Stable capacity and controlled cost", zh: "稳定的运力与可控成本" }, "من الباب إلى الباب": { en: "Door to door", zh: "门到门服务" }, "مستندات أدق، عبور أسلس": { en: "Sharper documents, smoother clearance", zh: "更准确的文件，更顺畅的通关" },
  "اطلب هذه الخدمة": { en: "Request this service", zh: "咨询此服务" }, "عن نوافذ": { en: "About Nawafid", zh: "关于纳瓦菲德" }, "نفتح نافذة واضحة بين": { en: "We open a clear window between", zh: "我们在之间打开清晰窗口" }, "مصدر الشحنة": { en: "the shipment source", zh: "货物来源" }, "ووجهتها": { en: "and its destination", zh: "与目的地" },
  "رحلة واحدة، رؤية كاملة": { en: "One journey, complete visibility", zh: "一段旅程，全程可见" }, "كيف تتحرك شحنتك معنا؟": { en: "How does your shipment move with us?", zh: "您的货物如何随我们流转？" },
  "نتعرف على الشحنة": { en: "We understand the shipment", zh: "了解您的货物" }, "نرسم المسار": { en: "We map the route", zh: "规划运输路线" }, "ندير المستندات": { en: "We manage documents", zh: "管理运输文件" }, "نسلّم ونغلق الحلقة": { en: "We deliver and close the loop", zh: "交付并完成流程" },
  "تشغيلٌ منضبط لا يضيع بين الأطراف": { en: "Disciplined operations that do not get lost between parties", zh: "不在多方之间迷失的规范运营" }, "تحدث مع مستشار شحن": { en: "Speak with a shipping advisor", zh: "咨询运输顾问" },
  "معرفة تشغّل قرارك": { en: "Knowledge that powers your decision", zh: "支持您决策的知识" }, "ملاحظات من طريق الشحن": { en: "Notes from the shipping route", zh: "来自运输路线的洞察" }, "كل المقالات": { en: "All articles", zh: "所有文章" },
  "أسئلة تتكرر قبل الحجز": { en: "Questions before booking", zh: "预订前常见问题" }, "إجابات مباشرة قبل أن تبدأ": { en: "Direct answers before you begin", zh: "开始前的直接解答" },
  "ابدأ بالخطوة التالية": { en: "Start with the next step", zh: "从下一步开始" }, "دعنا نرسم لشحنتك": { en: "Let us map for your shipment", zh: "让我们为您的货物规划" }, "الممر الأنسب": { en: "the most suitable lane", zh: "最合适的运输通道" }, "أرسل طلب الاستشارة": { en: "Send consultation request", zh: "发送咨询请求" },
  "شريك تشغيل سعودي يقرّب لك طريق التجارة، من أول مستند إلى لحظة التسليم.": { en: "A Saudi operations partner that brings your trade route closer, from the first document to delivery.", zh: "沙特运营伙伴，从第一份文件到交付，为您的贸易之路提供支持。" }, "الوصول السريع": { en: "Quick links", zh: "快捷链接" }, "الخدمات": { en: "Services", zh: "服务" }, "تواصل معنا": { en: "Contact us", zh: "联系我们" }, "الرياض، المملكة العربية السعودية": { en: "Riyadh, Saudi Arabia", zh: "沙特阿拉伯，利雅得" }, "سياسة الخصوصية": { en: "Privacy policy", zh: "隐私政策" }, "شروط الاستخدام": { en: "Terms of use", zh: "使用条款" },
  "نفتح للتجارة": { en: "We open trade", zh: "我们为贸易打开" }, "مساراً مفهوماً": { en: "a clear route", zh: "清晰的路径" }, "حتى آخر محطة": { en: "to the final mile", zh: "直到最后一站" }, "كيف نفكر": { en: "How we think", zh: "我们的思考方式" }, "التفاصيل الصغيرة هي التي تحمي": { en: "The small details protect", zh: "微小细节保护" }, "مساراً كبيراً": { en: "a major route", zh: "重要路线" },
  "قيم توجه حركتنا": { en: "Values that guide our movement", zh: "引导我们行动的价值观" }, "بسيطة في عبارتها، حاضرة في كل شحنة": { en: "Simple in words, present in every shipment", zh: "表达简单，贯穿每一票货物" }, "وضوح تشغيلي": { en: "Operational clarity", zh: "运营清晰" }, "مسار متعمد": { en: "A deliberate route", zh: "精心规划的路线" }, "تواصل قريب": { en: "Close communication", zh: "贴近沟通" },
  "التزامنا": { en: "Our commitment", zh: "我们的承诺" }, "التجارة لا تحتاج إلى وعود أكثر؛ بل إلى": { en: "Trade does not need more promises; it needs", zh: "贸易不需要更多承诺，而需要" }, "تنفيذٍ أهدأ": { en: "calmer execution", zh: "更稳健的执行" },
  "خدمات نوافذ": { en: "Nawafid services", zh: "纳瓦菲德服务" }, "كل نوع شحنة له": { en: "Every shipment type has", zh: "每种货物都有" }, "مسار أدق": { en: "a more precise route", zh: "更精准的路线" }, "اختر نقطة البداية": { en: "Choose your starting point", zh: "选择您的起点" }, "حلول تكبر أو تصغر مع حجم شحنتك": { en: "Solutions that scale with your shipment", zh: "随货物规模灵活调整的方案" }, "مرّر المؤشر فوق أي خدمة لاستكشافها، أو افتح صفحة الخدمة لمزيد من التفاصيل.": { en: "Hover over any service to explore it, or open its page for more details.", zh: "将鼠标悬停在任何服务上进行探索，或打开服务页面查看详细信息。" }, "عرض تفاصيل الخدمة": { en: "View service details", zh: "查看服务详情" },
  "ما الذي تتضمنه الخدمة؟": { en: "What does the service include?", zh: "服务包含哪些内容？" }, "خطوات التنفيذ": { en: "Execution steps", zh: "执行步骤" }, "تبدأ من معلومة، وتنتهي بوصول واضح": { en: "It starts with information and ends with a clear arrival", zh: "始于信息，终于清晰到达" }, "هل تحتاج قراءة سريعة لاحتياج شحنتك؟": { en: "Need a quick read on your shipping need?", zh: "需要快速了解您的运输需求吗？" }, "أرسل التفاصيل": { en: "Send details", zh: "发送详情" },
  "معرفة نوافذ": { en: "Nawafid insights", zh: "纳瓦菲德知识中心" }, "ملاحظات تُعينك على": { en: "Insights that help you make", zh: "帮助您做出" }, "قرار شحن أوضح": { en: "a clearer shipping decision", zh: "更清晰的运输决策" }, "كل المواضيع": { en: "All topics", zh: "所有主题" }, "أدلة عملية": { en: "Practical guides", zh: "实用指南" }, "مستندات وتخليص": { en: "Documents & clearance", zh: "文件与清关" }, "إدارة التكلفة": { en: "Cost management", zh: "成本管理" },
  "نقطة البداية": { en: "Starting point", zh: "起点" }, "لنبدأ من تفاصيل": { en: "Let us start with the details of", zh: "让我们从以下细节开始" }, "شحنة واحدة": { en: "one shipment", zh: "一票货物" }, "تواصل مباشر": { en: "Direct contact", zh: "直接联系" }, "تفاصيل افتراضية للتجربة": { en: "Demo contact details", zh: "演示联系信息" }, "البريد الإلكتروني": { en: "Email", zh: "电子邮箱" }, "الهاتف": { en: "Phone", zh: "电话" }, "الموقع": { en: "Location", zh: "地点" }, "اسمك الكامل": { en: "Your full name", zh: "您的全名" }, "اسم المنشأة": { en: "Company name", zh: "公司名称" }, "رقم الجوال": { en: "Mobile number", zh: "手机号码" }, "بلد المنشأ": { en: "Country of origin", zh: "原产国" }, "نوع الخدمة": { en: "Service type", zh: "服务类型" }, "اختر بلد المنشأ": { en: "Choose country of origin", zh: "选择原产国" }, "اختر الخدمة": { en: "Choose a service", zh: "选择服务" }, "تفاصيل الشحنة": { en: "Shipment details", zh: "货物详情" },
  "نوافذ فريق سعودي يجمع التخطيط التشغيلي والتواصل الواضح لتبقى رحلة شحنتك تحت نظر فريقك.": { en: "Nawafid is a Saudi team that combines operating planning and clear communication so your shipment stays in view.", zh: "纳瓦菲德是一支沙特团队，将运营规划与清晰沟通相结合，让您的货物全程可见。" },
  "لا نعامل الشحنة كسطر في جدول. نبدأ من فهم نوع البضاعة وموعدها ووجهتها، ثم نرتب مسارًا يمكن لفريقك متابعته دون ضجيج أو تحويلات بين أطراف كثيرة.": { en: "We do not treat a shipment as a row in a spreadsheet. We understand the cargo, timing and destination, then build a route your team can follow without noise or handoffs.", zh: "我们不把货物当作表格中的一行。我们先了解货物、时效与目的地，再建立团队可清晰跟进的路线。" },
  "قرار شحن مبني على معلومات أولية واضحة": { en: "Shipping decisions built on clear first information", zh: "基于清晰初始信息的运输决策" }, "متابعة تشغيلية عبر نقطة اتصال واحدة": { en: "Operational follow-up through one contact point", zh: "通过单一联络点进行运营跟进" }, "لغة تواصل تناسب فرق المشتريات والتجارة": { en: "Communication that suits procurement and trade teams", zh: "适合采购与贸易团队的沟通方式" },
  "من المورّد": { en: "From the supplier", zh: "从供应商" }, "إلى وجهتك": { en: "to your destination", zh: "到您的目的地" }, "نحوّل سلسلة النقل إلى خطوات يعرفها فريقك.": { en: "We turn the transport chain into steps your team understands.", zh: "我们将运输链转化为您的团队能理解的步骤。" },
  "نعرض الخيارات كما هي، مع ما تحتاجه من معلومات لاتخاذ قرار الشحن.": { en: "We present choices as they are, with the information you need to make a shipping decision.", zh: "我们如实呈现选项，并提供您作出运输决策所需的信息。" }, "نربط المواعيد والوجهات والخدمة في خطة تؤدي دورًا محددًا.": { en: "We connect timing, destinations and service in a plan with a clear role.", zh: "我们将时效、目的地与服务整合为职责明确的计划。" }, "يبقى فريقك على معرفة بما يتحرك الآن وما ينتظر الخطوة التالية.": { en: "Your team stays informed about what is moving now and what awaits the next step.", zh: "您的团队始终了解当前进展以及下一步事项。" },
  "نحافظ على بساطة التجربة من خلال تنظيم المعلومات، والاستجابة العملية، وقراءة ما تحتاجه الشحنة قبل أن تبدأ الحركة. لأن الوقت في التجارة مورد لا يمكن استعادته.": { en: "We keep the experience simple through organised information, practical response and understanding what the cargo needs before it moves. In trade, time is a resource that cannot be recovered.", zh: "我们通过有序信息、务实响应以及在启运前理解货物需求来保持体验简洁。贸易中的时间是无法收回的资源。" }, "نقطة مسؤولية واحدة": { en: "One point of accountability", zh: "单一责任点" },
  "اختر الخدمة التي تلائم توقيت التجارة وطبيعة البضائع، ثم دع فريقنا يساعدك في قراءة الخطوة التالية.": { en: "Choose the service that fits your trade timing and cargo type, then let our team help you read the next step.", zh: "选择符合您贸易时效和货物类型的服务，让我们的团队协助您规划下一步。" },
  "للشحنات التي يحدد موعدها قيمة القرار.": { en: "For shipments whose timing shapes the decision.", zh: "适合时效决定业务价值的货物。" }, "حلول جوية مجدولة وأولوية للشحنات التجارية بين مراكز الإمداد العالمية والمطارات الرئيسية في المملكة.": { en: "Scheduled and priority air solutions for commercial shipments between global supply hubs and Saudi Arabia's main airports.", zh: "为全球供应中心与沙特主要机场之间的商业货物提供定期与优先空运方案。" }, "خيارات أولوية وحجوزات مجدولة": { en: "Priority options and scheduled bookings", zh: "优先选项与定期订舱" }, "تجهيز وتنظيم ملف الشحنة": { en: "Prepare and organise the shipment file", zh: "准备并整理货物文件" }, "تنسيق الاستلام عند الوصول": { en: "Coordinate collection on arrival", zh: "协调到达后的提货" }, "تحديثات تشغيلية خلال الحركة": { en: "Operational updates while in transit", zh: "运输过程中的运营更新" },
  "سعة مستقرة وتكلفة محسوبة للشحنات التجارية.": { en: "Stable capacity and calculated cost for commercial shipments.", zh: "为商业货物提供稳定运力与可控成本。" }, "حاويات كاملة أو شحنات مجمعة تربط أسواق المنشأ بموانئ البحر الأحمر والخليج ضمن خطة وصول واضحة.": { en: "Full containers or consolidated cargo connecting origin markets to Red Sea and Gulf ports through a clear arrival plan.", zh: "整柜或拼箱服务，将原产地市场连接至红海和海湾港口，并配有清晰的到港计划。" }, "حاويات كاملة أو مجمعة": { en: "Full container or consolidated cargo", zh: "整柜或拼箱货物" }, "تنسيق المناولة والمستندات": { en: "Coordinate handling and documents", zh: "协调操作与文件" }, "خيارات دخول إلى الموانئ السعودية": { en: "Saudi port entry options", zh: "沙特港口入境选项" }, "خطة تسليم نحو وجهتك": { en: "Delivery plan to your destination", zh: "前往目的地的配送计划" },
  "من الباب إلى الباب عند الحاجة إلى وقت أقصر.": { en: "Door to door when you need a shorter timeline.", zh: "当您需要更短时效时提供门到门服务。" }, "استلام موثوق للعينات والطلبات الصغيرة والشحنات ذات الأولوية، ضمن خيارات تسليم مرنة وواضحة.": { en: "Reliable pickup for samples, small orders and priority shipments, with flexible and clear delivery options.", zh: "为样品、小订单和优先货物提供可靠取件，并提供灵活清晰的交付选项。" }, "استلام من المورد": { en: "Pickup from supplier", zh: "从供应商处提货" }, "خيار توصيل سريع للوجهة": { en: "Fast delivery option to destination", zh: "目的地快速交付选项" }, "ملائم للعينات والطلبات الصغيرة": { en: "Suitable for samples and small orders", zh: "适合样品与小订单" }, "متابعة مبسطة للمرجع": { en: "Simple reference tracking", zh: "简化参考号追踪" },
  "ملف مستندات أدق لعبور أكثر سلاسة.": { en: "A sharper document file for smoother clearance.", zh: "更准确的文件资料，实现更顺畅的通关。" }, "مراجعة أولية للمستندات ودعم تجهيز الملف التشغيلي بما يتوافق مع المتطلبات ذات العلاقة بفسح الشحنة.": { en: "Initial document review and support in preparing the operating file in line with clearance requirements.", zh: "初步审核文件，并协助准备符合清关要求的运营资料。" }, "مراجعة استباقية للمستندات": { en: "Proactive document review", zh: "主动审核文件" }, "تنظيم بيانات ملف الشحنة": { en: "Organise shipment file data", zh: "整理货物文件数据" }, "متابعة خطوات الفسح": { en: "Follow clearance steps", zh: "跟进清关流程" }, "تواصل واضح مع الأطراف المعنية": { en: "Clear contact with relevant parties", zh: "与相关方清晰沟通" },
  "اطلب استشارة لهذه الخدمة": { en: "Request a consultation for this service", zh: "咨询此服务" }, "نرتب هذا المسار وفق معلومات الشحنة الأولية ونوضح لك نقاط القرار الرئيسية قبل بدء الحجز.": { en: "We arrange this route based on initial shipment information and clarify key decision points before booking starts.", zh: "我们根据初始货物信息安排此路线，并在订舱开始前说明关键决策点。" }, "فهم بيانات الشحنة": { en: "Understand shipment data", zh: "了解货物信息" }, "تقديم خيار المسار": { en: "Present the route option", zh: "提供路线选项" }, "تنسيق المستندات": { en: "Coordinate documents", zh: "协调文件" }, "تحديثات حتى الوصول": { en: "Updates until arrival", zh: "更新至到达" }, "تواصل مع فريق نوافذ عبر وسائل التواصل الافتراضية.": { en: "Contact Nawafid's team through the demo contact channels.", zh: "通过演示联系方式联络纳瓦菲德团队。" },
  "أدلة قصيرة ومدخلات عملية تساعد فرق التجارة والمشتريات على طرح الأسئلة الصحيحة قبل أن تتحرك البضاعة.": { en: "Short guides and practical inputs that help trade and procurement teams ask the right questions before cargo moves.", zh: "简短指南和实用信息，帮助贸易与采购团队在货物启运前提出正确的问题。" }, "مقدمة موجزة تضع نقطة البداية لتفكير أكثر تنظيمًا حول الشحنة القادمة.": { en: "A concise introduction that provides a starting point for more organised thinking about the next shipment.", zh: "简明介绍，为下一票货物提供更有序思考的起点。" }, "اقرأ الفكرة": { en: "Read the insight", zh: "阅读洞察" },
  "أخبرنا بما تعرفه الآن عن البضاعة والوجهة والموعد، وسنساعدك في قراءة الخيارات التشغيلية الممكنة.": { en: "Tell us what you know about the cargo, destination and timing, and we will help you read the possible operating options.", zh: "告诉我们您已知的货物、目的地和时效信息，我们将协助您了解可行的运营方案。" }, "بيانات التواصل أدناه افتراضية ومخصصة لعرض الواجهة، ويمكن استبدالها بالبيانات التشغيلية الفعلية عند جاهزيتك.": { en: "The contact details below are for demonstration and can be replaced with operational details when ready.", zh: "以下联系信息用于演示，可在准备就绪时替换为实际运营信息。" }, "الأحد — الخميس، 09:00 — 17:00": { en: "Sunday — Thursday, 09:00 — 17:00", zh: "周日 — 周四，09:00 — 17:00" }, "اسم": { en: "Name", zh: "姓名" }, "نوع البضاعة، الوزن التقريبي، مدينة الوصول والموعد المتوقع…": { en: "Cargo type, approximate weight, destination city and expected date…", zh: "货物类型、预计重量、目的地城市和预计日期…" }, "وصل طلبك المبدئي — هذه رسالة عرض توضيحية.": { en: "Your initial request has been received — this is a demo confirmation.", zh: "您的初步请求已收到——这是演示确认信息。" },
  "3–7 أيام": { en: "3–7 days", zh: "3–7天" }, "+120 مطار": { en: "+120 airports", zh: "+120座机场" }, "FCL / LCL": { en: "FCL / LCL", zh: "整柜 / 拼箱" }, "+40 ميناء": { en: "+40 ports", zh: "+40个港口" }, "1–4 أيام": { en: "1–4 days", zh: "1–4天" }, "220 وجهة": { en: "220 destinations", zh: "220个目的地" }, "24/7 متابعة": { en: "24/7 follow-up", zh: "全天候跟进" }, "98% جاهزية": { en: "98% readiness", zh: "98%就绪率" },
};

const originalTextNodes = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<HTMLElement, Map<string, string>>();

function replaceText(value: string, language: Language) {
  const key = value.trim();
  if (!key || language === "ar") return value;
  const translation = dictionary[key]?.[language];
  if (!translation) return value;
  const prefix = value.match(/^\s*/)?.[0] ?? "";
  const suffix = value.match(/\s*$/)?.[0] ?? "";
  return `${prefix}${translation}${suffix}`;
}

function translateTree(language: Language) {
  const root = document.getElementById("root");
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);
  nodes.forEach((textNode) => {
    if (textNode.parentElement?.closest("script, style, [data-no-translate]")) return;
    const original = originalTextNodes.get(textNode) ?? textNode.nodeValue ?? "";
    originalTextNodes.set(textNode, original);
    const nextText = replaceText(original, language);
    if (textNode.nodeValue !== nextText) textNode.nodeValue = nextText;
  });
  root.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [alt]").forEach((element) => {
    const saved = originalAttributes.get(element) ?? new Map<string, string>();
    originalAttributes.set(element, saved);
    ["placeholder", "aria-label", "alt"].forEach((attribute) => {
      const current = element.getAttribute(attribute);
      if (current && !saved.has(attribute)) saved.set(attribute, current);
      const original = saved.get(attribute);
      const nextText = original ? replaceText(original, language) : null;
      if (nextText && current !== nextText) element.setAttribute(attribute, nextText);
    });
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const language: Language = location === "/zh" || location.startsWith("/zh/") ? "zh" : location === "/en" || location.startsWith("/en/") ? "en" : "ar";
  const dir = language === "ar" ? "rtl" : "ltr";
  const value = useMemo<LanguageContextValue>(() => ({
    language,
    dir,
    toLocalePath(path) {
      const cleanPath = path.startsWith("/") ? path : `/${path}`;
      return language === "ar" ? cleanPath : `/${language}${cleanPath === "/" ? "" : cleanPath}`;
    },
    setLanguage(nextLanguage) {
      const plainPath = (location.replace(/^\/(en|zh)(?=\/|$)/, "") || "/").replace(/\/$/, "") || "/";
      setLocation(nextLanguage === "ar" ? plainPath : `/${nextLanguage}${plainPath === "/" ? "" : plainPath}`);
    },
  }), [dir, language, location, setLocation]);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    document.documentElement.dir = dir;
    document.documentElement.classList.toggle("lang-en", language === "en");
    document.documentElement.classList.toggle("lang-zh", language === "zh");
    document.title = language === "ar" ? "نوافذ | للشحن والخدمات اللوجستية" : language === "en" ? "Nawafid | Shipping & Logistics" : "纳瓦菲德 | 航运与物流";
    const frame = window.requestAnimationFrame(() => translateTree(language));
    const observer = new MutationObserver(() => window.requestAnimationFrame(() => translateTree(language)));
    const root = document.getElementById("root");
    if (root && language !== "ar") observer.observe(root, { childList: true, characterData: true, subtree: true });
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); };
  }, [dir, language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
