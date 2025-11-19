import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload } from "lucide-react";
import logoVittalis from "@/assets/logo-vittalis.png";

const CadastroMedico = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    numeroCRM: "",
    cpf: "",
    nomeCompleto: "",
    email: "",
    telefone: "",
    endereco: "",
    dataNascimento: "",
  });
  const [certidaoFile, setCertidaoFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Seu cadastro está sendo processado.",
    });
    navigate("/medico");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertidaoFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoVittalis} alt="Vittalis Logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Vittalis</h1>
              <p className="text-xs text-muted-foreground">Cadastro de Médico</p>
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
            <CardTitle>Cadastro de Médico</CardTitle>
            <CardDescription>
              Preencha todos os dados para realizar seu cadastro no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="numeroCRM">Número do CRM</Label>
                <Input
                  id="numeroCRM"
                  required
                  value={formData.numeroCRM}
                  onChange={(e) => setFormData({ ...formData, numeroCRM: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  required
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeCompleto">Nome Completo</Label>
                <Input
                  id="nomeCompleto"
                  required
                  value={formData.nomeCompleto}
                  onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                />
              </div>

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
                <Label htmlFor="telefone">Número de Telefone</Label>
                <Input
                  id="telefone"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  required
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  required
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certidao">Documento de Certificação (Carteirinha do CRM)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="certidao"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                    required
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {certidaoFile && (
                  <p className="text-sm text-muted-foreground">Arquivo selecionado: {certidaoFile.name}</p>
                )}
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

export default CadastroMedico;
