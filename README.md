# Meli Helper

Plataforma web para auxiliar sellers do **Mercado Livre** na gestão de anúncios, com cálculo automático de frete, lucro e margem. O sistema centraliza cadastro de produtos, configuração de taxas e análise financeira em uma interface moderna e acessível.

---

## Visão geral

Vendedores iniciantes frequentemente erram na precificação por não considerar comissão da plataforma, impostos, frete e custos operacionais. O **Meli Helper** automatiza esses cálculos e exibe o resultado de forma clara, ajudando na tomada de decisão antes de publicar ou ajustar um anúncio.

### Principais funcionalidades

- Cadastro e login com autenticação via **cookie HttpOnly + JWT**
- Perfil do usuário (nome, loja, nicho, nível de seller — e-mail não editável)
- CRUD de anúncios com tipo **Clássico (12%)** ou **Premium (18%)**
- Cálculo automático de frete via microsserviço (cubagem + tabela real do ML com 28 faixas de peso × 8 faixas de preço)
- Cálculo de lucro líquido e margem percentual por anúncio
- Configuração de imposto (%) e custo operacional fixo por usuário
- Dashboard com KPIs, alertas de margem crítica, ranking top 4 e insights operacionais
- Lista de produtos com paginação, busca e edição inline
- **Frontend React + TypeScript** (Vite) como interface principal
- Documentação interativa da API (Swagger UI)

---

## Arquitetura

O projeto é composto por **dois serviços Node.js** e um frontend React independente:

```
┌──────────────────────┐    HTTPS     ┌──────────────────────┐    HTTPS     ┌──────────────────┐
│   React (Vercel)     │ ──────────►  │  meli-helper-api     │ ──────────►  │  frete-service   │
│  React 19 + Vite 8   │   /api       │  Express 5 + Prisma  │   /calcular  │  Express (Render)│
│  Mantine + Tailwind  │              │  Cookie JWT + CORS   │              │  Tabela ML real  │
└──────────────────────┘              └──────────┬───────────┘              └──────────────────┘
                                                 │
                                                 ▼
                                      ┌──────────────────────┐
                                      │   Neon (PostgreSQL)  │
                                      │   Prisma ORM + SSL   │
                                      └──────────────────────┘
```

| Módulo | Pasta | Porta local | Descrição |
|--------|-------|-------------|-----------|
| API principal | `meli-helper-api/` | 3000 | REST API, autenticação, regras de negócio |
| Microsserviço de Frete | `frete-service/` | 4000 | Cálculo de frete por cubagem e tabela ML |
| Frontend React | `client/` | 5173 | Interface principal em React 19 + TypeScript |

---

## Tecnologias

| Camada | Stack |
|--------|-------|
| Backend | Node.js, Express 5, Prisma ORM 5 |
| Banco de dados | **Neon (PostgreSQL)** — serverless, SSL |
| Frontend | **React 19**, TypeScript, Vite 8 |
| UI / Componentes | Mantine 9, Tailwind CSS 4, Tabler Icons |
| Autenticação | **JWT via cookie HttpOnly** + bcrypt 6 |
| HTTP Client | Axios |
| Roteamento | React Router DOM 7 |
| Documentação | Swagger UI |
| Deploy | **Vercel** (API + Frontend) · **Render** (frete-service) |

---

## Estrutura do repositório

