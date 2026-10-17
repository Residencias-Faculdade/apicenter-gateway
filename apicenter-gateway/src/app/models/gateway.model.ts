export interface GatewayResponseDTO{

    id: number;
    nome: String;
    enderecoIp: String;
    ativo: boolean;
    contextPath: string;
    gitlabId: number;
    tags: string[];
    porta: string;
    tentativasRetentativa: number;
    host: string;
    descricao: string;
    urlMetricas:string;
    urlInterna: string;
    urlExterna: string;
    rateLimit: number;
    backendIds: number[];
    backends: GatewayResponseDTO[];

}

export interface GatewayBackendResponseDTO{

    id: number;
    descricao: string;
    status: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOW';
    baseUrl: string;

}

export interface GatewayCreateDTO{

    nome: String;
    enderecoIp: String;
    ativo: boolean;
    contextPath: string;
    gitlabId: number;
    tags: string[]; 
    porta: string;
    tentativasRetentativa: number;
    host: string;
    descricao: string;
    urlMetricas:string;
    urlInterna: string;
    urlExterna: string;
    rateLimit: number;
}

export interface GatewayUpdateDTO{

    nome?: String;
    enderecoIp?: String;
    ativo?: boolean;
    contextPath?: string;
    gitlabId?: number;
    tags?: string[];
    porta?: string;
    tentativasRetentativa?: number;
    host?: string;
    descricao?: string;
    urlMetricas?: string;
    urlInterna?: string;
    urlExterna?: string;
    rateLimit?: number;

}