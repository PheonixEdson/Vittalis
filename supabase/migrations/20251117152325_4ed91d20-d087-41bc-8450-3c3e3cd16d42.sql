-- Atualizar função para prevenir estoque negativo
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
  v_estoque_atual NUMERIC;
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

  -- Obter estoque atual
  SELECT quantidade INTO v_estoque_atual FROM estoque_produtos WHERE id = p_produto_id;

  -- Verificar se há estoque suficiente para saídas
  IF p_tipo IN ('saida', 'fracionamento', 'descarte') THEN
    IF v_estoque_atual < p_quantidade THEN
      RAISE EXCEPTION 'Estoque insuficiente. Quantidade disponível: %', v_estoque_atual;
    END IF;
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
    SET quantidade = quantidade - p_quantidade,
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