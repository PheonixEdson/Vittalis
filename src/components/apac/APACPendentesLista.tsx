import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { FileText, Eye, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

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

export const APACPendentesLista = () => {
  const [apacs, setApacs] = useState<APACHistorico[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApac, setSelectedApac] = useState<APACHistorico | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [novoStatus, setNovoStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    carregarAPACs();
  }, []);

  const carregarAPACs = async () => {
    try {
      const { data, error } = await supabase
        .from('apac_historico')
        .select('*')
        .order('data_preenchimento', { ascending: false });

      if (error) throw error;
      setApacs(data || []);
    } catch (error) {
      console.error('Erro ao carregar APACs:', error);
      toast({
        title: "Erro ao carregar APACs",
        description: "Não foi possível carregar a lista de APACs.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatus = async () => {
    if (!selectedApac || !novoStatus) return;

    try {
      const { error } = await supabase
        .from('apac_historico')
        .update({
          status: novoStatus,
          observacoes: observacoes
        })
        .eq('id', selectedApac.id);

      if (error) throw error;

      toast({
        title: "Status atualizado",
        description: "O status da APAC foi atualizado com sucesso."
      });

      setDialogOpen(false);
      carregarAPACs();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status da APAC.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "destructive" | "outline" | "secondary"; label: string }> = {
      pendente: { variant: "secondary", label: "Pendente" },
      aprovado: { variant: "default", label: "Aprovado" },
      rejeitado: { variant: "destructive", label: "Rejeitado" },
      em_analise: { variant: "outline", label: "Em Análise" }
    };

    const config = variants[status] || variants.pendente;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTipoLabel = (tipo: string) => {
    return tipo === 'laudo' ? 'Laudo Médico' : 'Dados Complementares';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>APACs Recebidas</CardTitle>
          <CardDescription>Carregando...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            APACs Recebidas - Faturamento
          </CardTitle>
          <CardDescription>
            Gerencie as APACs enviadas pelos médicos para processamento administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apacs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nenhuma APAC recebida
                  </TableCell>
                </TableRow>
              ) : (
                apacs.map((apac) => (
                  <TableRow key={apac.id}>
                    <TableCell>
                      {format(new Date(apac.data_preenchimento), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{getTipoLabel(apac.tipo_apac)}</TableCell>
                    <TableCell>
                      {apac.dados_formulario?.nomePaciente || 'Não informado'}
                    </TableCell>
                    <TableCell>{getStatusBadge(apac.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedApac(apac);
                            setNovoStatus(apac.status);
                            setObservacoes(apac.observacoes || "");
                            setDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Visualizar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da APAC</DialogTitle>
            <DialogDescription>
              {selectedApac && getTipoLabel(selectedApac.tipo_apac)} - {selectedApac && format(new Date(selectedApac.data_preenchimento), 'dd/MM/yyyy HH:mm')}
            </DialogDescription>
          </DialogHeader>

          {selectedApac && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status Atual</Label>
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
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Adicione observações sobre esta APAC..."
                  rows={4}
                />
              </div>

              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-semibold mb-2">Dados do Formulário:</h4>
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(selectedApac.dados_formulario, null, 2)}
                </pre>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={atualizarStatus}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Atualizar Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
