export interface BackendResponseDTO{

    id: number;
    nome: string;
    descricao: string;
    versao: string;
    gitlabId: number;
    status: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOW';
    ultimoStatus: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOW';
    ambiente: 'DEV' | 'HML' | 'PRD';
    responsavel: string;
    baseUrl: string
    urlRepo: string;
    urlDocumentacao: string;
    urlLogs: string;
    urlHealthCheck: string;
    apiNumber: string;

}

export interface BackendCreateDTO{

    nome: string;
    descricao: string;
    versao: string;
    gitlabId: number;
    status: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOW';
    ultimoStatus: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOW';
    ambiente: 'DEV' | 'HML' | 'PRD';
    responsavel: string;
    baseUrl: string
    urlRepo: string;
    urlDocumentacao: string;
    urlLogs: string;
    urlHealthCheck: string;
    apiNumber: string;
    stack: string[];
    techTag: string[];
    detalhesError: string;
    dataUltimaVerificacao: string;

}

export interface PageBackendRespondeDTO{

    totalElements: number;
    totalPages: number;
    size: number;
    content: BackendResponseDTO[];
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;


}