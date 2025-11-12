import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, FileText, TestTube, Droplet, AlertCircle, ChevronRight, Home, Clock, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadAPACDialog } from "@/components/dialogs/UploadAPACDialog";
import { CancelConfirmDialog } from "@/components/dialogs/CancelConfirmDialog";

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
  const [selectedPrescricao, setSelectedPrescricao] = useState<any>(null);
  const [selectedExame, setSelectedExame] = useState<any>(null);
  const [showPrescricaoDialog, setShowPrescricaoDialog] = useState(false);
  const [showExameDialog, setShowExameDialog] = useState(false);
  const [apacAlertDismissed, setApacAlertDismissed] = useState(false);
  const [showUploadAPACDialog, setShowUploadAPACDialog] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [itemToCancel, setItemToCancel] = useState<{ type: string; id: number } | null>(null);
  const [hiddenItems, setHiddenItems] = useState<{ [key: string]: number[] }>({
    exames: [],
    consultas: [],
    infusoes: [],
  });
  
  // Dados da notificação APAC - viria da área administrativa
  const apacNotificacao = {
    dataVencimento: "30/11/2025",
    diasRestantes: 19,
    urgente: true // Se faltam menos de 30 dias
  };

  const handleAtualizarAPAC = () => {
    setShowUploadAPACDialog(true);
  };

  const handleUploadSuccess = () => {
    // Após upload bem-sucedido, ocultar o alerta
    setApacAlertDismissed(true);
    toast.success("Documento enviado! Aguarde a validação do setor administrativo.");
  };

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

  const prescricoesData = [
    {
      id: 1,
      medico: "Dra. Ana Carolina Mendes",
      crm: "CRM 45892-SP",
      data: "15/10/2025",
      medicamentos: [
        {
          nome: "Paclitaxel",
          nomePopular: "Medicamento quimioterápico",
          dosagem: "175 mg/m²",
          frequencia: "A cada 21 dias",
          duracao: "6 ciclos",
          instrucoes: "Aplicado por infusão na clínica. Pode causar cansaço e sensibilidade nas mãos e pés.",
          cuidados: ["Beber bastante água", "Evitar exposição ao sol", "Comunicar qualquer febre ao médico imediatamente"]
        },
        {
          nome: "Ondansetrona",
          nomePopular: "Remédio para enjoo",
          dosagem: "8 mg",
          frequencia: "A cada 8 horas",
          duracao: "3 dias após cada infusão",
          instrucoes: "Tomar antes das refeições para prevenir náuseas e vômitos.",
          cuidados: ["Pode causar dor de cabeça leve", "Tomar com água"]
        },
        {
          nome: "Dexametasona",
          nomePopular: "Anti-inflamatório",
          dosagem: "4 mg",
          frequencia: "2 vezes ao dia",
          duracao: "2 dias após infusão",
          instrucoes: "Ajuda a reduzir inchaço e reações alérgicas ao tratamento.",
          cuidados: ["Tomar junto com alimentos", "Não parar de tomar abruptamente"]
        }
      ],
      observacoes: "Fazer exames de sangue antes de cada sessão. Qualquer febre acima de 38°C, procurar atendimento imediato."
    },
    {
      id: 2,
      medico: "Dr. Roberto Ferreira",
      crm: "CRM 23456-RJ",
      data: "08/10/2025",
      medicamentos: [
        {
          nome: "Trastuzumab",
          nomePopular: "Terapia alvo (HER2)",
          dosagem: "6 mg/kg",
          frequencia: "A cada 21 dias",
          duracao: "1 ano",
          instrucoes: "Medicamento específico para tumores HER2 positivo. Aplicado por infusão.",
          cuidados: ["Monitorar função cardíaca regularmente", "Avisar sobre qualquer falta de ar ou inchaço"]
        },
        {
          nome: "Omeprazol",
          nomePopular: "Protetor gástrico",
          dosagem: "20 mg",
          frequencia: "1 vez ao dia (em jejum)",
          duracao: "Durante todo o tratamento",
          instrucoes: "Protege o estômago dos outros medicamentos.",
          cuidados: ["Tomar 30 minutos antes do café da manhã"]
        }
      ],
      observacoes: "Realizar ecocardiograma a cada 3 meses para acompanhamento."
    },
    {
      id: 3,
      medico: "Dr. Paulo Henrique Costa",
      crm: "CRM 67891-MG",
      data: "02/10/2025",
      medicamentos: [
        {
          nome: "Tamoxifeno",
          nomePopular: "Hormonioterapia",
          dosagem: "20 mg",
          frequencia: "1 vez ao dia",
          duracao: "5 anos",
          instrucoes: "Bloqueia o hormônio que alimenta o tumor. Tomar todos os dias no mesmo horário.",
          cuidados: ["Pode causar ondas de calor", "Importante fazer acompanhamento ginecológico anual", "Não esquecer doses"]
        },
        {
          nome: "Carbonato de Cálcio + Vitamina D",
          nomePopular: "Suplemento para ossos",
          dosagem: "1 comprimido",
          frequencia: "1 vez ao dia",
          duracao: "Durante todo o tratamento",
          instrucoes: "Fortalece os ossos durante o tratamento hormonal.",
          cuidados: ["Tomar junto com alimentação"]
        }
      ],
      observacoes: "Manter alimentação saudável e praticar exercícios leves regularmente."
    }
  ];

  const examesData = [
    {
      id: 1,
      tipo: "Marcadores Tumorais (CA 15-3)",
      data: "25/10/2025",
      hora: "08:30",
      status: "Agendado"
    },
    {
      id: 2,
      tipo: "Tomografia Computadorizada",
      data: "12/10/2025",
      hora: "14:00",
      status: "Realizado",
      responsavel: "Dr. Carlos Eduardo Lima",
      registro: "CRM-SP 98765",
      resultado: {
        titulo: "Tomografia de Tórax e Abdômen",
        resumo: "O exame mostra que o tratamento está funcionando bem. As áreas anormais diminuíram de tamanho.",
        detalhes: [
          {
            area: "Pulmões",
            situacao: "Normal",
            descricao: "Pulmões com aspecto saudável, sem sinais de comprometimento."
          },
          {
            area: "Fígado",
            situacao: "Normal",
            descricao: "Fígado com tamanho e aparência normais. Sem alterações."
          },
          {
            area: "Linfonodos",
            situacao: "Melhorando",
            descricao: "Os gânglios linfáticos que estavam aumentados diminuíram em 40%. Isso é um sinal muito positivo."
          }
        ],
        conclusao: "Os resultados indicam boa resposta ao tratamento. Continue seguindo as orientações médicas.",
        proximoPasso: "Manter o tratamento conforme prescrito. Próximo exame em 3 meses."
      }
    },
    {
      id: 3,
      tipo: "Hemograma Completo",
      data: "05/10/2025",
      hora: "09:15",
      status: "Realizado",
      responsavel: "Dra. Patricia Oliveira",
      registro: "CRM-SP 54321",
      resultado: {
        titulo: "Exame de Sangue Completo",
        resumo: "Seus valores estão bons e dentro do esperado para quem está em tratamento.",
        detalhes: [
          {
            item: "Hemoglobina",
            valor: "12.3 g/dL",
            referencia: "12.0 - 16.0 g/dL",
            situacao: "Normal",
            explicacao: "É a proteína que leva oxigênio no sangue. Seu valor está bom, indicando que você não está anêmica."
          },
          {
            item: "Leucócitos (Glóbulos Brancos)",
            valor: "6.800/mm³",
            referencia: "4.000 - 11.000/mm³",
            situacao: "Normal",
            explicacao: "São as células de defesa do corpo. Seu valor está adequado, indicando boa capacidade de combater infecções."
          },
          {
            item: "Plaquetas",
            valor: "195.000/mm³",
            referencia: "150.000 - 400.000/mm³",
            situacao: "Normal",
            explicacao: "Ajudam na coagulação do sangue. Seu valor está normal, baixo risco de sangramentos."
          },
          {
            item: "Neutrófilos",
            valor: "3.900/mm³",
            referencia: "1.500 - 7.500/mm³",
            situacao: "Normal",
            explicacao: "Tipo especial de célula de defesa. Valor adequado para prosseguir com o tratamento."
          }
        ],
        conclusao: "Seus exames de sangue estão dentro dos valores esperados. Você está liberada para a próxima sessão de tratamento.",
        proximoPasso: "Repetir antes da próxima sessão de quimioterapia."
      }
    }
  ];

  const handleVerPrescricao = (prescricao: any) => {
    setSelectedPrescricao(prescricao);
    setShowPrescricaoDialog(true);
  };

  const handleVerResultado = (exame: any) => {
    setSelectedExame(exame);
    setShowExameDialog(true);
  };

  const handleCancelClick = (type: string, id: number) => {
    setItemToCancel({ type, id });
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (itemToCancel) {
      setHiddenItems((prev) => ({
        ...prev,
        [itemToCancel.type]: [...prev[itemToCancel.type], itemToCancel.id],
      }));
      toast.success("Item cancelado com sucesso");
    }
    setCancelDialogOpen(false);
    setItemToCancel(null);
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
        {/* Alerta APAC */}
        {!apacAlertDismissed && apacNotificacao.urgente && (
          <Alert variant="destructive" className="mb-6 border-2">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold mb-2">
              Atenção: Atualização de Documentação APAC Necessária
            </AlertTitle>
            <AlertDescription className="space-y-3">
              <div className="text-sm">
                <p className="mb-2">
                  Sua documentação APAC (Autorização de Procedimento de Alta Complexidade) vence em{" "}
                  <strong className="font-bold">{apacNotificacao.dataVencimento}</strong> (faltam {apacNotificacao.diasRestantes} dias).
                </p>
                <p className="mb-3 font-semibold">
                  ⚠️ IMPORTANTE: Sem a documentação atualizada, você não poderá realizar suas sessões de medicação/infusão.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={handleAtualizarAPAC}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Atualizar Documentação
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setApacAlertDismissed(true)}
                >
                  Dispensar
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

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
                {prescricoesData.map((prescricao) => (
                  <div key={prescricao.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="space-y-1">
                      <p className="font-medium">Prescrição #{prescricao.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {prescricao.medico} - {prescricao.crm}
                      </p>
                      <p className="text-xs text-muted-foreground">{prescricao.data}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleVerPrescricao(prescricao)}>
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
                {examesData
                  .filter((exame) => !hiddenItems.exames.includes(exame.id))
                  .map((exame) => (
                    <div key={exame.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="space-y-1">
                        <p className="font-medium">{exame.tipo}</p>
                        <p className="text-sm text-muted-foreground">{exame.data} - {exame.hora}</p>
                        <Badge variant={exame.status === "Agendado" ? "default" : "secondary"}>
                          {exame.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {exame.status === "Realizado" && (
                          <Button variant="outline" size="sm" onClick={() => handleVerResultado(exame)}>Ver Resultado</Button>
                        )}
                        {exame.status === "Agendado" && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleCancelClick("exames", exame.id)}
                          >
                            Cancelar
                          </Button>
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
                ]
                  .filter((consulta) => !hiddenItems.consultas.includes(consulta.id))
                  .map((consulta) => (
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
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelClick("consultas", consulta.id)}
                        >
                          Cancelar
                        </Button>
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
                ]
                  .filter((infusao) => !hiddenItems.infusoes.includes(infusao.id))
                  .map((infusao) => (
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
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelClick("infusoes", infusao.id)}
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog de Prescrição Detalhada */}
        <Dialog open={showPrescricaoDialog} onOpenChange={setShowPrescricaoDialog}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes da Prescrição #{selectedPrescricao?.id}</DialogTitle>
              <DialogDescription>
                Prescrição médica de {selectedPrescricao?.medico} ({selectedPrescricao?.crm}) - {selectedPrescricao?.data}
              </DialogDescription>
            </DialogHeader>
            
            {selectedPrescricao && (
              <div className="space-y-6 py-4">
                {selectedPrescricao.medicamentos.map((med: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start justify-between">
                        <div>
                          <div>{med.nome}</div>
                          <div className="text-sm font-normal text-muted-foreground mt-1">
                            {med.nomePopular}
                          </div>
                        </div>
                        <Badge variant="outline">{med.dosagem}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Como usar</p>
                          <p className="text-sm mt-1">{med.frequencia}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Por quanto tempo</p>
                          <p className="text-sm mt-1">{med.duracao}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Instruções</p>
                        <p className="text-sm bg-muted/50 p-3 rounded-md">{med.instrucoes}</p>
                      </div>
                      
                      {med.cuidados && med.cuidados.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Cuidados Importantes</p>
                          <ul className="space-y-1">
                            {med.cuidados.map((cuidado: string, idx: number) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{cuidado}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {selectedPrescricao.observacoes && (
                  <Card className="bg-warning/5 border-warning/20">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Observações Importantes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedPrescricao.observacoes}</p>
                    </CardContent>
                  </Card>
                )}
                
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setShowPrescricaoDialog(false)}>
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Resultado de Exame */}
        <Dialog open={showExameDialog} onOpenChange={setShowExameDialog}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedExame?.resultado?.titulo || "Resultado do Exame"}</DialogTitle>
              <DialogDescription>
                Realizado em {selectedExame?.data} às {selectedExame?.hora} • {selectedExame?.responsavel} ({selectedExame?.registro})
              </DialogDescription>
            </DialogHeader>
            
            {selectedExame?.resultado && (
              <div className="space-y-6 py-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base">Resumo do Resultado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedExame.resultado.resumo}</p>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Detalhes</h3>
                  {selectedExame.resultado.detalhes?.map((detalhe: any, index: number) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {detalhe.item || detalhe.area}
                          </CardTitle>
                          {detalhe.valor && (
                            <Badge variant="outline" className="font-mono">
                              {detalhe.valor}
                            </Badge>
                          )}
                          <Badge 
                            variant={detalhe.situacao === "Normal" ? "secondary" : detalhe.situacao === "Melhorando" ? "default" : "outline"}
                          >
                            {detalhe.situacao}
                          </Badge>
                        </div>
                        {detalhe.referencia && (
                          <p className="text-xs text-muted-foreground">
                            Valores de referência: {detalhe.referencia}
                          </p>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{detalhe.explicacao || detalhe.descricao}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="bg-secondary/5 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-base">Conclusão</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">{selectedExame.resultado.conclusao}</p>
                    {selectedExame.resultado.proximoPasso && (
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Próximos Passos</p>
                        <p className="text-sm">{selectedExame.resultado.proximoPasso}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setShowExameDialog(false)}>
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Upload APAC */}
        <UploadAPACDialog 
          open={showUploadAPACDialog}
          onOpenChange={setShowUploadAPACDialog}
          onUploadSuccess={handleUploadSuccess}
        />

        {/* Dialog de Confirmação de Cancelamento */}
        <CancelConfirmDialog
          open={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          onConfirm={handleConfirmCancel}
          title="Confirmar Cancelamento"
          description="Tem certeza que deseja cancelar este agendamento? Esta ação removerá o item da sua lista."
        />
      </div>
    </div>
  );
};

export default Paciente;
