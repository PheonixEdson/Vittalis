import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, FileText, TestTube, Droplet, AlertCircle, ChevronRight, Home, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const Paciente = () => {
  const navigate = useNavigate();
  const [consultaDate, setConsultaDate] = useState<Date>();
  const [exameDate, setExameDate] = useState<Date>();
  const [infusaoDate, setInfusaoDate] = useState<Date>();
  const [consultaHora, setConsultaHora] = useState("");
  const [exameHora, setExameHora] = useState("");
  const [infusaoHora, setInfusaoHora] = useState("");
  const [tipoExame, setTipoExame] = useState("");
  const [openConsulta, setOpenConsulta] = useState(false);
  const [openExame, setOpenExame] = useState(false);
  const [openInfusao, setOpenInfusao] = useState(false);

  const horarios = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  const tiposExame = [
    "Hemograma Completo",
    "Glicemia em Jejum",
    "Colesterol Total",
    "Função Renal (Creatinina e Ureia)",
    "Função Hepática (TGO/TGP)",
    "Marcadores Tumorais (CA 15-3, CEA)",
    "Tomografia Computadorizada",
    "Ressonância Magnética",
    "Raio-X de Tórax",
    "Ultrassonografia Abdominal"
  ];

  const handleAgendarConsulta = () => {
    if (consultaDate && consultaHora) {
      toast.success("Consulta agendada com sucesso!");
      setOpenConsulta(false);
    } else {
      toast.error("Por favor, selecione data e horário");
    }
  };

  const handleAgendarExame = () => {
    if (exameDate && exameHora && tipoExame) {
      toast.success(`${tipoExame} agendado com sucesso!`);
      setOpenExame(false);
    } else {
      toast.error("Por favor, preencha todos os campos");
    }
  };

  const handleAgendarInfusao = () => {
    if (infusaoDate && infusaoHora) {
      toast.success("Sessão de infusão agendada com sucesso!");
      setOpenInfusao(false);
    } else {
      toast.error("Por favor, selecione data e horário");
    }
  };

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
          <Dialog open={openConsulta} onOpenChange={setOpenConsulta}>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agendar Consulta</DialogTitle>
                <DialogDescription>Selecione a data e horário de sua preferência</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Data Preferida</Label>
                  <CalendarComponent
                    mode="single"
                    selected={consultaDate}
                    onSelect={setConsultaDate}
                    locale={ptBR}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consulta-hora">Horário Preferido</Label>
                  <Select value={consultaHora} onValueChange={setConsultaHora}>
                    <SelectTrigger id="consulta-hora">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horarios.map((hora) => (
                        <SelectItem key={hora} value={hora}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {hora}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpenConsulta(false)}>Cancelar</Button>
                <Button onClick={handleAgendarConsulta}>Confirmar Agendamento</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={openExame} onOpenChange={setOpenExame}>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agendar Exame</DialogTitle>
                <DialogDescription>Selecione o tipo de exame, data e horário</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo-exame">Tipo de Exame</Label>
                  <Select value={tipoExame} onValueChange={setTipoExame}>
                    <SelectTrigger id="tipo-exame">
                      <SelectValue placeholder="Selecione o tipo de exame" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposExame.map((exame) => (
                        <SelectItem key={exame} value={exame}>
                          {exame}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data Preferida</Label>
                  <CalendarComponent
                    mode="single"
                    selected={exameDate}
                    onSelect={setExameDate}
                    locale={ptBR}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exame-hora">Horário Preferido</Label>
                  <Select value={exameHora} onValueChange={setExameHora}>
                    <SelectTrigger id="exame-hora">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horarios.map((hora) => (
                        <SelectItem key={hora} value={hora}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {hora}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpenExame(false)}>Cancelar</Button>
                <Button onClick={handleAgendarExame}>Confirmar Agendamento</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={openInfusao} onOpenChange={setOpenInfusao}>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agendar Sessão de Infusão</DialogTitle>
                <DialogDescription>Selecione a data e horário de sua preferência</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Data Preferida</Label>
                  <CalendarComponent
                    mode="single"
                    selected={infusaoDate}
                    onSelect={setInfusaoDate}
                    locale={ptBR}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="infusao-hora">Horário Preferido</Label>
                  <Select value={infusaoHora} onValueChange={setInfusaoHora}>
                    <SelectTrigger id="infusao-hora">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horarios.map((hora) => (
                        <SelectItem key={hora} value={hora}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {hora}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpenInfusao(false)}>Cancelar</Button>
                <Button onClick={handleAgendarInfusao}>Confirmar Agendamento</Button>
              </div>
            </DialogContent>
          </Dialog>
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
                {[
                  { id: 1, medico: "Dra. Ana Carolina Mendes", crm: "CRM 45892-SP", data: "15/10/2025" },
                  { id: 2, medico: "Dr. Roberto Ferreira", crm: "CRM 23456-RJ", data: "08/10/2025" },
                  { id: 3, medico: "Dr. Paulo Henrique Costa", crm: "CRM 67891-MG", data: "02/10/2025" }
                ].map((prescricao) => (
                  <div key={prescricao.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Prescrição #{prescricao.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {prescricao.medico} - {prescricao.crm}
                      </p>
                      <p className="text-xs text-muted-foreground">{prescricao.data}</p>
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
                {[
                  { id: 1, tipo: "Marcadores Tumorais (CA 15-3)", data: "25/10/2025", hora: "08:30", status: "Agendado" },
                  { id: 2, tipo: "Tomografia Computadorizada", data: "12/10/2025", hora: "14:00", status: "Realizado" },
                  { id: 3, tipo: "Hemograma Completo", data: "05/10/2025", hora: "09:15", status: "Realizado" }
                ].map((exame) => (
                  <div key={exame.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{exame.tipo}</p>
                      <p className="text-sm text-muted-foreground">{exame.data} - {exame.hora}</p>
                      <Badge variant={exame.status === "Agendado" ? "default" : "secondary"}>
                        {exame.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {exame.status === "Realizado" && (
                        <Button variant="outline" size="sm">Ver Resultado</Button>
                      )}
                      {exame.status === "Agendado" && (
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
                {[
                  { id: 1, medico: "Dra. Mariana Alves", data: "28/10/2025", hora: "15:45", status: "Próxima" },
                  { id: 2, medico: "Dr. Fernando Santos", data: "14/10/2025", hora: "11:00", status: "Realizada" },
                  { id: 3, medico: "Dr. Lucas Rodrigues", data: "30/09/2025", hora: "16:30", status: "Realizada" }
                ].map((consulta) => (
                  <div key={consulta.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Consulta Oncológica</p>
                      <p className="text-sm text-muted-foreground">
                        {consulta.medico} - {consulta.data} às {consulta.hora}
                      </p>
                      <Badge variant={consulta.status === "Próxima" ? "default" : "secondary"}>
                        {consulta.status}
                      </Badge>
                    </div>
                    {consulta.status === "Próxima" && (
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
                {[
                  { id: 1, sessao: 4, total: 6, protocolo: "AC-T", data: "22/10/2025", hora: "13:30", status: "Confirmada" },
                  { id: 2, sessao: 3, total: 6, protocolo: "AC-T", data: "08/10/2025", hora: "14:00", status: "Concluída" },
                  { id: 3, sessao: 2, total: 6, protocolo: "AC-T", data: "24/09/2025", hora: "13:30", status: "Concluída" },
                  { id: 4, sessao: 1, total: 6, protocolo: "AC-T", data: "10/09/2025", hora: "14:00", status: "Concluída" }
                ].map((infusao) => (
                  <div key={infusao.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Sessão {infusao.sessao}/{infusao.total} - Protocolo {infusao.protocolo}</p>
                      <p className="text-sm text-muted-foreground">
                        {infusao.data} às {infusao.hora}
                      </p>
                      <Badge variant={infusao.status === "Confirmada" ? "default" : "secondary"}>
                        {infusao.status}
                      </Badge>
                    </div>
                    {infusao.status === "Confirmada" && (
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
