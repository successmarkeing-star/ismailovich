/** اتجاه «ممرّات الميناء»: التطبيق يقدّم صفحة عربية فاتحة تُبرز السطوح البحرية العميقة. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/insights" component={Insights} />
      <Route path="/contact" component={Contact} />
      <Route path="/en" component={Home} />
      <Route path="/en/about" component={About} />
      <Route path="/en/services" component={Services} />
      <Route path="/en/services/:slug" component={ServiceDetail} />
      <Route path="/en/insights" component={Insights} />
      <Route path="/en/contact" component={Contact} />
      <Route path="/zh" component={Home} />
      <Route path="/zh/about" component={About} />
      <Route path="/zh/services" component={Services} />
      <Route path="/zh/services/:slug" component={ServiceDetail} />
      <Route path="/zh/insights" component={Insights} />
      <Route path="/zh/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster position="top-center" richColors />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