```
meli-helper/
├── meli-helper-api/              # API principal
│   ├── prisma/
│   │   ├── schema.prisma         # Models: User, Anuncio, Configuracao
│   │   ├── migrations/           # Migrations PostgreSQL
│   │   └── seed.js               # 100 anúncios de teste
│   ├── public/                   # Telas HTML legadas (Bootstrap)
│   └── src/
│       ├── config/swagger.js     # Configuração Swagger
│       ├── controllers/          # authController, anuncioController,
│       │                         # configController, dashboardController, userController
│       ├── routes/               # authRoutes, anuncioRoutes, configRoutes,
│       │                         # dashboardRoutes, userRoutes
│       ├── services/             # anuncioService (cálculo de lucro e margem)
│       ├── middlewares/
│       │   └── authMiddleware.js # Leitura do cookie HttpOnly + jwt.verify
│       └── server.js             # CORS configurado para Vercel + localhost
├── frete-service/                # Microsserviço de frete
│   ├── controllers/freteController.js
│   ├── services/freteService.js  # Tabela ML: 28 faixas de peso × 8 de preço
│   ├── routes/freteRoutes.js
│   └── index.js
└── client/                       # Frontend React (interface principal)
    ├── src/
    │   ├── components/           # NavBar, Footer, KPICards, RankingMargem,
    │   │                         # Dashboard widgets, ProductTable, LoginForm,
    │   │                         # SignupForm, AlertasOperacionais, InsightsOperacionais
    │   ├── pages/                # Home, Login, Signup, Dashboard, ProductList,
    │   │                         # ProductCreate, Config, Profile, About
    │   ├── routes/appRoutes.tsx  # React Router com todas as rotas
    │   ├── context/authContext.tsx
    │   ├── services/
    │   │   ├── api.ts            # Axios para meli-helper-api
    │   │   └── freteApi.ts       # Axios para frete-service
    │   └── types/types.ts
    ├── tailwind.config.js
    └── vite.config.ts
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) **18+** (recomendado 20+)
- npm (incluso no Node.js)
- Conta no [Neon](https://neon.tech/) (banco PostgreSQL serverless — plano gratuito disponível)

---

## Instalação e execução local

### 1. Clonar o repositório

```bash
git clone https://github.com/guilermes/meli-helper.git
cd meli-helper
```

### 2. Configurar a API principal

```bash
cd meli-helper-api
```

Crie o arquivo `.env` em `meli-helper-api/`:

```env
DATABASE_URL="postgresql://usuario:senha@host/banco?sslmode=require"
JWT_SECRET="seu_segredo_jwt_aqui"
FRONTEND_URL="http://localhost:5173"
```

> Obtenha a `DATABASE_URL` no painel do [Neon](https://neon.tech/) → Connection string.

Instale as dependências e aplique as migrations:

```bash
npm install
npx prisma migrate dev
```

**Opcional — popular o banco com dados de teste:**

```bash
node prisma/seed.js
```

> A seed cria 100 anúncios para `dan@email.com` (senha: `123456`).

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

> ⚠️ O cálculo de frete depende deste serviço estar rodando. Sem ele, o frete retorna `0` como fallback.

### 4. Configurar o frontend React

Em **outro terminal**:

```bash
cd client
npm install
npm run dev
```

O frontend ficará em **http://localhost:5173**

### 5. Acessar o sistema

| Recurso | URL |
|---------|-----|
| Frontend React | http://localhost:5173 |
| Dashboard | http://localhost:5173/dashboard |
| Anúncios | http://localhost:5173/anuncios |
| Swagger (API) | http://localhost:3000/api-docs |
| Swagger (Frete) | http://localhost:4000/docs |

---

## Fluxo de uso

1. Acesse **http://localhost:5173** e crie uma conta
2. Faça login — o token JWT é armazenado em **cookie HttpOnly** (não exposto ao JavaScript)
3. Configure impostos e custo operacional em **Config**
4. Cadastre anúncios informando dimensões, peso, custo e preço de venda
5. Acompanhe margens no **Dashboard** (KPIs, alertas, ranking top 4, insights)
6. Gerencie anúncios em **Meus Anúncios** (edição, exclusão, busca)
7. Edite seu perfil em **Perfil** (e-mail não pode ser alterado)

---

## Segurança

| Mecanismo | Implementação |
|-----------|--------------|
| Autenticação | JWT assinado com `JWT_SECRET` (variável de ambiente) |
| Armazenamento do token | **Cookie HttpOnly** — inacessível ao JavaScript do browser |
| Hash de senha | bcrypt 6 (salt automático) |
| CORS | Configurado para aceitar apenas `FRONTEND_URL` e `*.vercel.app` |
| Isolamento de dados | Todas as queries filtram por `userId` do token |
| Banco | Neon PostgreSQL com `sslmode=require` |

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
Comissão    = Preço × (12% ou 18%)
Frete       = tabela ML [faixa de peso][faixa de preço]
Imposto     = Preço × imposto%  (configurável)
Lucro       = Preço − Custo − Frete − Imposto − Custo Operacional − Comissão
Margem (%)  = (Lucro / Preço) × 100
```

