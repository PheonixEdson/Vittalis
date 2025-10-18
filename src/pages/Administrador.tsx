import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, BarChart3, DollarSign, TrendingUp, Users, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Administrador = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área Administrativa</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Início
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="faturamento" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faturamento">
              <FileText className="h-4 w-4 mr-2" />
              Faturamento APAC
            </TabsTrigger>
            <TabsTrigger value="dashboards">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboards
            </TabsTrigger>
            <TabsTrigger value="economico">
              <DollarSign className="h-4 w-4 mr-2" />
              Controle Econômico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faturamento" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Autorização de Procedimentos de Alta Complexidade (APAC)</CardTitle>
                <CardDescription>
                  Gestão de prazos e documentação para faturamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    paciente: "Maria Santos Silva",
                    procedimento: "Quimioterapia - Carcinoma de Mama",
                    etapa: "Confirmação do procedimento",
                    prazo: "25/10/2025",
                    status: "Pendente",
                  },
                  {
                    paciente: "João Oliveira Costa",
                    procedimento: "Quimioterapia - Linfoma",
                    etapa: "Documentação complementar",
                    prazo: "22/10/2025",
                    status: "Atenção",
                  },
                  {
                    paciente: "Ana Paula Lima",
                    procedimento: "Quimioterapia - Câncer de Pulmão",
                    etapa: "Aprovado",
                    prazo: "Concluído",
                    status: "Aprovado",
                  },
                ].map((item, i) => (
                  <Card key={i} className={`border-l-4 ${
                    item.status === "Aprovado" ? "border-l-success" :
                    item.status === "Atenção" ? "border-l-warning" : "border-l-primary"
                  }`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-semibold">{item.paciente}</p>
                          <p className="text-sm text-muted-foreground">{item.procedimento}</p>
                        </div>
                        <Badge variant={
                          item.status === "Aprovado" ? "default" :
                          item.status === "Atenção" ? "destructive" : "secondary"
                        }>
                          {item.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-1">Etapa atual:</p>
                          <p className="text-sm text-muted-foreground">{item.etapa}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Prazo:</span>
                          <span className="font-medium">{item.prazo}</span>
                        </div>

                        {item.status !== "Aprovado" && (
                          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-sm font-medium mb-2">Próximos passos:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Confirmar realização do procedimento</li>
                              <li>• Anexar laudo médico assinado</li>
                              <li>• Enviar comprovação de medicamentos</li>
                            </ul>
                          </div>
                        )}

                        <Button variant="outline" className="w-full">
                          {item.status === "Aprovado" ? "Ver Documentação" : "Atualizar Status"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-6">
            {/* Qualidade do Cuidado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Qualidade do Cuidado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Taxa de Mortalidade</p>
                    <p className="text-3xl font-bold text-foreground">2.1%</p>
                    <Badge variant="outline" className="mt-2">↓ 0.3% vs mês anterior</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Taxa de Infecção</p>
                    <p className="text-3xl font-bold text-foreground">1.8%</p>
                    <Badge variant="outline" className="mt-2">↓ 0.5% vs mês anterior</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Adesão a Protocolos</p>
                    <p className="text-3xl font-bold text-foreground">94%</p>
                    <Badge variant="outline" className="mt-2">↑ 2% vs mês anterior</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eficiência */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Eficiência Operacional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Ocupação de Leitos</p>
                    <p className="text-3xl font-bold text-foreground">87%</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Tempo de Espera</p>
                    <p className="text-3xl font-bold text-foreground">12min</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Produtividade</p>
                    <p className="text-3xl font-bold text-foreground">8.5</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Custo/Internação</p>
                    <p className="text-3xl font-bold text-foreground">R$ 2.8k</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Indicadores Financeiros */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-secondary" />
                  Indicadores Financeiros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Custo/Paciente</p>
                    <p className="text-3xl font-bold text-foreground">R$ 3.2k</p>
                    <Badge variant="outline" className="mt-2">Mês atual</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Índice de Glosa</p>
                    <p className="text-3xl font-bold text-foreground">4.5%</p>
                    <Badge variant="outline" className="mt-2">↓ 1.2% vs anterior</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Margem Operacional</p>
                    <p className="text-3xl font-bold text-foreground">12.8%</p>
                    <Badge variant="outline" className="mt-2">↑ 0.5% vs anterior</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Satisfação e RH */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Satisfação do Paciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">NPS (Net Promoter Score)</p>
                      <p className="text-3xl font-bold text-foreground">72</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Reclamações/1000 pacientes</p>
                      <p className="text-3xl font-bold text-foreground">3.2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recursos Humanos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Taxa de Absenteísmo</p>
                      <p className="text-3xl font-bold text-foreground">2.8%</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Satisfação Profissional</p>
                      <p className="text-3xl font-bold text-foreground">8.4/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="economico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Controle Econômico de Medicamentos</CardTitle>
                <CardDescription>
                  Gestão de gastos e pedidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Gasto Mensal</p>
                    <p className="text-3xl font-bold text-primary">R$ 187k</p>
                    <p className="text-xs text-muted-foreground mt-2">↑ 5% vs mês anterior</p>
                  </div>
                  <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Custo por Paciente</p>
                    <p className="text-3xl font-bold text-secondary">R$ 3.2k</p>
                    <p className="text-xs text-muted-foreground mt-2">Média mensal</p>
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
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { nome: "Paclitaxel 100mg", atual: 8, minimo: 10, custo: "R$ 450" },
                      { nome: "Cisplatina 50mg", atual: 12, minimo: 15, custo: "R$ 120" },
                      { nome: "Ondansetrona 8mg", atual: 25, minimo: 30, custo: "R$ 35" },
                    ].map((med, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{med.nome}</p>
                          <p className="text-xs text-muted-foreground">
                            Estoque: {med.atual} / Mínimo: {med.minimo}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{med.custo}</p>
                          <Button variant="outline" size="sm" className="mt-1">
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
                          Analise os últimos 3 meses para estimar necessidades futuras
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">⏰ Tempo de entrega dos fornecedores</p>
                        <p className="text-muted-foreground">
                          Média de 15-20 dias úteis. Antecipe pedidos para evitar rupturas
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">💰 Custo-benefício</p>
                        <p className="text-muted-foreground">
                          Compare preços entre fornecedores e considere descontos por volume
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">📅 Validade dos medicamentos</p>
                        <p className="text-muted-foreground">
                          Solicite produtos com validade mínima de 12 meses
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Administrador;
