import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import logoVittalis from "@/assets/logo-vittalis.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroEstoquisaSchema } from "@/lib/validations";
import { z } from "zod";

type CadastroEstoquistaForm = z.infer<typeof cadastroEstoquisaSchema>;

const CadastroEstoquista = () => {
  const navigate = useNavigate();
  const [certificado, setCertificado] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroEstoquistaForm>({
    resolver: zodResolver(cadastroEstoquisaSchema),
  });

  const onSubmit = (data: CadastroEstoquistaForm) => {
    console.log("Dados validados:", data);
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Você será redirecionado para a área do estoquista.",
    });
    
    setTimeout(() => {
      navigate("/estoquista");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificado(file);
    }
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
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Button>
        </div>
      </header>

      {/* Formulário de Cadastro */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Package className="h-8 w-8 text-accent" />
                </div>
              </div>
              <CardTitle className="text-2xl">Cadastro de Estoquista</CardTitle>
              <CardDescription>
                Preencha seus dados para acessar a área de estoque
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      placeholder="Digite seu nome completo"
                      {...register("nome")}
                      className={errors.nome ? "border-destructive" : ""}
                    />
                    {errors.nome && (
                      <p className="text-sm text-destructive">{errors.nome.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      {...register("cpf")}
                      className={errors.cpf ? "border-destructive" : ""}
                    />
                    {errors.cpf && (
                      <p className="text-sm text-destructive">{errors.cpf.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      placeholder="(00) 00000-0000"
                      {...register("telefone")}
                      className={errors.telefone ? "border-destructive" : ""}
                    />
                    {errors.telefone && (
                      <p className="text-sm text-destructive">{errors.telefone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      {...register("dataNascimento")}
                      className={errors.dataNascimento ? "border-destructive" : ""}
                    />
                    {errors.dataNascimento && (
                      <p className="text-sm text-destructive">{errors.dataNascimento.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crf">Registro Profissional</Label>
                    <Input
                      id="crf"
                      placeholder="Digite seu número de registro"
                      {...register("crf")}
                      className={errors.crf ? "border-destructive" : ""}
                    />
                    {errors.crf && (
                      <p className="text-sm text-destructive">{errors.crf.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo *</Label>
                  <Input
                    id="endereco"
                    placeholder="Rua, número, bairro, cidade - UF"
                    {...register("endereco")}
                    className={errors.endereco ? "border-destructive" : ""}
                  />
                  {errors.endereco && (
                    <p className="text-sm text-destructive">{errors.endereco.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificado">Certificado de Qualificação (Opcional)</Label>
                  <Input
                    id="certificado"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Aceitos: PDF, JPG, PNG (máx. 5MB)
                  </p>
                </div>

                {/* Aviso LGPD */}
                <div className="bg-muted/50 p-4 rounded-md border border-border text-sm space-y-2">
                  <p className="text-foreground font-semibold">Proteção de Dados Profissionais (LGPD):</p>
                  <p className="text-muted-foreground">
                    Ao cadastrar-se como estoquista, seus dados e registros profissionais serão tratados 
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
                    , comprometendo-me a respeitar as normas de proteção de dados e segurança da informação.
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Cadastrar e Acessar Área de Estoque
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CadastroEstoquista;
