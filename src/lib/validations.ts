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

// Schema para Laudo APAC
export const laudoAPACSchema = z.object({
  // Identificação do Estabelecimento
  nomeEstabelecimento: z.string().min(1, "Nome do estabelecimento é obrigatório").max(200, "Máximo 200 caracteres"),
  cnes: z.string().min(1, "CNES é obrigatório").max(20, "Máximo 20 caracteres"),
  
  // Identificação do Paciente
  nomePaciente: nomeCompletoSchema,
  prontuario: z.string().min(1, "Prontuário é obrigatório").max(50, "Máximo 50 caracteres"),
  cns: z.string().min(15, "CNS deve ter 15 dígitos").max(15, "CNS deve ter 15 dígitos").regex(/^\d+$/, "CNS deve conter apenas números"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  sexo: z.string().min(1, "Sexo é obrigatório"),
  raca: z.string().min(1, "Raça/Cor é obrigatória"),
  nomeMae: nomeCompletoSchema,
  dddContato: z.string().min(2, "DDD é obrigatório").max(2, "DDD deve ter 2 dígitos").regex(/^\d+$/, "DDD deve conter apenas números"),
  telefoneContato: z.string().min(8, "Telefone é obrigatório").max(9, "Máximo 9 dígitos").regex(/^\d+$/, "Telefone deve conter apenas números"),
  nomeResponsavel: z.string().optional(),
  dddResponsavel: z.string().optional(),
  telefoneResponsavel: z.string().optional(),
  endereco: enderecoSchema,
  municipio: z.string().min(1, "Município é obrigatório").max(100, "Máximo 100 caracteres"),
  codigoIbge: z.string().min(1, "Código IBGE é obrigatório").max(7, "Máximo 7 dígitos").regex(/^\d+$/, "Código IBGE deve conter apenas números"),
  uf: z.string().min(2, "UF é obrigatória").max(2, "UF deve ter 2 caracteres"),
  cep: z.string().min(8, "CEP deve ter 8 dígitos").max(8, "CEP deve ter 8 dígitos").regex(/^\d+$/, "CEP deve conter apenas números"),
  
  // Procedimento Solicitado
  codigoProcedimento1: z.string().min(1, "Código do procedimento é obrigatório").max(20, "Máximo 20 caracteres"),
  nomeProcedimento1: z.string().min(1, "Nome do procedimento é obrigatório").max(200, "Máximo 200 caracteres"),
  qtde1: z.string().min(1, "Quantidade é obrigatória").regex(/^\d+$/, "Quantidade deve ser um número"),
  codigoProcedimento2: z.string().optional(),
  nomeProcedimento2: z.string().optional(),
  qtde2: z.string().optional(),
  codigoProcedimento3: z.string().optional(),
  nomeProcedimento3: z.string().optional(),
  qtde3: z.string().optional(),
  
  // Justificativa
  descricaoDiagnostico: z.string().min(10, "Descrição do diagnóstico deve ter pelo menos 10 caracteres").max(2000, "Máximo 2000 caracteres"),
  cid10Principal: z.string().min(1, "CID-10 principal é obrigatório").max(10, "Máximo 10 caracteres"),
  cid10Secundario: z.string().optional(),
  cid10Associadas: z.string().optional(),
  
  // Resumo
  resumoAnamnese: z.string().min(10, "Resumo da anamnese deve ter pelo menos 10 caracteres").max(2000, "Máximo 2000 caracteres"),
  examesComplementares: z.string().min(10, "Exames complementares devem ter pelo menos 10 caracteres").max(2000, "Máximo 2000 caracteres"),
  justificativaProcedimento: z.string().min(10, "Justificativa do procedimento deve ter pelo menos 10 caracteres").max(2000, "Máximo 2000 caracteres"),
  
  // Solicitação
  nomeProfissionalSolicitante: nomeCompletoSchema,
  tipoDocumentoSolicitante: z.enum(["CNS", "CPF"]),
  numeroDocumentoSolicitante: z.string().min(1, "Número do documento é obrigatório").max(20, "Máximo 20 caracteres"),
  dataSolicitacao: z.string().min(1, "Data de solicitação é obrigatória"),
  
  // Autorização
  nomeProfissionalAutorizador: z.string().optional(),
  codOrgaoEmissor: z.string().optional(),
  numeroAutorizacao: z.string().optional(),
  tipoDocumentoAutorizador: z.enum(["CNS", "CPF"]).optional(),
  numeroDocumentoAutorizador: z.string().optional(),
  dataAutorizacao: z.string().optional(),
  periodoValidade: z.string().optional(),
  
  // Estabelecimento Executante
  nomeEstabelecimentoExecutante: z.string().optional(),
  cnesExecutante: z.string().optional(),
});

// Schema para Laudo Complementar APAC
export const laudoComplementarAPACSchema = z.object({
  // Oncologia - Identificação Patológica
  localizacaoTumor: z.string().optional(),
  cid10Topografia: z.string().optional(),
  linfonodosInvadidos: z.string().optional(),
  localizacaoMetastase: z.string().optional(),
  estadioUICC: z.string().optional(),
  estadioOutro: z.string().optional(),
  grauHistopatologico: z.string().optional(),
  diagnosticoHistopatologico: z.string().optional(),
  dataHistopatologico: z.string().optional(),
  
  // Quimioterapia - Tratamentos Anteriores
  quimioAnterior: z.enum(["SIM", "NAO"]),
  quimioTratamento1Desc: z.string().optional(),
  quimioTratamento1Data: z.string().optional(),
  quimioTratamento2Desc: z.string().optional(),
  quimioTratamento2Data: z.string().optional(),
  quimioTratamento3Desc: z.string().optional(),
  quimioTratamento3Data: z.string().optional(),
  
  // Quimioterapia - Tratamento Solicitado
  quimioContinuidade: z.enum(["SIM", "NAO"]),
  quimioDataInicio: z.string().optional(),
  quimioEsquema: z.string().optional(),
  quimioMesesPlanejados: z.string().optional(),
  quimioMesesAutorizados: z.string().optional(),
  
  // Radioterapia - Tratamentos Anteriores
  radioAnterior: z.enum(["SIM", "NAO"]),
  radioTratamento1Desc: z.string().optional(),
  radioTratamento1Data: z.string().optional(),
  radioTratamento2Desc: z.string().optional(),
  radioTratamento2Data: z.string().optional(),
  radioTratamento3Desc: z.string().optional(),
  radioTratamento3Data: z.string().optional(),
  
  // Radioterapia - Tratamento Solicitado
  radioContinuidade: z.enum(["SIM", "NAO"]),
  radioDataInicio: z.string().optional(),
  radioFinalidade: z.string().optional(),
  radioCid1: z.string().optional(),
  radioDescricao1: z.string().optional(),
  radioAreaIrradiada1: z.string().optional(),
  radioCampos1: z.string().optional(),
  radioDataInicio1: z.string().optional(),
  radioDataTermino1: z.string().optional(),
  radioCid2: z.string().optional(),
  radioDescricao2: z.string().optional(),
  radioAreaIrradiada2: z.string().optional(),
  radioCampos2: z.string().optional(),
  radioDataInicio2: z.string().optional(),
  radioDataTermino2: z.string().optional(),
  radioCid3: z.string().optional(),
  radioDescricao3: z.string().optional(),
  radioAreaIrradiada3: z.string().optional(),
  radioCampos3: z.string().optional(),
  radioDataInicio3: z.string().optional(),
  radioDataTermino3: z.string().optional(),
  
  // Nefrologia
  tipoAtendimento: z.enum(["PRIMEIRO", "CONTINUIDADE"]),
  dataPrimeiraDialise: z.string().optional(),
  inscritoCNCDO: z.enum(["SIM", "NAO"]),
  antiHIV: z.enum(["POSITIVO", "NEGATIVO"]),
  hemoglobina: z.string().optional(),
});
