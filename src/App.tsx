
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import IronGates from "./pages/IronGates";
import WindowGrills from "./pages/WindowGrills";
import RoofingSheds from "./pages/RoofingSheds";
import RollingShutters from "./pages/RollingShutters";
import IronGateDesigns from "./pages/blog/IronGateDesigns";
import ShedCostGuide from "./pages/blog/ShedCostGuide";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:service" element={<Gallery />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            {/* SEO Service Pages */}
            <Route path="/services/iron-gates" element={<IronGates />} />
            <Route path="/services/window-grills" element={<WindowGrills />} />
            <Route path="/services/roofing-sheds" element={<RoofingSheds />} />
            <Route path="/services/rolling-shutters" element={<RollingShutters />} />
            {/* Blog */}
            <Route path="/blog/iron-gate-design-ideas-valsad-vapi" element={<IronGateDesigns />} />
            <Route path="/blog/roofing-shed-cost-gujarat-2025" element={<ShedCostGuide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
