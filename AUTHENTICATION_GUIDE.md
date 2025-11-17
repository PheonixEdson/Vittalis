# Guia de Autenticação - Sistema Vittalis

## ✅ Sistema Implementado

O sistema agora possui autenticação completa com controle de acesso baseado em papéis (RBAC - Role-Based Access Control).

## 🔐 Segurança Implementada

### 1. Políticas RLS (Row Level Security)

Todas as tabelas sensíveis têm políticas RLS que garantem:

- **estoque_produtos**: Apenas Admin, Farmacêutico e Estoquista podem acessar
- **estoque_movimentacoes**: Apenas Admin, Farmacêutico e Estoquista podem ler/criar. Apenas Admin pode editar/deletar (auditoria)
- **fracionamento_medicamentos**: Apenas Admin e Farmacêutico podem acessar

### 2. Papéis de Usuário

Os seguintes papéis estão disponíveis no sistema:

- `admin` - Acesso completo ao sistema
- `farmaceutico` - Acesso ao estoque e fracionamento
- `estoquista` - Acesso ao estoque
- `medico` - Acesso à área médica
- `enfermeiro` - Acesso à área de enfermagem
- `paciente` - Acesso à área do paciente

### 3. Proteção de Rotas

Todas as rotas sensíveis estão protegidas:

```typescript
/administrador - Apenas Admin
/farmaceutico - Admin e Farmacêutico
/estoquista - Admin, Farmacêutico e Estoquista
/medico - Admin e Médico
/enfermeiro - Admin e Enfermeiro
/paciente - Admin e Paciente
```

## 📝 Como Usar

### Para Testar o Sistema

1. **Acesse a página inicial**: `/`

2. **Clique em "Criar Conta"**

3. **Preencha o formulário**:
   - Nome completo
   - Email
   - Função no sistema (escolha o papel desejado)
   - Senha (mínimo 6 caracteres)
   - Confirme a senha

4. **Após criar a conta**, faça login com as credenciais

5. **O sistema automaticamente**:
   - Cria seu perfil
   - Atribui o papel escolhido
   - Redireciona para a página inicial
   - Mostra botões baseados em suas permissões

### Configuração do Supabase (IMPORTANTE)

Para evitar problemas de redirecionamento, configure no Supabase:

1. Acesse: **Authentication > URL Configuration**

2. Configure:
   - **Site URL**: URL do seu app (preview ou produção)
   - **Redirect URLs**: Adicione a URL do preview e produção

**Exemplo**:
```
Site URL: https://seu-projeto.lovable.app
Redirect URLs: 
  - https://seu-projeto.lovable.app
  - https://seu-dominio-custom.com (se tiver)
```

### Desabilitar Confirmação de Email (Desenvolvimento)

Para agilizar testes:

1. Acesse: **Authentication > Providers > Email**
2. Desmarque: **"Confirm email"**
3. Salve as alterações

**⚠️ IMPORTANTE**: Reative isso em produção!

## 🔧 Gerenciamento de Usuários

### Criar Usuários via SQL (Desenvolvimento)

Se quiser criar usuários de teste diretamente no banco:

```sql
-- Exemplo: Criar admin de teste
-- Primeiro, crie o usuário no Supabase Auth UI
-- Depois, atribua o papel:

INSERT INTO public.user_roles (user_id, role)
VALUES (
  'uuid-do-usuario-aqui',
  'admin'::public.app_role
);
```

### Atribuir Múltiplos Papéis

Um usuário pode ter múltiplos papéis:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('uuid-do-usuario', 'admin'::public.app_role),
  ('uuid-do-usuario', 'farmaceutico'::public.app_role);
```

## 🛡️ Segurança de Movimentações

As movimentações de estoque são **registros de auditoria**:

- ✅ Apenas usuários autorizados podem criar movimentações
- ✅ Apenas Admin pode editar movimentações (para correções)
- ✅ Apenas Admin pode deletar movimentações (limpeza de dados incorretos)
- ✅ Todas as operações são rastreadas com timestamp e descrição

## 📊 Fluxo de Dados

1. **Usuário se cadastra** → Trigger automático cria perfil e atribui papel
2. **Usuário faz login** → Session é criada e armazenada localmente
3. **Acessa página protegida** → ProtectedRoute verifica permissões
4. **Faz operação no estoque** → RLS verifica se tem papel adequado
5. **Operação é registrada** → Movimentação criada automaticamente

## 🐛 Troubleshooting

### "Acesso negado" mesmo logado

**Causa**: Usuário não tem o papel necessário

**Solução**: Verifique os papéis no Supabase:
```sql
SELECT * FROM user_roles WHERE user_id = 'seu-uuid';
```

### Redirecionamento para localhost

**Causa**: URLs não configuradas no Supabase

**Solução**: Configure Site URL e Redirect URLs conforme descrito acima

### Dados não aparecem

**Causa**: RLS bloqueando acesso

**Solução**: 
1. Verifique se está logado
2. Verifique se tem o papel correto
3. Veja os logs do Supabase para erros de RLS

## 📚 Recursos Adicionais

- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentação RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Lovable Docs - Autenticação](https://docs.lovable.dev/features/auth)

## ⚡ Próximos Passos Recomendados

1. ✅ Sistema de recuperação de senha
2. ✅ Login com redes sociais (Google, etc)
3. ✅ Log de atividades dos usuários
4. ✅ Dashboard de administração de usuários
5. ✅ Notificações por e-mail/WhatsApp
