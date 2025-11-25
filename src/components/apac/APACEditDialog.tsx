import { useState } from "react";
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

export const APACEditDialog = ({ apac, open, onOpenChange, onUpdate }: APACEditDialogProps) => {
  const [novoStatus, setNovoStatus] = useState(apac?.status || "");
  const [observacoes, setObservacoes] = useState(apac?.observacoes || "");
  const [laudoData, setLaudoData] = useState(apac?.dados_formulario?.laudo || {});
  const [dadosComplementaresData, setDadosComplementaresData] = useState(apac?.dados_formulario?.dadosComplementares || {});

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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar APAC</DialogTitle>
          <DialogDescription>
            Edite os dados da APAC e atualize o status
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

          <TabsContent value="laudo" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomePaciente">Nome do Paciente *</Label>
                <Input
                  id="nomePaciente"
                  value={laudoData.nomePaciente || ""}
                  onChange={(e) => setLaudoData({ ...laudoData, nomePaciente: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="cns">CNS *</Label>
                <Input
                  id="cns"
                  value={laudoData.cns || ""}
                  onChange={(e) => setLaudoData({ ...laudoData, cns: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={laudoData.dataNascimento || ""}
                  onChange={(e) => setLaudoData({ ...laudoData, dataNascimento: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sexo">Sexo *</Label>
                <Select
                  value={laudoData.sexo || ""}
                  onValueChange={(value) => setLaudoData({ ...laudoData, sexo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="descricaoDiagnostico">Descrição do Diagnóstico *</Label>
                <Textarea
                  id="descricaoDiagnostico"
                  value={laudoData.descricaoDiagnostico || ""}
                  onChange={(e) => setLaudoData({ ...laudoData, descricaoDiagnostico: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="cid10Principal">CID-10 Principal *</Label>
                <Input
                  id="cid10Principal"
                  value={laudoData.cid10Principal || ""}
                  onChange={(e) => setLaudoData({ ...laudoData, cid10Principal: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="nomeProfissionalSolicitante">Profissional Solicitante *</Label>
                <Input
                  id="nomeProfissionalSolicitante"
                  value={laudoData.nomeProfissionalSolicitante || ""}
                  onChange={(e) => setLaudoData({ ...laudoData, nomeProfissionalSolicitante: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="dataSolicitacao">Data da Solicitação *</Label>
                <Input
                  id="dataSolicitacao"
                  type="date"
                  value={laudoData.dataSolicitacao || ""}
                  onChange={(e) => setLaudoData({ ...laudoData, dataSolicitacao: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="complementares" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cid10Topografia">CID-10 Topografia *</Label>
                <Input
                  id="cid10Topografia"
                  value={dadosComplementaresData.cid10Topografia || ""}
                  onChange={(e) => setDadosComplementaresData({ ...dadosComplementaresData, cid10Topografia: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="localizacaoTumor">Localização do Tumor *</Label>
                <Input
                  id="localizacaoTumor"
                  value={dadosComplementaresData.localizacaoTumor || ""}
                  onChange={(e) => setDadosComplementaresData({ ...dadosComplementaresData, localizacaoTumor: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="diagnosticoCitoHistopatologico">Diagnóstico Citohistopatológico *</Label>
                <Textarea
                  id="diagnosticoCitoHistopatologico"
                  value={dadosComplementaresData.diagnosticoCitoHistopatologico || ""}
                  onChange={(e) => setDadosComplementaresData({ ...dadosComplementaresData, diagnosticoCitoHistopatologico: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="dataDiagnostico">Data do Diagnóstico *</Label>
                <Input
                  id="dataDiagnostico"
                  type="date"
                  value={dadosComplementaresData.dataDiagnostico || ""}
                  onChange={(e) => setDadosComplementaresData({ ...dadosComplementaresData, dataDiagnostico: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
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