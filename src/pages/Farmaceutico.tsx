import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pill, Package, TrendingUp, CheckCircle, Home, QrCode, User, Clock, MapPin, AlertCircle, Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { parseXMLFracionamento, validateXMLFile, DadosFracionamento } from "@/lib/xmlParser";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dispensacaoDialogOpen, setDispensacaoDialogOpen] = useState(false);
  const [medicamentoParaDispensar, setMedicamentoParaDispensar] = useState<any>(null);
  const [medicamentosDispensados, setMedicamentosDispensados] = useState<Medicamento[]>([]);
  
  // Estados para o formulário de dispensação
  const [destinoDispensacao, setDestinoDispensacao] = useState("");
  const [quantidadeDispensacao, setQuantidadeDispensacao] = useState("");
  const [observacaoDispensacao, setObservacaoDispensacao] = useState("");

  // Estados para os novos diálogos
  const [editarDialogOpen, setEditarDialogOpen] = useState(false);
  const [estoqueDialogOpen, setEstoqueDialogOpen] = useState(false);
  const [detalhesDialogOpen, setDetalhesDialogOpen] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState<any>(null);

  // Estados para fracionamento
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [dadosFracionamento, setDadosFracionamento] = useState<DadosFracionamento[]>([]);
  const [isProcessingXML, setIsProcessingXML] = useState(false);
  const [xmlError, setXmlError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessingXML(true);
    setXmlError(null);
    
    try {
      // Validar e ler o arquivo
      const xmlContent = await validateXMLFile(file);
      
      // Parse do XML
      const dados = parseXMLFracionamento(xmlContent);
      
      setXmlFile(file);
      setDadosFracionamento([dados]);
      
      toast({
        title: "Arquivo processado com sucesso",
        description: `${file.name} foi carregado e os dados foram extraídos.`,
      });
    } catch (error: any) {
      setXmlError(error.message || "Erro ao processar o arquivo XML");
      setXmlFile(null);
      setDadosFracionamento([]);
      
      toast({
        title: "Erro ao processar arquivo",
        description: error.message || "Não foi possível processar o arquivo XML.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingXML(false);
    }
  };

  // Notificações de APAC de pacientes - dados vêm da área administrativa
  const notificacoesAPAC = [
    {
      paciente: "Maria Santos Silva",
      dataVencimento: "30/11/2025",
      diasRestantes: 19,
      medicamento: "Doxorrubicina + Ciclofosfamida"
    },
    {
      paciente: "Roberto Lima Santos", 
      dataVencimento: "05/12/2025",
      diasRestantes: 24,
      medicamento: "Rituximab (R-CHOP)"
    }
  ];
  
  const [apacAlertsDismissed, setApacAlertsDismissed] = useState<Set<string>>(new Set());

  // Mock data - catalogação de medicamentos
  const catalogoMedicamentos = [
    {
      categoria: "Antineoplásicos",
      medicamentos: [
        { nome: "Paclitaxel", principioAtivo: "Paclitaxel", concentracao: "100mg/16,7mL", apresentacao: "Frasco-ampola", lote: "L2025001", validade: "12/2026", estoque: 25, estoqueMin: 10 },
        { nome: "Doxorrubicina", principioAtivo: "Cloridrato de Doxorrubicina", concentracao: "50mg/25mL", apresentacao: "Frasco-ampola", lote: "L2025045", validade: "08/2026", estoque: 18, estoqueMin: 8 },
        { nome: "Cisplatina", principioAtivo: "Cisplatina", concentracao: "50mg/50mL", apresentacao: "Frasco-ampola", lote: "L2025-789", validade: "06/2027", estoque: 50, estoqueMin: 15 },
        { nome: "Oxaliplatina", principioAtivo: "Oxaliplatina", concentracao: "100mg/20mL", apresentacao: "Frasco-ampola", lote: "OX2025-12", validade: "03/2027", estoque: 22, estoqueMin: 12 },
        { nome: "Carboplatina", principioAtivo: "Carboplatina", concentracao: "450mg/45mL", apresentacao: "Frasco-ampola", lote: "CARB-567", validade: "11/2026", estoque: 30, estoqueMin: 15 },
        { nome: "Ciclofosfamida", principioAtivo: "Ciclofosfamida", concentracao: "1g", apresentacao: "Frasco-ampola", lote: "CF2025-88", validade: "05/2027", estoque: 45, estoqueMin: 20 },
        { nome: "Vincristina", principioAtivo: "Sulfato de Vincristina", concentracao: "1mg/mL", apresentacao: "Frasco-ampola 1mL", lote: "VCR-234", validade: "07/2026", estoque: 15, estoqueMin: 8 },
        { nome: "Fluorouracil", principioAtivo: "Fluorouracil", concentracao: "500mg/10mL", apresentacao: "Frasco-ampola", lote: "5FU-901", validade: "09/2026", estoque: 38, estoqueMin: 15 },
        { nome: "Gencitabina", principioAtivo: "Cloridrato de Gencitabina", concentracao: "1g", apresentacao: "Frasco-ampola", lote: "GEM-445", validade: "04/2027", estoque: 12, estoqueMin: 10 },
      ]
    },
    {
      categoria: "Imunoterápicos",
      medicamentos: [
        { nome: "Rituximab", principioAtivo: "Rituximab", concentracao: "500mg/50mL", apresentacao: "Frasco-ampola", lote: "R2025-456", validade: "10/2026", estoque: 8, estoqueMin: 5 },
        { nome: "Pembrolizumab", principioAtivo: "Pembrolizumab", concentracao: "100mg/4mL", apresentacao: "Frasco-ampola", lote: "PEMBRO-778", validade: "12/2026", estoque: 6, estoqueMin: 3 },
        { nome: "Nivolumab", principioAtivo: "Nivolumab", concentracao: "100mg/10mL", apresentacao: "Frasco-ampola", lote: "NIVO-332", validade: "01/2027", estoque: 5, estoqueMin: 3 },
        { nome: "Atezolizumab", principioAtivo: "Atezolizumab", concentracao: "1200mg/20mL", apresentacao: "Frasco-ampola", lote: "ATZ-991", validade: "11/2026", estoque: 4, estoqueMin: 2 },
        { nome: "Trastuzumab", principioAtivo: "Trastuzumab", concentracao: "440mg", apresentacao: "Frasco-ampola", lote: "TRAS-556", validade: "08/2026", estoque: 10, estoqueMin: 5 },
      ]
    },
    {
      categoria: "Antieméticos",
      medicamentos: [
        { nome: "Ondansetrona", principioAtivo: "Cloridrato de Ondansetrona", concentracao: "8mg/4mL", apresentacao: "Ampola", lote: "OND-2025", validade: "06/2026", estoque: 120, estoqueMin: 50 },
        { nome: "Metoclopramida", principioAtivo: "Cloridrato de Metoclopramida", concentracao: "10mg/2mL", apresentacao: "Ampola", lote: "MET-789", validade: "09/2026", estoque: 200, estoqueMin: 80 },
        { nome: "Aprepitanto", principioAtivo: "Aprepitanto", concentracao: "125mg", apresentacao: "Cápsula", lote: "APR-445", validade: "07/2027", estoque: 60, estoqueMin: 30 },
        { nome: "Dexametasona", principioAtivo: "Fosfato Dissódico de Dexametasona", concentracao: "4mg/mL", apresentacao: "Ampola 2,5mL", lote: "DEX-2025-11", validade: "10/2026", estoque: 150, estoqueMin: 60 },
      ]
    },
    {
      categoria: "Antibióticos",
      medicamentos: [
        { nome: "Meropenem", principioAtivo: "Meropenem", concentracao: "1g", apresentacao: "Frasco-ampola", lote: "MERO-334", validade: "05/2026", estoque: 40, estoqueMin: 20 },
        { nome: "Vancomicina", principioAtivo: "Cloridrato de Vancomicina", concentracao: "500mg", apresentacao: "Frasco-ampola", lote: "VANCO-887", validade: "08/2026", estoque: 35, estoqueMin: 15 },
        { nome: "Piperacilina + Tazobactam", principioAtivo: "Piperacilina sódica + Tazobactam sódico", concentracao: "4,5g", apresentacao: "Frasco-ampola", lote: "PIPE-221", validade: "04/2027", estoque: 28, estoqueMin: 15 },
        { nome: "Ceftriaxona", principioAtivo: "Ceftriaxona Sódica", concentracao: "1g", apresentacao: "Frasco-ampola", lote: "CEFT-665", validade: "07/2026", estoque: 55, estoqueMin: 25 },
        { nome: "Levofloxacino", principioAtivo: "Levofloxacino", concentracao: "500mg/100mL", apresentacao: "Bolsa", lote: "LEVO-998", validade: "11/2026", estoque: 30, estoqueMin: 15 },
      ]
    },
    {
      categoria: "Suporte e Profilaxia",
      medicamentos: [
        { nome: "Filgrastima", principioAtivo: "Filgrastima", concentracao: "300mcg/mL", apresentacao: "Seringa preenchida 0,5mL", lote: "FILG-123", validade: "09/2026", estoque: 25, estoqueMin: 10 },
        { nome: "Ácido Zoledrônico", principioAtivo: "Ácido Zoledrônico", concentracao: "4mg/5mL", apresentacao: "Frasco-ampola", lote: "ZOLE-456", validade: "10/2026", estoque: 18, estoqueMin: 8 },
        { nome: "Leucovorin", principioAtivo: "Folinato de Cálcio", concentracao: "50mg", apresentacao: "Frasco-ampola", lote: "LEUCO-789", validade: "06/2027", estoque: 40, estoqueMin: 20 },
        { nome: "Mesna", principioAtivo: "Mesna", concentracao: "400mg/4mL", apresentacao: "Ampola", lote: "MESNA-334", validade: "08/2026", estoque: 22, estoqueMin: 12 },
        { nome: "Dipirona", principioAtivo: "Dipirona Sódica", concentracao: "500mg/mL", apresentacao: "Ampola 2mL", lote: "DIP-2025", validade: "12/2026", estoque: 180, estoqueMin: 80 },
      ]
    },
    {
      categoria: "Anticoagulantes",
      medicamentos: [
        { nome: "Enoxaparina", principioAtivo: "Enoxaparina Sódica", concentracao: "40mg/0,4mL", apresentacao: "Seringa preenchida", lote: "ENOX-887", validade: "05/2027", estoque: 95, estoqueMin: 40 },
        { nome: "Heparina", principioAtivo: "Heparina Sódica", concentracao: "5000UI/mL", apresentacao: "Ampola 5mL", lote: "HEP-2025", validade: "07/2026", estoque: 70, estoqueMin: 30 },
        { nome: "Varfarina", principioAtivo: "Varfarina Sódica", concentracao: "5mg", apresentacao: "Comprimido", lote: "VARF-556", validade: "09/2027", estoque: 120, estoqueMin: 50 },
      ]
    }
  ];

  // Mock data - medicamentos gerais combinados com dispensações
  const medicamentosGerais: Medicamento[] = [
    ...medicamentosDispensados,
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

  const handleDispensarMedicamento = (med: any) => {
    setMedicamentoParaDispensar(med);
    setDispensacaoDialogOpen(true);
    setDestinoDispensacao("");
    setQuantidadeDispensacao("");
    setObservacaoDispensacao("");
  };

  const confirmarDispensacao = () => {
    if (!medicamentoParaDispensar || !destinoDispensacao || !quantidadeDispensacao) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o destino e a quantidade.",
        variant: "destructive",
      });
      return;
    }

    const agora = new Date();
    const dataHoraFormatada = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    const novoId = `MED${String(medicamentosDispensados.length + 298 + 1).padStart(3, '0')}`;
    const novoQRCode = `QR-MED-2025-${String(medicamentosDispensados.length + 5).padStart(3, '0')}`;

    const novoMedicamento: Medicamento = {
      id: novoId,
      qrCode: novoQRCode,
      nome: medicamentoParaDispensar.nome,
      lote: medicamentoParaDispensar.lote,
      quantidade: quantidadeDispensacao,
      tipo: "medicamento",
      etapas: [
        {
          nome: "Recebimento",
          status: "concluido",
          responsavel: "Farm. João Silva - CRF 12345",
          dataHora: dataHoraFormatada,
          localizacao: "Farmácia Central",
          observacao: "Medicamento separado do estoque"
        },
        {
          nome: "Armazenamento",
          status: "concluido",
          responsavel: "Farm. João Silva - CRF 12345",
          dataHora: dataHoraFormatada,
          localizacao: "Estoque Principal",
          observacao: "Armazenamento adequado conforme especificações"
        },
        {
          nome: "Dispensação",
          status: "concluido",
          responsavel: "Farm. João Silva - CRF 12345",
          dataHora: dataHoraFormatada,
          localizacao: destinoDispensacao,
          observacao: observacaoDispensacao || "Dispensado conforme solicitação"
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
    };

    setMedicamentosDispensados([novoMedicamento, ...medicamentosDispensados]);
    
    toast({
      title: "Medicamento dispensado",
      description: `${medicamentoParaDispensar.nome} dispensado para ${destinoDispensacao}`,
    });

    setDispensacaoDialogOpen(false);
    setMedicamentoParaDispensar(null);
  };

  const handleEditarMedicamento = (medicamento: any) => {
    setMedicamentoSelecionado(medicamento);
    setEditarDialogOpen(true);
  };

  const handleVerEstoque = (medicamento: any) => {
    setMedicamentoSelecionado(medicamento);
    setEstoqueDialogOpen(true);
  };

  const handleVerDetalhes = (medicamento: any) => {
    setMedicamentoSelecionado(medicamento);
    setDetalhesDialogOpen(true);
  };

  const salvarEdicao = () => {
    toast({
      title: "Medicamento atualizado",
      description: "As informações foram atualizadas com sucesso.",
    });
    setEditarDialogOpen(false);
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/cadastro-farmaceutico")}>
              Cadastro Farmacêutico
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Alertas APAC - Notificações da área administrativa */}
        {notificacoesAPAC
          .filter(notif => !apacAlertsDismissed.has(notif.paciente) && notif.diasRestantes < 30)
          .map((notif) => (
            <Alert key={notif.paciente} variant="destructive" className="mb-4 border-2">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-base font-semibold">
                Alerta: Documentação APAC Vencendo - Paciente {notif.paciente}
              </AlertTitle>
              <AlertDescription className="space-y-2">
                <div className="text-sm">
                  <p>
                    A documentação APAC do paciente <strong>{notif.paciente}</strong> vence em{" "}
                    <strong>{notif.dataVencimento}</strong> (faltam {notif.diasRestantes} dias).
                  </p>
                  <p className="mt-1 text-destructive-foreground/90">
                    ⚠️ Medicamento afetado: <strong>{notif.medicamento}</strong>
                  </p>
                  <p className="mt-1 font-semibold">
                    Sem documentação atualizada, não será possível realizar a distribuição/dispensação.
                  </p>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setApacAlertsDismissed(prev => new Set([...prev, notif.paciente]));
                  }}
                  className="mt-2"
                >
                  Dispensar Notificação
                </Button>
              </AlertDescription>
            </Alert>
          ))
        }

        <Tabs defaultValue="catalogo" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
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
            <TabsTrigger value="fracionamento">
              <Upload className="h-4 w-4 mr-2" />
              Fracionamento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalogo" className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Input placeholder="Buscar medicamento..." className="max-w-md" />
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Adicionar Medicamento</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Medicamento</DialogTitle>
                    <DialogDescription>
                      Preencha os dados para adicionar um novo medicamento ao estoque
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome do Medicamento *</Label>
                        <Input id="nome" placeholder="Ex: Paclitaxel" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="principioAtivo">Princípio Ativo *</Label>
                        <Input id="principioAtivo" placeholder="Ex: Paclitaxel" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="concentracao">Forma / Concentração *</Label>
                        <Input id="concentracao" placeholder="Ex: 100mg/16,7mL" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apresentacao">Apresentação *</Label>
                        <Select>
                          <SelectTrigger id="apresentacao">
                            <SelectValue placeholder="Selecione a apresentação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frasco-ampola">Frasco-ampola</SelectItem>
                            <SelectItem value="ampola">Ampola</SelectItem>
                            <SelectItem value="comprimido">Comprimido</SelectItem>
                            <SelectItem value="capsula">Cápsula</SelectItem>
                            <SelectItem value="seringa">Seringa preenchida</SelectItem>
                            <SelectItem value="bolsa">Bolsa</SelectItem>
                            <SelectItem value="pote">Pote</SelectItem>
                            <SelectItem value="bisnaga">Bisnaga</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="classeTerapeutica">Classe Terapêutica *</Label>
                      <Select>
                        <SelectTrigger id="classeTerapeutica">
                          <SelectValue placeholder="Selecione a classe terapêutica" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="antineoplasicos">Antineoplásicos</SelectItem>
                          <SelectItem value="imunoterapicos">Imunoterápicos</SelectItem>
                          <SelectItem value="antiemeticos">Antieméticos</SelectItem>
                          <SelectItem value="antibioticos">Antibióticos</SelectItem>
                          <SelectItem value="anticoagulantes">Anticoagulantes</SelectItem>
                          <SelectItem value="analgesicos">Analgésicos</SelectItem>
                          <SelectItem value="corticoides">Corticoides</SelectItem>
                          <SelectItem value="suporte">Suporte e Profilaxia</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lote">Lote *</Label>
                        <Input id="lote" placeholder="Ex: L2025001" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="validade">Validade *</Label>
                        <Input id="validade" type="month" placeholder="MM/AAAA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fabricante">Fabricante</Label>
                        <Input id="fabricante" placeholder="Ex: Laboratório XYZ" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="qtdeAtual">Quantidade Atual *</Label>
                        <Input id="qtdeAtual" type="number" placeholder="Ex: 25" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estoqueMin">Estoque Mínimo *</Label>
                        <Input id="estoqueMin" type="number" placeholder="Ex: 10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unidade">Unidade</Label>
                        <Select>
                          <SelectTrigger id="unidade">
                            <SelectValue placeholder="Unidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unidades">Unidades</SelectItem>
                            <SelectItem value="frascos">Frascos</SelectItem>
                            <SelectItem value="ampolas">Ampolas</SelectItem>
                            <SelectItem value="comprimidos">Comprimidos</SelectItem>
                            <SelectItem value="ml">mL</SelectItem>
                            <SelectItem value="mg">mg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="armazenamento">Condições de Armazenamento</Label>
                        <Select>
                          <SelectTrigger id="armazenamento">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ambiente">Temperatura ambiente (15-30°C)</SelectItem>
                            <SelectItem value="refrigerado">Refrigerado (2-8°C)</SelectItem>
                            <SelectItem value="congelado">Congelado (-20°C)</SelectItem>
                            <SelectItem value="proteger-luz">Proteger da luz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="localizacao">Localização no Estoque</Label>
                        <Input id="localizacao" placeholder="Ex: Geladeira A2 - Prateleira 3" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registro">Registro ANVISA / MS</Label>
                      <Input id="registro" placeholder="Ex: 1.0000.0000.000-0" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="observacoes">Observações Técnicas</Label>
                      <Textarea 
                        id="observacoes" 
                        placeholder="Ex: Vesicante - atenção na manipulação. Incompatível com solução salina. Uso exclusivo oncológico..."
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fornecedor">Fornecedor</Label>
                        <Input id="fornecedor" placeholder="Nome do fornecedor" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notaFiscal">Nota Fiscal</Label>
                        <Input id="notaFiscal" placeholder="Número da NF" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => {
                      toast({
                        title: "Medicamento cadastrado",
                        description: "O medicamento foi adicionado ao catálogo com sucesso.",
                      });
                      setDialogOpen(false);
                    }}>
                      Salvar Medicamento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              {catalogoMedicamentos.map((catalogo, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{catalogo.categoria}</CardTitle>
                    <CardDescription>
                      {catalogo.medicamentos.length} medicamentos cadastrados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {catalogo.medicamentos.map((med, i) => {
                        const estoqueAbaixoMin = med.estoque < med.estoqueMin;
                        const estoqueProximoMin = med.estoque < med.estoqueMin * 1.5 && !estoqueAbaixoMin;
                        
                        return (
                          <Card 
                            key={i} 
                            className={`border-l-4 ${
                              estoqueAbaixoMin ? "border-l-destructive" : 
                              estoqueProximoMin ? "border-l-warning" : 
                              "border-l-primary"
                            }`}
                          >
                            <CardContent className="pt-6">
                              <div className="grid md:grid-cols-5 gap-4">
                                <div className="md:col-span-2">
                                  <p className="text-xs text-muted-foreground mb-1">Medicamento</p>
                                  <p className="font-semibold">{med.nome}</p>
                                  <p className="text-sm text-muted-foreground">{med.concentracao}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{med.apresentacao}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Princípio Ativo</p>
                                  <p className="font-medium text-sm">{med.principioAtivo}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Lote / Validade</p>
                                  <p className="font-medium">{med.lote}</p>
                                  <p className="text-sm text-muted-foreground">{med.validade}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Estoque</p>
                                  <p className="font-medium">{med.estoque} unidades</p>
                                  <Badge 
                                    variant={estoqueAbaixoMin ? "destructive" : estoqueProximoMin ? "secondary" : "outline"} 
                                    className="mt-1"
                                  >
                                    Mín: {med.estoqueMin}
                                  </Badge>
                                  {estoqueAbaixoMin && (
                                    <p className="text-xs text-destructive mt-1">⚠️ Estoque baixo</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-end gap-2 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => handleEditarMedicamento(med)}
                                >
                                  Editar
                                </Button>
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => handleDispensarMedicamento(med)}
                                >
                                  Dispensar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => handleVerEstoque(med)}
                                >
                                  Ver Estoque
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => handleVerDetalhes(med)}
                                >
                                  Ver Detalhes
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Excluir
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
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

          <TabsContent value="fracionamento" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fracionamento de Medicamentos</CardTitle>
                <CardDescription>
                  Importe arquivo XML para registrar fracionamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Área de Upload */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.xml';
                        input.onchange = (e: any) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload(file);
                          }
                        };
                        input.click();
                      }}
                      disabled={isProcessingXML}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isProcessingXML ? "Processando..." : "Anexar XML"}
                    </Button>
                    
                    {xmlFile && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{xmlFile.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Área de Drag and Drop */}
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('border-primary');
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove('border-primary');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-primary');
                      
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        handleFileUpload(file);
                      }
                    }}
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.xml';
                      input.onchange = (e: any) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleFileUpload(file);
                        }
                      };
                      input.click();
                    }}
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">Arraste e solte o arquivo XML aqui</p>
                    <p className="text-sm text-muted-foreground">ou clique para selecionar o arquivo</p>
                  </div>

                  {/* Exibir erro de validação */}
                  {xmlError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erro ao processar XML</AlertTitle>
                      <AlertDescription>{xmlError}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Lista de Dados Extraídos */}
                {dadosFracionamento.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Dados Extraídos do XML</h3>
                    
                    {dadosFracionamento.map((dados, index) => (
                      <Card key={index} className="border-primary/20">
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-muted-foreground">Nome do Medicamento</Label>
                              <p className="font-medium">{dados.nomeMedicamento}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Lote</Label>
                              <p className="font-medium">{dados.lote}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-muted-foreground">Quantidade Fracionada</Label>
                              <p className="font-medium">{dados.quantidadeFracionada}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Quantidade Original</Label>
                              <p className="font-medium">{dados.quantidadeOriginal}</p>
                            </div>
                          </div>

                          <div>
                            <Label className="text-muted-foreground">Data do Fracionamento</Label>
                            <p className="font-medium">{dados.dataFracionamento}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-muted-foreground">Código de Barras Original</Label>
                              <p className="font-mono text-sm">{dados.codigoBarrasOriginal}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Código de Barras Fracionado</Label>
                              <p className="font-mono text-sm">{dados.codigoBarrasFracionado}</p>
                            </div>
                          </div>

                          {dados.numeroSerie && (
                            <div>
                              <Label className="text-muted-foreground">Número de Série</Label>
                              <p className="font-medium">{dados.numeroSerie}</p>
                            </div>
                          )}

                          {dados.informacoesMaquina && (
                            <div>
                              <Label className="text-muted-foreground">Informações Adicionais da Máquina</Label>
                              <p className="text-sm">{dados.informacoesMaquina}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}

                    <Button 
                      className="w-full"
                      disabled={dadosFracionamento.length === 0}
                      onClick={() => {
                        toast({
                          title: "Fracionamento salvo",
                          description: "Os dados do fracionamento foram salvos com sucesso.",
                        });
                        setXmlFile(null);
                        setDadosFracionamento([]);
                        setXmlError(null);
                      }}
                    >
                      Salvar Fracionamento
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo de Dispensação */}
      <Dialog open={dispensacaoDialogOpen} onOpenChange={setDispensacaoDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Dispensar Medicamento</DialogTitle>
            <DialogDescription>
              {medicamentoParaDispensar && `${medicamentoParaDispensar.nome} - Lote: ${medicamentoParaDispensar.lote}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="destino">Destino da Dispensação *</Label>
              <Select value={destinoDispensacao} onValueChange={setDestinoDispensacao}>
                <SelectTrigger id="destino">
                  <SelectValue placeholder="Selecione o destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Central de Manipulação">Central de Manipulação</SelectItem>
                  <SelectItem value="Sala de Infusão 1">Sala de Infusão 1</SelectItem>
                  <SelectItem value="Sala de Infusão 2">Sala de Infusão 2</SelectItem>
                  <SelectItem value="Sala de Infusão 3">Sala de Infusão 3</SelectItem>
                  <SelectItem value="Sala de Infusão 4">Sala de Infusão 4</SelectItem>
                  <SelectItem value="Sala de Infusão 5">Sala de Infusão 5</SelectItem>
                  <SelectItem value="Enfermaria Ala A">Enfermaria Ala A</SelectItem>
                  <SelectItem value="Enfermaria Ala B">Enfermaria Ala B</SelectItem>
                  <SelectItem value="Enfermaria Ala C">Enfermaria Ala C</SelectItem>
                  <SelectItem value="UTI">UTI</SelectItem>
                  <SelectItem value="Centro Cirúrgico">Centro Cirúrgico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade Dispensada *</Label>
              <Input 
                id="quantidade" 
                placeholder="Ex: 2 frascos, 100mg, 5 ampolas..." 
                value={quantidadeDispensacao}
                onChange={(e) => setQuantidadeDispensacao(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacao">Observações</Label>
              <Textarea 
                id="observacao" 
                placeholder="Observações sobre a dispensação (opcional)"
                rows={3}
                value={observacaoDispensacao}
                onChange={(e) => setObservacaoDispensacao(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setDispensacaoDialogOpen(false);
                setMedicamentoParaDispensar(null);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={confirmarDispensacao}>
              Confirmar Dispensação
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Editar Medicamento */}
      <Dialog open={editarDialogOpen} onOpenChange={setEditarDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Medicamento</DialogTitle>
            <DialogDescription>
              Atualize as informações do medicamento
            </DialogDescription>
          </DialogHeader>
          
          {medicamentoSelecionado && (
            <div className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Medicamento</Label>
                  <Input defaultValue={medicamentoSelecionado.nome} />
                </div>
                <div className="space-y-2">
                  <Label>Princípio Ativo</Label>
                  <Input defaultValue={medicamentoSelecionado.principioAtivo} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Concentração</Label>
                  <Input defaultValue={medicamentoSelecionado.concentracao} />
                </div>
                <div className="space-y-2">
                  <Label>Apresentação</Label>
                  <Input defaultValue={medicamentoSelecionado.apresentacao} />
                </div>
                <div className="space-y-2">
                  <Label>Lote</Label>
                  <Input defaultValue={medicamentoSelecionado.lote} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Validade</Label>
                  <Input defaultValue={medicamentoSelecionado.validade} />
                </div>
                <div className="space-y-2">
                  <Label>Estoque Atual</Label>
                  <Input type="number" defaultValue={medicamentoSelecionado.estoque} />
                </div>
                <div className="space-y-2">
                  <Label>Estoque Mínimo</Label>
                  <Input type="number" defaultValue={medicamentoSelecionado.estoqueMin} />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setEditarDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={salvarEdicao}>
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Ver Estoque */}
      <Dialog open={estoqueDialogOpen} onOpenChange={setEstoqueDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Estoque</DialogTitle>
            <DialogDescription>
              {medicamentoSelecionado?.nome}
            </DialogDescription>
          </DialogHeader>
          
          {medicamentoSelecionado && (
            <div className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informações de Estoque</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Quantidade Atual</p>
                      <p className="text-2xl font-bold">{medicamentoSelecionado.estoque}</p>
                      <p className="text-xs text-muted-foreground">unidades</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Estoque Mínimo</p>
                      <p className="text-2xl font-bold">{medicamentoSelecionado.estoqueMin}</p>
                      <p className="text-xs text-muted-foreground">unidades</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge 
                        variant={medicamentoSelecionado.estoque < medicamentoSelecionado.estoqueMin ? "destructive" : "default"}
                        className="mt-1"
                      >
                        {medicamentoSelecionado.estoque < medicamentoSelecionado.estoqueMin ? "Baixo" : "Normal"}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-1">Lote</p>
                    <p className="font-medium">{medicamentoSelecionado.lote}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Validade</p>
                    <p className="font-medium">{medicamentoSelecionado.validade}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Histórico de Movimentações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Entrada</p>
                        <p className="text-xs text-muted-foreground">Recebimento - NF 12345</p>
                        <p className="text-xs text-muted-foreground">15/10/2025 10:30</p>
                      </div>
                      <Badge variant="default">+50</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Saída</p>
                        <p className="text-xs text-muted-foreground">Dispensação - Sala Infusão 2</p>
                        <p className="text-xs text-muted-foreground">16/10/2025 14:20</p>
                      </div>
                      <Badge variant="secondary">-15</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Saída</p>
                        <p className="text-xs text-muted-foreground">Dispensação - Central Manipulação</p>
                        <p className="text-xs text-muted-foreground">17/10/2025 09:15</p>
                      </div>
                      <Badge variant="secondary">-10</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Localização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">Geladeira A2 - Prateleira 3</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Armazenamento: Refrigerado (2-8°C)
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Ver Detalhes */}
      <Dialog open={detalhesDialogOpen} onOpenChange={setDetalhesDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes Completos do Medicamento</DialogTitle>
            <DialogDescription>
              Informações técnicas e regulatórias
            </DialogDescription>
          </DialogHeader>
          
          {medicamentoSelecionado && (
            <div className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Identificação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Nome Comercial</p>
                    <p className="font-medium">{medicamentoSelecionado.nome}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Princípio Ativo</p>
                    <p className="font-medium">{medicamentoSelecionado.principioAtivo}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Concentração</p>
                      <p className="font-medium">{medicamentoSelecionado.concentracao}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Apresentação</p>
                      <p className="font-medium">{medicamentoSelecionado.apresentacao}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informações do Lote</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Número do Lote</p>
                      <p className="font-medium">{medicamentoSelecionado.lote}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Validade</p>
                      <p className="font-medium">{medicamentoSelecionado.validade}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Armazenamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Condições</p>
                    <p className="font-medium">Refrigerado (2-8°C)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Localização</p>
                    <p className="font-medium">Geladeira A2 - Prateleira 3</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Observações</p>
                    <p className="text-sm">Proteger da luz. Manter sob refrigeração.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informações Regulatórias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Registro ANVISA</p>
                    <p className="font-medium">1.0000.0000.000-0</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Classe Terapêutica</p>
                    <p className="font-medium">Antineoplásico</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Restrições</p>
                    <Badge variant="destructive" className="mr-2">Uso Hospitalar</Badge>
                    <Badge variant="secondary">Portaria 344/98</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Observações Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Medicamento vesicante - atenção especial na manipulação. 
                    Incompatível com solução salina. Uso exclusivo oncológico.
                    Preparação em cabine de fluxo laminar obrigatória.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Farmaceutico;
