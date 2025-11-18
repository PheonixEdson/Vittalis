import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock, Database, Users, FileText, Clock, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function PoliticaPrivacidade() {
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
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Política de Privacidade</h1>
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
              Proteção de Dados de Saúde - LGPD
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p>
              Esta Política de Privacidade foi elaborada em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), 
              especialmente considerando o tratamento de dados pessoais sensíveis relacionados à saúde.
            </p>
          </CardContent>
        </Card>

        {/* 1. Controlador e Encarregado */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              1. Identificação do Controlador e Encarregado de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <div>
              <h3 className="font-semibold mb-2">Controlador:</h3>
              <p className="text-muted-foreground">Vittalis - Sistema de Gestão em Saúde</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Encarregado de Proteção de Dados (DPO):</h3>
              <p className="text-muted-foreground">
                Para exercer seus direitos ou esclarecer dúvidas sobre proteção de dados, entre em contato:<br />
                E-mail: <a href="mailto:dpo@vittalis.com.br" className="text-primary hover:underline">dpo@vittalis.com.br</a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Dados Coletados */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              2. Dados Pessoais Coletados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <div>
              <h3 className="font-semibold mb-2 text-primary">2.1. Dados Pessoais Comuns:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Nome completo</li>
                <li>CPF e RG</li>
                <li>E-mail e telefone</li>
                <li>Endereço residencial</li>
                <li>Data de nascimento</li>
                <li>Credenciais de acesso (login e senha criptografada)</li>
                <li>Dados profissionais (CRM, CRF, COREN, registro ANVISA, etc.)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-destructive">2.2. Dados Pessoais Sensíveis (Art. 5º, II e Art. 11 da LGPD):</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li><strong>Dados de saúde:</strong> prontuários médicos, histórico clínico, exames, diagnósticos, prescrições</li>
                <li>Documentação APAC (Autorização de Procedimentos de Alta Complexidade)</li>
                <li>Laudos médicos e relatórios técnicos</li>
                <li>Informações sobre tratamentos e medicações em uso</li>
                <li>Dados de rastreabilidade de medicamentos (lote, validade, fracionamento)</li>
                <li>Informações sobre procedimentos médicos realizados</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2.3. Dados Técnicos e de Navegação:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Endereço IP</li>
                <li>Cookies e identificadores de sessão</li>
                <li>Logs de acesso ao sistema</li>
                <li>Informações de dispositivo e navegador</li>
                <li>Dados de uso e interação com a plataforma</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3. Finalidades */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              3. Finalidades do Tratamento de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">Os dados coletados são utilizados para as seguintes finalidades:</p>
            
            <div>
              <h3 className="font-semibold mb-2">3.1. Tutela da Saúde (Art. 11, II, 'f' da LGPD):</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Prestação de serviços de saúde e atendimento médico</li>
                <li>Gerenciamento de prontuários e histórico clínico</li>
                <li>Prescrição, dispensação e controle de medicamentos</li>
                <li>Rastreabilidade de medicamentos fracionados</li>
                <li>Controle de estoque farmacêutico hospitalar</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3.2. Cumprimento de Obrigações Legais (Art. 7º, II da LGPD):</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Atendimento a exigências de órgãos reguladores (ANVISA, Conselhos de Classe)</li>
                <li>Controle de medicamentos controlados</li>
                <li>Auditorias e fiscalizações sanitárias</li>
                <li>Documentação obrigatória para procedimentos APAC</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3.3. Execução de Contrato (Art. 7º, V da LGPD):</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Cadastro e autenticação de usuários (profissionais de saúde e pacientes)</li>
                <li>Gestão de acessos e permissões por perfil</li>
                <li>Comunicação sobre serviços prestados</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3.4. Legítimo Interesse (Art. 7º, IX da LGPD):</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Melhoria dos serviços e da plataforma</li>
                <li>Segurança da informação e prevenção de fraudes</li>
                <li>Análise estatística para gestão hospitalar (dados anonimizados)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 4. Bases Legais */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              4. Bases Legais Aplicáveis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">O tratamento de dados pessoais se fundamenta nas seguintes bases legais:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Art. 11, II, 'f' da LGPD:</strong> Tutela da saúde para tratamento de dados sensíveis relacionados à saúde</li>
              <li><strong>Art. 7º, II:</strong> Cumprimento de obrigação legal ou regulatória pelo controlador</li>
              <li><strong>Art. 7º, V:</strong> Execução de contrato do qual seja parte o titular</li>
              <li><strong>Art. 7º, IX:</strong> Legítimo interesse do controlador</li>
              <li><strong>Art. 11, II, 'a':</strong> Consentimento específico e destacado quando aplicável</li>
            </ul>
          </CardContent>
        </Card>

        {/* 5. Compartilhamento */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              5. Compartilhamento de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">Seus dados podem ser compartilhados com:</p>
            
            <div>
              <h3 className="font-semibold mb-2">5.1. Dentro da Instituição:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Médicos, enfermeiros, farmacêuticos e equipe multidisciplinar envolvida no seu atendimento</li>
                <li>Administrativos para fins de gestão hospitalar</li>
                <li>Estoquistas para controle de medicamentos</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5.2. Terceiros Autorizados:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Laboratórios e clínicas parceiras</li>
                <li>Farmácias conveniadas</li>
                <li>Planos de saúde e operadoras (mediante autorização)</li>
                <li>Órgãos reguladores (ANVISA, Vigilância Sanitária, Conselhos de Classe)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5.3. Prestadores de Serviço (Operadores):</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Provedores de hospedagem em nuvem (Supabase)</li>
                <li>Serviços de infraestrutura tecnológica</li>
                <li>Serviços de backup e segurança</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
              <strong>Importante:</strong> Todos os terceiros são contratualmente obrigados a tratar seus dados com confidencialidade 
              e segurança, em conformidade com a LGPD.
            </p>
          </CardContent>
        </Card>

        {/* 6. Retenção de Dados */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              6. Prazo de Retenção de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <div>
              <h3 className="font-semibold mb-2">6.1. Dados Clínicos e Prontuários:</h3>
              <p className="text-muted-foreground">
                Armazenados por <strong>no mínimo 20 anos</strong> após o último atendimento, conforme Resolução CFM nº 1.821/2007 
                e legislação aplicável ao prontuário médico.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">6.2. Dados Farmacêuticos e de Rastreabilidade:</h3>
              <p className="text-muted-foreground">
                Mantidos por <strong>5 anos</strong> ou conforme exigências específicas da ANVISA para medicamentos controlados.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">6.3. Dados Cadastrais e de Acesso:</h3>
              <p className="text-muted-foreground">
                Mantidos enquanto a relação contratual perdurar ou pelo prazo legal necessário para cumprimento de obrigações.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">6.4. Logs de Acesso e Segurança:</h3>
              <p className="text-muted-foreground">
                Armazenados por <strong>6 meses</strong> conforme Marco Civil da Internet (Lei nº 12.965/2014).
              </p>
            </div>

            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
              Após os prazos acima, os dados serão eliminados ou anonimizados de forma segura, salvo necessidade legal ou regulatória 
              de manutenção por período superior.
            </p>
          </CardContent>
        </Card>

        {/* 7. Segurança */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              7. Medidas de Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              Implementamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, 
              perda, destruição ou alteração indevida:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Criptografia:</strong> Dados sensíveis são criptografados em trânsito (HTTPS/TLS) e em repouso</li>
              <li><strong>Controle de Acesso:</strong> Autenticação robusta e controle de permissões por perfil (RBAC)</li>
              <li><strong>Auditoria:</strong> Logs detalhados de todos os acessos e operações realizadas no sistema</li>
              <li><strong>Backups Seguros:</strong> Cópias de segurança criptografadas e armazenadas em ambiente protegido</li>
              <li><strong>Infraestrutura:</strong> Hospedagem em ambiente cloud com certificações de segurança (Supabase)</li>
              <li><strong>Políticas Internas:</strong> Treinamento de colaboradores e procedimentos de segurança da informação</li>
              <li><strong>Monitoramento:</strong> Sistemas de detecção de ameaças e incidentes de segurança</li>
            </ul>

            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">
              <strong>Importante:</strong> Nenhum sistema é 100% seguro. Em caso de incidente de segurança que possa acarretar 
              risco aos seus direitos, você será comunicado conforme determina a LGPD.
            </p>
          </CardContent>
        </Card>

        {/* 8. Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Uso de Cookies e Tecnologias Similares</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação:
            </p>
            
            <div>
              <h3 className="font-semibold mb-2">8.1. Cookies Essenciais:</h3>
              <p className="text-muted-foreground">Necessários para o funcionamento do sistema (autenticação, sessão, segurança)</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">8.2. Cookies de Desempenho:</h3>
              <p className="text-muted-foreground">Coletam informações sobre uso da plataforma para melhorias (anonimizados)</p>
            </div>

            <p className="text-sm text-muted-foreground">
              Você pode gerenciar cookies através das configurações do seu navegador, mas isso pode impactar 
              funcionalidades da plataforma.
            </p>
          </CardContent>
        </Card>

        {/* 9. Direitos do Titular */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              9. Seus Direitos como Titular de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">Conforme Arts. 17 e 18 da LGPD, você tem direito a:</p>
            
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e obter cópia deles</li>
              <li><strong>Correção:</strong> Solicitar atualização de dados incompletos, inexatos ou desatualizados</li>
              <li><strong>Anonimização ou Eliminação:</strong> Requerer anonimização ou exclusão de dados desnecessários ou excessivos</li>
              <li><strong>Portabilidade:</strong> Solicitar transferência dos dados a outro prestador (quando aplicável)</li>
              <li><strong>Revogação de Consentimento:</strong> Retirar consentimento previamente fornecido</li>
              <li><strong>Informação sobre Compartilhamento:</strong> Saber com quem compartilhamos seus dados</li>
              <li><strong>Oposição:</strong> Opor-se ao tratamento realizado com base em legítimo interesse</li>
              <li><strong>Revisão de Decisões Automatizadas:</strong> Solicitar revisão humana de decisões tomadas por algoritmos</li>
            </ul>

            <p className="text-sm bg-primary/10 p-3 rounded-md border border-primary/20 text-foreground">
              <strong>Como exercer seus direitos:</strong><br />
              Acesse nossa página de <a href="/direitos-titular" className="text-primary hover:underline font-semibold">Exercício de Direitos do Titular</a> ou 
              entre em contato com nosso DPO pelo e-mail: <a href="mailto:dpo@vittalis.com.br" className="text-primary hover:underline">dpo@vittalis.com.br</a>
            </p>

            <p className="text-sm text-muted-foreground">
              <strong>Importante:</strong> Alguns dados não podem ser excluídos devido a obrigações legais (ex: prontuários médicos) 
              ou necessidade de tutela da saúde. Nesses casos, explicaremos os motivos da impossibilidade.
            </p>
          </CardContent>
        </Card>

        {/* 10. Armazenamento */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>10. Armazenamento em Nuvem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">
              Os dados são armazenados em servidores seguros fornecidos pela <strong>Supabase</strong>, que possui 
              certificações de segurança e conformidade com padrões internacionais de proteção de dados.
            </p>
            <p className="text-muted-foreground">
              Os servidores podem estar localizados fora do Brasil, mas garantimos que a transferência internacional 
              de dados segue as exigências da LGPD (Art. 33), incluindo cláusulas contratuais padrão e garantias 
              adequadas de proteção.
            </p>
          </CardContent>
        </Card>

        {/* 11. Alterações */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>11. Alterações na Política de Privacidade</CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90">
            <p className="text-muted-foreground mb-3">
              Esta Política pode ser atualizada periodicamente. Alterações significativas serão comunicadas através de:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Aviso na plataforma</li>
              <li>E-mail cadastrado</li>
              <li>Notificação no próximo acesso ao sistema</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              Recomendamos que você revise esta Política regularmente.
            </p>
          </CardContent>
        </Card>

        {/* 12. Contato */}
        <Card className="mb-6 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              12. Fale Conosco
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90">
            <p className="text-muted-foreground mb-4">
              Para dúvidas, solicitações ou reclamações relacionadas à proteção de dados:
            </p>
            <div className="bg-muted/50 p-4 rounded-md border border-border space-y-2">
              <p><strong>Encarregado de Proteção de Dados (DPO)</strong></p>
              <p>E-mail: <a href="mailto:dpo@vittalis.com.br" className="text-primary hover:underline">dpo@vittalis.com.br</a></p>
              <p className="text-sm text-muted-foreground">Prazo de resposta: até 15 dias úteis</p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Links relacionados */}
        <div className="grid gap-4 md:grid-cols-3">
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
            onClick={() => navigate('/direitos-titular')}
          >
            Exercer Meus Direitos
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
