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
import { useState, useMemo } from "react";
import { toast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Administrador = () => {
  const navigate = useNavigate();
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showDocDialog, setShowDocDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [novoStatus, setNovoStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");
  
  // Estados dos filtros
  const [periodoFiltro, setPeriodoFiltro] = useState("mensal");
  const [departamentoFiltro, setDepartamentoFiltro] = useState("todos");

  // Função para calcular dados baseado nos filtros
  const dadosFiltrados = useMemo(() => {
    // Multiplicadores baseados no período
    const multiplicadorPeriodo = {
      semanal: 0.25,
      mensal: 1,
      trimestral: 3,
      anual: 12
    }[periodoFiltro];

    // Ajustes baseados no departamento
    const ajustesDepartamento = {
      todos: { mortalidade: 2.1, infeccao: 1.8, protocolos: 94, ocupacao: 87, espera: 12, produtividade: 8.5, custoInternacao: 2.8 },
      oncologia: { mortalidade: 1.9, infeccao: 1.5, protocolos: 96, ocupacao: 92, espera: 10, produtividade: 9.2, custoInternacao: 3.1 },
      quimioterapia: { mortalidade: 2.3, infeccao: 2.1, protocolos: 93, ocupacao: 85, espera: 8, produtividade: 7.8, custoInternacao: 2.5 },
      radioterapia: { mortalidade: 1.7, infeccao: 1.2, protocolos: 97, ocupacao: 78, espera: 15, produtividade: 8.8, custoInternacao: 2.2 },
      cirurgia: { mortalidade: 2.8, infeccao: 2.5, protocolos: 91, ocupacao: 95, espera: 18, produtividade: 6.5, custoInternacao: 4.2 },
      internacao: { mortalidade: 2.5, infeccao: 2.2, protocolos: 92, ocupacao: 89, espera: 14, produtividade: 7.2, custoInternacao: 3.5 },
      ambulatorio: { mortalidade: 1.4, infeccao: 1.0, protocolos: 95, ocupacao: 82, espera: 9, produtividade: 9.8, custoInternacao: 1.8 }
    }[departamentoFiltro];

    const base = ajustesDepartamento;
    
    // Calcular números absolutos baseados no período
    const pacientes = Math.round(380 * multiplicadorPeriodo);
    const obitos = Math.round((pacientes * base.mortalidade) / 100);
    const internacoes = Math.round(390 * multiplicadorPeriodo);
    const infeccoes = Math.round((internacoes * base.infeccao) / 100);
    const procedimentos = Math.round(380 * multiplicadorPeriodo);
    const conformidade = Math.round((procedimentos * base.protocolos) / 100);
    
    // Leitos (não varia com período, apenas com departamento)
    const leitosTotal = departamentoFiltro === "todos" ? 200 : 
                        departamentoFiltro === "cirurgia" ? 85 :
                        departamentoFiltro === "internacao" ? 120 : 
                        departamentoFiltro === "oncologia" ? 95 : 50;
    const leitosOcupados = Math.round((leitosTotal * base.ocupacao) / 100);
    
    // Atendimentos e custos escalam com período
    const atendimentos = Math.round(1450 * multiplicadorPeriodo);
    const internacoesCalc = Math.round(390 * multiplicadorPeriodo);
    const custoTotalInternacao = internacoesCalc * base.custoInternacao * 1000;
    
    // Médicos (não varia com período)
    const medicos = departamentoFiltro === "todos" ? 45 : 
                    departamentoFiltro === "oncologia" ? 18 :
                    departamentoFiltro === "quimioterapia" ? 12 :
                    departamentoFiltro === "cirurgia" ? 15 : 8;
    
    // Financeiro escala com período
    const pacientesAtendidos = Math.round(1540 * multiplicadorPeriodo);
    const custoTotal = Math.round(4928000 * multiplicadorPeriodo);
    const custoPorPaciente = custoTotal / pacientesAtendidos;
    const faturamento = Math.round(4928000 * multiplicadorPeriodo);
    const glosa = departamentoFiltro === "todos" ? 4.5 :
                  departamentoFiltro === "cirurgia" ? 5.8 :
                  departamentoFiltro === "radioterapia" ? 3.2 : 4.1;
    const valorGlosado = (faturamento * glosa) / 100;
    
    const receita = Math.round(5600000 * multiplicadorPeriodo);
    const custos = Math.round(4883200 * multiplicadorPeriodo);
    const lucro = receita - custos;
    const margemOperacional = ((lucro / receita) * 100).toFixed(1);
    
    // NPS e satisfação variam por departamento
    const nps = departamentoFiltro === "todos" ? 72 :
                departamentoFiltro === "ambulatorio" ? 78 :
                departamentoFiltro === "oncologia" ? 75 :
                departamentoFiltro === "cirurgia" ? 68 : 71;
    
    const respostasNPS = Math.round(1235 * multiplicadorPeriodo);
    const promotores = Math.round((respostasNPS * (nps + 28)) / 100);
    const neutros = Math.round((respostasNPS * 28) / 100);
    const detratores = respostasNPS - promotores - neutros;
    
    const reclamacoes = Math.round((pacientesAtendidos * 3.2) / 1000);
    
    // RH (não escala linearmente com período)
    const colaboradores = 278;
    const ausencias = Math.round(156 * multiplicadorPeriodo);
    const absenteismo = ((ausencias / (colaboradores * (periodoFiltro === "semanal" ? 7 : periodoFiltro === "mensal" ? 30 : periodoFiltro === "trimestral" ? 90 : 365))) * 100).toFixed(1);
    const satisfacaoProfissional = departamentoFiltro === "todos" ? 8.4 :
                                    departamentoFiltro === "oncologia" ? 8.7 :
                                    departamentoFiltro === "cirurgia" ? 8.0 : 8.3;
    const respostasPesquisa = Math.round(234 * (periodoFiltro === "anual" ? 1 : periodoFiltro === "trimestral" ? 1 : periodoFiltro === "mensal" ? 1 : 0.25));

    return {
      qualidade: {
        mortalidade: base.mortalidade.toFixed(1),
        obitos,
        pacientes,
        infeccao: base.infeccao.toFixed(1),
        infeccoes,
        internacoes,
        protocolos: base.protocolos,
        conformidade,
        procedimentos
      },
      eficiencia: {
        ocupacao: base.ocupacao,
        leitosOcupados,
        leitosTotal,
        espera: base.espera,
        atendimentos,
        produtividade: base.produtividade.toFixed(1),
        medicos,
        custoInternacao: base.custoInternacao.toFixed(1),
        custoTotalInternacao: custoTotalInternacao.toLocaleString('pt-BR'),
        internacoesCalc
      },
      financeiro: {
        custoPorPaciente: (custoPorPaciente / 1000).toFixed(1),
        custoTotal: custoTotal.toLocaleString('pt-BR'),
        pacientesAtendidos,
        glosa: glosa.toFixed(1),
        valorGlosado: valorGlosado.toLocaleString('pt-BR'),
        faturamento: faturamento.toLocaleString('pt-BR'),
        margemOperacional,
        receita: receita.toLocaleString('pt-BR'),
        custos: custos.toLocaleString('pt-BR'),
        lucro: lucro.toLocaleString('pt-BR')
      },
      satisfacao: {
        nps,
        respostasNPS,
        promotores,
        neutros,
        detratores,
        reclamacoes,
        pacientesAtendidos
      },
      rh: {
        absenteismo,
        ausencias,
        colaboradores,
        satisfacaoProfissional: satisfacaoProfissional.toFixed(1),
        respostasPesquisa
      }
    };
  }, [periodoFiltro, departamentoFiltro]);

  // Gerar dados temporais para os gráficos
  const dadosGraficos = useMemo(() => {
    const numPontos = periodoFiltro === "semanal" ? 7 : 
                      periodoFiltro === "mensal" ? 4 : 
                      periodoFiltro === "trimestral" ? 12 : 12;
    
    const labelPeriodo = periodoFiltro === "semanal" ? "Dia" : 
                         periodoFiltro === "mensal" ? "Semana" : 
                         periodoFiltro === "trimestral" ? "Semana" : "Mês";

    const ajustesDepartamento = {
      todos: { mortalidade: 2.1, infeccao: 1.8, nps: 72 },
      oncologia: { mortalidade: 1.9, infeccao: 1.5, nps: 75 },
      quimioterapia: { mortalidade: 2.3, infeccao: 2.1, nps: 71 },
      radioterapia: { mortalidade: 1.7, infeccao: 1.2, nps: 73 },
      cirurgia: { mortalidade: 2.8, infeccao: 2.5, nps: 68 },
      internacao: { mortalidade: 2.5, infeccao: 2.2, nps: 70 },
      ambulatorio: { mortalidade: 1.4, infeccao: 1.0, nps: 78 }
    }[departamentoFiltro];

    return Array.from({ length: numPontos }, (_, i) => {
      const variacao = Math.sin(i / 2) * 0.3;
      return {
        periodo: `${labelPeriodo} ${i + 1}`,
        mortalidade: parseFloat((ajustesDepartamento.mortalidade + variacao).toFixed(1)),
        infeccao: parseFloat((ajustesDepartamento.infeccao + variacao * 0.5).toFixed(1)),
        nps: Math.round(ajustesDepartamento.nps + variacao * 3)
      };
    });
  }, [periodoFiltro, departamentoFiltro]);

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
            {/* Filtros */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros de Visualização</CardTitle>
                <CardDescription>
                  Selecione o período e departamento para visualizar os indicadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="periodo">Período</Label>
                    <Select value={periodoFiltro} onValueChange={(value) => {
                      setPeriodoFiltro(value);
                      toast({
                        title: "Filtro de período atualizado",
                        description: `Os dados estão sendo exibidos para: ${
                          value === "semanal" ? "Última semana" :
                          value === "mensal" ? "Último mês" :
                          value === "trimestral" ? "Últimos 3 meses" : "Últimos 12 meses"
                        }`,
                      });
                    }}>
                      <SelectTrigger id="periodo">
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semanal">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Semanal (Última semana)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="mensal">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Mensal (Último mês)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="trimestral">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Trimestral (Últimos 3 meses)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="anual">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Anual (Últimos 12 meses)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departamento">Departamento/Setor</Label>
                    <Select value={departamentoFiltro} onValueChange={(value) => {
                      setDepartamentoFiltro(value);
                      toast({
                        title: "Filtro de departamento atualizado",
                        description: `Os dados estão sendo exibidos para: ${
                          value === "todos" ? "Todos os Departamentos" :
                          value === "oncologia" ? "Oncologia Clínica" :
                          value === "quimioterapia" ? "Quimioterapia" :
                          value === "radioterapia" ? "Radioterapia" :
                          value === "cirurgia" ? "Cirurgia Oncológica" :
                          value === "internacao" ? "Internação" : "Ambulatório"
                        }`,
                      });
                    }}>
                      <SelectTrigger id="departamento">
                        <SelectValue placeholder="Selecione o departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">
                          <span className="font-medium">Todos os Departamentos</span>
                        </SelectItem>
                        <SelectItem value="oncologia">
                          <span>Oncologia Clínica</span>
                        </SelectItem>
                        <SelectItem value="quimioterapia">
                          <span>Quimioterapia</span>
                        </SelectItem>
                        <SelectItem value="radioterapia">
                          <span>Radioterapia</span>
                        </SelectItem>
                        <SelectItem value="cirurgia">
                          <span>Cirurgia Oncológica</span>
                        </SelectItem>
                        <SelectItem value="internacao">
                          <span>Internação</span>
                        </SelectItem>
                        <SelectItem value="ambulatorio">
                          <span>Ambulatório</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Badges dos filtros ativos */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">Filtros ativos:</span>
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    {periodoFiltro === "semanal" && "Última semana"}
                    {periodoFiltro === "mensal" && "Último mês"}
                    {periodoFiltro === "trimestral" && "Últimos 3 meses"}
                    {periodoFiltro === "anual" && "Últimos 12 meses"}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" />
                    {departamentoFiltro === "todos" && "Todos os Departamentos"}
                    {departamentoFiltro === "oncologia" && "Oncologia Clínica"}
                    {departamentoFiltro === "quimioterapia" && "Quimioterapia"}
                    {departamentoFiltro === "radioterapia" && "Radioterapia"}
                    {departamentoFiltro === "cirurgia" && "Cirurgia Oncológica"}
                    {departamentoFiltro === "internacao" && "Internação"}
                    {departamentoFiltro === "ambulatorio" && "Ambulatório"}
                  </Badge>
                  {(periodoFiltro !== "mensal" || departamentoFiltro !== "todos") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setPeriodoFiltro("mensal");
                        setDepartamentoFiltro("todos");
                        toast({
                          title: "Filtros redefinidos",
                          description: "Os filtros foram restaurados para os valores padrão.",
                        });
                      }}
                      className="h-6 text-xs"
                    >
                      Limpar filtros
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Alerta informativo sobre os filtros */}
            {(periodoFiltro !== "mensal" || departamentoFiltro !== "todos") && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Dados Filtrados</AlertTitle>
                <AlertDescription>
                  Os indicadores abaixo estão sendo exibidos com base nos filtros selecionados:
                  <strong> {periodoFiltro === "semanal" ? "Última semana" : periodoFiltro === "mensal" ? "Último mês" : periodoFiltro === "trimestral" ? "Últimos 3 meses" : "Últimos 12 meses"}</strong>
                  {departamentoFiltro !== "todos" && (
                    <> e <strong>
                      {departamentoFiltro === "oncologia" ? "Oncologia Clínica" : 
                       departamentoFiltro === "quimioterapia" ? "Quimioterapia" :
                       departamentoFiltro === "radioterapia" ? "Radioterapia" :
                       departamentoFiltro === "cirurgia" ? "Cirurgia Oncológica" :
                       departamentoFiltro === "internacao" ? "Internação" : "Ambulatório"}
                    </strong></>
                  )}
                  .
                </AlertDescription>
              </Alert>
            )}

            {/* Gráficos de Evolução Temporal */}
            <Card id="graficos-container">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Evolução Temporal dos Indicadores
                </CardTitle>
                <CardDescription>
                  Acompanhe a tendência dos principais indicadores ao longo do período selecionado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Gráfico de Taxa de Mortalidade */}
                <div>
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    Taxa de Mortalidade (%)
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dadosGraficos}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="periodo" 
                        className="text-xs"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        className="text-xs"
                        stroke="hsl(var(--muted-foreground))"
                        domain={[0, 'auto']}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Mortalidade']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mortalidade" 
                        stroke="hsl(0, 84%, 60%)" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(0, 84%, 60%)', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico de Taxa de Infecção */}
                <div>
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    Taxa de Infecção Hospitalar (%)
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dadosGraficos}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="periodo" 
                        className="text-xs"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        className="text-xs"
                        stroke="hsl(var(--muted-foreground))"
                        domain={[0, 'auto']}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Infecção']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="infeccao" 
                        stroke="hsl(25, 95%, 53%)" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(25, 95%, 53%)', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico de NPS */}
                <div>
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    NPS - Net Promoter Score
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dadosGraficos}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="periodo" 
                        className="text-xs"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        className="text-xs"
                        stroke="hsl(var(--muted-foreground))"
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                        formatter={(value: number) => [value, 'NPS']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="nps" 
                        stroke="hsl(142, 76%, 36%)" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(142, 76%, 36%)', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

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
                    <p className="text-3xl font-bold text-foreground">{dadosFiltrados.qualidade.mortalidade}%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• {dadosFiltrados.qualidade.obitos} óbitos de {dadosFiltrados.qualidade.pacientes} pacientes</p>
                      <p>• Período anterior: 2.4%</p>
                      <p>• Média nacional: 2.8%</p>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {parseFloat(dadosFiltrados.qualidade.mortalidade) < 2.4 ? "↓" : "↑"} 
                      {Math.abs(parseFloat(dadosFiltrados.qualidade.mortalidade) - 2.4).toFixed(1)}% vs anterior
                    </Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Taxa de Infecção Hospitalar</p>
                    <p className="text-3xl font-bold text-foreground">{dadosFiltrados.qualidade.infeccao}%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• {dadosFiltrados.qualidade.infeccoes} casos de {dadosFiltrados.qualidade.internacoes} internações</p>
                      <p>• Período anterior: 2.3%</p>
                      <p>• Meta institucional: &lt; 2.0%</p>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {parseFloat(dadosFiltrados.qualidade.infeccao) < 2.3 ? "↓" : "↑"}
                      {Math.abs(parseFloat(dadosFiltrados.qualidade.infeccao) - 2.3).toFixed(1)}% vs anterior
                    </Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Adesão a Protocolos Clínicos</p>
                    <p className="text-3xl font-bold text-foreground">{dadosFiltrados.qualidade.protocolos}%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• {dadosFiltrados.qualidade.conformidade} procedimentos em conformidade</p>
                      <p>• Total de {dadosFiltrados.qualidade.procedimentos} procedimentos</p>
                      <p>• Período anterior: 92%</p>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {dadosFiltrados.qualidade.protocolos > 92 ? "↑" : "↓"}
                      {Math.abs(dadosFiltrados.qualidade.protocolos - 92)}% vs anterior
                    </Badge>
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
                    <p className="text-3xl font-bold text-foreground">{dadosFiltrados.eficiencia.ocupacao}%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• {dadosFiltrados.eficiencia.leitosOcupados} leitos ocupados</p>
                      <p>• Total de {dadosFiltrados.eficiencia.leitosTotal} leitos</p>
                      <p>• {dadosFiltrados.eficiencia.leitosTotal - dadosFiltrados.eficiencia.leitosOcupados} leitos disponíveis</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Tempo Médio de Espera</p>
                    <p className="text-3xl font-bold text-foreground">{dadosFiltrados.eficiencia.espera}min</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• {dadosFiltrados.eficiencia.atendimentos.toLocaleString('pt-BR')} atendimentos no período</p>
                      <p>• Meta: &lt; 15 minutos</p>
                      <p>• {dadosFiltrados.eficiencia.espera < 15 ? "Dentro da meta" : "Acima da meta"}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Produtividade Médica</p>
                    <p className="text-3xl font-bold text-foreground">{dadosFiltrados.eficiencia.produtividade}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Atendimentos/médico/dia</p>
                      <p>• {dadosFiltrados.eficiencia.medicos} médicos ativos</p>
                      <p>• Meta: 8.0 atendimentos</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Custo por Internação</p>
                    <p className="text-3xl font-bold text-foreground">R$ {dadosFiltrados.eficiencia.custoInternacao}k</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Total gasto: R$ {dadosFiltrados.eficiencia.custoTotalInternacao}</p>
                      <p>• {dadosFiltrados.eficiencia.internacoesCalc} internações no período</p>
                      <p>• Controle de custos ativo</p>
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
                    <p className="text-3xl font-bold text-foreground">R$ {dadosFiltrados.financeiro.custoPorPaciente}k</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Custo total: R$ {dadosFiltrados.financeiro.custoTotal}</p>
                      <p>• {dadosFiltrados.financeiro.pacientesAtendidos.toLocaleString('pt-BR')} pacientes atendidos</p>
                      <p>• Período anterior: R$ 3.4k</p>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {parseFloat(dadosFiltrados.financeiro.custoPorPaciente) < 3.4 ? "↓ Redução de custos" : "Dentro da meta"}
                    </Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Índice de Glosa</p>
                    <p className="text-3xl font-bold text-foreground">{dadosFiltrados.financeiro.glosa}%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Valor glosado: R$ {dadosFiltrados.financeiro.valorGlosado}</p>
                      <p>• Faturamento total: R$ {dadosFiltrados.financeiro.faturamento}</p>
                      <p>• Período anterior: 5.7%</p>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {parseFloat(dadosFiltrados.financeiro.glosa) < 5.7 ? "↓" : "↑"}
                      {Math.abs(parseFloat(dadosFiltrados.financeiro.glosa) - 5.7).toFixed(1)}% vs anterior
                    </Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Margem Operacional</p>
                    <p className="text-3xl font-bold text-foreground">{dadosFiltrados.financeiro.margemOperacional}%</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Receita: R$ {dadosFiltrados.financeiro.receita}</p>
                      <p>• Custos: R$ {dadosFiltrados.financeiro.custos}</p>
                      <p>• Lucro: R$ {dadosFiltrados.financeiro.lucro}</p>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {parseFloat(dadosFiltrados.financeiro.margemOperacional) > 12 ? "↑ Acima da meta" : "Positivo"}
                    </Badge>
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
                      <p className="text-3xl font-bold text-foreground">{dadosFiltrados.satisfacao.nps}</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• Promotores: {dadosFiltrados.satisfacao.promotores} ({Math.round((dadosFiltrados.satisfacao.promotores/dadosFiltrados.satisfacao.respostasNPS)*100)}%)</p>
                        <p>• Neutros: {dadosFiltrados.satisfacao.neutros} ({Math.round((dadosFiltrados.satisfacao.neutros/dadosFiltrados.satisfacao.respostasNPS)*100)}%)</p>
                        <p>• Detratores: {dadosFiltrados.satisfacao.detratores} ({Math.round((dadosFiltrados.satisfacao.detratores/dadosFiltrados.satisfacao.respostasNPS)*100)}%)</p>
                        <p>• Total de respostas: {dadosFiltrados.satisfacao.respostasNPS.toLocaleString('pt-BR')}</p>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {dadosFiltrados.satisfacao.nps >= 70 ? "Excelente" : dadosFiltrados.satisfacao.nps >= 50 ? "Bom" : "Regular"}
                      </Badge>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <p className="text-sm text-muted-foreground">Reclamações por 1000 pacientes</p>
                      <p className="text-3xl font-bold text-foreground">{(dadosFiltrados.satisfacao.reclamacoes / (dadosFiltrados.satisfacao.pacientesAtendidos / 1000)).toFixed(1)}</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• Total de reclamações: {dadosFiltrados.satisfacao.reclamacoes}</p>
                        <p>• Pacientes atendidos: {dadosFiltrados.satisfacao.pacientesAtendidos.toLocaleString('pt-BR')}</p>
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
                      <p className="text-3xl font-bold text-foreground">{dadosFiltrados.rh.absenteismo}%</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• {dadosFiltrados.rh.ausencias} ausências no período</p>
                        <p>• {dadosFiltrados.rh.colaboradores} colaboradores ativos</p>
                        <p>• Período: {periodoFiltro === "semanal" ? "Última semana" : periodoFiltro === "mensal" ? "Último mês" : periodoFiltro === "trimestral" ? "Últimos 3 meses" : "Último ano"}</p>
                        <p>• Meta institucional: &lt; 3.5%</p>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {parseFloat(dadosFiltrados.rh.absenteismo) < 3.5 ? "↓ Abaixo da meta" : "Atenção"}
                      </Badge>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <p className="text-sm text-muted-foreground">Satisfação Profissional</p>
                      <p className="text-3xl font-bold text-foreground">{dadosFiltrados.rh.satisfacaoProfissional}/10</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• {dadosFiltrados.rh.respostasPesquisa} respostas na pesquisa</p>
                        <p>• Taxa de resposta: {Math.round((dadosFiltrados.rh.respostasPesquisa/dadosFiltrados.rh.colaboradores)*100)}%</p>
                        <p>• Período anterior: 8.1/10</p>
                        <p>• Benchmarking setor: 7.8/10</p>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {parseFloat(dadosFiltrados.rh.satisfacaoProfissional) > 7.8 ? "↑ Acima da média" : "Dentro da média"}
                      </Badge>
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
