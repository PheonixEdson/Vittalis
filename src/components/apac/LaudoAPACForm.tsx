import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer } from "lucide-react";

export const LaudoAPACForm = () => {
  const [formData, setFormData] = useState({
    // Identificação do Estabelecimento
    nomeEstabelecimento: "",
    cnes: "",
    
    // Identificação do Paciente
    nomePaciente: "",
    prontuario: "",
    cns: "",
    dataNascimento: "",
    sexo: "",
    racaCor: "",
    nomeMae: "",
    telefoneContato: "",
    dddContato: "",
    nomeResponsavel: "",
    telefoneResponsavel: "",
    dddResponsavel: "",
    endereco: "",
    municipio: "",
    codIbge: "",
    uf: "",
    cep: "",
    
    // Procedimentos
    codigoProcedimento1: "",
    nomeProcedimento1: "",
    qtde1: "",
    codigoProcedimento2: "",
    nomeProcedimento2: "",
    qtde2: "",
    codigoProcedimento3: "",
    nomeProcedimento3: "",
    qtde3: "",
    
    // Justificativa
    descricaoDiagnostico: "",
    cid10Principal: "",
    cid10Secundario: "",
    cid10CausasAssociadas: "",
    
    // Detalhes Clínicos
    resumoAnamnese: "",
    examesComplementares: "",
    justificativaProcedimento: "",
    
    // Solicitação
    nomeProfissionalSolicitante: "",
    dataSolicitacao: "",
    documentoSolicitante: "",
    numeroDocumentoSolicitante: "",
    
    // Autorização
    nomeProfissionalAutorizador: "",
    codOrgaoEmissor: "",
    numeroAutorizacao: "",
    documentoAutorizador: "",
    numeroDocumentoAutorizador: "",
    dataAutorizacao: "",
    periodoValidade: "",
    
    // Estabelecimento Executante
    nomeEstabelecimentoExecutante: "",
    cnesExecutante: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-2xl font-bold">Laudo Médico para Procedimentos de Alta Complexidade - APAC</h2>
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Imprimir
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Identificação do Estabelecimento de Saúde (Solicitante)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeEstabelecimento">Nome do Estabelecimento</Label>
              <Input
                id="nomeEstabelecimento"
                value={formData.nomeEstabelecimento}
                onChange={(e) => handleChange("nomeEstabelecimento", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnes">CNES</Label>
              <Input
                id="cnes"
                value={formData.cnes}
                onChange={(e) => handleChange("cnes", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Identificação do Paciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomePaciente">Nome do Paciente</Label>
              <Input
                id="nomePaciente"
                value={formData.nomePaciente}
                onChange={(e) => handleChange("nomePaciente", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prontuario">Nº do Prontuário</Label>
              <Input
                id="prontuario"
                value={formData.prontuario}
                onChange={(e) => handleChange("prontuario", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cns">Cartão Nacional de Saúde (CNS)</Label>
              <Input
                id="cns"
                value={formData.cns}
                onChange={(e) => handleChange("cns", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => handleChange("dataNascimento", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sexo">Sexo</Label>
              <Select value={formData.sexo} onValueChange={(value) => handleChange("sexo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Masculino</SelectItem>
                  <SelectItem value="F">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeMae">Nome da Mãe</Label>
              <Input
                id="nomeMae"
                value={formData.nomeMae}
                onChange={(e) => handleChange("nomeMae", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="space-y-2">
                <Label htmlFor="dddContato">DDD</Label>
                <Input
                  id="dddContato"
                  value={formData.dddContato}
                  onChange={(e) => handleChange("dddContato", e.target.value)}
                  maxLength={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefoneContato">Telefone de Contato</Label>
                <Input
                  id="telefoneContato"
                  value={formData.telefoneContato}
                  onChange={(e) => handleChange("telefoneContato", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeResponsavel">Nome do Responsável</Label>
              <Input
                id="nomeResponsavel"
                value={formData.nomeResponsavel}
                onChange={(e) => handleChange("nomeResponsavel", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="space-y-2">
                <Label htmlFor="dddResponsavel">DDD</Label>
                <Input
                  id="dddResponsavel"
                  value={formData.dddResponsavel}
                  onChange={(e) => handleChange("dddResponsavel", e.target.value)}
                  maxLength={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefoneResponsavel">Telefone</Label>
                <Input
                  id="telefoneResponsavel"
                  value={formData.telefoneResponsavel}
                  onChange={(e) => handleChange("telefoneResponsavel", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço (Rua, Nº, Bairro)</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => handleChange("endereco", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="municipio">Município de Residência</Label>
              <Input
                id="municipio"
                value={formData.municipio}
                onChange={(e) => handleChange("municipio", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codIbge">Cód. IBGE</Label>
              <Input
                id="codIbge"
                value={formData.codIbge}
                onChange={(e) => handleChange("codIbge", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uf">UF</Label>
              <Input
                id="uf"
                value={formData.uf}
                onChange={(e) => handleChange("uf", e.target.value)}
                maxLength={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => handleChange("cep", e.target.value)}
              className="w-48"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Procedimento(s) Solicitado(s)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-[1fr_2fr_100px] gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigoProcedimento1">Código</Label>
              <Input
                id="codigoProcedimento1"
                value={formData.codigoProcedimento1}
                onChange={(e) => handleChange("codigoProcedimento1", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomeProcedimento1">Nome do Procedimento</Label>
              <Input
                id="nomeProcedimento1"
                value={formData.nomeProcedimento1}
                onChange={(e) => handleChange("nomeProcedimento1", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qtde1">Qtde</Label>
              <Input
                id="qtde1"
                type="number"
                value={formData.qtde1}
                onChange={(e) => handleChange("qtde1", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr_100px] gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigoProcedimento2">Código</Label>
              <Input
                id="codigoProcedimento2"
                value={formData.codigoProcedimento2}
                onChange={(e) => handleChange("codigoProcedimento2", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomeProcedimento2">Nome do Procedimento</Label>
              <Input
                id="nomeProcedimento2"
                value={formData.nomeProcedimento2}
                onChange={(e) => handleChange("nomeProcedimento2", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qtde2">Qtde</Label>
              <Input
                id="qtde2"
                type="number"
                value={formData.qtde2}
                onChange={(e) => handleChange("qtde2", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr_100px] gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigoProcedimento3">Código</Label>
              <Input
                id="codigoProcedimento3"
                value={formData.codigoProcedimento3}
                onChange={(e) => handleChange("codigoProcedimento3", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomeProcedimento3">Nome do Procedimento</Label>
              <Input
                id="nomeProcedimento3"
                value={formData.nomeProcedimento3}
                onChange={(e) => handleChange("nomeProcedimento3", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qtde3">Qtde</Label>
              <Input
                id="qtde3"
                type="number"
                value={formData.qtde3}
                onChange={(e) => handleChange("qtde3", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Justificativa do(s) Procedimento(s) Solicitado(s)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="descricaoDiagnostico">Descrição do Diagnóstico</Label>
            <Textarea
              id="descricaoDiagnostico"
              value={formData.descricaoDiagnostico}
              onChange={(e) => handleChange("descricaoDiagnostico", e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cid10Principal">CID 10 Principal</Label>
              <Input
                id="cid10Principal"
                value={formData.cid10Principal}
                onChange={(e) => handleChange("cid10Principal", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cid10Secundario">CID 10 Secundário</Label>
              <Input
                id="cid10Secundario"
                value={formData.cid10Secundario}
                onChange={(e) => handleChange("cid10Secundario", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cid10CausasAssociadas">CID 10 Causas Associadas</Label>
              <Input
                id="cid10CausasAssociadas"
                value={formData.cid10CausasAssociadas}
                onChange={(e) => handleChange("cid10CausasAssociadas", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resumoAnamnese">Resumo da Anamnese e Exame Físico</Label>
            <Textarea
              id="resumoAnamnese"
              value={formData.resumoAnamnese}
              onChange={(e) => handleChange("resumoAnamnese", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="examesComplementares">Exames Complementares Realizados</Label>
            <Textarea
              id="examesComplementares"
              value={formData.examesComplementares}
              onChange={(e) => handleChange("examesComplementares", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativaProcedimento">Justificativa do Procedimento</Label>
            <Textarea
              id="justificativaProcedimento"
              value={formData.justificativaProcedimento}
              onChange={(e) => handleChange("justificativaProcedimento", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solicitação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeProfissionalSolicitante">Nome do Profissional Solicitante</Label>
              <Input
                id="nomeProfissionalSolicitante"
                value={formData.nomeProfissionalSolicitante}
                onChange={(e) => handleChange("nomeProfissionalSolicitante", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataSolicitacao">Data da Solicitação</Label>
              <Input
                id="dataSolicitacao"
                type="date"
                value={formData.dataSolicitacao}
                onChange={(e) => handleChange("dataSolicitacao", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentoSolicitante">Tipo de Documento</Label>
              <Select value={formData.documentoSolicitante} onValueChange={(value) => handleChange("documentoSolicitante", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNS">CNS</SelectItem>
                  <SelectItem value="CPF">CPF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numeroDocumentoSolicitante">Número do Documento</Label>
              <Input
                id="numeroDocumentoSolicitante"
                value={formData.numeroDocumentoSolicitante}
                onChange={(e) => handleChange("numeroDocumentoSolicitante", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autorização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeProfissionalAutorizador">Nome do Profissional Autorizador</Label>
              <Input
                id="nomeProfissionalAutorizador"
                value={formData.nomeProfissionalAutorizador}
                onChange={(e) => handleChange("nomeProfissionalAutorizador", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codOrgaoEmissor">Código do Órgão Emissor</Label>
              <Input
                id="codOrgaoEmissor"
                value={formData.codOrgaoEmissor}
                onChange={(e) => handleChange("codOrgaoEmissor", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numeroAutorizacao">Número da Autorização (APAC)</Label>
            <Input
              id="numeroAutorizacao"
              value={formData.numeroAutorizacao}
              onChange={(e) => handleChange("numeroAutorizacao", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentoAutorizador">Tipo de Documento</Label>
              <Select value={formData.documentoAutorizador} onValueChange={(value) => handleChange("documentoAutorizador", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNS">CNS</SelectItem>
                  <SelectItem value="CPF">CPF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numeroDocumentoAutorizador">Número do Documento</Label>
              <Input
                id="numeroDocumentoAutorizador"
                value={formData.numeroDocumentoAutorizador}
                onChange={(e) => handleChange("numeroDocumentoAutorizador", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataAutorizacao">Data da Autorização</Label>
              <Input
                id="dataAutorizacao"
                type="date"
                value={formData.dataAutorizacao}
                onChange={(e) => handleChange("dataAutorizacao", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodoValidade">Período de Validade da APAC</Label>
              <Input
                id="periodoValidade"
                value={formData.periodoValidade}
                onChange={(e) => handleChange("periodoValidade", e.target.value)}
                placeholder="Ex: 01/01/2024 a 31/12/2024"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Identificação do Estabelecimento de Saúde (Executante)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeEstabelecimentoExecutante">Nome do Estabelecimento</Label>
              <Input
                id="nomeEstabelecimentoExecutante"
                value={formData.nomeEstabelecimentoExecutante}
                onChange={(e) => handleChange("nomeEstabelecimentoExecutante", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnesExecutante">CNES</Label>
              <Input
                id="cnesExecutante"
                value={formData.cnesExecutante}
                onChange={(e) => handleChange("cnesExecutante", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
