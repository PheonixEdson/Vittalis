import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import logoVittalis from "@/assets/logo-vittalis.png";

const CadastroEstoquista = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    dataNascimento: "",
    crf: "",
    certificado: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      setFormData({ ...formData, certificado: file });
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      placeholder="Digite seu nome completo"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crf">Registro Profissional</Label>
                    <Input
                      id="crf"
                      placeholder="Digite seu número de registro"
                      value={formData.crf}
                      onChange={(e) => setFormData({ ...formData, crf: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo *</Label>
                  <Input
                    id="endereco"
                    placeholder="Rua, número, bairro, cidade - UF"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    required
                  />
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
