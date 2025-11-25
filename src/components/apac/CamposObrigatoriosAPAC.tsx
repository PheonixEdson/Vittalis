import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface CamposObrigatoriosAPACProps {
  laudoData: any;
  dadosComplementaresData: any;
}

export const CamposObrigatoriosAPAC = ({ laudoData, dadosComplementaresData }: CamposObrigatoriosAPACProps) => {
  const camposLaudo = [
    { key: "nomePaciente", label: "Nome do Paciente" },
    { key: "cns", label: "Cartão Nacional de Saúde" },
    { key: "dataNascimento", label: "Data de Nascimento" },
    { key: "sexo", label: "Sexo" },
    { key: "descricaoDiagnostico", label: "Descrição do Diagnóstico" },
    { key: "cid10Principal", label: "CID-10 Principal" },
    { key: "nomeProfissionalSolicitante", label: "Nome do Profissional Solicitante" },
    { key: "dataSolicitacao", label: "Data da Solicitação" }
  ];

  const camposDados = [
    { key: "cid10Topografia", label: "CID-10 Topografia" },
    { key: "localizacaoTumor", label: "Localização do Tumor" },
    { key: "diagnosticoCitoHistopatologico", label: "Diagnóstico Citohistopatológico" },
    { key: "dataDiagnostico", label: "Data do Diagnóstico" }
  ];

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
          <div className="space-y-2">
            {camposLaudo.map((campo) => {
              const preenchido = isCampoPreenchido(laudoData, campo.key);
              return (
                <div key={campo.key} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  {preenchido ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  )}
                  <span className={preenchido ? "text-foreground" : "text-muted-foreground"}>
                    {campo.label}
                  </span>
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
          <div className="space-y-2">
            {camposDados.map((campo) => {
              const preenchido = isCampoPreenchido(dadosComplementaresData, campo.key);
              return (
                <div key={campo.key} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  {preenchido ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  )}
                  <span className={preenchido ? "text-foreground" : "text-muted-foreground"}>
                    {campo.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
