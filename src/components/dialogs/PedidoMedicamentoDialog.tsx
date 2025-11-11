import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Upload, Package } from "lucide-react";

interface PedidoMedicamentoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicamento: {
    nome: string;
    atual: number;
    minimo: number;
  } | null;
}

export function PedidoMedicamentoDialog({ open, onOpenChange, medicamento }: PedidoMedicamentoDialogProps) {
  const [loading, setLoading] = useState(false);
  
  // Estados do formulário
  const [quantidade, setQuantidade] = useState("");
  const [mg, setMg] = useState("");
  const [numeroLote, setNumeroLote] = useState("");
  const [fornecedorNome, setFornecedorNome] = useState("");
  const [fornecedorCNPJ, setFornecedorCNPJ] = useState("");
  const [tempoSaidaDeposito, setTempoSaidaDeposito] = useState("");
  const [dataEstimadaEntrega, setDataEstimadaEntrega] = useState("");
  const [destinoEntrega, setDestinoEntrega] = useState("");
  const [horarioEstimado, setHorarioEstimado] = useState("");
  const [notaFiscalNumero, setNotaFiscalNumero] = useState("");
  const [notaFiscalFile, setNotaFiscalFile] = useState<File | null>(null);
  const [estoquistaNome, setEstoquistaNome] = useState("");
  const [estoquistaMatricula, setEstoquistaMatricula] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    if (open && medicamento) {
      // Resetar campos ao abrir
      setQuantidade(String(medicamento.minimo * 2));
      setMg("");
      setNumeroLote("");
      setFornecedorNome("");
      setFornecedorCNPJ("");
      setTempoSaidaDeposito("5-7 dias úteis");
      setDataEstimadaEntrega("");
      setDestinoEntrega("Farmácia Central - Hospital Vittalis");
      setHorarioEstimado("14:00");
      setNotaFiscalNumero("");
      setNotaFiscalFile(null);
      setEstoquistaNome("");
      setEstoquistaMatricula("");
      setObservacoes("");
    }
  }, [open, medicamento]);

  const handleSubmit = async () => {
    // Validações
    if (!quantidade || !mg || !fornecedorNome || !fornecedorCNPJ || !dataEstimadaEntrega) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios marcados com *",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Simular salvamento (aqui você integraria com o Supabase)
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Pedido realizado com sucesso!",
        description: `Pedido de ${quantidade} unidades de ${medicamento?.nome} foi registrado e enviado para ${fornecedorNome}.`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      toast({
        title: "Erro ao criar pedido",
        description: "Não foi possível realizar o pedido. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Solicitar Pedido de Medicamento
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes do pedido para solicitar diretamente ao fornecedor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Medicamento */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              📦 Medicamento Solicitado
            </h3>
            <p className="text-sm font-medium">{medicamento?.nome}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Estoque atual: <span className="font-semibold text-destructive">{medicamento?.atual}</span> | 
              Mínimo recomendado: <span className="font-semibold text-warning">{medicamento?.minimo}</span>
            </p>
          </div>

          {/* Dados do Pedido */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">📋 Detalhes do Pedido</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantidade" className="flex items-center gap-1">
                  Quantidade Solicitada <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  placeholder="Ex: 50"
                  min={medicamento?.minimo || 1}
                />
                <p className="text-xs text-muted-foreground">
                  Quantidade mínima sugerida: {medicamento?.minimo}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mg" className="flex items-center gap-1">
                  Concentração (mg) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mg"
                  value={mg}
                  onChange={(e) => setMg(e.target.value)}
                  placeholder="Ex: 100mg/16,7mL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroLote">Número do Lote</Label>
                <Input
                  id="numeroLote"
                  value={numeroLote}
                  onChange={(e) => setNumeroLote(e.target.value)}
                  placeholder="Ex: L2025-001"
                />
              </div>
            </div>
          </div>

          {/* Dados do Fornecedor */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">🏢 Dados do Fornecedor</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fornecedorNome" className="flex items-center gap-1">
                  Nome da Empresa <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fornecedorNome"
                  value={fornecedorNome}
                  onChange={(e) => setFornecedorNome(e.target.value)}
                  placeholder="Ex: Farmacêutica São Paulo Ltda"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fornecedorCNPJ" className="flex items-center gap-1">
                  CNPJ <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fornecedorCNPJ"
                  value={fornecedorCNPJ}
                  onChange={(e) => setFornecedorCNPJ(e.target.value)}
                  placeholder="00.000.000/0000-00"
                  maxLength={18}
                />
              </div>
            </div>
          </div>

          {/* Dados de Entrega */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">🚚 Informações de Entrega</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tempoSaida">Tempo de Saída do Depósito de Distribuição</Label>
                <Input
                  id="tempoSaida"
                  value={tempoSaidaDeposito}
                  onChange={(e) => setTempoSaidaDeposito(e.target.value)}
                  placeholder="Ex: 5-7 dias úteis"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataEntrega" className="flex items-center gap-1">
                  Data Estimada de Entrega <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dataEntrega"
                  type="date"
                  value={dataEstimadaEntrega}
                  onChange={(e) => setDataEstimadaEntrega(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horario">Horário Estimado</Label>
                <Input
                  id="horario"
                  type="time"
                  value={horarioEstimado}
                  onChange={(e) => setHorarioEstimado(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destino" className="flex items-center gap-1">
                  Destino de Entrega <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="destino"
                  value={destinoEntrega}
                  onChange={(e) => setDestinoEntrega(e.target.value)}
                  placeholder="Ex: Farmácia Central"
                />
              </div>
            </div>
          </div>

          {/* Nota Fiscal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">📄 Submissão de Nota Fiscal</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="notaNumero">Número da Nota Fiscal</Label>
                <Input
                  id="notaNumero"
                  value={notaFiscalNumero}
                  onChange={(e) => setNotaFiscalNumero(e.target.value)}
                  placeholder="Ex: NF-2025-00123"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notaFile">Upload da Nota Fiscal (PDF)</Label>
                <div className="flex gap-2">
                  <Input
                    id="notaFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setNotaFiscalFile(e.target.files?.[0] || null)}
                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {notaFiscalFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {notaFiscalFile ? `Arquivo: ${notaFiscalFile.name}` : "Formatos aceitos: PDF, JPG, PNG"}
                </p>
              </div>
            </div>
          </div>

          {/* Dados do Estoquista */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">👤 Dados do Estoquista Responsável (Recebimento)</h3>
            <p className="text-sm text-muted-foreground">
              Informações do estoquista que irá receber o lote
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estoquistaNome">Nome do Estoquista</Label>
                <Input
                  id="estoquistaNome"
                  value={estoquistaNome}
                  onChange={(e) => setEstoquistaNome(e.target.value)}
                  placeholder="Ex: Carlos Alberto Santos"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estoquistaMatricula">Código da Matrícula de Contrato</Label>
                <Input
                  id="estoquistaMatricula"
                  value={estoquistaMatricula}
                  onChange={(e) => setEstoquistaMatricula(e.target.value)}
                  placeholder="Ex: EST-2025-001"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              ℹ️ <strong>Nota:</strong> Os dados de data e horário de recebimento serão registrados automaticamente quando o estoquista confirmar o recebimento no sistema.
            </p>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Informações adicionais sobre o pedido, condições especiais de armazenamento, etc..."
              rows={3}
            />
          </div>

          {/* Informações Importantes */}
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="text-sm font-medium mb-2">ℹ️ Informações Importantes</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Após o envio, este pedido será visível na aba do <strong>Farmacêutico</strong> na seção de <strong>Estoque e Distribuição</strong></li>
              <li>• O estoquista designado receberá notificação quando o pedido estiver em trânsito</li>
              <li>• Ao receber o lote, o estoquista deverá registrar: data, horário e código de matrícula no sistema</li>
              <li>• A nota fiscal pode ser anexada posteriormente caso não esteja disponível no momento</li>
              <li>• Status será atualizado automaticamente conforme andamento do pedido</li>
            </ul>
          </div>

          {/* Botões */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Processando pedido..." : "Confirmar Pedido"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
