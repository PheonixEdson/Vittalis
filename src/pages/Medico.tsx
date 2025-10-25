import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Users, ClipboardCheck, Home, AlertCircle, FileText } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, isSameDay } from "date-fns";

// Mock data de pacientes distribuídos em vários dias
const pacientesData = [
  // Hoje
  { id: 1, nome: "Maria Santos Silva", hora: "09:00", status: "Em atendimento", data: new Date(), diagnostico: "Carcinoma de Mama HER2+", matricula: "123.456.789-0", protocolo: "AC-T" },
  { id: 2, nome: "João Oliveira Costa", hora: "10:30", status: "Aguardando", data: new Date(), diagnostico: "Linfoma Não-Hodgkin", matricula: "234.567.890-1", protocolo: "R-CHOP" },
  { id: 3, nome: "Ana Costa Ferreira", hora: "14:00", status: "Aguardando", data: new Date(), diagnostico: "Câncer de Pulmão NSCLC", matricula: "345.678.901-2", protocolo: "Pembrolizumab" },
  { id: 4, nome: "Carlos Lima Santos", hora: "15:30", status: "Aguardando", data: new Date(), diagnostico: "Câncer Colorretal", matricula: "456.789.012-3", protocolo: "FOLFOX" },
  { id: 5, nome: "Patricia Alves Rocha", hora: "16:00", status: "Aguardando", data: new Date(), diagnostico: "Câncer de Ovário", matricula: "567.890.123-4", protocolo: "Carboplatina + Paclitaxel" },
  
  // Amanhã
  { id: 6, nome: "Roberto Mendes Silva", hora: "08:30", status: "Agendado", data: new Date(Date.now() + 86400000), diagnostico: "Câncer de Próstata", matricula: "678.901.234-5", protocolo: "Docetaxel" },
  { id: 7, nome: "Juliana Ribeiro Lima", hora: "09:30", status: "Agendado", data: new Date(Date.now() + 86400000), diagnostico: "Carcinoma de Mama Triplo Negativo", matricula: "789.012.345-6", protocolo: "AC" },
  { id: 8, nome: "Fernando Costa Nunes", hora: "11:00", status: "Agendado", data: new Date(Date.now() + 86400000), diagnostico: "Melanoma Metastático", matricula: "890.123.456-7", protocolo: "Nivolumab" },
  
  // Daqui a 2 dias
  { id: 9, nome: "Camila Souza Santos", hora: "09:00", status: "Agendado", data: new Date(Date.now() + 172800000), diagnostico: "Câncer de Mama HER2+", matricula: "901.234.567-8", protocolo: "TCH" },
  { id: 10, nome: "Eduardo Martins Rocha", hora: "10:00", status: "Agendado", data: new Date(Date.now() + 172800000), diagnostico: "Linfoma de Hodgkin", matricula: "012.345.678-9", protocolo: "ABVD" },
  { id: 11, nome: "Beatriz Cardoso Alves", hora: "13:00", status: "Agendado", data: new Date(Date.now() + 172800000), diagnostico: "Câncer Gástrico", matricula: "123.456.780-1", protocolo: "FLOT" },
  { id: 12, nome: "André Silva Pereira", hora: "14:30", status: "Agendado", data: new Date(Date.now() + 172800000), diagnostico: "Câncer de Esôfago", matricula: "234.567.891-2", protocolo: "FOLFOX" },
  
  // Daqui a 3 dias
  { id: 13, nome: "Mariana Costa Lima", hora: "08:00", status: "Agendado", data: new Date(Date.now() + 259200000), diagnostico: "Câncer de Pâncreas", matricula: "345.678.902-3", protocolo: "Gemcitabina + Abraxane" },
  { id: 14, nome: "Ricardo Alves Santos", hora: "09:30", status: "Agendado", data: new Date(Date.now() + 259200000), diagnostico: "Mieloma Múltiplo", matricula: "456.789.013-4", protocolo: "VRd" },
  
  // Daqui a 5 dias
  { id: 15, nome: "Luciana Ferreira Costa", hora: "10:00", status: "Agendado", data: new Date(Date.now() + 432000000), diagnostico: "Câncer de Bexiga", matricula: "567.890.124-5", protocolo: "GemCis" },
  { id: 16, nome: "Gabriel Oliveira Nunes", hora: "11:00", status: "Agendado", data: new Date(Date.now() + 432000000), diagnostico: "Sarcoma de Partes Moles", matricula: "678.901.235-6", protocolo: "Doxorrubicina" },
  { id: 17, nome: "Rafaela Santos Rocha", hora: "14:00", status: "Agendado", data: new Date(Date.now() + 432000000), diagnostico: "Câncer de Mama Luminal A", matricula: "789.012.346-7", protocolo: "TAC" },
  { id: 18, nome: "Felipe Martins Lima", hora: "15:30", status: "Agendado", data: new Date(Date.now() + 432000000), diagnostico: "Câncer Renal", matricula: "890.123.457-8", protocolo: "Sunitinib" },
  { id: 19, nome: "Vanessa Costa Silva", hora: "16:30", status: "Agendado", data: new Date(Date.now() + 432000000), diagnostico: "Câncer de Tireóide", matricula: "901.234.568-9", protocolo: "Sorafenib" },
  { id: 20, nome: "Diego Alves Pereira", hora: "17:00", status: "Agendado", data: new Date(Date.now() + 432000000), diagnostico: "Leucemia Mielóide Aguda", matricula: "012.345.679-0", protocolo: "7+3" },
];

