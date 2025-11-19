import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import logoVittalis from "@/assets/logo-vittalis.png";

const CadastroAdministrador = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  required
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  required
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                />
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
