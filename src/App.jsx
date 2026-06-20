import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Experience from "@/pages/Experience";
import Services from "@/pages/Services";
import Links from "@/pages/Links";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/experience" component={Experience} />
        <Route path="/services" component={Services} />
        <Route path="/links" component={Links} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
