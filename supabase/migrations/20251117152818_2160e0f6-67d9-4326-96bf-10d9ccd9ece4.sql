-- Criar enum para papéis de usuário
CREATE TYPE public.app_role AS ENUM ('admin', 'farmaceutico', 'estoquista', 'medico', 'enfermeiro', 'paciente');

-- Criar tabela de papéis de usuário
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Comentários
COMMENT ON TABLE public.user_roles IS 'Armazena os papéis/permissões dos usuários';
COMMENT ON COLUMN public.user_roles.user_id IS 'Referência ao usuário no auth.users';
COMMENT ON COLUMN public.user_roles.role IS 'Papel do usuário no sistema';

-- Criar índice para melhor performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- Habilitar RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios papéis
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Criar função security definer para verificar papéis
-- Isso previne recursão infinita nas políticas RLS
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Função para verificar se usuário tem qualquer um dos papéis permitidos
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID, _roles public.app_role[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = ANY(_roles)
  )
$$;

-- Atualizar políticas RLS da tabela estoque_produtos
DROP POLICY IF EXISTS "Usuários autenticados podem ler produtos" ON public.estoque_produtos;
DROP POLICY IF EXISTS "Usuários autenticados podem inserir produtos" ON public.estoque_produtos;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar produtos" ON public.estoque_produtos;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar produtos" ON public.estoque_produtos;

-- Apenas Admin, Farmacêutico e Estoquista podem acessar estoque_produtos
CREATE POLICY "Apenas staff autorizado pode ler produtos"
  ON public.estoque_produtos
  FOR SELECT
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin', 'farmaceutico', 'estoquista']::public.app_role[])
  );

CREATE POLICY "Apenas staff autorizado pode inserir produtos"
  ON public.estoque_produtos
  FOR INSERT
  WITH CHECK (
    public.has_any_role(auth.uid(), ARRAY['admin', 'farmaceutico', 'estoquista']::public.app_role[])
  );

CREATE POLICY "Apenas staff autorizado pode atualizar produtos"
  ON public.estoque_produtos
  FOR UPDATE
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin', 'farmaceutico', 'estoquista']::public.app_role[])
  );

CREATE POLICY "Apenas admin e estoquista podem deletar produtos"
  ON public.estoque_produtos
  FOR DELETE
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin', 'estoquista']::public.app_role[])
  );

-- Atualizar políticas RLS da tabela estoque_movimentacoes
DROP POLICY IF EXISTS "Usuários autenticados podem ler movimentações" ON public.estoque_movimentacoes;
DROP POLICY IF EXISTS "Usuários autenticados podem inserir movimentações" ON public.estoque_movimentacoes;

CREATE POLICY "Apenas staff autorizado pode ler movimentações"
  ON public.estoque_movimentacoes
  FOR SELECT
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin', 'farmaceutico', 'estoquista']::public.app_role[])
  );

CREATE POLICY "Apenas staff autorizado pode inserir movimentações"
  ON public.estoque_movimentacoes
  FOR INSERT
  WITH CHECK (
    public.has_any_role(auth.uid(), ARRAY['admin', 'farmaceutico', 'estoquista']::public.app_role[])
  );

-- Atualizar políticas RLS da tabela fracionamento_medicamentos
DROP POLICY IF EXISTS "Usuários autenticados podem ler fracionamentos" ON public.fracionamento_medicamentos;
DROP POLICY IF EXISTS "Usuários autenticados podem inserir fracionamentos" ON public.fracionamento_medicamentos;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar fracionamentos" ON public.fracionamento_medicamentos;

CREATE POLICY "Apenas staff autorizado pode ler fracionamentos"
  ON public.fracionamento_medicamentos
  FOR SELECT
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin', 'farmaceutico']::public.app_role[])
  );

CREATE POLICY "Apenas farmacêutico pode inserir fracionamentos"
  ON public.fracionamento_medicamentos
  FOR INSERT
  WITH CHECK (
    public.has_any_role(auth.uid(), ARRAY['admin', 'farmaceutico']::public.app_role[])
  );

CREATE POLICY "Apenas farmacêutico pode atualizar fracionamentos"
  ON public.fracionamento_medicamentos
  FOR UPDATE
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin', 'farmaceutico']::public.app_role[])
  );

-- Trigger para atualizar updated_at na tabela user_roles
CREATE TRIGGER update_user_roles_updated_at
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_estoque_produtos_updated_at();