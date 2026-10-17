# 📖 Documentação Técnica — APICenter Gateway

> **Projeto:** API Center — SEFAZ  
> **Feature:** Gateway (Micro-frontend)  
> **Arquitetura:** Angular + Web Components (Micro-frontend)  
> **Mock Server:** Node.js + Express (porta 4000)  
> **Frontend:** Angular 21 (porta 4200)  
> **Especificação da API:** OpenAPI 3.1 (`src/assets/swagger_gateway.json`)  
> **Status:** Desenvolvimento inicial  
> **Última atualização:** 17/10/2026

---

## 1. Contexto e Propósito

### 1.1 O que é o API Center?

O **API Center** é o projeto estratégico da **SEFAZ** (Secretaria da Fazenda) voltado à padronização e centralização de APIs utilizadas nos sistemas da secretaria. Seu objetivo é reduzir a complexibilidade no desenvolvimento de software, oferecendo:

- Catálogo unificado de APIs
- Padronização de contratos (OpenAPI/Swagger)
- Gestão de gateways e backends
- Facilidade de integração entre sistemas internos

### 1.2 O que é o Gateway?

O **Gateway** é uma feature do API Center responsável por gerenciar os pontos de entrada (gateways) e os serviços de backend (backends) que compõem a arquitetura de integração da SEFAZ.

Por meio deste micro-frontend, equipes de desenvolvimento podem:

- Cadastrar, listar, atualizar e desativar gateways
- Cadastrar, listar e consultar backends vinculados
- Verificar status de saúde (health check) dos serviços
- Executar pipelines de deploy (GitLab)
- Consultar histórico de alterações (auditoria)

---

## 2. Arquitetura

### 2.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                    Shell (Micro-frontend Host)              │
│                                                             │
│  ┌─────────────────┐                                       │
│  │   API Center UI │                                       │
│  └────────┬────────┘                                       │
└───────────┼─────────────────────────────────────────────────┘
            │ consumo via Web Component
            ▼
┌─────────────────────────────────────────────────────────────┐
│             apicenter-gateway (Web Component)               │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Gateway List │  │ Gateway Form │  │ Backend List │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼────────────────┼─────────────────┼───────────────┘
          │                │                 │
          ▼                ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│              Mock Server (Node.js + Express)                │
│                    http://localhost:4000                    │
│                                                             │
│  GET/POST/PUT/DELETE/PATCH /v1/gateways                     │
│  GET/POST                                          /v1/backends │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Tecnologias Utilizadas

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Frontend | Angular | 21.2 |
| Linguagem | TypeScript | ~5.9 |
| Estilos | SCSS | — |
| Mock Server | Node.js + Express | — |
| Especificação API | OpenAPI / Swagger | 3.1 |
| Requisições HTTP | @angular/common/http | — |
| Reatividade | RxJS | ~7.8 |

### 2.3 Padrão de Projeto

- **Micro-frontend**: O gateway é desenvolvido como um web component independente, consumido pelo shell do API Center.
- **Angular Elements**: Utiliza `@angular/elements` para expor componentes Angular como elementos HTML personalizados (ex: `<apicenter-gateway-list>`).
- **Arquitetura baseada em componentes**: Separação clara entre modelos (DTOs), serviços (camada de dados) e componentes (camada de apresentação).

---

## 3. Estrutura de Pastas

