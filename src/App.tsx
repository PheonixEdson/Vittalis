import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Medico from "./pages/Medico";
import Enfermeiro from "./pages/Enfermeiro";
import Farmaceutico from "./pages/Farmaceutico";
import Administrador from "./pages/Administrador";
import Paciente from "./pages/Paciente";
import Estoquista from "./pages/Estoquista";
import CadastroMedico from "./pages/CadastroMedico";
import CadastroEnfermeiro from "./pages/CadastroEnfermeiro";
import CadastroFarmaceutico from "./pages/CadastroFarmaceutico";
import CadastroAdministrador from "./pages/CadastroAdministrador";
import CadastroPaciente from "./pages/CadastroPaciente";
import CadastroEstoquista from "./pages/CadastroEstoquista";
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
          <Route path="/estoquista" element={<Estoquista />} />
          <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
          <Route path="/cadastro-medico" element={<CadastroMedico />} />
          <Route path="/cadastro-enfermeiro" element={<CadastroEnfermeiro />} />
          <Route path="/cadastro-farmaceutico" element={<CadastroFarmaceutico />} />
          <Route path="/cadastro-administrador" element={<CadastroAdministrador />} />
          <Route path="/cadastro-estoquista" element={<CadastroEstoquista />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
