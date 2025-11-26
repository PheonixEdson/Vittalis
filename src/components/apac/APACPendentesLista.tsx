import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { FileText, Eye, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { APACEditDialog } from "./APACEditDialog";

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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

  const handleDelete = async (apacId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta APAC? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('apac_historico')
        .delete()
        .eq('id', apacId);

      if (error) throw error;

      toast({
        title: "APAC excluída",
        description: "A APAC foi excluída com sucesso."
      });

      carregarAPACs();
    } catch (error) {
      console.error('Erro ao excluir APAC:', error);
      toast({
        title: "Erro ao excluir APAC",
        description: "Não foi possível excluir a APAC.",
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
    if (tipo === 'completo') return 'APAC Completa';
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
                            setEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(apac.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Excluir
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

      <APACEditDialog
        apac={selectedApac}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdate={carregarAPACs}
      />
    </>
  );
};
