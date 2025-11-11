# Configuração do Sistema de Documentação APAC

## 1. Configurar Storage no Supabase

Execute o seguinte SQL no Supabase SQL Editor:

```sql
-- Criar bucket para documentos APAC
insert into storage.buckets (id, name, public)
values ('apac-documentos', 'apac-documentos', false);

-- RLS Policy para upload (pacientes podem fazer upload dos próprios documentos)
create policy "Pacientes podem fazer upload de APAC"
on storage.objects for insert
with check (
  bucket_id = 'apac-documentos' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS Policy para leitura (pacientes veem apenas seus arquivos, admins veem todos)
create policy "Pacientes podem ver seus APAC"
on storage.objects for select
using (
  bucket_id = 'apac-documentos' 
  and (
    auth.uid()::text = (storage.foldername(name))[1]
    or exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
      and (
        auth.users.raw_user_meta_data->>'role' = 'admin' or
        auth.users.raw_user_meta_data->>'role' = 'farmaceutico'
      )
    )
  )
);
```

## 2. Criar Tabela de Documentos APAC

Execute o seguinte SQL:

```sql
-- Tabela para armazenar documentos APAC dos pacientes
create table if not exists public.documentos_apac (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid references auth.users(id) on delete cascade,
  paciente_nome text not null,
  paciente_email text not null,
  paciente_whatsapp text,
  arquivo_url text not null,
  arquivo_nome text not null,
  arquivo_tamanho bigint not null,
  data_upload timestamp with time zone default now(),
  data_vencimento date not null,
  status text not null default 'pendente',
  observacoes text,
  validado_por uuid references auth.users(id),
  data_validacao timestamp with time zone,
  notificacao_email_enviada boolean default false,
  notificacao_whatsapp_enviada boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Índices
create index if not exists idx_documentos_apac_paciente on public.documentos_apac(paciente_id);
create index if not exists idx_documentos_apac_status on public.documentos_apac(status);
create index if not exists idx_documentos_apac_vencimento on public.documentos_apac(data_vencimento);

-- RLS Policies
alter table public.documentos_apac enable row level security;

create policy "Pacientes podem ver seus documentos APAC"
  on public.documentos_apac for select
  using (auth.uid() = paciente_id);

create policy "Pacientes podem inserir seus documentos APAC"
  on public.documentos_apac for insert
  with check (auth.uid() = paciente_id);

create policy "Admins podem ver todos documentos APAC"
  on public.documentos_apac for select
  using (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
      and (
        auth.users.raw_user_meta_data->>'role' = 'admin' or
        auth.users.raw_user_meta_data->>'role' = 'farmaceutico'
      )
    )
  );

create policy "Admins podem atualizar documentos APAC"
  on public.documentos_apac for update
  using (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
      and auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Trigger para updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.documentos_apac
  for each row
  execute function public.handle_updated_at();
```

## 3. Configurar Notificações (Opcional)

### E-mail via Resend

1. Criar conta em [resend.com](https://resend.com)
2. Validar domínio em https://resend.com/domains
3. Criar API key em https://resend.com/api-keys
4. Adicionar secret `RESEND_API_KEY` no Supabase

### WhatsApp (Opções)

**Opção 1: Twilio**
- Criar conta em [twilio.com](https://twilio.com)
- Configurar WhatsApp Business API
- Adicionar secrets: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER`

**Opção 2: Evolution API (Gratuito)**
- Instalar Evolution API: https://github.com/EvolutionAPI/evolution-api
- Adicionar secret: `EVOLUTION_API_URL`, `EVOLUTION_API_KEY`

## 4. Funcionalidades Implementadas

✅ Dialog de upload de documento APAC na área do paciente
✅ Validação de arquivo (tamanho máximo 10MB, formatos: PDF, JPG, PNG)
✅ Botão "Dispensar" oculta temporariamente o alerta (volta ao recarregar página)
✅ Estrutura de edge function para envio de notificações
✅ Banco de dados para armazenar histórico de documentos

## 5. Próximos Passos

1. Execute os SQLs acima no Supabase SQL Editor
2. Configure as chaves de API para e-mail e WhatsApp
3. Implemente a integração real de upload no `UploadAPACDialog.tsx`
4. Complete a implementação da edge function `notificar-apac`
5. Adicione visualização dos documentos APAC na área administrativa
