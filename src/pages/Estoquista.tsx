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
import { z } from "zod";

// Schema de validação com zod
const produtoSchema = z.object({
  nome: z.string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(200, { message: "Nome deve ter no máximo 200 caracteres" }),
  codigo_barras: z.string()
    .trim()
    .max(50, { message: "Código de barras deve ter no máximo 50 caracteres" })
    .optional(),
  lote: z.string()
    .trim()
    .min(1, { message: "Lote é obrigatório" })
    .max(50, { message: "Lote deve ter no máximo 50 caracteres" }),
  validade: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const data = new Date(val);
      return !isNaN(data.getTime());
    }, { message: "Data de validade inválida" }),
  quantidade: z.string()
    .min(1, { message: "Quantidade é obrigatória" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Quantidade deve ser um número positivo"
    }),
  unidade: z.string()
    .trim()
    .min(1, { message: "Unidade é obrigatória" })
    .max(20, { message: "Unidade deve ter no máximo 20 caracteres" }),
  registro_anvisa: z.string()
    .trim()
    .max(50, { message: "Registro ANVISA deve ter no máximo 50 caracteres" })
    .optional(),
});

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
    nome: "",
    codigo_barras: "",
    lote: "",
    validade: "",
    quantidade: "",
    unidade: "mg",
    registro_anvisa: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Carregar produtos do banco
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    setIsLoadingProdutos(true);
    try {
      const { data, error } = await (supabase as any)
        .from('estoque_produtos')
        .select('*')
        .order('created_at', { ascending: false });

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
  const calcularSituacao = (validade: string | null, quantidade: number): string => {
    if (!validade) return 'normal';
    
    const dataValidade = new Date(validade);
    const hoje = new Date();
    const diasAteVencer = Math.floor((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    
    // Estoque baixo (menos de 10 unidades)
    if (quantidade < 10) return 'baixo';
    
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
        p.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.lote?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.codigo_barras?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro de situação
    if (filtroSituacao !== 'todos') {
      resultado = resultado.filter(p => {
        const situacao = calcularSituacao(p.validade, p.quantidade);
        return situacao === filtroSituacao;
      });
    }

    return resultado;
  }, [produtos, searchTerm, filtroSituacao]);

  const handleCadastrarProduto = async () => {
    try {
      // Limpar erros anteriores
      setFormErrors({});

      // Validar com zod
      const validacao = produtoSchema.safeParse(formData);
      
      if (!validacao.success) {
        const erros: { [key: string]: string } = {};
        validacao.error.errors.forEach((erro) => {
          if (erro.path[0]) {
            erros[erro.path[0].toString()] = erro.message;
          }
        });
        setFormErrors(erros);
        
        toast({
          title: "Erro de validação",
          description: "Por favor, corrija os erros no formulário.",
          variant: "destructive",
        });
        return;
      }

      const dadosParaSalvar = {
        nome: validacao.data.nome,
        codigo_barras: validacao.data.codigo_barras || null,
        lote: validacao.data.lote,
        validade: validacao.data.validade || null,
        quantidade: parseFloat(validacao.data.quantidade),
        unidade: validacao.data.unidade,
        registro_anvisa: validacao.data.registro_anvisa || null,
      };

      const { error } = await (supabase as any)
        .from('estoque_produtos')
        .insert([dadosParaSalvar]);

      if (error) throw error;

      toast({
        title: "Produto cadastrado com sucesso!",
        description: "O produto foi adicionado ao estoque.",
      });

      // Limpar formulário e fechar diálogo
      setFormData({
        nome: "",
        codigo_barras: "",
        lote: "",
        validade: "",
        quantidade: "",
        unidade: "mg",
        registro_anvisa: "",
      });
      setFormErrors({});
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
                    {produtos.filter(p => calcularSituacao(p.validade, p.quantidade) === 'baixo').length}
                  </p>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Prestes a Vencer</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {produtos.filter(p => calcularSituacao(p.validade, p.quantidade) === 'prestes_vencer').length}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 border border-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Vencidos</p>
                  <p className="text-2xl font-bold text-muted-foreground">
                    {produtos.filter(p => calcularSituacao(p.validade, p.quantidade) === 'vencido').length}
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
                        const situacao = calcularSituacao(produto.validade, produto.quantidade);
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
                            <TableCell className="font-medium">{produto.nome}</TableCell>
                            <TableCell>{produto.lote}</TableCell>
                            <TableCell className="font-mono text-sm">
                              {produto.codigo_barras || '-'}
                            </TableCell>
                            <TableCell>
                              {produto.validade ? new Date(produto.validade).toLocaleDateString('pt-BR') : '-'}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {produto.quantidade}
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
              <Label htmlFor="nome">Nome do Medicamento *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                placeholder="Digite o nome do medicamento"
                className={formErrors.nome ? "border-destructive" : ""}
              />
              {formErrors.nome && (
                <p className="text-sm text-destructive">{formErrors.nome}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lote">Lote *</Label>
              <Input
                id="lote"
                value={formData.lote}
                onChange={(e) => setFormData({...formData, lote: e.target.value})}
                placeholder="Digite o número do lote"
                className={formErrors.lote ? "border-destructive" : ""}
              />
              {formErrors.lote && (
                <p className="text-sm text-destructive">{formErrors.lote}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigo_barras">Código de Barras</Label>
              <Input
                id="codigo_barras"
                value={formData.codigo_barras}
                onChange={(e) => setFormData({...formData, codigo_barras: e.target.value})}
                placeholder="Digite o código de barras"
                className={formErrors.codigo_barras ? "border-destructive" : ""}
              />
              {formErrors.codigo_barras && (
                <p className="text-sm text-destructive">{formErrors.codigo_barras}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="validade">Data de Validade</Label>
              <Input
                id="validade"
                type="date"
                value={formData.validade}
                onChange={(e) => setFormData({...formData, validade: e.target.value})}
                className={formErrors.validade ? "border-destructive" : ""}
              />
              {formErrors.validade && (
                <p className="text-sm text-destructive">{formErrors.validade}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade Inicial *</Label>
              <Input
                id="quantidade"
                type="number"
                value={formData.quantidade}
                onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                placeholder="Digite a quantidade"
                className={formErrors.quantidade ? "border-destructive" : ""}
              />
              {formErrors.quantidade && (
                <p className="text-sm text-destructive">{formErrors.quantidade}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="unidade">Unidade *</Label>
              <Select value={formData.unidade} onValueChange={(value) => setFormData({...formData, unidade: value})}>
                <SelectTrigger className={formErrors.unidade ? "border-destructive" : ""}>
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
              {formErrors.unidade && (
                <p className="text-sm text-destructive">{formErrors.unidade}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="registro_anvisa">Registro ANVISA</Label>
              <Input
                id="registro_anvisa"
                value={formData.registro_anvisa}
                onChange={(e) => setFormData({...formData, registro_anvisa: e.target.value})}
                placeholder="Digite o registro ANVISA"
                className={formErrors.registro_anvisa ? "border-destructive" : ""}
              />
              {formErrors.registro_anvisa && (
                <p className="text-sm text-destructive">{formErrors.registro_anvisa}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setCadastroDialogOpen(false);
              setFormErrors({});
            }}>
              Cancelar
            </Button>
            <Button onClick={handleCadastrarProduto}>
              Salvar Produto
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
