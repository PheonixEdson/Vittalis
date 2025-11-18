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
import { laudoAPACSchema } from "@/lib/validations";

type LaudoAPACFormData = z.infer<typeof laudoAPACSchema>;

export const LaudoAPACForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LaudoAPACFormData>({
    resolver: zodResolver(laudoAPACSchema),
    defaultValues: {
      tipoDocumentoSolicitante: "CNS",
      tipoDocumentoAutorizador: "CNS",
    },
  });

  const onSubmit = (data: LaudoAPACFormData) => {
    window.print();
    toast({
      title: "Imprimindo documento",
      description: "O laudo APAC está sendo preparado para impressão.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-2xl font-bold">Laudo Médico para Procedimentos de Alta Complexidade - APAC</h2>
        <Button type="submit">
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>
      </div>

      <div className="print:text-sm">
        {/* Identificação do Estabelecimento */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Identificação do Estabelecimento de Saúde (Solicitante)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomeEstabelecimento">Nome do Estabelecimento *</Label>
              <Input
                id="nomeEstabelecimento"
                {...register("nomeEstabelecimento")}
                className="print:border-none print:p-0"
              />
              {errors.nomeEstabelecimento && (
                <p className="text-sm text-destructive mt-1">{errors.nomeEstabelecimento.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cnes">CNES *</Label>
              <Input
                id="cnes"
                {...register("cnes")}
                className="print:border-none print:p-0"
              />
              {errors.cnes && (
                <p className="text-sm text-destructive mt-1">{errors.cnes.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Identificação do Paciente */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Identificação do Paciente</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomePaciente">Nome Completo *</Label>
              <Input
                id="nomePaciente"
                {...register("nomePaciente")}
                className="print:border-none print:p-0"
              />
              {errors.nomePaciente && (
                <p className="text-sm text-destructive mt-1">{errors.nomePaciente.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="prontuario">Nº Prontuário *</Label>
              <Input
                id="prontuario"
                {...register("prontuario")}
                className="print:border-none print:p-0"
              />
              {errors.prontuario && (
                <p className="text-sm text-destructive mt-1">{errors.prontuario.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cns">Nº CNS *</Label>
              <Input
                id="cns"
                {...register("cns")}
                maxLength={15}
                className="print:border-none print:p-0"
              />
              {errors.cns && (
                <p className="text-sm text-destructive mt-1">{errors.cns.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
              <Input
                id="dataNascimento"
                type="date"
                {...register("dataNascimento")}
                className="print:border-none print:p-0"
              />
              {errors.dataNascimento && (
                <p className="text-sm text-destructive mt-1">{errors.dataNascimento.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="sexo">Sexo *</Label>
              <select
                id="sexo"
                {...register("sexo")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              {errors.sexo && (
                <p className="text-sm text-destructive mt-1">{errors.sexo.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="raca">Raça/Cor *</Label>
              <select
                id="raca"
                {...register("raca")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="">Selecione</option>
                <option value="BRANCA">Branca</option>
                <option value="PRETA">Preta</option>
                <option value="PARDA">Parda</option>
                <option value="AMARELA">Amarela</option>
                <option value="INDIGENA">Indígena</option>
              </select>
              {errors.raca && (
                <p className="text-sm text-destructive mt-1">{errors.raca.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="nomeMae">Nome da Mãe *</Label>
              <Input
                id="nomeMae"
                {...register("nomeMae")}
                className="print:border-none print:p-0"
              />
              {errors.nomeMae && (
                <p className="text-sm text-destructive mt-1">{errors.nomeMae.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="dddContato">DDD *</Label>
              <Input
                id="dddContato"
                {...register("dddContato")}
                maxLength={2}
                className="print:border-none print:p-0"
              />
              {errors.dddContato && (
                <p className="text-sm text-destructive mt-1">{errors.dddContato.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="telefoneContato">Telefone de Contato *</Label>
              <Input
                id="telefoneContato"
                {...register("telefoneContato")}
                maxLength={9}
                className="print:border-none print:p-0"
              />
              {errors.telefoneContato && (
                <p className="text-sm text-destructive mt-1">{errors.telefoneContato.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="nomeResponsavel">Nome do Responsável (se menor de idade)</Label>
              <Input
                id="nomeResponsavel"
                {...register("nomeResponsavel")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="dddResponsavel">DDD Responsável</Label>
              <Input
                id="dddResponsavel"
                {...register("dddResponsavel")}
                maxLength={2}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="telefoneResponsavel">Telefone Responsável</Label>
              <Input
                id="telefoneResponsavel"
                {...register("telefoneResponsavel")}
                maxLength={9}
                className="print:border-none print:p-0"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="endereco">Endereço Completo *</Label>
              <Input
                id="endereco"
                {...register("endereco")}
                className="print:border-none print:p-0"
              />
              {errors.endereco && (
                <p className="text-sm text-destructive mt-1">{errors.endereco.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="municipio">Município *</Label>
              <Input
                id="municipio"
                {...register("municipio")}
                className="print:border-none print:p-0"
              />
              {errors.municipio && (
                <p className="text-sm text-destructive mt-1">{errors.municipio.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="codigoIbge">Código IBGE *</Label>
              <Input
                id="codigoIbge"
                {...register("codigoIbge")}
                maxLength={7}
                className="print:border-none print:p-0"
              />
              {errors.codigoIbge && (
                <p className="text-sm text-destructive mt-1">{errors.codigoIbge.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="uf">UF *</Label>
              <Input
                id="uf"
                {...register("uf")}
                maxLength={2}
                className="print:border-none print:p-0"
              />
              {errors.uf && (
                <p className="text-sm text-destructive mt-1">{errors.uf.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cep">CEP *</Label>
              <Input
                id="cep"
                {...register("cep")}
                maxLength={8}
                className="print:border-none print:p-0"
              />
              {errors.cep && (
                <p className="text-sm text-destructive mt-1">{errors.cep.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Procedimento Solicitado */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Procedimento Solicitado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="codigoProcedimento1">Código *</Label>
                <Input
                  id="codigoProcedimento1"
                  {...register("codigoProcedimento1")}
                  className="print:border-none print:p-0"
                />
                {errors.codigoProcedimento1 && (
                  <p className="text-sm text-destructive mt-1">{errors.codigoProcedimento1.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="nomeProcedimento1">Nome do Procedimento *</Label>
                <Input
                  id="nomeProcedimento1"
                  {...register("nomeProcedimento1")}
                  className="print:border-none print:p-0"
                />
                {errors.nomeProcedimento1 && (
                  <p className="text-sm text-destructive mt-1">{errors.nomeProcedimento1.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="qtde1">Quantidade *</Label>
                <Input
                  id="qtde1"
                  {...register("qtde1")}
                  className="print:border-none print:p-0"
                />
                {errors.qtde1 && (
                  <p className="text-sm text-destructive mt-1">{errors.qtde1.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="codigoProcedimento2">Código</Label>
                <Input
                  id="codigoProcedimento2"
                  {...register("codigoProcedimento2")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="nomeProcedimento2">Nome do Procedimento</Label>
                <Input
                  id="nomeProcedimento2"
                  {...register("nomeProcedimento2")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="qtde2">Quantidade</Label>
                <Input
                  id="qtde2"
                  {...register("qtde2")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="codigoProcedimento3">Código</Label>
                <Input
                  id="codigoProcedimento3"
                  {...register("codigoProcedimento3")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="nomeProcedimento3">Nome do Procedimento</Label>
                <Input
                  id="nomeProcedimento3"
                  {...register("nomeProcedimento3")}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="qtde3">Quantidade</Label>
                <Input
                  id="qtde3"
                  {...register("qtde3")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Justificativa */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Justificativa da Solicitação</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="descricaoDiagnostico">Descrição do Diagnóstico *</Label>
              <Textarea
                id="descricaoDiagnostico"
                {...register("descricaoDiagnostico")}
                rows={4}
                maxLength={2000}
                className="print:border-none print:p-0"
              />
              {errors.descricaoDiagnostico && (
                <p className="text-sm text-destructive mt-1">{errors.descricaoDiagnostico.message}</p>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="cid10Principal">CID-10 Principal *</Label>
                <Input
                  id="cid10Principal"
                  {...register("cid10Principal")}
                  maxLength={10}
                  className="print:border-none print:p-0"
                />
                {errors.cid10Principal && (
                  <p className="text-sm text-destructive mt-1">{errors.cid10Principal.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cid10Secundario">CID-10 Secundário</Label>
                <Input
                  id="cid10Secundario"
                  {...register("cid10Secundario")}
                  maxLength={10}
                  className="print:border-none print:p-0"
                />
              </div>
              <div>
                <Label htmlFor="cid10Associadas">CID-10 Causas Associadas</Label>
                <Input
                  id="cid10Associadas"
                  {...register("cid10Associadas")}
                  className="print:border-none print:p-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Clínico */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Resumo Clínico</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="resumoAnamnese">Resumo da Anamnese *</Label>
              <Textarea
                id="resumoAnamnese"
                {...register("resumoAnamnese")}
                rows={4}
                maxLength={2000}
                className="print:border-none print:p-0"
              />
              {errors.resumoAnamnese && (
                <p className="text-sm text-destructive mt-1">{errors.resumoAnamnese.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="examesComplementares">Exames Complementares Realizados *</Label>
              <Textarea
                id="examesComplementares"
                {...register("examesComplementares")}
                rows={4}
                maxLength={2000}
                className="print:border-none print:p-0"
              />
              {errors.examesComplementares && (
                <p className="text-sm text-destructive mt-1">{errors.examesComplementares.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="justificativaProcedimento">Justificativa do Procedimento *</Label>
              <Textarea
                id="justificativaProcedimento"
                {...register("justificativaProcedimento")}
                rows={4}
                maxLength={2000}
                className="print:border-none print:p-0"
              />
              {errors.justificativaProcedimento && (
                <p className="text-sm text-destructive mt-1">{errors.justificativaProcedimento.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Solicitação */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Dados do Profissional Solicitante</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomeProfissionalSolicitante">Nome do Profissional *</Label>
              <Input
                id="nomeProfissionalSolicitante"
                {...register("nomeProfissionalSolicitante")}
                className="print:border-none print:p-0"
              />
              {errors.nomeProfissionalSolicitante && (
                <p className="text-sm text-destructive mt-1">{errors.nomeProfissionalSolicitante.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="tipoDocumentoSolicitante">Tipo de Documento *</Label>
              <select
                id="tipoDocumentoSolicitante"
                {...register("tipoDocumentoSolicitante")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="CNS">CNS</option>
                <option value="CPF">CPF</option>
              </select>
            </div>
            <div>
              <Label htmlFor="numeroDocumentoSolicitante">Número do Documento *</Label>
              <Input
                id="numeroDocumentoSolicitante"
                {...register("numeroDocumentoSolicitante")}
                className="print:border-none print:p-0"
              />
              {errors.numeroDocumentoSolicitante && (
                <p className="text-sm text-destructive mt-1">{errors.numeroDocumentoSolicitante.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="dataSolicitacao">Data da Solicitação *</Label>
              <Input
                id="dataSolicitacao"
                type="date"
                {...register("dataSolicitacao")}
                className="print:border-none print:p-0"
              />
              {errors.dataSolicitacao && (
                <p className="text-sm text-destructive mt-1">{errors.dataSolicitacao.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Autorização */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Dados do Profissional Autorizador (preenchimento pela gestão)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomeProfissionalAutorizador">Nome do Profissional</Label>
              <Input
                id="nomeProfissionalAutorizador"
                {...register("nomeProfissionalAutorizador")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="codOrgaoEmissor">Código do Órgão Emissor</Label>
              <Input
                id="codOrgaoEmissor"
                {...register("codOrgaoEmissor")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="numeroAutorizacao">Número da Autorização</Label>
              <Input
                id="numeroAutorizacao"
                {...register("numeroAutorizacao")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="tipoDocumentoAutorizador">Tipo de Documento</Label>
              <select
                id="tipoDocumentoAutorizador"
                {...register("tipoDocumentoAutorizador")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background print:border-none print:p-0"
              >
                <option value="CNS">CNS</option>
                <option value="CPF">CPF</option>
              </select>
            </div>
            <div>
              <Label htmlFor="numeroDocumentoAutorizador">Número do Documento</Label>
              <Input
                id="numeroDocumentoAutorizador"
                {...register("numeroDocumentoAutorizador")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="dataAutorizacao">Data da Autorização</Label>
              <Input
                id="dataAutorizacao"
                type="date"
                {...register("dataAutorizacao")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="periodoValidade">Período de Validade (meses)</Label>
              <Input
                id="periodoValidade"
                {...register("periodoValidade")}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Estabelecimento Executante */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Identificação do Estabelecimento Executante (se diferente do solicitante)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="nomeEstabelecimentoExecutante">Nome do Estabelecimento</Label>
              <Input
                id="nomeEstabelecimentoExecutante"
                {...register("nomeEstabelecimentoExecutante")}
                className="print:border-none print:p-0"
              />
            </div>
            <div>
              <Label htmlFor="cnesExecutante">CNES</Label>
              <Input
                id="cnesExecutante"
                {...register("cnesExecutante")}
                className="print:border-none print:p-0"
              />
            </div>
          </CardContent>
        </Card>

        <div className="print:hidden text-sm text-muted-foreground">
          * Campos obrigatórios
        </div>
      </div>
    </form>
  );
};
