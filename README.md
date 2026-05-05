# 🚀 Meli Helper

Sistema web para auxiliar novos sellers na jornada de vendas no **Mercado Livre**, automatizando cálculos de precificação, frete e análise de lucro.

---

## 📌 Sobre o Projeto

O **Meli Helper** foi desenvolvido com o objetivo de ser um **hub de apoio para vendedores iniciantes**, reunindo em uma única aplicação diversas ferramentas essenciais para tomada de decisão.

O sistema permite:

- Cadastro e gerenciamento de anúncios
- Cálculo automático de **lucro e margem**
- Cálculo dinâmico de **frete baseado em cubagem**
- Configuração de taxas (comissão, impostos, custos)
- Autenticação segura com JWT

> 🎯 Foco inicial (MVP): suporte exclusivo ao Mercado Livre
>
## 🧠 Problema Resolvido

Vendedores iniciantes enfrentam dificuldades como:

- Não saber calcular corretamente o lucro
- Ignorar impacto do frete
- Erros na precificação
- Falta de ferramentas simples

O Meli Helper resolve isso automatizando todos esses cálculos.

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)**:

- **Model** → interação com banco de dados (Prisma)
- **View** → interface web (HTML + Bootstrap)
- **Controller** → regras de negócio e controle das rotas

Além disso, possui uma abordagem moderna com:

### 🔌 Microserviço de Frete

- Responsável exclusivamente pelo cálculo de frete
- Baseado em:
    - Peso real
    - Peso cúbico
    - Faixa de preço

    ## ⚙️ Tecnologias Utilizadas

### Backend

- Node.js
- Express
- Prisma ORM
- JWT (autenticação)

### Frontend

- HTML
- CSS (Bootstrap)
- JavaScript

### Outros

- Swagger (documentação da API)
- Microserviços (frete)

## 📦 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com autenticação JWT
- ✅ CRUD de anúncios
- ✅ Cálculo automático de:
    - Frete
    - Lucro líquido
    - Margem (%)
- ✅ Configuração de regras de negócio
- ✅ Integração com microserviço

## 📐 Regras de Negócio

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

## 🚀 Como Executar o Projeto

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

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)**.

Fluxo:

1. Usuário realiza login
2. Recebe um token
3. Token é enviado no header:

```
Authorization: Bearer SEU_TOKEN
```

## 📄 Documentação da API

Disponível via Swagger:

```
http://localhost:3000/api-docs
```

## 📅 Roadmap (Futuro)

- Integração com API oficial do Mercado Livre
- Dashboard com gráficos
- Sugestão automática de preço ideal
- Deploy em nuvem
- Multi-marketplace

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