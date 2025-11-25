import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Droplet, Activity, BarChart3, Home, QrCode, Clock, AlertCircle, CheckCircle2, Eye, Edit } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { DemoLockScreen } from "@/components/DemoLockScreen";

// Tipos
type Prescricao = {
  id: string;
  paciente: string;
  sus: string;
  medicamento: string;
  dose: string;
  via: string;
  protocolo: string;
  sessao: string;
  data: Date;
  horario: string;
  sala?: string;
  poltrona?: number;
  status: "Executada" | "Pendente" | "Em preparação" | "Em andamento";
  detalhamento: {
    principioAtivo: string;
    concentracao: string;
    volume: string;
    diluente: string;
    tempoInfusao: string;
    premedica: string[];
    observacoes: string;
    responsavelPreparo: string;
    responsavelAdministracao?: string;
    inicioAdministracao?: string;
    fimAdministracao?: string;
  };
};

type RastreabilidadeItem = {
  id: string;
  qrCode: string;
  tipo: "medicamento" | "infusao";
  nome: string;
  paciente: string;
  lote: string;
  status: "pendente" | "escaneado" | "administrado";
  dataDispensacao: Date;
  dataEscaneamento?: Date;
  responsavelEscaneamento?: string;
};

// Dados mockados
const prescricoesData: Prescricao[] = [
  {
    id: "P001",
    paciente: "Maria Santos",
    sus: "123.456.789-0",
    medicamento: "Paclitaxel",
    dose: "175mg",
    via: "IV",
    protocolo: "AC-T",
    sessao: "3/6",
    data: new Date(),
    horario: "14:00",
    sala: "A",
    poltrona: 1,
    status: "Executada",
    detalhamento: {
      principioAtivo: "Paclitaxel",
      concentracao: "6mg/mL",
      volume: "29,2mL (175mg)",
      diluente: "Soro Fisiológico 0,9% - 250mL",
      tempoInfusao: "3 horas",
      premedica: [
        "Dexametasona 20mg IV 30min antes",
        "Ranitidina 50mg IV 30min antes",
        "Difenidramina 50mg IV 30min antes"
      ],
      observacoes: "Monitorar sinais vitais a cada 15min na primeira hora. Paciente com histórico de reação alérgica leve na primeira sessão. Manter kit de anafilaxia disponível.",
      responsavelPreparo: "Farm. Ana Paula Costa",
      responsavelAdministracao: "Enf. Carlos Silva",
      inicioAdministracao: "14:05",
      fimAdministracao: "17:10"
    }
  },
  {
    id: "P002",
    paciente: "João Silva",
    sus: "987.654.321-0",
    medicamento: "Cisplatina",
    dose: "100mg",
    via: "IV",
    protocolo: "BEP",
    sessao: "2/4",
    data: new Date(),
    horario: "09:00",
    status: "Pendente",
    detalhamento: {
      principioAtivo: "Cisplatina",
      concentracao: "1mg/mL",
      volume: "100mL (100mg)",
      diluente: "Soro Fisiológico 0,9% - 1000mL",
      tempoInfusao: "6-8 horas",
      premedica: [
        "Ondansetrona 8mg IV 30min antes",
        "Dexametasona 8mg IV 30min antes",
        "Hidratação pré: SF 0,9% 1000mL em 2h"
      ],
      observacoes: "ATENÇÃO: Paciente nefropata crônico. Necessária hidratação vigorosa pré e pós-infusão. Solicitar dosagem de creatinina antes de iniciar. Monitorar diurese (manter > 100mL/h). Aguardando liberação laboratorial.",
      responsavelPreparo: "Farm. Roberto Alves"
    }
  },
  {
    id: "P003",
    paciente: "Ana Costa",
    sus: "456.789.123-0",
    medicamento: "Doxorrubicina",
    dose: "60mg",
    via: "IV",
    protocolo: "AC",
    sessao: "1/4",
    data: new Date(),
    horario: "11:00",
    sala: "A",
    poltrona: 2,
    status: "Em andamento",
    detalhamento: {
      principioAtivo: "Doxorrubicina HCl",
      concentracao: "2mg/mL",
      volume: "30mL (60mg)",
      diluente: "Soro Fisiológico 0,9% - 100mL",
      tempoInfusao: "15-30 minutos",
      premedica: [
        "Ondansetrona 8mg IV",
        "Dexametasona 10mg IV"
      ],
      observacoes: "VESICANTE - infundir em acesso venoso periférico calibroso ou cateter central. Verificar refluxo antes e durante infusão. Não extravasar! Primeira sessão - monitorar cuidadosamente. Paciente ansiosa, oferecer suporte emocional.",
      responsavelPreparo: "Farm. Ana Paula Costa",
      responsavelAdministracao: "Enf. Mariana Souza",
      inicioAdministracao: "11:15"
    }
  },
  {
    id: "P004",
    paciente: "Pedro Oliveira",
    sus: "321.654.987-0",
    medicamento: "Rituximab",
    dose: "700mg",
    via: "IV",
    protocolo: "R-CHOP",
    sessao: "4/6",
    data: new Date(new Date().setDate(new Date().getDate() + 1)),
    horario: "08:30",
    status: "Pendente",
    detalhamento: {
      principioAtivo: "Rituximab",
      concentracao: "10mg/mL",
      volume: "70mL (700mg)",
      diluente: "Soro Fisiológico 0,9% - 500mL",
      tempoInfusao: "4-6 horas (primeira infusão mais lenta)",
      premedica: [
        "Paracetamol 750mg VO 30min antes",
        "Difenidramina 50mg IV 30min antes",
        "Dexametasona 8mg IV"
      ],
      observacoes: "Iniciar infusão a 50mg/h na primeira hora. Se tolerado, aumentar 50mg/h a cada 30min até máximo de 400mg/h. Monitorar sinais vitais rigorosamente. Alto risco de reação infusional nas primeiras aplicações.",
      responsavelPreparo: "Farm. Roberto Alves"
    }
  },
  {
    id: "P005",
    paciente: "Carla Mendes",
    sus: "159.753.486-0",
    medicamento: "Pembrolizumab",
    dose: "200mg",
    via: "IV",
    protocolo: "Imunoterapia",
    sessao: "8/24",
    data: new Date(new Date().setDate(new Date().getDate() + 1)),
    horario: "13:00",
    status: "Pendente",
    detalhamento: {
      principioAtivo: "Pembrolizumab",
      concentracao: "25mg/mL",
      volume: "8mL (200mg)",
      diluente: "Soro Fisiológico 0,9% - 100mL",
      tempoInfusao: "30 minutos",
      premedica: ["Não requer pré-medicação padrão"],
      observacoes: "Imunoterapia - monitorar eventos adversos imunomediados. Paciente em uso contínuo, ciclo a cada 3 semanas. Boa tolerância prévia. Avaliar TSH, transaminases e glicemia antes de cada ciclo.",
      responsavelPreparo: "Farm. Ana Paula Costa"
    }
  },
  {
    id: "P006",
    paciente: "Roberto Fernandes",
    sus: "753.951.852-0",
    medicamento: "Trastuzumab",
    dose: "600mg",
    via: "IV/SC",
    protocolo: "HER2+",
    sessao: "12/18",
    data: new Date(new Date().setDate(new Date().getDate() + 2)),
    horario: "10:00",
    status: "Pendente",
    detalhamento: {
      principioAtivo: "Trastuzumab",
      concentracao: "120mg/mL",
      volume: "5mL (600mg)",
      diluente: "Administração subcutânea - não diluir",
      tempoInfusao: "2-5 minutos (SC)",
      premedica: ["Não requer"],
      observacoes: "Aplicação subcutânea em coxa. Paciente já em uso há 11 ciclos, sem reações adversas. Tempo de observação pós-aplicação: 30 minutos. Avaliar FEVE periodicamente.",
      responsavelPreparo: "Farm. Roberto Alves"
    }
  },
  {
    id: "P007",
    paciente: "Juliana Rocha",
    sus: "852.963.741-0",
    medicamento: "Carboplatina + Paclitaxel",
    dose: "AUC 5 + 175mg",
    via: "IV",
    protocolo: "Carcinoma Ovariano",
    sessao: "5/6",
    data: new Date(new Date().setDate(new Date().getDate() + 2)),
    horario: "08:00",
    status: "Pendente",
    detalhamento: {
      principioAtivo: "Carboplatina + Paclitaxel",
      concentracao: "10mg/mL + 6mg/mL",
      volume: "500mL + 250mL",
      diluente: "SG 5% para ambos",
      tempoInfusao: "1h (Carbo) + 3h (Paclitaxel)",
      premedica: [
        "Dexametasona 20mg IV",
        "Ondansetrona 8mg IV",
        "Difenidramina 50mg IV",
        "Ranitidina 50mg IV"
      ],
      observacoes: "Sequência: pré-medicação → Paclitaxel → Carboplatina. Dose de Carboplatina calculada pela fórmula de Calvert (AUC 5). Monitorar plaquetopenia.",
      responsavelPreparo: "Farm. Ana Paula Costa"
    }
  },
  {
    id: "P008",
    paciente: "Fernando Lima",
    sus: "147.258.369-0",
    medicamento: "Bevacizumab",
    dose: "500mg",
    via: "IV",
    protocolo: "FOLFOX + Bevacizumab",
    sessao: "9/12",
    data: new Date(new Date().setDate(new Date().getDate() + 3)),
    horario: "09:30",
    status: "Pendente",
    detalhamento: {
      principioAtivo: "Bevacizumab",
      concentracao: "25mg/mL",
      volume: "20mL (500mg)",
      diluente: "Soro Fisiológico 0,9% - 100mL",
      tempoInfusao: "90 min (primeira dose), 60 min (subsequentes se tolerado)",
      premedica: ["Não requer"],
      observacoes: "Antiangiogênico. Contraindicado em casos de sangramento ativo, feridas não cicatrizadas, ou cirurgia recente. Monitorar PA antes e após infusão. Atenção: risco de perfuração GI e eventos tromboembólicos.",
      responsavelPreparo: "Farm. Roberto Alves"
    }
  }
];

