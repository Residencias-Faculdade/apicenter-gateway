export interface GatewayResponseDTO{

    id: number;
    nome: string;
    enderecoIp: string;
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
    backends: GatewayBackendResponseDTO[];

}

export interface GatewayBackendResponseDTO{

    id: number;
    descricao: string;
    status: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOWN';
    baseUrl: string;

}

export interface GatewayCreateDTO{

    nome: string;
    enderecoIp: string;
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

    nome?: string;
    enderecoIp?: string;
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