```
apicenter-gateway/
├── mock-server/                  # Servidor simulado da API
│   ├── server.js                 # Endpoints mock (porta 4000)
│   └── package.json              # Dependências do mock-server
├── apicenter-gateway/            # Aplicação Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/           # Interfaces TypeScript (DTOs)
│   │   │   │   ├── gateway.model.ts
│   │   │   │   └── backend.model.ts
│   │   │   ├── services/         # Camada de serviços (HttpClient)
│   │   │   │   └── gateway.service.ts
│   │   │   ├── gateway-list/     # Componente de listagem
│   │   │   │   ├── gateway-list.ts
│   │   │   │   ├── gateway-list.html
│   │   │   │   └── gateway-list.scss
│   │   │   ├── app.config.ts     # Configuração global (providers)
│   │   │   ├── app.routes.ts     # Definição de rotas
│   │   │   ├── app.ts            # Componente raiz
│   │   │   └── app.html          # Template raiz
│   │   ├── assets/
│   │   │   └── swagger_gateway.json  # Especificação OpenAPI 3.1
│   │   ├── main.ts               # Entry point da aplicação
│   │   ├── index.html            # HTML principal
│   │   └── styles.scss           # Estilos globais
│   ├── angular.json              # Configuração Angular CLI
│   ├── package.json              # Dependências Angular
│   ├── tsconfig.json             # Configuração TypeScript
│   └── README.md
├── DOCUMENTACAO.md               # Este arquivo
```

---

## 4. Endpoints da API

Todos os endpoints estão disponíveis no mock server em `http://localhost:4000`.

### 4.1 Gateways

| Método | Endpoint | Descrição | Corpo da Requisição | Resposta |
|--------|----------|-----------|---------------------|----------|
| `GET` | `/v1/gateways` | Lista todos os gateways | — | `GatewayResponseDTO[]` |
| `GET` | `/v1/gateways/{id}` | Busca gateway por ID | — | `GatewayResponseDTO` |
| `POST` | `/v1/gateways` | Cria um novo gateway | `GatewayCreateDTO` | `GatewayResponseDTO` |
| `PUT` | `/v1/gateways/{id}` | Atualiza gateway existente | `GatewayUpdateDTO` | `GatewayResponseDTO` |
| `DELETE` | `/v1/gateways/{id}` | Remove um gateway | — | `200 OK` |
| `PATCH` | `/v1/gateways/{id}/ativar` | Ativa um gateway | `{}` | `GatewayResponseDTO` |
| `PATCH` | `/v1/gateways/{id}/desativar` | Desativa um gateway | `{}` | `GatewayResponseDTO` |

### 4.2 Backends

| Método | Endpoint | Descrição | Corpo da Requisição | Resposta |
|--------|----------|-----------|---------------------|----------|
| `GET` | `/v1/backends` | Lista backends (paginado) | — | `PageBackendResponseDTO` |
| `GET` | `/v1/backends/{id}` | Busca backend por ID | — | `BackendResponseDTO` |
| `POST` | `/v1/backends` | Cria um novo backend | `BackendCreateDTO` | `BackendResponseDTO` |

### 4.3 Saúde do Servidor

| Método | Endpoint | Descrição | Resposta |
|--------|----------|-----------|----------|
| `GET` | `/health` | Verifica se o servidor está online | `{ status: "UP", timestamp: "..." }` |

---

## 5. Modelos de Dados (DTOs)

Todos os modelos estão definidos em `src/app/models/`.

### 5.1 GatewayResponseDTO

Representa um gateway retornado pela API.

```typescript
interface GatewayResponseDTO {
  id: number;                      // Identificador único
  nome: string;                    // Nome do gateway
  enderecoIp: string;              // Endereço IP
  ativo: boolean;                  // Status ativo/inativo
  contextPath: string;             // Caminho de contexto
  gitlabId: number;                // ID do projeto no GitLab
  tags: string[];                  // Tags de classificação
  porta: string;                   // Porta de comunicação
  tentativasRetentativa: number;   // Tentativas de retry (0-10)
  host: string;                    // Host do gateway
  descricao: string;               // Descrição detalhada
  urlMetricas: string;             // URL de métricas
  urlInterna: string;              // URL interna
  urlExterna: string;              // URL externa
  rateLimit: number;               // Limite de requisições (1-10000)
  backendIds: number[];            // IDs dos backends vinculados
  backends: GatewayBackendResponseDTO[]; // Backends associados
}
```

### 5.2 GatewayBackendResponseDTO

```typescript
interface GatewayBackendResponseDTO {
  id: number;
  descricao: string;
  status: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOWN';
  baseUrl: string;
}
```

### 5.3 GatewayCreateDTO

