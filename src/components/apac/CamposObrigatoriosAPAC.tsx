import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle } from "lucide-react";

interface CamposObrigatoriosAPACProps {
  laudoData: any;
  dadosComplementaresData: any;
  setLaudoData: (data: any) => void;
  setDadosComplementaresData: (data: any) => void;
}

export const CamposObrigatoriosAPAC = ({ 
  laudoData, 
  dadosComplementaresData,
  setLaudoData,
  setDadosComplementaresData 
}: CamposObrigatoriosAPACProps) => {
  const camposLaudo = [
    { key: "nomePaciente", label: "Nome do Paciente", type: "text" },
    { key: "cns", label: "Cartão Nacional de Saúde", type: "text" },
    { key: "dataNascimento", label: "Data de Nascimento", type: "date" },
    { key: "sexo", label: "Sexo", type: "select", options: ["Masculino", "Feminino"] },
    { key: "descricaoDiagnostico", label: "Descrição do Diagnóstico", type: "textarea" },
    { key: "cid10Principal", label: "CID-10 Principal", type: "text" },
    { key: "nomeProfissionalSolicitante", label: "Nome do Profissional Solicitante", type: "text" },
    { key: "dataSolicitacao", label: "Data da Solicitação", type: "date" }
  ];

  const camposDados = [
    { key: "cid10Topografia", label: "CID-10 Topografia", type: "text" },
    { key: "localizacaoTumor", label: "Localização do Tumor", type: "text" },
    { key: "diagnosticoCitoHistopatologico", label: "Diagnóstico Citohistopatológico", type: "textarea" },
    { key: "dataDiagnostico", label: "Data do Diagnóstico", type: "date" }
  ];

  const handleLaudoChange = (key: string, value: string) => {
    setLaudoData({ ...laudoData, [key]: value });
  };

  const handleDadosChange = (key: string, value: string) => {
    setDadosComplementaresData({ ...dadosComplementaresData, [key]: value });
  };

  const isCampoPreenchido = (data: any, key: string) => {
    return data[key] && data[key].toString().trim() !== "";
  };

  const totalCampos = camposLaudo.length + camposDados.length;
  const camposPreenchidos = 
    camposLaudo.filter(c => isCampoPreenchido(laudoData, c.key)).length +
    camposDados.filter(c => isCampoPreenchido(dadosComplementaresData, c.key)).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Status do Preenchimento</span>
            <span className={`text-lg ${camposPreenchidos === totalCampos ? 'text-green-600' : 'text-orange-600'}`}>
              {camposPreenchidos} de {totalCampos} campos preenchidos
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(camposPreenchidos / totalCampos) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Laudo Médico APAC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {camposLaudo.map((campo) => {
              const preenchido = isCampoPreenchido(laudoData, campo.key);
              return (
                <div key={campo.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    {preenchido ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                    )}
                    <Label htmlFor={`laudo-${campo.key}`} className="text-sm font-medium">
                      {campo.label} <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  
                  {campo.type === "select" ? (
                    <Select 
                      value={laudoData[campo.key] || ""} 
                      onValueChange={(value) => handleLaudoChange(campo.key, value)}
                    >
                      <SelectTrigger id={`laudo-${campo.key}`}>
                        <SelectValue placeholder={`Selecione ${campo.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {campo.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : campo.type === "textarea" ? (
                    <Textarea
                      id={`laudo-${campo.key}`}
                      value={laudoData[campo.key] || ""}
                      onChange={(e) => handleLaudoChange(campo.key, e.target.value)}
                      placeholder={`Digite ${campo.label.toLowerCase()}`}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={`laudo-${campo.key}`}
                      type={campo.type}
                      value={laudoData[campo.key] || ""}
                      onChange={(e) => handleLaudoChange(campo.key, e.target.value)}
                      placeholder={`Digite ${campo.label.toLowerCase()}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados Complementares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {camposDados.map((campo) => {
              const preenchido = isCampoPreenchido(dadosComplementaresData, campo.key);
              return (
                <div key={campo.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    {preenchido ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                    )}
                    <Label htmlFor={`dados-${campo.key}`} className="text-sm font-medium">
                      {campo.label} <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  
                  {campo.type === "textarea" ? (
                    <Textarea
                      id={`dados-${campo.key}`}
                      value={dadosComplementaresData[campo.key] || ""}
                      onChange={(e) => handleDadosChange(campo.key, e.target.value)}
                      placeholder={`Digite ${campo.label.toLowerCase()}`}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={`dados-${campo.key}`}
                      type={campo.type}
                      value={dadosComplementaresData[campo.key] || ""}
                      onChange={(e) => handleDadosChange(campo.key, e.target.value)}
                      placeholder={`Digite ${campo.label.toLowerCase()}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
