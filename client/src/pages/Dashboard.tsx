import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import {
  ArrowUpLeft,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  CircleDot,
  Clock3,
  FileText,
  Package,
  PackageCheck,
  Plane,
  RefreshCw,
  Search,
  Ship,
  Truck,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";

type Language = "ar" | "en";
type ShipmentMode = "sea" | "air" | "road";
type ShipmentStatus = "quote" | "sourcing" | "processing" | "inTransit" | "customs" | "outForDelivery" | "delivered";
type OrderStatus = "inquiry" | "confirmed" | "sourcing" | "shipping" | "completed" | "cancelled";
type ShipmentRecord = { id: number; customerId: number; trackingNumber: string; orderNumber: string | null; productName: string; origin: string; destination: string; mode: ShipmentMode; status: ShipmentStatus; progress: number; currentLocation: string | null; estimatedArrival: Date | null; lastUpdated: Date; createdAt: Date };
type OrderRecord = { id: number; customerId: number; orderNumber: string; title: string; status: OrderStatus; updatedAt: Date; createdAt: Date };
type DashboardData = { shipments: ShipmentRecord[]; orders: OrderRecord[] };

type DashboardCopy = {
  brand: string;
  eyebrow: string;
  title: string;
  description: string;
  refresh: string;
  searchPlaceholder: string;
  search: string;
  shipments: string;
  orders: string;
  active: string;
  delivered: string;
  nextArrival: string;
  noShipments: string;
  noShipmentsDescription: string;
  requestShipment: string;
  viewAll: string;
  latestShipments: string;
  recentOrders: string;
  tracking: string;
  origin: string;
  destination: string;
  updated: string;
  estimatedArrival: string;
  status: string;
  orderNumber: string;
  noOrders: string;
  noOrdersDescription: string;
  startOrder: string;
  searchFound: string;
  notFound: string;
  steps: { quote: string; sourcing: string; processing: string; inTransit: string; customs: string; outForDelivery: string; delivered: string };
  orderStatuses: { inquiry: string; confirmed: string; sourcing: string; shipping: string; completed: string; cancelled: string };
};

const copy: Record<Language, DashboardCopy> = {
  ar: {
    brand: "مركز العميل",
    eyebrow: "CLIENT CONTROL / 01",
    title: "رحلتك، أمامك بوضوح.",
    description: "تابع حالة الشحنات والطلبات من نقطة واحدة، مع آخر تحديثات المسار ومواعيد الوصول المتوقعة.",
    refresh: "تحديث البيانات",
    searchPlaceholder: "أدخل رقم التتبع مثل SP-2048",
    search: "تتبع الشحنة",
    shipments: "الشحنات",
    orders: "الطلبات",
    active: "قيد التنفيذ",
    delivered: "تم التسليم",
    nextArrival: "الوصول القادم",
    noShipments: "لا توجد شحنات مرتبطة بحسابك بعد.",
    noShipmentsDescription: "عند إنشاء أول شحنة لك، ستظهر هنا مع آخر موقع وحالة وتاريخ وصول متوقع.",
    requestShipment: "ابدأ طلب شحن",
    viewAll: "عرض كل الشحنات",
    latestShipments: "آخر الشحنات",
    recentOrders: "آخر الطلبات",
    tracking: "رقم التتبع",
    origin: "من",
    destination: "إلى",
    updated: "آخر تحديث",
    estimatedArrival: "الوصول المتوقع",
    status: "الحالة",
    orderNumber: "رقم الطلب",
    noOrders: "لا توجد طلبات حتى الآن.",
    noOrdersDescription: "أرسل تفاصيل منتجك من صفحة الرائدة الفضية لبدء طلب جديد.",
    startOrder: "ابدأ طلبًا جديدًا",
    searchFound: "تم العثور على الشحنة",
    notFound: "لم نجد شحنة بهذا الرقم ضمن حسابك.",
    steps: { quote: "طلب التسعير", sourcing: "البحث والتوريد", processing: "التجهيز", inTransit: "في الطريق", customs: "التخليص الجمركي", outForDelivery: "خرجت للتسليم", delivered: "تم التسليم" },
    orderStatuses: { inquiry: "استفسار جديد", confirmed: "تم التأكيد", sourcing: "جاري التوريد", shipping: "جاري الشحن", completed: "مكتمل", cancelled: "ملغى" },
  },
  en: {
    brand: "Client center",
    eyebrow: "CLIENT CONTROL / 01",
    title: "Your route, in clear view.",
    description: "Follow shipments and orders from one place, with the latest route updates and expected arrival dates.",
    refresh: "Refresh data",
    searchPlaceholder: "Enter a tracking number, e.g. SP-2048",
    search: "Track shipment",
    shipments: "Shipments",
    orders: "Orders",
    active: "In progress",
    delivered: "Delivered",
    nextArrival: "Next arrival",
    noShipments: "No shipments are linked to your account yet.",
    noShipmentsDescription: "When your first shipment is created, its latest location, status, and estimated arrival will appear here.",
    requestShipment: "Start a shipment request",
    viewAll: "View all shipments",
    latestShipments: "Latest shipments",
    recentOrders: "Recent orders",
    tracking: "Tracking number",
    origin: "From",
    destination: "To",
    updated: "Last updated",
    estimatedArrival: "Estimated arrival",
    status: "Status",
    orderNumber: "Order number",
    noOrders: "No orders yet.",
    noOrdersDescription: "Share your product details from the Silver Pioneer website to start a new request.",
    startOrder: "Start a new request",
    searchFound: "Shipment found",
    notFound: "We could not find that shipment within your account.",
    steps: { quote: "Quote requested", sourcing: "Sourcing", processing: "Processing", inTransit: "In transit", customs: "Customs clearance", outForDelivery: "Out for delivery", delivered: "Delivered" },
    orderStatuses: { inquiry: "New inquiry", confirmed: "Confirmed", sourcing: "Sourcing", shipping: "Shipping", completed: "Completed", cancelled: "Cancelled" },
  },
};

const modeIcons = { sea: Ship, air: Plane, road: Truck } as const;
const shipmentSteps = ["quote", "sourcing", "processing", "inTransit", "customs", "outForDelivery", "delivered"] as const;

function formatDate(value: Date | string | null | undefined, language: Language) {
  if (!value) return "—";
  const date = new Date(value);
  return new Intl.DateTimeFormat(language === "ar" ? "ar-SA" : "en-US", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function getShipmentStepIndex(status: string) {
  const index = shipmentSteps.indexOf(status as (typeof shipmentSteps)[number]);
  return index >= 0 ? index : 0;
}

function StatusPill({ status, language }: { status: string; language: Language }) {
  const t = copy[language];
  const label = t.steps[status as keyof DashboardCopy["steps"]] ?? status;
  const isDone = status === "delivered";
  return <span className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[0.65rem] font-semibold ${isDone ? "border-emerald-700/20 bg-emerald-50 text-emerald-800" : "border-[rgba(216,117,75,0.3)] bg-[rgba(216,117,75,0.08)] text-[var(--copper-signal)]"}`}><span className={`h-1.5 w-1.5 rounded-full ${isDone ? "bg-emerald-600" : "bg-[var(--copper-signal)]"}`} />{label}</span>;
}

function MetricCard({ icon: Icon, label, value, detail }: { icon: typeof Package; label: string; value: string | number; detail: string }) {
  return <div className="dashboard-card flex min-h-32 flex-col justify-between p-5"><div className="flex items-start justify-between gap-4"><span className="font-mono text-[0.62rem] tracking-[0.12em] text-[var(--muted-foreground)]">{label}</span><span className="motion-right flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--copper-signal)]" data-depth="10"><Icon size={17} strokeWidth={1.6} /></span></div><div className="flex items-end justify-between gap-3"><span className="font-display text-3xl font-bold tracking-[-0.07em] text-[var(--ink-navy)]">{value}</span><span className="text-right text-[0.68rem] leading-5 text-[var(--muted-foreground)]">{detail}</span></div></div>;
}

function ShipmentCard({ shipment, language, compact = false }: { shipment: ShipmentRecord; language: Language; compact?: boolean }) {
  const t = copy[language];
  const ModeIcon = modeIcons[shipment.mode];
  const stepIndex = getShipmentStepIndex(shipment.status);
  return <article className={`dashboard-card group relative overflow-hidden p-5 ${compact ? "" : "sm:p-6"}`}><div className="flex flex-col gap-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--ink-navy)] text-[var(--copper-signal)]"><ModeIcon size={18} strokeWidth={1.5} /></span><div><p className="font-mono text-[0.68rem] font-semibold tracking-[0.08em] text-[var(--ink-navy)]">{shipment.trackingNumber}</p><h3 className="font-display mt-1 text-base font-bold tracking-[-0.05em] text-[var(--ink-navy)]">{shipment.productName}</h3></div></div><StatusPill status={shipment.status} language={language} /></div><div className="grid gap-4 text-sm sm:grid-cols-3"><div><span className="block text-[0.62rem] text-[var(--muted-foreground)]">{t.origin}</span><span className="mt-1 block font-medium text-[var(--ink-navy)]">{shipment.origin}</span></div><div><span className="block text-[0.62rem] text-[var(--muted-foreground)]">{t.destination}</span><span className="mt-1 block font-medium text-[var(--ink-navy)]">{shipment.destination}</span></div><div><span className="block text-[0.62rem] text-[var(--muted-foreground)]">{t.estimatedArrival}</span><span className="mt-1 block font-medium text-[var(--ink-navy)]">{formatDate(shipment.estimatedArrival, language)}</span></div></div><div><div className="mb-2 flex items-center justify-between gap-3"><span className="font-mono text-[0.58rem] tracking-[0.12em] text-[var(--muted-foreground)]">{t.status}</span><span className="font-mono text-[0.62rem] text-[var(--copper-signal)]">{shipment.progress}%</span></div><div className="h-1.5 bg-[var(--mist-blue)]"><div className="h-full bg-[var(--copper-signal)] transition-[width] duration-500" style={{ width: `${Math.min(100, Math.max(0, shipment.progress))}%` }} /></div><div className="mt-2 flex justify-between gap-1">{shipmentSteps.map((step, index) => <span key={step} className={`h-1.5 w-1.5 rounded-full ${index <= stepIndex ? "bg-[var(--copper-signal)]" : "bg-[var(--steel-silver)]"}`} title={t.steps[step]} />)}</div></div><div className="flex flex-col justify-between gap-3 border-t border-[var(--line)] pt-3 text-[0.68rem] text-[var(--muted-foreground)] sm:flex-row sm:items-center"><span>{shipment.currentLocation || (language === "ar" ? "بانتظار أول تحديث للموقع" : "Awaiting first location update")}</span><span>{t.updated}: {formatDate(shipment.lastUpdated, language)}</span></div></div></article>;
}

export default function Dashboard() {
  const [language, setLanguage] = useState<Language>(() => { const requested = new URLSearchParams(window.location.search).get("lang"); if (requested === "en" || requested === "ar") return requested; const saved = localStorage.getItem("silver-pioneer-language"); return saved === "en" ? "en" : "ar"; });
  const [location, setLocation] = useLocation();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [submittedTrackingNumber, setSubmittedTrackingNumber] = useState("");
  const t = copy[language];
  const overview = trpc.dashboard.overview.useQuery(undefined, { retry: false });
  const tracking = trpc.dashboard.shipmentByTracking.useQuery({ trackingNumber: submittedTrackingNumber || "00" }, { enabled: Boolean(submittedTrackingNumber), retry: false });
  const dashboardData = overview.data as DashboardData | undefined;
  const shipments = dashboardData?.shipments ?? [];
  const orders = dashboardData?.orders ?? [];
  const activeShipments = shipments.filter((shipment) => !["delivered"].includes(shipment.status)).length;
  const deliveredShipments = shipments.filter((shipment) => shipment.status === "delivered").length;
  const nextArrival = shipments.find((shipment) => shipment.estimatedArrival && shipment.status !== "delivered")?.estimatedArrival;
  const view = location === "/dashboard/shipments" ? "shipments" : location === "/dashboard/orders" ? "orders" : "overview";

  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = language === "ar" ? "rtl" : "ltr"; document.title = language === "ar" ? "مركز العميل | الرائدة الفضية" : "Client Center | Silver Pioneer"; localStorage.setItem("silver-pioneer-language", language); }, [language]);
  useEffect(() => { if (!tracking.isFetching && submittedTrackingNumber && tracking.data) toast.success(t.searchFound); }, [tracking.data, tracking.isFetching, submittedTrackingNumber, t.searchFound]);

  const toggleLanguage = () => setLanguage((current) => current === "ar" ? "en" : "ar");
  const refresh = () => { void overview.refetch(); if (submittedTrackingNumber) void tracking.refetch(); };
  const submitTracking = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const normalized = trackingNumber.trim().toUpperCase(); if (!normalized) return; setSubmittedTrackingNumber(normalized); };
  const goTo = (path: string) => setLocation(path);

  return <DashboardLayout language={language} onToggleLanguage={toggleLanguage}><div className="mx-auto w-full max-w-[1440px]"><div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="section-kicker">{t.eyebrow}</p><h1 className="font-display mt-4 text-3xl font-bold tracking-[-0.07em] text-[var(--ink-navy)] sm:text-4xl">{t.title}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">{t.description}</p></div><div className="flex items-center gap-3"><button onClick={refresh} className="dashboard-ghost-button" disabled={overview.isFetching}><RefreshCw size={15} className={overview.isFetching ? "animate-spin" : ""} /> {t.refresh}</button><Link href="/" className="dashboard-ghost-button"><ArrowUpLeft size={15} /> {language === "ar" ? "العودة للموقع" : "Back to website"}</Link></div></div><form onSubmit={submitTracking} className="dashboard-search mb-8 flex flex-col gap-3 p-4 sm:flex-row sm:items-center"><div className="flex flex-1 items-center gap-3"><Search size={18} className="shrink-0 text-[var(--copper-signal)]" /><input value={trackingNumber} onChange={(event) => setTrackingNumber(event.target.value)} placeholder={t.searchPlaceholder} aria-label={t.searchPlaceholder} className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[var(--ink-navy)] outline-none placeholder:text-[var(--muted-foreground)]" dir="ltr" /></div><button type="submit" className="dashboard-primary-button"><Search size={16} /> {t.search}</button></form>{submittedTrackingNumber && tracking.data && <section className="mb-8"><div className="mb-4 flex items-center justify-between gap-4"><h2 className="font-display text-xl font-bold tracking-[-0.05em] text-[var(--ink-navy)]">{t.searchFound}</h2><button onClick={() => setSubmittedTrackingNumber("")} className="text-xs text-[var(--muted-foreground)] hover:text-[var(--copper-signal)]">{language === "ar" ? "إخفاء" : "Hide"}</button></div><ShipmentCard shipment={tracking.data} language={language} /></section>}{submittedTrackingNumber && !tracking.isFetching && !tracking.data && <div className="mb-8 border border-dashed border-[var(--copper-signal)] bg-[rgba(216,117,75,0.06)] p-5 text-sm text-[var(--ink-navy)]">{t.notFound}</div>}{view === "overview" && <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard icon={Package} label={t.shipments} value={shipments.length} detail={language === "ar" ? "إجمالي الشحنات" : "Total linked shipments"} /><MetricCard icon={CircleDot} label={t.active} value={activeShipments} detail={language === "ar" ? "تحتاج متابعة" : "Need follow-up"} /><MetricCard icon={CheckCircle2} label={t.delivered} value={deliveredShipments} detail={language === "ar" ? "مسارات مكتملة" : "Completed routes"} /><MetricCard icon={Clock3} label={t.nextArrival} value={nextArrival ? formatDate(nextArrival, language) : "—"} detail={language === "ar" ? "موعد الوصول المتوقع" : "Expected arrival"} /></div><div className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]"><section><div className="mb-4 flex items-center justify-between gap-4"><h2 className="font-display text-xl font-bold tracking-[-0.05em] text-[var(--ink-navy)]">{t.latestShipments}</h2>{shipments.length > 0 && <button onClick={() => goTo("/dashboard/shipments")} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--copper-signal)]">{t.viewAll} <ChevronLeft size={14} /></button>}</div>{shipments.length > 0 ? <div className="space-y-4">{shipments.slice(0, 3).map((shipment) => <ShipmentCard key={shipment.id} shipment={shipment} language={language} compact />)}</div> : <EmptyState icon={Boxes} title={t.noShipments} description={t.noShipmentsDescription} action={t.requestShipment} href="/#contact" />}</section><section><div className="mb-4 flex items-center justify-between gap-4"><h2 className="font-display text-xl font-bold tracking-[-0.05em] text-[var(--ink-navy)]">{t.recentOrders}</h2>{orders.length > 0 && <button onClick={() => goTo("/dashboard/orders")} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--copper-signal)]">{t.viewAll} <ChevronLeft size={14} /></button>}</div>{orders.length > 0 ? <div className="dashboard-card divide-y divide-[var(--line)]">{orders.slice(0, 4).map((order) => <OrderRow key={order.id} order={order} language={language} />)}</div> : <EmptyState icon={FileText} title={t.noOrders} description={t.noOrdersDescription} action={t.startOrder} href="/#contact" />}</section></div></>}{view === "shipments" && <section><div className="mb-4 flex items-center justify-between gap-4"><h2 className="font-display text-xl font-bold tracking-[-0.05em] text-[var(--ink-navy)]">{t.shipments}</h2><span className="font-mono text-xs text-[var(--muted-foreground)]">{shipments.length.toString().padStart(2, "0")}</span></div>{shipments.length > 0 ? <div className="space-y-4">{shipments.map((shipment) => <ShipmentCard key={shipment.id} shipment={shipment} language={language} />)}</div> : <EmptyState icon={Boxes} title={t.noShipments} description={t.noShipmentsDescription} action={t.requestShipment} href="/#contact" />}</section>}{view === "orders" && <section><div className="mb-4 flex items-center justify-between gap-4"><h2 className="font-display text-xl font-bold tracking-[-0.05em] text-[var(--ink-navy)]">{t.orders}</h2><span className="font-mono text-xs text-[var(--muted-foreground)]">{orders.length.toString().padStart(2, "0")}</span></div>{orders.length > 0 ? <div className="dashboard-card divide-y divide-[var(--line)]">{orders.map((order) => <OrderRow key={order.id} order={order} language={language} expanded />)}</div> : <EmptyState icon={FileText} title={t.noOrders} description={t.noOrdersDescription} action={t.startOrder} href="/#contact" />}</section>}</div></DashboardLayout>;
}

function OrderRow({ order, language, expanded = false }: { order: OrderRecord; language: Language; expanded?: boolean }) {
  const t = copy[language];
  const label = t.orderStatuses[order.status as keyof DashboardCopy["orderStatuses"]] ?? order.status;
  return <div className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${expanded ? "sm:p-6" : ""}`}><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--copper-signal)]"><FileText size={16} strokeWidth={1.6} /></span><div><p className="font-mono text-[0.63rem] tracking-[0.08em] text-[var(--muted-foreground)]">{order.orderNumber}</p><p className="mt-1 text-sm font-semibold text-[var(--ink-navy)]">{order.title}</p></div></div><div className="flex items-center justify-between gap-4 sm:justify-end"><span className="text-[0.68rem] font-semibold text-[var(--muted-foreground)]">{label}</span><span className="h-1.5 w-1.5 rounded-full bg-[var(--copper-signal)]" /></div></div>;
}

function EmptyState({ icon: Icon, title, description, action, href }: { icon: typeof Boxes; title: string; description: string; action: string; href: string }) {
  return <div className="dashboard-card paper-grid flex min-h-56 flex-col items-center justify-center p-8 text-center"><span className="flex h-12 w-12 items-center justify-center bg-[var(--ink-navy)] text-[var(--copper-signal)]"><Icon size={21} strokeWidth={1.5} /></span><h3 className="font-display mt-5 text-base font-bold text-[var(--ink-navy)]">{title}</h3><p className="mt-2 max-w-sm text-sm leading-7 text-[var(--muted-foreground)]">{description}</p><a href={href} className="dashboard-primary-button mt-5">{action} <ArrowUpLeft size={15} /></a></div>;
}
