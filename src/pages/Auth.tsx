import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { Lock, Mail, User, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  confirmPassword: z.string(),
  nomeCompleto: z.string().trim().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  role: z.enum(['admin', 'farmaceutico', 'estoquista', 'medico', 'enfermeiro', 'paciente']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState<{ [key: string]: string }>({});

  // Signup state
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nomeCompleto: "",
    role: "paciente" as const,
  });
  const [signupErrors, setSignupErrors] = useState<{ [key: string]: string }>({});

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrors({});
    setIsSubmitting(true);

    try {
      const validacao = loginSchema.safeParse(loginData);
      
      if (!validacao.success) {
        const erros: { [key: string]: string } = {};
        validacao.error.errors.forEach((erro) => {
          if (erro.path[0]) {
            erros[erro.path[0].toString()] = erro.message;
          }
        });
        setLoginErrors(erros);
        return;
      }

      const { error } = await signIn(validacao.data.email, validacao.data.password);

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao sistema Vittalis.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erro inesperado",
        description: error.message || "Ocorreu um erro ao fazer login.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupErrors({});
    setIsSubmitting(true);

    try {
      const validacao = signupSchema.safeParse(signupData);
      
      if (!validacao.success) {
        const erros: { [key: string]: string } = {};
        validacao.error.errors.forEach((erro) => {
          if (erro.path[0]) {
            erros[erro.path[0].toString()] = erro.message;
          }
        });
        setSignupErrors(erros);
        return;
      }

      const { error } = await signUp(
        validacao.data.email,
        validacao.data.password,
        validacao.data.nomeCompleto,
        validacao.data.role
      );

      if (error) {
        toast({
          title: "Erro ao criar conta",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer login no sistema.",
      });

      // Limpar formulário
      setSignupData({
        email: "",
        password: "",
        confirmPassword: "",
        nomeCompleto: "",
        role: "paciente",
      });
    } catch (error: any) {
      toast({
        title: "Erro inesperado",
        description: error.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/src/assets/logo-vittalis.png" 
            alt="Vittalis" 
            className="h-16 mx-auto mb-4"
          />
          <CardTitle className="text-2xl">Sistema Vittalis</CardTitle>
          <CardDescription>
            Gestão hospitalar e controle de estoque farmacêutico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-sm text-destructive">{loginErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                  {loginErrors.password && (
                    <p className="text-sm text-destructive">{loginErrors.password}</p>
                  )}
                </div>

                {/* Aviso LGPD */}
                <div className="bg-muted/50 p-4 rounded-md border border-border text-sm">
                  <p className="text-muted-foreground mb-2">
                    <strong className="text-foreground">Proteção de Dados (LGPD):</strong>
                  </p>
                  <p className="text-muted-foreground mb-2">
                    Ao criar sua conta, você declara ter lido e concordado com nossa{' '}
                    <button 
                      type="button"
                      onClick={() => navigate('/politica-privacidade')}
                      className="text-primary hover:underline font-semibold"
                    >
                      Política de Privacidade
                    </button>
                    {' '}e{' '}
                    <button 
                      type="button"
                      onClick={() => navigate('/termos-uso')}
                      className="text-primary hover:underline font-semibold"
                    >
                      Termos de Uso
                    </button>.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Seus dados serão tratados conforme a Lei Geral de Proteção de Dados (LGPD) para fins de 
                    assistência à saúde, cumprimento de obrigações legais e gestão do sistema. Você pode exercer 
                    seus direitos a qualquer momento através do nosso{' '}
                    <button 
                      type="button"
                      onClick={() => navigate('/encarregado-dados')}
                      className="text-primary hover:underline"
                    >
                      DPO
                    </button>.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-nome">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-nome"
                      type="text"
                      placeholder="Seu nome completo"
                      value={signupData.nomeCompleto}
                      onChange={(e) => setSignupData({ ...signupData, nomeCompleto: e.target.value })}
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                  {signupErrors.nomeCompleto && (
                    <p className="text-sm text-destructive">{signupErrors.nomeCompleto}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                  {signupErrors.email && (
                    <p className="text-sm text-destructive">{signupErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-role">Função no Sistema</Label>
                  <Select
                    value={signupData.role}
                    onValueChange={(value: any) => setSignupData({ ...signupData, role: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="signup-role">
                      <SelectValue placeholder="Selecione sua função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="farmaceutico">Farmacêutico</SelectItem>
                      <SelectItem value="estoquista">Estoquista</SelectItem>
                      <SelectItem value="medico">Médico</SelectItem>
                      <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                      <SelectItem value="paciente">Paciente</SelectItem>
                    </SelectContent>
                  </Select>
                  {signupErrors.role && (
                    <p className="text-sm text-destructive">{signupErrors.role}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                  {signupErrors.password && (
                    <p className="text-sm text-destructive">{signupErrors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Digite a senha novamente"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                  {signupErrors.confirmPassword && (
                    <p className="text-sm text-destructive">{signupErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Aviso LGPD */}
                <div className="bg-muted/50 p-4 rounded-md border border-border text-sm space-y-2">
                  <p className="text-foreground font-semibold">Proteção de Dados (LGPD):</p>
                  <p className="text-muted-foreground">
                    Ao criar sua conta, você declara ter lido e concordado com nossa{' '}
                    <button 
                      type="button"
                      onClick={() => navigate('/politica-privacidade')}
                      className="text-primary hover:underline font-semibold"
                    >
                      Política de Privacidade
                    </button>
                    {' '}e{' '}
                    <button 
                      type="button"
                      onClick={() => navigate('/termos-uso')}
                      className="text-primary hover:underline font-semibold"
                    >
                      Termos de Uso
                    </button>.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Seus dados serão tratados conforme a Lei Geral de Proteção de Dados (LGPD) para fins de 
                    assistência à saúde, cumprimento de obrigações legais e gestão do sistema. Você pode exercer 
                    seus direitos a qualquer momento através do nosso{' '}
                    <button 
                      type="button"
                      onClick={() => navigate('/encarregado-dados')}
                      className="text-primary hover:underline"
                    >
                      DPO
                    </button>.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