```typescript
interface GatewayCreateDTO {
  nome: string;
  enderecoIp: string;
  ativo: boolean;
  contextPath: string;
  gitlabId: number;
  tags: string[];
  porta: string;
  tentativasRetentativa: number;
  backendIds: number[];   // Obrigatório
  host: string;
  descricao: string;
  urlMetricas: string;
  urlInterna: string;
  urlExterna: string;
  rateLimit: number;      // Obrigatório (1-10000)
}
```

### 5.4 GatewayUpdateDTO

```typescript
interface GatewayUpdateDTO {
  nome?: string;
  enderecoIp?: string;
  ativo?: boolean;
  contextPath?: string;
  gitlabId?: number;
  tags?: string[];
  porta?: string;
  tentativasRetentativa?: number;
  backendIds?: number[];
  host?: string;
  descricao?: string;
  urlMetricas?: string;
  urlInterna?: string;
  urlExterna?: string;
  rateLimit?: number;
}
```

### 5.5 BackendResponseDTO

```typescript
interface BackendResponseDTO {
  id: number;
  nome: string;
  descricao: string;
  versao: string;
  gitlabId: number;
  status: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOWN';
  ultimoStatus: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOWN';
  ambiente: 'DEV' | 'HML' | 'PRD';
  responsavel: string;
  baseUrl: string;
  urlRepo: string;
  urlDocumentacao: string;
  urlLogs: string;
  urlHealthCheck: string;
  apiNumero: string;
  stack: string[];
  techTags: string[];
  detalhesErro: string;
  dataUltimaVerificacao: string;
  gatewayId: number;
}
```

### 5.6 BackendCreateDTO

```typescript
interface BackendCreateDTO {
  nome: string;
  descricao: string;
  versao: string;
  gitlabId: number;
  status: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOWN';
  ultimoStatus: 'UP' | 'DOWN' | 'DEGRADED' | 'UNKNOWN';
  ambiente: 'DEV' | 'HML' | 'PRD';
  responsavel: string;
  baseUrl: string;
  urlRepo: string;
  urlDocumentacao: string;
  urlLogs: string;
  urlHealthCheck: string;
  apiNumero: string;
  stack: string[];
  techTags: string[];
  detalhesErro: string;
  dataUltimaVerificacao: string;
}
```

### 5.7 PageBackendResponseDTO

Resposta paginada para listagem de backends.

```typescript
interface PageBackendResponseDTO {
  totalElements: number;   // Total de elementos
  totalPages: number;      // Total de páginas
  size: number;            // Tamanho da página
  content: BackendResponseDTO[]; // Itens da página atual
  number: number;          // Número da página atual (base 0)
  first: boolean;          // É a primeira página?
  last: boolean;           // É a última página?
  empty: boolean;          // Página vazia?
}
```

---

## 6. Serviços

### 6.1 GatewayService

Localizado em: `src/app/services/gateway.service.ts`

Responsável por todas as comunicações HTTP com a API de gateways.

**URL base:** `http://localhost:4000/v1/gateways`

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `listar()` | `Observable<GatewayResponseDTO[]>` | Lista todos os gateways |
| `buscarPorId(id: number)` | `Observable<GatewayResponseDTO>` | Busca gateway pelo ID |
| `criar(gateway: GatewayCreateDTO)` | `Observable<GatewayResponseDTO>` | Cadastra novo gateway |
| `atualizar(id, gateway: GatewayUpdateDTO)` | `Observable<GatewayResponseDTO>` | Atualiza gateway existente |
| `deletar(id: number)` | `Observable<void>` | Remove um gateway |
| `ativar(id: number)` | `Observable<GatewayResponseDTO>` | Ativa um gateway |
| `desativar(id: number)` | `Observable<GatewayResponseDTO>` | Desativa um gateway |

---

## 7. Componentes

### 7.1 GatewayList

Localizado em: `src/app/gateway-list/`

Componente responsável por exibir a lista de gateways cadastrados.

**Seletor:** `gateway-list`

