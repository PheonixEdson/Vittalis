-- Create apac_historico table for storing APAC form submissions
CREATE TABLE IF NOT EXISTS public.apac_historico (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medico_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Basic information
  tipo_apac text NOT NULL CHECK (tipo_apac IN ('laudo', 'dados_complementares')),
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado', 'em_analise')),
  
  -- Form data stored as JSONB for flexibility
  dados_formulario jsonb NOT NULL DEFAULT '{}'::jsonb,
  
  -- Metadata
  data_preenchimento timestamp with time zone NOT NULL DEFAULT now(),
  data_impressao timestamp with time zone,
  observacoes text,
  
  -- Audit fields
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.apac_historico ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Patients can view their own APACs
CREATE POLICY "Pacientes podem ver suas próprias APACs"
  ON public.apac_historico
  FOR SELECT
  USING (auth.uid() = paciente_id);

-- Doctors can view APACs they created
CREATE POLICY "Médicos podem ver APACs que criaram"
  ON public.apac_historico
  FOR SELECT
  USING (auth.uid() = medico_id);

-- Admins and healthcare staff can view all APACs
CREATE POLICY "Staff autorizado pode ver todas APACs"
  ON public.apac_historico
  FOR SELECT
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'medico'::app_role, 'enfermeiro'::app_role])
  );

-- Doctors can insert APACs
CREATE POLICY "Médicos podem inserir APACs"
  ON public.apac_historico
  FOR INSERT
  WITH CHECK (
    public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'medico'::app_role])
  );

-- Doctors can update their own APACs, admins can update all
CREATE POLICY "Médicos podem atualizar suas APACs"
  ON public.apac_historico
  FOR UPDATE
  USING (
    auth.uid() = medico_id OR 
    public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Only admins can delete APACs
CREATE POLICY "Apenas admin pode deletar APACs"
  ON public.apac_historico
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for better performance
CREATE INDEX idx_apac_historico_paciente_id ON public.apac_historico(paciente_id);
CREATE INDEX idx_apac_historico_medico_id ON public.apac_historico(medico_id);
CREATE INDEX idx_apac_historico_tipo_apac ON public.apac_historico(tipo_apac);
CREATE INDEX idx_apac_historico_status ON public.apac_historico(status);
CREATE INDEX idx_apac_historico_data_preenchimento ON public.apac_historico(data_preenchimento DESC);
CREATE INDEX idx_apac_historico_dados_formulario ON public.apac_historico USING GIN(dados_formulario);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_apac_historico_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_apac_historico_updated_at
  BEFORE UPDATE ON public.apac_historico
  FOR EACH ROW
  EXECUTE FUNCTION public.update_apac_historico_updated_at();