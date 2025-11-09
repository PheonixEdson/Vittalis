import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ClipboardList, Pill, BarChart3, Users, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoVittalis from "@/assets/logo-vittalis.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoVittalis} alt="Vittalis Logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Vittalis</h1>
              <p className="text-xs text-muted-foreground">Sistema Público de Oncologia</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/paciente")}>
              Acesso Paciente
            </Button>
            <Button onClick={() => navigate("/medico")}>
              Acesso Profissional
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
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
      <section className="container mx-auto px-4 py-16">
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

      {/* Professional Section */}
      <section className="bg-muted/50 py-16">
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
      <section className="container mx-auto px-4 py-16">
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
    </div>
  );
};

export default Index;
