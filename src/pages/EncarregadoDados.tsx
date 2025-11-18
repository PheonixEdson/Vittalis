import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Shield, User, FileText, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function EncarregadoDados() {
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
              <h1 className="text-2xl font-bold text-foreground">Encarregado de Proteção de Dados</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Intro */}
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="h-5 w-5" />
              Data Protection Officer (DPO)
            </CardTitle>
            <CardDescription>
              O Encarregado de Proteção de Dados é o canal oficial para questões relacionadas à LGPD
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Conforme exigido pelo Art. 41 da Lei Geral de Proteção de Dados (LGPD), o Vittalis designou um 
              Encarregado de Proteção de Dados (DPO - Data Protection Officer) para atuar como canal de comunicação 
              entre os titulares de dados, o Vittalis e a Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </CardContent>
        </Card>

        {/* O que é DPO */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              O que é um Encarregado de Proteção de Dados?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              O DPO é uma pessoa designada pela organização para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Aceitar reclamações e comunicações dos titulares de dados (você)</li>
              <li>Prestar esclarecimentos sobre práticas de tratamento de dados</li>
              <li>Receber comunicações da Autoridade Nacional de Proteção de Dados (ANPD)</li>
              <li>Orientar funcionários sobre as melhores práticas de proteção de dados</li>
              <li>Garantir conformidade com a LGPD</li>
            </ul>
          </CardContent>
        </Card>

        {/* Quando Contatar */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quando Contatar o DPO?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p className="text-muted-foreground">
              Você deve entrar em contato com nosso DPO para:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Exercer seus direitos:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Acessar seus dados</li>
                  <li>• Corrigir informações</li>
                  <li>• Solicitar exclusão</li>
                  <li>• Revogar consentimento</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Esclarecer dúvidas:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Como seus dados são usados</li>
                  <li>• Bases legais aplicadas</li>
                  <li>• Compartilhamento de dados</li>
                  <li>• Medidas de segurança</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Reportar incidentes:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Vazamento de dados</li>
                  <li>• Acesso não autorizado</li>
                  <li>• Suspeita de uso indevido</li>
                  <li>• Violações de privacidade</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <h3 className="font-semibold mb-2">Fazer reclamações:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Práticas inadequadas</li>
                  <li>• Não conformidade com LGPD</li>
                  <li>• Problemas com resposta</li>
                  <li>• Questões de privacidade</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              Como Entrar em Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-background p-6 rounded-lg border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Encarregado de Proteção de Dados (DPO)</h3>
                  <p className="text-muted-foreground mb-3">Vittalis - Sistema de Gestão em Saúde</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">E-mail:</span>
                      <a 
                        href="mailto:dpo@vittalis.com.br" 
                        className="text-primary hover:underline font-semibold"
                      >
                        dpo@vittalis.com.br
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Prazo de resposta:</span>
                      <span className="font-semibold">até 15 dias úteis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Informações que devem ser incluídas no e-mail:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                <li>• Seu nome completo</li>
                <li>• CPF (para validação de identidade)</li>
                <li>• E-mail de contato</li>
                <li>• Descrição clara da sua solicitação ou dúvida</li>
                <li>• Documentos relevantes (se aplicável)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Processo */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Como Funciona o Processo?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Você envia sua solicitação</h3>
                  <p className="text-sm text-muted-foreground">
                    Envie um e-mail para dpo@vittalis.com.br com sua solicitação ou dúvida
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Confirmação de recebimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Você receberá um e-mail confirmando que recebemos sua mensagem (em até 2 dias úteis)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Análise e verificação</h3>
                  <p className="text-sm text-muted-foreground">
                    Nosso DPO analisa sua solicitação e valida sua identidade
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Resposta completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Você recebe uma resposta detalhada em até 15 dias úteis (podendo ser prorrogado por mais 15 dias 
                    em casos complexos, com justificativa)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ANPD */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Autoridade Nacional de Proteção de Dados (ANPD)</CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90">
            <p className="text-muted-foreground mb-3">
              Se você não ficar satisfeito com a resposta do nosso DPO, você também pode entrar em contato 
              diretamente com a Autoridade Nacional de Proteção de Dados (ANPD):
            </p>
            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <p className="font-semibold">ANPD - Autoridade Nacional de Proteção de Dados</p>
              <p className="text-sm text-muted-foreground">
                Site: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.gov.br/anpd</a>
              </p>
              <p className="text-sm text-muted-foreground">
                Telefone: 0800 979 7123
              </p>
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
