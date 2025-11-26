import { format } from "date-fns";

type APACPrintTemplateProps = {
  apac: any;
  laudoData: any;
  dadosComplementares: any;
};

export const APACPrintTemplate = ({ apac, laudoData, dadosComplementares }: APACPrintTemplateProps) => {
  return (
    <div className="hidden print:block print:text-black print:bg-white p-8 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold">AUTORIZAÇÃO DE PROCEDIMENTO DE ALTA COMPLEXIDADE - APAC</h1>
        <p className="text-sm mt-2">Ministério da Saúde</p>
      </div>

      {/* IDENTIFICAÇÃO DO ESTABELECIMENTO */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">IDENTIFICAÇÃO DO ESTABELECIMENTO SOLICITANTE</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-600">Nome do Estabelecimento:</p>
            <p className="text-sm">{laudoData?.nomeEstabelecimento || laudoData?.estabelecimento_solicitante || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">CNES:</p>
            <p className="text-sm">{laudoData?.cnes || laudoData?.cnes_solicitante || '-'}</p>
          </div>
        </div>
      </section>

      {/* IDENTIFICAÇÃO DO PACIENTE */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">IDENTIFICAÇÃO DO PACIENTE</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-600">Nome do Paciente:</p>
            <p className="text-sm">{laudoData?.nomePaciente || laudoData?.nome_paciente || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Nº Prontuário:</p>
            <p className="text-sm">{laudoData?.prontuario || laudoData?.numero_prontuario || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">CNS:</p>
            <p className="text-sm">{laudoData?.cns || laudoData?.cns_paciente || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Data de Nascimento:</p>
            <p className="text-sm">
              {laudoData?.dataNascimento || laudoData?.data_nascimento 
                ? format(new Date(laudoData?.dataNascimento || laudoData?.data_nascimento), 'dd/MM/yyyy') 
                : '-'}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Sexo:</p>
            <p className="text-sm">{laudoData?.sexo === 'M' ? 'Masculino' : laudoData?.sexo === 'F' ? 'Feminino' : '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Raça/Cor:</p>
            <p className="text-sm">{laudoData?.racaCor || laudoData?.raca_cor || '-'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-semibold text-gray-600">Nome da Mãe:</p>
            <p className="text-sm">{laudoData?.nomeMae || laudoData?.nome_mae || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Telefone:</p>
            <p className="text-sm">({laudoData?.dddContato || laudoData?.ddd_paciente || '-'}) {laudoData?.telefoneContato || laudoData?.telefone_paciente || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Nome do Responsável:</p>
            <p className="text-sm">{laudoData?.nomeResponsavel || laudoData?.nome_responsavel || '-'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-semibold text-gray-600">Endereço:</p>
            <p className="text-sm">{laudoData?.endereco || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Município:</p>
            <p className="text-sm">{laudoData?.municipio || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">UF:</p>
            <p className="text-sm">{laudoData?.uf || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">CEP:</p>
            <p className="text-sm">{laudoData?.cep || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Código IBGE:</p>
            <p className="text-sm">{laudoData?.codIbge || laudoData?.codigo_ibge || '-'}</p>
          </div>
        </div>
      </section>

      {/* PROCEDIMENTOS SOLICITADOS */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">PROCEDIMENTOS SOLICITADOS</h2>
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Procedimento Principal:</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-xs text-gray-600">Código: </span>
              {laudoData?.codigoProcedimento1 || laudoData?.codigo_procedimento_principal || '-'}
            </div>
            <div>
              <span className="text-xs text-gray-600">Nome: </span>
              {laudoData?.nomeProcedimento1 || laudoData?.nome_procedimento_principal || '-'}
            </div>
            <div>
              <span className="text-xs text-gray-600">Quantidade: </span>
              {laudoData?.qtde1 || laudoData?.qtde_procedimento_principal || '-'}
            </div>
          </div>
        </div>
        {(laudoData?.codigoProcedimento2 || laudoData?.codigoProcedimento3 || laudoData?.codigoProcedimento4) && (
          <div>
            <p className="text-sm font-semibold mb-2">Procedimentos Secundários:</p>
            {[2, 3, 4].map((index) => {
              const hasData = laudoData?.[`codigoProcedimento${index}`] || laudoData?.[`codigo_procedimento_secundario_${index - 1}`];
              if (!hasData) return null;
              return (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm mb-2">
                  <div>
                    <span className="text-xs text-gray-600">Código: </span>
                    {laudoData?.[`codigoProcedimento${index}`] || laudoData?.[`codigo_procedimento_secundario_${index - 1}`] || '-'}
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Nome: </span>
                    {laudoData?.[`nomeProcedimento${index}`] || laudoData?.[`nome_procedimento_secundario_${index - 1}`] || '-'}
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Quantidade: </span>
                    {laudoData?.[`qtde${index}`] || laudoData?.[`qtde_procedimento_secundario_${index - 1}`] || '-'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* TIPO DE TRATAMENTO SIGTAP */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">TIPO DE TRATAMENTO (TABELA SIGTAP)</h2>
        <p className="text-sm">{laudoData?.tipoTratamentoSigtap || dadosComplementares?.tipoTratamentoSigtap || '-'}</p>
      </section>

      {/* DIAGNÓSTICO */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">DIAGNÓSTICO</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-600">Descrição do Diagnóstico:</p>
            <p className="text-sm">{laudoData?.descricaoDiagnostico || laudoData?.descricao_diagnostico || '-'}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-600">CID-10 Principal:</p>
              <p className="text-sm">{laudoData?.cid10Principal || laudoData?.cid10_principal || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">CID-10 Secundário:</p>
              <p className="text-sm">{laudoData?.cid10Secundario || laudoData?.cid10_secundario || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">CID-10 Causas Associadas:</p>
              <p className="text-sm">{laudoData?.cid10CausasAssociadas || laudoData?.cid10_causas_associadas || '-'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ANAMNESE E EXAME FÍSICO */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">RESUMO DA ANAMNESE E EXAME FÍSICO</h2>
        <p className="text-sm whitespace-pre-wrap">{laudoData?.resumoAnamnese || laudoData?.resumo_anamnese || '-'}</p>
      </section>

      {/* EXAMES COMPLEMENTARES */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">EXAMES COMPLEMENTARES REALIZADOS</h2>
        <p className="text-sm whitespace-pre-wrap">{laudoData?.examesComplementares || laudoData?.exames_complementares || '-'}</p>
      </section>

      {/* JUSTIFICATIVA */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">JUSTIFICATIVA DO PROCEDIMENTO</h2>
        <p className="text-sm whitespace-pre-wrap">{laudoData?.justificativaProcedimento || laudoData?.justificativa_procedimento || '-'}</p>
      </section>

      {/* SOLICITAÇÃO */}
      <section className="border border-black p-4">
        <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">SOLICITAÇÃO</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-600">Nome do Profissional Solicitante:</p>
            <p className="text-sm">{laudoData?.nomeProfissionalSolicitante || laudoData?.nome_profissional_solicitante || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Documento (CNS/CPF):</p>
            <p className="text-sm">{laudoData?.documentoProfissionalSolicitante || laudoData?.documento_profissional_solicitante || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600">Data da Solicitação:</p>
            <p className="text-sm">
              {laudoData?.dataSolicitacao || laudoData?.data_solicitacao 
                ? format(new Date(laudoData?.dataSolicitacao || laudoData?.data_solicitacao), 'dd/MM/yyyy') 
                : '-'}
            </p>
          </div>
        </div>
      </section>

      {/* AUTORIZAÇÃO */}
      {(laudoData?.nomeProfissionalAutorizador || laudoData?.nome_profissional_autorizador) && (
        <section className="border border-black p-4">
          <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">AUTORIZAÇÃO</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-600">Nome do Profissional Autorizador:</p>
              <p className="text-sm">{laudoData?.nomeProfissionalAutorizador || laudoData?.nome_profissional_autorizador || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Documento (CNS/CPF):</p>
              <p className="text-sm">{laudoData?.documentoProfissionalAutorizador || laudoData?.documento_profissional_autorizador || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Data da Autorização:</p>
              <p className="text-sm">
                {laudoData?.dataAutorizacao || laudoData?.data_autorizacao 
                  ? format(new Date(laudoData?.dataAutorizacao || laudoData?.data_autorizacao), 'dd/MM/yyyy') 
                  : '-'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ESTABELECIMENTO EXECUTOR */}
      {(laudoData?.nomeEstabelecimentoExecutor || laudoData?.nome_estabelecimento_executor) && (
        <section className="border border-black p-4">
          <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">IDENTIFICAÇÃO DO ESTABELECIMENTO EXECUTOR</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-600">Nome do Estabelecimento:</p>
              <p className="text-sm">{laudoData?.nomeEstabelecimentoExecutor || laudoData?.nome_estabelecimento_executor || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">CNES:</p>
              <p className="text-sm">{laudoData?.cnesExecutor || laudoData?.cnes_executor || '-'}</p>
            </div>
          </div>
        </section>
      )}

      {/* DADOS COMPLEMENTARES - ONCOLOGIA */}
      {dadosComplementares && Object.keys(dadosComplementares).length > 0 && (
        <>
          <div className="page-break mt-8 pt-8 border-t-4 border-black"></div>
          
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-2xl font-bold">DADOS COMPLEMENTARES - ONCOLOGIA</h1>
          </div>

          {/* DIAGNÓSTICO ONCOLÓGICO */}
          <section className="border border-black p-4">
            <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">DIAGNÓSTICO ONCOLÓGICO</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-600">CID-10 Topografia:</p>
                <p className="text-sm">{dadosComplementares?.cid10Topografia || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Localização do Tumor:</p>
                <p className="text-sm">{dadosComplementares?.localizacaoTumor || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Diagnóstico Citohistopatológico:</p>
                <p className="text-sm">{dadosComplementares?.diagnosticoCitoHistopatologico || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Data do Diagnóstico:</p>
                <p className="text-sm">
                  {dadosComplementares?.dataDiagnostico 
                    ? format(new Date(dadosComplementares.dataDiagnostico), 'dd/MM/yyyy') 
                    : '-'}
                </p>
              </div>
            </div>
          </section>

          {/* ESTADIAMENTO */}
          {(dadosComplementares?.estadiamentoT || dadosComplementares?.estadiamentoN || dadosComplementares?.estadiamentoM) && (
            <section className="border border-black p-4">
              <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">ESTADIAMENTO TNM</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-600">Tumor (T):</p>
                  <p className="text-sm">{dadosComplementares?.estadiamentoT || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600">Linfonodos (N):</p>
                  <p className="text-sm">{dadosComplementares?.estadiamentoN || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600">Metástase (M):</p>
                  <p className="text-sm">{dadosComplementares?.estadiamentoM || '-'}</p>
                </div>
              </div>
            </section>
          )}

          {/* TRATAMENTO */}
          <section className="border border-black p-4">
            <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">INFORMAÇÕES DO TRATAMENTO</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-600">Finalidade do Tratamento:</p>
                <p className="text-sm">{dadosComplementares?.finalidadeTratamento || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Tipo de Atendimento:</p>
                <p className="text-sm">{dadosComplementares?.tipoAtendimento || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600">Turno:</p>
                <p className="text-sm">{dadosComplementares?.turno || '-'}</p>
              </div>
            </div>
          </section>

          {/* OBSERVAÇÕES */}
          {dadosComplementares?.observacoes && (
            <section className="border border-black p-4">
              <h2 className="text-lg font-bold mb-3 bg-gray-100 -m-4 p-2 mb-4">OBSERVAÇÕES GERAIS</h2>
              <p className="text-sm whitespace-pre-wrap">{dadosComplementares.observacoes}</p>
            </section>
          )}
        </>
      )}

      {/* RODAPÉ COM ASSINATURAS */}
      <div className="mt-12 pt-8 space-y-12">
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="border-t border-black pt-2">
              <p className="text-sm font-semibold">Assinatura do Médico Solicitante</p>
              <p className="text-xs text-gray-600 mt-1">{laudoData?.nomeProfissionalSolicitante || laudoData?.nome_profissional_solicitante || ''}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-black pt-2">
              <p className="text-sm font-semibold">Data</p>
              <p className="text-xs text-gray-600 mt-1">
                {laudoData?.dataSolicitacao || laudoData?.data_solicitacao 
                  ? format(new Date(laudoData?.dataSolicitacao || laudoData?.data_solicitacao), 'dd/MM/yyyy') 
                  : '____/____/________'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
