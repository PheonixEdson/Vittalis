import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Shield, Send, Info, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function DireitosTitular() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [tipoDireito, setTipoDireito] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !cpf || !tipoDireito || !descricao) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulação de envio
    setTimeout(() => {
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Você receberá uma resposta em até 15 dias úteis no e-mail fornecido.",
      });
      
      // Limpar formulário
      setNome('');
      setEmail('');
      setCpf('');
      setTipoDireito('');
      setDescricao('');
      setIsSubmitting(false);
    }, 1500);
  };

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
              <h1 className="text-2xl font-bold text-foreground">Exercício de Direitos do Titular</h1>
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
              <Info className="h-5 w-5" />
              Seus Direitos Garantidos pela LGPD
            </CardTitle>
            <CardDescription>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direitos sobre seus dados pessoais.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground/90">
            <p className="text-muted-foreground">
              Use este formulário para exercer qualquer um dos seguintes direitos:
            </p>
          </CardContent>
        </Card>

        {/* Direitos Explicados */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Confirmação e Acesso
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Saber se tratamos seus dados e obter uma cópia deles.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Correção
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Solicitar atualização de dados incompletos, inexatos ou desatualizados.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Anonimização ou Eliminação
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Requerer anonimização ou exclusão de dados desnecessários (respeitando obrigações legais).
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Portabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Solicitar transferência dos dados a outro prestador de serviços.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Revogação de Consentimento
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Retirar consentimento previamente fornecido para tratamento de dados.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Informação sobre Compartilhamento
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Saber com quais entidades públicas ou privadas compartilhamos seus dados.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Oposição ao Tratamento
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Opor-se ao tratamento realizado com base em legítimo interesse.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Revisão de Decisões Automatizadas
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Solicitar revisão humana de decisões tomadas exclusivamente por algoritmos.
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Formulário de Solicitação
            </CardTitle>
            <CardDescription>
              Preencha os dados abaixo. Responderemos em até 15 dias úteis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  A resposta será enviada para este e-mail
                </p>
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Necessário para identificação e validação da solicitação
                </p>
              </div>

              {/* Tipo de Direito */}
              <div className="space-y-2">
                <Label htmlFor="tipoDireito">Qual direito você deseja exercer? *</Label>
                <Select value={tipoDireito} onValueChange={setTipoDireito} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o direito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmacao-acesso">Confirmação e Acesso aos Meus Dados</SelectItem>
                    <SelectItem value="correcao">Correção de Dados</SelectItem>
                    <SelectItem value="anonimizacao-eliminacao">Anonimização ou Eliminação</SelectItem>
                    <SelectItem value="portabilidade">Portabilidade de Dados</SelectItem>
                    <SelectItem value="revogacao-consentimento">Revogação de Consentimento</SelectItem>
                    <SelectItem value="informacao-compartilhamento">Informação sobre Compartilhamento</SelectItem>
                    <SelectItem value="oposicao">Oposição ao Tratamento</SelectItem>
                    <SelectItem value="revisao-decisao">Revisão de Decisão Automatizada</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="descricao">Descreva sua solicitação *</Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Explique detalhadamente o que você deseja..."
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Seja o mais específico possível para agilizarmos sua solicitação
                </p>
              </div>

              {/* Aviso importante */}
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Importante:</strong> Alguns dados não podem ser excluídos devido a obrigações legais 
                  (ex: prontuários médicos devem ser mantidos por no mínimo 20 anos). Caso sua solicitação não 
                  possa ser atendida totalmente, explicaremos os motivos.
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Solicitação
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Contato DPO */}
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary">Contato Direto com o Encarregado (DPO)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Você também pode entrar em contato diretamente com nosso Encarregado de Proteção de Dados:
            </p>
            <div className="bg-muted/50 p-4 rounded-md border border-border">
              <p className="font-semibold">Encarregado de Proteção de Dados (DPO)</p>
              <p className="text-muted-foreground">
                E-mail: <a href="mailto:dpo@vittalis.com.br" className="text-primary hover:underline">dpo@vittalis.com.br</a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Prazo de resposta: até 15 dias úteis
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Links relacionados */}
        <div className="grid gap-4 md:grid-cols-2 mt-8">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/politica-privacidade')}
          >
            Ver Política de Privacidade
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/termos-uso')}
          >
            Ver Termos de Uso
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
