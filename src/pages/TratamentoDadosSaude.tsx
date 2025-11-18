import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Lock, Shield, Database, Eye, Users, FileText, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function TratamentoDadosSaude() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Como Tratamos Dados de Saúde</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Intro */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              Proteção Especial para Dados Sensíveis de Saúde
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90">
            <p className="text-muted-foreground mb-3">
              Dados de saúde são considerados <strong>dados pessoais sensíveis</strong> pela LGPD (Art. 5º, II) 
              e recebem proteção especial. No Vittalis, tratamos essas informações com o mais alto nível de segurança 
              e responsabilidade.
            </p>
            <p className="text-muted-foreground">
              Esta página explica de forma transparente como coletamos, usamos, armazenamos e protegemos seus dados de saúde.
            </p>
          </CardContent>
        </Card>

        {/* O que são dados de saúde */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              O que são Dados de Saúde?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              Dados de saúde incluem qualquer informação relacionada ao seu estado físico ou mental, presente, 
              passado ou futuro. No Sistema Vittalis, tratamos:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  Dados Sensíveis:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Prontuários médicos completos</li>
                  <li>• Histórico clínico e anamnese</li>
                  <li>• Resultados de exames (laboratoriais, imagens, etc.)</li>
                  <li>• Diagnósticos e hipóteses diagnósticas</li>
                  <li>• Prescrições médicas e planos terapêuticos</li>
                  <li>• Medicamentos em uso (atual e passado)</li>
                  <li>• Procedimentos realizados</li>
                  <li>• Documentação APAC</li>
                  <li>• Laudos médicos e relatórios técnicos</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Dados de Apoio:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dados cadastrais (nome, CPF, data de nascimento)</li>
                  <li>• Número SUS / cartão do plano de saúde</li>
                  <li>• Contatos (e-mail, telefone)</li>
                  <li>• Endereço residencial</li>
                  <li>• Dados de profissionais (CRM, CRF, COREN)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Base Legal */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Base Legal: Tutela da Saúde
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              O tratamento de dados de saúde no Vittalis se fundamenta principalmente no <strong>Art. 11, II, alínea 'f' da LGPD</strong>:
            </p>
            
            <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
              <p className="font-semibold mb-2">Art. 11, II, 'f' - Tutela da Saúde:</p>
              <p className="text-sm text-muted-foreground">
                "O tratamento de dados pessoais sensíveis somente poderá ocorrer quando for indispensável para 
                a tutela da saúde, exclusivamente, em procedimento realizado por profissionais de saúde, serviços 
                de saúde ou autoridade sanitária."
              </p>
            </div>

            <p className="text-muted-foreground">
              Isso significa que seus dados são usados <strong>exclusivamente</strong> para:
            </p>

            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Prestação de assistência à saúde</li>
              <li>Continuidade do cuidado médico</li>
              <li>Gestão clínica e hospitalar</li>
              <li>Garantia de segurança do paciente</li>
              <li>Rastreabilidade de medicamentos</li>
              <li>Cumprimento de obrigações legais e sanitárias</li>
            </ul>

            <div className="bg-muted/50 p-3 rounded-md border border-border mt-4">
              <p className="text-sm text-muted-foreground">
                <strong>Outras bases legais complementares:</strong>
              </p>
              <ul className="text-sm text-muted-foreground ml-4 mt-2 space-y-1">
                <li>• <strong>Art. 7º, II:</strong> Cumprimento de obrigação legal (ANVISA, Conselhos de Classe)</li>
                <li>• <strong>Art. 7º, V:</strong> Execução de contrato</li>
                <li>• <strong>Art. 11, II, 'a':</strong> Consentimento específico quando aplicável</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Quem tem acesso */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Quem Tem Acesso aos Seus Dados?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              O acesso aos dados de saúde é <strong>rigorosamente controlado</strong> por perfis de usuário:
            </p>

            <div className="space-y-3">
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  Médicos:
                </h3>
                <p className="text-sm text-muted-foreground">
                  Acessam prontuários dos pacientes sob seus cuidados. Podem visualizar histórico, exames, prescrever 
                  medicamentos e registrar evoluções clínicas.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  Enfermeiros:
                </h3>
                <p className="text-sm text-muted-foreground">
                  Acessam dados necessários para cuidados de enfermagem, administração de medicamentos e evolução 
                  multiprofissional.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  Farmacêuticos:
                </h3>
                <p className="text-sm text-muted-foreground">
                  Acessam prescrições, histórico de medicações, dados de estoque e rastreabilidade farmacêutica.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  Estoquistas:
                </h3>
                <p className="text-sm text-muted-foreground">
                  Acessam apenas dados relacionados à gestão de estoque de medicamentos (não acessam prontuários).
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  Administradores:
                </h3>
                <p className="text-sm text-muted-foreground">
                  Acesso administrativo para gestão da plataforma, auditoria e conformidade. Sujeitos a sigilo rigoroso.
                </p>
              </div>

              <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  Pacientes (Você):
                </h3>
                <p className="text-sm text-muted-foreground">
                  Você pode acessar seus próprios dados de saúde através da área do paciente, incluindo consultas, 
                  exames, prescrições e documentos APAC.
                </p>
              </div>
            </div>

            <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20">
              <p className="text-sm text-destructive font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Controle de Acesso Rigoroso:
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Todos os acessos são registrados em logs auditáveis. Acesso indevido a prontuários (sem relação 
                assistencial) é considerado quebra de sigilo e pode resultar em sanções éticas, administrativas e legais.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Medidas de Segurança */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Medidas de Segurança Aplicadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              Para proteger seus dados de saúde, implementamos múltiplas camadas de segurança:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Técnicas:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Criptografia em trânsito (HTTPS/TLS)</li>
                  <li>• Criptografia em repouso (banco de dados)</li>
                  <li>• Autenticação robusta (senhas seguras)</li>
                  <li>• Controle de acesso por perfil (RBAC)</li>
                  <li>• Firewall e proteção contra ataques</li>
                  <li>• Backups criptografados e redundantes</li>
                  <li>• Monitoramento 24/7 de segurança</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Organizacionais:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Política de Segurança da Informação</li>
                  <li>• Treinamento obrigatório em LGPD</li>
                  <li>• Termos de confidencialidade assinados</li>
                  <li>• Auditorias periódicas de acesso</li>
                  <li>• Plano de Resposta a Incidentes</li>
                  <li>• Revisões de segurança regulares</li>
                  <li>• DPO dedicado à conformidade</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                Infraestrutura:
              </h3>
              <p className="text-sm text-muted-foreground">
                Dados hospedados em servidores seguros da <strong>Supabase</strong>, com certificações de segurança 
                e conformidade com padrões internacionais (ISO 27001, SOC 2). Infraestrutura cloud com alta disponibilidade, 
                backups automáticos e recuperação de desastres.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Retenção */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quanto Tempo Guardamos Seus Dados?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              O prazo de retenção de dados de saúde é regulado por legislação específica:
            </p>

            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <h3 className="font-semibold mb-2">Prontuários Médicos:</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Mínimo de 20 anos</strong> após o último atendimento, conforme <strong>Resolução CFM nº 1.821/2007</strong> 
                e legislação sanitária. Este prazo garante continuidade do cuidado e atende exigências legais e periciais.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <h3 className="font-semibold mb-2">Dados Farmacêuticos e Rastreabilidade:</h3>
              <p className="text-sm text-muted-foreground">
                <strong>5 anos</strong> ou conforme regulamentações específicas da ANVISA para medicamentos controlados 
                e rastreabilidade.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <h3 className="font-semibold mb-2">Logs de Acesso:</h3>
              <p className="text-sm text-muted-foreground">
                <strong>6 meses</strong> conforme Marco Civil da Internet (Lei nº 12.965/2014), para fins de auditoria 
                e segurança.
              </p>
            </div>

            <p className="text-sm text-muted-foreground bg-primary/10 p-3 rounded-md border border-primary/20">
              <strong>Importante:</strong> Mesmo após você solicitar exclusão de conta, dados clínicos essenciais 
              (prontuário) devem ser mantidos pelos prazos legais mínimos. Isso protege tanto você quanto os profissionais 
              de saúde em casos de necessidade futura (perícias, questões judiciais, continuidade do cuidado).
            </p>
          </CardContent>
        </Card>

        {/* Compartilhamento */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Com Quem Compartilhamos Seus Dados de Saúde?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              Compartilhamos seus dados de saúde apenas quando estritamente necessário:
            </p>

            <div className="space-y-3">
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Dentro da Instituição de Saúde:</h3>
                <p className="text-sm text-muted-foreground">
                  Equipe multidisciplinar envolvida no seu atendimento (médicos, enfermeiros, farmacêuticos), conforme 
                  necessidade assistencial e com base no sigilo profissional.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Laboratórios e Clínicas Parceiras:</h3>
                <p className="text-sm text-muted-foreground">
                  Quando necessário para realização de exames, procedimentos ou continuidade do tratamento.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Planos de Saúde / Operadoras:</h3>
                <p className="text-sm text-muted-foreground">
                  Somente mediante sua autorização ou exigência contratual/legal para cobertura de procedimentos 
                  (ex: APAC, autorizações).
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Órgãos Reguladores:</h3>
                <p className="text-sm text-muted-foreground">
                  ANVISA, Vigilância Sanitária, Conselhos de Classe (CRM, CRF, COREN) e autoridades judiciais, 
                  quando legalmente exigido.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Prestadores de Serviço (Operadores):</h3>
                <p className="text-sm text-muted-foreground">
                  Provedores de infraestrutura cloud (Supabase) que atuam como operadores de dados, obrigados 
                  contratualmente a tratar dados com sigilo e segurança.
                </p>
              </div>
            </div>

            <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20">
              <p className="text-sm text-destructive font-semibold">
                <strong>Nunca compartilhamos:</strong>
              </p>
              <ul className="text-sm text-muted-foreground ml-4 mt-2 space-y-1">
                <li>• Dados para fins comerciais ou marketing</li>
                <li>• Informações com terceiros não autorizados</li>
                <li>• Dados identificáveis para pesquisas sem seu consentimento</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Seus Direitos */}
        <Card className="mb-6 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              Seus Direitos sobre Dados de Saúde
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              Você tem direitos garantidos pela LGPD sobre seus dados de saúde:
            </p>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Acesso:</strong> Obter cópia do seu prontuário e dados de saúde</li>
              <li><strong>Correção:</strong> Solicitar atualização de informações incorretas ou desatualizadas</li>
              <li><strong>Portabilidade:</strong> Transferir dados para outro prestador de saúde</li>
              <li><strong>Informação:</strong> Saber como seus dados são usados e com quem são compartilhados</li>
              <li><strong>Revogação:</strong> Retirar consentimento quando aplicável (respeitando obrigações legais)</li>
            </ul>

            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Observação importante:</strong> Alguns dados clínicos não podem ser excluídos devido a obrigações 
                legais (ex: prontuário deve ser mantido por 20 anos). Nesses casos, explicaremos os motivos e as bases 
                legais que impedem a exclusão.
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <Button onClick={() => navigate('/direitos-titular')} className="flex-1">
                Exercer Meus Direitos
              </Button>
              <Button onClick={() => navigate('/encarregado-dados')} variant="outline" className="flex-1">
                Falar com o DPO
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Links relacionados */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/politica-privacidade')}
          >
            Política de Privacidade
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/termos-uso')}
          >
            Termos de Uso
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/encarregado-dados')}
          >
            Contato DPO
          </Button>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => navigate('/')}>
            Voltar à Página Inicial
          </Button>
        </div>
      </main>
    </div>
  );
}
