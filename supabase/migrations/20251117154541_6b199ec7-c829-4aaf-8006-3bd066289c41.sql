-- Corrigir políticas RLS para gerenciamento adequado

-- 1. Adicionar políticas administrativas para user_roles
-- Apenas admins podem gerenciar papéis de usuários

CREATE POLICY "Apenas admin pode inserir papéis"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Apenas admin pode atualizar papéis"
  ON public.user_roles
  FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Apenas admin pode deletar papéis"
  ON public.user_roles
  FOR DELETE
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
  );

-- 2. Adicionar política INSERT para profiles
-- Usuários podem criar apenas seu próprio perfil (redundante com trigger, mas explícito)

CREATE POLICY "Usuários podem criar seu próprio perfil"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 3. Adicionar política DELETE para profiles
-- Usuários podem deletar seu próprio perfil ou admin pode deletar qualquer perfil

CREATE POLICY "Usuários podem deletar seu perfil ou admin deleta qualquer"
  ON public.profiles
  FOR DELETE
  USING (
    auth.uid() = id OR 
    public.has_role(auth.uid(), 'admin'::public.app_role)
  );

-- 4. Adicionar política DELETE para fracionamento_medicamentos
-- Apenas admin pode deletar registros de fracionamento (para correção de erros)

CREATE POLICY "Apenas admin pode deletar fracionamentos"
  ON public.fracionamento_medicamentos
  FOR DELETE
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
  );