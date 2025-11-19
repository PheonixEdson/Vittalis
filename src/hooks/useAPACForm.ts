import { useState } from 'react';

export interface APACFormData {
  // Laudo Médico
  diagnostico?: string;
  cid10?: string;
  estadiamento?: string;
  linhaAtendimento?: string;
  indicacaoClinica?: string;
  
  // Dados Complementares
  peso?: string;
  altura?: string;
  superficieCorporal?: string;
  pressaoArterial?: string;
  frequenciaCardiaca?: string;
  temperatura?: string;
  estadoGeral?: string;
  condicaoFuncional?: string;
  dataInicio?: string;
  dataFim?: string;
  numeroSessoes?: string;
  intervaloSessoes?: string;
  observacoes?: string;
}

export const useAPACForm = () => {
  const [formData, setFormData] = useState<APACFormData>({});

  const updateField = (field: keyof APACFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateMultipleFields = (fields: Partial<APACFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...fields
    }));
  };

  const resetForm = () => {
    setFormData({});
  };

  const validateRequiredFields = (): { isValid: boolean; missingFields: string[] } => {
    const requiredFields: { key: keyof APACFormData; label: string }[] = [
      { key: 'diagnostico', label: 'Diagnóstico' },
      { key: 'cid10', label: 'CID-10' },
      { key: 'estadiamento', label: 'Estadiamento' },
      { key: 'indicacaoClinica', label: 'Indicação Clínica' },
      { key: 'peso', label: 'Peso' },
      { key: 'altura', label: 'Altura' },
      { key: 'superficieCorporal', label: 'Superfície Corporal' },
      { key: 'dataInicio', label: 'Data de Início' },
      { key: 'numeroSessoes', label: 'Número de Sessões' },
    ];

    const missingFields = requiredFields
      .filter(field => !formData[field.key])
      .map(field => field.label);

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  };

  return {
    formData,
    updateField,
    updateMultipleFields,
    resetForm,
    validateRequiredFields
  };
};
