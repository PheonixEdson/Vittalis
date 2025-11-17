import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Package, Home, Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PedidoMedicamentoDialog } from "@/components/dialogs/PedidoMedicamentoDialog";

const Estoquista = () => {
  const navigate = useNavigate();
  
  // Estados para gestão de estoque
  const [pedidoDialogOpen, setPedidoDialogOpen] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState<{nome: string, atual: number, minimo: number} | null>(null);
  const [cadastroDialogOpen, setCadastroDialogOpen] = useState(false);
  
  // Estados para produtos
  const [produtos, setProdutos] = useState<any[]>([]);
  const [isLoadingProdutos, setIsLoadingProdutos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroSituacao, setFiltroSituacao] = useState("todos");
  
  // Estados para cadastro
  const [formData, setFormData] = useState({
    nome_medicamento: "",
    lote: "",
    codigo_barras_original: "",
    validade: "",
    quantidade_total: "",
    unidade: "mg",
    fabricacao: "",
    codigo_produto: "",
    registro_anvisa: "",
    responsavel_tecnico: "",
  });

  // Carregar produtos do banco
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    setIsLoadingProdutos(true);
    try {
      const { data, error } = await (supabase as any)
        .from('fracionamento_medicamentos')
        .select('*')
        .order('data_processo', { ascending: false });

      if (error) throw error;
      setProdutos(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar produtos:', error);
      toast({
        title: "Erro ao carregar produtos",
        description: error.message || "Não foi possível carregar os produtos do estoque.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingProdutos(false);
    }
  };

  // Calcular situação do produto
  const calcularSituacao = (validade: string | null, quantidadeTotal: number): string => {
    if (!validade) return 'normal';
    
    const dataValidade = new Date(validade);
    const hoje = new Date();
    const diasAteVencer = Math.floor((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    
    // Estoque baixo (menos de 10 unidades)
    if (quantidadeTotal < 10) return 'baixo';
    
    // Vencido
    if (diasAteVencer < 0) return 'vencido';
    
    // Prestes a vencer (menos de 30 dias)
    if (diasAteVencer <= 30) return 'prestes_vencer';
    
    return 'normal';
  };

  // Filtrar e buscar produtos
  const produtosFiltrados = useMemo(() => {
    let resultado = produtos;

    // Aplicar busca
    if (searchTerm) {
      resultado = resultado.filter(p => 
        p.nome_medicamento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.lote?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.codigo_barras_original?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro de situação
    if (filtroSituacao !== 'todos') {
      resultado = resultado.filter(p => {
        const situacao = calcularSituacao(p.validade, p.quantidade_total);
        return situacao === filtroSituacao;
      });
    }

    return resultado;
  }, [produtos, searchTerm, filtroSituacao]);

  const handleCadastrarProduto = async () => {
    try {
      // Validar campos obrigatórios
      if (!formData.nome_medicamento || !formData.lote || !formData.quantidade_total) {
        toast({
          title: "Erro de validação",
          description: "Preencha todos os campos obrigatórios: Nome, Lote e Quantidade.",
          variant: "destructive",
        });
        return;
      }

      const dadosParaSalvar = {
        nome_medicamento: formData.nome_medicamento,
        lote: formData.lote,
        codigo_barras_original: formData.codigo_barras_original || null,
        validade: formData.validade || null,
        quantidade_total: parseFloat(formData.quantidade_total),
        quantidade_fracionada: 0,
        unidade: formData.unidade || null,
        fabricacao: formData.fabricacao || null,
        codigo_produto: formData.codigo_produto || null,
        registro_anvisa: formData.registro_anvisa || null,
        responsavel_tecnico: formData.responsavel_tecnico || null,
        data_processo: new Date().toISOString(),
      };

      const { error } = await (supabase as any)
        .from('fracionamento_medicamentos')
        .insert([dadosParaSalvar]);

      if (error) throw error;

      toast({
        title: "Produto cadastrado com sucesso!",
        description: "O produto foi adicionado ao estoque.",
      });

      // Limpar formulário e fechar diálogo
      setFormData({
        nome_medicamento: "",
        lote: "",
        codigo_barras_original: "",
        validade: "",
        quantidade_total: "",
        unidade: "mg",
        fabricacao: "",
        codigo_produto: "",
        registro_anvisa: "",
        responsavel_tecnico: "",
      });
      setCadastroDialogOpen(false);

      // Recarregar produtos
      carregarProdutos();
    } catch (error: any) {
      console.error('Erro ao cadastrar produto:', error);
      toast({
        title: "Erro ao cadastrar produto",
        description: error.message || "Não foi possível cadastrar o produto.",
        variant: "destructive",
      });
    }
  };

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
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestão de Estoque</CardTitle>
                <CardDescription>
                  Controle de produtos, lotes e validades
                </CardDescription>
              </div>
              <Button onClick={() => setCadastroDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Produto
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Busca e Filtros */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, lote ou código de barras..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filtroSituacao} onValueChange={setFiltroSituacao}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="baixo">Estoque Baixo</SelectItem>
                    <SelectItem value="prestes_vencer">Prestes a Vencer</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Estatísticas */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total de Produtos</p>
                  <p className="text-2xl font-bold text-primary">{produtos.length}</p>
                </div>
                <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Estoque Baixo</p>
                  <p className="text-2xl font-bold text-destructive">
                    {produtos.filter(p => calcularSituacao(p.validade, p.quantidade_total) === 'baixo').length}
                  </p>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Prestes a Vencer</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {produtos.filter(p => calcularSituacao(p.validade, p.quantidade_total) === 'prestes_vencer').length}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 border border-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Vencidos</p>
                  <p className="text-2xl font-bold text-muted-foreground">
                    {produtos.filter(p => calcularSituacao(p.validade, p.quantidade_total) === 'vencido').length}
                  </p>
                </div>
              </div>

              {/* Tabela de Produtos */}
              {isLoadingProdutos ? (
                <div className="text-center py-8 text-muted-foreground">
                  Carregando produtos...
                </div>
              ) : produtosFiltrados.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Nenhum produto encontrado</p>
                  <p className="text-sm">Cadastre produtos para começar a gerenciar seu estoque</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Código de Barras</TableHead>
                        <TableHead>Validade</TableHead>
                        <TableHead className="text-right">Quantidade Total</TableHead>
                        <TableHead>Unidade</TableHead>
                        <TableHead>Situação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {produtosFiltrados.map((produto) => {
                        const situacao = calcularSituacao(produto.validade, produto.quantidade_total);
                        const badgeVariant = 
                          situacao === 'vencido' ? 'destructive' :
                          situacao === 'prestes_vencer' ? 'default' :
                          situacao === 'baixo' ? 'secondary' : 'outline';
                        const situacaoTexto = 
                          situacao === 'vencido' ? 'Vencido' :
                          situacao === 'prestes_vencer' ? 'Prestes a Vencer' :
                          situacao === 'baixo' ? 'Estoque Baixo' : 'Normal';

                        return (
                          <TableRow key={produto.id}>
                            <TableCell className="font-medium">{produto.nome_medicamento}</TableCell>
                            <TableCell>{produto.lote}</TableCell>
                            <TableCell className="font-mono text-sm">
                              {produto.codigo_barras_original || '-'}
                            </TableCell>
                            <TableCell>
                              {produto.validade ? new Date(produto.validade).toLocaleDateString('pt-BR') : '-'}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {produto.quantidade_total}
                            </TableCell>
                            <TableCell>{produto.unidade || '-'}</TableCell>
                            <TableCell>
                              <Badge variant={badgeVariant}>{situacaoTexto}</Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Diálogo de Cadastro de Produto */}
      <Dialog open={cadastroDialogOpen} onOpenChange={setCadastroDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Produto</DialogTitle>
            <DialogDescription>
              Preencha as informações do produto para adicionar ao estoque
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome_medicamento">Nome do Medicamento *</Label>
              <Input
                id="nome_medicamento"
                value={formData.nome_medicamento}
                onChange={(e) => setFormData({...formData, nome_medicamento: e.target.value})}
                placeholder="Digite o nome do medicamento"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lote">Lote *</Label>
              <Input
                id="lote"
                value={formData.lote}
                onChange={(e) => setFormData({...formData, lote: e.target.value})}
                placeholder="Digite o número do lote"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigo_barras_original">Código de Barras</Label>
              <Input
                id="codigo_barras_original"
                value={formData.codigo_barras_original}
                onChange={(e) => setFormData({...formData, codigo_barras_original: e.target.value})}
                placeholder="Digite o código de barras"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigo_produto">Código do Produto</Label>
              <Input
                id="codigo_produto"
                value={formData.codigo_produto}
                onChange={(e) => setFormData({...formData, codigo_produto: e.target.value})}
                placeholder="Digite o código do produto"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fabricacao">Data de Fabricação</Label>
              <Input
                id="fabricacao"
                type="date"
                value={formData.fabricacao}
                onChange={(e) => setFormData({...formData, fabricacao: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validade">Data de Validade</Label>
              <Input
                id="validade"
                type="date"
                value={formData.validade}
                onChange={(e) => setFormData({...formData, validade: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantidade_total">Quantidade Total *</Label>
              <Input
                id="quantidade_total"
                type="number"
                value={formData.quantidade_total}
                onChange={(e) => setFormData({...formData, quantidade_total: e.target.value})}
                placeholder="Digite a quantidade"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unidade">Unidade</Label>
              <Select value={formData.unidade} onValueChange={(value) => setFormData({...formData, unidade: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mg">mg</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="unidade">unidade</SelectItem>
                  <SelectItem value="comprimido">comprimido</SelectItem>
                  <SelectItem value="cápsula">cápsula</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="registro_anvisa">Registro ANVISA</Label>
              <Input
                id="registro_anvisa"
                value={formData.registro_anvisa}
                onChange={(e) => setFormData({...formData, registro_anvisa: e.target.value})}
                placeholder="Digite o registro ANVISA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsavel_tecnico">Responsável Técnico</Label>
              <Input
                id="responsavel_tecnico"
                value={formData.responsavel_tecnico}
                onChange={(e) => setFormData({...formData, responsavel_tecnico: e.target.value})}
                placeholder="Nome do responsável"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCadastroDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCadastrarProduto}>
              Cadastrar Produto
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
