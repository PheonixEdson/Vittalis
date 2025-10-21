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
                    observacao: "Medicamento administrado conforme protocolo. Paciente tolerou bem o procedimento.",
                  },
                  {
                    tipo: "Entrada",
                    medicamento: "Cisplatina 50mg",
                    quantidade: 50,
                    responsavel: "Farm. Carlos Lima - CRF 54321",
                    fornecedor: "Distribuidora MedFarma",
                    data: "18/10/2025 09:00",
                    status: "Estocado",
                    observacao: "Lote L2025-789. Armazenado em geladeira (2-8°C). Validade: 06/2027.",
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
                    observacao: "Infusão iniciada às 10:15. Previsão de término: 12:15. Monitoramento de sinais vitais a cada 30min.",
                  },
                  {
                    tipo: "Saída",
                    medicamento: "Rituximab 500mg",
                    quantidade: 2,
                    responsavel: "Farm. Ana Paula - CRF 67890",
                    retirada: "Enf. Juliana Costa - COREN 44444",
                    destino: "Paciente: Roberto Lima",
                    data: "17/10/2025 16:45",
                    status: "Não recebido pelo paciente",
                    observacao: "Paciente não compareceu à sessão agendada. Medicamento devolvido ao estoque às 18:00. Necessário reagendamento.",
                  },
                  {
                    tipo: "Entrada",
                    medicamento: "Bevacizumab 400mg",
                    quantidade: 15,
                    responsavel: "Farm. Mariana Souza - CRF 11223",
                    fornecedor: "Distribuidora FarmaPlus",
                    data: "17/10/2025 11:20",
                    status: "Medicamento não recebido",
                    observacao: "Entrega não realizada pelo fornecedor. Nota fiscal #45678 cancelada. Previsão de nova entrega: 20/10/2025.",
                  },
                  {
                    tipo: "Saída",
                    medicamento: "Carboplatina 450mg",
                    quantidade: 1,
                    responsavel: "Farm. Ricardo Mendes - CRF 33445",
                    retirada: "Enf. Fernanda Silva - COREN 77777",
                    destino: "Paciente: Lucia Ferreira",
                    data: "16/10/2025 13:30",
                    status: "Perda de medicamento",
                    observacao: "Frasco quebrou durante transporte interno. Área descontaminada conforme protocolo. Relatório de ocorrência #2025-034 gerado.",
                  },
                  {
                    tipo: "Entrada",
                    medicamento: "Trastuzumab 440mg",
                    quantidade: 8,
                    responsavel: "Farm. Beatriz Santos - CRF 99887",
                    fornecedor: "Distribuidora BioMed",
                    data: "16/10/2025 08:15",
                    status: "Quarentena",
                    observacao: "Aguardando liberação de controle de qualidade. Temperatura de transporte verificada e conforme (2-8°C). Lote: T2025-456.",
                  },
                  {
                    tipo: "Saída",
                    medicamento: "Oxaliplatina 100mg",
                    quantidade: 2,
                    responsavel: "Farm. Paulo Roberto - CRF 55667",
                    retirada: "Enf. Camila Rocha - COREN 22222",
                    destino: "Paciente: José Santos",
                    data: "15/10/2025 15:00",
                    status: "Cancelado",
                    observacao: "Prescrição cancelada pelo médico oncologista Dr. Fernando Costa devido a alteração nos exames laboratoriais do paciente. Medicamento devolvido ao estoque.",
                  },
                  {
                    tipo: "Saída",
                    medicamento: "Pembrolizumab 200mg",
                    quantidade: 1,
                    responsavel: "Farm. Laura Oliveira - CRF 77889",
                    retirada: "Enf. Rodrigo Almeida - COREN 66666",
                    destino: "Paciente: Helena Martins",
                    data: "15/10/2025 09:30",
                    status: "Aguardando coleta",
                    observacao: "Medicamento preparado e armazenado em refrigeração. Enfermagem notificada. Paciente em processo de admissão na unidade.",
                  },
                ].map((mov, i) => (
                  <Card key={i} className={`border-l-4 ${
                    mov.status.includes("Não recebido") || mov.status === "Perda de medicamento" || mov.status === "Cancelado"
                      ? "border-l-destructive"
                      : mov.tipo === "Entrada" 
                      ? "border-l-success" 
                      : "border-l-primary"
                  }`}>
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
                        <Badge 
                          variant={
                            mov.status.includes("Não recebido") || mov.status === "Perda de medicamento" || mov.status === "Cancelado"
                              ? "destructive"
                              : mov.status === "Administrado"
                              ? "default"
                              : "outline"
                          }
                        >
                          {mov.status}
                        </Badge>
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
                        {mov.observacao && (
                          <div className="pt-2 border-t">
                            <p className="text-muted-foreground mb-1">Observações:</p>
                            <p className="text-sm">{mov.observacao}</p>
                          </div>
                        )}
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
                {[
                  {
                    paciente: "Maria Santos Silva",
                    diagnostico: "Carcinoma de Mama HER2+",
                    sessao: "3/6",
                    sus: "123.456.789-0",
                    peso: "68 kg",
                    altura: "1.65 m",
                    sc: "1.73 m²",
                    alergias: "Dipirona, Penicilina",
                    medico: "Dr. Fernando Costa - CRM 45678",
                    protocolo: "AC-T (Doxorrubicina + Ciclofosfamida)",
                    prescricao: [
                      {
                        medicamento: "Doxorrubicina",
                        dose: "60 mg/m²",
                        doseTotal: "104 mg",
                        via: "EV",
                        diluente: "SF 0,9% 100mL",
                        tempo: "30 minutos",
                        observacao: "Proteger da luz. Infusão em Y com SF 0,9%",
                      },
                      {
                        medicamento: "Ciclofosfamida",
                        dose: "600 mg/m²",
                        doseTotal: "1.038 mg",
                        via: "EV",
                        diluente: "SF 0,9% 250mL",
                        tempo: "60 minutos",
                        observacao: "Infundir após doxorrubicina",
                      },
                      {
                        medicamento: "Dexametasona",
                        dose: "10 mg",
                        doseTotal: "10 mg",
                        via: "EV",
                        diluente: "SF 0,9% 100mL",
                        tempo: "15 minutos",
                        observacao: "Pré-medicação - infundir 30min antes",
                      },
                      {
                        medicamento: "Ondansetrona",
                        dose: "8 mg",
                        doseTotal: "8 mg",
                        via: "EV",
                        diluente: "SF 0,9% 50mL",
                        tempo: "15 minutos",
                        observacao: "Antiemético - infundir antes da quimioterapia",
                      },
                    ],
                  },
                  {
                    paciente: "Roberto Lima Santos",
                    diagnostico: "Linfoma Não-Hodgkin",
                    sessao: "5/8",
                    sus: "987.654.321-9",
                    peso: "82 kg",
                    altura: "1.78 m",
                    sc: "2.01 m²",
                    alergias: "Nenhuma alergia conhecida",
                    medico: "Dra. Patricia Almeida - CRM 78901",
                    protocolo: "R-CHOP",
                    prescricao: [
                      {
                        medicamento: "Rituximab",
                        dose: "375 mg/m²",
                        doseTotal: "754 mg",
                        via: "EV",
                        diluente: "SF 0,9% 500mL",
                        tempo: "4-6 horas (primeira infusão)",
                        observacao: "Iniciar a 50mg/h. Aumentar gradualmente se bem tolerado. Monitorar sinais vitais a cada 15min na primeira hora",
                      },
                      {
                        medicamento: "Ciclofosfamida",
                        dose: "750 mg/m²",
                        doseTotal: "1.508 mg",
                        via: "EV",
                        diluente: "SF 0,9% 250mL",
                        tempo: "60 minutos",
                        observacao: "Administrar após rituximab",
                      },
                      {
                        medicamento: "Doxorrubicina (Adriamicina)",
                        dose: "50 mg/m²",
                        doseTotal: "100 mg",
                        via: "EV",
                        diluente: "SF 0,9% 100mL",
                        tempo: "30 minutos",
                        observacao: "Proteger da luz. Vesicante - atenção na punção",
                      },
                      {
                        medicamento: "Vincristina (Oncovin)",
                        dose: "1.4 mg/m²",
                        doseTotal: "2 mg (máx)",
                        via: "EV - push",
                        diluente: "Administração direta",
                        tempo: "3-5 minutos",
                        observacao: "DOSE MÁXIMA: 2mg. Vesicante. VIA EV EXCLUSIVAMENTE",
                      },
                      {
                        medicamento: "Prednisona",
                        dose: "100 mg",
                        doseTotal: "100 mg",
                        via: "VO",
                        diluente: "N/A",
                        tempo: "N/A",
                        observacao: "Administrar por 5 dias (D1-D5). Paciente levará prescrição para casa",
                      },
                      {
                        medicamento: "Ranitidina",
                        dose: "50 mg",
                        doseTotal: "50 mg",
                        via: "EV",
                        diluente: "SF 0,9% 50mL",
                        tempo: "15 minutos",
                        observacao: "Pré-medicação",
                      },
                    ],
                  },
                  {
                    paciente: "Ana Paula Ferreira",
                    diagnostico: "Câncer Colorretal Metastático",
                    sessao: "8/12",
                    sus: "456.789.012-3",
                    peso: "58 kg",
                    altura: "1.60 m",
                    sc: "1.59 m²",
                    alergias: "Contraste iodado",
                    medico: "Dr. Carlos Eduardo Silva - CRM 23456",
                    protocolo: "FOLFOX + Bevacizumab",
                    prescricao: [
                      {
                        medicamento: "Bevacizumab",
                        dose: "5 mg/kg",
                        doseTotal: "290 mg",
                        via: "EV",
                        diluente: "SF 0,9% 100mL",
                        tempo: "90 minutos (primeira dose)",
                        observacao: "Infusões subsequentes: 60min se tolerado. Monitorar PA antes e durante infusão",
                      },
                      {
                        medicamento: "Oxaliplatina",
                        dose: "85 mg/m²",
                        doseTotal: "135 mg",
                        via: "EV",
                        diluente: "SG 5% 250mL",
                        tempo: "2 horas",
                        observacao: "NUNCA usar SF 0,9%. Incompatível com cloreto. Infundir em SG 5% exclusivamente. Proteger da luz",
                      },
                      {
                        medicamento: "Leucovorin (Ácido Folínico)",
                        dose: "400 mg/m²",
                        doseTotal: "636 mg",
                        via: "EV",
                        diluente: "SF 0,9% 250mL",
                        tempo: "2 horas (concomitante com oxaliplatina)",
                        observacao: "Infundir simultaneamente com oxaliplatina em acesso venoso separado",
                      },
                      {
                        medicamento: "Fluorouracil (5-FU) - Bolus",
                        dose: "400 mg/m²",
                        doseTotal: "636 mg",
                        via: "EV - push",
                        diluente: "SF 0,9% 20mL",
                        tempo: "5-10 minutos",
                        observacao: "Administrar imediatamente após leucovorin/oxaliplatina",
                      },
                      {
                        medicamento: "Fluorouracil (5-FU) - Infusão contínua",
                        dose: "2400 mg/m²",
                        doseTotal: "3.816 mg",
                        via: "EV",
                        diluente: "SF 0,9% 500mL (bomba de infusão)",
                        tempo: "46 horas",
                        observacao: "Infusão ambulatorial contínua. Orientar paciente sobre cuidados com bomba portátil. Retorno em 48h para retirada",
                      },
                      {
                        medicamento: "Ondansetrona",
                        dose: "16 mg",
                        doseTotal: "16 mg",
                        via: "EV",
                        diluente: "SF 0,9% 100mL",
                        tempo: "15 minutos",
                        observacao: "Pré-medicação antiemética",
                      },
                      {
                        medicamento: "Dexametasona",
                        dose: "12 mg",
                        doseTotal: "12 mg",
                        via: "EV",
                        diluente: "SF 0,9% 100mL",
                        tempo: "15 minutos",
                        observacao: "Pré-medicação. Reduz náuseas e reações alérgicas",
                      },
                    ],
                  },
                  {
                    paciente: "José Carlos Oliveira",
                    diagnostico: "Câncer de Pulmão Não-Pequenas Células",
                    sessao: "2/4",
                    sus: "789.012.345-6",
                    peso: "75 kg",
                    altura: "1.72 m",
                    sc: "1.87 m²",
                    alergias: "Látex",
                    medico: "Dra. Mariana Costa - CRM 34567",
                    protocolo: "Pembrolizumab monoterapia",
                    prescricao: [
                      {
                        medicamento: "Pembrolizumab",
                        dose: "200 mg",
                        doseTotal: "200 mg",
                        via: "EV",
                        diluente: "SF 0,9% 100mL",
                        tempo: "30 minutos",
                        observacao: "Imunoterapia. Monitorar reações infusionais. Usar filtro in-line de 0.2-5 micron. Temperatura ambiente antes da infusão",
                      },
                      {
                        medicamento: "Difenidramina",
                        dose: "50 mg",
                        doseTotal: "50 mg",
                        via: "EV",
                        diluente: "SF 0,9% 50mL",
                        tempo: "15 minutos",
                        observacao: "Pré-medicação anti-histamínica. Previne reações alérgicas",
                      },
                      {
                        medicamento: "Paracetamol",
                        dose: "750 mg",
                        doseTotal: "750 mg",
                        via: "VO",
                        diluente: "N/A",
                        tempo: "N/A",
                        observacao: "Administrar 30min antes da imunoterapia. Reduz febre e mal-estar",
                      },
                    ],
                  },
                  {
                    paciente: "Helena Martins Costa",
                    diagnostico: "Câncer de Ovário Avançado",
                    sessao: "6/6",
                    sus: "321.654.987-0",
                    peso: "62 kg",
                    altura: "1.68 m",
                    sc: "1.70 m²",
                    alergias: "Sulfa, AAS",
                    medico: "Dr. Ricardo Mendes - CRM 56789",
                    protocolo: "Carboplatina + Paclitaxel",
                    prescricao: [
                      {
                        medicamento: "Paclitaxel",
                        dose: "175 mg/m²",
                        doseTotal: "298 mg",
                        via: "EV",
                        diluente: "SF 0,9% 500mL",
                        tempo: "3 horas",
                        observacao: "Usar equipo sem PVC (DEHP). Filtro in-line 0.22 micron obrigatório. Proteger da luz",
                      },
                      {
                        medicamento: "Carboplatina",
                        dose: "AUC 5",
                        doseTotal: "510 mg (calculado por Calvert)",
                        via: "EV",
                        diluente: "SG 5% 250mL",
                        tempo: "60 minutos",
                        observacao: "Administrar APÓS paclitaxel. Calcular dose pela fórmula de Calvert. ClCr: 85 mL/min",
                      },
                      {
                        medicamento: "Dexametasona",
                        dose: "20 mg",
                        doseTotal: "20 mg",
                        via: "EV",
                        diluente: "SF 0,9% 100mL",
                        tempo: "15 minutos",
                        observacao: "Pré-medicação obrigatória para paclitaxel. Administrar 30-60min antes",
                      },
                      {
                        medicamento: "Difenidramina",
                        dose: "50 mg",
                        doseTotal: "50 mg",
                        via: "EV",
                        diluente: "SF 0,9% 50mL",
                        tempo: "15 minutos",
                        observacao: "Pré-medicação para paclitaxel. Previne reações de hipersensibilidade",
                      },
                      {
                        medicamento: "Ranitidina",
                        dose: "50 mg",
                        doseTotal: "50 mg",
                        via: "EV",
                        diluente: "SF 0,9% 50mL",
                        tempo: "15 minutos",
                        observacao: "Pré-medicação para paclitaxel",
                      },
                      {
                        medicamento: "Ondansetrona",
                        dose: "8 mg",
                        doseTotal: "8 mg",
                        via: "EV",
                        diluente: "SF 0,9% 50mL",
                        tempo: "15 minutos",
                        observacao: "Antiemético profilático",
                      },
                    ],
                  },
                ].map((infusao, i) => (
                  <Card key={i} className="border-primary/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-lg">{infusao.paciente}</p>
                            <p className="text-sm text-muted-foreground">
                              {infusao.diagnostico} - Sessão {infusao.sessao}
                            </p>
                            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                              <span>SUS: {infusao.sus}</span>
                              <span>Peso: {infusao.peso}</span>
                              <span>SC: {infusao.sc}</span>
                            </div>
                          </div>
                          <Badge variant="outline">Liberada</Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Médico Responsável</p>
                            <p className="text-sm font-medium">{infusao.medico}</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Protocolo</p>
                            <p className="text-sm font-medium">{infusao.protocolo}</p>
                          </div>
                        </div>

                        {infusao.alergias !== "Nenhuma alergia conhecida" && (
                          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                            <p className="text-sm font-medium mb-2">⚠️ Alergias:</p>
                            <p className="text-sm text-muted-foreground">{infusao.alergias}</p>
                          </div>
                        )}

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-3">Prescrição Detalhada:</p>
                          <div className="space-y-4">
                            {infusao.prescricao.map((med, idx) => (
                              <div key={idx} className="p-3 bg-background rounded border">
                                <div className="flex items-start justify-between mb-2">
                                  <p className="font-semibold text-sm">{med.medicamento}</p>
                                  <Badge variant="secondary" className="text-xs">
                                    {med.via}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                                  <div>
                                    <span className="text-muted-foreground">Dose:</span>
                                    <span className="ml-1 font-medium">{med.dose}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Total:</span>
                                    <span className="ml-1 font-medium">{med.doseTotal}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Diluente:</span>
                                    <span className="ml-1 font-medium">{med.diluente}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Tempo:</span>
                                    <span className="ml-1 font-medium">{med.tempo}</span>
                                  </div>
                                </div>
                                {med.observacao && (
                                  <div className="mt-2 pt-2 border-t">
                                    <p className="text-xs text-muted-foreground">
                                      <span className="font-medium">Obs:</span> {med.observacao}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ))}
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