const rastreabilidadeData: RastreabilidadeItem[] = [
  {
    id: "R001",
    qrCode: "QR-MED-2025-001",
    tipo: "infusao",
    nome: "Paclitaxel 175mg",
    paciente: "Maria Santos",
    lote: "PTX2025A123",
    status: "administrado",
    dataDispensacao: new Date(new Date().setHours(13, 30)),
    dataEscaneamento: new Date(new Date().setHours(13, 55)),
    responsavelEscaneamento: "Enf. Carlos Silva"
  },
  {
    id: "R002",
    qrCode: "QR-MED-2025-002",
    tipo: "infusao",
    nome: "Doxorrubicina 60mg",
    paciente: "Ana Costa",
    lote: "DOX2025B456",
    status: "escaneado",
    dataDispensacao: new Date(new Date().setHours(10, 45)),
    dataEscaneamento: new Date(new Date().setHours(11, 10)),
    responsavelEscaneamento: "Enf. Mariana Souza"
  },
  {
    id: "R003",
    qrCode: "QR-MED-2025-003",
    tipo: "infusao",
    nome: "Cisplatina 100mg",
    paciente: "João Silva",
    lote: "CIS2025C789",
    status: "pendente",
    dataDispensacao: new Date(new Date().setHours(8, 15))
  }
];

