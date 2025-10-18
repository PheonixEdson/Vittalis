import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, TestTube, Droplet, AlertCircle, ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Paciente = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área do Paciente</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Início
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Agendar Consulta</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Marque sua próxima consulta médica</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow border-secondary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-secondary" />
                <CardTitle className="text-base">Agendar Exame</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Solicite seus exames laboratoriais</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow border-accent/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-accent" />
                <CardTitle className="text-base">Agendar Infusão</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Marque sua sessão de quimioterapia</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Alert */}
        <Card className="mb-8 border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Lembretes Importantes</h3>
                <p className="text-sm text-muted-foreground">
                  Você tem uma infusão agendada para 20/10/2025 às 14:00. Confirme sua presença.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="prescricoes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prescricoes">
              <FileText className="h-4 w-4 mr-2" />
              Prescrições
            </TabsTrigger>
            <TabsTrigger value="exames">
              <TestTube className="h-4 w-4 mr-2" />
              Exames
            </TabsTrigger>
            <TabsTrigger value="consultas">
              <Calendar className="h-4 w-4 mr-2" />
              Consultas
            </TabsTrigger>
            <TabsTrigger value="infusoes">
              <Droplet className="h-4 w-4 mr-2" />
              Infusões
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prescricoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Prescrições</CardTitle>
                <CardDescription>
                  Visualize suas prescrições médicas de forma simplificada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Prescrição #{i}</p>
                      <p className="text-sm text-muted-foreground">
                        Dr. João Silva - CRM 12345
                      </p>
                      <p className="text-xs text-muted-foreground">18/10/2025</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exames" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Exames</CardTitle>
                <CardDescription>
                  Veja seus exames realizados e agendados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Hemograma Completo</p>
                      <p className="text-sm text-muted-foreground">22/10/2025 - 09:00</p>
                      <Badge variant={i === 1 ? "default" : "secondary"}>
                        {i === 1 ? "Agendado" : "Realizado"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {i !== 1 && (
                        <Button variant="outline" size="sm">Ver Resultado</Button>
                      )}
                      {i === 1 && (
                        <Button variant="destructive" size="sm">Cancelar</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Consultas</CardTitle>
                <CardDescription>
                  Gerencie suas consultas médicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Consulta Oncológica</p>
                      <p className="text-sm text-muted-foreground">
                        Dr. João Silva - 25/10/2025 às 10:30
                      </p>
                      <Badge variant={i === 1 ? "default" : "secondary"}>
                        {i === 1 ? "Próxima" : "Realizada"}
                      </Badge>
                    </div>
                    {i === 1 && (
                      <Button variant="destructive" size="sm">Cancelar</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infusoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sessões de Quimioterapia</CardTitle>
                <CardDescription>
                  Acompanhe suas sessões de infusão
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Sessão {i}/6 - Protocolo AC-T</p>
                      <p className="text-sm text-muted-foreground">
                        {i === 1 ? "20/10/2025 às 14:00" : `Realizada em 0${i}/10/2025`}
                      </p>
                      <Badge variant={i === 1 ? "default" : "secondary"}>
                        {i === 1 ? "Confirmada" : "Concluída"}
                      </Badge>
                    </div>
                    {i === 1 && (
                      <Button variant="destructive" size="sm">Cancelar</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Paciente;
