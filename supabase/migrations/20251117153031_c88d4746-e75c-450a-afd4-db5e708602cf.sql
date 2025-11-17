-- Adicionar políticas de UPDATE e DELETE restritivas para estoque_movimentacoes
-- Movimentações são registros de auditoria e não devem ser editadas ou deletadas facilmente

-- Apenas admin pode atualizar movimentações (para correções)
CREATE POLICY "Apenas admin pode atualizar movimentações"
  ON public.estoque_movimentacoes
  FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
  );

-- Apenas admin pode deletar movimentações (para limpeza de dados incorretos)
CREATE POLICY "Apenas admin pode deletar movimentações"
  ON public.estoque_movimentacoes
  FOR DELETE
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
  );

-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nome_completo TEXT,
  telefone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Comentários
COMMENT ON TABLE public.profiles IS 'Perfis públicos dos usuários';
COMMENT ON COLUMN public.profiles.id IS 'Referência ao usuário no auth.users';
COMMENT ON COLUMN public.profiles.email IS 'Email do usuário';
COMMENT ON COLUMN public.profiles.nome_completo IS 'Nome completo do usuário';

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Perfis são visíveis por usuários autenticados"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Inserir perfil
  INSERT INTO public.profiles (id, email, nome_completo)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'nome_completo', new.email)
  );
  
  -- Atribuir papel padrão baseado no email ou metadados
  -- Você pode customizar essa lógica conforme necessário
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    new.id,
    COALESCE(
      (new.raw_user_meta_data->>'role')::public.app_role,
      'paciente'::public.app_role
    )
  );
  
  RETURN new;
END;
$$;

-- Trigger para criar perfil e papel automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger para atualizar updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_estoque_produtos_updated_at();