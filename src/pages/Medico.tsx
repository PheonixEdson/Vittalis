import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Users, ClipboardCheck, Home, AlertCircle, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

// Valores de referência para exames
const valoresReferencia: Record<string, { min?: string; max?: string; valor?: string }> = {
  hemoglobina: { min: "12.0", max: "16.0" },
  leucocitos: { min: "4.000", max: "11.000" },
  plaquetas: { min: "150.000", max: "400.000" },
  creatinina: { min: "0.6", max: "1.2" },
  ureia: { min: "15", max: "45" },
  tgo: { max: "40" },
  tgp: { max: "41" },
  ldh: { min: "120", max: "246" },
  ca153: { max: "31.3" },
  cea: { max: "3.0" },
  ca125: { max: "35" },
  cvf: { min: "80%" },
  vef1: { min: "80%" },
};

// Mock data de exames com histórico (até 4 registros)
const examesData: Record<number, any[]> = {
  1: [
    {
      tipo: "Hemograma Completo",
      historico: [
        { data: "25/10/2025", hemoglobina: "12.5", leucocitos: "7.200", plaquetas: "180.000", responsavel: "Dra. Ana Paula Santos", crm: "CRM-SP 123456" },
        { data: "18/10/2025", hemoglobina: "12.8", leucocitos: "7.500", plaquetas: "185.000", responsavel: "Dr. Carlos Eduardo Lima", crm: "CRM-SP 234567" },
        { data: "11/10/2025", hemoglobina: "13.0", leucocitos: "7.000", plaquetas: "190.000", responsavel: "Dra. Ana Paula Santos", crm: "CRM-SP 123456" },
        { data: "04/10/2025", hemoglobina: "13.2", leucocitos: "6.800", plaquetas: "195.000", responsavel: "Dr. Carlos Eduardo Lima", crm: "CRM-SP 234567" },
      ]
    },
    {
      tipo: "Bioquímica",
      historico: [
        { data: "25/10/2025", creatinina: "0.9", ureia: "32", tgo: "28", tgp: "25", responsavel: "Dr. Ricardo Almeida", crm: "CRM-SP 345678" },
        { data: "18/10/2025", creatinina: "0.8", ureia: "30", tgo: "26", tgp: "24", responsavel: "Dr. Ricardo Almeida", crm: "CRM-SP 345678" },
        { data: "11/10/2025", creatinina: "0.9", ureia: "31", tgo: "27", tgp: "26", responsavel: "Dra. Mariana Costa", crm: "CRM-SP 456789" },
      ]
    },
    {
      tipo: "Marcadores Tumorais",
      historico: [
        { data: "25/10/2025", ca153: "25", cea: "2.8", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
        { data: "11/10/2025", ca153: "28", cea: "3.2", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
      ]
    },
  ],
  2: [
    {
      tipo: "Hemograma Completo",
      historico: [
        { data: "25/10/2025", hemoglobina: "13.2", leucocitos: "6.800", plaquetas: "195.000", responsavel: "Dra. Ana Paula Santos", crm: "CRM-SP 123456" },
        { data: "18/10/2025", hemoglobina: "13.0", leucocitos: "7.000", plaquetas: "190.000", responsavel: "Dr. Carlos Eduardo Lima", crm: "CRM-SP 234567" },
        { data: "11/10/2025", hemoglobina: "12.8", leucocitos: "7.200", plaquetas: "188.000", responsavel: "Dra. Ana Paula Santos", crm: "CRM-SP 123456" },
      ]
    },
    {
      tipo: "Bioquímica",
      historico: [
        { data: "25/10/2025", creatinina: "1.0", ureia: "35", tgo: "30", tgp: "28", responsavel: "Dr. Ricardo Almeida", crm: "CRM-SP 345678" },
        { data: "18/10/2025", creatinina: "0.9", ureia: "33", tgo: "29", tgp: "27", responsavel: "Dra. Mariana Costa", crm: "CRM-SP 456789" },
      ]
    },
    {
      tipo: "LDH",
      historico: [
        { data: "25/10/2025", ldh: "245", responsavel: "Dr. Ricardo Almeida", crm: "CRM-SP 345678" },
        { data: "18/10/2025", ldh: "240", responsavel: "Dr. Ricardo Almeida", crm: "CRM-SP 345678" },
        { data: "11/10/2025", ldh: "238", responsavel: "Dra. Mariana Costa", crm: "CRM-SP 456789" },
      ]
    },
  ],
  3: [
    {
      tipo: "Hemograma Completo",
      historico: [
        { data: "25/10/2025", hemoglobina: "11.8", leucocitos: "6.500", plaquetas: "175.000", responsavel: "Dr. Carlos Eduardo Lima", crm: "CRM-SP 234567" },
        { data: "18/10/2025", hemoglobina: "12.0", leucocitos: "6.800", plaquetas: "180.000", responsavel: "Dra. Ana Paula Santos", crm: "CRM-SP 123456" },
        { data: "11/10/2025", hemoglobina: "12.2", leucocitos: "7.000", plaquetas: "182.000", responsavel: "Dr. Carlos Eduardo Lima", crm: "CRM-SP 234567" },
      ]
    },
    {
      tipo: "Bioquímica",
      historico: [
        { data: "25/10/2025", creatinina: "0.8", ureia: "30", tgo: "26", tgp: "24", responsavel: "Dra. Mariana Costa", crm: "CRM-SP 456789" },
        { data: "18/10/2025", creatinina: "0.9", ureia: "32", tgo: "28", tgp: "25", responsavel: "Dr. Ricardo Almeida", crm: "CRM-SP 345678" },
      ]
    },
    {
      tipo: "Função Pulmonar",
      historico: [
        { data: "25/10/2025", cvf: "85%", vef1: "80%", responsavel: "Dr. Paulo Henrique Dias", crm: "CRM-SP 678901" },
        { data: "11/10/2025", cvf: "82%", vef1: "78%", responsavel: "Dr. Paulo Henrique Dias", crm: "CRM-SP 678901" },
      ]
    },
  ],
  4: [
    {
      tipo: "Hemograma Completo",
      historico: [
        { data: "25/10/2025", hemoglobina: "12.0", leucocitos: "7.000", plaquetas: "190.000", responsavel: "Dra. Ana Paula Santos", crm: "CRM-SP 123456" },
        { data: "18/10/2025", hemoglobina: "12.2", leucocitos: "7.200", plaquetas: "192.000", responsavel: "Dr. Carlos Eduardo Lima", crm: "CRM-SP 234567" },
        { data: "11/10/2025", hemoglobina: "12.5", leucocitos: "7.500", plaquetas: "195.000", responsavel: "Dra. Ana Paula Santos", crm: "CRM-SP 123456" },
      ]
    },
    {
      tipo: "Bioquímica",
      historico: [
        { data: "25/10/2025", creatinina: "0.9", ureia: "33", tgo: "29", tgp: "27", responsavel: "Dr. Ricardo Almeida", crm: "CRM-SP 345678" },
        { data: "18/10/2025", creatinina: "0.8", ureia: "31", tgo: "28", tgp: "26", responsavel: "Dra. Mariana Costa", crm: "CRM-SP 456789" },
      ]
    },
    {
      tipo: "CEA",
      historico: [
        { data: "25/10/2025", cea: "4.2", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
        { data: "18/10/2025", cea: "3.8", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
        { data: "11/10/2025", cea: "3.5", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
        { data: "04/10/2025", cea: "3.2", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
      ]
    },
  ],
  5: [
    {
      tipo: "Hemograma Completo",
      historico: [
        { data: "25/10/2025", hemoglobina: "11.5", leucocitos: "6.200", plaquetas: "165.000", responsavel: "Dr. Carlos Eduardo Lima", crm: "CRM-SP 234567" },
        { data: "18/10/2025", hemoglobina: "11.8", leucocitos: "6.500", plaquetas: "170.000", responsavel: "Dra. Ana Paula Santos", crm: "CRM-SP 123456" },
        { data: "11/10/2025", hemoglobina: "12.0", leucocitos: "6.800", plaquetas: "175.000", responsavel: "Dr. Carlos Eduardo Lima", crm: "CRM-SP 234567" },
      ]
    },
    {
      tipo: "Bioquímica",
      historico: [
        { data: "25/10/2025", creatinina: "0.8", ureia: "28", tgo: "27", tgp: "23", responsavel: "Dra. Mariana Costa", crm: "CRM-SP 456789" },
        { data: "18/10/2025", creatinina: "0.9", ureia: "30", tgo: "28", tgp: "25", responsavel: "Dr. Ricardo Almeida", crm: "CRM-SP 345678" },
      ]
    },
    {
      tipo: "CA-125",
      historico: [
        { data: "25/10/2025", ca125: "45", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
        { data: "18/10/2025", ca125: "42", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
        { data: "11/10/2025", ca125: "38", responsavel: "Dr. Fernando Silva", crm: "CRM-SP 567890" },
      ]
    },
  ],
};

// Mock data de prescrições com médico responsável
const prescricoesData: Record<number, any> = {
  1: {
    medico: "Dr. José Carlos Oliveira",
    crm: "CRM-SP 98765",
    especialidade: "Oncologia Clínica",
    dataPrescricao: "24/10/2025",
    ciclo: "Ciclo 3/6",
    superficieCorporal: "1.65 m²",
    medicamentos: [
      { 
        medicamento: "Doxorrubicina", 
        principioAtivo: "Doxorrubicina HCl",
        dose: "60 mg/m²", 
        doseCalculada: "99 mg",
        via: "IV", 
        frequencia: "Ciclo 21/21 dias", 
        tempoInfusao: "15-30 minutos",
        diluicao: "Soro Fisiológico 0,9% 100ml",
        observacao: "Pré-medicação com antieméticos obrigatória. Vesicante - infundir em veia calibrosa.",
        precaucoes: "Monitorar fração de ejeção do ventrículo esquerdo"
      },
      { 
        medicamento: "Ciclofosfamida", 
        principioAtivo: "Ciclofosfamida",
        dose: "600 mg/m²", 
        doseCalculada: "990 mg",
        via: "IV", 
        frequencia: "Ciclo 21/21 dias", 
        tempoInfusao: "30-60 minutos",
        diluicao: "Soro Fisiológico 0,9% 250ml",
        observacao: "Hiperdiurese recomendada (2-3L de líquidos nas 24h seguintes)",
        precaucoes: "Orientar paciente sobre coloração avermelhada da urina"
      },
      { 
        medicamento: "Ondansetrona", 
        principioAtivo: "Ondansetrona HCl",
        dose: "8 mg", 
        doseCalculada: "8 mg",
        via: "IV", 
        frequencia: "30 min antes da quimioterapia + 8/8h por 24h", 
        tempoInfusao: "5 minutos",
        diluicao: "Soro Fisiológico 0,9% 50ml",
        observacao: "Antiemético profilático - controle de náuseas e vômitos",
        precaucoes: "Pode causar cefaleia leve"
      },
    ]
  },
  2: {
    medico: "Dra. Mariana Ferreira Santos",
    crm: "CRM-SP 87654",
    especialidade: "Hematologia e Oncologia",
    dataPrescricao: "24/10/2025",
    ciclo: "Ciclo 2/6",
    superficieCorporal: "1.72 m²",
    medicamentos: [
      { 
        medicamento: "Rituximab", 
        principioAtivo: "Rituximab",
        dose: "375 mg/m²", 
        doseCalculada: "645 mg",
        via: "IV", 
        frequencia: "Dia 1", 
        tempoInfusao: "4-6 horas (primeira infusão)",
        diluicao: "Soro Fisiológico 0,9% 500ml",
        observacao: "Infusão lenta, monitorar reações infusionais. Pré-medicação: paracetamol + anti-histamínico",
        precaucoes: "Sintomas gripais são comuns. Monitorar sinais vitais a cada 30 min"
      },
      { 
        medicamento: "Ciclofosfamida", 
        principioAtivo: "Ciclofosfamida",
        dose: "750 mg/m²", 
        doseCalculada: "1290 mg",
        via: "IV", 
        frequencia: "Dia 1", 
        tempoInfusao: "30-60 minutos",
        diluicao: "Soro Fisiológico 0,9% 250ml",
        observacao: "Hiperdiurese obrigatória",
        precaucoes: "Mesna pode ser necessária em doses altas"
      },
      { 
        medicamento: "Doxorrubicina", 
        principioAtivo: "Doxorrubicina HCl",
        dose: "50 mg/m²", 
        doseCalculada: "86 mg",
        via: "IV", 
        frequencia: "Dia 1", 
        tempoInfusao: "15-30 minutos",
        diluicao: "Soro Fisiológico 0,9% 100ml",
        observacao: "Verificar fração de ejeção antes de cada ciclo",
        precaucoes: "Dose cumulativa máxima: 550 mg/m²"
      },
      { 
        medicamento: "Vincristina", 
        principioAtivo: "Sulfato de Vincristina",
        dose: "1.4 mg/m² (máx 2mg)", 
        doseCalculada: "2 mg",
        via: "IV", 
        frequencia: "Dia 1", 
        tempoInfusao: "5-10 minutos",
        diluicao: "Não diluir",
        observacao: "EXCLUSIVAMENTE INTRAVENOSO. Nunca administrar via intratecal",
        precaucoes: "Monitorar neuropatia periférica e constipação"
      },
      { 
        medicamento: "Prednisona", 
        principioAtivo: "Prednisona",
        dose: "100 mg", 
        doseCalculada: "100 mg",
        via: "VO", 
        frequencia: "Dias 1-5", 
        tempoInfusao: "N/A",
        diluicao: "N/A",
        observacao: "Administrar pela manhã com alimento",
        precaucoes: "Pode causar insônia, hiperglicemia e alterações de humor"
      },
    ]
  },
  3: {
    medico: "Dr. Roberto Mendes Lima",
    crm: "CRM-SP 76543",
    especialidade: "Oncologia Torácica",
    dataPrescricao: "23/10/2025",
    ciclo: "Ciclo 5/12",
    superficieCorporal: "1.68 m²",
    medicamentos: [
      { 
        medicamento: "Pembrolizumab", 
        principioAtivo: "Pembrolizumab",
        dose: "200 mg", 
        doseCalculada: "200 mg",
        via: "IV", 
        frequencia: "Ciclo 21/21 dias", 
        tempoInfusao: "30 minutos",
        diluicao: "Soro Fisiológico 0,9% 100ml",
        observacao: "Imunoterapia - monitorar eventos adversos imuno-relacionados (pneumonite, colite, hepatite, endocrinopatias)",
        precaucoes: "Educar paciente sobre sintomas de alerta. Realizar provas de função hepática, tireoidiana e pulmonar pré-ciclo"
      },
      { 
        medicamento: "Dexametasona", 
        principioAtivo: "Fosfato de Dexametasona",
        dose: "4 mg", 
        doseCalculada: "4 mg",
        via: "VO", 
        frequencia: "12/12h se necessário (reações adversas imunes)", 
        tempoInfusao: "N/A",
        diluicao: "N/A",
        observacao: "Uso sob demanda para manejo de eventos adversos imunológicos",
        precaucoes: "Iniciar apenas com orientação médica. Não suspender abruptamente"
      },
    ]
  },
  4: {
    medico: "Dr. André Luiz Costa",
    crm: "CRM-SP 65432",
    especialidade: "Oncologia Gastrointestinal",
    dataPrescricao: "24/10/2025",
    ciclo: "Ciclo 4/12",
    superficieCorporal: "1.75 m²",
    medicamentos: [
      { 
        medicamento: "Oxaliplatina", 
        principioAtivo: "Oxaliplatina",
        dose: "85 mg/m²", 
        doseCalculada: "149 mg",
        via: "IV", 
        frequencia: "Dia 1 - Ciclo 14/14 dias", 
        tempoInfusao: "2-6 horas",
        diluicao: "Soro Glicosado 5% 500ml (NUNCA soro fisiológico)",
        observacao: "Evitar exposição ao frio nas 48h seguintes. Pode causar neuropatia periférica acumulativa",
        precaucoes: "Orientar paciente a evitar líquidos gelados. Monitorar sinais de laringoespasmo"
      },
      { 
        medicamento: "Leucovorin", 
        principioAtivo: "Folinato de Cálcio",
        dose: "400 mg/m²", 
        doseCalculada: "700 mg",
        via: "IV", 
        frequencia: "Dia 1", 
        tempoInfusao: "2 horas",
        diluicao: "Soro Fisiológico 0,9% 250ml",
        observacao: "Administrar antes do 5-FU para potencializar ação",
        precaucoes: "Respeitar tempo de infusão"
      },
      { 
        medicamento: "5-Fluorouracil", 
        principioAtivo: "5-Fluorouracil",
        dose: "400 mg/m² bolus + 2400 mg/m² infusão", 
        doseCalculada: "700 mg bolus + 4200 mg infusão",
        via: "IV", 
        frequencia: "Bolus dia 1 + Infusão contínua 46h", 
        tempoInfusao: "Bolus: 5 min / Infusão: 46 horas",
        diluicao: "Soro Fisiológico 0,9%",
        observacao: "Utilizar bomba de infusão contínua portátil. Paciente retorna em 48h para retirada",
        precaucoes: "Orientar sobre mucosite, diarreia e síndrome mão-pé"
      },
    ]
  },
  5: {
    medico: "Dra. Patricia Alves Rocha",
    crm: "CRM-SP 54321",
    especialidade: "Ginecologia Oncológica",
    dataPrescricao: "23/10/2025",
    ciclo: "Ciclo 2/6",
    superficieCorporal: "1.60 m²",
    medicamentos: [
      { 
        medicamento: "Carboplatina", 
        principioAtivo: "Carboplatina",
        dose: "AUC 5", 
        doseCalculada: "450 mg (calculado por Calvert)",
        via: "IV", 
        frequencia: "Dia 1 - Ciclo 21/21 dias", 
        tempoInfusao: "30-60 minutos",
        diluicao: "Soro Glicosado 5% 250ml",
        observacao: "Dose calculada pela fórmula de Calvert considerando clearance de creatinina. Menor nefrotoxicidade que cisplatina",
        precaucoes: "Monitorar função renal e hemograma. Nadir plaquetário entre dias 14-21"
      },
      { 
        medicamento: "Paclitaxel", 
        principioAtivo: "Paclitaxel",
        dose: "175 mg/m²", 
        doseCalculada: "280 mg",
        via: "IV", 
        frequencia: "Dia 1", 
        tempoInfusao: "3 horas",
        diluicao: "Soro Fisiológico 0,9% 500ml",
        observacao: "Pré-medicação OBRIGATÓRIA: Dexametasona 20mg VO 12h e 6h antes + Difenidramina 50mg IV 30min antes + Ranitidina 50mg IV 30min antes",
        precaucoes: "Alto risco de reações de hipersensibilidade. Monitorar sinais vitais rigorosamente na primeira hora. Alopecia universal esperada"
      },
    ]
  },
};

// Mock data de pacientes aguardando liberação para quimioterapia
const pacientesLiberacao = [
  {
    id: 101,
    nome: "Maria Santos Silva",
    sessao: "Sessão 3/6",
    protocolo: "AC-T",
    diagnostico: "Carcinoma de Mama HER2+",
    status: "Aguardando Liberação",
    exames: {
      data: "26/10/2025",
      responsavel: "Dra. Ana Paula Santos",
      registro: "CRM-SP 123456",
      valores: {
        hemoglobina: "12.5 g/dL",
        leucocitos: "7.200/mm³",
        neutrofilos: "4.800/mm³",
        plaquetas: "180.000/mm³",
        creatinina: "0.9 mg/dL",
        tgo: "28 U/L",
        tgp: "25 U/L",
      }
    },
    reacao: "Náusea leve controlada com antiemético. Sem outras intercorrências.",
    procedimentos: [],
    observacoes: null,
  },
  {
    id: 102,
    nome: "João Oliveira Costa",
    sessao: "Sessão 2/6",
    protocolo: "R-CHOP",
    diagnostico: "Linfoma Não-Hodgkin",
    status: "Aguardando Liberação",
    exames: {
      data: "25/10/2025",
      responsavel: "Dr. Carlos Eduardo Lima",
      registro: "CRM-SP 234567",
      valores: {
        hemoglobina: "13.2 g/dL",
        leucocitos: "6.800/mm³",
        neutrofilos: "4.200/mm³",
        plaquetas: "195.000/mm³",
        ldh: "245 U/L",
        creatinina: "1.0 mg/dL",
        ureia: "35 mg/dL",
      }
    },
    reacao: "Reação infusional leve ao Rituximab (primeira dose). Controlada com redução da velocidade de infusão e anti-histamínicos.",
    procedimentos: [
      {
        tipo: "Biópsia de Medula Óssea",
        data: "10/10/2025",
        descricao: "Avaliação de resposta ao tratamento. Resultado: redução de 60% da infiltração linfoide",
        profissional: "Dr. Ricardo Martins Costa",
        registro: "CRM-SP 445566"
      }
    ],
    observacoes: "Monitorar velocidade de infusão do Rituximab. Paciente necessita pré-medicação reforçada.",
  },
  {
    id: 103,
    nome: "Patricia Alves Rocha",
    sessao: "Sessão 4/6",
    protocolo: "Carboplatina + Paclitaxel",
    diagnostico: "Câncer de Ovário Avançado",
    status: "Atenção Necessária",
    exames: {
      data: "26/10/2025",
      responsavel: "Dra. Mariana Costa",
      registro: "CRM-SP 456789",
      valores: {
        hemoglobina: "9.8 g/dL",
        leucocitos: "3.200/mm³",
        neutrofilos: "1.400/mm³",
        plaquetas: "95.000/mm³",
        creatinina: "1.4 mg/dL",
        ca125: "85 U/mL",
      }
    },
    reacao: "Neutropenia febril após última sessão. Tratada com antibióticos e G-CSF.",
    procedimentos: [
      {
        tipo: "Cirurgia Citorredutora",
        data: "05/09/2025",
        descricao: "Ressecção tumoral com ooforectomia bilateral e histerectomia total. Sem complicações pós-operatórias",
        profissional: "Dr. Eduardo Ferreira Santos",
        registro: "CRM-SP 778899"
      },
      {
        tipo: "Internação por Neutropenia Febril",
        data: "12/10/2025",
        descricao: "48h de internação, tratamento com Ceftriaxona IV e Filgrastim. Alta com melhora do quadro",
        profissional: "Dra. Beatriz Lima Costa",
        registro: "CRM-SP 889900"
      }
    ],
    observacoes: "⚠️ CRITÉRIO DE ATENÇÃO: Neutrófilos <1.500/mm³ e plaquetas <100.000/mm³. Considerar redução de dose ou adiamento do ciclo. Avaliar necessidade de suporte com G-CSF profilático.",
  },
  {
    id: 104,
    nome: "Carlos Lima Santos",
    sessao: "Sessão 8/12",
    protocolo: "FOLFOX",
    diagnostico: "Câncer Colorretal Metastático",
    status: "Aguardando Liberação",
    exames: {
      data: "26/10/2025",
      responsavel: "Dr. Ricardo Almeida",
      registro: "CRM-SP 345678",
      valores: {
        hemoglobina: "12.0 g/dL",
        leucocitos: "6.500/mm³",
        neutrofilos: "4.000/mm³",
        plaquetas: "165.000/mm³",
        creatinina: "0.9 mg/dL",
        tgo: "32 U/L",
        tgp: "28 U/L",
        cea: "8.5 ng/mL",
      }
    },
    reacao: "Neuropatia periférica grau 2 (formigamento em mãos e pés). Paciente refere desconforto ao frio. Mantendo atividades diárias sem limitação importante.",
    procedimentos: [
      {
        tipo: "Ressecção de Metástases Hepáticas",
        data: "22/08/2025",
        descricao: "Hepatectomia parcial com ressecção de 3 lesões metastáticas. Recuperação satisfatória",
        profissional: "Dr. Fernando Augusto Silva",
        registro: "CRM-SP 556677"
      },
      {
        tipo: "TC de Tórax e Abdome",
        data: "18/10/2025",
        descricao: "Resposta parcial ao tratamento. Redução de 40% das lesões residuais hepáticas",
        profissional: "Dr. Paulo Henrique Dias",
        registro: "CRM-SP 678901"
      }
    ],
    observacoes: "Monitorar progressão da neuropatia. Considerar redução de dose de Oxaliplatina se atingir grau 3.",
  },
  {
    id: 105,
    nome: "Ana Costa Ferreira",
    sessao: "Sessão 6/12",
    protocolo: "Pembrolizumab",
    diagnostico: "Câncer de Pulmão NSCLC PD-L1 >50%",
    status: "Aguardando Liberação",
    exames: {
      data: "25/10/2025",
      responsavel: "Dr. Fernando Silva",
      registro: "CRM-SP 567890",
      valores: {
        hemoglobina: "11.8 g/dL",
        leucocitos: "6.200/mm³",
        neutrofilos: "3.800/mm³",
        plaquetas: "175.000/mm³",
        creatinina: "0.8 mg/dL",
        tsh: "2.8 mUI/L",
        t4livre: "1.2 ng/dL",
        tgo: "42 U/L",
        tgp: "38 U/L",
      }
    },
    reacao: "Astenia grau 1 e rash cutâneo leve (grau 1). Sem eventos adversos imunomediados significativos.",
    procedimentos: [
      {
        tipo: "TC de Tórax de Controle",
        data: "20/10/2025",
        descricao: "Excelente resposta ao tratamento. Redução de 65% da massa tumoral primária. Sem novos nódulos",
        profissional: "Dr. Paulo Henrique Dias",
        registro: "CRM-SP 678901"
      },
      {
        tipo: "Biópsia Pulmonar Guiada por TC",
        data: "15/08/2025",
        descricao: "Confirmação diagnóstica de adenocarcinoma pulmonar. Análise imunohistoquímica: PD-L1 70%",
        profissional: "Dra. Claudia Regina Alves",
        registro: "CRM-SP 334455"
      }
    ],
    observacoes: null,
  },
  {
    id: 106,
    nome: "Roberto Mendes Silva",
    sessao: "Sessão 5/10",
    protocolo: "Docetaxel",
    diagnostico: "Câncer de Próstata Resistente à Castração",
    status: "Atenção Necessária",
    exames: {
      data: "25/10/2025",
      responsavel: "Dr. Carlos Eduardo Lima",
      registro: "CRM-SP 234567",
      valores: {
        hemoglobina: "10.2 g/dL",
        leucocitos: "2.800/mm³",
        neutrofilos: "1.200/mm³",
        plaquetas: "140.000/mm³",
        creatinina: "1.1 mg/dL",
        psa: "45 ng/mL",
      }
    },
    reacao: "Fadiga intensa (grau 2) e edema periférico. Neutropenia grau 3 identificada em exames.",
    procedimentos: [
      {
        tipo: "Cintilografia Óssea",
        data: "05/10/2025",
        descricao: "Progressão de metástases ósseas em coluna lombar e pelve. Novas lesões em L4 e L5",
        profissional: "Dr. Marcelo Augusto Dias",
        registro: "CRM-SP 112233"
      },
      {
        tipo: "Radioterapia Paliativa",
        data: "08/10/2025 a 19/10/2025",
        descricao: "10 sessões em coluna lombar para controle álgico. Paciente com melhora da dor",
        profissional: "Dr. Renato Costa Lima",
        registro: "CRM-SP 998877"
      }
    ],
    observacoes: "⚠️ CRITÉRIO DE ATENÇÃO: Neutrófilos <1.500/mm³. Considerar uso de G-CSF e avaliação de adiamento do ciclo ou redução de dose em 25%.",
  },
  {
    id: 107,
    nome: "Juliana Ribeiro Lima",
    sessao: "Sessão 2/4",
    protocolo: "AC (Doxorrubicina + Ciclofosfamida)",
    diagnostico: "Carcinoma de Mama Triplo Negativo",
    status: "Aguardando Liberação",
    exames: {
      data: "26/10/2025",
      responsavel: "Dra. Ana Paula Santos",
      registro: "CRM-SP 123456",
      valores: {
        hemoglobina: "11.2 g/dL",
        leucocitos: "5.800/mm³",
        neutrofilos: "3.500/mm³",
        plaquetas: "158.000/mm³",
        creatinina: "0.8 mg/dL",
        tgo: "30 U/L",
        tgp: "28 U/L",
      }
    },
    reacao: "Náuseas e vômitos grau 2, mucosite oral leve. Alopecia total esperada e em curso.",
    procedimentos: [
      {
        tipo: "Mastectomia + Linfadenectomia Axilar",
        data: "20/09/2025",
        descricao: "Ressecção completa da mama direita com margens livres. 3 de 12 linfonodos comprometidos",
        profissional: "Dra. Fernanda Cristina Sousa",
        registro: "CRM-SP 223344"
      },
      {
        tipo: "Ecocardiograma com Doppler",
        data: "23/10/2025",
        descricao: "Avaliação de função cardíaca pré-quimioterapia. Fração de ejeção: 65% (normal)",
        profissional: "Dr. Alexandre Martins Rocha",
        registro: "CRM-SP 667788"
      }
    ],
    observacoes: "Reforçar hidratação e uso de antieméticos profiláticos. Paciente respondendo bem ao protocolo neoadjuvante.",
  },
  {
    id: 108,
    nome: "Eduardo Martins Rocha",
    sessao: "Sessão 3/6",
    protocolo: "ABVD",
    diagnostico: "Linfoma de Hodgkin Clássico",
    status: "Aguardando Liberação",
    exames: {
      data: "26/10/2025",
      responsavel: "Dr. Ricardo Almeida",
      registro: "CRM-SP 345678",
      valores: {
        hemoglobina: "13.5 g/dL",
        leucocitos: "7.800/mm³",
        neutrofilos: "5.200/mm³",
        plaquetas: "210.000/mm³",
        creatinina: "0.9 mg/dL",
        ldh: "180 U/L",
      }
    },
    reacao: "Sem reações adversas significativas. Paciente mantém atividades normais.",
    procedimentos: [
      {
        tipo: "PET-CT Interim",
        data: "15/10/2025",
        descricao: "Resposta metabólica completa (Deauville 2). Sem captação patológica residual",
        profissional: "Dr. Paulo Henrique Dias",
        registro: "CRM-SP 678901"
      },
      {
        tipo: "Transplante Autólogo de Medula Óssea (Programado)",
        data: "Previsto para Janeiro/2026",
        descricao: "Consolidação terapêutica planejada após quimioterapia de indução",
        profissional: "Dr. Gustavo Henrique Lima",
        registro: "CRM-SP 445577"
      }
    ],
    observacoes: null,
  },
];

// Função auxiliar para formatar nome dos exames
const formatExameName = (key: string): string => {
  const nomes: Record<string, string> = {
    hemoglobina: "Hemoglobina",
    leucocitos: "Leucócitos",
    neutrofilos: "Neutrófilos",
    plaquetas: "Plaquetas",
    creatinina: "Creatinina",
    ureia: "Ureia",
    tgo: "TGO",
    tgp: "TGP",
    ldh: "LDH",
    ca125: "CA-125",
    ca153: "CA 15-3",
    cea: "CEA",
    psa: "PSA",
    tsh: "TSH",
    t4livre: "T4 Livre",
  };
  return nomes[key] || key.charAt(0).toUpperCase() + key.slice(1);
};

// Função auxiliar para determinar status do exame
const getStatusLiberacao = (exame: string, valor: string): "baixo" | "alto" | "normal" => {
  const numericValue = parseFloat(valor.replace(/[^\d.]/g, ''));
  
  const limites: Record<string, { min?: number; max?: number }> = {
    hemoglobina: { min: 10.0, max: 16.0 },
    leucocitos: { min: 4000, max: 11000 },
    neutrofilos: { min: 1500, max: 8000 },
    plaquetas: { min: 100000, max: 400000 },
    creatinina: { min: 0.6, max: 1.3 },
    ureia: { min: 15, max: 45 },
    tgo: { max: 40 },
    tgp: { max: 41 },
    ldh: { min: 120, max: 246 },
    ca125: { max: 35 },
    ca153: { max: 31.3 },
    cea: { max: 5.0 },
    psa: { max: 4.0 },
    tsh: { min: 0.4, max: 4.0 },
    t4livre: { min: 0.8, max: 1.8 },
  };

  const limite = limites[exame];
  if (!limite) return "normal";

  if (limite.min !== undefined && numericValue < limite.min) return "baixo";
  if (limite.max !== undefined && numericValue > limite.max) return "alto";
  return "normal";
};

const Medico = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showExamesDialog, setShowExamesDialog] = useState(false);
  const [showPrescricoesDialog, setShowPrescricoesDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [selectedExameIndex, setSelectedExameIndex] = useState<string>("0");

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
    setSelectedExameIndex("0");
    setShowExamesDialog(true);
  };

  const handleVerPrescricoes = (paciente: any) => {
    setSelectedPaciente(paciente);
    setShowPrescricoesDialog(true);
  };

  const getStatusByValue = (parametro: string, valor: string) => {
    const ref = valoresReferencia[parametro];
    if (!ref) return { status: "normal", icon: null };

    const valorNum = parseFloat(valor.replace(/[^\d.-]/g, ''));
    const minNum = ref.min ? parseFloat(ref.min.replace(/[^\d.-]/g, '')) : null;
    const maxNum = ref.max ? parseFloat(ref.max.replace(/[^\d.-]/g, '')) : null;

    if (minNum !== null && valorNum < minNum) {
      return { status: "baixo", icon: <TrendingDown className="h-4 w-4 text-blue-500" /> };
    }
    if (maxNum !== null && valorNum > maxNum) {
      return { status: "elevado", icon: <TrendingUp className="h-4 w-4 text-destructive" /> };
    }
    return { status: "normal", icon: null };
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
                  Analise exames, procedimentos e reações para liberar infusões
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pacientesLiberacao.map((paciente) => (
                  <Card key={paciente.id} className={`border-2 ${
                    paciente.status === "Aguardando Liberação" ? "border-yellow-500/30" : 
                    paciente.status === "Atenção Necessária" ? "border-red-500/30" : 
                    "border-primary/20"
                  }`}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{paciente.nome}</p>
                            <p className="text-sm text-muted-foreground">
                              {paciente.sessao} - Protocolo {paciente.protocolo}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {paciente.diagnostico}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              paciente.status === "Atenção Necessária" ? "destructive" : 
                              paciente.status === "Aguardando Liberação" ? "outline" : 
                              "secondary"
                            }
                          >
                            {paciente.status}
                          </Badge>
                        </div>
                        
                        {/* Exames Detalhados */}
                        <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Exames Laboratoriais Recentes:</p>
                            <p className="text-xs text-muted-foreground">
                              Data: {paciente.exames.data} | {paciente.exames.responsavel} - {paciente.exames.registro}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            {Object.entries(paciente.exames.valores).map(([exame, valor]) => {
                              const statusExame = getStatusLiberacao(exame, valor);
                              return (
                                <div key={exame} className="flex items-center gap-2">
                                  <span className="text-muted-foreground">{formatExameName(exame)}:</span>
                                  <span className={`font-medium ${
                                    statusExame === "baixo" ? "text-red-500" :
                                    statusExame === "alto" ? "text-yellow-500" :
                                    "text-green-600"
                                  }`}>
                                    {valor}
                                    {statusExame !== "normal" && (
                                      statusExame === "baixo" ? 
                                      <TrendingDown className="inline h-3 w-3 ml-1" /> :
                                      <TrendingUp className="inline h-3 w-3 ml-1" />
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Procedimentos Adicionais */}
                        {paciente.procedimentos && paciente.procedimentos.length > 0 && (
                          <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                              Procedimentos Recentes:
                            </p>
                            {paciente.procedimentos.map((proc, idx) => (
                              <div key={idx} className="text-sm space-y-1 pb-2 border-b last:border-b-0 last:pb-0 border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-blue-900 dark:text-blue-100">
                                    {proc.tipo}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {proc.data}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{proc.descricao}</p>
                                <p className="text-xs text-muted-foreground">
                                  Responsável: {proc.profissional} - {proc.registro}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reações e Observações */}
                        <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">Última Sessão - Reações e Observações:</p>
                          <p className="text-sm text-muted-foreground">{paciente.reacao}</p>
                          {paciente.observacoes && (
                            <div className="mt-2 pt-2 border-t">
                              <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
                                ⚠️ Observações Importantes:
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {paciente.observacoes}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-2">
                          <Button 
                            variant="default" 
                            className="flex-1 bg-success hover:bg-success/90"
                            disabled={paciente.status === "Atenção Necessária"}
                          >
                            Liberar para Infusão
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Ver Histórico Completo
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
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Exames Laboratoriais - {selectedPaciente?.nome}</DialogTitle>
            <DialogDescription>
              Histórico de exames com valores de referência e responsáveis técnicos
            </DialogDescription>
          </DialogHeader>
          
          {selectedPaciente && examesData[selectedPaciente.id] && (
            <div className="space-y-6">
              {examesData[selectedPaciente.id].map((exame, idx) => (
                <Card key={idx} className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{exame.tipo}</CardTitle>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">Selecionar Exame:</span>
                        <Select
                          value={selectedExameIndex}
                          onValueChange={setSelectedExameIndex}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {exame.historico.slice(0, 4).map((hist: any, histIdx: number) => (
                              <SelectItem key={histIdx} value={String(histIdx)}>
                                {hist.data}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(() => {
                      const selectedHist = exame.historico[parseInt(selectedExameIndex)] || exame.historico[0];
                      return (
                        <>
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Responsável:</span>
                                <span className="ml-2 font-medium">{selectedHist.responsavel}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Registro:</span>
                                <span className="ml-2 font-medium">{selectedHist.crm}</span>
                              </div>
                            </div>
                          </div>

                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Parâmetro</TableHead>
                                <TableHead>Resultado</TableHead>
                                <TableHead>Valor de Referência</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Object.entries(selectedHist).map(([key, value]) => {
                                if (key !== 'data' && key !== 'responsavel' && key !== 'crm') {
                                  const ref = valoresReferencia[key];
                                  const { status, icon } = getStatusByValue(key, value as string);
                                  
                                  let refText = "N/A";
                                  if (ref) {
                                    if (ref.min && ref.max) {
                                      refText = `${ref.min} - ${ref.max}`;
                                    } else if (ref.max) {
                                      refText = `até ${ref.max}`;
                                    } else if (ref.min) {
                                      refText = `mín. ${ref.min}`;
                                    }
                                  }

                                  return (
                                    <TableRow key={key} className={status !== "normal" ? "bg-muted/30" : ""}>
                                      <TableCell className="font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                      </TableCell>
                                      <TableCell className="font-semibold">
                                        {value as string}
                                        {key === "hemoglobina" && " g/dL"}
                                        {key === "leucocitos" && " /mm³"}
                                        {key === "plaquetas" && " /mm³"}
                                        {key === "creatinina" && " mg/dL"}
                                        {key === "ureia" && " mg/dL"}
                                        {(key === "tgo" || key === "tgp" || key === "ldh") && " U/L"}
                                        {(key === "ca153" || key === "ca125") && " U/mL"}
                                        {key === "cea" && " ng/mL"}
                                      </TableCell>
                                      <TableCell className="text-muted-foreground">
                                        {refText}
                                        {key === "hemoglobina" && ref && " g/dL"}
                                        {key === "leucocitos" && ref && " /mm³"}
                                        {key === "plaquetas" && ref && " /mm³"}
                                        {key === "creatinina" && ref && " mg/dL"}
                                        {key === "ureia" && ref && " mg/dL"}
                                        {(key === "tgo" || key === "tgp" || key === "ldh") && ref && " U/L"}
                                        {(key === "ca153" || key === "ca125") && ref && " U/mL"}
                                        {key === "cea" && ref && " ng/mL"}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {icon || (
                                          <Badge variant="outline" className="bg-success/10 text-success border-success">
                                            Normal
                                          </Badge>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                                return null;
                              })}
                            </TableBody>
                          </Table>

                          {exame.historico.length > 1 && (
                            <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                              Exibindo {parseInt(selectedExameIndex) + 1} de {Math.min(exame.historico.length, 4)} exames disponíveis
                            </div>
                          )}
                        </>
                      );
                    })()}
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
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prescrição Médica Detalhada - {selectedPaciente?.nome}</DialogTitle>
            <DialogDescription>
              Protocolo de Tratamento Oncológico Completo
            </DialogDescription>
          </DialogHeader>
          
          {selectedPaciente && prescricoesData[selectedPaciente.id] && (
            <div className="space-y-6">
              {/* Informações do Médico Responsável */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Médico Responsável
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block">Nome:</span>
                      <span className="font-semibold">{prescricoesData[selectedPaciente.id].medico}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Registro:</span>
                      <span className="font-semibold">{prescricoesData[selectedPaciente.id].crm}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Especialidade:</span>
                      <span className="font-semibold">{prescricoesData[selectedPaciente.id].especialidade}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Data da Prescrição:</span>
                      <span className="font-semibold">{prescricoesData[selectedPaciente.id].dataPrescricao}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informações do Tratamento */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Dados do Tratamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block">Diagnóstico:</span>
                      <span className="font-medium">{selectedPaciente.diagnostico}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Protocolo:</span>
                      <span className="font-medium">{selectedPaciente.protocolo}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Ciclo Atual:</span>
                      <span className="font-medium">{prescricoesData[selectedPaciente.id].ciclo}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Superfície Corporal:</span>
                      <span className="font-medium">{prescricoesData[selectedPaciente.id].superficieCorporal}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-muted-foreground text-sm">Matrícula SUS:</span>
                    <span className="ml-2 font-medium text-sm">{selectedPaciente.matricula}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Medicamentos Detalhados */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Medicamentos Prescritos</h3>
                {prescricoesData[selectedPaciente.id].medicamentos.map((med: any, idx: number) => (
                  <Card key={idx} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{med.medicamento}</CardTitle>
                        <Badge variant="outline">{med.via}</Badge>
                      </div>
                      <CardDescription className="text-xs">
                        Princípio Ativo: {med.principioAtivo}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-muted/50 p-2 rounded">
                          <span className="text-muted-foreground text-xs block">Dose Prescrita:</span>
                          <span className="font-semibold">{med.dose}</span>
                        </div>
                        <div className="bg-muted/50 p-2 rounded">
                          <span className="text-muted-foreground text-xs block">Dose Calculada:</span>
                          <span className="font-semibold text-primary">{med.doseCalculada}</span>
                        </div>
                        <div className="bg-muted/50 p-2 rounded">
                          <span className="text-muted-foreground text-xs block">Frequência:</span>
                          <span className="font-semibold">{med.frequencia}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                          <span className="text-blue-700 dark:text-blue-300 font-medium text-xs block mb-1">
                            Tempo de Infusão:
                          </span>
                          <span className="font-medium">{med.tempoInfusao}</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                          <span className="text-blue-700 dark:text-blue-300 font-medium text-xs block mb-1">
                            Diluição:
                          </span>
                          <span className="font-medium">{med.diluicao}</span>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                        <span className="text-amber-700 dark:text-amber-300 font-medium text-xs block mb-1">
                          Observações Técnicas:
                        </span>
                        <p className="text-sm">{med.observacao}</p>
                      </div>

                      {med.precaucoes && (
                        <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded border border-red-200 dark:border-red-800">
                          <span className="text-red-700 dark:text-red-300 font-medium text-xs block mb-1">
                            ⚠️ Precauções Importantes:
                          </span>
                          <p className="text-sm">{med.precaucoes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                Prescrição emitida por {prescricoesData[selectedPaciente.id].medico} - {prescricoesData[selectedPaciente.id].crm} em {prescricoesData[selectedPaciente.id].dataPrescricao}
              </div>
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