// Mock data de exames
const examesData: Record<number, any[]> = {
  1: [
    { tipo: "Hemograma Completo", data: "20/10/2025", hemoglobina: "12.5 g/dL", leucocitos: "7.200/mm³", plaquetas: "180.000/mm³", status: "Normal" },
    { tipo: "Bioquímica", data: "20/10/2025", creatinina: "0.9 mg/dL", ureia: "32 mg/dL", tgo: "28 U/L", tgp: "25 U/L", status: "Normal" },
    { tipo: "Marcadores Tumorais", data: "18/10/2025", ca153: "25 U/mL", cea: "2.8 ng/mL", status: "Dentro dos limites" },
  ],
  2: [
    { tipo: "Hemograma Completo", data: "21/10/2025", hemoglobina: "13.2 g/dL", leucocitos: "6.800/mm³", plaquetas: "195.000/mm³", status: "Normal" },
    { tipo: "Bioquímica", data: "21/10/2025", creatinina: "1.0 mg/dL", ureia: "35 mg/dL", tgo: "30 U/L", tgp: "28 U/L", status: "Normal" },
    { tipo: "LDH", data: "21/10/2025", ldh: "245 U/L", status: "Normal" },
  ],
  3: [
    { tipo: "Hemograma Completo", data: "22/10/2025", hemoglobina: "11.8 g/dL", leucocitos: "6.500/mm³", plaquetas: "175.000/mm³", status: "Leve anemia" },
    { tipo: "Bioquímica", data: "22/10/2025", creatinina: "0.8 mg/dL", ureia: "30 mg/dL", tgo: "26 U/L", tgp: "24 U/L", status: "Normal" },
    { tipo: "Função Pulmonar", data: "20/10/2025", cvf: "85%", vef1: "80%", status: "Adequado" },
  ],
  4: [
    { tipo: "Hemograma Completo", data: "23/10/2025", hemoglobina: "12.0 g/dL", leucocitos: "7.000/mm³", plaquetas: "190.000/mm³", status: "Normal" },
    { tipo: "Bioquímica", data: "23/10/2025", creatinina: "0.9 mg/dL", ureia: "33 mg/dL", tgo: "29 U/L", tgp: "27 U/L", status: "Normal" },
    { tipo: "CEA", data: "22/10/2025", cea: "4.2 ng/mL", status: "Discretamente elevado" },
  ],
  5: [
    { tipo: "Hemograma Completo", data: "23/10/2025", hemoglobina: "11.5 g/dL", leucocitos: "6.200/mm³", plaquetas: "165.000/mm³", status: "Leve anemia" },
    { tipo: "Bioquímica", data: "23/10/2025", creatinina: "0.8 mg/dL", ureia: "28 mg/dL", tgo: "27 U/L", tgp: "23 U/L", status: "Normal" },
    { tipo: "CA-125", data: "22/10/2025", ca125: "45 U/mL", status: "Elevado" },
  ],
};

