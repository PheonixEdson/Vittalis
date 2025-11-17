import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Home, Search, Filter, Plus, History, Calendar, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PedidoMedicamentoDialog } from "@/components/dialogs/PedidoMedicamentoDialog";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };
  
  // Estados para gestão de estoque
  const [pedidoDialogOpen, setPedidoDialogOpen] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState<{nome: string, atual: number, minimo: number} | null>(null);
  const [cadastroDialogOpen, setCadastroDialogOpen] = useState(false);
  
  // Estados para produtos
  const [produtos, setProdutos] = useState<any[]>([]);
  const [isLoadingProdutos, setIsLoadingProdutos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroSituacao, setFiltroSituacao] = useState("todos");
  
  // Estados para movimentações
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [isLoadingMovimentacoes, setIsLoadingMovimentacoes] = useState(false);
  const [filtroTipoMov, setFiltroTipoMov] = useState("todos");
  const [filtroProdutoMov, setFiltroProdutoMov] = useState("");
  const [filtroPeriodoInicio, setFiltroPeriodoInicio] = useState("");
  const [filtroPeriodoFim, setFiltroPeriodoFim] = useState("");

  // Estados para estatísticas
  const [itensFracionadosMes, setItensFracionadosMes] = useState(0);
  
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

  // Carregar produtos e movimentações do banco
  useEffect(() => {
    carregarProdutos();
    carregarMovimentacoes();
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

  const carregarMovimentacoes = async () => {
    setIsLoadingMovimentacoes(true);
    try {
      const { data, error } = await (supabase as any)
        .from('estoque_movimentacoes')
        .select(`
          *,
          produto:estoque_produtos(nome)
        `)
        .order('data_movimentacao', { ascending: false });

      if (error) throw error;
      setMovimentacoes(data || []);

      // Calcular itens fracionados no mês atual
      const inicioMes = new Date();
      inicioMes.setDate(1);
      inicioMes.setHours(0, 0, 0, 0);
      
      const fracionadosMes = (data || []).filter((mov: any) => 
        mov.tipo === 'fracionamento' && 
        new Date(mov.data_movimentacao) >= inicioMes
      ).length;
      
      setItensFracionadosMes(fracionadosMes);
    } catch (error: any) {
      console.error('Erro ao carregar movimentações:', error);
      toast({
        title: "Erro ao carregar movimentações",
        description: error.message || "Não foi possível carregar as movimentações.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingMovimentacoes(false);
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

  // Filtrar movimentações
  const movimentacoesFiltradas = useMemo(() => {
    let resultado = movimentacoes;

    // Filtro por tipo
    if (filtroTipoMov !== 'todos') {
      resultado = resultado.filter(m => m.tipo === filtroTipoMov);
    }

    // Filtro por produto
    if (filtroProdutoMov) {
      resultado = resultado.filter(m => 
        m.produto?.nome?.toLowerCase().includes(filtroProdutoMov.toLowerCase())
      );
    }

    // Filtro por período
    if (filtroPeriodoInicio) {
      resultado = resultado.filter(m => 
        new Date(m.data_movimentacao) >= new Date(filtroPeriodoInicio)
      );
    }
    if (filtroPeriodoFim) {
      resultado = resultado.filter(m => 
        new Date(m.data_movimentacao) <= new Date(filtroPeriodoFim)
      );
    }

    return resultado;
  }, [movimentacoes, filtroTipoMov, filtroProdutoMov, filtroPeriodoInicio, filtroPeriodoFim]);

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
          description: "Por favor, corrija os campos destacados em vermelho.",
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

      if (error) {
        console.error('Erro ao cadastrar:', error);
        throw new Error(error.message || 'Erro ao cadastrar produto no banco de dados');
      }

      toast({
        title: "✅ Produto cadastrado com sucesso!",
        description: `${dadosParaSalvar.nome} foi adicionado ao estoque com ${dadosParaSalvar.quantidade} unidades.`,
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
      await carregarProdutos();
    } catch (error: any) {
      console.error('Erro ao cadastrar produto:', error);
      toast({
        title: "❌ Erro ao cadastrar produto",
        description: error.message || "Não foi possível cadastrar o produto. Tente novamente.",
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
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="estoque" className="space-y-4">
          <TabsList>
            <TabsTrigger value="estoque">
              <Package className="h-4 w-4 mr-2" />
              Estoque
            </TabsTrigger>
            <TabsTrigger value="movimentacoes">
              <History className="h-4 w-4 mr-2" />
              Movimentações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estoque">
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
                {/* Painel de Resumo */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <Card className="border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total de Itens</p>
                          <p className="text-3xl font-bold text-primary">{produtos.length}</p>
                        </div>
                        <Package className="h-10 w-10 text-primary opacity-50" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-red-500/20 bg-red-50 dark:bg-red-900/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Itens Vencidos</p>
                          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                            {produtos.filter(p => calcularSituacao(p.validade, p.quantidade) === 'vencido').length}
                          </p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-400 text-xl font-bold">!</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-yellow-500/20 bg-yellow-50 dark:bg-yellow-900/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Estoque Baixo</p>
                          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                            {produtos.filter(p => calcularSituacao(p.validade, p.quantidade) === 'baixo').length}
                          </p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                          <span className="text-yellow-600 dark:text-yellow-400 text-xl font-bold">⚠</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-500/20 bg-blue-50 dark:bg-blue-900/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Fracionados no Mês</p>
                          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {itensFracionadosMes}
                          </p>
                        </div>
                        <History className="h-10 w-10 text-blue-600 dark:text-blue-400 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

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

                {/* Estatísticas de Situação */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/30 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Prestes a Vencer</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {produtos.filter(p => calcularSituacao(p.validade, p.quantidade) === 'prestes_vencer').length}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Normal</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {produtos.filter(p => calcularSituacao(p.validade, p.quantidade) === 'normal').length}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Sem Validade</p>
                    <p className="text-2xl font-bold text-muted-foreground">
                      {produtos.filter(p => !p.validade).length}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Quantidade Total</p>
                    <p className="text-2xl font-bold text-primary">
                      {produtos.reduce((acc, p) => acc + (p.quantidade || 0), 0).toLocaleString('pt-BR')}
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
                        
                        // Cores específicas para cada situação
                        const situacaoConfig = {
                          vencido: { 
                            bg: 'bg-red-100 dark:bg-red-900/20', 
                            text: 'text-red-700 dark:text-red-400',
                            border: 'border-red-300 dark:border-red-700',
                            label: 'Vencido'
                          },
                          prestes_vencer: { 
                            bg: 'bg-orange-100 dark:bg-orange-900/20', 
                            text: 'text-orange-700 dark:text-orange-400',
                            border: 'border-orange-300 dark:border-orange-700',
                            label: 'Prestes a Vencer'
                          },
                          baixo: { 
                            bg: 'bg-yellow-100 dark:bg-yellow-900/20', 
                            text: 'text-yellow-700 dark:text-yellow-400',
                            border: 'border-yellow-300 dark:border-yellow-700',
                            label: 'Estoque Baixo'
                          },
                          normal: { 
                            bg: 'bg-green-100 dark:bg-green-900/20', 
                            text: 'text-green-700 dark:text-green-400',
                            border: 'border-green-300 dark:border-green-700',
                            label: 'Normal'
                          }
                        };
                        
                        const config = situacaoConfig[situacao as keyof typeof situacaoConfig];

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
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
                                {config.label}
                              </span>
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
          </TabsContent>

          <TabsContent value="movimentacoes">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Movimentações</CardTitle>
                <CardDescription>
                  Acompanhe todas as entradas e saídas do estoque
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filtros de Movimentações */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="filtro-tipo">Tipo</Label>
                    <Select value={filtroTipoMov} onValueChange={setFiltroTipoMov}>
                      <SelectTrigger id="filtro-tipo">
                        <SelectValue placeholder="Todos os tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="entrada">Entrada</SelectItem>
                        <SelectItem value="saida">Saída</SelectItem>
                        <SelectItem value="fracionamento">Fracionamento</SelectItem>
                        <SelectItem value="ajuste">Ajuste</SelectItem>
                        <SelectItem value="descarte">Descarte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filtro-produto-mov">Produto</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="filtro-produto-mov"
                        placeholder="Buscar produto..."
                        value={filtroProdutoMov}
                        onChange={(e) => setFiltroProdutoMov(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="periodo-inicio">Período Início</Label>
                    <Input
                      id="periodo-inicio"
                      type="date"
                      value={filtroPeriodoInicio}
                      onChange={(e) => setFiltroPeriodoInicio(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="periodo-fim">Período Fim</Label>
                    <Input
                      id="periodo-fim"
                      type="date"
                      value={filtroPeriodoFim}
                      onChange={(e) => setFiltroPeriodoFim(e.target.value)}
                    />
                  </div>
                </div>

                {/* Tabela de Movimentações */}
                {isLoadingMovimentacoes ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Carregando movimentações...
                  </div>
                ) : movimentacoesFiltradas.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Nenhuma movimentação encontrada</p>
                    <p className="text-sm">As movimentações de estoque aparecerão aqui</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead className="text-right">Quantidade</TableHead>
                          <TableHead>Descrição</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {movimentacoesFiltradas.map((mov) => {
                          const tipoConfig = {
                            entrada: { label: 'Entrada', color: 'text-green-600 dark:text-green-400' },
                            saida: { label: 'Saída', color: 'text-red-600 dark:text-red-400' },
                            fracionamento: { label: 'Fracionamento', color: 'text-blue-600 dark:text-blue-400' },
                            ajuste: { label: 'Ajuste', color: 'text-purple-600 dark:text-purple-400' },
                            descarte: { label: 'Descarte', color: 'text-gray-600 dark:text-gray-400' }
                          };
                          
                          const config = tipoConfig[mov.tipo as keyof typeof tipoConfig] || { label: mov.tipo, color: '' };
                          
                          return (
                            <TableRow key={mov.id}>
                              <TableCell className="font-mono text-sm">
                                {format(new Date(mov.data_movimentacao), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                              </TableCell>
                              <TableCell className="font-medium">
                                {mov.produto?.nome || 'Produto removido'}
                              </TableCell>
                              <TableCell>
                                <span className={`font-medium ${config.color}`}>
                                  {config.label}
                                </span>
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {mov.quantidade}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                                {mov.descricao || '-'}
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
          </TabsContent>
        </Tabs>
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
