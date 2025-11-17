import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PedidoMedicamentoDialog } from "@/components/dialogs/PedidoMedicamentoDialog";

const Estoquista = () => {
  const navigate = useNavigate();
  
  // Estados para gestão de estoque
  const [pedidoDialogOpen, setPedidoDialogOpen] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState<{nome: string, atual: number, minimo: number} | null>(null);

  // Mock data para estoque baixo
  const medicamentosEstoqueBaixo = [
    { nome: "Paclitaxel 100mg", atual: 8, minimo: 10, custo: "R$ 450" },
    { nome: "Cisplatina 50mg", atual: 12, minimo: 15, custo: "R$ 120" },
    { nome: "Ondansetrona 8mg", atual: 25, minimo: 30, custo: "R$ 35" },
    { nome: "Doxorrubicina 50mg", atual: 5, minimo: 8, custo: "R$ 280" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área do Estoquista</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/cadastro-estoquista")}>
              Cadastro Estoquista
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gestão de Estoque</CardTitle>
              <CardDescription>
                Área para gerenciamento de produtos e medicamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Área em desenvolvimento</p>
                <p className="text-sm">Funcionalidades de estoque serão adicionadas em breve</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Diálogo de Pedido de Medicamento */}
      <PedidoMedicamentoDialog
        open={pedidoDialogOpen}
        onOpenChange={setPedidoDialogOpen}
        medicamento={medicamentoSelecionado}
      />
    </div>
  );
};

export default Estoquista;
