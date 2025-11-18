import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload } from "lucide-react";
import logoVittalis from "@/assets/logo-vittalis.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroMedicoSchema } from "@/lib/validations";
import { z } from "zod";

type CadastroMedicoForm = z.infer<typeof cadastroMedicoSchema>;

const CadastroMedico = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [certidaoFile, setCertidaoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroMedicoForm>({
    resolver: zodResolver(cadastroMedicoSchema),
  });

  const onSubmit = (data: CadastroMedicoForm) => {
    console.log("Dados validados:", data);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="numeroCRM">Número do CRM</Label>
                <Input
                  id="numeroCRM"
                  {...register("numeroCRM")}
                />
                {errors.numeroCRM && (
                  <p className="text-sm text-destructive">{errors.numeroCRM.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  {...register("cpf")}
                />
                {errors.cpf && (
                  <p className="text-sm text-destructive">{errors.cpf.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeCompleto">Nome Completo</Label>
                <Input
                  id="nomeCompleto"
                  {...register("nomeCompleto")}
                />
                {errors.nomeCompleto && (
                  <p className="text-sm text-destructive">{errors.nomeCompleto.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Número de Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 98888-8888"
                  {...register("telefone")}
                />
                {errors.telefone && (
                  <p className="text-sm text-destructive">{errors.telefone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  {...register("endereco")}
                />
                {errors.endereco && (
                  <p className="text-sm text-destructive">{errors.endereco.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  {...register("dataNascimento")}
                />
                {errors.dataNascimento && (
                  <p className="text-sm text-destructive">{errors.dataNascimento.message}</p>
                )}
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

              {/* Aviso LGPD */}
              <div className="bg-muted/50 p-4 rounded-md border border-border text-sm space-y-2">
                <p className="text-foreground font-semibold">Proteção de Dados Profissionais (LGPD):</p>
                <p className="text-muted-foreground">
                  Ao cadastrar-se como profissional de saúde, seus dados e registros profissionais serão tratados 
                  para gestão do sistema e cumprimento de obrigações legais.
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
                  </button>
                  , comprometendo-me a respeitar o sigilo médico e as normas de proteção de dados de saúde dos pacientes.
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

export default CadastroMedico;
