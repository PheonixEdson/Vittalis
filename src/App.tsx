import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Paciente from "./pages/Paciente";
import Medico from "./pages/Medico";
import Enfermeiro from "./pages/Enfermeiro";
import Farmaceutico from "./pages/Farmaceutico";
import Administrador from "./pages/Administrador";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/paciente" element={<Paciente />} />
          <Route path="/medico" element={<Medico />} />
          <Route path="/enfermeiro" element={<Enfermeiro />} />
          <Route path="/farmaceutico" element={<Farmaceutico />} />
          <Route path="/administrador" element={<Administrador />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
