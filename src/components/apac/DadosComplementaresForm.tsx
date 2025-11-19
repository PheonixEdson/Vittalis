import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface DadosComplementaresFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const RequiredLabel = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <Label htmlFor={htmlFor} className="flex items-center gap-1">
    {children}
    <span className="text-destructive">*</span>
  </Label>
);

export const DadosComplementaresForm = ({ formData, setFormData }: DadosComplementaresFormProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold print:hidden">APAC - Dados Complementares</h2>

      <Card>
        <CardHeader>
          <CardTitle>1. ONCOLOGIA - Identificação Patológica do Caso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <RequiredLabel htmlFor="cid10Topografia">CID-10 Topografia</RequiredLabel>
              <Input
                id="cid10Topografia"
                value={formData.cid10Topografia}
                onChange={(e) => handleChange("cid10Topografia", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <RequiredLabel htmlFor="localizacaoTumor">Localização do Tumor Primário</RequiredLabel>
              <Input
                id="localizacaoTumor"
                value={formData.localizacaoTumor}
                onChange={(e) => handleChange("localizacaoTumor", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Linfonodos Regionais Invadidos</Label>
              <Select value={formData.linfonodosInvadidos} onValueChange={(value) => handleChange("linfonodosInvadidos", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIM">Sim</SelectItem>
                  <SelectItem value="NAO">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="localizacaoMetastase">Localização de Metástase(s)</Label>
              <Input
                id="localizacaoMetastase"
                value={formData.localizacaoMetastase}
                onChange={(e) => handleChange("localizacaoMetastase", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estadioUICC">Estádio (UICC)</Label>
              <Input
                id="estadioUICC"
                value={formData.estadioUICC}
                onChange={(e) => handleChange("estadioUICC", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estadioOutro">Estádio (Outro Sistema)</Label>
              <Input
                id="estadioOutro"
                value={formData.estadioOutro}
                onChange={(e) => handleChange("estadioOutro", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grauHistopatologico">Grau Histopatológico</Label>
              <Input
                id="grauHistopatologico"
                value={formData.grauHistopatologico}
                onChange={(e) => handleChange("grauHistopatologico", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <RequiredLabel htmlFor="diagnosticoCitoHistopatologico">Diagnóstico Cito/Histopatológico</RequiredLabel>
              <Input
                id="diagnosticoCitoHistopatologico"
                value={formData.diagnosticoCitoHistopatologico}
                onChange={(e) => handleChange("diagnosticoCitoHistopatologico", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <RequiredLabel htmlFor="dataDiagnostico">Data</RequiredLabel>
              <Input
                id="dataDiagnostico"
                type="date"
                value={formData.dataDiagnostico}
                onChange={(e) => handleChange("dataDiagnostico", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1.1 - QUIMIOTERAPIA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-4 block">Tratamento(s) Anterior(es)</Label>
            <div className="space-y-2 mb-4">
              <Label>Teve Tratamento Anterior?</Label>
              <Select value={formData.quimioTratamentoAnterior} onValueChange={(value) => handleChange("quimioTratamentoAnterior", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIM">Sim</SelectItem>
                  <SelectItem value="NAO">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.quimioTratamentoAnterior === "SIM" && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quimioDescricao1">1º Tratamento - Descrição</Label>
                    <Input
                      id="quimioDescricao1"
                      value={formData.quimioDescricao1}
                      onChange={(e) => handleChange("quimioDescricao1", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quimioDataInicio1">Data de Início</Label>
                    <Input
                      id="quimioDataInicio1"
                      type="date"
                      value={formData.quimioDataInicio1}
                      onChange={(e) => handleChange("quimioDataInicio1", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quimioDescricao2">2º Tratamento - Descrição</Label>
                    <Input
                      id="quimioDescricao2"
                      value={formData.quimioDescricao2}
                      onChange={(e) => handleChange("quimioDescricao2", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quimioDataInicio2">Data de Início</Label>
                    <Input
                      id="quimioDataInicio2"
                      type="date"
                      value={formData.quimioDataInicio2}
                      onChange={(e) => handleChange("quimioDataInicio2", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quimioDescricao3">3º Tratamento - Descrição</Label>
                    <Input
                      id="quimioDescricao3"
                      value={formData.quimioDescricao3}
                      onChange={(e) => handleChange("quimioDescricao3", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quimioDataInicio3">Data de Início</Label>
                    <Input
                      id="quimioDataInicio3"
                      type="date"
                      value={formData.quimioDataInicio3}
                      onChange={(e) => handleChange("quimioDataInicio3", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <Label className="text-base font-semibold mb-4 block">Tratamento Solicitado - Planejamento Terapêutico Global</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Continuidade de Tratamento</Label>
                <Select value={formData.quimioContinuidade} onValueChange={(value) => handleChange("quimioContinuidade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SIM">Sim</SelectItem>
                    <SelectItem value="NAO">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quimioDataInicioSolicitado">Data de Início do Tratamento</Label>
                <Input
                  id="quimioDataInicioSolicitado"
                  type="date"
                  value={formData.quimioDataInicioSolicitado}
                  onChange={(e) => handleChange("quimioDataInicioSolicitado", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="quimioEsquema">Esquema (Sigla ou Abreviatura)</Label>
                <Input
                  id="quimioEsquema"
                  value={formData.quimioEsquema}
                  onChange={(e) => handleChange("quimioEsquema", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quimioNumMesesPlanejados">Nº Total de Meses Planejados</Label>
                <Input
                  id="quimioNumMesesPlanejados"
                  type="number"
                  value={formData.quimioNumMesesPlanejados}
                  onChange={(e) => handleChange("quimioNumMesesPlanejados", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quimioNumMesesAutorizados">Nº de Meses Autorizados</Label>
                <Input
                  id="quimioNumMesesAutorizados"
                  type="number"
                  value={formData.quimioNumMesesAutorizados}
                  onChange={(e) => handleChange("quimioNumMesesAutorizados", e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1.2 - RADIOTERAPIA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-4 block">Tratamento(s) Anterior(es)</Label>
            <div className="space-y-2 mb-4">
              <Label>Teve Tratamento Anterior?</Label>
              <Select value={formData.radioTratamentoAnterior} onValueChange={(value) => handleChange("radioTratamentoAnterior", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIM">Sim</SelectItem>
                  <SelectItem value="NAO">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.radioTratamentoAnterior === "SIM" && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="radioDescricao1">1º Tratamento - Descrição</Label>
                    <Input
                      id="radioDescricao1"
                      value={formData.radioDescricao1}
                      onChange={(e) => handleChange("radioDescricao1", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="radioDataInicio1">Data de Início</Label>
                    <Input
                      id="radioDataInicio1"
                      type="date"
                      value={formData.radioDataInicio1}
                      onChange={(e) => handleChange("radioDataInicio1", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="radioDescricao2">2º Tratamento - Descrição</Label>
                    <Input
                      id="radioDescricao2"
                      value={formData.radioDescricao2}
                      onChange={(e) => handleChange("radioDescricao2", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="radioDataInicio2">Data de Início</Label>
                    <Input
                      id="radioDataInicio2"
                      type="date"
                      value={formData.radioDataInicio2}
                      onChange={(e) => handleChange("radioDataInicio2", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="radioDescricao3">3º Tratamento - Descrição</Label>
                    <Input
                      id="radioDescricao3"
                      value={formData.radioDescricao3}
                      onChange={(e) => handleChange("radioDescricao3", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="radioDataInicio3">Data de Início</Label>
                    <Input
                      id="radioDataInicio3"
                      type="date"
                      value={formData.radioDataInicio3}
                      onChange={(e) => handleChange("radioDataInicio3", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <Label className="text-base font-semibold mb-4 block">Tratamento Solicitado - Planejamento Terapêutico Global</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Continuidade de Tratamento</Label>
                <Select value={formData.radioContinuidade} onValueChange={(value) => handleChange("radioContinuidade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SIM">Sim</SelectItem>
                    <SelectItem value="NAO">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="radioDataInicioSolicitado">Data de Início do Tratamento</Label>
                <Input
                  id="radioDataInicioSolicitado"
                  type="date"
                  value={formData.radioDataInicioSolicitado}
                  onChange={(e) => handleChange("radioDataInicioSolicitado", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label>Finalidade</Label>
              <Select value={formData.radioFinalidade} onValueChange={(value) => handleChange("radioFinalidade", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RADICAL">Radical</SelectItem>
                  <SelectItem value="ADJUVANTE">Adjuvante</SelectItem>
                  <SelectItem value="ANTIALGICA">Antiálgica</SelectItem>
                  <SelectItem value="PALIATIVA">Paliativa</SelectItem>
                  <SelectItem value="PREVIA">Prévia</SelectItem>
                  <SelectItem value="ANTIHEMORRAGICA">Anti-hemorrágica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-t mt-6 pt-6">
              <Label className="text-base font-semibold mb-4 block">Áreas Irradiadas</Label>
              
              <div className="space-y-4 mb-6">
                <Label className="text-sm font-medium">Área 1</Label>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area1CidTopografico">CID Topográfico</Label>
                    <Input
                      id="area1CidTopografico"
                      value={formData.area1CidTopografico}
                      onChange={(e) => handleChange("area1CidTopografico", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area1Descricao">Descrição</Label>
                    <Input
                      id="area1Descricao"
                      value={formData.area1Descricao}
                      onChange={(e) => handleChange("area1Descricao", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area1NumCampos">Nº Campos</Label>
                    <Input
                      id="area1NumCampos"
                      type="number"
                      value={formData.area1NumCampos}
                      onChange={(e) => handleChange("area1NumCampos", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area1DataInicio">Data Início</Label>
                    <Input
                      id="area1DataInicio"
                      type="date"
                      value={formData.area1DataInicio}
                      onChange={(e) => handleChange("area1DataInicio", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area1DataTermino">Data Término</Label>
                    <Input
                      id="area1DataTermino"
                      type="date"
                      value={formData.area1DataTermino}
                      onChange={(e) => handleChange("area1DataTermino", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <Label className="text-sm font-medium">Área 2</Label>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area2CidTopografico">CID Topográfico</Label>
                    <Input
                      id="area2CidTopografico"
                      value={formData.area2CidTopografico}
                      onChange={(e) => handleChange("area2CidTopografico", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area2Descricao">Descrição</Label>
                    <Input
                      id="area2Descricao"
                      value={formData.area2Descricao}
                      onChange={(e) => handleChange("area2Descricao", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area2NumCampos">Nº Campos</Label>
                    <Input
                      id="area2NumCampos"
                      type="number"
                      value={formData.area2NumCampos}
                      onChange={(e) => handleChange("area2NumCampos", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area2DataInicio">Data Início</Label>
                    <Input
                      id="area2DataInicio"
                      type="date"
                      value={formData.area2DataInicio}
                      onChange={(e) => handleChange("area2DataInicio", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area2DataTermino">Data Término</Label>
                    <Input
                      id="area2DataTermino"
                      type="date"
                      value={formData.area2DataTermino}
                      onChange={(e) => handleChange("area2DataTermino", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Área 3</Label>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area3CidTopografico">CID Topográfico</Label>
                    <Input
                      id="area3CidTopografico"
                      value={formData.area3CidTopografico}
                      onChange={(e) => handleChange("area3CidTopografico", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area3Descricao">Descrição</Label>
                    <Input
                      id="area3Descricao"
                      value={formData.area3Descricao}
                      onChange={(e) => handleChange("area3Descricao", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area3NumCampos">Nº Campos</Label>
                    <Input
                      id="area3NumCampos"
                      type="number"
                      value={formData.area3NumCampos}
                      onChange={(e) => handleChange("area3NumCampos", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area3DataInicio">Data Início</Label>
                    <Input
                      id="area3DataInicio"
                      type="date"
                      value={formData.area3DataInicio}
                      onChange={(e) => handleChange("area3DataInicio", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area3DataTermino">Data Término</Label>
                    <Input
                      id="area3DataTermino"
                      type="date"
                      value={formData.area3DataTermino}
                      onChange={(e) => handleChange("area3DataTermino", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2 - NEFROLOGIA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Atendimento</Label>
              <Select value={formData.nefrologiaTipo} onValueChange={(value) => handleChange("nefrologiaTipo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRIMEIRO">Primeiro Atendimento</SelectItem>
                  <SelectItem value="SEGUIMENTO">Seguimento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataPrimeiraDialise">Data da 1ª Diálise Realizada</Label>
              <Input
                id="dataPrimeiraDialise"
                type="date"
                value={formData.dataPrimeiraDialise}
                onChange={(e) => handleChange("dataPrimeiraDialise", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tru">TRU</Label>
              <Input
                id="tru"
                value={formData.tru}
                onChange={(e) => handleChange("tru", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Inscrito na Lista da CNCDO</Label>
              <Select value={formData.inscritoCNCDO} onValueChange={(value) => handleChange("inscritoCNCDO", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIM">Sim</SelectItem>
                  <SelectItem value="NAO">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="altura">Altura (m)</Label>
              <Input
                id="altura"
                type="number"
                step="0.01"
                value={formData.altura}
                onChange={(e) => handleChange("altura", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hb">Hb (g%)</Label>
              <Input
                id="hb"
                value={formData.hb}
                onChange={(e) => handleChange("hb", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>HIV</Label>
              <Select value={formData.hiv} onValueChange={(value) => handleChange("hiv", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POSITIVO">Positivo</SelectItem>
                  <SelectItem value="NEGATIVO">Negativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Acesso Vascular</Label>
              <Select value={formData.acessoVascular} onValueChange={(value) => handleChange("acessoVascular", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIM">Sim</SelectItem>
                  <SelectItem value="NAO">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
