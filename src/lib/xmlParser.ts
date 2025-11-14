export interface DadosFracionamento {
  nomeMedicamento: string;
  lote: string;
  quantidadeFracionada: string;
  quantidadeOriginal: string;
  dataFracionamento: string;
  codigoBarrasOriginal: string;
  codigoBarrasFracionado: string;
  numeroSerie?: string;
  informacoesMaquina?: string;
}

interface TagMapping {
  field: keyof DadosFracionamento;
  tags: string[];
}

const tagMappings: TagMapping[] = [
  {
    field: 'nomeMedicamento',
    tags: ['medicamento', 'nome', 'drugName', 'drug', 'item', 'produto', 'product']
  },
  {
    field: 'lote',
    tags: ['lote', 'batch', 'batchNumber', 'lot', 'lotNumber']
  },
  {
    field: 'quantidadeFracionada',
    tags: ['qtd_fracionada', 'quantidadeFracionada', 'fraction', 'fractionQuantity', 'qtdFracionada', 'quantidade_fracionada']
  },
  {
    field: 'quantidadeOriginal',
    tags: ['qtd_original', 'quantidadeOriginal', 'original', 'originalQuantity', 'qtdOriginal', 'quantidade_original']
  },
  {
    field: 'dataFracionamento',
    tags: ['data_fracionamento', 'dataFracionamento', 'date', 'fractionDate', 'data', 'timestamp']
  },
  {
    field: 'codigoBarrasOriginal',
    tags: ['codigo_barras_original', 'codigoBarrasOriginal', 'barcode', 'originalBarcode', 'ean', 'codigoBarras']
  },
  {
    field: 'codigoBarrasFracionado',
    tags: ['codigo_barras_fracionado', 'codigoBarrasFracionado', 'fractionBarcode', 'newBarcode', 'codigoBarrasNovo']
  },
  {
    field: 'numeroSerie',
    tags: ['serial', 'numeroSerie', 'serialNumber', 'serie', 'sn']
  },
  {
    field: 'informacoesMaquina',
    tags: ['maquina', 'machine', 'equipment', 'equipamento', 'dispositivo', 'device']
  }
];

function findTagValue(xmlDoc: Document, tags: string[]): string | undefined {
  for (const tag of tags) {
    // Busca case-insensitive
    const elements = xmlDoc.getElementsByTagName(tag);
    if (elements.length > 0 && elements[0].textContent) {
      return elements[0].textContent.trim();
    }
    
    // Busca case-insensitive alternativa
    const allElements = xmlDoc.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      if (element.tagName.toLowerCase() === tag.toLowerCase() && element.textContent) {
        return element.textContent.trim();
      }
    }
  }
  return undefined;
}

export function parseXMLFracionamento(xmlString: string): DadosFracionamento {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  // Verificar se há erros de parse
  const parserError = xmlDoc.getElementsByTagName("parsererror");
  if (parserError.length > 0) {
    throw new Error("XML inválido: Erro ao fazer parse do arquivo");
  }
  
  // Verificar se o XML está vazio
  if (!xmlDoc.documentElement) {
    throw new Error("XML inválido: Arquivo vazio");
  }
  
  const dados: Partial<DadosFracionamento> = {};
  const camposNaoEncontrados: string[] = [];
  
  // Processar cada campo
  for (const mapping of tagMappings) {
    const value = findTagValue(xmlDoc, mapping.tags);
    if (value) {
      dados[mapping.field] = value;
    } else if (mapping.field !== 'numeroSerie' && mapping.field !== 'informacoesMaquina') {
      // numeroSerie e informacoesMaquina são opcionais
      camposNaoEncontrados.push(mapping.field);
    }
  }
  
  // Verificar campos obrigatórios
  const camposObrigatorios: (keyof DadosFracionamento)[] = [
    'nomeMedicamento',
    'lote',
    'quantidadeFracionada',
    'quantidadeOriginal',
    'dataFracionamento',
    'codigoBarrasOriginal',
    'codigoBarrasFracionado'
  ];
  
  const camposFaltantes = camposObrigatorios.filter(campo => !dados[campo]);
  
  if (camposFaltantes.length > 0) {
    const listaCampos = camposFaltantes.map(c => {
      switch(c) {
        case 'nomeMedicamento': return 'Nome do Medicamento';
        case 'lote': return 'Lote';
        case 'quantidadeFracionada': return 'Quantidade Fracionada';
        case 'quantidadeOriginal': return 'Quantidade Original';
        case 'dataFracionamento': return 'Data do Fracionamento';
        case 'codigoBarrasOriginal': return 'Código de Barras Original';
        case 'codigoBarrasFracionado': return 'Código de Barras Fracionado';
        default: return c;
      }
    }).join(', ');
    
    throw new Error(`XML inválido: Campos obrigatórios não encontrados: ${listaCampos}`);
  }
  
  return dados as DadosFracionamento;
}

export function validateXMLFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validar extensão
    if (!file.name.toLowerCase().endsWith('.xml')) {
      reject(new Error('Apenas arquivos .xml são permitidos'));
      return;
    }
    
    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('Arquivo muito grande. Tamanho máximo: 5MB'));
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        reject(new Error('Não foi possível ler o arquivo'));
        return;
      }
      resolve(content);
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo'));
    };
    
    reader.readAsText(file);
  });
}
