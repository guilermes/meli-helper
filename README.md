# Meli Helper

Plataforma web para auxiliar sellers do **Mercado Livre** na gestão de anúncios, com cálculo automático de frete, lucro e margem. O sistema centraliza cadastro de produtos, configuração de taxas e análise financeira em uma interface simples e acessível.

---

## Visão geral

Vendedores iniciantes frequentemente erram na precificação por não considerar comissão da plataforma, impostos, frete e custos operacionais. O **Meli Helper** automatiza esses cálculos e exibe o resultado de forma clara, ajudando na tomada de decisão antes de publicar ou ajustar um anúncio.

### Principais funcionalidades

- Cadastro e login com JWT
- Perfil do usuário (nome, loja, nicho, senha — e-mail não editável)
- CRUD de anúncios com tipo **Clássico (12%)** ou **Premium (18%)**
- Cálculo automático de frete via microsserviço (cubagem + tabela ML)
- Cálculo de lucro e margem conforme o tipo do anúncio
- Configuração de imposto (%) e custo operacional fixo
- Dashboard com KPIs, alertas, ranking e insights
- Lista de produtos com paginação, busca e edição
- Documentação interativa da API (Swagger)

---

## Arquitetura

O projeto é composto por **dois serviços Node.js** e um frontend estático servido pela API principal:

```
┌─────────────────┐     HTTP      ┌──────────────────┐     HTTP      ┌─────────────────┐
│   Navegador     │ ────────────► │  meli-helper-api │ ────────────► │  frete-service  │
│  (Bootstrap)    │   :3000       │  Express + Prisma│   :4000       │  Cálculo frete  │
└─────────────────┘               └────────┬─────────┘               └─────────────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │  SQLite (Prisma) │
                                  └─────────────────┘
```

| Módulo | Pasta | Porta | Descrição |
|--------|-------|-------|-----------|
| API + Frontend | `meli-helper-api/` | 3000 | REST API, autenticação, regras de negócio e telas HTML |
| Microsserviço de Frete | `frete-service/` | 4000 | Cálculo de frete por peso, cubagem e faixa de preço |
| Frontend React *(opcional)* | `client/` | 5173 | Versão em React/Vite em desenvolvimento |

---

## Tecnologias

| Camada | Stack |
|--------|-------|
| Backend | Node.js, Express 5, Prisma ORM |
| Banco de dados | SQLite |
| Frontend (ativo) | HTML5, JavaScript, Bootstrap 5 |
| Autenticação | JWT + bcrypt |
| Documentação | Swagger UI |
| Microsserviço | Express (frete-service) |

---

## Estrutura do repositório

