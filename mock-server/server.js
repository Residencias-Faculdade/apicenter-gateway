const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ============================================
// DADOS EM MEMÓRIA (simulando banco de dados)
// ============================================

let gateways = [
  {
    id: 1,
    nome: 'Gateway Pagamentos',
    enderecoIp: '192.168.1.10',
    ativo: true,
    contextPath: '/pagamentos',
    gitlabId: 101,
    tags: ['pagamento', 'producao'],
    porta: '8080',
    tentativasRetentativa: 3,
    host: 'gw-pag.internal',
    descricao: 'Gateway para processamento de pagamentos',
    urlMetricas: 'http://metrics:9090',
    urlExterna: 'https://pag.empresa.com',
    urlInterna: 'http://pag.internal:8080',
    rateLimit: 1000,
    backendIds: [1, 2],
    backends: [
      { id: 1, descricao: 'Backend Pagamentos', status: 'UP', baseUrl: 'https://pag-api.empresa.com' },
      { id: 2, descricao: 'Backend Cadastro', status: 'UP', baseUrl: 'https://cad-api.empresa.com' }
    ]
  },
  {
    id: 2,
    nome: 'Gateway Cadastro',
    enderecoIp: '192.168.1.20',
    ativo: true,
    contextPath: '/cadastro',
    gitlabId: 102,
    tags: ['cadastro', 'hml'],
    porta: '8081',
    tentativasRetentativa: 2,
    host: 'gw-cad.internal',
    descricao: 'Gateway de cadastro de clientes',
    urlMetricas: '',
    urlExterna: '',
    urlInterna: '',
    rateLimit: 500,
    backendIds: [3],
    backends: [
      { id: 3, descricao: 'Backend Clientes', status: 'DOWN', baseUrl: 'https://clientes-api.empresa.com' }
    ]
  },
  {
    id: 3,
    nome: 'Gateway Relatorios',
    enderecoIp: '192.168.1.30',
    ativo: false,
    contextPath: '/relatorios',
    gitlabId: 103,
    tags: ['relatorio', 'hml'],
    porta: '8082',
    tentativasRetentativa: 5,
    host: 'gw-rel.internal',
    descricao: 'Gateway de relatórios gerenciais',
    urlMetricas: '',
    urlExterna: '',
    urlInterna: '',
    rateLimit: 200,
    backendIds: [],
    backends: []
  }
];

let backends = [
  {
    id: 1,
    nome: 'Backend Pagamentos',
    descricao: 'Processa pagamentos',
    versao: '1.0.0',
    gitlabId: 201,
    status: 'UP',
    ultimoStatus: 'UP',
    ambiente: 'PRD',
    responsavel: 'equipe.pagamentos',
    baseUrl: 'https://pag-api.empresa.com',
    urlRepo: 'https://gitlab.empresa.com/pagamentos',
    urlDocumentacao: 'https://docs.empresa.com/pagamentos',
    urlLogs: 'https://logs.empresa.com/pagamentos',
    urlHealthCheck: 'https://pag-api.empresa.com/health',
    apiNumero: 'API-001',
    stack: ['Java', 'Spring Boot'],
    techTags: ['pagamento', 'cartao'],
    detalhesErro: '',
    dataUltimaVerificacao: '2026-10-17T10:00:00Z',
    gatewayId: 1
  },
  {
    id: 2,
    nome: 'Backend Cadastro',
    descricao: 'Cadastro de clientes',
    versao: '2.1.0',
    gitlabId: 202,
    status: 'UP',
    ultimoStatus: 'UP',
    ambiente: 'HML',
    responsavel: 'equipe.cadastro',
    baseUrl: 'https://cad-api.empresa.com',
    urlRepo: 'https://gitlab.empresa.com/cadastro',
    urlDocumentacao: 'https://docs.empresa.com/cadastro',
    urlLogs: 'https://logs.empresa.com/cadastro',
    urlHealthCheck: 'https://cad-api.empresa.com/health',
    apiNumero: 'API-002',
    stack: ['Node.js', 'Express'],
    techTags: ['cadastro', 'cliente'],
    detalhesErro: '',
    dataUltimaVerificacao: '2026-10-17T10:00:00Z',
    gatewayId: 1
  },
  {
    id: 3,
    nome: 'Backend Clientes',
    descricao: 'Gerencia dados de clientes',
    versao: '3.0.0',
    gitlabId: 203,
    status: 'DOWN',
    ultimoStatus: 'DOWN',
    ambiente: 'DEV',
    responsavel: 'equipe.clientes',
    baseUrl: 'https://clientes-api.empresa.com',
    urlRepo: 'https://gitlab.empresa.com/clientes',
    urlDocumentacao: 'https://docs.empresa.com/clientes',
    urlLogs: 'https://logs.empresa.com/clientes',
    urlHealthCheck: 'https://clientes-api.empresa.com/health',
    apiNumero: 'API-003',
    stack: ['Python', 'Django'],
    techTags: ['cliente', 'crud'],
    detalhesErro: 'Servidor fora do ar',
    dataUltimaVerificacao: '2026-10-17T09:30:00Z',
    gatewayId: 2
  }
];

