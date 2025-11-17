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
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Custo Total Estoque</p>
              <p className="text-3xl font-bold text-primary">R$ 85k</p>
              <p className="text-xs text-muted-foreground mt-2">Valor atual</p>
            </div>
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Itens Abaixo do Mínimo</p>
              <p className="text-3xl font-bold text-destructive">{medicamentosEstoqueBaixo.length}</p>
              <p className="text-xs text-muted-foreground mt-2">Requer atenção</p>
            </div>
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Economia Prevista</p>
              <p className="text-3xl font-bold text-accent">R$ 12k</p>
              <p className="text-xs text-muted-foreground mt-2">Com otimizações</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medicamentos com Estoque Baixo</CardTitle>
              <CardDescription>
                Produtos que necessitam reposição
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {medicamentosEstoqueBaixo.map((med, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{med.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      Estoque: {med.atual} / Mínimo: {med.minimo}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{med.custo}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1"
                      onClick={() => {
                        setMedicamentoSelecionado(med);
                        setPedidoDialogOpen(true);
                      }}
                    >
                      Solicitar Pedido
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Parâmetros para Novos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-2">📊 Considere o consumo médio mensal</p>
                  <p className="text-muted-foreground">
                    Analise o histórico dos últimos 3-6 meses para determinar a quantidade ideal
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-2">⏰ Atenção ao prazo de validade</p>
                  <p className="text-muted-foreground">
                    Evite pedidos em excesso que podem resultar em medicamentos vencidos
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-2">💰 Otimize custos de armazenamento</p>
                  <p className="text-muted-foreground">
                    Considere o custo de manutenção do estoque versus economia em compras maiores
                  </p>
                </div>
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
