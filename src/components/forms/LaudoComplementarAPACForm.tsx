import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Printer } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { laudoComplementarAPACSchema } from "@/lib/validations";

type LaudoComplementarAPACFormData = z.infer<typeof laudoComplementarAPACSchema>;

export const LaudoComplementarAPACForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LaudoComplementarAPACFormData>({
    resolver: zodResolver(laudoComplementarAPACSchema),
    defaultValues: {
      quimioAnterior: "NAO",
      quimioContinuidade: "NAO",
      radioAnterior: "NAO",
      radioContinuidade: "NAO",
      tipoAtendimento: "PRIMEIRO",
      inscritoCNCDO: "NAO",
      antiHIV: "NEGATIVO",
    },
  });

  const onSubmit = (data: LaudoComplementarAPACFormData) => {
    window.print();
    toast({
      title: "Imprimindo documento",
      description: "O laudo complementar APAC está sendo preparado para impressão.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-2xl font-bold">APAC - Dados Complementares</h2>
        <Button type="submit">
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
                {...register("localizacaoTumor")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="cid10Topografia">CID-10 Topografia</Label>
              <Input
                id="cid10Topografia"
                {...register("cid10Topografia")}
                maxLength={10}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="linfonodosInvadidos">Linfonodos Invadidos</Label>
              <Input
                id="linfonodosInvadidos"
                {...register("linfonodosInvadidos")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="localizacaoMetastase">Localização da Metástase</Label>
              <Input
                id="localizacaoMetastase"
                {...register("localizacaoMetastase")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="estadioUICC">Estadiamento UICC (TNM)</Label>
              <Input
                id="estadioUICC"
                {...register("estadioUICC")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="estadioOutro">Outro Estadiamento</Label>
              <Input
                id="estadioOutro"
                {...register("estadioOutro")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="grauHistopatologico">Grau Histopatológico</Label>
              <Input
                id="grauHistopatologico"
                {...register("grauHistopatologico")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="dataHistopatologico">Data do Diagnóstico Histopatológico</Label>
              <Input
                id="dataHistopatologico"
                type="date"
                {...register("dataHistopatologico")}
                className="print:border-none print:p-0"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="diagnosticoHistopatologico">Diagnóstico Histopatológico</Label>
              <Textarea
                id="diagnosticoHistopatologico"
                {...register("diagnosticoHistopatologico")}
                rows={3}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quimioterapia - Tratamentos Anteriores */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>2 - QUIMIOTERAPIA - Tratamentos Anteriores</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="quimioAnterior">Realizou Quimioterapia Anteriormente?</Label>
              <select
                id="quimioAnterior"
                {...register("quimioAnterior")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="NAO">Não</option>
                <option value="SIM">Sim</option>
              </select>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="quimioTratamento1Desc">Descrição do Tratamento 1</Label>
                <Input
                  id="quimioTratamento1Desc"
                  {...register("quimioTratamento1Desc")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="quimioTratamento1Data">Data do Tratamento 1</Label>
                <Input
                  id="quimioTratamento1Data"
                  type="date"
                  {...register("quimioTratamento1Data")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="quimioTratamento2Desc">Descrição do Tratamento 2</Label>
                <Input
                  id="quimioTratamento2Desc"
                  {...register("quimioTratamento2Desc")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="quimioTratamento2Data">Data do Tratamento 2</Label>
                <Input
                  id="quimioTratamento2Data"
                  type="date"
                  {...register("quimioTratamento2Data")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="quimioTratamento3Desc">Descrição do Tratamento 3</Label>
                <Input
                  id="quimioTratamento3Desc"
                  {...register("quimioTratamento3Desc")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="quimioTratamento3Data">Data do Tratamento 3</Label>
                <Input
                  id="quimioTratamento3Data"
                  type="date"
                  {...register("quimioTratamento3Data")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quimioterapia - Tratamento Solicitado */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>QUIMIOTERAPIA - Tratamento Solicitado</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="quimioContinuidade">Continuidade do Tratamento?</Label>
              <select
                id="quimioContinuidade"
                {...register("quimioContinuidade")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="NAO">Não</option>
                <option value="SIM">Sim</option>
              </select>
            </div>
            <div>
              <Label htmlFor="quimioDataInicio">Data de Início</Label>
              <Input
                id="quimioDataInicio"
                type="date"
                {...register("quimioDataInicio")}
                className="print:border-none print:p-0"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="quimioEsquema">Esquema Terapêutico</Label>
              <Textarea
                id="quimioEsquema"
                {...register("quimioEsquema")}
                rows={3}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="quimioMesesPlanejados">Meses Planejados</Label>
              <Input
                id="quimioMesesPlanejados"
                {...register("quimioMesesPlanejados")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="quimioMesesAutorizados">Meses Autorizados</Label>
              <Input
                id="quimioMesesAutorizados"
                {...register("quimioMesesAutorizados")}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Radioterapia - Tratamentos Anteriores */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>3 - RADIOTERAPIA - Tratamentos Anteriores</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="radioAnterior">Realizou Radioterapia Anteriormente?</Label>
              <select
                id="radioAnterior"
                {...register("radioAnterior")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="NAO">Não</option>
                <option value="SIM">Sim</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="radioTratamento1Desc">Descrição do Tratamento 1</Label>
                <Input
                  id="radioTratamento1Desc"
                  {...register("radioTratamento1Desc")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="radioTratamento1Data">Data do Tratamento 1</Label>
                <Input
                  id="radioTratamento1Data"
                  type="date"
                  {...register("radioTratamento1Data")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="radioTratamento2Desc">Descrição do Tratamento 2</Label>
                <Input
                  id="radioTratamento2Desc"
                  {...register("radioTratamento2Desc")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="radioTratamento2Data">Data do Tratamento 2</Label>
                <Input
                  id="radioTratamento2Data"
                  type="date"
                  {...register("radioTratamento2Data")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="radioTratamento3Desc">Descrição do Tratamento 3</Label>
                <Input
                  id="radioTratamento3Desc"
                  {...register("radioTratamento3Desc")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="radioTratamento3Data">Data do Tratamento 3</Label>
                <Input
                  id="radioTratamento3Data"
                  type="date"
                  {...register("radioTratamento3Data")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Radioterapia - Tratamento Solicitado */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>RADIOTERAPIA - Tratamento Solicitado</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="radioContinuidade">Continuidade do Tratamento?</Label>
                <select
                  id="radioContinuidade"
                  {...register("radioContinuidade")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
                >
                  <option value="NAO">Não</option>
                  <option value="SIM">Sim</option>
                </select>
              </div>
              <div>
                <Label htmlFor="radioDataInicio">Data de Início</Label>
                <Input
                  id="radioDataInicio"
                  type="date"
                  {...register("radioDataInicio")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="radioFinalidade">Finalidade do Tratamento</Label>
              <Input
                id="radioFinalidade"
                {...register("radioFinalidade")}
                className="print:border-none print:p-0"
              />
            </div>

            {/* Campo de Irradiação 1 */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Campo de Irradiação 1</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="radioCid1">CID-10</Label>
                  <Input
                    id="radioCid1"
                    {...register("radioCid1")}
                    maxLength={10}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioAreaIrradiada1">Área a ser Irradiada</Label>
                  <Input
                    id="radioAreaIrradiada1"
                    {...register("radioAreaIrradiada1")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="radioDescricao1">Descrição do Campo</Label>
                  <Input
                    id="radioDescricao1"
                    {...register("radioDescricao1")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioCampos1">Número de Campos</Label>
                  <Input
                    id="radioCampos1"
                    {...register("radioCampos1")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioDataInicio1">Data de Início</Label>
                  <Input
                    id="radioDataInicio1"
                    type="date"
                    {...register("radioDataInicio1")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioDataTermino1">Data de Término</Label>
                  <Input
                    id="radioDataTermino1"
                    type="date"
                    {...register("radioDataTermino1")}
                    className="print:border-none print:p-0"
                  />
                </div>
              </div>
            </div>

            {/* Campo de Irradiação 2 */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Campo de Irradiação 2</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="radioCid2">CID-10</Label>
                  <Input
                    id="radioCid2"
                    {...register("radioCid2")}
                    maxLength={10}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioAreaIrradiada2">Área a ser Irradiada</Label>
                  <Input
                    id="radioAreaIrradiada2"
                    {...register("radioAreaIrradiada2")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="radioDescricao2">Descrição do Campo</Label>
                  <Input
                    id="radioDescricao2"
                    {...register("radioDescricao2")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioCampos2">Número de Campos</Label>
                  <Input
                    id="radioCampos2"
                    {...register("radioCampos2")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioDataInicio2">Data de Início</Label>
                  <Input
                    id="radioDataInicio2"
                    type="date"
                    {...register("radioDataInicio2")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioDataTermino2">Data de Término</Label>
                  <Input
                    id="radioDataTermino2"
                    type="date"
                    {...register("radioDataTermino2")}
                    className="print:border-none print:p-0"
                  />
                </div>
              </div>
            </div>

            {/* Campo de Irradiação 3 */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Campo de Irradiação 3</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="radioCid3">CID-10</Label>
                  <Input
                    id="radioCid3"
                    {...register("radioCid3")}
                    maxLength={10}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioAreaIrradiada3">Área a ser Irradiada</Label>
                  <Input
                    id="radioAreaIrradiada3"
                    {...register("radioAreaIrradiada3")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="radioDescricao3">Descrição do Campo</Label>
                  <Input
                    id="radioDescricao3"
                    {...register("radioDescricao3")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioCampos3">Número de Campos</Label>
                  <Input
                    id="radioCampos3"
                    {...register("radioCampos3")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioDataInicio3">Data de Início</Label>
                  <Input
                    id="radioDataInicio3"
                    type="date"
                    {...register("radioDataInicio3")}
                    className="print:border-none print:p-0"
                  />
                </div>
                <div>
                  <Label htmlFor="radioDataTermino3">Data de Término</Label>
                  <Input
                    id="radioDataTermino3"
                    type="date"
                    {...register("radioDataTermino3")}
                    className="print:border-none print:p-0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nefrologia */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>4 - NEFROLOGIA</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="tipoAtendimento">Tipo de Atendimento</Label>
              <select
                id="tipoAtendimento"
                {...register("tipoAtendimento")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="PRIMEIRO">Primeiro Atendimento</option>
                <option value="CONTINUIDADE">Continuidade</option>
              </select>
            </div>
            <div>
              <Label htmlFor="dataPrimeiraDialise">Data da Primeira Diálise</Label>
              <Input
                id="dataPrimeiraDialise"
                type="date"
                {...register("dataPrimeiraDialise")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="inscritoCNCDO">Inscrito na CNCDO?</Label>
              <select
                id="inscritoCNCDO"
                {...register("inscritoCNCDO")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="NAO">Não</option>
                <option value="SIM">Sim</option>
              </select>
            </div>
            <div>
              <Label htmlFor="antiHIV">Anti-HIV</Label>
              <select
                id="antiHIV"
                {...register("antiHIV")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="NEGATIVO">Negativo</option>
                <option value="POSITIVO">Positivo</option>
              </select>
            </div>
            <div>
              <Label htmlFor="hemoglobina">Hemoglobina (g/dL)</Label>
              <Input
                id="hemoglobina"
                {...register("hemoglobina")}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};
