import { format } from "date-fns";

type APACPrintTemplateProps = {
  apac: any;
  laudoData: any;
  dadosComplementares: any;
};

export const APACPrintTemplate = ({ apac, laudoData, dadosComplementares }: APACPrintTemplateProps) => {
  return (
    <div className="hidden print:block print:text-black print:bg-white">
      {/* Página 1 - Laudo Médico para Procedimentos em APAC */}
      <div className="page-break-after p-8">
        <div className="border-2 border-black">
          {/* Cabeçalho */}
          <div className="border-b-2 border-black p-4 bg-gray-100">
            <div className="text-center font-bold text-lg">
              LAUDO MÉDICO PARA PROCEDIMENTOS DE ALTA COMPLEXIDADE - APAC
            </div>
            <div className="text-center text-sm">Sistema Único de Saúde</div>
          </div>

          {/* Identificação do Estabelecimento Solicitante */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-2">IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (SOLICITANTE)</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <div className="text-xs font-semibold">1 - NOME DO ESTABELECIMENTO DE SAÚDE SOLICITANTE</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.estabelecimento_solicitante || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">2 - CNES</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.cnes_solicitante || ''}</div>
              </div>
            </div>
          </div>

          {/* Identificação do Paciente */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-2">IDENTIFICAÇÃO DO PACIENTE</div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <div className="text-xs font-semibold">3 - NOME DO PACIENTE</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.nome_paciente || ''}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold">4 - Nº DO PRONTUÁRIO</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.numero_prontuario || ''}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-2">
                  <div className="text-xs font-semibold">5 - CNS</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.cns_paciente || ''}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs font-semibold">6 - DATA DE NASCIMENTO</div>
                  <div className="border border-black p-1 min-h-[24px]">
                    {laudoData?.data_nascimento ? format(new Date(laudoData.data_nascimento), 'dd/MM/yyyy') : ''}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold">7 - SEXO</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.sexo || ''}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold">8 - RAÇA/COR</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.raca_cor || ''}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs font-semibold">9 - NOME DA MÃE</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.nome_mae || ''}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="col-span-3 text-xs font-semibold">10 - TELEFONE DE CONTATO</div>
                  <div className="border border-black p-1 min-h-[24px] text-center">{laudoData?.ddd_paciente || ''}</div>
                  <div className="col-span-2 border border-black p-1 min-h-[24px]">{laudoData?.telefone_paciente || ''}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs font-semibold">11 - NOME DO RESPONSÁVEL</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.nome_responsavel || ''}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="col-span-3 text-xs font-semibold">12 - TELEFONE DE CONTATO</div>
                  <div className="border border-black p-1 min-h-[24px] text-center">{laudoData?.ddd_responsavel || ''}</div>
                  <div className="col-span-2 border border-black p-1 min-h-[24px]">{laudoData?.telefone_responsavel || ''}</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold">13 - ENDEREÇO (RUA, Nº, BAIRRO)</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.endereco || ''}</div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-2">
                  <div className="text-xs font-semibold">14 - MUNICÍPIO DE RESIDÊNCIA</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.municipio || ''}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold">15 - CÓD. IBGE</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.codigo_ibge || ''}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold">16 - UF</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.uf || ''}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold">17 - CEP</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.cep || ''}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Procedimentos Solicitados */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-2">PROCEDIMENTO(S) SOLICITADO(S)</div>
            <div className="space-y-2">
              <div className="grid grid-cols-8 gap-1">
                <div className="col-span-2 text-xs font-semibold">CÓDIGO PROCEDIMENTO PRINCIPAL</div>
                <div className="col-span-5 text-xs font-semibold">NOME DO PROCEDIMENTO</div>
                <div className="text-xs font-semibold">QTDE</div>
                <div className="col-span-2 border border-black p-1 min-h-[24px]">{laudoData?.codigo_procedimento_principal || ''}</div>
                <div className="col-span-5 border border-black p-1 min-h-[24px]">{laudoData?.nome_procedimento_principal || ''}</div>
                <div className="border border-black p-1 min-h-[24px] text-center">{laudoData?.qtde_procedimento_principal || ''}</div>
              </div>

              <div className="text-xs font-semibold">PROCEDIMENTOS SECUNDÁRIOS</div>
              {[1, 2, 3].map((index) => (
                <div key={index} className="grid grid-cols-8 gap-1">
                  <div className="col-span-2 border border-black p-1 min-h-[24px]">
                    {laudoData?.[`codigo_procedimento_secundario_${index}`] || ''}
                  </div>
                  <div className="col-span-5 border border-black p-1 min-h-[24px]">
                    {laudoData?.[`nome_procedimento_secundario_${index}`] || ''}
                  </div>
                  <div className="border border-black p-1 min-h-[24px] text-center">
                    {laudoData?.[`qtde_procedimento_secundario_${index}`] || ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Justificativa */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-2">JUSTIFICATIVA DO(S) PROCEDIMENTO(S) SOLICITADO(S)</div>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2">
                  <div className="text-xs font-semibold">DESCRIÇÃO DO DIAGNÓSTICO</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.descricao_diagnostico || ''}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold">CID 10 PRINCIPAL</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.cid10_principal || ''}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold">CID 10 SECUNDÁRIO</div>
                  <div className="border border-black p-1 min-h-[24px]">{laudoData?.cid10_secundario || ''}</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold">CID 10 CAUSAS ASSOCIADAS</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.cid10_causas_associadas || ''}</div>
              </div>
            </div>
          </div>

          {/* Resumo da Anamnese */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-1">RESUMO DA ANAMNESE E EXAME FÍSICO</div>
            <div className="border border-black p-2 min-h-[60px] text-sm whitespace-pre-wrap">
              {laudoData?.resumo_anamnese || ''}
            </div>
          </div>

          {/* Exames Complementares */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-1">EXAMES COMPLEMENTARES REALIZADOS</div>
            <div className="border border-black p-2 min-h-[60px] text-sm whitespace-pre-wrap">
              {laudoData?.exames_complementares || ''}
            </div>
          </div>

          {/* Justificativa do Procedimento */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-1">JUSTIFICATIVA DO PROCEDIMENTO</div>
            <div className="border border-black p-2 min-h-[60px] text-sm whitespace-pre-wrap">
              {laudoData?.justificativa_procedimento || ''}
            </div>
          </div>

          {/* Solicitação */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-2">SOLICITAÇÃO</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <div className="text-xs font-semibold">NOME DO PROFISSIONAL SOLICITANTE</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.nome_profissional_solicitante || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">DATA DA SOLICITAÇÃO</div>
                <div className="border border-black p-1 min-h-[24px]">
                  {laudoData?.data_solicitacao ? format(new Date(laudoData.data_solicitacao), 'dd/MM/yyyy') : ''}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <div className="text-xs font-semibold">DOCUMENTO (CNS/CPF)</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.documento_profissional_solicitante || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">ASSINATURA E CARIMBO</div>
                <div className="border border-black p-1 min-h-[40px]"></div>
              </div>
            </div>
          </div>

          {/* Autorização */}
          <div className="border-b-2 border-black p-3">
            <div className="font-bold text-sm mb-2">AUTORIZAÇÃO</div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-xs font-semibold">NOME DO PROFISSIONAL AUTORIZADOR</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.nome_profissional_autorizador || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">CÓD. ÓRGÃO EMISSOR</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.codigo_orgao_emissor || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">Nº DA AUTORIZAÇÃO (APAC)</div>
                <div className="border border-black p-1 min-h-[24px]">{apac?.id || ''}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div>
                <div className="text-xs font-semibold">DOCUMENTO (CNS/CPF)</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.documento_profissional_autorizador || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">DATA DA AUTORIZAÇÃO</div>
                <div className="border border-black p-1 min-h-[24px]">
                  {laudoData?.data_autorizacao ? format(new Date(laudoData.data_autorizacao), 'dd/MM/yyyy') : ''}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold">PERÍODO DE VALIDADE</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.periodo_validade || ''}</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-xs font-semibold">ASSINATURA E CARIMBO</div>
              <div className="border border-black p-1 min-h-[40px]"></div>
            </div>
          </div>

          {/* Estabelecimento Executante */}
          <div className="p-3">
            <div className="font-bold text-sm mb-2">IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (EXECUTANTE)</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <div className="text-xs font-semibold">NOME DO ESTABELECIMENTO EXECUTANTE</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.estabelecimento_executante || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">CNES</div>
                <div className="border border-black p-1 min-h-[24px]">{laudoData?.cnes_executante || ''}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Página 2 - Dados Complementares */}
      <div className="p-8">
        <div className="border-2 border-black">
          {/* Cabeçalho */}
          <div className="border-b-2 border-black p-4 bg-gray-100">
            <div className="text-center font-bold text-lg">
              DADOS COMPLEMENTARES DO PROCEDIMENTO
            </div>
            <div className="text-center text-sm">Autorização de Procedimento Ambulatorial de Alta Complexidade</div>
          </div>

          {/* Dados Complementares */}
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-semibold">ESTADIAMENTO</div>
                <div className="border border-black p-1 min-h-[24px]">{dadosComplementares?.estadiamento || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">FINALIDADE</div>
                <div className="border border-black p-1 min-h-[24px]">{dadosComplementares?.finalidade || ''}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-xs font-semibold">TIPO DE ATENDIMENTO</div>
                <div className="border border-black p-1 min-h-[24px]">{dadosComplementares?.tipo_atendimento || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">TURNO</div>
                <div className="border border-black p-1 min-h-[24px]">{dadosComplementares?.turno || ''}</div>
              </div>
              <div>
                <div className="text-xs font-semibold">CARÁTER</div>
                <div className="border border-black p-1 min-h-[24px]">{dadosComplementares?.carater || ''}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold">OBSERVAÇÕES</div>
              <div className="border border-black p-2 min-h-[80px] text-sm whitespace-pre-wrap">
                {apac?.observacoes || ''}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-semibold">DATA DE PREENCHIMENTO</div>
                <div className="border border-black p-1 min-h-[24px]">
                  {apac?.data_preenchimento ? format(new Date(apac.data_preenchimento), 'dd/MM/yyyy') : ''}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold">STATUS</div>
                <div className="border border-black p-1 min-h-[24px] font-semibold uppercase">
                  {apac?.status || ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
