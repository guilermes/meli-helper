# Projeto Integrador: MeliHelper

> Solução de Software end-to-end para auxiliar novos sellers na jornada de vendas no **Mercado Livre**, automatizando cálculos de precificação, frete e análise de lucro.

---

## Visão Geral

Este projeto tem como objetivo desenvolver uma solução completa de software, abrangendo todo o ciclo de vida de desenvolvimento: desde o levantamento de requisitos até a implementação, testes e disponibilização da aplicação.

A solução foi projetada para resolver um problema real de negócio, utilizando boas práticas de engenharia de software, arquitetura escalável e tecnologias modernas de desenvolvimento.

O **Meli Helper** foi desenvolvido com o objetivo de ser um **hub de apoio para vendedores iniciantes**, reunindo em uma única aplicação diversas ferramentas essenciais para tomada de decisão.

O sistema permite:

- Cadastro e gerenciamento de anúncios;
- Cálculo automático de **lucro e margem**;
- Cálculo dinâmico de **frete baseado em cubagem**;
- Configuração de taxas (comissão, impostos, custos);
- Autenticação segura com JWT.

> **Foco inicial (MVP):** suporte exclusivo ao Mercado Livre.

---

## Problema de Negócio

Vendedores iniciantes enfrentam dificuldades como:

- Não saber calcular corretamente o lucro;
- Ignorar impacto do frete;
- Erros na precificação; e,
- Falta de ferramentas simples.

---

## Solução Proposta

O Meli Helper é uma plataforma web desenvolvida para automatizar cálculos complexos de taxas e fretes, transformando a gestão de anúncios em um processo ágil e intuitivo. Através de uma arquitetura baseada em microsserviços e uma API REST robusta, o sistema centraliza desde a autenticação segura do usuário até a análise detalhada de margem de lucro e rentabilidade.

### Tecnologias Utilizadas
Para garantir escalabilidade e uma interface responsiva, o projeto foi construído com:
 - Backend: Node.js, Express e Prisma ORM.
 - Frontend: HTML5, JavaScript e Bootstrap para uma UI/UX moderna.
 - Segurança & Docs: Autenticação via JWT e documentação interativa com Swagger.

### Diferenciais
 - Cálculo Automatizado: Resultados instantâneos de lucro líquido e margens.
 - Arquitetura Moderna: Uso de microsserviços para maior independência entre módulos.
 - Acessibilidade: Interface focada em produtividade, acessível via qualquer navegador.

---

## Arquitetura da Solução

O projeto segue o padrão **MVC (Model-View-Controller)**:

- **Model** → interação com banco de dados (Prisma)
- **View** → interface web (HTML + Bootstrap)
- **Controller** → regras de negócio e controle das rotas

Além disso, possui uma abordagem moderna com:

### 🔌 Microserviço de Frete

- Responsável exclusivamente pelo cálculo de frete.
- Baseado em:
    - Peso real;
    - Peso cúbico;
    - Faixa de preço.

### 📦 Cálculo de Peso

```
Peso cúbico = (Largura × Altura × Comprimento) / 6000
```

O sistema utiliza:

```
Peso utilizado = maior entre peso real e peso cúbico
```

### 🚚 Cálculo de Frete

- Baseado em tabela do Mercado Livre
- Considera:
    - Faixa de preço
    - Faixa de peso

### 💰 Cálculo de Lucro

```
Lucro = Preço - Custo - Frete - Comissão - Impostos - Custo Operacional
```

### 📊 Margem

```
Margem (%) = (Lucro / Preço) × 100
```

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** e o método TokenBearer para autenticação de usuários.

Fluxo:

1. Usuário realiza login
2. Recebe um token
3. Token é enviado no header:

```
Authorization: Bearer SEU_TOKEN
```

Fluxo resumido:

Login -> Token gerado (JWT) -> Token enviado no header (TokenBearer)

## Documentação do Projeto

- Link do confluence
- Link do Jira
- Link para o documento de requisitos

---

## Sprints 
Incluir tabela de sprints contendo: 
nº Sprint | objetivo | Data Inicio | Data Término 


## Tecnologias Utilizadas

- **Linguagem**: JavaScript
- **Frontend**: CSS/Bootstrap 
- **Backend**: Node.js (Express)
- **Banco de Dados**: PostgreSQL (Prisma)
- **Infraestrutura**: Cloud
- **Versionamento**: Git / GitHub
- **Gestão**: Jira

---

## Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com autenticação JWT
- ✅ CRUD de anúncios
- ✅ Cálculo automático de:
    - Frete
    - Lucro líquido
    - Margem (%)
- ✅ Configuração de regras de negócio
- ✅ Integração com microserviço

---

## Resultados Esperados

- Resolução do problema de negócio proposto
- Melhoria na eficiência do processo atendido  
- Experiência do usuário aprimorada  
- Base escalável para evolução futura do sistema

## 📅 Roadmap (Futuro)

- Integração com API oficial do Mercado Livre
- Dashboard com gráficos
- Sugestão automática de preço ideal
- Deploy em nuvem
- Multi-marketplace

---

## Como Executar o Projeto

### Pré-requisitos
- Node.js / Express / Prisma / Bootstrap (CSS)
- Gerenciador de pacotes: Node Packet Manager (npm) 

### Instalação

### 🔹 1. Clonar repositório

```
git clone https://github.com/seu-repo/meli-helper.git
cd meli-helper
```
### 🔹 2. Instalar dependências

```
npm install
```

### 🔹 3. Configurar banco de dados

```
npx prisma migrate dev
```

### 🔹 4. Rodar backend

```
npm run dev
```

### 🔹 5. Rodar microserviço de frete

```
cd frete-service
npm install
node server.js
```

### 🔹 6. Acessar sistema

Abra no navegador:

```
http://localhost:3000
```

## 👨‍💻 Equipe

- Daniel Fernado – Backend
- Ghuilherme Nobrega – Backend
- Wesley Fernando – QA

## 📚 Considerações Finais

O **Meli Helper** demonstra na prática:

- Aplicação do padrão MVC
- Uso de microserviços
- Integração entre sistemas
- Boas práticas de desenvolvimento web

