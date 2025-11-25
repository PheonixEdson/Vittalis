import { format } from "date-fns";

type APACPrintTemplateProps = {
  apac: any;
  laudoData: any;
  dadosComplementares: any;
};

export const APACPrintTemplate = ({ apac, laudoData, dadosComplementares }: APACPrintTemplateProps) => {
  return (
    <div className="hidden print:block print:text-black print:bg-white">
      {/* PÁGINA 1 - LAUDO MÉDICO PARA PROCEDIMENTOS DE ALTA COMPLEXIDADE - APAC */}
      <div className="w-full page-break-after p-6" style={{ pageBreakAfter: 'always' }}>
        
        {/* Cabeçalho com bordas */}
        <div className="border-2 border-black mb-3">
          <div className="flex justify-between items-start p-2">
            <div className="text-[9px] leading-tight">
              <div>Estado</div>
              <div>de Santa</div>
              <div>Catarina</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-[9px] mb-1">Ministério da Saúde</div>
              <div className="font-bold text-xs">
                LAUDO MÉDICO PARA PROCEDIMENTOS DE ALTA<br />
                COMPLEXIDADE - APAC
              </div>
            </div>
            <div className="w-16"></div>
          </div>
        </div>

        {/* IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (SOLICITANTE) */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (SOLICITANTE)
          </div>
          <div className="flex border-b border-black">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">1 - NOME DO ESTABELECIMENTO DE SAÚDE SOLICITANTE</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.estabelecimento_solicitante || ''}</div>
            </div>
            <div className="w-24 p-1">
              <div className="text-[7px] leading-tight">2 - CNES</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.cnes_solicitante || ''}</div>
            </div>
          </div>
        </div>

        {/* IDENTIFICAÇÃO DO PACIENTE */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            IDENTIFICAÇÃO DO PACIENTE
          </div>
          
          <div className="flex border-b border-black">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">3 - NOME DO PACIENTE</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.nome_paciente || ''}</div>
            </div>
            <div className="w-32 p-1">
              <div className="text-[7px] leading-tight">4 - Nº DO PRONTUÁRIO</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.numero_prontuario || ''}</div>
            </div>
          </div>

          <div className="flex border-b border-black">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">5 - CARTÃO NACIONAL DE SAÚDE (CNS)</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.cns_paciente || ''}</div>
            </div>
            <div className="w-28 border-r border-black p-1">
              <div className="text-[7px] leading-tight">6 - DATA DE NASCIMENTO</div>
              <div className="text-[9px] font-medium mt-0.5">
                {laudoData?.data_nascimento ? format(new Date(laudoData.data_nascimento), 'dd/MM/yyyy') : ''}
              </div>
            </div>
            <div className="w-20 border-r border-black p-1">
              <div className="text-[7px] leading-tight">7 - SEXO</div>
              <div className="text-[8px] font-medium mt-0.5">
                {laudoData?.sexo === 'M' ? '☑ Masc.' : '☐ Masc.'} {laudoData?.sexo === 'F' ? '☑ Fem.' : '☐ Fem.'}
              </div>
            </div>
            <div className="w-20 p-1">
              <div className="text-[7px] leading-tight">8 - RAÇA/COR</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.raca_cor || ''}</div>
            </div>
          </div>

          <div className="flex border-b border-black">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">9 - NOME DA MÃE</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.nome_mae || ''}</div>
            </div>
            <div className="w-48 p-1">
              <div className="text-[7px] leading-tight">10 - TELEFONE DE CONTATO</div>
              <div className="text-[9px] font-medium mt-0.5 flex gap-2">
                <span>DDD: {laudoData?.ddd_paciente || ''}</span>
                <span>Nº: {laudoData?.telefone_paciente || ''}</span>
              </div>
            </div>
          </div>

          <div className="flex border-b border-black">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">11 - NOME DO RESPONSÁVEL</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.nome_responsavel || ''}</div>
            </div>
            <div className="w-48 p-1">
              <div className="text-[7px] leading-tight">12 - TELEFONE DE CONTATO</div>
              <div className="text-[9px] font-medium mt-0.5 flex gap-2">
                <span>DDD: {laudoData?.ddd_responsavel || ''}</span>
                <span>Nº: {laudoData?.telefone_responsavel || ''}</span>
              </div>
            </div>
          </div>

          <div className="border-b border-black p-1">
            <div className="text-[7px] leading-tight">13 - ENDEREÇO (RUA, Nº, BAIRRO)</div>
            <div className="text-[9px] font-medium mt-0.5">{laudoData?.endereco || ''}</div>
          </div>

          <div className="flex">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">14 - MUNICÍPIO DE RESIDÊNCIA</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.municipio || ''}</div>
            </div>
            <div className="w-28 border-r border-black p-1">
              <div className="text-[7px] leading-tight">15 - CÓD. IBGE MUNICÍPIO</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.codigo_ibge || ''}</div>
            </div>
            <div className="w-16 border-r border-black p-1">
              <div className="text-[7px] leading-tight">16 - UF</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.uf || ''}</div>
            </div>
            <div className="w-24 p-1">
              <div className="text-[7px] leading-tight">17 - CEP</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.cep || ''}</div>
            </div>
          </div>
        </div>

        {/* PROCEDIMENTO(S) SOLICITADO(S) */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            PROCEDIMENTO(S) SOLICITADO(S)
          </div>
          
          <div className="border-b border-black">
            <div className="flex border-b border-black bg-gray-50">
              <div className="w-24 border-r border-black p-0.5 text-[7px] text-center">CÓDIGO DO PROCEDIMENTO</div>
              <div className="flex-1 border-r border-black p-0.5 text-[7px] text-center">NOME DO PROCEDIMENTO</div>
              <div className="w-16 p-0.5 text-[7px] text-center">QTDE</div>
            </div>
            <div className="flex">
              <div className="w-24 border-r border-black p-1">
                <div className="text-[9px] font-medium">{laudoData?.codigo_procedimento_principal || ''}</div>
              </div>
              <div className="flex-1 border-r border-black p-1">
                <div className="text-[9px] font-medium">{laudoData?.nome_procedimento_principal || ''}</div>
              </div>
              <div className="w-16 p-1">
                <div className="text-[9px] font-medium text-center">{laudoData?.qtde_procedimento_principal || ''}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 border-b border-black px-2 py-0.5 text-[8px] font-semibold">
              PROCEDIMENTO(S) SECUNDÁRIO(S)
            </div>
            {[1, 2, 3].map((index) => (
              <div key={index} className={`flex ${index < 3 ? 'border-b border-black' : ''}`}>
                <div className="w-24 border-r border-black p-1">
                  <div className="text-[9px] font-medium">{laudoData?.[`codigo_procedimento_secundario_${index}`] || ''}</div>
                </div>
                <div className="flex-1 border-r border-black p-1">
                  <div className="text-[9px] font-medium">{laudoData?.[`nome_procedimento_secundario_${index}`] || ''}</div>
                </div>
                <div className="w-16 p-1">
                  <div className="text-[9px] font-medium text-center">{laudoData?.[`qtde_procedimento_secundario_${index}`] || ''}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* JUSTIFICATIVA DO(S) PROCEDIMENTO(S) SOLICITADO(S) */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            JUSTIFICATIVA DO(S) PROCEDIMENTO(S) SOLICITADO(S)
          </div>
          <div className="flex border-b border-black">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">DESCRIÇÃO DO DIAGNÓSTICO</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.descricao_diagnostico || ''}</div>
            </div>
            <div className="w-20 border-r border-black p-1">
              <div className="text-[7px] leading-tight">CID 10 PRINCIPAL</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.cid10_principal || ''}</div>
            </div>
            <div className="w-20 border-r border-black p-1">
              <div className="text-[7px] leading-tight">CID 10 SECUNDÁRIO</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.cid10_secundario || ''}</div>
            </div>
            <div className="w-24 p-1">
              <div className="text-[7px] leading-tight">CID 10 CAUSAS ASSOCIADAS</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.cid10_causas_associadas || ''}</div>
            </div>
          </div>
        </div>

        {/* RESUMO DA ANAMNESE E EXAME FÍSICO */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            RESUMO DA ANAMNESE E EXAME FÍSICO
          </div>
          <div className="p-1.5 min-h-[50px]">
            <div className="text-[9px] leading-relaxed whitespace-pre-wrap">{laudoData?.resumo_anamnese || ''}</div>
          </div>
        </div>

        {/* EXAMES COMPLEMENTARES REALIZADOS */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            EXAMES COMPLEMENTARES REALIZADOS
          </div>
          <div className="p-1.5 min-h-[50px]">
            <div className="text-[9px] leading-relaxed whitespace-pre-wrap">{laudoData?.exames_complementares || ''}</div>
          </div>
        </div>

        {/* JUSTIFICATIVA DO PROCEDIMENTO */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            JUSTIFICATIVA DO PROCEDIMENTO
          </div>
          <div className="p-1.5 min-h-[50px]">
            <div className="text-[9px] leading-relaxed whitespace-pre-wrap">{laudoData?.justificativa_procedimento || ''}</div>
          </div>
        </div>

        {/* SOLICITAÇÃO */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            SOLICITAÇÃO
          </div>
          <div className="flex">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">NOME DO PROFISSIONAL SOLICITANTE</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.nome_profissional_solicitante || ''}</div>
              <div className="text-[7px] leading-tight mt-2">DOCUMENTO</div>
              <div className="text-[8px] mt-0.5">
                {laudoData?.documento_profissional_solicitante?.includes('CNS') || laudoData?.tipo_doc_solicitante === 'CNS' ? '☑ CNS' : '☐ CNS'} 
                {' '}
                {laudoData?.documento_profissional_solicitante?.includes('CPF') || laudoData?.tipo_doc_solicitante === 'CPF' ? '☑ CPF' : '☐ CPF'}
              </div>
              <div className="text-[9px] font-medium mt-0.5">
                NÚMERO DO DOCUMENTO (CNS/CPF): {laudoData?.documento_profissional_solicitante || ''}
              </div>
            </div>
            <div className="w-32 border-r border-black p-1">
              <div className="text-[7px] leading-tight">DATA DA SOLICITAÇÃO</div>
              <div className="text-[9px] font-medium mt-0.5">
                {laudoData?.data_solicitacao ? format(new Date(laudoData.data_solicitacao), 'dd/MM/yyyy') : ''}
              </div>
            </div>
            <div className="w-40 p-1">
              <div className="text-[7px] leading-tight">ASSINATURA E CARIMBO</div>
              <div className="min-h-[35px] border-b border-gray-300 mt-8"></div>
            </div>
          </div>
        </div>

        {/* AUTORIZAÇÃO */}
        <div className="border border-black mb-2">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            AUTORIZAÇÃO
          </div>
          <div className="flex border-b border-black">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">NOME DO PROFISSIONAL AUTORIZADOR</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.nome_profissional_autorizador || ''}</div>
            </div>
            <div className="w-32 border-r border-black p-1">
              <div className="text-[7px] leading-tight">COD ÓRGÃO EMISSOR</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.codigo_orgao_emissor || ''}</div>
            </div>
            <div className="w-40 p-1">
              <div className="text-[7px] leading-tight">NÚMERO DA AUTORIZAÇÃO (APAC)</div>
              <div className="text-[9px] font-medium mt-0.5">{apac?.id?.substring(0, 13) || ''}</div>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">DOCUMENTO</div>
              <div className="text-[8px] mt-0.5">
                {laudoData?.documento_profissional_autorizador?.includes('CNS') || laudoData?.tipo_doc_autorizador === 'CNS' ? '☑ CNS' : '☐ CNS'} 
                {' '}
                {laudoData?.documento_profissional_autorizador?.includes('CPF') || laudoData?.tipo_doc_autorizador === 'CPF' ? '☑ CPF' : '☐ CPF'}
              </div>
              <div className="text-[9px] font-medium mt-0.5">
                NÚMERO DO DOCUMENTO (CNS/CPF): {laudoData?.documento_profissional_autorizador || ''}
              </div>
            </div>
            <div className="w-32 border-r border-black p-1">
              <div className="text-[7px] leading-tight">DATA DA AUTORIZAÇÃO</div>
              <div className="text-[9px] font-medium mt-0.5">
                {laudoData?.data_autorizacao ? format(new Date(laudoData.data_autorizacao), 'dd/MM/yyyy') : ''}
              </div>
            </div>
            <div className="w-40 p-1">
              <div className="text-[7px] leading-tight">ASSINATURA E CARIMBO</div>
              <div className="min-h-[20px] border-b border-gray-300 mt-4"></div>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 p-1">
              <div className="text-[7px] leading-tight">PERÍODO DE VALIDADE DA APAC</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.periodo_validade || ''}</div>
            </div>
          </div>
        </div>

        {/* IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (EXECUTANTE) */}
        <div className="border border-black">
          <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
            IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (EXECUTANTE)
          </div>
          <div className="flex">
            <div className="flex-1 border-r border-black p-1">
              <div className="text-[7px] leading-tight">NOME DO ESTABELECIMENTO DE SAÚDE EXECUTANTE</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.estabelecimento_executante || ''}</div>
            </div>
            <div className="w-24 p-1">
              <div className="text-[7px] leading-tight">CNES</div>
              <div className="text-[9px] font-medium mt-0.5">{laudoData?.cnes_executante || ''}</div>
            </div>
          </div>
        </div>
      </div>

      {/* PÁGINA 2 - DADOS COMPLEMENTARES (se houver) */}
      {(dadosComplementares?.estadiamento || dadosComplementares?.finalidade) && (
        <div className="w-full p-6">
          <div className="border-2 border-black mb-3">
            <div className="text-center p-2">
              <div className="text-[9px]">Sistema Único de Saúde</div>
              <div className="font-bold text-xs">DADOS COMPLEMENTARES DO PROCEDIMENTO</div>
              <div className="text-[9px]">Autorização de Procedimento Ambulatorial de Alta Complexidade</div>
            </div>
          </div>

          <div className="border border-black mb-2">
            <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
              INFORMAÇÕES ONCOLÓGICAS
            </div>
            <div className="grid grid-cols-4">
              <div className="border-r border-black p-1">
                <div className="text-[7px] leading-tight">ESTADIAMENTO</div>
                <div className="text-[9px] font-medium mt-0.5">{dadosComplementares?.estadiamento || ''}</div>
              </div>
              <div className="border-r border-black p-1">
                <div className="text-[7px] leading-tight">FINALIDADE</div>
                <div className="text-[9px] font-medium mt-0.5">{dadosComplementares?.finalidade || ''}</div>
              </div>
              <div className="border-r border-black p-1">
                <div className="text-[7px] leading-tight">TIPO DE ATENDIMENTO</div>
                <div className="text-[9px] font-medium mt-0.5">{dadosComplementares?.tipo_atendimento || ''}</div>
              </div>
              <div className="p-1">
                <div className="text-[7px] leading-tight">TURNO</div>
                <div className="text-[9px] font-medium mt-0.5">{dadosComplementares?.turno || ''}</div>
              </div>
            </div>
          </div>

          <div className="border border-black">
            <div className="bg-gray-100 border-b border-black px-2 py-0.5 font-bold text-[9px]">
              OBSERVAÇÕES
            </div>
            <div className="p-2 min-h-[100px]">
              <div className="text-[9px] leading-relaxed whitespace-pre-wrap">{apac?.observacoes || ''}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
