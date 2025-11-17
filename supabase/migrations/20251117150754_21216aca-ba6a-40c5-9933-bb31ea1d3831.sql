-- Criar tabela estoque_produtos
CREATE TABLE public.estoque_produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  codigo_barras TEXT,
  lote TEXT NOT NULL,
  validade DATE,
  quantidade NUMERIC NOT NULL CHECK (quantidade >= 0),
  unidade TEXT,
  registro_anvisa TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar comentários nas colunas
COMMENT ON COLUMN public.estoque_produtos.id IS 'Identificador único do produto';
COMMENT ON COLUMN public.estoque_produtos.nome IS 'Nome do produto/medicamento';
COMMENT ON COLUMN public.estoque_produtos.codigo_barras IS 'Código de barras do produto';
COMMENT ON COLUMN public.estoque_produtos.lote IS 'Número do lote';
COMMENT ON COLUMN public.estoque_produtos.validade IS 'Data de validade do produto';
COMMENT ON COLUMN public.estoque_produtos.quantidade IS 'Quantidade em estoque';
COMMENT ON COLUMN public.estoque_produtos.unidade IS 'Unidade de medida (mg, ml, g, etc)';
COMMENT ON COLUMN public.estoque_produtos.registro_anvisa IS 'Número de registro na ANVISA';

-- Criar índices para melhorar performance
CREATE INDEX idx_estoque_produtos_nome ON public.estoque_produtos(nome);
CREATE INDEX idx_estoque_produtos_lote ON public.estoque_produtos(lote);
CREATE INDEX idx_estoque_produtos_codigo_barras ON public.estoque_produtos(codigo_barras);
CREATE INDEX idx_estoque_produtos_validade ON public.estoque_produtos(validade);

-- Habilitar Row Level Security
ALTER TABLE public.estoque_produtos ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS (permitir acesso para usuários autenticados)
CREATE POLICY "Usuários autenticados podem ler produtos"
  ON public.estoque_produtos
  FOR SELECT
  USING (true);

CREATE POLICY "Usuários autenticados podem inserir produtos"
  ON public.estoque_produtos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar produtos"
  ON public.estoque_produtos
  FOR UPDATE
  USING (true);

CREATE POLICY "Usuários autenticados podem deletar produtos"
  ON public.estoque_produtos
  FOR DELETE
  USING (true);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_estoque_produtos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_estoque_produtos_updated_at
  BEFORE UPDATE ON public.estoque_produtos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_estoque_produtos_updated_at();