// Mock data de prescrições
const prescricoesData: Record<number, any[]> = {
  1: [
    { medicamento: "Doxorrubicina", dose: "60 mg/m²", via: "IV", frequencia: "Ciclo 21/21 dias", observacao: "Pré-medicação com antieméticos" },
    { medicamento: "Ciclofosfamida", dose: "600 mg/m²", via: "IV", frequencia: "Ciclo 21/21 dias", observacao: "Hiperdiurese recomendada" },
    { medicamento: "Ondansetrona", dose: "8 mg", via: "IV", frequencia: "Antes da quimioterapia", observacao: "Antiemético profilático" },
  ],
  2: [
    { medicamento: "Rituximab", dose: "375 mg/m²", via: "IV", frequencia: "Dia 1", observacao: "Infusão lenta, monitorar reações" },
    { medicamento: "Ciclofosfamida", dose: "750 mg/m²", via: "IV", frequencia: "Dia 1", observacao: "Hiperdiurese" },
    { medicamento: "Doxorrubicina", dose: "50 mg/m²", via: "IV", frequencia: "Dia 1", observacao: "Verificar fração de ejeção" },
    { medicamento: "Vincristina", dose: "1.4 mg/m² (máx 2mg)", via: "IV", frequencia: "Dia 1", observacao: "Não diluir em soro fisiológico" },
    { medicamento: "Prednisona", dose: "100 mg", via: "VO", frequencia: "Dias 1-5", observacao: "Administrar pela manhã" },
  ],
  3: [
    { medicamento: "Pembrolizumab", dose: "200 mg", via: "IV", frequencia: "Ciclo 21/21 dias", observacao: "Imunoterapia, monitorar eventos adversos imunes" },
    { medicamento: "Dexametasona", dose: "4 mg", via: "VO", frequencia: "12/12h se necessário", observacao: "Para reações adversas" },
  ],
  4: [
    { medicamento: "Oxaliplatina", dose: "85 mg/m²", via: "IV", frequencia: "Dia 1", observacao: "Infusão em 2-6 horas, evitar frio" },
    { medicamento: "Leucovorin", dose: "400 mg/m²", via: "IV", frequencia: "Dia 1", observacao: "Antes do 5-FU" },
    { medicamento: "5-Fluorouracil", dose: "400 mg/m² bolus + 2400 mg/m²", via: "IV", frequencia: "Infusão contínua 46h", observacao: "Bomba de infusão" },
  ],
  5: [
    { medicamento: "Carboplatina", dose: "AUC 5", via: "IV", frequencia: "Dia 1", observacao: "Calcular por fórmula de Calvert" },
    { medicamento: "Paclitaxel", dose: "175 mg/m²", via: "IV", frequencia: "Dia 1", observacao: "Pré-medicação obrigatória (corticóide, anti-histamínico)" },
  ],
};

