import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Droplet, Activity, BarChart3, Home } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

const Enfermeiro = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área de Enfermagem</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Início
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calendario" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendario">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="prescricoes">
              <Droplet className="h-4 w-4 mr-2" />
              Prescrições
            </TabsTrigger>
            <TabsTrigger value="salas">
              <Activity className="h-4 w-4 mr-2" />
              Ocupação
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendario" className="space-y-4">
            <div className="grid md:grid-cols-[350px_1fr] gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selecione o Dia</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pacientes do Dia</CardTitle>
                  <CardDescription>
                    Infusões agendadas para {date?.toLocaleDateString('pt-BR')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">Maria Santos</p>
                          <Badge>14:00</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Carcinoma de Mama - Sessão 3/6
                        </p>
                        <p className="text-xs text-muted-foreground">SUS: 123.456.789-0</p>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          Ver Detalhes
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prescricoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Prescrições</CardTitle>
                <CardDescription>
                  Acompanhe a execução das prescrições
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { paciente: "Maria Santos", medicamento: "Paclitaxel 175mg", status: "Executada" },
                  { paciente: "João Silva", medicamento: "Cisplatina 100mg", status: "Pendente" },
                  { paciente: "Ana Costa", medicamento: "Doxorrubicina 60mg", status: "Em preparação" },
                ].map((item, i) => (
                  <Card key={i} className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">{item.paciente}</p>
                          <p className="text-sm text-muted-foreground">{item.medicamento}</p>
                        </div>
                        <Badge variant={i === 0 ? "default" : i === 1 ? "secondary" : "outline"}>
                          {item.status}
                        </Badge>
                      </div>
                      {i === 1 && (
                        <div className="mt-3 p-3 bg-muted/50 rounded text-sm">
                          <p className="font-medium mb-1">Motivo pendência:</p>
                          <p className="text-muted-foreground">Aguardando liberação farmacêutica</p>
                        </div>
                      )}
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        {i === 0 ? "Ver Execução" : "Atualizar Status"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salas" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ocupação de Salas</CardTitle>
                  <CardDescription>Visualização em tempo real</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Sala A", "Sala B", "Sala C"].map((sala, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{sala}</span>
                        <Badge variant={i === 0 ? "default" : i === 1 ? "secondary" : "outline"}>
                          {i === 0 ? "Ocupada" : i === 1 ? "Limpeza" : "Disponível"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map((poltrona) => (
                          <div
                            key={poltrona}
                            className={`flex-1 h-16 rounded border-2 flex items-center justify-center text-sm ${
                              i === 0 && poltrona <= 3
                                ? "border-primary bg-primary/10"
                                : "border-muted bg-muted/30"
                            }`}
                          >
                            {poltrona}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status das Infusões</CardTitle>
                  <CardDescription>Acompanhamento em andamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { nome: "Maria Santos", sala: "A-1", tempo: "45 min restantes", progresso: 60 },
                    { nome: "João Silva", sala: "A-2", tempo: "1h 20min restantes", progresso: 30 },
                    { nome: "Ana Costa", sala: "A-3", tempo: "10 min restantes", progresso: 90 },
                  ].map((infusao, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{infusao.nome}</p>
                          <p className="text-xs text-muted-foreground">Sala {infusao.sala}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{infusao.tempo}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${infusao.progresso}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eficiência das Salas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { sala: "Sala A", taxa: 85, infusoes: 12 },
                      { sala: "Sala B", taxa: 78, infusoes: 10 },
                      { sala: "Sala C", taxa: 92, infusoes: 15 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.sala}</span>
                          <span className="text-muted-foreground">{item.infusoes} infusões hoje</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-success"
                            style={{ width: `${item.taxa}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{item.taxa}% eficiência</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Indicadores do Dia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm">Tempo Médio de Infusão</span>
                      <span className="text-2xl font-bold text-primary">2h 15min</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm">Taxa de Cancelamento</span>
                      <span className="text-2xl font-bold text-secondary">5%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm">Próximas Liberações</span>
                      <span className="text-2xl font-bold text-accent">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recomendações do Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-success mt-2" />
                      <p className="text-sm">
                        Sala C apresenta melhor eficiência. Considere alocar pacientes de maior complexidade.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2" />
                      <p className="text-sm">
                        Previsão de alta demanda para próxima semana. 8 novos agendamentos pendentes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Enfermeiro;
