import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { startLogin } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, LogOut, PanelLeft, Package, ClipboardList } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";
import { Button } from "./ui/button";

type Language = "ar" | "en";

const copy = {
  ar: { signIn: "سجّل الدخول للمتابعة", signInDescription: "تحتاج بوابة العميل إلى تسجيل دخول آمن للوصول إلى الشحنات والطلبات المرتبطة بحسابك.", signInButton: "تسجيل الدخول", navigation: "التنقل", dashboard: "ملخص الحساب", shipments: "الشحنات", orders: "الطلبات", menu: "القائمة", signOut: "تسجيل الخروج", language: "EN" },
  en: { signIn: "Sign in to continue", signInDescription: "The client portal requires a secure sign-in to access shipments and orders linked to your account.", signInButton: "Sign in", navigation: "Navigation", dashboard: "Account overview", shipments: "Shipments", orders: "Orders", menu: "Menu", signOut: "Sign out", language: "العربية" },
} as const;

export default function DashboardLayout({ children, language, onToggleLanguage }: { children: React.ReactNode; language: Language; onToggleLanguage: () => void }) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem("sidebar-width");
    return saved ? parseInt(saved, 10) : 280;
  });
  const { loading, user } = useAuth();
  const t = copy[language];

  useEffect(() => { localStorage.setItem("sidebar-width", sidebarWidth.toString()); }, [sidebarWidth]);

  if (loading) return <DashboardLayoutSkeleton />;

  if (!user) {
    return <div dir={language === "ar" ? "rtl" : "ltr"} className="flex min-h-screen items-center justify-center bg-[var(--paper-ivory)] px-5"><div className="paper-grid flex w-full max-w-md flex-col items-center gap-8 border border-[var(--line)] bg-[var(--card)] p-8 text-center shadow-[10px_10px_0_rgba(16,42,67,0.08)]"><div className="flex h-14 w-14 items-center justify-center bg-[var(--ink-navy)] text-[var(--copper-signal)]"><Package size={24} strokeWidth={1.5} /></div><div><p className="section-kicker">CLIENT PORTAL / 00</p><h1 className="font-display mt-4 text-2xl font-bold tracking-[-0.06em] text-[var(--ink-navy)]">{t.signIn}</h1><p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{t.signInDescription}</p></div><div className="flex w-full flex-col gap-3"><Button onClick={() => startLogin()} size="lg" className="w-full bg-[var(--ink-navy)] text-[var(--paper-ivory)] hover:bg-[#183a59]">{t.signInButton}</Button><button onClick={onToggleLanguage} className="text-xs font-semibold text-[var(--muted-foreground)] transition-colors hover:text-[var(--copper-signal)]">{t.language}</button></div></div></div>;
  }

  return <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-[var(--paper-ivory)]"><SidebarProvider style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}><DashboardLayoutContent language={language} onToggleLanguage={onToggleLanguage} setSidebarWidth={setSidebarWidth}>{children}</DashboardLayoutContent></SidebarProvider></div>;
}

function DashboardLayoutContent({ children, language, onToggleLanguage, setSidebarWidth }: { children: React.ReactNode; language: Language; onToggleLanguage: () => void; setSidebarWidth: (width: number) => void }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const t = copy[language];
  const menuItems = [{ icon: LayoutDashboard, label: t.dashboard, path: "/dashboard" }, { icon: Package, label: t.shipments, path: "/dashboard/shipments" }, { icon: ClipboardList, label: t.orders, path: "/dashboard/orders" }];
  const activeMenuItem = menuItems.find((item) => item.path === location) ?? menuItems[0];

  useEffect(() => { if (isCollapsed) setIsResizing(false); }, [isCollapsed]);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => { if (!isResizing) return; const left = sidebarRef.current?.getBoundingClientRect().left ?? 0; const width = event.clientX - left; if (width >= 200 && width <= 480) setSidebarWidth(width); };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) { document.addEventListener("mousemove", handleMouseMove); document.addEventListener("mouseup", handleMouseUp); document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none"; }
    return () => { document.removeEventListener("mousemove", handleMouseMove); document.removeEventListener("mouseup", handleMouseUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; };
  }, [isResizing, setSidebarWidth]);

  return <><div className="relative" ref={sidebarRef}><Sidebar collapsible="icon" className="border-r-0" disableTransition={isResizing}><SidebarHeader className="h-16 justify-center"><div className="flex w-full items-center gap-3 px-2"><button onClick={toggleSidebar} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={language === "ar" ? "تبديل القائمة" : "Toggle navigation"}><PanelLeft className="h-4 w-4 text-muted-foreground" /></button>{!isCollapsed && <div className="min-w-0"><span className="block truncate font-display text-sm font-bold tracking-tight text-[var(--ink-navy)]">{language === "ar" ? "الرائدة الفضية" : "Silver Pioneer"}</span><span className="font-mono text-[0.55rem] tracking-[0.12em] text-muted-foreground">CLIENT PORTAL</span></div>}</div></SidebarHeader><SidebarContent className="gap-0"><SidebarMenu className="px-2 py-1">{menuItems.map((item) => <SidebarMenuItem key={item.path}><SidebarMenuButton isActive={location === item.path} onClick={() => setLocation(item.path)} tooltip={item.label} className="h-11 font-normal"><item.icon className={`h-4 w-4 ${location === item.path ? "text-[var(--copper-signal)]" : ""}`} /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarContent><SidebarFooter className="p-3"><div className="mb-3 flex items-center justify-between gap-2 border-t border-border pt-3"><span className="font-mono text-[0.58rem] text-muted-foreground">{language === "ar" ? "اللغة" : "LANGUAGE"}</span><button onClick={onToggleLanguage} className="font-mono text-[0.62rem] font-semibold text-[var(--copper-signal)] transition-colors hover:text-[var(--ink-navy)]">{t.language}</button></div><DropdownMenu><DropdownMenuTrigger asChild><button className="group flex w-full items-center gap-3 rounded-lg px-1 py-1 text-left transition-colors hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Avatar className="h-9 w-9 shrink-0 border"><AvatarFallback className="text-xs font-medium">{user?.name?.charAt(0).toUpperCase() || "S"}</AvatarFallback></Avatar><div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden"><p className="truncate text-sm font-medium leading-none">{user?.name || "Silver Pioneer client"}</p><p className="mt-1.5 truncate text-xs text-muted-foreground">{user?.email || "-"}</p></div></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-48"><DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive"><LogOut className="mr-2 h-4 w-4" /><span>{t.signOut}</span></DropdownMenuItem></DropdownMenuContent></DropdownMenu></SidebarFooter></Sidebar><div className={`absolute right-0 top-0 h-full w-1 cursor-col-resize transition-colors hover:bg-primary/20 ${isCollapsed ? "hidden" : ""}`} onMouseDown={() => { if (!isCollapsed) setIsResizing(true); }} style={{ zIndex: 50 }} /></div><SidebarInset>{isMobile && <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 px-2 backdrop-blur"><div className="flex items-center gap-2"><SidebarTrigger className="h-9 w-9 rounded-lg bg-background" /><span className="font-display text-sm font-semibold text-foreground">{activeMenuItem?.label ?? t.menu}</span></div><button onClick={onToggleLanguage} className="font-mono text-xs font-semibold text-[var(--copper-signal)]">{t.language}</button></div>}<main className="min-h-screen flex-1 p-4 sm:p-6 lg:p-8">{children}</main></SidebarInset></>;
}
