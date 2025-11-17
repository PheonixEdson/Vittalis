import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Home, Upload, FileText, Download, Edit2, Save, X, AlertCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { parseXMLFracionamento, validateXMLFile, DadosFracionamento } from "@/lib/xmlParser";
import { supabase } from "@/integrations/supabase/client";
import { PedidoMedicamentoDialog } from "@/components/dialogs/PedidoMedicamentoDialog";

const Estoquista = () => {
  const navigate = useNavigate();
  
  // Estados para fracionamento
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [dadosFracionamento, setDadosFracionamento] = useState<DadosFracionamento | null>(null);
  const [dadosEditaveis, setDadosEditaveis] = useState<any>(null);
  const [isProcessingXML, setIsProcessingXML] = useState(false);
  const [xmlError, setXmlError] = useState<string | null>(null);
  const [isEditingData, setIsEditingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [historicoFracionamento, setHistoricoFracionamento] = useState<any[]>([]);
  const [isLoadingHistorico, setIsLoadingHistorico] = useState(false);
  const [xmlContent, setXmlContent] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Estados para gestão de estoque
  const [pedidoDialogOpen, setPedidoDialogOpen] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState<{nome: string, atual: number, minimo: number} | null>(null);

  // Carregar histórico de fracionamento
  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    setIsLoadingHistorico(true);
    try {
      const { data, error } = await (supabase as any)
        .from('fracionamento_medicamentos')
        .select('*')
        .order('data_processo', { ascending: false });

      if (error) throw error;
      setHistoricoFracionamento(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setIsLoadingHistorico(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setXmlFile(file);
    setXmlError(null);
    setValidationErrors([]);
    setIsProcessingXML(true);

    try {
      // Validar e ler o arquivo
      const xmlContentString = await validateXMLFile(file);
      setXmlContent(xmlContentString);
      
      // Parse do XML
      const dados = parseXMLFracionamento(xmlContentString);
      
      setDadosFracionamento(dados);
      
      // Inicializar dados editáveis com valores do XML
      setDadosEditaveis({
        nomeMedicamento: dados.nomeMedicamento,
        lote: dados.lote,
        quantidadeFracionada: dados.quantidadeFracionada,
        quantidadeOriginal: dados.quantidadeOriginal,
        dataFracionamento: dados.dataFracionamento,
        codigoBarrasOriginal: dados.codigoBarrasOriginal,
        codigoBarrasFracionado: dados.codigoBarrasFracionado,
        numeroSerie: dados.numeroSerie || '',
        informacoesMaquina: dados.informacoesMaquina || '',
        codigoProduto: '',
        fabricacao: '',
        validade: '',
        unidade: 'mg',
        registroAnvisa: '',
        responsavelTecnico: ''
      });

      toast({
        title: "XML processado com sucesso!",
        description: "Revise os dados e clique em 'Confirmar Dados' para salvar.",
      });
    } catch (error: any) {
      console.error('Erro ao processar XML:', error);
      setXmlError(error.message || 'Erro ao processar o arquivo XML');
      setDadosFracionamento(null);
      setDadosEditaveis(null);
      
      toast({
        title: "Erro ao processar arquivo",
        description: error.message || "Não foi possível processar o arquivo XML.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingXML(false);
    }
  };

  const verificarLoteDuplicado = async (lote: string): Promise<boolean> => {
    try {
      const { data, error } = await (supabase as any)
        .from('fracionamento_medicamentos')
        .select('id')
        .eq('lote', lote)
        .limit(1);

      if (error) throw error;
      return data && data.length > 0;
    } catch (error) {
      console.error('Erro ao verificar lote:', error);
      return false;
    }
  };

  const validateDadosEditaveis = () => {
    const errors: string[] = [];

    if (!dadosEditaveis.nomeMedicamento?.trim()) {
      errors.push('Nome do medicamento é obrigatório');
    }
    if (!dadosEditaveis.lote?.trim()) {
      errors.push('Lote é obrigatório');
    }
    if (!dadosEditaveis.quantidadeOriginal || parseFloat(dadosEditaveis.quantidadeOriginal) <= 0) {
      errors.push('Quantidade original deve ser maior que zero');
    }
    if (!dadosEditaveis.quantidadeFracionada || parseFloat(dadosEditaveis.quantidadeFracionada) <= 0) {
      errors.push('Quantidade fracionada deve ser maior que zero');
    }
    if (!dadosEditaveis.dataFracionamento) {
      errors.push('Data de fracionamento é obrigatória');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleConfirmarDados = async () => {
    if (!validateDadosEditaveis()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros antes de salvar.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const loteDuplicado = await verificarLoteDuplicado(dadosEditaveis.lote);
      
      if (loteDuplicado) {
        const confirmar = window.confirm(
          `O lote "${dadosEditaveis.lote}" já existe no sistema. Deseja continuar mesmo assim?`
        );
        
        if (!confirmar) {
          setIsSaving(false);
          return;
        }
      }

      const dadosParaSalvar = {
        nome_medicamento: dadosEditaveis.nomeMedicamento,
        codigo_produto: dadosEditaveis.codigoProduto || null,
        lote: dadosEditaveis.lote,
        fabricacao: dadosEditaveis.fabricacao || null,
        validade: dadosEditaveis.validade || null,
        quantidade_total: parseFloat(dadosEditaveis.quantidadeOriginal),
        quantidade_fracionada: parseFloat(dadosEditaveis.quantidadeFracionada),
        unidade: dadosEditaveis.unidade || null,
        registro_anvisa: dadosEditaveis.registroAnvisa || null,
        data_processo: new Date(dadosEditaveis.dataFracionamento).toISOString(),
        id_maquina: dadosEditaveis.informacoesMaquina || null,
        responsavel_tecnico: dadosEditaveis.responsavelTecnico || null,
        xml_original: xmlContent,
        codigo_barras_original: dadosEditaveis.codigoBarrasOriginal,
        codigo_barras_fracionado: dadosEditaveis.codigoBarrasFracionado,
        numero_serie: dadosEditaveis.numeroSerie || null,
        informacoes_maquina: dadosEditaveis.informacoesMaquina || null
      };

      const { error } = await (supabase as any)
        .from('fracionamento_medicamentos')
        .insert([dadosParaSalvar]);

      if (error) throw error;

      toast({
        title: "Dados importados com sucesso!",
        description: "O fracionamento foi registrado no sistema.",
      });

      setXmlFile(null);
      setDadosFracionamento(null);
      setDadosEditaveis(null);
      setXmlError(null);
      setValidationErrors([]);
      setIsEditingData(false);

      carregarHistorico();
    } catch (error: any) {
      console.error('Erro ao salvar:', error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível salvar o fracionamento.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const baixarXML = (xmlOriginal: string, nomeMedicamento: string) => {
    const blob = new Blob([xmlOriginal], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nomeMedicamento.replace(/\s+/g, '_')}_fracionamento.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Mock data para estoque baixo
  const medicamentosEstoqueBaixo = [
    { nome: "Paclitaxel 100mg", atual: 8, minimo: 10, custo: "R$ 450" },
    { nome: "Cisplatina 50mg", atual: 12, minimo: 15, custo: "R$ 120" },
    { nome: "Ondansetrona 8mg", atual: 25, minimo: 30, custo: "R$ 35" },
    { nome: "Doxorrubicina 50mg", atual: 5, minimo: 8, custo: "R$ 280" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Vittalis - Área do Estoquista</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/cadastro-estoquista")}>
              Cadastro Estoquista
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="fracionamento" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fracionamento">
              <FileText className="h-4 w-4 mr-2" />
              Fracionamento
            </TabsTrigger>
            <TabsTrigger value="estoque">
              <Package className="h-4 w-4 mr-2" />
              Gestão de Estoque
            </TabsTrigger>
          </TabsList>

          {/* Aba de Fracionamento */}
          <TabsContent value="fracionamento" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Importar XML de Fracionamento</CardTitle>
                <CardDescription>
                  Faça upload do arquivo XML gerado pela máquina de fracionamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="xml-upload">Arquivo XML</Label>
                  <Input
                    id="xml-upload"
                    type="file"
                    accept=".xml"
                    onChange={handleFileChange}
                    disabled={isProcessingXML}
                  />
                  {isProcessingXML && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Processando arquivo...
                    </p>
                  )}
                </div>

                {xmlError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro ao processar XML</AlertTitle>
                    <AlertDescription>
                      {xmlError}
                      {validationErrors.length > 0 && (
                        <ul className="list-disc list-inside mt-2">
                          {validationErrors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                          ))}
                        </ul>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {dadosEditaveis && (
                  <>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Revise os dados extraídos</AlertTitle>
                      <AlertDescription>
                        Os dados abaixo foram extraídos do XML. Revise e edite se necessário antes de confirmar.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome do Medicamento *</Label>
                        <Input
                          value={dadosEditaveis.nomeMedicamento}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, nomeMedicamento: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Código do Produto</Label>
                        <Input
                          value={dadosEditaveis.codigoProduto}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, codigoProduto: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Lote *</Label>
                        <Input
                          value={dadosEditaveis.lote}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, lote: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Data de Fabricação</Label>
                        <Input
                          type="date"
                          value={dadosEditaveis.fabricacao}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, fabricacao: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Data de Validade</Label>
                        <Input
                          type="date"
                          value={dadosEditaveis.validade}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, validade: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Quantidade Original *</Label>
                        <Input
                          type="number"
                          value={dadosEditaveis.quantidadeOriginal}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, quantidadeOriginal: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Quantidade Fracionada *</Label>
                        <Input
                          type="number"
                          value={dadosEditaveis.quantidadeFracionada}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, quantidadeFracionada: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Unidade</Label>
                        <Input
                          value={dadosEditaveis.unidade}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, unidade: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Registro ANVISA</Label>
                        <Input
                          value={dadosEditaveis.registroAnvisa}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, registroAnvisa: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Data de Fracionamento *</Label>
                        <Input
                          type="date"
                          value={dadosEditaveis.dataFracionamento}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, dataFracionamento: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>Responsável Técnico</Label>
                        <Input
                          value={dadosEditaveis.responsavelTecnico}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, responsavelTecnico: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                      <div>
                        <Label>ID da Máquina</Label>
                        <Input
                          value={dadosEditaveis.informacoesMaquina}
                          onChange={(e) => setDadosEditaveis({...dadosEditaveis, informacoesMaquina: e.target.value})}
                          disabled={!isEditingData}
                        />
                      </div>
                    </div>

                    {validationErrors.length > 0 && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erros de validação</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc list-inside">
                            {validationErrors.map((err, idx) => (
                              <li key={idx}>{err}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-2">
                      {!isEditingData ? (
                        <>
                          <Button
                            onClick={() => setIsEditingData(true)}
                            variant="outline"
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Editar Dados
                          </Button>
                          <Button
                            onClick={handleConfirmarDados}
                            disabled={isSaving}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {isSaving ? "Salvando..." : "Confirmar Dados"}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => setIsEditingData(false)}
                            variant="outline"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancelar Edição
                          </Button>
                          <Button
                            onClick={handleConfirmarDados}
                            disabled={isSaving}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {isSaving ? "Salvando..." : "Confirmar Dados"}
                          </Button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Histórico de Fracionamento */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Fracionamento</CardTitle>
                <CardDescription>
                  Registros de fracionamentos realizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingHistorico ? (
                  <p className="text-center text-muted-foreground">Carregando histórico...</p>
                ) : historicoFracionamento.length === 0 ? (
                  <p className="text-center text-muted-foreground">Nenhum registro encontrado</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medicamento</TableHead>
                          <TableHead>Lote</TableHead>
                          <TableHead>Qtd. Total</TableHead>
                          <TableHead>Qtd. Fracionada</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historicoFracionamento.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.nome_medicamento}</TableCell>
                            <TableCell>{item.lote}</TableCell>
                            <TableCell>{item.quantidade_total} {item.unidade}</TableCell>
                            <TableCell>{item.quantidade_fracionada} {item.unidade}</TableCell>
                            <TableCell>{new Date(item.data_processo).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              {item.xml_original && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => baixarXML(item.xml_original, item.nome_medicamento)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Gestão de Estoque */}
          <TabsContent value="estoque" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Custo Total Estoque</p>
                <p className="text-3xl font-bold text-primary">R$ 85k</p>
                <p className="text-xs text-muted-foreground mt-2">Valor atual</p>
              </div>
              <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Itens Abaixo do Mínimo</p>
                <p className="text-3xl font-bold text-destructive">{medicamentosEstoqueBaixo.length}</p>
                <p className="text-xs text-muted-foreground mt-2">Requer atenção</p>
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
                {medicamentosEstoqueBaixo.map((med, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{med.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        Estoque: {med.atual} / Mínimo: {med.minimo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{med.custo}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-1"
                        onClick={() => {
                          setMedicamentoSelecionado(med);
                          setPedidoDialogOpen(true);
                        }}
                      >
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
                      Analise o histórico dos últimos 3-6 meses para determinar a quantidade ideal
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-2">⏰ Atenção ao prazo de validade</p>
                    <p className="text-muted-foreground">
                      Evite pedidos em excesso que podem resultar em medicamentos vencidos
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-2">💰 Otimize custos de armazenamento</p>
                    <p className="text-muted-foreground">
                      Considere o custo de manutenção do estoque versus economia em compras maiores
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo de Pedido de Medicamento */}
      <PedidoMedicamentoDialog
        open={pedidoDialogOpen}
        onOpenChange={setPedidoDialogOpen}
        medicamento={medicamentoSelecionado}
      />
    </div>
  );
};

export default Estoquista;
