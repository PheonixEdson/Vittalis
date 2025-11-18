import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle2, UserCheck, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function TermosUso() {
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
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Termos de Uso</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              Termos e Condições de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p>
              Ao utilizar o Sistema Vittalis, você concorda com estes Termos de Uso. Leia atentamente antes de prosseguir.
            </p>
          </CardContent>
        </Card>

        {/* 1. Aceitação */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              1. Aceitação dos Termos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">
              Ao acessar e utilizar o Sistema Vittalis ("Plataforma"), você ("Usuário") declara ter lido, compreendido 
              e concordado com estes Termos de Uso, bem como com a nossa <a href="/politica-privacidade" className="text-primary hover:underline">Política de Privacidade</a>.
            </p>
            <p className="text-muted-foreground">
              Caso não concorde com qualquer disposição, você não deve utilizar a Plataforma.
            </p>
          </CardContent>
        </Card>

        {/* 2. Descrição do Serviço */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Descrição do Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              O Sistema Vittalis é uma plataforma de gestão em saúde que oferece:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Gerenciamento de prontuários médicos eletrônicos</li>
              <li>Controle de estoque farmacêutico hospitalar</li>
              <li>Rastreabilidade de medicamentos e fracionamento</li>
              <li>Gestão de prescrições e dispensações</li>
              <li>Documentação APAC (Autorização de Procedimentos de Alta Complexidade)</li>
              <li>Controle de acesso por perfil (médicos, enfermeiros, farmacêuticos, pacientes, administradores)</li>
              <li>Auditoria e logs de operações para conformidade regulatória</li>
            </ul>
          </CardContent>
        </Card>

        {/* 3. Cadastro e Responsabilidades */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              3. Cadastro e Responsabilidades do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <div>
              <h3 className="font-semibold mb-2">3.1. Elegibilidade:</h3>
              <p className="text-muted-foreground">
                A Plataforma é destinada exclusivamente a:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mt-2">
                <li>Profissionais de saúde devidamente habilitados (médicos, enfermeiros, farmacêuticos)</li>
                <li>Pacientes vinculados à instituição de saúde</li>
                <li>Administradores e estoquistas autorizados</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3.2. Criação de Conta:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Você deve fornecer informações verdadeiras, precisas e atualizadas</li>
                <li>É proibido criar conta em nome de terceiros sem autorização</li>
                <li>Profissionais de saúde devem informar seus registros profissionais válidos (CRM, CRF, COREN)</li>
                <li>O cadastro pode ser validado pela administração antes da liberação de acesso</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3.3. Credenciais de Acesso:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Você é responsável pela confidencialidade de suas credenciais (login e senha)</li>
                <li>Não compartilhe suas credenciais com terceiros</li>
                <li>Comunique imediatamente qualquer uso não autorizado de sua conta</li>
                <li>Todas as ações realizadas com suas credenciais serão de sua responsabilidade</li>
              </ul>
            </div>

            <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20">
              <p className="text-sm text-destructive font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                IMPORTANTE: Credenciais compartilhadas podem violar o sigilo médico e a LGPD
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Uso Adequado */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              4. Uso Adequado da Plataforma
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <div>
              <h3 className="font-semibold mb-2">4.1. Você PODE:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Acessar dados necessários para sua atividade profissional (dentro do seu perfil de acesso)</li>
                <li>Registrar informações clínicas precisas e atualizadas</li>
                <li>Utilizar o sistema para fins de assistência à saúde e gestão hospitalar</li>
                <li>Gerar relatórios e auditorias conforme suas permissões</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-destructive">4.2. Você NÃO PODE:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Acessar dados de pacientes sem relação com seu atendimento (quebra de sigilo)</li>
                <li>Alterar, falsificar ou excluir registros médicos indevidamente</li>
                <li>Compartilhar dados sensíveis fora do contexto assistencial</li>
                <li>Utilizar a Plataforma para fins comerciais não autorizados</li>
                <li>Tentar burlar sistemas de segurança ou acessar áreas restritas</li>
                <li>Introduzir vírus, malware ou código malicioso</li>
                <li>Realizar engenharia reversa, descompilar ou extrair código-fonte</li>
                <li>Utilizar bots, scripts ou automações não autorizadas</li>
              </ul>
            </div>

            <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20">
              <p className="text-sm text-destructive">
                <strong>Violações dessas regras podem resultar em:</strong>
              </p>
              <ul className="list-disc list-inside text-sm text-destructive ml-4 mt-2">
                <li>Suspensão ou cancelamento da conta</li>
                <li>Notificação aos conselhos de classe profissional</li>
                <li>Responsabilização civil e criminal conforme legislação aplicável</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 5. Dados de Saúde e Sigilo */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Tratamento de Dados de Saúde e Sigilo Médico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              A Plataforma trata dados pessoais sensíveis relacionados à saúde, protegidos por:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>LGPD (Lei nº 13.709/2018):</strong> Proteção de dados pessoais e sensíveis</li>
              <li><strong>Código de Ética Médica:</strong> Sigilo profissional e respeito à privacidade do paciente</li>
              <li><strong>Resoluções dos Conselhos de Classe:</strong> Normas específicas para cada profissão de saúde</li>
            </ul>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Princípios que observamos:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Necessidade: Apenas dados necessários para a finalidade assistencial são coletados</li>
                <li>Finalidade: Dados usados exclusivamente para tutela da saúde e cumprimento legal</li>
                <li>Segurança: Medidas técnicas robustas (criptografia, controle de acesso, auditoria)</li>
                <li>Transparência: Você tem direito de saber como seus dados são tratados</li>
              </ul>
            </div>

            <p className="text-sm bg-primary/10 p-3 rounded-md border border-primary/20">
              Saiba mais em: <a href="/tratamento-dados-saude" className="text-primary hover:underline font-semibold">Como Tratamos Dados de Saúde</a>
            </p>
          </CardContent>
        </Card>

        {/* 6. Propriedade Intelectual */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Propriedade Intelectual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">
              Todos os direitos sobre a Plataforma (código-fonte, design, marca, conteúdo) pertencem ao Vittalis ou a seus licenciadores.
            </p>
            <p className="text-muted-foreground">
              É vedada a reprodução, distribuição, modificação ou exploração comercial sem autorização expressa.
            </p>
            <p className="text-muted-foreground">
              <strong>Seus dados clínicos e registros profissionais permanecem de sua propriedade</strong>, sendo a Plataforma 
              apenas o meio de armazenamento e gestão, conforme LGPD.
            </p>
          </CardContent>
        </Card>

        {/* 7. Disponibilidade */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Disponibilidade e Manutenção</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">
              Empenhamo-nos para manter a Plataforma disponível 24/7, mas:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Podem ocorrer interrupções para manutenções programadas (com aviso prévio quando possível)</li>
              <li>Eventos imprevisíveis (falhas técnicas, ataques cibernéticos) podem afetar a disponibilidade</li>
              <li>Não nos responsabilizamos por danos decorrentes de indisponibilidade temporária</li>
            </ul>
            <p className="text-muted-foreground">
              Em caso de indisponibilidade prolongada, medidas alternativas de registro assistencial devem ser adotadas 
              conforme protocolos da instituição.
            </p>
          </CardContent>
        </Card>

        {/* 8. Limitação de Responsabilidade */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              8. Limitação de Responsabilidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <div>
              <h3 className="font-semibold mb-2">8.1. Responsabilidade Profissional:</h3>
              <p className="text-muted-foreground">
                A Plataforma é uma <strong>ferramenta de apoio</strong>. Decisões clínicas, diagnósticos, prescrições e 
                condutas terapêuticas são de <strong>exclusiva responsabilidade do profissional de saúde</strong>, que deve 
                aplicar seu conhecimento técnico e cumprir as normas de sua profissão.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">8.2. Dados Inseridos:</h3>
              <p className="text-muted-foreground">
                Você é responsável pela <strong>precisão e veracidade</strong> dos dados que insere. O Vittalis não se 
                responsabiliza por erros decorrentes de informações incorretas fornecidas por usuários.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">8.3. Falhas e Perdas:</h3>
              <p className="text-muted-foreground">
                Embora adotemos backups e medidas de segurança, não garantimos proteção absoluta contra perda de dados 
                em caso de eventos extremos. Recomenda-se manter registros complementares quando aplicável.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 9. Modificações */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Modificações nos Termos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">
              Podemos atualizar estes Termos periodicamente. Alterações significativas serão comunicadas através de:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Notificação na Plataforma</li>
              <li>E-mail cadastrado</li>
              <li>Aviso no próximo login</li>
            </ul>
            <p className="text-muted-foreground">
              O uso continuado após a publicação das alterações implica aceitação dos novos termos.
            </p>
          </CardContent>
        </Card>

        {/* 10. Rescisão */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>10. Rescisão de Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">
              Você pode solicitar o encerramento de sua conta a qualquer momento através do nosso DPO: 
              <a href="mailto:dpo@vittalis.com.br" className="text-primary hover:underline ml-1">dpo@vittalis.com.br</a>
            </p>
            <p className="text-muted-foreground">
              Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos, sem aviso prévio.
            </p>
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
              <strong>Atenção:</strong> Dados clínicos devem ser mantidos conforme prazos legais (mínimo 20 anos para prontuários), 
              mesmo após encerramento da conta, em cumprimento à legislação sanitária.
            </p>
          </CardContent>
        </Card>

        {/* 11. Lei Aplicável */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>11. Lei Aplicável e Foro</CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90">
            <p className="text-muted-foreground">
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca 
              de [cidade da sede] para dirimir quaisquer controvérsias, com renúncia expressa a qualquer outro, 
              por mais privilegiado que seja.
            </p>
          </CardContent>
        </Card>

        {/* 12. Contato */}
        <Card className="mb-6 border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary">12. Contato</CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90">
            <p className="text-muted-foreground mb-3">
              Dúvidas sobre estes Termos? Entre em contato:
            </p>
            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <p><strong>Vittalis - Sistema de Gestão em Saúde</strong></p>
              <p>E-mail: <a href="mailto:contato@vittalis.com.br" className="text-primary hover:underline">contato@vittalis.com.br</a></p>
              <p>DPO: <a href="mailto:dpo@vittalis.com.br" className="text-primary hover:underline">dpo@vittalis.com.br</a></p>
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
            onClick={() => navigate('/direitos-titular')}
          >
            Meus Direitos
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/tratamento-dados-saude')}
          >
            Dados de Saúde
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
