-- Alterar constraint do tipo_apac para aceitar 'completo'
ALTER TABLE public.apac_historico DROP CONSTRAINT IF EXISTS apac_historico_tipo_apac_check;
ALTER TABLE public.apac_historico ADD CONSTRAINT apac_historico_tipo_apac_check 
  CHECK (tipo_apac IN ('laudo', 'dados_complementares', 'completo'));

-- Adicionar coluna para categoria/tipo de procedimento
ALTER TABLE public.apac_historico ADD COLUMN IF NOT EXISTS categoria_procedimento text;

COMMENT ON COLUMN public.apac_historico.tipo_apac IS 'Tipo do formulário APAC: laudo, dados_complementares ou completo (ambos)';
COMMENT ON COLUMN public.apac_historico.categoria_procedimento IS 'Categoria do procedimento: oncologia, quimioterapia, radioterapia, etc.';