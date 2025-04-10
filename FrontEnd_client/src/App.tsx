import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Index from "./pages/Index";
import ReportConfirmation from "./pages/ReportConfirmation";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <div className="pt-16">
          {" "}
          {/* Add padding to account for fixed navbar */}
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/report" element={<Index />} />
            <Route path="/confirmation" element={<ReportConfirmation />} />
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/dashBoard" element={<DashBoard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