let nextGatewayId = 4;
let nextBackendId = 4;

// ============================================
// ROTAS DE GATEWAYS
// ============================================

// GET /v1/gateways - Listar todos
app.get('/v1/gateways', (req, res) => {
  res.json(gateways);
});

// GET /v1/gateways/:id - Buscar por ID
app.get('/v1/gateways/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const gateway = gateways.find(g => g.id === id);
  if (!gateway) {
    return res.status(404).json({ message: 'Gateway não encontrado' });
  }
  res.json(gateway);
});

// POST /v1/gateways - Criar novo
app.post('/v1/gateways', (req, res) => {
  const novo = {
    id: nextGatewayId++,
    ...req.body,
    backends: req.body.backendIds ? req.body.backendIds.map(id => ({
      id,
      descricao: '',
      status: 'UNKNOWN',
      baseUrl: ''
    })) : []
  };
  gateways.push(novo);
  res.status(201).json(novo);
});

// PUT /v1/gateways/:id - Atualizar
app.put('/v1/gateways/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = gateways.findIndex(g => g.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Gateway não encontrado' });
  }
  gateways[index] = { ...gateways[index], ...req.body, id };
  res.json(gateways[index]);
});

// DELETE /v1/gateways/:id - Deletar
app.delete('/v1/gateways/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = gateways.findIndex(g => g.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Gateway não encontrado' });
  }
  gateways.splice(index, 1);
  res.status(200).json({ message: 'Gateway deletado com sucesso' });
});

// PATCH /v1/gateways/:id/ativar
app.patch('/v1/gateways/:id/ativar', (req, res) => {
  const id = parseInt(req.params.id);
  const gateway = gateways.find(g => g.id === id);
  if (!gateway) {
    return res.status(404).json({ message: 'Gateway não encontrado' });
  }
  gateway.ativo = true;
  res.json(gateway);
});

// PATCH /v1/gateways/:id/desativar
app.patch('/v1/gateways/:id/desativar', (req, res) => {
  const id = parseInt(req.params.id);
  const gateway = gateways.find(g => g.id === id);
  if (!gateway) {
    return res.status(404).json({ message: 'Gateway não encontrado' });
  }
  gateway.ativo = false;
  res.json(gateway);
});

// ============================================
// ROTAS DE BACKENDS
// ============================================

// GET /v1/backends - Listar com paginação
app.get('/v1/backends', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const size = parseInt(req.query.size) || 10;
  const start = page * size;
  const content = backends.slice(start, start + size);

  res.json({
    totalElements: backends.length,
    totalPages: Math.ceil(backends.length / size),
    size,
    content,
    number: page,
    first: page === 0,
    last: start + size >= backends.length,
    empty: content.length === 0
  });
});

// GET /v1/backends/:id - Buscar por ID
app.get('/v1/backends/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const backend = backends.find(b => b.id === id);
  if (!backend) {
    return res.status(404).json({ message: 'Backend não encontrado' });
  }
  res.json(backend);
});

// POST /v1/backends - Criar novo
app.post('/v1/backends', (req, res) => {
  const novo = {
    id: nextBackendId++,
    ...req.body,
    dataUltimaVerificacao: new Date().toISOString()
  };
  backends.push(novo);
  res.status(201).json(novo);
});

// ============================================
// ROTA DE SAÚDE
// ============================================

app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Mock server rodando em http://localhost:${PORT}`);
  console.log(`Endpoints disponíveis:`);
  console.log(`  GET    /v1/gateways`);
  console.log(`  GET    /v1/gateways/:id`);
  console.log(`  POST   /v1/gateways`);
  console.log(`  PUT    /v1/gateways/:id`);
  console.log(`  DELETE /v1/gateways/:id`);
  console.log(`  PATCH  /v1/gateways/:id/ativar`);
  console.log(`  PATCH  /v1/gateways/:id/desativar`);
  console.log(`  GET    /v1/backends`);
  console.log(`  GET    /v1/backends/:id`);
  console.log(`  POST   /v1/backends`);
});
