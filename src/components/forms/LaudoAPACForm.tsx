import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Printer } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    raca: "",
    nomeMae: "",
    dddContato: "",
    telefoneContato: "",
    nomeResponsavel: "",
    dddResponsavel: "",
    telefoneResponsavel: "",
    endereco: "",
    municipio: "",
    codigoIbge: "",
    uf: "",
    cep: "",
    
    // Procedimento Solicitado
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
    cid10Associadas: "",
    
    // Resumo
    resumoAnamnese: "",
    examesComplementares: "",
    justificativaProcedimento: "",
    
    // Solicitação
    nomeProfissionalSolicitante: "",
    tipoDocumentoSolicitante: "CNS",
    numeroDocumentoSolicitante: "",
    dataSolicitacao: "",
    
    // Autorização
    nomeProfissionalAutorizador: "",
    codOrgaoEmissor: "",
    numeroAutorizacao: "",
    tipoDocumentoAutorizador: "CNS",
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
    toast({
      title: "Imprimindo documento",
      description: "O laudo APAC está sendo preparado para impressão.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-2xl font-bold">Laudo Médico para Procedimentos de Alta Complexidade - APAC</h2>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>
      </div>

      <div className="print:text-sm">
        {/* Identificação do Estabelecimento */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Identificação do Estabelecimento de Saúde (Solicitante)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomeEstabelecimento">Nome do Estabelecimento</Label>
              <Input
                id="nomeEstabelecimento"
                value={formData.nomeEstabelecimento}
                onChange={(e) => handleChange("nomeEstabelecimento", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="cnes">CNES</Label>
              <Input
                id="cnes"
                value={formData.cnes}
                onChange={(e) => handleChange("cnes", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Identificação do Paciente */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Identificação do Paciente</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="nomePaciente">Nome do Paciente</Label>
              <Input
                id="nomePaciente"
                value={formData.nomePaciente}
                onChange={(e) => handleChange("nomePaciente", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="prontuario">Nº do Prontuário</Label>
              <Input
                id="prontuario"
                value={formData.prontuario}
                onChange={(e) => handleChange("prontuario", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="cns">Cartão Nacional de Saúde (CNS)</Label>
              <Input
                id="cns"
                value={formData.cns}
                onChange={(e) => handleChange("cns", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => handleChange("dataNascimento", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="sexo">Sexo</Label>
              <select
                id="sexo"
                value={formData.sexo}
                onChange={(e) => handleChange("sexo", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm print:border-none print:p-0"
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
            <div>
              <Label htmlFor="raca">Raça/Cor</Label>
              <Input
                id="raca"
                value={formData.raca}
                onChange={(e) => handleChange("raca", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="nomeMae">Nome da Mãe</Label>
              <Input
                id="nomeMae"
                value={formData.nomeMae}
                onChange={(e) => handleChange("nomeMae", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-[auto_1fr] gap-2">
              <div>
                <Label htmlFor="dddContato">DDD</Label>
                <Input
                  id="dddContato"
                  value={formData.dddContato}
                  onChange={(e) => handleChange("dddContato", e.target.value)}
                  maxLength={2}
                  className="w-20 print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="telefoneContato">Telefone de Contato</Label>
                <Input
                  id="telefoneContato"
                  value={formData.telefoneContato}
                  onChange={(e) => handleChange("telefoneContato", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="nomeResponsavel">Nome do Responsável</Label>
              <Input
                id="nomeResponsavel"
                value={formData.nomeResponsavel}
                onChange={(e) => handleChange("nomeResponsavel", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-[auto_1fr] gap-2">
              <div>
                <Label htmlFor="dddResponsavel">DDD</Label>
                <Input
                  id="dddResponsavel"
                  value={formData.dddResponsavel}
                  onChange={(e) => handleChange("dddResponsavel", e.target.value)}
                  maxLength={2}
                  className="w-20 print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="telefoneResponsavel">Telefone do Responsável</Label>
                <Input
                  id="telefoneResponsavel"
                  value={formData.telefoneResponsavel}
                  onChange={(e) => handleChange("telefoneResponsavel", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="endereco">Endereço (Rua, Nº, Bairro)</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleChange("endereco", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="municipio">Município de Residência</Label>
              <Input
                id="municipio"
                value={formData.municipio}
                onChange={(e) => handleChange("municipio", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="codigoIbge">Código IBGE Município</Label>
              <Input
                id="codigoIbge"
                value={formData.codigoIbge}
                onChange={(e) => handleChange("codigoIbge", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="uf">UF</Label>
              <Input
                id="uf"
                value={formData.uf}
                onChange={(e) => handleChange("uf", e.target.value)}
                maxLength={2}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => handleChange("cep", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Procedimentos Solicitados */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Procedimento(s) Solicitado(s)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[1fr_2fr_auto]">
              <div>
                <Label>Código do Procedimento</Label>
                <Input
                  value={formData.codigoProcedimento1}
                  onChange={(e) => handleChange("codigoProcedimento1", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label>Nome do Procedimento</Label>
                <Input
                  value={formData.nomeProcedimento1}
                  onChange={(e) => handleChange("nomeProcedimento1", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label>Qtde</Label>
                <Input
                  value={formData.qtde1}
                  onChange={(e) => handleChange("qtde1", e.target.value)}
                  type="number"
                  className="w-20 print:border-none print:p-0"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_2fr_auto]">
              <div>
                <Label>Código do Procedimento Secundário</Label>
                <Input
                  value={formData.codigoProcedimento2}
                  onChange={(e) => handleChange("codigoProcedimento2", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label>Nome do Procedimento</Label>
                <Input
                  value={formData.nomeProcedimento2}
                  onChange={(e) => handleChange("nomeProcedimento2", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label>Qtde</Label>
                <Input
                  value={formData.qtde2}
                  onChange={(e) => handleChange("qtde2", e.target.value)}
                  type="number"
                  className="w-20 print:border-none print:p-0"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_2fr_auto]">
              <div>
                <Label>Código do Procedimento</Label>
                <Input
                  value={formData.codigoProcedimento3}
                  onChange={(e) => handleChange("codigoProcedimento3", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label>Nome do Procedimento</Label>
                <Input
                  value={formData.nomeProcedimento3}
                  onChange={(e) => handleChange("nomeProcedimento3", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label>Qtde</Label>
                <Input
                  value={formData.qtde3}
                  onChange={(e) => handleChange("qtde3", e.target.value)}
                  type="number"
                  className="w-20 print:border-none print:p-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Justificativa */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Justificativa do(s) Procedimento(s) Solicitado(s)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="descricaoDiagnostico">Descrição do Diagnóstico</Label>
                <Textarea
                  id="descricaoDiagnostico"
                  value={formData.descricaoDiagnostico}
                  onChange={(e) => handleChange("descricaoDiagnostico", e.target.value)}
                  rows={3}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="cid10Principal">CID 10 Principal</Label>
                <Input
                  id="cid10Principal"
                  value={formData.cid10Principal}
                  onChange={(e) => handleChange("cid10Principal", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="cid10Secundario">CID 10 Secundário</Label>
                <Input
                  id="cid10Secundario"
                  value={formData.cid10Secundario}
                  onChange={(e) => handleChange("cid10Secundario", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="cid10Associadas">CID 10 Causas Associadas</Label>
                <Input
                  id="cid10Associadas"
                  value={formData.cid10Associadas}
                  onChange={(e) => handleChange("cid10Associadas", e.target.value)}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo e Exames */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Resumo da Anamnese e Exame Físico</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.resumoAnamnese}
              onChange={(e) => handleChange("resumoAnamnese", e.target.value)}
              rows={4}
              className="print:border-none print:p-0"
            />
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Exames Complementares Realizados</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.examesComplementares}
              onChange={(e) => handleChange("examesComplementares", e.target.value)}
              rows={4}
              className="print:border-none print:p-0"
            />
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Justificativa do Procedimento</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.justificativaProcedimento}
              onChange={(e) => handleChange("justificativaProcedimento", e.target.value)}
              rows={4}
              className="print:border-none print:p-0"
            />
          </CardContent>
        </Card>

        {/* Solicitação */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Solicitação</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomeProfissionalSolicitante">Nome do Profissional Solicitante</Label>
              <Input
                id="nomeProfissionalSolicitante"
                value={formData.nomeProfissionalSolicitante}
                onChange={(e) => handleChange("nomeProfissionalSolicitante", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label>Tipo de Documento</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="CNS"
                    checked={formData.tipoDocumentoSolicitante === "CNS"}
                    onChange={(e) => handleChange("tipoDocumentoSolicitante", e.target.value)}
                  />
                  CNS
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="CPF"
                    checked={formData.tipoDocumentoSolicitante === "CPF"}
                    onChange={(e) => handleChange("tipoDocumentoSolicitante", e.target.value)}
                  />
                  CPF
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="numeroDocumentoSolicitante">Número do Documento</Label>
              <Input
                id="numeroDocumentoSolicitante"
                value={formData.numeroDocumentoSolicitante}
                onChange={(e) => handleChange("numeroDocumentoSolicitante", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="dataSolicitacao">Data da Solicitação</Label>
              <Input
                id="dataSolicitacao"
                type="date"
                value={formData.dataSolicitacao}
                onChange={(e) => handleChange("dataSolicitacao", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Autorização */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Autorização</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomeProfissionalAutorizador">Nome do Profissional Autorizador</Label>
              <Input
                id="nomeProfissionalAutorizador"
                value={formData.nomeProfissionalAutorizador}
                onChange={(e) => handleChange("nomeProfissionalAutorizador", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="codOrgaoEmissor">Código Órgão Emissor</Label>
              <Input
                id="codOrgaoEmissor"
                value={formData.codOrgaoEmissor}
                onChange={(e) => handleChange("codOrgaoEmissor", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="numeroAutorizacao">Número da Autorização (APAC)</Label>
              <Input
                id="numeroAutorizacao"
                value={formData.numeroAutorizacao}
                onChange={(e) => handleChange("numeroAutorizacao", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label>Tipo de Documento</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="CNS"
                    checked={formData.tipoDocumentoAutorizador === "CNS"}
                    onChange={(e) => handleChange("tipoDocumentoAutorizador", e.target.value)}
                  />
                  CNS
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="CPF"
                    checked={formData.tipoDocumentoAutorizador === "CPF"}
                    onChange={(e) => handleChange("tipoDocumentoAutorizador", e.target.value)}
                  />
                  CPF
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="numeroDocumentoAutorizador">Número do Documento</Label>
              <Input
                id="numeroDocumentoAutorizador"
                value={formData.numeroDocumentoAutorizador}
                onChange={(e) => handleChange("numeroDocumentoAutorizador", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="dataAutorizacao">Data da Autorização</Label>
              <Input
                id="dataAutorizacao"
                type="date"
                value={formData.dataAutorizacao}
                onChange={(e) => handleChange("dataAutorizacao", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="periodoValidade">Período de Validade da APAC</Label>
              <Input
                id="periodoValidade"
                value={formData.periodoValidade}
                onChange={(e) => handleChange("periodoValidade", e.target.value)}
                placeholder="Ex: 01/01/2024 a 31/12/2024"
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Estabelecimento Executante */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Identificação do Estabelecimento de Saúde (Executante)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomeEstabelecimentoExecutante">Nome do Estabelecimento</Label>
              <Input
                id="nomeEstabelecimentoExecutante"
                value={formData.nomeEstabelecimentoExecutante}
                onChange={(e) => handleChange("nomeEstabelecimentoExecutante", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="cnesExecutante">CNES</Label>
              <Input
                id="cnesExecutante"
                value={formData.cnesExecutante}
                onChange={(e) => handleChange("cnesExecutante", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
