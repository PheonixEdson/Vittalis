import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type APACHistorico = {
  id: string;
  paciente_id: string;
  medico_id: string | null;
  tipo_apac: string;
  status: string;
  dados_formulario: any;
  data_preenchimento: string;
  observacoes: string | null;
  created_at: string;
};

type APACEditDialogProps = {
  apac: APACHistorico | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
};

const RequiredLabel = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <Label htmlFor={htmlFor} className="flex items-center gap-1">
    {children}
    <span className="text-destructive text-xs">*</span>
  </Label>
);

export const APACEditDialog = ({ apac, open, onOpenChange, onUpdate }: APACEditDialogProps) => {
  const [novoStatus, setNovoStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [laudoData, setLaudoData] = useState<any>({});
  const [dadosComplementaresData, setDadosComplementaresData] = useState<any>({});

  useEffect(() => {
    if (apac) {
      setNovoStatus(apac.status || "pendente");
      setObservacoes(apac.observacoes || "");
      setLaudoData(apac.dados_formulario?.laudo || {});
      setDadosComplementaresData(apac.dados_formulario?.dadosComplementares || {});
    }
  }, [apac]);

  const handleLaudoChange = (field: string, value: string) => {
    setLaudoData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleDadosChange = (field: string, value: string) => {
    setDadosComplementaresData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!apac) return;

    try {
      const { error } = await supabase
        .from('apac_historico')
        .update({
          status: novoStatus,
          observacoes: observacoes,
          dados_formulario: {
            laudo: laudoData,
            dadosComplementares: dadosComplementaresData
          }
        })
        .eq('id', apac.id);

      if (error) throw error;

      toast({
        title: "APAC atualizada",
        description: "Os dados da APAC foram atualizados com sucesso."
      });

      onUpdate();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao atualizar APAC:', error);
      toast({
        title: "Erro ao atualizar APAC",
        description: "Não foi possível atualizar a APAC.",
        variant: "destructive"
      });
    }
  };

  if (!apac) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar APAC - Setor Administrativo</DialogTitle>
          <DialogDescription>
            Complete o preenchimento dos campos e atualize o status da APAC
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="laudo">Laudo Médico</TabsTrigger>
            <TabsTrigger value="complementares">Dados Complementares</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-4">
            <div>
              <Label>Status</Label>
              <Select value={novoStatus} onValueChange={setNovoStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_analise">Em Análise</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Adicione observações sobre esta APAC..."
                rows={6}
              />
            </div>
          </TabsContent>

          <TabsContent value="laudo">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Identificação do Estabelecimento */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Identificação do Estabelecimento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeEstabelecimento">Nome do Estabelecimento</Label>
                      <Input
                        id="nomeEstabelecimento"
                        value={laudoData.nomeEstabelecimento || ""}
                        onChange={(e) => handleLaudoChange("nomeEstabelecimento", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnes">CNES</Label>
                      <Input
                        id="cnes"
                        value={laudoData.cnes || ""}
                        onChange={(e) => handleLaudoChange("cnes", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Identificação do Paciente */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Identificação do Paciente</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <RequiredLabel htmlFor="nomePaciente">Nome do Paciente</RequiredLabel>
                      <Input
                        id="nomePaciente"
                        value={laudoData.nomePaciente || ""}
                        onChange={(e) => handleLaudoChange("nomePaciente", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="prontuario">Nº do Prontuário</Label>
                      <Input
                        id="prontuario"
                        value={laudoData.prontuario || ""}
                        onChange={(e) => handleLaudoChange("prontuario", e.target.value)}
                      />
                    </div>
                    <div>
                      <RequiredLabel htmlFor="cns">CNS</RequiredLabel>
                      <Input
                        id="cns"
                        value={laudoData.cns || ""}
                        onChange={(e) => handleLaudoChange("cns", e.target.value)}
                      />
                    </div>
                    <div>
                      <RequiredLabel htmlFor="dataNascimento">Data de Nascimento</RequiredLabel>
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={laudoData.dataNascimento || ""}
                        onChange={(e) => handleLaudoChange("dataNascimento", e.target.value)}
                      />
                    </div>
                    <div>
                      <RequiredLabel htmlFor="sexo">Sexo</RequiredLabel>
                      <Select
                        value={laudoData.sexo || ""}
                        onValueChange={(value) => handleLaudoChange("sexo", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="nomeMae">Nome da Mãe</Label>
                      <Input
                        id="nomeMae"
                        value={laudoData.nomeMae || ""}
                        onChange={(e) => handleLaudoChange("nomeMae", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dddContato">DDD Contato</Label>
                      <Input
                        id="dddContato"
                        value={laudoData.dddContato || ""}
                        onChange={(e) => handleLaudoChange("dddContato", e.target.value)}
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefoneContato">Telefone Contato</Label>
                      <Input
                        id="telefoneContato"
                        value={laudoData.telefoneContato || ""}
                        onChange={(e) => handleLaudoChange("telefoneContato", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomeResponsavel">Nome do Responsável</Label>
                      <Input
                        id="nomeResponsavel"
                        value={laudoData.nomeResponsavel || ""}
                        onChange={(e) => handleLaudoChange("nomeResponsavel", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dddResponsavel">DDD Responsável</Label>
                      <Input
                        id="dddResponsavel"
                        value={laudoData.dddResponsavel || ""}
                        onChange={(e) => handleLaudoChange("dddResponsavel", e.target.value)}
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefoneResponsavel">Telefone Responsável</Label>
                      <Input
                        id="telefoneResponsavel"
                        value={laudoData.telefoneResponsavel || ""}
                        onChange={(e) => handleLaudoChange("telefoneResponsavel", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={laudoData.endereco || ""}
                        onChange={(e) => handleLaudoChange("endereco", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="municipio">Município</Label>
                      <Input
                        id="municipio"
                        value={laudoData.municipio || ""}
                        onChange={(e) => handleLaudoChange("municipio", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="codIbge">Cód. IBGE</Label>
                      <Input
                        id="codIbge"
                        value={laudoData.codIbge || ""}
                        onChange={(e) => handleLaudoChange("codIbge", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="uf">UF</Label>
                      <Input
                        id="uf"
                        value={laudoData.uf || ""}
                        onChange={(e) => handleLaudoChange("uf", e.target.value)}
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={laudoData.cep || ""}
                        onChange={(e) => handleLaudoChange("cep", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Procedimentos */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Procedimentos Solicitados</h3>
                  <div className="grid grid-cols-[1fr_2fr_100px] gap-4">
                    <div>
                      <Label htmlFor="codigoProcedimento1">Código 1</Label>
                      <Input
                        id="codigoProcedimento1"
                        value={laudoData.codigoProcedimento1 || ""}
                        onChange={(e) => handleLaudoChange("codigoProcedimento1", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomeProcedimento1">Nome Procedimento 1</Label>
                      <Input
                        id="nomeProcedimento1"
                        value={laudoData.nomeProcedimento1 || ""}
                        onChange={(e) => handleLaudoChange("nomeProcedimento1", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="qtde1">Qtde</Label>
                      <Input
                        id="qtde1"
                        type="number"
                        value={laudoData.qtde1 || ""}
                        onChange={(e) => handleLaudoChange("qtde1", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="codigoProcedimento2">Código 2</Label>
                      <Input
                        id="codigoProcedimento2"
                        value={laudoData.codigoProcedimento2 || ""}
                        onChange={(e) => handleLaudoChange("codigoProcedimento2", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomeProcedimento2">Nome Procedimento 2</Label>
                      <Input
                        id="nomeProcedimento2"
                        value={laudoData.nomeProcedimento2 || ""}
                        onChange={(e) => handleLaudoChange("nomeProcedimento2", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="qtde2">Qtde</Label>
                      <Input
                        id="qtde2"
                        type="number"
                        value={laudoData.qtde2 || ""}
                        onChange={(e) => handleLaudoChange("qtde2", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="codigoProcedimento3">Código 3</Label>
                      <Input
                        id="codigoProcedimento3"
                        value={laudoData.codigoProcedimento3 || ""}
                        onChange={(e) => handleLaudoChange("codigoProcedimento3", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomeProcedimento3">Nome Procedimento 3</Label>
                      <Input
                        id="nomeProcedimento3"
                        value={laudoData.nomeProcedimento3 || ""}
                        onChange={(e) => handleLaudoChange("nomeProcedimento3", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="qtde3">Qtde</Label>
                      <Input
                        id="qtde3"
                        type="number"
                        value={laudoData.qtde3 || ""}
                        onChange={(e) => handleLaudoChange("qtde3", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Justificativa */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Justificativa</h3>
                  <div className="space-y-4">
                    <div>
                      <RequiredLabel htmlFor="descricaoDiagnostico">Descrição do Diagnóstico</RequiredLabel>
                      <Textarea
                        id="descricaoDiagnostico"
                        value={laudoData.descricaoDiagnostico || ""}
                        onChange={(e) => handleLaudoChange("descricaoDiagnostico", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <RequiredLabel htmlFor="cid10Principal">CID-10 Principal</RequiredLabel>
                        <Input
                          id="cid10Principal"
                          value={laudoData.cid10Principal || ""}
                          onChange={(e) => handleLaudoChange("cid10Principal", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cid10Secundario">CID-10 Secundário</Label>
                        <Input
                          id="cid10Secundario"
                          value={laudoData.cid10Secundario || ""}
                          onChange={(e) => handleLaudoChange("cid10Secundario", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cid10CausasAssociadas">CID-10 Causas Associadas</Label>
                        <Input
                          id="cid10CausasAssociadas"
                          value={laudoData.cid10CausasAssociadas || ""}
                          onChange={(e) => handleLaudoChange("cid10CausasAssociadas", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="resumoAnamnese">Resumo da Anamnese</Label>
                      <Textarea
                        id="resumoAnamnese"
                        value={laudoData.resumoAnamnese || ""}
                        onChange={(e) => handleLaudoChange("resumoAnamnese", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="examesComplementares">Exames Complementares</Label>
                      <Textarea
                        id="examesComplementares"
                        value={laudoData.examesComplementares || ""}
                        onChange={(e) => handleLaudoChange("examesComplementares", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="justificativaProcedimento">Justificativa do Procedimento</Label>
                      <Textarea
                        id="justificativaProcedimento"
                        value={laudoData.justificativaProcedimento || ""}
                        onChange={(e) => handleLaudoChange("justificativaProcedimento", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Solicitação */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Solicitação</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <RequiredLabel htmlFor="nomeProfissionalSolicitante">Profissional Solicitante</RequiredLabel>
                      <Input
                        id="nomeProfissionalSolicitante"
                        value={laudoData.nomeProfissionalSolicitante || ""}
                        onChange={(e) => handleLaudoChange("nomeProfissionalSolicitante", e.target.value)}
                      />
                    </div>
                    <div>
                      <RequiredLabel htmlFor="dataSolicitacao">Data da Solicitação</RequiredLabel>
                      <Input
                        id="dataSolicitacao"
                        type="date"
                        value={laudoData.dataSolicitacao || ""}
                        onChange={(e) => handleLaudoChange("dataSolicitacao", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="documentoSolicitante">Tipo de Documento</Label>
                      <Select
                        value={laudoData.documentoSolicitante || ""}
                        onValueChange={(value) => handleLaudoChange("documentoSolicitante", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CNS">CNS</SelectItem>
                          <SelectItem value="CPF">CPF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="numeroDocumentoSolicitante">Número do Documento</Label>
                      <Input
                        id="numeroDocumentoSolicitante"
                        value={laudoData.numeroDocumentoSolicitante || ""}
                        onChange={(e) => handleLaudoChange("numeroDocumentoSolicitante", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Autorização */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Autorização</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeProfissionalAutorizador">Profissional Autorizador</Label>
                      <Input
                        id="nomeProfissionalAutorizador"
                        value={laudoData.nomeProfissionalAutorizador || ""}
                        onChange={(e) => handleLaudoChange("nomeProfissionalAutorizador", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="codOrgaoEmissor">Código Órgão Emissor</Label>
                      <Input
                        id="codOrgaoEmissor"
                        value={laudoData.codOrgaoEmissor || ""}
                        onChange={(e) => handleLaudoChange("codOrgaoEmissor", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="complementares">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Identificação Patológica */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Identificação Patológica - Oncologia</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <RequiredLabel htmlFor="cid10Topografia">CID-10 Topografia</RequiredLabel>
                      <Input
                        id="cid10Topografia"
                        value={dadosComplementaresData.cid10Topografia || ""}
                        onChange={(e) => handleDadosChange("cid10Topografia", e.target.value)}
                      />
                    </div>
                    <div>
                      <RequiredLabel htmlFor="localizacaoTumor">Localização do Tumor</RequiredLabel>
                      <Input
                        id="localizacaoTumor"
                        value={dadosComplementaresData.localizacaoTumor || ""}
                        onChange={(e) => handleDadosChange("localizacaoTumor", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linfonodosInvadidos">Linfonodos Invadidos</Label>
                      <Select
                        value={dadosComplementaresData.linfonodosInvadidos || ""}
                        onValueChange={(value) => handleDadosChange("linfonodosInvadidos", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SIM">Sim</SelectItem>
                          <SelectItem value="NAO">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="localizacaoMetastase">Localização de Metástase</Label>
                      <Input
                        id="localizacaoMetastase"
                        value={dadosComplementaresData.localizacaoMetastase || ""}
                        onChange={(e) => handleDadosChange("localizacaoMetastase", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="estadioUICC">Estádio UICC</Label>
                      <Input
                        id="estadioUICC"
                        value={dadosComplementaresData.estadioUICC || ""}
                        onChange={(e) => handleDadosChange("estadioUICC", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="estadioOutro">Estádio (Outro)</Label>
                      <Input
                        id="estadioOutro"
                        value={dadosComplementaresData.estadioOutro || ""}
                        onChange={(e) => handleDadosChange("estadioOutro", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="grauHistopatologico">Grau Histopatológico</Label>
                      <Input
                        id="grauHistopatologico"
                        value={dadosComplementaresData.grauHistopatologico || ""}
                        onChange={(e) => handleDadosChange("grauHistopatologico", e.target.value)}
                      />
                    </div>
                    <div>
                      <RequiredLabel htmlFor="diagnosticoCitoHistopatologico">Diagnóstico Cito/Histopatológico</RequiredLabel>
                      <Input
                        id="diagnosticoCitoHistopatologico"
                        value={dadosComplementaresData.diagnosticoCitoHistopatologico || ""}
                        onChange={(e) => handleDadosChange("diagnosticoCitoHistopatologico", e.target.value)}
                      />
                    </div>
                    <div>
                      <RequiredLabel htmlFor="dataDiagnostico">Data do Diagnóstico</RequiredLabel>
                      <Input
                        id="dataDiagnostico"
                        type="date"
                        value={dadosComplementaresData.dataDiagnostico || ""}
                        onChange={(e) => handleDadosChange("dataDiagnostico", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Quimioterapia */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Quimioterapia</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Tratamento Anterior</Label>
                      <Select
                        value={dadosComplementaresData.quimioTratamentoAnterior || ""}
                        onValueChange={(value) => handleDadosChange("quimioTratamentoAnterior", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SIM">Sim</SelectItem>
                          <SelectItem value="NAO">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quimioDescricao1">1º Tratamento</Label>
                        <Input
                          id="quimioDescricao1"
                          value={dadosComplementaresData.quimioDescricao1 || ""}
                          onChange={(e) => handleDadosChange("quimioDescricao1", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioDataInicio1">Data Início</Label>
                        <Input
                          id="quimioDataInicio1"
                          type="date"
                          value={dadosComplementaresData.quimioDataInicio1 || ""}
                          onChange={(e) => handleDadosChange("quimioDataInicio1", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioDescricao2">2º Tratamento</Label>
                        <Input
                          id="quimioDescricao2"
                          value={dadosComplementaresData.quimioDescricao2 || ""}
                          onChange={(e) => handleDadosChange("quimioDescricao2", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioDataInicio2">Data Início</Label>
                        <Input
                          id="quimioDataInicio2"
                          type="date"
                          value={dadosComplementaresData.quimioDataInicio2 || ""}
                          onChange={(e) => handleDadosChange("quimioDataInicio2", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioDescricao3">3º Tratamento</Label>
                        <Input
                          id="quimioDescricao3"
                          value={dadosComplementaresData.quimioDescricao3 || ""}
                          onChange={(e) => handleDadosChange("quimioDescricao3", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioDataInicio3">Data Início</Label>
                        <Input
                          id="quimioDataInicio3"
                          type="date"
                          value={dadosComplementaresData.quimioDataInicio3 || ""}
                          onChange={(e) => handleDadosChange("quimioDataInicio3", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioContinuidade">Continuidade</Label>
                        <Select
                          value={dadosComplementaresData.quimioContinuidade || ""}
                          onValueChange={(value) => handleDadosChange("quimioContinuidade", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SIM">Sim</SelectItem>
                            <SelectItem value="NAO">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="quimioDataInicioSolicitado">Data Início Solicitado</Label>
                        <Input
                          id="quimioDataInicioSolicitado"
                          type="date"
                          value={dadosComplementaresData.quimioDataInicioSolicitado || ""}
                          onChange={(e) => handleDadosChange("quimioDataInicioSolicitado", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioEsquema">Esquema</Label>
                        <Input
                          id="quimioEsquema"
                          value={dadosComplementaresData.quimioEsquema || ""}
                          onChange={(e) => handleDadosChange("quimioEsquema", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioNumMesesPlanejados">Meses Planejados</Label>
                        <Input
                          id="quimioNumMesesPlanejados"
                          type="number"
                          value={dadosComplementaresData.quimioNumMesesPlanejados || ""}
                          onChange={(e) => handleDadosChange("quimioNumMesesPlanejados", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quimioNumMesesAutorizados">Meses Autorizados</Label>
                        <Input
                          id="quimioNumMesesAutorizados"
                          type="number"
                          value={dadosComplementaresData.quimioNumMesesAutorizados || ""}
                          onChange={(e) => handleDadosChange("quimioNumMesesAutorizados", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Radioterapia */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Radioterapia</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Tratamento Anterior</Label>
                      <Select
                        value={dadosComplementaresData.radioTratamentoAnterior || ""}
                        onValueChange={(value) => handleDadosChange("radioTratamentoAnterior", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SIM">Sim</SelectItem>
                          <SelectItem value="NAO">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="radioDescricao1">1º Tratamento</Label>
                        <Input
                          id="radioDescricao1"
                          value={dadosComplementaresData.radioDescricao1 || ""}
                          onChange={(e) => handleDadosChange("radioDescricao1", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="radioDataInicio1">Data Início</Label>
                        <Input
                          id="radioDataInicio1"
                          type="date"
                          value={dadosComplementaresData.radioDataInicio1 || ""}
                          onChange={(e) => handleDadosChange("radioDataInicio1", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="radioDescricao2">2º Tratamento</Label>
                        <Input
                          id="radioDescricao2"
                          value={dadosComplementaresData.radioDescricao2 || ""}
                          onChange={(e) => handleDadosChange("radioDescricao2", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="radioDataInicio2">Data Início</Label>
                        <Input
                          id="radioDataInicio2"
                          type="date"
                          value={dadosComplementaresData.radioDataInicio2 || ""}
                          onChange={(e) => handleDadosChange("radioDataInicio2", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="radioDescricao3">3º Tratamento</Label>
                        <Input
                          id="radioDescricao3"
                          value={dadosComplementaresData.radioDescricao3 || ""}
                          onChange={(e) => handleDadosChange("radioDescricao3", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="radioDataInicio3">Data Início</Label>
                        <Input
                          id="radioDataInicio3"
                          type="date"
                          value={dadosComplementaresData.radioDataInicio3 || ""}
                          onChange={(e) => handleDadosChange("radioDataInicio3", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="radioContinuidade">Continuidade</Label>
                        <Select
                          value={dadosComplementaresData.radioContinuidade || ""}
                          onValueChange={(value) => handleDadosChange("radioContinuidade", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SIM">Sim</SelectItem>
                            <SelectItem value="NAO">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="radioDataInicioSolicitado">Data Início Solicitado</Label>
                        <Input
                          id="radioDataInicioSolicitado"
                          type="date"
                          value={dadosComplementaresData.radioDataInicioSolicitado || ""}
                          onChange={(e) => handleDadosChange("radioDataInicioSolicitado", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="radioFinalidade">Finalidade</Label>
                        <Select
                          value={dadosComplementaresData.radioFinalidade || ""}
                          onValueChange={(value) => handleDadosChange("radioFinalidade", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="RADICAL">Radical</SelectItem>
                            <SelectItem value="ADJUVANTE">Adjuvante</SelectItem>
                            <SelectItem value="ANTIALGICA">Antiálgica</SelectItem>
                            <SelectItem value="PALIATIVA">Paliativa</SelectItem>
                            <SelectItem value="PREVIA">Prévia</SelectItem>
                            <SelectItem value="ANTIHEMORRAGICA">Anti-hemorrágica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cirurgia */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg">Cirurgia</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Teve Cirurgia Anterior</Label>
                      <Select
                        value={dadosComplementaresData.cirurgiaTratamentoAnterior || ""}
                        onValueChange={(value) => handleDadosChange("cirurgiaTratamentoAnterior", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SIM">Sim</SelectItem>
                          <SelectItem value="NAO">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cirurgiaData">Data da Cirurgia</Label>
                      <Input
                        id="cirurgiaData"
                        type="date"
                        value={dadosComplementaresData.cirurgiaData || ""}
                        onChange={(e) => handleDadosChange("cirurgiaData", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="cirurgiaTipo">Tipo de Cirurgia</Label>
                      <Input
                        id="cirurgiaTipo"
                        value={dadosComplementaresData.cirurgiaTipo || ""}
                        onChange={(e) => handleDadosChange("cirurgiaTipo", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleUpdate}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};