O frete é obtido pelo `frete-service` usando uma tabela com **28 faixas de peso** (0,3 kg até 150 kg) × **8 faixas de preço** (até R$ 18,99 até R$ 199,99+), replicando a tarifa real do Mercado Envios.

---

## API — endpoints principais

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/register` | — | Cadastro de usuário |
| POST | `/login` | — | Login (define cookie JWT) |
| POST | `/logout` | ✅ | Logout (limpa cookie) |
| GET | `/users/profile` | ✅ | Dados do perfil |
| PUT | `/users/profile` | ✅ | Atualizar perfil |
| GET | `/anuncios` | ✅ | Listar anúncios (paginação + busca) |
| POST | `/anuncios` | ✅ | Criar anúncio |
| PUT | `/anuncios/:id` | ✅ | Atualizar anúncio |
| DELETE | `/anuncios/:id` | ✅ | Excluir anúncio |
| GET | `/dashboard` | ✅ | KPIs, alertas, ranking e insights |
| GET/PUT | `/config` | ✅ | Configurações financeiras |

Rotas autenticadas leem o token automaticamente do **cookie HttpOnly** — sem necessidade de enviar header `Authorization` manualmente.

Documentação completa e interativa disponível em `/api-docs` (Swagger UI).

---

## Deploy em produção

| Serviço | Plataforma | Variáveis de ambiente necessárias |
|---------|------------|----------------------------------|
| `meli-helper-api` + frontend | **Vercel** | `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL` |
| `frete-service` | **Render** | — |
| Banco de dados | **Neon** | (fornece a `DATABASE_URL`) |

> O frontend React é buildado (`npm run build`) e servido como site estático na Vercel. A API Express é deploiada como serverless function na mesma conta.

---

## Schema do banco (PostgreSQL)

```prisma
model User {
  id           Int           @id @default(autoincrement())
  nome         String
  nomeLoja     String
  email        String        @unique
  senha        String        // hash bcrypt
  nicho        String?
  nivelSeller  String?
  avatar       String?
  createdAt    DateTime      @default(now())
  anuncios     Anuncio[]
  configuracao Configuracao?
}

model Anuncio {
  id             Int     @id @default(autoincrement())
  idMercadoLivre String?
  nome           String
  marca          String
  tipoAnuncio    String  @default("CLASSICO")  // "CLASSICO" | "PREMIUM"
  custo          Float
  precoVenda     Float
  frete          Float?
  largura        Float?
  altura         Float?
  comprimento    Float?
  peso           Float?
  userId         Int
  user           User    @relation(...)
}

model Configuracao {
  id               Int    @id @default(autoincrement())
  imposto          Float?
  custoOperacional Float?
  userId           Int    @unique
  user             User   @relation(...)
}
```

---

## Equipe

| Nome | Papel |
|------|-------|
| Daniel Fernando | Fullstack Developer & DB Specialist |
| Guilherme Nobrega | Fullstack Developer & Software Architect |

---

## Roadmap

- [x] Autenticação JWT via cookie HttpOnly
- [x] CRUD de anúncios com cálculo automático de lucro e margem
- [x] Microsserviço de frete com tabela real do Mercado Envios
- [x] Dashboard com KPIs, alertas, ranking e insights
- [x] Frontend React 19 + TypeScript + Mantine + Tailwind
- [x] CORS configurado para Vercel
- [x] Migração para PostgreSQL (Neon)
- [ ] Deploy em produção (Vercel + Render + Neon)
- [ ] Gráficos interativos no dashboard (histórico de margem)
- [ ] Sugestão de preço com IA
- [ ] Integração com APIs oficiais do Mercado Livre
- [ ] Suporte multi-marketplace (Shopee, Amazon, etc.)

---

## Links

- [Repositório GitHub](https://github.com/guilermes/meli-helper)
- [Quadro Jira](https://gabrielpozza335-1775085903755.atlassian.net/jira/software/projects/MH/boards/102/backlog)
- [Confluece documentation](https://meli-helper.atlassian.net/wiki/spaces/DDS/pages/edit-v2/229492?)

---

## Licença

Projeto acadêmico / integrador — uso educacional.
