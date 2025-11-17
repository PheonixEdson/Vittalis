import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ClipboardList, Pill, BarChart3, Users, Clock, Shield, Package, LogOut, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import logoVittalis from "@/assets/logo-vittalis.png";

const Index = () => {
  const navigate = useNavigate();
  const { user, userRoles, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

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
            {user ? (
              <>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
                <Button onClick={() => navigate("/administrador")}>
                  Área Admin
                </Button>
                <Button onClick={() => navigate("/farmaceutico")}>
                  Área Farmacêutico
                </Button>
                <Button onClick={() => navigate("/estoquista")}>
                  Área Estoquista
                </Button>
                <Button onClick={() => navigate("/medico")}>
                  Área Médico
                </Button>
                <Button onClick={() => navigate("/enfermeiro")}>
                  Área Enfermeiro
                </Button>
                <Button onClick={() => navigate("/paciente")}>
                  Área Paciente
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                <Button onClick={() => navigate("/auth")}>
                  Criar Conta
                </Button>
              </>
            )}
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
                Dados protegidos com segurança de nível hospitalar e conformidade LGPD
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Professional Access */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Acesso para Profissionais</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas especializadas para cada área da equipe oncológica
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg cursor-pointer" onClick={() => navigate("/medico")}>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h4 className="font-semibold text-lg mb-2 text-center">Médicos</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Acesse prescrições, histórico de pacientes e protocolos terapêuticos
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cadastro-medico");
                  }}>
                    Cadastro de Médico
                  </Button>
                  <Button variant="default" size="sm" className="w-full">
                    Acessar Área Médica
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-all hover:shadow-lg cursor-pointer" onClick={() => navigate("/enfermeiro")}>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-secondary mb-4 mx-auto" />
                <h4 className="font-semibold text-lg mb-2 text-center">Enfermeiros</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Gestão de protocolos, monitoramento de pacientes e administração de infusões
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cadastro-enfermeiro");
                  }}>
                    Cadastro de Enfermeiro
                  </Button>
                  <Button variant="default" size="sm" className="w-full">
                    Acessar Área de Enfermagem
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg cursor-pointer" onClick={() => navigate("/farmaceutico")}>
              <CardContent className="pt-6">
                <Pill className="h-12 w-12 text-accent mb-4 mx-auto" />
                <h4 className="font-semibold text-lg mb-2 text-center">Farmacêuticos</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Catalogação completa e rastreabilidade de medicamentos
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cadastro-farmaceutico");
                  }}>
                    Cadastro de Farmacêutico
                  </Button>
                  <Button variant="default" size="sm" className="w-full">
                    Acessar Área Farmacêutica
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-success/20 hover:border-success/40 transition-all hover:shadow-lg cursor-pointer" onClick={() => navigate("/estoquista")}>
              <CardContent className="pt-6">
                <Package className="h-12 w-12 text-success mb-4 mx-auto" />
                <h4 className="font-semibold text-lg mb-2 text-center">Estoquista</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Fracionamento e controle de estoque de medicamentos
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cadastro-estoquista");
                  }}>
                    Cadastro de Estoquista
                  </Button>
                  <Button variant="default" size="sm" className="w-full">
                    Acessar Área do Estoque
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6">
                <BarChart3 className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h4 className="font-semibold text-lg mb-2 text-center">Administradores</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Gestão completa, relatórios e controle administrativo do sistema
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/cadastro-administrador")}>
                    Cadastrar como Administrador
                  </Button>
                  <Button className="w-full" onClick={() => navigate("/administrador")}>
                    Acessar Área Administrativa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-bold">Impacto do Vittalis</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">100%</p>
              <p className="text-muted-foreground">Digitalização de protocolos</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-secondary mb-2">48h</p>
              <p className="text-muted-foreground">Antecedência nas notificações</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-accent mb-2">24/7</p>
              <p className="text-muted-foreground">Acesso ao histórico médico</p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">
            Comprometidos em melhorar a qualidade do tratamento oncológico na rede pública de saúde
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logoVittalis} alt="Vittalis Logo" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-primary">Vittalis</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Sistema Público de Oncologia - Gestão Integrada de Tratamento
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