```
meli-helper-vc/
├── meli-helper-api/          # API principal + frontend estático
│   ├── prisma/               # Schema, migrations e seed
│   ├── public/               # Telas HTML e assets (js/, css)
│   └── src/
│       ├── controllers/      # Lógica das rotas
│       ├── routes/           # Definição de endpoints
│       ├── services/         # Regras de negócio (cálculos)
│       └── middlewares/      # Autenticação JWT
├── frete-service/            # Microsserviço de frete
└── client/                   # Frontend React (alternativo)
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) **18+** (recomendado 20+)
- npm (incluso no Node.js)
- Git

> Não é necessário instalar PostgreSQL. O projeto usa **SQLite** localmente.

---

## Instalação e execução

### 1. Clonar o repositório

```bash
git clone https://github.com/guilermes/meli-helper.git
cd meli-helper-vc
```

### 2. Configurar a API principal

```bash
cd meli-helper-api
```

Crie o arquivo `.env` na pasta `meli-helper-api/`:

```env
DATABASE_URL="file:./dev.db"
```

Instale as dependências e prepare o banco:

```bash
npm install
npx prisma migrate dev
```

**Opcional — popular o banco com dados de teste:**

```bash
node prisma/seed.js
```

> A seed cria 100 anúncios para o usuário `dan@email.com` (senha padrão: `123456`, se criado pela seed).

Inicie a API:

```bash
npm run dev
```

A API ficará disponível em **http://localhost:3000**

### 3. Configurar o microsserviço de frete

Em **outro terminal**:

```bash
cd frete-service
npm install
node index.js
```

O serviço de frete ficará em **http://localhost:4000**

> ⚠️ O cálculo de frete nos anúncios depende deste serviço estar rodando. Sem ele, o frete retorna `0` como fallback.

### 4. Acessar o sistema

| Recurso | URL |
|---------|-----|
| Login | http://localhost:3000/index.html |
| Cadastro | http://localhost:3000/register.html |
| Dashboard | http://localhost:3000/dashboard.html |
| Swagger (API) | http://localhost:3000/api-docs |
| Swagger (Frete) | http://localhost:4000/docs |

---

## Fluxo de uso

1. Crie uma conta em `/register.html` (senha com confirmação)
2. Faça login em `/index.html`
3. Configure impostos e custo operacional em **Config**
4. Cadastre anúncios escolhendo **Clássico** ou **Premium**
5. Acompanhe margens no **Dashboard** e na **Lista de Produtos**
6. Edite seu perfil em **Perfil** (e-mail não pode ser alterado)

---

## Regras de cálculo

### Peso utilizado

```
Peso Cúbico = (Largura × Altura × Comprimento) / 6000
Peso Utilizado = max(Peso Real, Peso Cúbico)
```

### Comissão Mercado Livre

| Tipo | Taxa |
|------|------|
| Clássico | 12% |
| Premium | 18% |

### Lucro e margem

```
Lucro = Preço − Custo − Frete − Imposto − Custo Operacional − Comissão
Margem (%) = (Lucro / Preço) × 100
```

O frete é obtido pelo microsserviço com base na tabela tarifária do Mercado Livre (faixas de preço × faixas de peso).

---

## API — endpoints principais

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/register` | — | Cadastro de usuário |
| POST | `/login` | — | Login (retorna JWT) |
| GET | `/profile` | ✅ | Dados do perfil |
| PUT | `/profile` | ✅ | Atualizar perfil |
| GET | `/anuncios` | ✅ | Listar anúncios (paginação) |
| POST | `/anuncios` | ✅ | Criar anúncio |
| PUT | `/anuncios/:id` | ✅ | Atualizar anúncio |
| DELETE | `/anuncios/:id` | ✅ | Excluir anúncio |
| GET/PUT | `/config` | ✅ | Configurações financeiras |
| POST | `/calcular-frete` | ✅ | Proxy para frete-service |

Rotas autenticadas exigem o header:

```
Authorization: Bearer SEU_TOKEN_JWT
```

---

## Frontend React (opcional)

Existe uma versão alternativa em React na pasta `client/`. Para executá-la:

```bash
cd client
npm install
npm run dev
```

Ela roda separadamente (porta padrão do Vite: **5173**) e ainda não substitui o frontend Bootstrap em produção local.

---

## Equipe

| Nome | Papel |
|------|-------|
| Daniel Fernando | Fullstack Developer & DB Specialist |
| Guilherme Nobrega | Fullstack Developer & Software Architect |

---

## Roadmap

- [ ] Integração com APIs oficiais do Mercado Livre
- [ ] Gráficos interativos no dashboard
- [ ] Sugestão de preço com IA
- [ ] Deploy em nuvem (AWS / Render / Vercel)
- [ ] Suporte multi-marketplace (Shopee, Amazon, etc.)
- [ ] Consolidar frontend React como interface principal

---

## Links do projeto
- [Site na Vercel](https://meli-helper-g1qi6wf8a-guilermes-projects.vercel.app/)
- [Quadro Jira](https://gabrielpozza335-1775085903755.atlassian.net/jira/software/projects/MH/boards/102/backlog)

---

## Licença

Projeto acadêmico / integrador — uso educacional.
