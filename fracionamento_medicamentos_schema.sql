-- ========================================
-- SCRIPT SQL PARA CRIAR TABELA DE FRACIONAMENTO
-- Execute este script no Supabase SQL Editor
-- ========================================

-- Criar tabela para fracionamento de medicamentos
CREATE TABLE IF NOT EXISTS public.fracionamento_medicamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_medicamento TEXT NOT NULL,
  codigo_produto TEXT,
  lote TEXT NOT NULL,
  fabricacao DATE,
  validade DATE,
  quantidade_total NUMERIC NOT NULL,
  quantidade_fracionada NUMERIC NOT NULL,
  unidade TEXT,
  registro_anvisa TEXT,
  data_processo TIMESTAMP WITH TIME ZONE NOT NULL,
  id_maquina TEXT,
  responsavel_tecnico TEXT,
  xml_original TEXT,
  codigo_barras_original TEXT,
  codigo_barras_fracionado TEXT,
  numero_serie TEXT,
  informacoes_maquina TEXT,
  data_importacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_fracionamento_lote 
  ON public.fracionamento_medicamentos(lote);

CREATE INDEX IF NOT EXISTS idx_fracionamento_data_processo 
  ON public.fracionamento_medicamentos(data_processo DESC);

CREATE INDEX IF NOT EXISTS idx_fracionamento_nome 
  ON public.fracionamento_medicamentos(nome_medicamento);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.fracionamento_medicamentos ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura para usuários autenticados
CREATE POLICY "Usuários autenticados podem ler fracionamentos"
  ON public.fracionamento_medicamentos
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para permitir inserção para usuários autenticados
CREATE POLICY "Usuários autenticados podem inserir fracionamentos"
  ON public.fracionamento_medicamentos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para permitir atualização para usuários autenticados
CREATE POLICY "Usuários autenticados podem atualizar fracionamentos"
  ON public.fracionamento_medicamentos
  FOR UPDATE
  TO authenticated
  USING (true);

-- Comentários nas colunas (documentação)
COMMENT ON TABLE public.fracionamento_medicamentos IS 'Registro de fracionamento de medicamentos oncológicos';
COMMENT ON COLUMN public.fracionamento_medicamentos.nome_medicamento IS 'Nome do medicamento fracionado';
COMMENT ON COLUMN public.fracionamento_medicamentos.lote IS 'Número do lote do medicamento';
COMMENT ON COLUMN public.fracionamento_medicamentos.quantidade_total IS 'Quantidade total original do medicamento';
COMMENT ON COLUMN public.fracionamento_medicamentos.quantidade_fracionada IS 'Quantidade após fracionamento';
COMMENT ON COLUMN public.fracionamento_medicamentos.data_processo IS 'Data e hora do processo de fracionamento';
COMMENT ON COLUMN public.fracionamento_medicamentos.xml_original IS 'Conteúdo do arquivo XML original';
