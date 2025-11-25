import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LaudoAPACForm } from "./LaudoAPACForm";
import { DadosComplementaresForm } from "./DadosComplementaresForm";
import { CamposObrigatoriosAPAC } from "./CamposObrigatoriosAPAC";

export const APACFormWrapper = () => {
  const [laudoData, setLaudoData] = useState<any>({});
  const [dadosComplementaresData, setDadosComplementaresData] = useState<any>({});

  const validateAllForms = () => {
    const requiredLaudoFields = {
      nomePaciente: "Nome do Paciente",
      cns: "Cartão Nacional de Saúde",
      dataNascimento: "Data de Nascimento",
      sexo: "Sexo",
      descricaoDiagnostico: "Descrição do Diagnóstico",
      cid10Principal: "CID-10 Principal",
      nomeProfissionalSolicitante: "Nome do Profissional Solicitante",
      dataSolicitacao: "Data da Solicitação"
    };

    const requiredDadosFields = {
      cid10Topografia: "CID-10 Topografia",
      localizacaoTumor: "Localização do Tumor",
      diagnosticoCitoHistopatologico: "Diagnóstico Citohistopatológico",
      dataDiagnostico: "Data do Diagnóstico"
    };

    const missingFields: string[] = [];

    Object.entries(requiredLaudoFields).forEach(([field, label]) => {
      if (!laudoData[field]) {
        missingFields.push(`${label} (Laudo Médico)`);
      }
    });

    Object.entries(requiredDadosFields).forEach(([field, label]) => {
      if (!dadosComplementaresData[field]) {
        missingFields.push(`${label} (Dados Complementares)`);
      }
    });

    return missingFields;
  };

  const handleEnviarAdministrativo = async () => {
    const missingFields = validateAllForms();
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios não preenchidos",
        description: `Por favor, preencha os seguintes campos: ${missingFields.slice(0, 5).join(", ")}${missingFields.length > 5 ? ` e mais ${missingFields.length - 5} campos...` : ""}`,
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast({
          title: "Erro de Autenticação",
          description: "Por favor, faça login novamente para continuar.",
          variant: "destructive"
        });
        return;
      }

      // Verificar se o usuário tem a role necessária
      const { data: userRole, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .in('role', ['medico', 'admin'])
        .single();

      if (roleError || !userRole) {
        toast({
          title: "Permissão Negada",
          description: "Você não tem permissão para enviar APACs. Entre em contato com o administrador.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('apac_historico')
        .insert({
          paciente_id: user.id, // Temporariamente usando user.id - ajustar para ID real do paciente
          medico_id: user.id,
          tipo_apac: 'completo',
          categoria_procedimento: 'oncologia',
          status: 'pendente',
          dados_formulario: {
            laudo: laudoData,
            dadosComplementares: dadosComplementaresData
          },
          data_preenchimento: new Date().toISOString()
        });

      if (error) {
        console.error('Erro ao inserir APAC:', error);
        throw error;
      }

      toast({
        title: "APAC enviada com sucesso!",
        description: "A APAC foi enviada para o setor administrativo.",
      });

      setLaudoData({});
      setDadosComplementaresData({});

    } catch (error: any) {
      console.error('Erro ao enviar APAC:', error);
      toast({
        title: "Erro ao enviar APAC",
        description: error.message || "Ocorreu um erro ao enviar a APAC. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  const missingFieldsCount = validateAllForms().length;

  return (
    <div className="space-y-4">
      {missingFieldsCount > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>{missingFieldsCount} campos obrigatórios</strong> precisam ser preenchidos antes de imprimir ou enviar.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2 justify-end print:hidden">
        <Button onClick={handleEnviarAdministrativo} className="gap-2">
          <Send className="h-4 w-4" />
          Enviar para Administrativo
        </Button>
      </div>

      <Tabs defaultValue="campos-obrigatorios" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campos-obrigatorios">
            Campos Obrigatórios
          </TabsTrigger>
          <TabsTrigger value="laudo">
            Laudo Médico APAC
            {laudoData && Object.keys(laudoData).length > 0 && (
              <span className="ml-2 text-xs text-green-600">●</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="complementares">
            Dados Complementares
            {dadosComplementaresData && Object.keys(dadosComplementaresData).length > 0 && (
              <span className="ml-2 text-xs text-green-600">●</span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campos-obrigatorios" className="mt-6">
          <CamposObrigatoriosAPAC 
            laudoData={laudoData} 
            dadosComplementaresData={dadosComplementaresData}
            setLaudoData={setLaudoData}
            setDadosComplementaresData={setDadosComplementaresData}
          />
        </TabsContent>

        <TabsContent value="laudo" className="mt-6">
          <LaudoAPACForm formData={laudoData} setFormData={setLaudoData} />
        </TabsContent>

        <TabsContent value="complementares" className="mt-6">
          <DadosComplementaresForm formData={dadosComplementaresData} setFormData={setDadosComplementaresData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
