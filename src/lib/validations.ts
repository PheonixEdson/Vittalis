import { z } from "zod";

// Função para validar CPF brasileiro
export const validarCPF = (cpf: string): boolean => {
  const cpfLimpo = cpf.replace(/\D/g, "");
  
  if (cpfLimpo.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  const digito1 = resto === 10 || resto === 11 ? 0 : resto;

  if (digito1 !== parseInt(cpfLimpo.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  const digito2 = resto === 10 || resto === 11 ? 0 : resto;

  return digito2 === parseInt(cpfLimpo.charAt(10));
};

// Função para validar telefone brasileiro
export const validarTelefone = (telefone: string): boolean => {
  const telefoneLimpo = telefone.replace(/\D/g, "");
  // Aceita: (11) 98888-8888 ou (11) 3888-8888
  return /^[1-9]{2}9?[0-9]{8}$/.test(telefoneLimpo);
};

// Schema Zod para CPF
export const cpfSchema = z
  .string()
  .min(1, "CPF é obrigatório")
  .refine(validarCPF, {
    message: "CPF inválido. Verifique os dígitos informados.",
  });

// Schema Zod para telefone
export const telefoneSchema = z
  .string()
  .min(1, "Telefone é obrigatório")
  .refine(validarTelefone, {
    message: "Telefone inválido. Use o formato (DD) XXXXX-XXXX",
  });

// Schema Zod para email com limite LGPD
export const emailSchema = z
  .string()
  .min(1, "E-mail é obrigatório")
  .email("E-mail inválido")
  .max(255, "E-mail deve ter no máximo 255 caracteres");

// Schema Zod para nome completo
export const nomeCompletoSchema = z
  .string()
  .min(3, "Nome completo deve ter pelo menos 3 caracteres")
  .max(200, "Nome completo deve ter no máximo 200 caracteres")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras");

// Schema Zod para endereço
export const enderecoSchema = z
  .string()
  .min(10, "Endereço deve ter pelo menos 10 caracteres")
  .max(500, "Endereço deve ter no máximo 500 caracteres");

// Schema Zod para data de nascimento
export const dataNascimentoSchema = z
  .string()
  .min(1, "Data de nascimento é obrigatória")
  .refine(
    (date) => {
      const nascimento = new Date(date);
      const hoje = new Date();
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      return idade >= 18 && idade <= 120;
    },
    {
      message: "Idade deve estar entre 18 e 120 anos",
    }
  );

// Schema para senha (administrador)
export const senhaSchema = z
  .string()
  .min(8, "Senha deve ter pelo menos 8 caracteres")
  .max(100, "Senha deve ter no máximo 100 caracteres")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
    "Senha deve conter maiúsculas, minúsculas, números e caracteres especiais"
  );

// Schema para cadastro de paciente
export const cadastroPacienteSchema = z.object({
  numeroSUS: z
    .string()
    .min(15, "Número do SUS deve ter 15 dígitos")
    .max(15, "Número do SUS deve ter 15 dígitos")
    .regex(/^\d+$/, "Número do SUS deve conter apenas números"),
  cpf: cpfSchema,
  nomeCompleto: nomeCompletoSchema,
  email: emailSchema,
  telefone: telefoneSchema,
  endereco: enderecoSchema,
  dataNascimento: dataNascimentoSchema,
});

// Schema para cadastro de médico
export const cadastroMedicoSchema = z.object({
  numeroCRM: z
    .string()
    .min(1, "Número do CRM é obrigatório")
    .max(20, "Número do CRM deve ter no máximo 20 caracteres")
    .regex(/^[A-Z]{2}\s?\d{4,10}$/, "CRM inválido. Use o formato: UF 123456"),
  cpf: cpfSchema,
  nomeCompleto: nomeCompletoSchema,
  email: emailSchema,
  telefone: telefoneSchema,
  endereco: enderecoSchema,
  dataNascimento: dataNascimentoSchema,
});

// Schema para cadastro de enfermeiro
export const cadastroEnfermeiroSchema = z.object({
  numeroCOREN: z
    .string()
    .min(1, "Número do COREN é obrigatório")
    .max(20, "Número do COREN deve ter no máximo 20 caracteres")
    .regex(/^\d{6,10}$/, "COREN inválido. Use apenas números"),
  cpf: cpfSchema,
  nomeCompleto: nomeCompletoSchema,
  email: emailSchema,
  telefone: telefoneSchema,
  endereco: enderecoSchema,
  dataNascimento: dataNascimentoSchema,
});

// Schema para cadastro de farmacêutico
export const cadastroFarmaceuticoSchema = z.object({
  numeroCRF: z
    .string()
    .min(1, "Número do CRF é obrigatório")
    .max(20, "Número do CRF deve ter no máximo 20 caracteres")
    .regex(/^\d{5,10}$/, "CRF inválido. Use apenas números"),
  cpf: cpfSchema,
  nomeCompleto: nomeCompletoSchema,
  email: emailSchema,
  telefone: telefoneSchema,
  endereco: enderecoSchema,
  dataNascimento: dataNascimentoSchema,
});

// Schema para cadastro de estoquista
export const cadastroEstoquisaSchema = z.object({
  nome: nomeCompletoSchema,
  cpf: cpfSchema,
  email: emailSchema,
  telefone: telefoneSchema,
  endereco: enderecoSchema,
  dataNascimento: dataNascimentoSchema,
  crf: z
    .string()
    .max(20, "Registro profissional deve ter no máximo 20 caracteres")
    .optional()
    .or(z.literal("")),
});

// Schema para cadastro de administrador
export const cadastroAdministradorSchema = z
  .object({
    email: emailSchema,
    senha: senhaSchema,
    confirmarSenha: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });
