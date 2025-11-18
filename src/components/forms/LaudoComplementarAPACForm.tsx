import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Printer } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const LaudoComplementarAPACForm = () => {
  const [formData, setFormData] = useState({
    // Oncologia - Identificação Patológica
    localizacaoTumor: "",
    cid10Topografia: "",
    linfonodosInvadidos: "",
    localizacaoMetastase: "",
    estadioUICC: "",
    estadioOutro: "",
    grauHistopatologico: "",
    diagnosticoHistopatologico: "",
    dataHistopatologico: "",
    
    // Quimioterapia - Tratamentos Anteriores
    quimioAnterior: "NAO",
    quimioTratamento1Desc: "",
    quimioTratamento1Data: "",
    quimioTratamento2Desc: "",
    quimioTratamento2Data: "",
    quimioTratamento3Desc: "",
    quimioTratamento3Data: "",
    
    // Quimioterapia - Tratamento Solicitado
    quimioContinuidade: "NAO",
    quimioDataInicio: "",
    quimioEsquema: "",
    quimioMesesPlanejados: "",
    quimioMesesAutorizados: "",
    
    // Radioterapia - Tratamentos Anteriores
    radioAnterior: "NAO",
    radioTratamento1Desc: "",
    radioTratamento1Data: "",
    radioTratamento2Desc: "",
    radioTratamento2Data: "",
    radioTratamento3Desc: "",
    radioTratamento3Data: "",
    
    // Radioterapia - Tratamento Solicitado
    radioContinuidade: "NAO",
    radioDataInicio: "",
    radioFinalidade: "",
    radioCid1: "",
    radioDescricao1: "",
    radioAreaIrradiada1: "",
    radioCampos1: "",
    radioDataInicio1: "",
    radioDataTermino1: "",
    radioCid2: "",
    radioDescricao2: "",
    radioAreaIrradiada2: "",
    radioCampos2: "",
    radioDataInicio2: "",
    radioDataTermino2: "",
    radioCid3: "",
    radioDescricao3: "",
    radioAreaIrradiada3: "",
    radioCampos3: "",
    radioDataInicio3: "",
    radioDataTermino3: "",
    
    // Nefrologia
    tipoAtendimento: "PRIMEIRO",
    dataPrimeiraDialise: "",
    inscritoCNCDO: "NAO",
    antiHIV: "NEGATIVO",
    hemoglobina: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Imprimindo documento",
      description: "O laudo complementar APAC está sendo preparado para impressão.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-2xl font-bold">APAC - Dados Complementares</h2>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>
      </div>

      <div className="print:text-sm">
        {/* Oncologia - Identificação Patológica */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>1 - ONCOLOGIA - Identificação Patológica do Caso</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="localizacaoTumor">Localização do Tumor Primário</Label>
              <Input
                id="localizacaoTumor"
                value={formData.localizacaoTumor}
                onChange={(e) => handleChange("localizacaoTumor", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="cid10Topografia">CID-10 Topografia</Label>
              <Input
                id="cid10Topografia"
                value={formData.cid10Topografia}
                onChange={(e) => handleChange("cid10Topografia", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label>Linfonodos Regionais Invadidos</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="SIM"
                    checked={formData.linfonodosInvadidos === "SIM"}
                    onChange={(e) => handleChange("linfonodosInvadidos", e.target.value)}
                  />
                  Sim
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="NAO"
                    checked={formData.linfonodosInvadidos === "NAO"}
                    onChange={(e) => handleChange("linfonodosInvadidos", e.target.value)}
                  />
                  Não
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="localizacaoMetastase">Localização de Metástase(s)</Label>
              <Input
                id="localizacaoMetastase"
                value={formData.localizacaoMetastase}
                onChange={(e) => handleChange("localizacaoMetastase", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="estadioUICC">Estádio (UICC)</Label>
              <Input
                id="estadioUICC"
                value={formData.estadioUICC}
                onChange={(e) => handleChange("estadioUICC", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="estadioOutro">Estádio (outro sistema)</Label>
              <Input
                id="estadioOutro"
                value={formData.estadioOutro}
                onChange={(e) => handleChange("estadioOutro", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="grauHistopatologico">Grau Histopatológico</Label>
              <Input
                id="grauHistopatologico"
                value={formData.grauHistopatologico}
                onChange={(e) => handleChange("grauHistopatologico", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="dataHistopatologico">Data</Label>
              <Input
                id="dataHistopatologico"
                type="date"
                value={formData.dataHistopatologico}
                onChange={(e) => handleChange("dataHistopatologico", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="diagnosticoHistopatologico">Diagnóstico Cito/Histopatológico</Label>
              <Textarea
                id="diagnosticoHistopatologico"
                value={formData.diagnosticoHistopatologico}
                onChange={(e) => handleChange("diagnosticoHistopatologico", e.target.value)}
                rows={2}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quimioterapia */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>1.1 - QUIMIOTERAPIA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tratamento(s) Anterior(es)</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="SIM"
                    checked={formData.quimioAnterior === "SIM"}
                    onChange={(e) => handleChange("quimioAnterior", e.target.value)}
                  />
                  Sim
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="NAO"
                    checked={formData.quimioAnterior === "NAO"}
                    onChange={(e) => handleChange("quimioAnterior", e.target.value)}
                  />
                  Não
                </label>
              </div>
            </div>

            {formData.quimioAnterior === "SIM" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>1º Tratamento - Descrição</Label>
                    <Input
                      value={formData.quimioTratamento1Desc}
                      onChange={(e) => handleChange("quimioTratamento1Desc", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Data de Início</Label>
                    <Input
                      type="date"
                      value={formData.quimioTratamento1Data}
                      onChange={(e) => handleChange("quimioTratamento1Data", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>2º Tratamento - Descrição</Label>
                    <Input
                      value={formData.quimioTratamento2Desc}
                      onChange={(e) => handleChange("quimioTratamento2Desc", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Data de Início</Label>
                    <Input
                      type="date"
                      value={formData.quimioTratamento2Data}
                      onChange={(e) => handleChange("quimioTratamento2Data", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>3º Tratamento - Descrição</Label>
                    <Input
                      value={formData.quimioTratamento3Desc}
                      onChange={(e) => handleChange("quimioTratamento3Desc", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Data de Início</Label>
                    <Input
                      type="date"
                      value={formData.quimioTratamento3Data}
                      onChange={(e) => handleChange("quimioTratamento3Data", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-4">Tratamento Solicitado - Planejamento Terapêutico Global</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Continuidade de Tratamento</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="SIM"
                        checked={formData.quimioContinuidade === "SIM"}
                        onChange={(e) => handleChange("quimioContinuidade", e.target.value)}
                      />
                      Sim
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="NAO"
                        checked={formData.quimioContinuidade === "NAO"}
                        onChange={(e) => handleChange("quimioContinuidade", e.target.value)}
                      />
                      Não
                    </label>
                  </div>
                </div>
                <div>
                  <Label>Data de Início do Tratamento Solicitado</Label>
                  <Input
                    type="date"
                    value={formData.quimioDataInicio}
                    onChange={(e) => handleChange("quimioDataInicio", e.target.value)}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label>ESQUEMA (Sigla ou abreviatura)</Label>
                  <Input
                    value={formData.quimioEsquema}
                    onChange={(e) => handleChange("quimioEsquema", e.target.value)}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label>Nº Total de Meses Planejados</Label>
                  <Input
                    type="number"
                    value={formData.quimioMesesPlanejados}
                    onChange={(e) => handleChange("quimioMesesPlanejados", e.target.value)}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label>Nº de Meses Autorizados</Label>
                  <Input
                    type="number"
                    value={formData.quimioMesesAutorizados}
                    onChange={(e) => handleChange("quimioMesesAutorizados", e.target.value)}
                    className="print:border-none print:p-0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Radioterapia */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>1.2 - RADIOTERAPIA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tratamento(s) Anterior(es)</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="SIM"
                    checked={formData.radioAnterior === "SIM"}
                    onChange={(e) => handleChange("radioAnterior", e.target.value)}
                  />
                  Sim
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="NAO"
                    checked={formData.radioAnterior === "NAO"}
                    onChange={(e) => handleChange("radioAnterior", e.target.value)}
                  />
                  Não
                </label>
              </div>
            </div>

            {formData.radioAnterior === "SIM" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>1º Tratamento - Descrição</Label>
                    <Input
                      value={formData.radioTratamento1Desc}
                      onChange={(e) => handleChange("radioTratamento1Desc", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Data de Início</Label>
                    <Input
                      type="date"
                      value={formData.radioTratamento1Data}
                      onChange={(e) => handleChange("radioTratamento1Data", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>2º Tratamento - Descrição</Label>
                    <Input
                      value={formData.radioTratamento2Desc}
                      onChange={(e) => handleChange("radioTratamento2Desc", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Data de Início</Label>
                    <Input
                      type="date"
                      value={formData.radioTratamento2Data}
                      onChange={(e) => handleChange("radioTratamento2Data", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>3º Tratamento - Descrição</Label>
                    <Input
                      value={formData.radioTratamento3Desc}
                      onChange={(e) => handleChange("radioTratamento3Desc", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Data de Início</Label>
                    <Input
                      type="date"
                      value={formData.radioTratamento3Data}
                      onChange={(e) => handleChange("radioTratamento3Data", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-4">Tratamento Solicitado - Planejamento Terapêutico Global</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Continuidade de Tratamento</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="SIM"
                        checked={formData.radioContinuidade === "SIM"}
                        onChange={(e) => handleChange("radioContinuidade", e.target.value)}
                      />
                      Sim
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="NAO"
                        checked={formData.radioContinuidade === "NAO"}
                        onChange={(e) => handleChange("radioContinuidade", e.target.value)}
                      />
                      Não
                    </label>
                  </div>
                </div>
                <div>
                  <Label>Data de Início do Tratamento Solicitado</Label>
                  <Input
                    type="date"
                    value={formData.radioDataInicio}
                    onChange={(e) => handleChange("radioDataInicio", e.target.value)}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Finalidade</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {["RADICAL", "ADJUVANTE", "ANTIÁLGICA", "PALIATIVA", "PRÉVIA", "ANTIHEMORRÁGICA"].map((finalidade) => (
                      <label key={finalidade} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={finalidade}
                          checked={formData.radioFinalidade === finalidade}
                          onChange={(e) => handleChange("radioFinalidade", e.target.value)}
                        />
                        {finalidade}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <h5 className="font-medium">Áreas Irradiadas</h5>
                <div className="grid gap-4 md:grid-cols-5">
                  <div>
                    <Label>CID Topográfico</Label>
                    <Input
                      value={formData.radioCid1}
                      onChange={(e) => handleChange("radioCid1", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Descrição/Área</Label>
                    <Input
                      value={formData.radioDescricao1}
                      onChange={(e) => handleChange("radioDescricao1", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Nº Campo/Inserções</Label>
                    <Input
                      value={formData.radioCampos1}
                      onChange={(e) => handleChange("radioCampos1", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Data Início</Label>
                    <Input
                      type="date"
                      value={formData.radioDataInicio1}
                      onChange={(e) => handleChange("radioDataInicio1", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Label>Data Término</Label>
                    <Input
                      type="date"
                      value={formData.radioDataTermino1}
                      onChange={(e) => handleChange("radioDataTermino1", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-5">
                  <div>
                    <Input
                      value={formData.radioCid2}
                      onChange={(e) => handleChange("radioCid2", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Input
                      value={formData.radioDescricao2}
                      onChange={(e) => handleChange("radioDescricao2", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Input
                      value={formData.radioCampos2}
                      onChange={(e) => handleChange("radioCampos2", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={formData.radioDataInicio2}
                      onChange={(e) => handleChange("radioDataInicio2", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={formData.radioDataTermino2}
                      onChange={(e) => handleChange("radioDataTermino2", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-5">
                  <div>
                    <Input
                      value={formData.radioCid3}
                      onChange={(e) => handleChange("radioCid3", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Input
                      value={formData.radioDescricao3}
                      onChange={(e) => handleChange("radioDescricao3", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Input
                      value={formData.radioCampos3}
                      onChange={(e) => handleChange("radioCampos3", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={formData.radioDataInicio3}
                      onChange={(e) => handleChange("radioDataInicio3", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={formData.radioDataTermino3}
                      onChange={(e) => handleChange("radioDataTermino3", e.target.value)}
                      className="print:border-none print:p-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nefrologia */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>2 - NEFROLOGIA</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Tipo de Atendimento</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="PRIMEIRO"
                    checked={formData.tipoAtendimento === "PRIMEIRO"}
                    onChange={(e) => handleChange("tipoAtendimento", e.target.value)}
                  />
                  Primeiro Atendimento
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="SEGUIMENTO"
                    checked={formData.tipoAtendimento === "SEGUIMENTO"}
                    onChange={(e) => handleChange("tipoAtendimento", e.target.value)}
                  />
                  Seguimento
                </label>
              </div>
            </div>
            <div>
              <Label>Data da 1ª Diálise Realizada</Label>
              <Input
                type="date"
                value={formData.dataPrimeiraDialise}
                onChange={(e) => handleChange("dataPrimeiraDialise", e.target.value)}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label>Inscrito na lista da CNCDO</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="SIM"
                    checked={formData.inscritoCNCDO === "SIM"}
                    onChange={(e) => handleChange("inscritoCNCDO", e.target.value)}
                  />
                  Sim
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="NAO"
                    checked={formData.inscritoCNCDO === "NAO"}
                    onChange={(e) => handleChange("inscritoCNCDO", e.target.value)}
                  />
                  Não
                </label>
              </div>
            </div>
            <div>
              <Label>Anti HIV</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="POSITIVO"
                    checked={formData.antiHIV === "POSITIVO"}
                    onChange={(e) => handleChange("antiHIV", e.target.value)}
                  />
                  Positivo
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="NEGATIVO"
                    checked={formData.antiHIV === "NEGATIVO"}
                    onChange={(e) => handleChange("antiHIV", e.target.value)}
                  />
                  Negativo
                </label>
              </div>
            </div>
            <div>
              <Label>Hemoglobina (g%)</Label>
              <Input
                value={formData.hemoglobina}
                onChange={(e) => handleChange("hemoglobina", e.target.value)}
                placeholder="Ex: 12.5"
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
