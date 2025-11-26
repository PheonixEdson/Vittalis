import { format } from "date-fns";

type APACPrintTemplateProps = {
  apac: any;
  laudoData: any;
  dadosComplementares: any;
};

export const APACPrintTemplate = ({ apac, laudoData, dadosComplementares }: APACPrintTemplateProps) => {
  const borderStyle = { border: '1px solid black' };
  const border2Style = { border: '2px solid black' };
  const borderBottomStyle = { borderBottom: '1px solid black' };
  const borderRightStyle = { borderRight: '1px solid black' };
  const headerBgStyle = { backgroundColor: '#f3f4f6', WebkitPrintColorAdjust: 'exact' as const, colorAdjust: 'exact' as const };
  const lightBgStyle = { backgroundColor: '#f9fafb', WebkitPrintColorAdjust: 'exact' as const, colorAdjust: 'exact' as const };

  return (
    <div 
      className="hidden print:block print:text-black print:bg-white"
      style={{ 
        color: 'black', 
        backgroundColor: 'white',
        WebkitPrintColorAdjust: 'exact' as const,
        colorAdjust: 'exact' as const
      }}
    >
      {/* PÁGINA 1 - LAUDO MÉDICO PARA PROCEDIMENTOS DE ALTA COMPLEXIDADE - APAC */}
      <div 
        className="w-full p-6" 
        style={{ 
          pageBreakAfter: 'always',
          color: 'black',
          backgroundColor: 'white',
          padding: '24px'
        }}
      >
        
        {/* Cabeçalho com bordas */}
        <div style={{ ...border2Style, marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px' }}>
            <div style={{ fontSize: '9px', lineHeight: '1.2' }}>
              <div>Estado</div>
              <div>de Santa</div>
              <div>Catarina</div>
            </div>
            <div style={{ textAlign: 'center', flex: '1' }}>
              <div style={{ fontSize: '9px', marginBottom: '4px' }}>Ministério da Saúde</div>
              <div style={{ fontWeight: 'bold', fontSize: '12px' }}>
                LAUDO MÉDICO PARA PROCEDIMENTOS DE ALTA<br />
                COMPLEXIDADE - APAC
              </div>
            </div>
            <div style={{ width: '64px' }}></div>
          </div>
        </div>

        {/* IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (SOLICITANTE) */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (SOLICITANTE)
          </div>
          <div style={{ display: 'flex', ...borderBottomStyle }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>1 - NOME DO ESTABELECIMENTO DE SAÚDE SOLICITANTE</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.nomeEstabelecimento || laudoData?.estabelecimento_solicitante || ''}</div>
            </div>
            <div style={{ width: '96px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>2 - CNES</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.cnes || laudoData?.cnes_solicitante || ''}</div>
            </div>
          </div>
        </div>

        {/* IDENTIFICAÇÃO DO PACIENTE */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            IDENTIFICAÇÃO DO PACIENTE
          </div>
          
          <div style={{ display: 'flex', ...borderBottomStyle }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>3 - NOME DO PACIENTE</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.nomePaciente || laudoData?.nome_paciente || ''}</div>
            </div>
            <div style={{ width: '128px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>4 - Nº DO PRONTUÁRIO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.prontuario || laudoData?.numero_prontuario || ''}</div>
            </div>
          </div>

          <div style={{ display: 'flex', ...borderBottomStyle }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>5 - CARTÃO NACIONAL DE SAÚDE (CNS)</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.cns || laudoData?.cns_paciente || ''}</div>
            </div>
            <div style={{ width: '112px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>6 - DATA DE NASCIMENTO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>
                {laudoData?.dataNascimento || laudoData?.data_nascimento ? format(new Date(laudoData?.dataNascimento || laudoData?.data_nascimento), 'dd/MM/yyyy') : ''}
              </div>
            </div>
            <div style={{ width: '80px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>7 - SEXO</div>
              <div style={{ fontSize: '8px', fontWeight: '500', marginTop: '2px' }}>
                {laudoData?.sexo === 'M' ? '☑ Masc.' : '☐ Masc.'} {laudoData?.sexo === 'F' ? '☑ Fem.' : '☐ Fem.'}
              </div>
            </div>
            <div style={{ width: '80px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>8 - RAÇA/COR</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.racaCor || laudoData?.raca_cor || ''}</div>
            </div>
          </div>

          <div style={{ display: 'flex', ...borderBottomStyle }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>9 - NOME DA MÃE</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.nomeMae || laudoData?.nome_mae || ''}</div>
            </div>
            <div style={{ width: '192px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>10 - TELEFONE DE CONTATO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px', display: 'flex', gap: '8px' }}>
                <span>DDD: {laudoData?.dddContato || laudoData?.ddd_paciente || ''}</span>
                <span>Nº: {laudoData?.telefoneContato || laudoData?.telefone_paciente || ''}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', ...borderBottomStyle }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>11 - NOME DO RESPONSÁVEL</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.nomeResponsavel || laudoData?.nome_responsavel || ''}</div>
            </div>
            <div style={{ width: '192px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>12 - TELEFONE DE CONTATO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px', display: 'flex', gap: '8px' }}>
                <span>DDD: {laudoData?.dddResponsavel || laudoData?.ddd_responsavel || ''}</span>
                <span>Nº: {laudoData?.telefoneResponsavel || laudoData?.telefone_responsavel || ''}</span>
              </div>
            </div>
          </div>

          <div style={{ ...borderBottomStyle, padding: '4px' }}>
            <div style={{ fontSize: '7px', lineHeight: '1.2' }}>13 - ENDEREÇO (RUA, Nº, BAIRRO)</div>
            <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.endereco || ''}</div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>14 - MUNICÍPIO DE RESIDÊNCIA</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.municipio || ''}</div>
            </div>
            <div style={{ width: '112px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>15 - CÓD. IBGE MUNICÍPIO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.codIbge || laudoData?.codigo_ibge || ''}</div>
            </div>
            <div style={{ width: '64px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>16 - UF</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.uf || ''}</div>
            </div>
            <div style={{ width: '96px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>17 - CEP</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.cep || ''}</div>
            </div>
          </div>
        </div>

        {/* PROCEDIMENTO(S) SOLICITADO(S) */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            PROCEDIMENTO(S) SOLICITADO(S)
          </div>
          
          <div style={{ ...borderBottomStyle }}>
            <div style={{ display: 'flex', ...borderBottomStyle, ...lightBgStyle }}>
              <div style={{ width: '96px', ...borderRightStyle, padding: '2px', fontSize: '7px', textAlign: 'center' }}>CÓDIGO DO PROCEDIMENTO</div>
              <div style={{ flex: '1', ...borderRightStyle, padding: '2px', fontSize: '7px', textAlign: 'center' }}>NOME DO PROCEDIMENTO</div>
              <div style={{ width: '64px', padding: '2px', fontSize: '7px', textAlign: 'center' }}>QTDE</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '96px', ...borderRightStyle, padding: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: '500' }}>{laudoData?.codigoProcedimento1 || laudoData?.codigo_procedimento_principal || ''}</div>
              </div>
              <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: '500' }}>{laudoData?.nomeProcedimento1 || laudoData?.nome_procedimento_principal || ''}</div>
              </div>
              <div style={{ width: '64px', padding: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: '500', textAlign: 'center' }}>{laudoData?.qtde1 || laudoData?.qtde_procedimento_principal || ''}</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ ...lightBgStyle, ...borderBottomStyle, padding: '2px 8px', fontSize: '8px', fontWeight: '600' }}>
              PROCEDIMENTO(S) SECUNDÁRIO(S)
            </div>
            {[2, 3, 4].map((index) => (
              <div key={index} style={{ display: 'flex', ...(index < 4 ? borderBottomStyle : {}) }}>
                <div style={{ width: '96px', ...borderRightStyle, padding: '4px' }}>
                  <div style={{ fontSize: '9px', fontWeight: '500' }}>{laudoData?.[`codigoProcedimento${index}`] || laudoData?.[`codigo_procedimento_secundario_${index - 1}`] || ''}</div>
                </div>
                <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
                  <div style={{ fontSize: '9px', fontWeight: '500' }}>{laudoData?.[`nomeProcedimento${index}`] || laudoData?.[`nome_procedimento_secundario_${index - 1}`] || ''}</div>
                </div>
                <div style={{ width: '64px', padding: '4px' }}>
                  <div style={{ fontSize: '9px', fontWeight: '500', textAlign: 'center' }}>{laudoData?.[`qtde${index}`] || laudoData?.[`qtde_procedimento_secundario_${index - 1}`] || ''}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* JUSTIFICATIVA DO(S) PROCEDIMENTO(S) SOLICITADO(S) */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            JUSTIFICATIVA DO(S) PROCEDIMENTO(S) SOLICITADO(S)
          </div>

          <div style={{ padding: '4px', ...borderBottomStyle }}>
            <div style={{ fontSize: '7px', lineHeight: '1.2', marginBottom: '2px' }}>TIPO DE TRATAMENTO (DE ACORDO COM A TABELA SIGTAP)</div>
            <div style={{ fontSize: '9px', fontWeight: '500', minHeight: '20px' }}>{laudoData?.tipoTratamentoSigtap || dadosComplementares?.tipoTratamentoSigtap || ''}</div>
          </div>

          <div style={{ display: 'flex', ...borderBottomStyle }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>DESCRIÇÃO DO DIAGNÓSTICO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.descricaoDiagnostico || laudoData?.descricao_diagnostico || ''}</div>
            </div>
            <div style={{ width: '80px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>CID 10 PRINCIPAL</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.cid10Principal || laudoData?.cid10_principal || ''}</div>
            </div>
            <div style={{ width: '80px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>CID 10 SECUNDÁRIO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.cid10Secundario || laudoData?.cid10_secundario || ''}</div>
            </div>
            <div style={{ width: '96px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>CID 10 CAUSAS ASSOCIADAS</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.cid10CausasAssociadas || laudoData?.cid10_causas_associadas || ''}</div>
            </div>
          </div>
        </div>

        {/* RESUMO DA ANAMNESE E EXAME FÍSICO */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            RESUMO DA ANAMNESE E EXAME FÍSICO
          </div>
          <div style={{ padding: '6px', minHeight: '50px' }}>
            <div style={{ fontSize: '9px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{laudoData?.resumoAnamnese || laudoData?.resumo_anamnese || ''}</div>
          </div>
        </div>

        {/* EXAMES COMPLEMENTARES REALIZADOS */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            EXAMES COMPLEMENTARES REALIZADOS
          </div>
          <div style={{ padding: '6px', minHeight: '50px' }}>
            <div style={{ fontSize: '9px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{laudoData?.examesComplementares || laudoData?.exames_complementares || ''}</div>
          </div>
        </div>

        {/* JUSTIFICATIVA DO PROCEDIMENTO */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            JUSTIFICATIVA DO PROCEDIMENTO
          </div>
          <div style={{ padding: '6px', minHeight: '50px' }}>
            <div style={{ fontSize: '9px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{laudoData?.justificativaProcedimento || laudoData?.justificativa_procedimento || ''}</div>
          </div>
        </div>

        {/* SOLICITAÇÃO */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            SOLICITAÇÃO
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>NOME DO PROFISSIONAL SOLICITANTE</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.nomeProfissionalSolicitante || laudoData?.nome_profissional_solicitante || ''}</div>
              <div style={{ fontSize: '7px', lineHeight: '1.2', marginTop: '8px' }}>DOCUMENTO</div>
              <div style={{ fontSize: '8px', marginTop: '2px' }}>
                {(laudoData?.documentoProfissionalSolicitante || laudoData?.documento_profissional_solicitante || '').includes('CNS') || laudoData?.tipoDocSolicitante === 'CNS' || laudoData?.tipo_doc_solicitante === 'CNS' ? '☑ CNS' : '☐ CNS'} 
                {' '}
                {(laudoData?.documentoProfissionalSolicitante || laudoData?.documento_profissional_solicitante || '').includes('CPF') || laudoData?.tipoDocSolicitante === 'CPF' || laudoData?.tipo_doc_solicitante === 'CPF' ? '☑ CPF' : '☐ CPF'}
              </div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>
                NÚMERO DO DOCUMENTO (CNS/CPF): {laudoData?.documentoProfissionalSolicitante || laudoData?.documento_profissional_solicitante || ''}
              </div>
            </div>
            <div style={{ width: '128px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>DATA DA SOLICITAÇÃO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>
                {laudoData?.dataSolicitacao || laudoData?.data_solicitacao ? format(new Date(laudoData?.dataSolicitacao || laudoData?.data_solicitacao), 'dd/MM/yyyy') : ''}
              </div>
            </div>
            <div style={{ width: '160px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>ASSINATURA E CARIMBO</div>
              <div style={{ minHeight: '35px', borderBottom: '1px solid #d1d5db', marginTop: '32px' }}></div>
            </div>
          </div>
        </div>

        {/* AUTORIZAÇÃO */}
        <div style={{ ...borderStyle, marginBottom: '8px' }}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            AUTORIZAÇÃO
          </div>
          <div style={{ display: 'flex', ...borderBottomStyle }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>NOME DO PROFISSIONAL AUTORIZADOR</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.nomeProfissionalAutorizador || laudoData?.nome_profissional_autorizador || ''}</div>
            </div>
            <div style={{ width: '128px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>COD ÓRGÃO EMISSOR</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.codigoOrgaoEmissor || laudoData?.codigo_orgao_emissor || ''}</div>
            </div>
            <div style={{ width: '160px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>NÚMERO DA AUTORIZAÇÃO (APAC)</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{apac?.id?.substring(0, 13) || ''}</div>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>DOCUMENTO</div>
              <div style={{ fontSize: '8px', marginTop: '2px' }}>
                {(laudoData?.documentoProfissionalAutorizador || laudoData?.documento_profissional_autorizador || '').includes('CNS') || laudoData?.tipoDocAutorizador === 'CNS' || laudoData?.tipo_doc_autorizador === 'CNS' ? '☑ CNS' : '☐ CNS'} 
                {' '}
                {(laudoData?.documentoProfissionalAutorizador || laudoData?.documento_profissional_autorizador || '').includes('CPF') || laudoData?.tipoDocAutorizador === 'CPF' || laudoData?.tipo_doc_autorizador === 'CPF' ? '☑ CPF' : '☐ CPF'}
              </div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>
                NÚMERO DO DOCUMENTO (CNS/CPF): {laudoData?.documentoProfissionalAutorizador || laudoData?.documento_profissional_autorizador || ''}
              </div>
            </div>
            <div style={{ width: '128px', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>DATA DA AUTORIZAÇÃO</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>
                {laudoData?.dataAutorizacao || laudoData?.data_autorizacao ? format(new Date(laudoData?.dataAutorizacao || laudoData?.data_autorizacao), 'dd/MM/yyyy') : ''}
              </div>
            </div>
            <div style={{ width: '160px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>ASSINATURA E CARIMBO</div>
              <div style={{ minHeight: '20px', borderBottom: '1px solid #d1d5db', marginTop: '16px' }}></div>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>PERÍODO DE VALIDADE DA APAC</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.periodoValidade || laudoData?.periodo_validade || ''}</div>
            </div>
          </div>
        </div>

        {/* IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (EXECUTANTE) */}
        <div style={borderStyle}>
          <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
            IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE (EXECUTANTE)
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', ...borderRightStyle, padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>NOME DO ESTABELECIMENTO DE SAÚDE EXECUTANTE</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.estabelecimentoExecutante || laudoData?.estabelecimento_executante || ''}</div>
            </div>
            <div style={{ width: '96px', padding: '4px' }}>
              <div style={{ fontSize: '7px', lineHeight: '1.2' }}>CNES</div>
              <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{laudoData?.cnesExecutante || laudoData?.cnes_executante || ''}</div>
            </div>
          </div>
        </div>
      </div>

      {/* PÁGINA 2 - DADOS COMPLEMENTARES (sempre mostrar se existir qualquer dado) */}
      {(dadosComplementares && Object.keys(dadosComplementares).length > 0) && (
        <div className="w-full p-6" style={{ padding: '24px' }}>
          <div style={{ ...border2Style, marginBottom: '12px' }}>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{ fontSize: '9px' }}>Sistema Único de Saúde</div>
              <div style={{ fontWeight: 'bold', fontSize: '12px' }}>DADOS COMPLEMENTARES DO PROCEDIMENTO</div>
              <div style={{ fontSize: '9px' }}>Autorização de Procedimento Ambulatorial de Alta Complexidade</div>
            </div>
          </div>

          <div style={{ ...borderStyle, marginBottom: '8px' }}>
            <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
              INFORMAÇÕES ONCOLÓGICAS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div style={{ ...borderRightStyle, padding: '4px' }}>
                <div style={{ fontSize: '7px', lineHeight: '1.2' }}>ESTADIAMENTO</div>
                <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{dadosComplementares?.estadiamento || ''}</div>
              </div>
              <div style={{ ...borderRightStyle, padding: '4px' }}>
                <div style={{ fontSize: '7px', lineHeight: '1.2' }}>FINALIDADE</div>
                <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{dadosComplementares?.finalidade || ''}</div>
              </div>
              <div style={{ ...borderRightStyle, padding: '4px' }}>
                <div style={{ fontSize: '7px', lineHeight: '1.2' }}>TIPO DE ATENDIMENTO</div>
                <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{dadosComplementares?.tipo_atendimento || ''}</div>
              </div>
              <div style={{ padding: '4px' }}>
                <div style={{ fontSize: '7px', lineHeight: '1.2' }}>TURNO</div>
                <div style={{ fontSize: '9px', fontWeight: '500', marginTop: '2px' }}>{dadosComplementares?.turno || ''}</div>
              </div>
            </div>
          </div>

          <div style={borderStyle}>
            <div style={{ ...headerBgStyle, ...borderBottomStyle, padding: '2px 8px', fontWeight: 'bold', fontSize: '9px' }}>
              OBSERVAÇÕES
            </div>
            <div style={{ padding: '8px', minHeight: '100px' }}>
              <div style={{ fontSize: '9px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{apac?.observacoes || ''}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
