-- Criar enum para tipos de movimentação
CREATE TYPE public.tipo_movimentacao AS ENUM ('entrada', 'saida', 'fracionamento', 'ajuste', 'descarte');

-- Criar tabela estoque_movimentacoes
CREATE TABLE public.estoque_movimentacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produto_id UUID NOT NULL REFERENCES public.estoque_produtos(id) ON DELETE CASCADE,
  tipo public.tipo_movimentacao NOT NULL,
  quantidade NUMERIC NOT NULL CHECK (quantidade > 0),
  data_movimentacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  descricao TEXT,
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Comentários nas colunas
COMMENT ON COLUMN public.estoque_movimentacoes.id IS 'Identificador único da movimentação';
COMMENT ON COLUMN public.estoque_movimentacoes.produto_id IS 'Referência ao produto movimentado';
COMMENT ON COLUMN public.estoque_movimentacoes.tipo IS 'Tipo de movimentação: entrada, saída, fracionamento, ajuste ou descarte';
COMMENT ON COLUMN public.estoque_movimentacoes.quantidade IS 'Quantidade movimentada';
COMMENT ON COLUMN public.estoque_movimentacoes.data_movimentacao IS 'Data e hora da movimentação';
COMMENT ON COLUMN public.estoque_movimentacoes.descricao IS 'Descrição ou observação da movimentação';
COMMENT ON COLUMN public.estoque_movimentacoes.criado_em IS 'Data de criação do registro';

-- Criar índices para melhor performance
CREATE INDEX idx_estoque_movimentacoes_produto_id ON public.estoque_movimentacoes(produto_id);
CREATE INDEX idx_estoque_movimentacoes_data ON public.estoque_movimentacoes(data_movimentacao DESC);
CREATE INDEX idx_estoque_movimentacoes_tipo ON public.estoque_movimentacoes(tipo);

-- Habilitar RLS
ALTER TABLE public.estoque_movimentacoes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Usuários autenticados podem ler movimentações"
  ON public.estoque_movimentacoes
  FOR SELECT
  USING (true);

CREATE POLICY "Usuários autenticados podem inserir movimentações"
  ON public.estoque_movimentacoes
  FOR INSERT
  WITH CHECK (true);

-- Criar função para registrar movimentação
CREATE OR REPLACE FUNCTION public.registrar_movimentacao(
  p_produto_id UUID,
  p_tipo public.tipo_movimentacao,
  p_quantidade NUMERIC,
  p_descricao TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_movimentacao_id UUID;
  v_produto_exists BOOLEAN;
BEGIN
  -- Verificar se o produto existe
  SELECT EXISTS(SELECT 1 FROM estoque_produtos WHERE id = p_produto_id) INTO v_produto_exists;
  
  IF NOT v_produto_exists THEN
    RAISE EXCEPTION 'Produto não encontrado';
  END IF;

  -- Validar quantidade
  IF p_quantidade <= 0 THEN
    RAISE EXCEPTION 'Quantidade deve ser maior que zero';
  END IF;

  -- Atualizar quantidade no estoque
  IF p_tipo IN ('entrada', 'ajuste') THEN
    -- Somar para entradas e ajustes positivos
    UPDATE estoque_produtos 
    SET quantidade = quantidade + p_quantidade,
        updated_at = now()
    WHERE id = p_produto_id;
  ELSIF p_tipo IN ('saida', 'fracionamento', 'descarte') THEN
    -- Subtrair para saídas, fracionamentos e descartes
    UPDATE estoque_produtos 
    SET quantidade = GREATEST(quantidade - p_quantidade, 0),
        updated_at = now()
    WHERE id = p_produto_id;
  END IF;

  -- Registrar a movimentação
  INSERT INTO estoque_movimentacoes (
    produto_id,
    tipo,
    quantidade,
    descricao,
    data_movimentacao
  ) VALUES (
    p_produto_id,
    p_tipo,
    p_quantidade,
    p_descricao,
    now()
  )
  RETURNING id INTO v_movimentacao_id;

  RETURN v_movimentacao_id;
END;
$$;