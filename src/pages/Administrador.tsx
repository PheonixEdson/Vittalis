import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, BarChart3, DollarSign, TrendingUp, Users, Home, Download, FileCheck, AlertTriangle, Info, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Administrador = () => {
  const navigate = useNavigate();
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showDocDialog, setShowDocDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [novoStatus, setNovoStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const procedimentosData = [
    {
      id: 1,
      paciente: "Maria Santos Silva",
      procedimento: "Quimioterapia - Carcinoma de Mama",
      etapa: "Confirmação do procedimento",
      prazo: "25/10/2025",
      status: "Pendente",
      alertaApac: "sem_apac",
      documentos: [
        { nome: "Laudo Médico Inicial", data: "15/10/2025", responsavel: "Dr. José Carlos", tipo: "PDF" },
        { nome: "Solicitação APAC", data: "16/10/2025", responsavel: "Administração", tipo: "PDF" },
        { nome: "Exames Pré-tratamento", data: "18/10/2025", responsavel: "Laboratório", tipo: "PDF" },
      ],
      dadosCompletos: {
        identificacao: {
          nome: "Maria Santos Silva",
          cpf: "123.456.789-00",
          cartaoSus: "123 4567 8901 2345",
          dataNascimento: "15/03/1968",
          idade: "57 anos",
          telefone: "(11) 98765-4321",
          endereco: "Rua das Flores, 123 - São Paulo/SP"
        },
        diagnostico: "Carcinoma Ductal Invasivo de Mama Esquerda",
        estadiamento: "Estádio IIA (T2N0M0)",
        cid: "C50.9 - Neoplasia maligna da mama, não especificada",
        tratamentoSigtap: {
          codigo: "03.04.02.019-2",
          descricao: "Quimioterapia do Carcinoma de Mama Avançado - 1ª Linha",
          protocolo: "AC-T (Doxorrubicina + Ciclofosfamida seguido de Paclitaxel)"
        },
        apacInfo: {
          status: "Não possui APAC",
          inicioTratamento: "30/10/2025",
          urgencia: "Alta - Tratamento iniciará em 5 dias"
        }
      }
    },
    {
      id: 2,
      paciente: "João Oliveira Costa",
      procedimento: "Quimioterapia - Linfoma",
      etapa: "Documentação complementar",
      prazo: "22/10/2025",
      status: "Atenção",
      alertaApac: "vencimento_proximo",
      documentos: [
        { nome: "Laudo Anatomopatológico", data: "10/10/2025", responsavel: "Dr. Paulo Silva", tipo: "PDF" },
        { nome: "Termo de Consentimento", data: "12/10/2025", responsavel: "Paciente", tipo: "PDF" },
      ],
      dadosCompletos: {
        identificacao: {
          nome: "João Oliveira Costa",
          cpf: "987.654.321-00",
          cartaoSus: "987 6543 2109 8765",
          dataNascimento: "22/07/1975",
          idade: "50 anos",
          telefone: "(11) 91234-5678",
          endereco: "Av. Paulista, 1500 - São Paulo/SP"
        },
        diagnostico: "Linfoma Não-Hodgkin Difuso de Grandes Células B",
        estadiamento: "Estádio III (Ann Arbor)",
        cid: "C83.3 - Linfoma não-Hodgkin difuso de grandes células B",
        tratamentoSigtap: {
          codigo: "03.04.02.027-3",
          descricao: "Quimioterapia de Linfoma Não-Hodgkin de Alto Grau - Adulto - 1ª Linha",
          protocolo: "R-CHOP (Rituximabe + CHOP)"
        },
        apacInfo: {
          status: "APAC válida - vence em 15 dias",
          numeroApac: "2025.01.123456",
          dataEmissao: "15/08/2025",
          dataValidade: "10/11/2025",
          urgencia: "Média - Renovar nos próximos 15 dias"
        }
      }
    },
    {
      id: 3,
      paciente: "Ana Paula Lima",
      procedimento: "Quimioterapia - Câncer de Pulmão",
      etapa: "Aprovado",
      prazo: "Concluído",
      status: "Aprovado",
      alertaApac: null,
      documentos: [
        { nome: "APAC Aprovada", data: "05/10/2025", responsavel: "SUS", tipo: "PDF" },
        { nome: "Protocolo de Tratamento", data: "06/10/2025", responsavel: "Dr. José Carlos", tipo: "PDF" },
        { nome: "Comprovante de Medicamentos", data: "08/10/2025", responsavel: "Farmácia", tipo: "PDF" },
        { nome: "Relatório de Execução", data: "20/10/2025", responsavel: "Enfermagem", tipo: "PDF" },
      ],
      dadosCompletos: {
        identificacao: {
          nome: "Ana Paula Lima",
          cpf: "456.789.123-00",
          cartaoSus: "456 7891 2304 5678",
          dataNascimento: "10/12/1960",
          idade: "64 anos",
          telefone: "(11) 93456-7890",
          endereco: "Rua Augusta, 789 - São Paulo/SP"
        },
        diagnostico: "Adenocarcinoma de Pulmão",
        estadiamento: "Estádio IIIB (T3N2M0)",
        cid: "C34.9 - Neoplasia maligna dos brônquios e dos pulmões, não especificada",
        tratamentoSigtap: {
          codigo: "03.04.02.007-9",
          descricao: "Quimioterapia de Câncer de Pulmão Avançado - 1ª Linha",
          protocolo: "Carboplatina + Paclitaxel"
        },
        apacInfo: {
          status: "APAC válida - Regular",
          numeroApac: "2025.01.098765",
          dataEmissao: "01/09/2025",
          dataValidade: "01/03/2026",
          urgencia: "Baixa - APAC válida por mais 4 meses"
        }
      }
    },
  ];

  // Filtrar pacientes com alertas de APAC
  const alertasApac = procedimentosData.filter(p => p.alertaApac);

  const handleAtualizarStatus = () => {
    if (!novoStatus) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um novo status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Status Atualizado",
      description: `O status do procedimento de ${selectedPaciente?.paciente} foi atualizado para "${novoStatus}"`,
    });

    setShowStatusDialog(false);
    setNovoStatus("");
    setObservacoes("");
  };

  const handleDownloadDoc = (nomeDoc: string) => {
    toast({
      title: "Download Iniciado",
      description: `Baixando documento: ${nomeDoc}`,
    });
  };

  const handleExtrairInfo = (paciente: any) => {
    setSelectedPaciente(paciente);
    setShowInfoDialog(true);
    
    // Simular notificação ao médico
    toast({
      title: "Informações Extraídas",
      description: "Dados do paciente carregados. Notificação enviada ao médico responsável.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área Administrativa</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Início
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="faturamento" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faturamento">
              <FileText className="h-4 w-4 mr-2" />
              Faturamento APAC
            </TabsTrigger>
            <TabsTrigger value="dashboards">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboards
            </TabsTrigger>
            <TabsTrigger value="economico">
              <DollarSign className="h-4 w-4 mr-2" />
              Controle Econômico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faturamento" className="space-y-4">
            {/* Alertas de APAC */}
            {alertasApac.length > 0 && (
              <div className="space-y-3">
                {alertasApac.map((item) => (
                  <Alert 
                    key={item.id} 
                    variant={item.alertaApac === "sem_apac" ? "destructive" : "default"}
                    className="border-l-4"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="flex items-center gap-2">
                      {item.alertaApac === "sem_apac" ? "⚠️ Paciente sem APAC" : "📅 APAC próxima do vencimento"}
                    </AlertTitle>
                    <AlertDescription className="mt-2 space-y-2">
                      <div>
                        <span className="font-semibold">{item.paciente}</span> - {item.procedimento}
                      </div>
                      <div className="text-sm">
                        {item.alertaApac === "sem_apac" 
                          ? `Tratamento iniciará em breve e o paciente não possui APAC autorizada.`
                          : `A APAC vence em ${item.dadosCompletos.apacInfo.dataValidade}. Necessário renovação.`
                        }
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleExtrairInfo(item)}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        <Badge variant="outline" className="text-xs">
                          ✉️ Médico e Admin notificados
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Autorização de Procedimentos de Alta Complexidade (APAC)</CardTitle>
                <CardDescription>
                  Gestão de prazos e documentação para faturamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {procedimentosData.map((item, i) => (
                  <Card key={i} className={`border-l-4 ${
                    item.status === "Aprovado" ? "border-l-success" :
                    item.status === "Atenção" ? "border-l-warning" : "border-l-primary"
                  }`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-semibold">{item.paciente}</p>
                          <p className="text-sm text-muted-foreground">{item.procedimento}</p>
                        </div>
                        <Badge variant={
                          item.status === "Aprovado" ? "default" :
                          item.status === "Atenção" ? "destructive" : "secondary"
                        }>
                          {item.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-1">Etapa atual:</p>
                          <p className="text-sm text-muted-foreground">{item.etapa}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Prazo:</span>
                          <span className="font-medium">{item.prazo}</span>
                        </div>

                        {item.status !== "Aprovado" && (
                          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-sm font-medium mb-2">Próximos passos:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Confirmar realização do procedimento</li>
                              <li>• Anexar laudo médico assinado</li>
                              <li>• Enviar comprovação de medicamentos</li>
                            </ul>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="default"
                            size="sm"
                            onClick={() => handleExtrairInfo(item)}
                          >
                            <Info className="h-4 w-4 mr-2" />
                            Extrair Info
                          </Button>
                          
                          {item.status === "Aprovado" ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedPaciente(item);
                                setShowDocDialog(true);
                              }}
                            >
                              <FileCheck className="h-4 w-4 mr-2" />
                              Ver Docs
                            </Button>
                          ) : (
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedPaciente(item);
                                setShowStatusDialog(true);
                              }}
                            >
                              Atualizar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-6">
            {/* Qualidade do Cuidado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Qualidade do Cuidado
                </CardTitle>
                <CardDescription>Indicadores de qualidade clínica e segurança do paciente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Taxa de Mortalidade</p>
                    <p className="text-3xl font-bold text-foreground">2.1%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• 8 óbitos de 380 pacientes</p>
                      <p>• Mês anterior: 2.4% (9/375)</p>
                      <p>• Média nacional: 2.8%</p>
                    </div>
                    <Badge variant="outline" className="mt-2">↓ 0.3% vs mês anterior</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Taxa de Infecção Hospitalar</p>
                    <p className="text-3xl font-bold text-foreground">1.8%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• 7 casos de 390 internações</p>
                      <p>• Mês anterior: 2.3% (9/391)</p>
                      <p>• Meta institucional: &lt; 2.0%</p>
                    </div>
                    <Badge variant="outline" className="mt-2">↓ 0.5% vs mês anterior</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Adesão a Protocolos Clínicos</p>
                    <p className="text-3xl font-bold text-foreground">94%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• 357 procedimentos em conformidade</p>
                      <p>• Total de 380 procedimentos</p>
                      <p>• Mês anterior: 92% (345/375)</p>
                    </div>
                    <Badge variant="outline" className="mt-2">↑ 2% vs mês anterior</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eficiência */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Eficiência Operacional
                </CardTitle>
                <CardDescription>Métricas de produtividade e gestão de recursos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Ocupação de Leitos</p>
                    <p className="text-3xl font-bold text-foreground">87%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• 174 leitos ocupados</p>
                      <p>• Total de 200 leitos</p>
                      <p>• 26 leitos disponíveis</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Tempo Médio de Espera</p>
                    <p className="text-3xl font-bold text-foreground">12min</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• 1.450 atendimentos/mês</p>
                      <p>• Meta: &lt; 15 minutos</p>
                      <p>• Redução de 18% vs mês anterior</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Produtividade Médica</p>
                    <p className="text-3xl font-bold text-foreground">8.5</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Atendimentos/médico/dia</p>
                      <p>• 45 médicos ativos</p>
                      <p>• Meta: 8.0 atendimentos</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Custo por Internação</p>
                    <p className="text-3xl font-bold text-foreground">R$ 2.8k</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Total gasto: R$ 1.092.000</p>
                      <p>• 390 internações no mês</p>
                      <p>• Redução de 5% vs mês anterior</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Indicadores Financeiros */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-secondary" />
                  Indicadores Financeiros
                </CardTitle>
                <CardDescription>Análise de custos, glosas e rentabilidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Custo Médio por Paciente</p>
                    <p className="text-3xl font-bold text-foreground">R$ 3.2k</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Custo total: R$ 4.928.000</p>
                      <p>• 1.540 pacientes atendidos</p>
                      <p>• Mês anterior: R$ 3.4k (-5.9%)</p>
                    </div>
                    <Badge variant="outline" className="mt-2">Dentro da meta</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Índice de Glosa</p>
                    <p className="text-3xl font-bold text-foreground">4.5%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Valor glosado: R$ 221.760</p>
                      <p>• Faturamento total: R$ 4.928.000</p>
                      <p>• Mês anterior: 5.7% (R$ 289.500)</p>
                    </div>
                    <Badge variant="outline" className="mt-2">↓ 1.2% vs anterior</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Margem Operacional</p>
                    <p className="text-3xl font-bold text-foreground">12.8%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Receita: R$ 5.600.000</p>
                      <p>• Custos: R$ 4.883.200</p>
                      <p>• Lucro: R$ 716.800</p>
                    </div>
                    <Badge variant="outline" className="mt-2">↑ 0.5% vs anterior</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Satisfação e RH */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Satisfação do Paciente
                  </CardTitle>
                  <CardDescription>Métricas de experiência e feedback dos pacientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <p className="text-sm text-muted-foreground">NPS (Net Promoter Score)</p>
                      <p className="text-3xl font-bold text-foreground">72</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• Promotores: 840 (68%)</p>
                        <p>• Neutros: 345 (28%)</p>
                        <p>• Detratores: 50 (4%)</p>
                        <p>• Total de respostas: 1.235</p>
                      </div>
                      <Badge variant="outline" className="mt-2">Excelente</Badge>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <p className="text-sm text-muted-foreground">Reclamações por 1000 pacientes</p>
                      <p className="text-3xl font-bold text-foreground">3.2</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• Total de reclamações: 5</p>
                        <p>• Pacientes atendidos: 1.540</p>
                        <p>• Todas resolvidas em até 48h</p>
                        <p>• Meta: &lt; 5 reclamações/1000</p>
                      </div>
                      <Badge variant="outline" className="mt-2">Abaixo da meta</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recursos Humanos</CardTitle>
                  <CardDescription>Indicadores de gestão de pessoas e clima organizacional</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <p className="text-sm text-muted-foreground">Taxa de Absenteísmo</p>
                      <p className="text-3xl font-bold text-foreground">2.8%</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• 156 ausências no mês</p>
                        <p>• 278 colaboradores ativos</p>
                        <p>• Mês anterior: 3.1%</p>
                        <p>• Meta institucional: &lt; 3.5%</p>
                      </div>
                      <Badge variant="outline" className="mt-2">↓ 0.3% vs anterior</Badge>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <p className="text-sm text-muted-foreground">Satisfação Profissional</p>
                      <p className="text-3xl font-bold text-foreground">8.4/10</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• 234 respostas na pesquisa</p>
                        <p>• Taxa de resposta: 84%</p>
                        <p>• Mês anterior: 8.1/10</p>
                        <p>• Benchmarking setor: 7.8/10</p>
                      </div>
                      <Badge variant="outline" className="mt-2">↑ Acima da média</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="economico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Controle Econômico de Medicamentos</CardTitle>
                <CardDescription>
                  Gestão de gastos e pedidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Gasto Mensal</p>
                    <p className="text-3xl font-bold text-primary">R$ 187k</p>
                    <p className="text-xs text-muted-foreground mt-2">↑ 5% vs mês anterior</p>
                  </div>
                  <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Custo por Paciente</p>
                    <p className="text-3xl font-bold text-secondary">R$ 3.2k</p>
                    <p className="text-xs text-muted-foreground mt-2">Média mensal</p>
                  </div>
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Economia Prevista</p>
                    <p className="text-3xl font-bold text-accent">R$ 12k</p>
                    <p className="text-xs text-muted-foreground mt-2">Com otimizações</p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medicamentos com Estoque Baixo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { nome: "Paclitaxel 100mg", atual: 8, minimo: 10, custo: "R$ 450" },
                      { nome: "Cisplatina 50mg", atual: 12, minimo: 15, custo: "R$ 120" },
                      { nome: "Ondansetrona 8mg", atual: 25, minimo: 30, custo: "R$ 35" },
                    ].map((med, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{med.nome}</p>
                          <p className="text-xs text-muted-foreground">
                            Estoque: {med.atual} / Mínimo: {med.minimo}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{med.custo}</p>
                          <Button variant="outline" size="sm" className="mt-1">
                            Solicitar Pedido
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Parâmetros para Novos Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">📊 Considere o consumo médio mensal</p>
                        <p className="text-muted-foreground">
                          Analise os últimos 3 meses para estimar necessidades futuras
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">⏰ Tempo de entrega dos fornecedores</p>
                        <p className="text-muted-foreground">
                          Média de 15-20 dias úteis. Antecipe pedidos para evitar rupturas
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">💰 Custo-benefício</p>
                        <p className="text-muted-foreground">
                          Compare preços entre fornecedores e considere descontos por volume
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">📅 Validade dos medicamentos</p>
                        <p className="text-muted-foreground">
                          Solicite produtos com validade mínima de 12 meses
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para Atualizar Status */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Atualizar Status do Procedimento</DialogTitle>
            <DialogDescription>
              Atualize o status e adicione observações sobre o procedimento
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Paciente</p>
                <p className="font-semibold">{selectedPaciente?.paciente}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Procedimento</p>
                <p className="font-medium">{selectedPaciente?.procedimento}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status Atual</p>
                <Badge variant={
                  selectedPaciente?.status === "Aprovado" ? "default" :
                  selectedPaciente?.status === "Atenção" ? "destructive" : "secondary"
                }>
                  {selectedPaciente?.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="novo-status">Novo Status</Label>
                <Select value={novoStatus} onValueChange={setNovoStatus}>
                  <SelectTrigger id="novo-status">
                    <SelectValue placeholder="Selecione o novo status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Em Análise">Em Análise</SelectItem>
                    <SelectItem value="Documentação Complementar">Documentação Complementar</SelectItem>
                    <SelectItem value="Aguardando Aprovação">Aguardando Aprovação</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Negado">Negado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Adicione observações sobre a atualização do status..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm font-medium mb-2">Ações Recomendadas:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Verifique se toda documentação necessária está anexada</li>
                  <li>• Confirme os dados do paciente e procedimento</li>
                  <li>• Registre qualquer pendência ou observação relevante</li>
                  <li>• Notifique as partes envolvidas sobre a atualização</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAtualizarStatus}>
                Confirmar Atualização
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para Extrair Informações do Paciente */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Informações Completas do Paciente - APAC</DialogTitle>
            <DialogDescription>
              Dados extraídos para autorização e faturamento APAC
            </DialogDescription>
          </DialogHeader>

          {selectedPaciente?.dadosCompletos && (
            <div className="space-y-6">
              {/* Status APAC */}
              <Card className={`border-l-4 ${
                selectedPaciente.alertaApac === "sem_apac" ? "border-l-destructive bg-destructive/5" :
                selectedPaciente.alertaApac === "vencimento_proximo" ? "border-l-warning bg-warning/5" :
                "border-l-success bg-success/5"
              }`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Status APAC
                      </h4>
                      <p className="text-sm font-medium">
                        {selectedPaciente.dadosCompletos.apacInfo.status}
                      </p>
                      {selectedPaciente.dadosCompletos.apacInfo.numeroApac && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Número: {selectedPaciente.dadosCompletos.apacInfo.numeroApac}
                        </p>
                      )}
                      {selectedPaciente.dadosCompletos.apacInfo.dataEmissao && (
                        <p className="text-sm text-muted-foreground">
                          Emissão: {selectedPaciente.dadosCompletos.apacInfo.dataEmissao} | 
                          Validade: {selectedPaciente.dadosCompletos.apacInfo.dataValidade}
                        </p>
                      )}
                    </div>
                    <Badge variant={
                      selectedPaciente.alertaApac === "sem_apac" ? "destructive" :
                      selectedPaciente.alertaApac === "vencimento_proximo" ? "default" : "outline"
                    }>
                      {selectedPaciente.dadosCompletos.apacInfo.urgencia}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Dados de Identificação */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dados de Identificação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nome Completo</p>
                      <p className="font-medium">{selectedPaciente.dadosCompletos.identificacao.nome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CPF</p>
                      <p className="font-medium">{selectedPaciente.dadosCompletos.identificacao.cpf}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cartão SUS</p>
                      <p className="font-medium">{selectedPaciente.dadosCompletos.identificacao.cartaoSus}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                      <p className="font-medium">{selectedPaciente.dadosCompletos.identificacao.dataNascimento} ({selectedPaciente.dadosCompletos.identificacao.idade})</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{selectedPaciente.dadosCompletos.identificacao.telefone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p className="font-medium">{selectedPaciente.dadosCompletos.identificacao.endereco}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Diagnóstico e CID */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Diagnóstico e Estadiamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Diagnóstico Principal</p>
                    <p className="font-medium text-base">{selectedPaciente.dadosCompletos.diagnostico}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">CID-10</p>
                      <p className="font-semibold text-primary">{selectedPaciente.dadosCompletos.cid}</p>
                    </div>
                    <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Estadiamento</p>
                      <p className="font-semibold text-secondary">{selectedPaciente.dadosCompletos.estadiamento}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tratamento SIGTAP */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tipo de Tratamento (SIGTAP)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-muted-foreground">Código SIGTAP</p>
                      <Badge variant="outline">{selectedPaciente.dadosCompletos.tratamentoSigtap.codigo}</Badge>
                    </div>
                    <p className="font-semibold mb-2">{selectedPaciente.dadosCompletos.tratamentoSigtap.descricao}</p>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground mb-1">Protocolo de Tratamento</p>
                      <p className="text-sm font-medium">{selectedPaciente.dadosCompletos.tratamentoSigtap.protocolo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">Notificações Enviadas</p>
                    <p className="text-sm text-muted-foreground">
                      ✓ Médico responsável notificado sobre a consulta de dados<br/>
                      ✓ Administrador tem acesso aos dados completos para faturamento<br/>
                      {selectedPaciente.alertaApac && "⚠️ Alerta sobre situação da APAC registrado no sistema"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowInfoDialog(false)}>
                  Fechar
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Dados Exportados",
                    description: "Informações do paciente exportadas com sucesso para o sistema APAC.",
                  });
                }}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar para APAC
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para Ver Documentação */}
      <Dialog open={showDocDialog} onOpenChange={setShowDocDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Documentação do Procedimento</DialogTitle>
            <DialogDescription>
              Todos os documentos relacionados ao procedimento APAC
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Paciente</p>
                <p className="font-semibold">{selectedPaciente?.paciente}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Procedimento</p>
                <p className="font-medium">{selectedPaciente?.procedimento}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Status:</p>
                <Badge variant="default">
                  {selectedPaciente?.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Documentos Anexados</h4>
              
              {selectedPaciente?.documentos && selectedPaciente.documentos.length > 0 ? (
                <div className="space-y-2">
                  {selectedPaciente.documentos.map((doc: any, idx: number) => (
                    <Card key={idx} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{doc.nome}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                                <span>📅 Data: {doc.data}</span>
                                <span>👤 Responsável: {doc.responsavel}</span>
                                <span>📄 Tipo: {doc.tipo}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadDoc(doc.nome)}
                            className="shrink-0"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum documento anexado ainda</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-start gap-3">
                <FileCheck className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-1">Documentação Completa</p>
                  <p className="text-sm text-muted-foreground">
                    Todos os documentos necessários foram anexados e o procedimento foi aprovado.
                    Os arquivos estão disponíveis para download e auditoria.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setShowDocDialog(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Administrador;