**Propriedades:**
- `gateways: GatewayResponseDTO[]` — Lista de gateways carregados
- `carregando: boolean` — Estado de carregamento
- `error: string \| null` — Mensagem de erro, se houver

**Métodos:**
- `ngOnInit()` — Dispara a chamada `listar()` ao iniciar
- `getStatus(ativo: boolean): string` — Retorna "Ativo" ou "Inativo"

**Nota:** O template HTML e estilos SCSS são de responsabilidade de outra pessoa da equipe (frontend/UI).

---

## 8. Configuração e Rotas

### 8.1 app.config.ts

Configura providers globais da aplicação, incluindo `provideHttpClient()` para habilitar requisições HTTP.

### 8.2 app.routes.ts

```typescript
export const routes: Routes = [
  { path: 'gateways', component: GatewayList },
  { path: '', redirectTo: '/gateways', pathMatch: 'full' }
];
```

### 8.3 app.html

Contém `<router-outlet></router-outlet>` para renderização das rotas e link de navegação para `/gateways`.

---

## 9. Como Rodar o Projeto

### 9.1 Pré-requisitos

- Node.js instalado
- npm (gerenciador de pacotes)

### 9.2 Passo 1 — Iniciar o Mock Server

O mock-server simula a API real enquanto o backend não está disponível.

```bash
# Navegue até a pasta do mock-server
cd mock-server

# Instale as dependências (apenas na primeira vez)
npm install

# Inicie o servidor
npm start
```

O mock-server ficará disponível em: **`http://localhost:4000`**

### 9.3 Passo 2 — Iniciar o Angular

```bash
# Navegue até a pasta do Angular
cd apicenter-gateway

# Inicie o servidor de desenvolvimento
npm start
```

O Angular ficará disponível em: **`http://localhost:4200`**

Acesse a tela de gateways em: **`http://localhost:4200/gateways`**

### 9.4 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia servidor de desenvolvimento (Angular) |
| `npm run build` | Gera build para produção |
| `npm test` | Executa testes unitários |
| `cd mock-server && npm start` | Inicia o mock-server |

---

## 10. Swagger / OpenAPI

A especificação da API está disponível em:

```
src/assets/swagger_gateway.json
```

**Formato:** OpenAPI 3.1.0

Este arquivo é a fonte da verdade para os contratos da API. Sempre consulte-o antes de implementar novos endpoints ou alterar modelos de dados.

### Como usar o Swagger:

1. Abra o arquivo `swagger_gateway.json`
2. Identifique os endpoints em `paths`
3. Verifique os modelos de dados em `components.schemas`
4. Use as informações para criar ou atualizar os DTOs TypeScript em `src/app/models/`

---

## 11. Divisão de Trabalho

| Responsabilidade | Quem |
|-----------------|------|
| Lógica TypeScript, serviços, rotas, configuração | Você (desenvolvedor do gateway) |
| HTML, CSS, design das telas | Outra pessoa da equipe (frontend/UI) |

---

## 12. Próximos Passos Sugeridos

1. ✅ Corrigir bugs nos models e serviço (concluído)
2. ⬜ Criar componente `backend-list` para listagem de backends
3. ⬜ Criar formulários para cadastro/edição de gateways e backends
4. ⬜ Implementar tratativa detalhada de erros HTTP
5. ⬜ Transformar componente em Web Component (Angular Elements) para consumo pelo shell
6. ⬜ Configurar build para produção
7. ⬜ Substituir mock-server pela API real quando disponível
8. ⬜ Implementar autenticação (Bearer Token / JWT, conforme Swagger)

---

## 13. Referências

- [OpenAPI Specification 3.1](https://spec.openapis.org/oas/v3.1.0)
- [Angular Documentation](https://angular.io/docs)
- [@angular/elements (Web Components)](https://angular.io/guide/elements)
- Swagger do projeto: `src/assets/swagger_gateway.json`

---

> 📌 **Nota:** Este documento é mantido pela equipe de desenvolvimento do APICenter Gateway. Qualquer alteração na arquitetura ou endpoints deve ser refletida aqui.