const Medico = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showExamesDialog, setShowExamesDialog] = useState(false);
  const [showPrescricoesDialog, setShowPrescricoesDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);

  // Filtrar pacientes por data selecionada
  const pacientesDoDia = useMemo(() => {
    if (!date) return [];
    return pacientesData.filter(p => isSameDay(p.data, date));
  }, [date]);

  // Identificar dias com alta demanda (4+ pacientes)
  const diasComAltaDemanda = useMemo(() => {
    const contagemPorDia = new Map<string, number>();
    pacientesData.forEach(p => {
      const diaKey = format(p.data, 'yyyy-MM-dd');
      contagemPorDia.set(diaKey, (contagemPorDia.get(diaKey) || 0) + 1);
    });
    return Array.from(contagemPorDia.entries())
      .filter(([_, count]) => count >= 4)
      .map(([dia]) => new Date(dia));
  }, []);

  // Pacientes de hoje
  const pacientesHoje = useMemo(() => {
    return pacientesData.filter(p => isSameDay(p.data, new Date()));
  }, []);

  const handleVerExames = (paciente: any) => {
    setSelectedPaciente(paciente);
    setShowExamesDialog(true);
  };

  const handleVerPrescricoes = (paciente: any) => {
    setSelectedPaciente(paciente);
    setShowPrescricoesDialog(true);
  };

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
                  {date && diasComAltaDemanda.some(d => isSameDay(d, date)) && (
                    <div className="flex items-center gap-2 mt-2 p-2 bg-warning/10 border border-warning rounded-md">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <p className="text-sm text-warning">Alta demanda neste dia</p>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      altaDemanda: diasComAltaDemanda,
                    }}
                    modifiersStyles={{
                      altaDemanda: {
                        fontWeight: 'bold',
                        backgroundColor: 'hsl(var(--warning) / 0.2)',
                        color: 'hsl(var(--warning-foreground))',
                      },
                    }}
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
                  {pacientesDoDia.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Nenhum paciente agendado para este dia
                    </p>
                  ) : (
                    pacientesDoDia.map((paciente) => (
                      <Card key={paciente.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold">{paciente.nome}</p>
                              <Badge>{paciente.hora}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Diagnóstico: {paciente.diagnostico}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Matrícula SUS: {paciente.matricula}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Protocolo: {paciente.protocolo}
                            </p>
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              Ver Detalhes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hoje" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Atendimentos de Hoje</CardTitle>
                <CardDescription>
                  {pacientesHoje.length} pacientes em ordem cronológica
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pacientesHoje.map((paciente, i) => (
                  <Card key={paciente.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">{paciente.nome}</p>
                          <p className="text-sm text-muted-foreground">{paciente.hora}</p>
                          <p className="text-xs text-muted-foreground mt-1">{paciente.diagnostico}</p>
                        </div>
                        <Badge variant={i === 0 ? "default" : "secondary"}>
                          {paciente.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleVerExames(paciente)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Exames
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleVerPrescricoes(paciente)}
                        >
                          <ClipboardCheck className="h-4 w-4 mr-2" />
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

      {/* Dialog de Exames */}
      <Dialog open={showExamesDialog} onOpenChange={setShowExamesDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Exames - {selectedPaciente?.nome}</DialogTitle>
            <DialogDescription>
              Resultado dos exames laboratoriais e diagnósticos
            </DialogDescription>
          </DialogHeader>
          
          {selectedPaciente && examesData[selectedPaciente.id] && (
            <div className="space-y-6">
              {examesData[selectedPaciente.id].map((exame, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{exame.tipo}</CardTitle>
                      <Badge variant={exame.status.includes("Normal") || exame.status.includes("Adequado") ? "default" : "secondary"}>
                        {exame.status}
                      </Badge>
                    </div>
                    <CardDescription>Data: {exame.data}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parâmetro</TableHead>
                          <TableHead>Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(exame).map(([key, value]) => {
                          if (key !== 'tipo' && key !== 'data' && key !== 'status') {
                            return (
                              <TableRow key={key}>
                                <TableCell className="font-medium capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </TableCell>
                                <TableCell>{value as string}</TableCell>
                              </TableRow>
                            );
                          }
                          return null;
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {selectedPaciente && !examesData[selectedPaciente.id] && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhum exame disponível para este paciente
            </p>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Prescrições */}
      <Dialog open={showPrescricoesDialog} onOpenChange={setShowPrescricoesDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prescrições - {selectedPaciente?.nome}</DialogTitle>
            <DialogDescription>
              Protocolo: {selectedPaciente?.protocolo}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPaciente && prescricoesData[selectedPaciente.id] && (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Dose</TableHead>
                    <TableHead>Via</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Observação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescricoesData[selectedPaciente.id].map((prescricao, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{prescricao.medicamento}</TableCell>
                      <TableCell>{prescricao.dose}</TableCell>
                      <TableCell>{prescricao.via}</TableCell>
                      <TableCell>{prescricao.frequencia}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {prescricao.observacao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-sm">Informações do Tratamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Diagnóstico:</span>
                    <span className="font-medium">{selectedPaciente.diagnostico}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protocolo:</span>
                    <span className="font-medium">{selectedPaciente.protocolo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Matrícula SUS:</span>
                    <span className="font-medium">{selectedPaciente.matricula}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {selectedPaciente && !prescricoesData[selectedPaciente.id] && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma prescrição disponível para este paciente
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Medico;
