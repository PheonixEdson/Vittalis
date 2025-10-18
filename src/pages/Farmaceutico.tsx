import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pill, Package, TrendingUp, CheckCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Farmaceutico = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área Farmacêutica</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Início
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="catalogo" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="catalogo">
              <Pill className="h-4 w-4 mr-2" />
              Catalogação
            </TabsTrigger>
            <TabsTrigger value="rastreabilidade">
              <Package className="h-4 w-4 mr-2" />
              Rastreabilidade
            </TabsTrigger>
            <TabsTrigger value="infusoes">
              <CheckCircle className="h-4 w-4 mr-2" />
              Infusões Aprovadas
            </TabsTrigger>
            <TabsTrigger value="rastreio-infusoes">
              <TrendingUp className="h-4 w-4 mr-2" />
              Rastreio Infusões
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalogo" className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Input placeholder="Buscar medicamento..." className="max-w-md" />
              <Button>Adicionar Medicamento</Button>
            </div>

            <div className="space-y-6">
              {["Antineoplásicos", "Antieméticos", "Imunomoduladores"].map((categoria, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{categoria}</CardTitle>
                    <CardDescription>Medicamentos da classe terapêutica</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <Card key={i} className="border-l-4 border-l-primary">
                          <CardContent className="pt-6">
                            <div className="grid md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Medicamento</p>
                                <p className="font-semibold">Paclitaxel</p>
                                <p className="text-sm text-muted-foreground">100mg/16,7mL</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Lote / Validade</p>
                                <p className="font-medium">L2025001</p>
                                <p className="text-sm text-muted-foreground">12/2026</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Estoque</p>
                                <p className="font-medium">25 unidades</p>
                                <Badge variant="outline" className="mt-1">
                                  Mín: 10
                                </Badge>
                              </div>
                              <div className="flex items-end gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                  Editar
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Excluir
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rastreabilidade" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Movimentação de Medicamentos</CardTitle>
                <CardDescription>
                  Rastreamento completo de entrada e saída
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    tipo: "Saída",
                    medicamento: "Paclitaxel 100mg",
                    quantidade: 2,
                    responsavel: "Farm. João Silva - CRF 12345",
                    retirada: "Enf. Maria Santos - COREN 98765",
                    destino: "Paciente: Ana Costa",
                    data: "18/10/2025 14:30",
                    status: "Administrado",
                  },
                  {
                    tipo: "Entrada",
                    medicamento: "Cisplatina 50mg",
                    quantidade: 50,
                    responsavel: "Farm. Carlos Lima - CRF 54321",
                    fornecedor: "Distribuidora MedFarma",
                    data: "18/10/2025 09:00",
                    status: "Estocado",
                  },
                  {
                    tipo: "Saída",
                    medicamento: "Doxorrubicina 50mg",
                    quantidade: 1,
                    responsavel: "Farm. João Silva - CRF 12345",
                    retirada: "Enf. Pedro Alves - COREN 55555",
                    destino: "Paciente: Carlos Souza",
                    data: "18/10/2025 10:15",
                    status: "Em administração",
                  },
                ].map((mov, i) => (
                  <Card key={i} className={`border-l-4 ${mov.tipo === "Entrada" ? "border-l-success" : "border-l-primary"}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge variant={mov.tipo === "Entrada" ? "default" : "secondary"}>
                            {mov.tipo}
                          </Badge>
                          <p className="font-semibold mt-2">{mov.medicamento}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {mov.quantidade} {mov.quantidade === 1 ? "unidade" : "unidades"}
                          </p>
                        </div>
                        <Badge variant="outline">{mov.status}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Responsável estoque:</span>
                          <span className="font-medium">{mov.responsavel}</span>
                        </div>
                        {mov.retirada && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Retirado por:</span>
                            <span className="font-medium">{mov.retirada}</span>
                          </div>
                        )}
                        {mov.destino && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Destino:</span>
                            <span className="font-medium">{mov.destino}</span>
                          </div>
                        )}
                        {mov.fornecedor && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Fornecedor:</span>
                            <span className="font-medium">{mov.fornecedor}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <span className="text-muted-foreground">Data/Hora:</span>
                          <span className="font-medium">{mov.data}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infusoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Infusões Liberadas para Preparação</CardTitle>
                <CardDescription>
                  Prescrições aprovadas aguardando manipulação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border-primary/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">Maria Santos Silva</p>
                            <p className="text-sm text-muted-foreground">
                              Carcinoma de Mama - Sessão 3/6
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              SUS: 123.456.789-0
                            </p>
                          </div>
                          <Badge variant="outline">Liberada</Badge>
                        </div>

                        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                          <p className="text-sm font-medium mb-2">⚠️ Alergias:</p>
                          <p className="text-sm text-muted-foreground">
                            Dipirona, Penicilina
                          </p>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-3">Prescrição:</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>• Paclitaxel</span>
                              <span className="font-medium">175 mg/m²</span>
                            </div>
                            <div className="flex justify-between">
                              <span>• Dexametasona</span>
                              <span className="font-medium">20 mg</span>
                            </div>
                            <div className="flex justify-between">
                              <span>• Ondansetrona</span>
                              <span className="font-medium">8 mg</span>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full">Iniciar Preparação</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rastreio-infusoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rastreabilidade das Infusões</CardTitle>
                <CardDescription>
                  Acompanhe o caminho completo até o paciente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="border-l-4 border-l-success">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">Paciente: Maria Santos Silva</p>
                          <Badge>Completo</Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-4 w-4 text-success" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Manipulação</p>
                              <p className="text-xs text-muted-foreground">
                                Farm. João Silva - CRF 12345
                              </p>
                              <p className="text-xs text-muted-foreground">18/10/2025 - 13:00</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-4 w-4 text-success" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Liberação</p>
                              <p className="text-xs text-muted-foreground">
                                Farm. Carlos Lima - CRF 54321
                              </p>
                              <p className="text-xs text-muted-foreground">18/10/2025 - 13:30</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-4 w-4 text-success" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Retirada</p>
                              <p className="text-xs text-muted-foreground">
                                Enf. Ana Oliveira - COREN 98765
                              </p>
                              <p className="text-xs text-muted-foreground">18/10/2025 - 13:45</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-4 w-4 text-success" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Aplicação</p>
                              <p className="text-xs text-muted-foreground">
                                Enf. Pedro Alves - COREN 55555
                              </p>
                              <p className="text-xs text-muted-foreground">18/10/2025 - 14:00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Farmaceutico;