const Enfermeiro = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPrescricao, setSelectedPrescricao] = useState<Prescricao | null>(null);
  const [showExecucaoDialog, setShowExecucaoDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showRastreioDialog, setShowRastreioDialog] = useState(false);
  const [selectedRastreio, setSelectedRastreio] = useState<RastreabilidadeItem | null>(null);
  const [showAgendamentoDialog, setShowAgendamentoDialog] = useState(false);
  const [agendamentoEdit, setAgendamentoEdit] = useState<Prescricao | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const unlocked = localStorage.getItem("vittalis_demo_unlocked") === "true";
    setIsLocked(!unlocked);
  }, []);

  // Filtrar prescrições por data selecionada
  const prescricoesDoDia = useMemo(() => {
    if (!date) return [];
    return prescricoesData.filter(p => 
      format(p.data, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  }, [date]);

  // Calcular métricas de analytics automaticamente
  const analytics = useMemo(() => {
    const hoje = prescricoesData.filter(p => 
      format(p.data, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    );
    
    const emAndamento = hoje.filter(p => p.status === "Em andamento").length;
    const executadas = hoje.filter(p => p.status === "Executada").length;
    const pendentes = hoje.filter(p => p.status === "Pendente").length;
    const total = hoje.length;
    
    // Calcular tempo médio (simulado baseado nos dados)
    const temposInfusao = hoje
      .filter(p => p.status === "Executada" && p.detalhamento.inicioAdministracao && p.detalhamento.fimAdministracao)
      .map(p => {
        const [ih, im] = p.detalhamento.inicioAdministracao!.split(':').map(Number);
        const [fh, fm] = p.detalhamento.fimAdministracao!.split(':').map(Number);
        return (fh * 60 + fm) - (ih * 60 + im);
      });
    
    const tempoMedio = temposInfusao.length > 0
      ? Math.round(temposInfusao.reduce((a, b) => a + b, 0) / temposInfusao.length)
      : 0;

    // Calcular ocupação de salas
    const salasOcupadas = hoje.filter(p => p.sala && p.status !== "Executada").length;
    const totalSalas = 3;
    const poltronasOcupadasA = hoje.filter(p => p.sala === "A" && p.status !== "Executada").length;
    
    return {
      totalHoje: total,
      executadas,
      emAndamento,
      pendentes,
      tempoMedio,
      taxaExecucao: total > 0 ? Math.round((executadas / total) * 100) : 0,
      salasOcupadas,
      totalSalas,
      taxaOcupacao: Math.round((salasOcupadas / totalSalas) * 100),
      poltronasOcupadasA
    };
  }, []);

  // Identificar dias com muitos pacientes
  const diasComMuitosPacientes = useMemo(() => {
    const diasMap = new Map<string, number>();
    prescricoesData.forEach(p => {
      const dia = format(p.data, 'yyyy-MM-dd');
      diasMap.set(dia, (diasMap.get(dia) || 0) + 1);
    });
    return Array.from(diasMap.entries())
      .filter(([_, count]) => count >= 4)
      .map(([dia]) => new Date(dia));
  }, []);

  const handleVerExecucao = (prescricao: Prescricao) => {
    setSelectedPrescricao(prescricao);
    setShowExecucaoDialog(true);
  };

  const handleAtualizarStatus = (prescricao: Prescricao) => {
    setSelectedPrescricao(prescricao);
    setShowStatusDialog(true);
  };

  const handleSalvarStatus = () => {
    toast({
      title: "Status atualizado",
      description: "O status da prescrição foi atualizado com sucesso.",
    });
    setShowStatusDialog(false);
  };

  const handleVerRastreio = (item: RastreabilidadeItem) => {
    setSelectedRastreio(item);
    setShowRastreioDialog(true);
  };

  const handleEscanearQR = () => {
    toast({
      title: "QR Code escaneado",
      description: "Medicamento registrado no sistema de rastreabilidade.",
    });
  };

  const handleEditarAgendamento = (prescricao: Prescricao) => {
    setAgendamentoEdit(prescricao);
    setShowAgendamentoDialog(true);
  };

  const handleSalvarAgendamento = () => {
    toast({
      title: "Agendamento atualizado",
      description: "Data e horário da infusão foram atualizados com sucesso.",
    });
    setShowAgendamentoDialog(false);
    setAgendamentoEdit(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área de Enfermagem</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/cadastro-enfermeiro")}>
              Cadastro Enfermeiro
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
          </div>
        </div>
      </header>

      {isLocked ? (
        <DemoLockScreen 
          title="Área de Enfermagem - Demonstração"
          description="A área de enfermagem não está disponível na versão de demonstração."
        />
      ) : (
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calendario" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
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
            <TabsTrigger value="rastreabilidade">
              <QrCode className="h-4 w-4 mr-2" />
              Rastreabilidade
            </TabsTrigger>
            <TabsTrigger value="agendamento">
              <Clock className="h-4 w-4 mr-2" />
              Agendamento
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Calendário */}
          <TabsContent value="calendario" className="space-y-4">
            <div className="grid md:grid-cols-[350px_1fr] gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selecione o Dia</CardTitle>
                  <CardDescription>
                    {diasComMuitosPacientes.length > 0 && (
                      <div className="flex items-center gap-2 text-warning mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs">Dias com alta demanda destacados</span>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      altaDemanda: diasComMuitosPacientes
                    }}
                    modifiersStyles={{
                      altaDemanda: {
                        backgroundColor: "hsl(var(--warning) / 0.2)",
                        fontWeight: "bold",
                        border: "2px solid hsl(var(--warning))"
                      }
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pacientes do Dia</CardTitle>
                  <CardDescription>
                    {prescricoesDoDia.length} infusões agendadas para {date?.toLocaleDateString('pt-BR', { dateStyle: 'full' })}
                    {prescricoesDoDia.length >= 4 && (
                      <div className="flex items-center gap-2 mt-2 p-2 bg-warning/10 border border-warning/20 rounded">
                        <AlertCircle className="h-4 w-4 text-warning" />
                        <span className="text-sm text-warning">Alta demanda - {prescricoesDoDia.length} pacientes agendados</span>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prescricoesDoDia.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhum paciente agendado para este dia</p>
                  ) : (
                    prescricoesDoDia.map((prescricao) => (
                      <Card key={prescricao.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold">{prescricao.paciente}</p>
                            <Badge>{prescricao.horario}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {prescricao.medicamento} {prescricao.dose} - {prescricao.protocolo}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            Sessão {prescricao.sessao}
                          </p>
                          <p className="text-xs text-muted-foreground">SUS: {prescricao.sus}</p>
                          <div className="flex gap-2 mt-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleVerExecucao(prescricao)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Ver Detalhes
                            </Button>
                            {prescricao.status !== "Executada" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditarAgendamento(prescricao)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Prescrições */}
          <TabsContent value="prescricoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Prescrições</CardTitle>
                <CardDescription>
                  Acompanhe a execução das prescrições de hoje - {analytics.totalHoje} prescrições
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {prescricoesData
                  .filter(p => format(p.data, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'))
                  .map((prescricao) => (
                    <Card 
                      key={prescricao.id} 
                      className={`border-l-4 ${
                        prescricao.status === "Executada" ? "border-l-success" :
                        prescricao.status === "Em andamento" ? "border-l-primary" :
                        prescricao.status === "Em preparação" ? "border-l-warning" :
                        "border-l-secondary"
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold">{prescricao.paciente}</p>
                              <Badge variant="outline" className="text-xs">{prescricao.horario}</Badge>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              {prescricao.medicamento} {prescricao.dose}
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              Protocolo: {prescricao.protocolo} - Sessão {prescricao.sessao}
                            </p>
                            
                            {/* Detalhamento da prescrição */}
                            <div className="mt-3 p-3 bg-muted/30 rounded-lg space-y-2 text-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <span className="font-medium">Via:</span> {prescricao.via}
                                </div>
                                <div>
                                  <span className="font-medium">Tempo:</span> {prescricao.detalhamento.tempoInfusao}
                                </div>
                                <div className="col-span-2">
                                  <span className="font-medium">Volume:</span> {prescricao.detalhamento.volume}
                                </div>
                                <div className="col-span-2">
                                  <span className="font-medium">Diluente:</span> {prescricao.detalhamento.diluente}
                                </div>
                              </div>
                              
                              {prescricao.detalhamento.premedica.length > 0 && (
                                <div>
                                  <span className="font-medium">Pré-medicação:</span>
                                  <ul className="ml-4 mt-1 space-y-1">
                                    {prescricao.detalhamento.premedica.map((med, idx) => (
                                      <li key={idx} className="text-xs">• {med}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              <div className="pt-2 border-t">
                                <span className="font-medium">Observações:</span>
                                <p className="text-xs mt-1 text-muted-foreground">
                                  {prescricao.detalhamento.observacoes}
                                </p>
                              </div>
                              
                              <div className="text-xs text-muted-foreground pt-2 border-t">
                                Prep.: {prescricao.detalhamento.responsavelPreparo}
                                {prescricao.detalhamento.responsavelAdministracao && (
                                  <> | Adm.: {prescricao.detalhamento.responsavelAdministracao}</>
                                )}
                              </div>
                            </div>
                          </div>
                          <Badge 
                            variant={
                              prescricao.status === "Executada" ? "default" : 
                              prescricao.status === "Em andamento" ? "default" :
                              prescricao.status === "Em preparação" ? "secondary" : 
                              "outline"
                            }
                            className="ml-4"
                          >
                            {prescricao.status === "Executada" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {prescricao.status}
                          </Badge>
                        </div>

                        {prescricao.status === "Pendente" && (
                          <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded text-sm">
                            <p className="font-medium mb-1 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-warning" />
                              Motivo pendência:
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {prescricao.detalhamento.observacoes.includes("Aguardando") 
                                ? "Aguardando liberação laboratorial/farmacêutica" 
                                : "Aguardando liberação"}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleVerExecucao(prescricao)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Execução Completa
                          </Button>
                          {prescricao.status !== "Executada" && (
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleAtualizarStatus(prescricao)}
                            >
                              Atualizar Status
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ocupação de Salas */}
          <TabsContent value="salas" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ocupação de Salas</CardTitle>
                  <CardDescription>
                    Visualização em tempo real - {analytics.salasOcupadas} de {analytics.totalSalas} salas ocupadas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Sala A", "Sala B", "Sala C"].map((sala, i) => {
                    const salaLetra = sala.split(" ")[1];
                    const pacientesSala = prescricoesData
                      .filter(p => 
                        p.sala === salaLetra && 
                        p.status !== "Executada" &&
                        format(p.data, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                      );
                    const isOcupada = pacientesSala.length > 0;
                    
                    return (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{sala}</span>
                          <Badge variant={isOcupada ? "default" : "outline"}>
                            {isOcupada ? `Ocupada (${pacientesSala.length})` : "Disponível"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map((poltrona) => {
                            const paciente = pacientesSala.find(p => p.poltrona === poltrona);
                            return (
                              <div
                                key={poltrona}
                                className={`flex-1 h-16 rounded border-2 flex flex-col items-center justify-center text-xs ${
                                  paciente
                                    ? "border-primary bg-primary/10 font-medium"
                                    : "border-muted bg-muted/30"
                                }`}
                                title={paciente ? `${paciente.paciente} - ${paciente.medicamento}` : `Poltrona ${poltrona}`}
                              >
                                <span className="text-lg">{poltrona}</span>
                                {paciente && (
                                  <span className="text-[10px] text-muted-foreground truncate max-w-full px-1">
                                    {paciente.paciente.split(' ')[0]}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status das Infusões</CardTitle>
                  <CardDescription>
                    Acompanhamento em andamento - {analytics.emAndamento} infusões ativas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prescricoesData
                    .filter(p => 
                      p.status === "Em andamento" && 
                      format(p.data, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    )
                    .map((prescricao) => {
                      // Simular progresso baseado no tempo de infusão
                      const tempoTotal = parseInt(prescricao.detalhamento.tempoInfusao);
                      const progresso = Math.floor(Math.random() * 40) + 30; // 30-70%
                      const tempoRestante = Math.round(tempoTotal * (100 - progresso) / 100);
                      
                      return (
                        <div key={prescricao.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{prescricao.paciente}</p>
                              <p className="text-xs text-muted-foreground">
                                Sala {prescricao.sala}-{prescricao.poltrona} | {prescricao.medicamento}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {tempoRestante}h restantes
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${progresso}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{progresso}% concluído</span>
                            <span>Início: {prescricao.detalhamento.inicioAdministracao}</span>
                          </div>
                        </div>
                      );
                    })}
                  {analytics.emAndamento === 0 && (
                    <p className="text-center text-muted-foreground py-8">Nenhuma infusão em andamento no momento</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rastreabilidade */}
          <TabsContent value="rastreabilidade" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rastreabilidade de Medicamentos e Infusões</CardTitle>
                <CardDescription>
                  Escaneie o código de barras para registrar medicamentos dispensados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <QrCode className="h-12 w-12 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium mb-1">Escanear QR Code</p>
                      <p className="text-sm text-muted-foreground">
                        Aproxime o código de barras do medicamento ou infusão para registrar no sistema
                      </p>
                    </div>
                    <Button onClick={handleEscanearQR}>
                      <QrCode className="h-4 w-4 mr-2" />
                      Escanear
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Medicamentos Dispensados Hoje</h3>
                  {rastreabilidadeData.map((item) => (
                    <Card 
                      key={item.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
                        item.status === "administrado" ? "border-l-success" :
                        item.status === "escaneado" ? "border-l-primary" :
                        "border-l-warning"
                      }`}
                      onClick={() => handleVerRastreio(item)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold">{item.nome}</p>
                              <Badge 
                                variant={
                                  item.status === "administrado" ? "default" :
                                  item.status === "escaneado" ? "secondary" :
                                  "outline"
                                }
                              >
                                {item.status === "administrado" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                {item.status === "escaneado" ? "Escaneado" : 
                                 item.status === "administrado" ? "Administrado" : "Pendente"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Paciente: {item.paciente}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">
                              Lote: {item.lote} | Tipo: {item.tipo === "infusao" ? "Infusão" : "Medicamento"}
                            </p>
                            
                            <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
                              <p>Dispensado: {format(item.dataDispensacao, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</p>
                              {item.dataEscaneamento && (
                                <p>Escaneado: {format(item.dataEscaneamento, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} por {item.responsavelEscaneamento}</p>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                              <QrCode className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <p className="text-[10px] text-center text-muted-foreground mt-1">
                              {item.qrCode}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agendamento */}
          <TabsContent value="agendamento" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Agendamentos</CardTitle>
                <CardDescription>
                  Gerencie data e horário das infusões aprovadas pelo médico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescricoesData.map((prescricao) => (
                    <Card key={prescricao.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold">{prescricao.paciente}</p>
                              <Badge variant="outline">{prescricao.protocolo}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {prescricao.medicamento} {prescricao.dose} - Sessão {prescricao.sessao}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>{format(prescricao.data, "dd/MM/yyyy", { locale: ptBR })}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{prescricao.horario}</span>
                              </div>
                            </div>
                            {prescricao.sala && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Sala {prescricao.sala} - Poltrona {prescricao.poltrona}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditarAgendamento(prescricao)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eficiência das Salas</CardTitle>
                  <CardDescription>Baseado em ocupação e tempo de uso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Sala A", "Sala B", "Sala C"].map((sala, i) => {
                      const salaLetra = sala.split(" ")[1];
                      const infusoesSala = prescricoesData.filter(p => 
                        p.sala === salaLetra && 
                        format(p.data, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                      ).length;
                      
                      const taxaEficiencia = salaLetra === "A" ? 85 : salaLetra === "B" ? 60 : 45;
                      
                      return (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{sala}</span>
                            <span className="text-muted-foreground">{infusoesSala} infusões hoje</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-success"
                              style={{ width: `${taxaEficiencia}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{taxaEficiencia}% eficiência</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Indicadores do Dia</CardTitle>
                  <CardDescription>Métricas atualizadas em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm">Tempo Médio de Infusão</span>
                      <span className="text-2xl font-bold text-primary">
                        {Math.floor(analytics.tempoMedio / 60)}h {analytics.tempoMedio % 60}min
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm">Taxa de Execução</span>
                      <span className="text-2xl font-bold text-success">{analytics.taxaExecucao}%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm">Infusões Pendentes</span>
                      <span className="text-2xl font-bold text-warning">{analytics.pendentes}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm">Taxa de Ocupação</span>
                      <span className="text-2xl font-bold text-primary">{analytics.taxaOcupacao}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Resumo de Atividades</CardTitle>
                  <CardDescription>Visão geral das operações do dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{analytics.totalHoje}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <p className="text-3xl font-bold text-success">{analytics.executadas}</p>
                      <p className="text-sm text-muted-foreground">Executadas</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{analytics.emAndamento}</p>
                      <p className="text-sm text-muted-foreground">Em Andamento</p>
                    </div>
                    <div className="text-center p-4 bg-warning/10 rounded-lg">
                      <p className="text-3xl font-bold text-warning">{analytics.pendentes}</p>
                      <p className="text-sm text-muted-foreground">Pendentes</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm mb-3">Recomendações do Sistema</h3>
                    {analytics.taxaOcupacao < 50 && (
                      <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                        <p className="text-sm">
                          Boa disponibilidade de salas. Taxa de ocupação atual: {analytics.taxaOcupacao}%. Possível aceitar agendamentos extras.
                        </p>
                      </div>
                    )}
                    {analytics.pendentes > 2 && (
                      <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                        <p className="text-sm">
                          {analytics.pendentes} infusões pendentes de liberação. Verificar status com farmácia e laboratório.
                        </p>
                      </div>
                    )}
                    {prescricoesData.filter(p => 
                      format(p.data, 'yyyy-MM-dd') === format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd')
                    ).length >= 4 && (
                      <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                        <p className="text-sm">
                          Previsão de alta demanda para amanhã. {prescricoesData.filter(p => 
                            format(p.data, 'yyyy-MM-dd') === format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd')
                          ).length} pacientes agendados. Recomendado revisar alocação de recursos.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      )}

      {/* Dialog Ver Execução */}
      <Dialog open={showExecucaoDialog} onOpenChange={setShowExecucaoDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Execução</DialogTitle>
            <DialogDescription>
              Informações completas da prescrição e execução
            </DialogDescription>
          </DialogHeader>
          {selectedPrescricao && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label className="text-xs text-muted-foreground">Paciente</Label>
                  <p className="font-semibold">{selectedPrescricao.paciente}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Cartão SUS</Label>
                  <p className="font-semibold">{selectedPrescricao.sus}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Data</Label>
                  <p>{format(selectedPrescricao.data, "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Horário</Label>
                  <p>{selectedPrescricao.horario}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Prescrição</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Medicamento</TableCell>
                      <TableCell>{selectedPrescricao.medicamento} {selectedPrescricao.dose}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Princípio Ativo</TableCell>
                      <TableCell>{selectedPrescricao.detalhamento.principioAtivo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Concentração</TableCell>
                      <TableCell>{selectedPrescricao.detalhamento.concentracao}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Volume Total</TableCell>
                      <TableCell>{selectedPrescricao.detalhamento.volume}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Diluente</TableCell>
                      <TableCell>{selectedPrescricao.detalhamento.diluente}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Via de Administração</TableCell>
                      <TableCell>{selectedPrescricao.via}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tempo de Infusão</TableCell>
                      <TableCell>{selectedPrescricao.detalhamento.tempoInfusao}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Protocolo</TableCell>
                      <TableCell>{selectedPrescricao.protocolo} - Sessão {selectedPrescricao.sessao}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Pré-medicação</h3>
                <ul className="space-y-1">
                  {selectedPrescricao.detalhamento.premedica.map((med, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {med}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  Observações Importantes
                </h3>
                <p className="text-sm">{selectedPrescricao.detalhamento.observacoes}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Responsáveis</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-xs text-muted-foreground">Preparo</Label>
                    <p>{selectedPrescricao.detalhamento.responsavelPreparo}</p>
                  </div>
                  {selectedPrescricao.detalhamento.responsavelAdministracao && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Administração</Label>
                      <p>{selectedPrescricao.detalhamento.responsavelAdministracao}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedPrescricao.status === "Executada" && (
                <div className="space-y-2 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    Execução Concluída
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">Início</Label>
                      <p>{selectedPrescricao.detalhamento.inicioAdministracao}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Término</Label>
                      <p>{selectedPrescricao.detalhamento.fimAdministracao}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog Atualizar Status */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Status da Prescrição</DialogTitle>
            <DialogDescription>
              {selectedPrescricao?.paciente} - {selectedPrescricao?.medicamento}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Novo Status</Label>
              <Select defaultValue={selectedPrescricao?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em preparação">Em preparação</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Executada">Executada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea 
                placeholder="Adicione observações sobre a mudança de status..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Horário de Início</Label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <Label>Horário de Término</Label>
                <Input type="time" />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSalvarStatus}>
                Salvar Status
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Rastreio */}
      <Dialog open={showRastreioDialog} onOpenChange={setShowRastreioDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Rastreamento</DialogTitle>
            <DialogDescription>
              Informações completas de rastreabilidade
            </DialogDescription>
          </DialogHeader>
          {selectedRastreio && (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-6 bg-muted rounded-lg">
                <div className="text-center">
                  <QrCode className="h-24 w-24 mx-auto mb-2 text-primary" />
                  <p className="font-mono text-sm">{selectedRastreio.qrCode}</p>
                </div>
              </div>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Tipo</TableCell>
                    <TableCell>{selectedRastreio.tipo === "infusao" ? "Infusão" : "Medicamento"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nome</TableCell>
                    <TableCell>{selectedRastreio.nome}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Paciente</TableCell>
                    <TableCell>{selectedRastreio.paciente}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lote</TableCell>
                    <TableCell>{selectedRastreio.lote}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Status</TableCell>
                    <TableCell>
                      <Badge variant={
                        selectedRastreio.status === "administrado" ? "default" :
                        selectedRastreio.status === "escaneado" ? "secondary" : "outline"
                      }>
                        {selectedRastreio.status === "administrado" ? "Administrado" :
                         selectedRastreio.status === "escaneado" ? "Escaneado" : "Pendente"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Histórico</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                    <div>
                      <p className="font-medium">Dispensado pela Farmácia</p>
                      <p className="text-xs text-muted-foreground">
                        {format(selectedRastreio.dataDispensacao, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>

                  {selectedRastreio.dataEscaneamento && (
                    <div className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <div>
                        <p className="font-medium">Escaneado por {selectedRastreio.responsavelEscaneamento}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(selectedRastreio.dataEscaneamento, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedRastreio.status === "administrado" && (
                    <div className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1" />
                      <div>
                        <p className="font-medium">Administrado ao Paciente</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog Agendamento */}
      <Dialog open={showAgendamentoDialog} onOpenChange={setShowAgendamentoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Agendamento</DialogTitle>
            <DialogDescription>
              {agendamentoEdit?.paciente} - {agendamentoEdit?.medicamento}
            </DialogDescription>
          </DialogHeader>
          {agendamentoEdit && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Input 
                  type="date" 
                  defaultValue={format(agendamentoEdit.data, "yyyy-MM-dd")}
                />
              </div>

              <div className="space-y-2">
                <Label>Horário</Label>
                <Input 
                  type="time" 
                  defaultValue={agendamentoEdit.horario}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sala</Label>
                  <Select defaultValue={agendamentoEdit.sala || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a sala" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Sala A</SelectItem>
                      <SelectItem value="B">Sala B</SelectItem>
                      <SelectItem value="C">Sala C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Poltrona</Label>
                  <Select defaultValue={agendamentoEdit.poltrona?.toString() || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Poltrona 1</SelectItem>
                      <SelectItem value="2">Poltrona 2</SelectItem>
                      <SelectItem value="3">Poltrona 3</SelectItem>
                      <SelectItem value="4">Poltrona 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea 
                  placeholder="Adicione observações sobre o reagendamento..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAgendamentoDialog(false);
                    setAgendamentoEdit(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSalvarAgendamento}>
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Enfermeiro;
