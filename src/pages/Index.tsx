import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ClipboardList, Pill, BarChart3, Users, Clock, Shield, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import logoVittalis from "@/assets/logo-vittalis.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const navigate = useNavigate();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = () => {
    if (password === "Vittalis é vida") {
      localStorage.setItem("vittalis_demo_unlocked", "true");
      toast({
        title: "Acesso liberado!",
        description: "Todas as funcionalidades foram desbloqueadas.",
      });
      setShowPasswordDialog(false);
      navigate("/paciente");
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, verifique a senha e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
              <img src={logoVittalis} alt="Vittalis Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-primary">Vittalis</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Sistema Público de Oncologia</p>
              </div>
            </div>
            
            {/* Desktop Navigation - Links Internos */}
            <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection("funcionalidades")}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                Funcionalidades
              </button>
              <button 
                onClick={() => scrollToSection("pacientes")}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                Pacientes
              </button>
              <button 
                onClick={() => scrollToSection("profissionais")}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                Profissionais
              </button>
              
              {/* Separador */}
              <div className="h-6 w-px bg-border"></div>
              
              {/* Botão de Acesso */}
              <Button size="sm" onClick={() => setShowPasswordDialog(true)} className="shadow-sm">
                Acessar Sistema
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" className="transition-all hover:scale-105">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[380px] overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-left">Menu de Navegação</SheetTitle>
                </SheetHeader>
                
                {/* Navegação Interna */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Navegação
                  </h3>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => scrollToSection("funcionalidades")}
                      className="text-left px-4 py-3 rounded-lg hover:bg-accent/50 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Funcionalidades
                    </button>
                    <button
                      onClick={() => scrollToSection("pacientes")}
                      className="text-left px-4 py-3 rounded-lg hover:bg-accent/50 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Área de Pacientes
                    </button>
                    <button
                      onClick={() => scrollToSection("profissionais")}
                      className="text-left px-4 py-3 rounded-lg hover:bg-accent/50 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Área de Profissionais
                    </button>
                  </div>
                </div>

                {/* Divisor */}
                <div className="border-t mb-6"></div>
                
                {/* Acesso Rápido */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Acesso ao Sistema
                  </h3>
                  <Button 
                    onClick={() => setShowPasswordDialog(true)}
                    className="w-full mb-4 shadow-sm"
                  >
                    Acessar Sistema
                  </Button>
                </div>

                {/* Divisor */}
                <div className="border-t mb-6"></div>
                
                {/* Cadastros */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Cadastro de Usuários
                  </h3>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/cadastro-paciente")}
                      className="justify-start"
                      size="sm"
                    >
                      Cadastro Paciente
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/cadastro-medico")}
                      className="justify-start"
                      size="sm"
                    >
                      Cadastro Médico
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/cadastro-enfermeiro")}
                      className="justify-start"
                      size="sm"
                    >
                      Cadastro Enfermeiro
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/cadastro-farmaceutico")}
                      className="justify-start"
                      size="sm"
                    >
                      Cadastro Farmacêutico
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/cadastro-administrador")}
                      className="justify-start"
                      size="sm"
                    >
                      Cadastro Admin
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-16 text-center scroll-mt-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <img src={logoVittalis} alt="Vittalis Logo" className="h-20 w-20 object-contain mx-auto" />
          <h2 className="text-5xl font-bold text-foreground">
            Vittalis
          </h2>
          <p className="text-xl text-muted-foreground">
            Plataforma dedicada ao suporte de pacientes oncológicos da rede pública de saúde
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Agende suas sessões de quimioterapia de forma rápida, acompanhe seu histórico completo 
            e receba notificações sobre suas infusões. Gestão integrada para pacientes e profissionais de saúde.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="container mx-auto px-4 py-16 scroll-mt-20">
        <h3 className="text-3xl font-bold text-center mb-12">Funcionalidades</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">Agendamento Rápido</h4>
              <p className="text-sm text-muted-foreground">
                Marque consultas, exames e sessões de quimioterapia de forma ágil e intuitiva
              </p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
            <CardContent className="pt-6">
              <ClipboardList className="h-12 w-12 text-secondary mb-4" />
              <h4 className="font-semibold text-lg mb-2">Histórico Completo</h4>
              <p className="text-sm text-muted-foreground">
                Acesse todo seu histórico médico, prescrições e resultados de exames
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-accent mb-4" />
              <h4 className="font-semibold text-lg mb-2">Notificações</h4>
              <p className="text-sm text-muted-foreground">
                Receba lembretes 48h antes das suas consultas e sessões de infusão
              </p>
            </CardContent>
          </Card>

          <Card className="border-success/20 hover:border-success/40 transition-colors">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-success mb-4" />
              <h4 className="font-semibold text-lg mb-2">Seguro e Confiável</h4>
              <p className="text-sm text-muted-foreground">
                Plataforma oficial da rede pública com segurança de dados garantida
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Patient Section */}
      <section id="pacientes" className="container mx-auto px-4 py-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Para Pacientes</h3>
          <Card className="border-primary/30 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <Users className="h-20 w-20 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="font-bold text-2xl">Área do Paciente</h4>
                  <p className="text-muted-foreground">
                    Acesse seu histórico médico completo, visualize agendamentos de quimioterapia, 
                    receba notificações sobre documentação APAC e acompanhe todo seu tratamento oncológico.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start gap-2">
                      <ClipboardList className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Histórico Médico</p>
                        <p className="text-xs text-muted-foreground">Consultas, exames e prescrições</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Agendamentos</p>
                        <p className="text-xs text-muted-foreground">Sessões e procedimentos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Notificações APAC</p>
                        <p className="text-xs text-muted-foreground">Alertas de documentação</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Dados Seguros</p>
                        <p className="text-xs text-muted-foreground">Privacidade garantida</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto" onClick={() => navigate("/paciente")}>
                    Acessar Área do Paciente
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Professional Section */}
      <section id="profissionais" className="bg-muted/50 py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Para Profissionais de Saúde</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold text-lg mb-2">Médicos</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Visualização completa de pacientes, calendário dinâmico e liberação para quimioterapia
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/medico")}>
                  Acessar Área Médica
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <ClipboardList className="h-12 w-12 text-secondary mb-4" />
                <h4 className="font-semibold text-lg mb-2">Enfermeiros</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Gerenciamento de prescrições, infusões e visualização em tempo real de ocupação
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/enfermeiro")}>
                  Acessar Área de Enfermagem
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Pill className="h-12 w-12 text-accent mb-4" />
                <h4 className="font-semibold text-lg mb-2">Farmacêuticos</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Catalogação completa, rastreabilidade de medicamentos e gestão de estoque
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/farmaceutico")}>
                  Acessar Área Farmacêutica
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6">
                <BarChart3 className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h4 className="font-semibold text-lg mb-2 text-center">Administradores</h4>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Dashboards analíticos, faturamento APAC e gestão econômica completa
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/administrador")}>
                  Acessar Área Administrativa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impacto" className="container mx-auto px-4 py-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-bold">Nosso Impacto</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="text-muted-foreground">Digital e Integrado</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-secondary">48h</p>
              <p className="text-muted-foreground">Notificação Antecipada</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-accent">24/7</p>
              <p className="text-muted-foreground">Acesso ao Histórico</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Reduzindo tempo de espera, melhorando a comunicação e garantindo 
            tratamento oncológico de qualidade para todos os brasileiros.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={logoVittalis} alt="Vittalis Logo" className="h-6 w-6 object-contain" />
              <span className="font-semibold">Vittalis</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Sistema de Gestão Oncológica da Rede Pública de Saúde
            </p>
          </div>
        </div>
      </footer>

      {/* Dialog de senha */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Acesso à Demonstração</DialogTitle>
            <DialogDescription>
              Digite a senha para desbloquear todas as funcionalidades do sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
              />
            </div>
            <Button className="w-full" onClick={handlePasswordSubmit}>
              Entrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
