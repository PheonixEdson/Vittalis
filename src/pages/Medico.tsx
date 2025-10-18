import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Users, ClipboardCheck, Home } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

const Medico = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área Médica</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Início
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calendario" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendario">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="hoje">
              <Users className="h-4 w-4 mr-2" />
              Pacientes Hoje
            </TabsTrigger>
            <TabsTrigger value="liberacao">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Liberação Quimio
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
                  <CardTitle>Pacientes Agendados</CardTitle>
                  <CardDescription>
                    {date?.toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">Maria Santos Silva</p>
                            <Badge>09:00</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Diagnóstico: Carcinoma de Mama
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Matrícula SUS: 123.456.789-0
                          </p>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hoje" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Atendimentos de Hoje</CardTitle>
                <CardDescription>
                  Pacientes em ordem cronológica
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { nome: "Maria Santos", hora: "09:00", status: "Em atendimento" },
                  { nome: "João Oliveira", hora: "10:30", status: "Aguardando" },
                  { nome: "Ana Costa", hora: "14:00", status: "Aguardando" },
                  { nome: "Carlos Lima", hora: "15:30", status: "Aguardando" },
                ].map((paciente, i) => (
                  <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">{paciente.nome}</p>
                          <p className="text-sm text-muted-foreground">{paciente.hora}</p>
                        </div>
                        <Badge variant={i === 0 ? "default" : "secondary"}>
                          {paciente.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Ver Exames
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Prescrições
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="liberacao" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Liberação para Quimioterapia</CardTitle>
                <CardDescription>
                  Analise exames e reações para liberar infusões
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
                              Sessão {i}/6 - Protocolo AC-T
                            </p>
                          </div>
                          <Badge variant="outline">Pendente</Badge>
                        </div>
                        
                        <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">Últimos Exames:</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Hemoglobina:</span>
                              <span className="ml-2 font-medium">12.5 g/dL</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Leucócitos:</span>
                              <span className="ml-2 font-medium">7.200/mm³</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Plaquetas:</span>
                              <span className="ml-2 font-medium">180.000/mm³</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Creatinina:</span>
                              <span className="ml-2 font-medium">0.9 mg/dL</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">Reação Última Sessão:</p>
                          <p className="text-sm text-muted-foreground">
                            Náusea leve controlada com antiemético. Sem outras intercorrências.
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="default" className="flex-1 bg-success hover:bg-success/90">
                            Liberar para Infusão
                          </Button>
                          <Button variant="destructive" className="flex-1">
                            Não Liberar
                          </Button>
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

export default Medico;
