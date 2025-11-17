-- Nota: Esta migration cria usuários diretamente no auth (não recomendado para produção)
-- Melhor desabilitar a confirmação de email e criar via interface

-- Se os usuários já existirem mas não estiverem confirmados, esta query confirma seus emails:
UPDATE auth.users
SET 
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email IN ('sara.mariaoliveira@upe.br', 'jobosco1227@hotmail.com')
  AND email_confirmed_at IS NULL;

-- Se precisar atribuir papéis manualmente após criar os usuários via interface:
-- (Descomente e ajuste os UUIDs depois que os usuários forem criados)

-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'admin'::public.app_role
-- FROM auth.users
-- WHERE email = 'sara.mariaoliveira@upe.br'
-- ON CONFLICT (user_id, role) DO NOTHING;

-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'estoquista'::public.app_role
-- FROM auth.users
-- WHERE email = 'jobosco1227@hotmail.com'
-- ON CONFLICT (user_id, role) DO NOTHING;