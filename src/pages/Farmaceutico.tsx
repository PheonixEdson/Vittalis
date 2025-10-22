import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pill, Package, TrendingUp, CheckCircle, Home, QrCode, User, Clock, MapPin, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type EtapaStatus = "concluido" | "em_andamento" | "pendente" | "problema";

interface Etapa {
  nome: string;
  status: EtapaStatus;
  responsavel?: string;
  dataHora?: string;
  localizacao?: string;
  observacao?: string;
}

interface Medicamento {
  id: string;
  qrCode: string;
  nome: string;
  lote: string;
  quantidade: string;
  paciente?: string;
  tipo: "medicamento" | "infusao";
  etapas: Etapa[];
}

const Farmaceutico = () => {
  const navigate = useNavigate();
  const [selectedMedicamento, setSelectedMedicamento] = useState<Medicamento | null>(null);

  // Mock data - medicamentos gerais
  const medicamentosGerais: Medicamento[] = [
    {
      id: "MED001",
      qrCode: "QR-MED-2025-001",
      nome: "Paclitaxel 100mg",
      lote: "L2025001",
      quantidade: "2 frascos",
      paciente: "Ana Costa",
      tipo: "medicamento",
      etapas: [
        {
          nome: "Recebimento",
          status: "concluido",
          responsavel: "Farm. Carlos Lima - CRF 54321",
          dataHora: "18/10/2025 09:00",
          localizacao: "Recepção Farmácia",
          observacao: "Conferência de nota fiscal e temperatura de transporte OK (2-8°C)"
        },
        {
          nome: "Armazenamento",
          status: "concluido",
          responsavel: "Farm. Beatriz Santos - CRF 99887",
          dataHora: "18/10/2025 09:15",
          localizacao: "Geladeira A2 - Prateleira 3",
          observacao: "Armazenado conforme protocolo. Temperatura: 5°C"
        },
        {
          nome: "Dispensação",
          status: "concluido",
          responsavel: "Farm. João Silva - CRF 12345",
          dataHora: "18/10/2025 14:00",
          localizacao: "Central de Manipulação",
          observacao: "Dispensado para preparo de infusão"
        },
        {
          nome: "Transporte interno",
          status: "concluido",
          responsavel: "Aux. Pedro Rocha",
          dataHora: "18/10/2025 14:20",
          localizacao: "Sala de Infusão 3",
          observacao: "Transporte em caixa térmica. Tempo: 5 minutos"
        },
        {
          nome: "Administração ao paciente",
          status: "concluido",
          responsavel: "Enf. Maria Santos - COREN 98765",
          dataHora: "18/10/2025 14:30",
          localizacao: "Leito 15 - Ala B",
          observacao: "Infusão iniciada. Paciente orientada e monitorada"
        },
        {
          nome: "Devolução / descarte",
          status: "concluido",
          responsavel: "Enf. Maria Santos - COREN 98765",
          dataHora: "18/10/2025 16:00",
          localizacao: "Sala de Resíduos",
          observacao: "Material descartado conforme RDC 222/2018"
        }
      ]
    },
    {
      id: "MED002",
      qrCode: "QR-MED-2025-002",
      nome: "Cisplatina 50mg",
      lote: "L2025-789",
      quantidade: "50 frascos",
      tipo: "medicamento",
      etapas: [
        {
          nome: "Recebimento",
          status: "concluido",
          responsavel: "Farm. Carlos Lima - CRF 54321",
          dataHora: "18/10/2025 09:00",
          localizacao: "Recepção Farmácia",
          observacao: "Lote conferido. Validade: 06/2027"
        },
        {
          nome: "Armazenamento",
          status: "em_andamento",
          responsavel: "Farm. Beatriz Santos - CRF 99887",
          dataHora: "18/10/2025 09:20",
          localizacao: "Geladeira B1 - Prateleira 2",
          observacao: "Em processo de catalogação no sistema"
        },
        {
          nome: "Dispensação",
          status: "pendente"
        },
        {
          nome: "Transporte interno",
          status: "pendente"
        },
        {
          nome: "Administração ao paciente",
          status: "pendente"
        },
        {
          nome: "Devolução / descarte",
          status: "pendente"
        }
      ]
    },
    {
      id: "MED003",
      qrCode: "QR-MED-2025-003",
      nome: "Rituximab 500mg",
      lote: "R2025-456",
      quantidade: "2 frascos",
      paciente: "Roberto Lima",
      tipo: "medicamento",
      etapas: [
        {
          nome: "Recebimento",
          status: "concluido",
          responsavel: "Farm. Ana Paula - CRF 67890",
          dataHora: "17/10/2025 14:00",
          localizacao: "Recepção Farmácia",
          observacao: "Recebimento normal"
        },
        {
          nome: "Armazenamento",
          status: "concluido",
          responsavel: "Farm. Ricardo Mendes - CRF 33445",
          dataHora: "17/10/2025 14:15",
          localizacao: "Geladeira A1",
          observacao: "Temperatura controlada"
        },
        {
          nome: "Dispensação",
          status: "concluido",
          responsavel: "Farm. Ana Paula - CRF 67890",
          dataHora: "17/10/2025 16:30",
          localizacao: "Central de Manipulação",
          observacao: "Preparado para administração"
        },
        {
          nome: "Transporte interno",
          status: "problema",
          responsavel: "Aux. Lucas Silva",
          dataHora: "17/10/2025 16:45",
          localizacao: "Corredor Ala C",
          observacao: "PROBLEMA: Paciente não compareceu. Medicamento retornado ao estoque às 18:00"
        },
        {
          nome: "Administração ao paciente",
          status: "pendente"
        },
        {
          nome: "Devolução / descarte",
          status: "pendente"
        }
      ]
    },
    {
      id: "MED004",
      qrCode: "QR-MED-2025-004",
      nome: "Bevacizumab 400mg",
      lote: "B2025-321",
      quantidade: "15 frascos",
      tipo: "medicamento",
      etapas: [
        {
          nome: "Recebimento",
          status: "problema",
          dataHora: "17/10/2025 11:20",
          localizacao: "Recepção Farmácia",
          observacao: "PROBLEMA: Entrega não realizada pelo fornecedor. NF #45678 cancelada. Previsão: 20/10/2025"
        },
        {
          nome: "Armazenamento",
          status: "pendente"
        },
        {
          nome: "Dispensação",
          status: "pendente"
        },
        {
          nome: "Transporte interno",
          status: "pendente"
        },
        {
          nome: "Administração ao paciente",
          status: "pendente"
        },
        {
          nome: "Devolução / descarte",
          status: "pendente"
        }
      ]
    }
  ];

  // Mock data - infusões
  const infusoes: Medicamento[] = [
    {
      id: "INF001",
      qrCode: "QR-INF-2025-001",
      nome: "Doxorrubicina 104mg + Ciclofosfamida 1.038mg",
      lote: "Protocolo AC-T",
      quantidade: "Bolsa preparada",
      paciente: "Maria Santos Silva",
      tipo: "infusao",
      etapas: [
        {
          nome: "Recebimento",
          status: "concluido",
          responsavel: "Farm. João Silva - CRF 12345",
          dataHora: "18/10/2025 11:00",
          localizacao: "Farmácia Central",
          observacao: "Medicamentos separados do estoque conforme prescrição médica"
        },
        {
          nome: "Armazenamento",
          status: "concluido",
          responsavel: "Farm. João Silva - CRF 12345",
          dataHora: "18/10/2025 11:05",
          localizacao: "Geladeira Manipulação",
          observacao: "Componentes armazenados aguardando preparação"
        },
        {
          nome: "Dispensação",
          status: "concluido",
          responsavel: "Farm. João Silva - CRF 12345",
          dataHora: "18/10/2025 13:00",
          localizacao: "Cabine de Fluxo Laminar",
          observacao: "Infusão preparada em ambiente estéril. Dupla checagem realizada"
        },
        {
          nome: "Transporte interno",
          status: "concluido",
          responsavel: "Aux. Camila Rocha",
          dataHora: "18/10/2025 13:40",
          localizacao: "Sala de Infusão 2",
          observacao: "Transporte em caixa térmica certificada. Doxorrubicina protegida da luz"
        },
        {
          nome: "Administração ao paciente",
          status: "concluido",
          responsavel: "Enf. Maria Santos - COREN 98765",
          dataHora: "18/10/2025 14:00",
          localizacao: "Leito 08 - Ala Oncologia",
          observacao: "Infusão concluída. Paciente sem intercorrências. SSVV estáveis"
        },
        {
          nome: "Devolução / descarte",
          status: "concluido",
          responsavel: "Enf. Maria Santos - COREN 98765",
          dataHora: "18/10/2025 16:30",
          localizacao: "Sala de Resíduos Químicos",
          observacao: "Descarte conforme protocolo de quimioterápicos"
        }
      ]
    },
    {
      id: "INF002",
      qrCode: "QR-INF-2025-002",
      nome: "Rituximab 754mg (R-CHOP)",
      lote: "Protocolo R-CHOP",
      quantidade: "Bolsa preparada",
      paciente: "Roberto Lima Santos",
      tipo: "infusao",
      etapas: [
        {
          nome: "Recebimento",
          status: "concluido",
          responsavel: "Farm. Carlos Lima - CRF 54321",
          dataHora: "18/10/2025 10:00",
          localizacao: "Farmácia Central",
          observacao: "Rituximab retirado do estoque refrigerado"
        },
        {
          nome: "Armazenamento",
          status: "concluido",
          responsavel: "Farm. Carlos Lima - CRF 54321",
          dataHora: "18/10/2025 10:05",
          localizacao: "Geladeira Manipulação",
          observacao: "Temperatura monitorada: 4°C"
        },
        {
          nome: "Dispensação",
          status: "concluido",
          responsavel: "Farm. Ana Paula - CRF 67890",
          dataHora: "18/10/2025 12:30",
          localizacao: "Cabine de Fluxo Laminar",
          observacao: "Diluição em SF 0,9% 500mL. Inspeção visual OK"
        },
        {
          nome: "Transporte interno",
          status: "em_andamento",
          responsavel: "Aux. Pedro Rocha",
          dataHora: "18/10/2025 13:15",
          localizacao: "Em trânsito para Sala 5",
          observacao: "Transporte em andamento. ETA: 5 minutos"
        },
        {
          nome: "Administração ao paciente",
          status: "pendente"
        },
        {
          nome: "Devolução / descarte",
          status: "pendente"
        }
      ]
    },
    {
      id: "INF003",
      qrCode: "QR-INF-2025-003",
      nome: "Oxaliplatina 135mg (FOLFOX)",
      lote: "Protocolo FOLFOX",
      quantidade: "Bolsa preparada",
      paciente: "Ana Paula Ferreira",
      tipo: "infusao",
      etapas: [
        {
          nome: "Recebimento",
          status: "concluido",
          responsavel: "Farm. Beatriz Santos - CRF 99887",
          dataHora: "18/10/2025 09:30",
          localizacao: "Farmácia Central",
          observacao: "Componentes do protocolo FOLFOX separados"
        },
        {
          nome: "Armazenamento",
          status: "concluido",
          responsavel: "Farm. Beatriz Santos - CRF 99887",
          dataHora: "18/10/2025 09:35",
          localizacao: "Área de Preparação",
          observacao: "Oxaliplatina protegida da luz"
        },
        {
          nome: "Dispensação",
          status: "em_andamento",
          responsavel: "Farm. Ricardo Mendes - CRF 33445",
          dataHora: "18/10/2025 11:00",
          localizacao: "Cabine de Fluxo Laminar",
          observacao: "Em preparação. ATENÇÃO: Usar apenas SG 5%, nunca SF 0,9%"
        },
        {
          nome: "Transporte interno",
          status: "pendente"
        },
        {
          nome: "Administração ao paciente",
          status: "pendente"
        },
        {
          nome: "Devolução / descarte",
          status: "pendente"
        }
      ]
    }
  ];

  const handleScanQR = (med: Medicamento) => {
    setSelectedMedicamento(med);
    toast({
      title: "QR Code Escaneado",
      description: `${med.nome} - ${med.qrCode}`,
    });
  };

  const renderEtapaIcon = (status: EtapaStatus) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "em_andamento":
        return <Clock className="h-5 w-5 text-warning animate-pulse" />;
      case "problema":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted" />;
    }
  };

  const renderEtapaCard = (etapa: Etapa, index: number, total: number) => {
    const isLast = index === total - 1;
    
    return (
      <div key={index} className="relative">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className={`
              h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0
              ${etapa.status === "concluido" ? "bg-success/20" : ""}
              ${etapa.status === "em_andamento" ? "bg-warning/20" : ""}
              ${etapa.status === "problema" ? "bg-destructive/20" : ""}
              ${etapa.status === "pendente" ? "bg-muted" : ""}
            `}>
              {renderEtapaIcon(etapa.status)}
            </div>
            {!isLast && (
              <div className={`
                w-0.5 h-full min-h-[60px] mt-2
                ${etapa.status === "concluido" ? "bg-success/40" : "bg-muted"}
              `} />
            )}
          </div>

          <Card className={`
            flex-1 mb-4
            ${etapa.status === "problema" ? "border-destructive" : ""}
            ${etapa.status === "em_andamento" ? "border-warning" : ""}
          `}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{etapa.nome}</h4>
                <Badge variant={
                  etapa.status === "concluido" ? "default" :
                  etapa.status === "em_andamento" ? "secondary" :
                  etapa.status === "problema" ? "destructive" : "outline"
                }>
                  {etapa.status === "concluido" ? "Concluído" :
                   etapa.status === "em_andamento" ? "Em Andamento" :
                   etapa.status === "problema" ? "Problema" : "Pendente"}
                </Badge>
              </div>

              {etapa.responsavel && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <User className="h-3 w-3" />
                  <span>{etapa.responsavel}</span>
                </div>
              )}

              {etapa.dataHora && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  <span>{etapa.dataHora}</span>
                </div>
              )}

              {etapa.localizacao && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>{etapa.localizacao}</span>
                </div>
              )}

              {etapa.observacao && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{etapa.observacao}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

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
                <CardTitle>Rastreabilidade de Medicamentos</CardTitle>
                <CardDescription>
                  Ciclo de vida completo desde recebimento até descarte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <Input placeholder="Buscar por QR Code, medicamento ou paciente..." className="max-w-md" />
                  <Button variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Escanear QR Code
                  </Button>
                </div>

                <div className="grid gap-4">
                  {medicamentosGerais.map((med) => {
                    const etapaAtual = med.etapas.find(e => e.status === "em_andamento" || e.status === "problema") || 
                                       med.etapas.filter(e => e.status === "concluido").pop() ||
                                       med.etapas[0];
                    const concluidas = med.etapas.filter(e => e.status === "concluido").length;
                    const total = med.etapas.length;
                    const temProblema = med.etapas.some(e => e.status === "problema");

                    return (
                      <Card key={med.id} className={`${temProblema ? "border-destructive/50" : ""}`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <QrCode className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs font-mono text-muted-foreground">{med.qrCode}</span>
                              </div>
                              <h3 className="font-semibold text-lg mb-1">{med.nome}</h3>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>Lote: {med.lote}</span>
                                <span>{med.quantidade}</span>
                                {med.paciente && <span>Paciente: {med.paciente}</span>}
                              </div>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleScanQR(med)}>
                                  Ver Trilha Completa
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Trilha Completa - {med.nome}</DialogTitle>
                                  <DialogDescription>
                                    {med.qrCode} • {med.quantidade}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4">
                                  {med.etapas.map((etapa, idx) => renderEtapaCard(etapa, idx, med.etapas.length))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Progresso do Ciclo</span>
                                <span className="text-sm text-muted-foreground">{concluidas}/{total} etapas</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${temProblema ? "bg-destructive" : "bg-primary"}`}
                                  style={{ width: `${(concluidas / total) * 100}%` }}
                                />
                              </div>
                            </div>

                            <Card className="bg-muted/50">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className={`
                                    h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0
                                    ${etapaAtual.status === "concluido" ? "bg-success/20" : ""}
                                    ${etapaAtual.status === "em_andamento" ? "bg-warning/20" : ""}
                                    ${etapaAtual.status === "problema" ? "bg-destructive/20" : ""}
                                    ${etapaAtual.status === "pendente" ? "bg-background" : ""}
                                  `}>
                                    {renderEtapaIcon(etapaAtual.status)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="font-medium">{etapaAtual.nome}</p>
                                      <Badge variant={
                                        etapaAtual.status === "concluido" ? "default" :
                                        etapaAtual.status === "em_andamento" ? "secondary" :
                                        etapaAtual.status === "problema" ? "destructive" : "outline"
                                      } className="text-xs">
                                        {etapaAtual.status === "concluido" ? "Concluído" :
                                         etapaAtual.status === "em_andamento" ? "Em Andamento" :
                                         etapaAtual.status === "problema" ? "Problema" : "Aguardando"}
                                      </Badge>
                                    </div>
                                    {etapaAtual.responsavel && (
                                      <p className="text-sm text-muted-foreground">{etapaAtual.responsavel}</p>
                                    )}
                                    {etapaAtual.dataHora && (
                                      <p className="text-xs text-muted-foreground">{etapaAtual.dataHora} • {etapaAtual.localizacao}</p>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
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
                <CardTitle>Rastreio de Infusões</CardTitle>
                <CardDescription>
                  Ciclo de vida completo das infusões oncológicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <Input placeholder="Buscar por QR Code, protocolo ou paciente..." className="max-w-md" />
                  <Button variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Escanear QR Code
                  </Button>
                </div>

                <div className="grid gap-4">
                  {infusoes.map((inf) => {
                    const etapaAtual = inf.etapas.find(e => e.status === "em_andamento" || e.status === "problema") || 
                                       inf.etapas.filter(e => e.status === "concluido").pop() ||
                                       inf.etapas[0];
                    const concluidas = inf.etapas.filter(e => e.status === "concluido").length;
                    const total = inf.etapas.length;
                    const temProblema = inf.etapas.some(e => e.status === "problema");

                    return (
                      <Card key={inf.id} className={`border-l-4 ${temProblema ? "border-l-destructive" : "border-l-primary"}`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <QrCode className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs font-mono text-muted-foreground">{inf.qrCode}</span>
                                <Badge variant="secondary" className="text-xs">Infusão</Badge>
                              </div>
                              <h3 className="font-semibold text-lg mb-1">{inf.nome}</h3>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{inf.lote}</span>
                                {inf.paciente && <span>Paciente: {inf.paciente}</span>}
                              </div>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleScanQR(inf)}>
                                  Ver Trilha Completa
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Trilha Completa - {inf.nome}</DialogTitle>
                                  <DialogDescription>
                                    {inf.qrCode} • Paciente: {inf.paciente}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4">
                                  {inf.etapas.map((etapa, idx) => renderEtapaCard(etapa, idx, inf.etapas.length))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Progresso do Ciclo</span>
                                <span className="text-sm text-muted-foreground">{concluidas}/{total} etapas</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${temProblema ? "bg-destructive" : "bg-success"}`}
                                  style={{ width: `${(concluidas / total) * 100}%` }}
                                />
                              </div>
                            </div>

                            <Card className="bg-muted/50">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className={`
                                    h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0
                                    ${etapaAtual.status === "concluido" ? "bg-success/20" : ""}
                                    ${etapaAtual.status === "em_andamento" ? "bg-warning/20" : ""}
                                    ${etapaAtual.status === "problema" ? "bg-destructive/20" : ""}
                                    ${etapaAtual.status === "pendente" ? "bg-background" : ""}
                                  `}>
                                    {renderEtapaIcon(etapaAtual.status)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="font-medium">{etapaAtual.nome}</p>
                                      <Badge variant={
                                        etapaAtual.status === "concluido" ? "default" :
                                        etapaAtual.status === "em_andamento" ? "secondary" :
                                        etapaAtual.status === "problema" ? "destructive" : "outline"
                                      } className="text-xs">
                                        {etapaAtual.status === "concluido" ? "Concluído" :
                                         etapaAtual.status === "em_andamento" ? "Em Andamento" :
                                         etapaAtual.status === "problema" ? "Problema" : "Aguardando"}
                                      </Badge>
                                    </div>
                                    {etapaAtual.responsavel && (
                                      <p className="text-sm text-muted-foreground">{etapaAtual.responsavel}</p>
                                    )}
                                    {etapaAtual.dataHora && (
                                      <p className="text-xs text-muted-foreground">{etapaAtual.dataHora} • {etapaAtual.localizacao}</p>
                                    )}
                                    {etapaAtual.observacao && (
                                      <p className="text-xs text-muted-foreground mt-1">{etapaAtual.observacao}</p>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Farmaceutico;
