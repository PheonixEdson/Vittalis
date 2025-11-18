import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import logoVittalis from "@/assets/logo-vittalis.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroAdministradorSchema } from "@/lib/validations";
import { z } from "zod";

type CadastroAdministradorForm = z.infer<typeof cadastroAdministradorSchema>;

const CadastroAdministrador = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroAdministradorForm>({
    resolver: zodResolver(cadastroAdministradorSchema),
  });

  const onSubmit = (data: CadastroAdministradorForm) => {
    console.log("Dados validados:", data);
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Seu cadastro está sendo processado.",
    });
    navigate("/administrador");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoVittalis} alt="Vittalis Logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Vittalis</h1>
              <p className="text-xs text-muted-foreground">Cadastro de Administrador</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Cadastro de Administrador</CardTitle>
            <CardDescription>
              Crie suas credenciais de acesso ao sistema administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  {...register("senha")}
                  className={errors.senha ? "border-destructive" : ""}
                />
                {errors.senha && (
                  <p className="text-sm text-destructive">{errors.senha.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Deve conter maiúsculas, minúsculas, números e caracteres especiais
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  {...register("confirmarSenha")}
                  className={errors.confirmarSenha ? "border-destructive" : ""}
                />
                {errors.confirmarSenha && (
                  <p className="text-sm text-destructive">{errors.confirmarSenha.message}</p>
                )}
              </div>

              {/* Aviso LGPD */}
              <div className="bg-muted/50 p-4 rounded-md border border-border text-sm space-y-2">
                <p className="text-foreground font-semibold">Proteção de Dados (LGPD):</p>
                <p className="text-muted-foreground">
                  Ao cadastrar-se como administrador, seus dados serão tratados para gestão do sistema 
                  e cumprimento de obrigações legais. Como administrador, você terá acesso a dados sensíveis 
                  de saúde e se compromete a respeitar o sigilo e as normas de proteção de dados.
                </p>
                <p className="text-muted-foreground">
                  Declaro ter lido e concordado com a{' '}
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
              </div>

              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CadastroAdministrador;
