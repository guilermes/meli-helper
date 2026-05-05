# Projeto Integrador: MeliHelper
Solução de Software end-to-end para auxiliar novos sellers na jornada de vendas no Mercado Livre, automatizando cálculos de precificação, frete e análise de lucro.

## Visão Geral
Este projeto tem como objetivo desenvolver uma solução completa de software, abrangendo todo o ciclo de vida de desenvolvimento: desde o levantamento de requisitos até a implementação, testes e disponibilização da aplicação.A solução foi projetada para resolver um problema real de negócio, utilizando boas práticas de engenharia de software, arquitetura escalável e tecnologias modernas de desenvolvimento.
O Meli Helper foi desenvolvido com o objetivo de ser um hub de apoio para vendedores iniciantes, reunindo em uma única aplicação diversas ferramentas essenciais para a tomada de decisão.
O sistema permite:
  - Cadastro e gerenciamento de anúncios;
  - Cálculo automático de lucro e margem;
  - Cálculo dinâmico de frete baseado em cubagem;
  - Configuração de taxas (comissão, impostos, custos);
  - Autenticação segura com JWT.
  
  **Foco inicial (MVP):** suporte exclusivo ao Mercado Livre.
  
  ## Problema de Negócio
  Vendedores iniciantes enfrentam dificuldades diárias que impactam a saúde financeira de suas operações, tais como:
  - **Falta de clareza financeira:** Dificuldade para calcular corretamente o lucro real de cada venda;
  - **Logística complexa:** Negligência ou erro no cálculo do impacto do frete sobre a margem de lucro;
  - **Erros na precificação:** Falta de conhecimento sobre tarifas de exposição, comissões da plataforma e impostos; e,
  - **Ausência de ferramentas acessíveis:** Escassez de plataformas simples e integradas para o microempreendedor.
  
  ## Solução Proposta
  O Meli Helper é uma plataforma web desenvolvida para automatizar cálculos complexos de taxas e fretes, transformando a gestão de anúncios em um processo ágil e intuitivo. Através de uma arquitetura baseada em microsserviços e uma API REST robusta, o sistema centraliza desde a autenticação segura do usuário até a análise detalhada de margem de lucro e rentabilidade.
  
  ### Tecnologias Utilizadas
  Para garantir escalabilidade e uma interface responsiva, o projeto foi construído com:
  - **Backend:** Node.js, Express e Prisma ORM.
  - **Frontend:** HTML5, JavaScript e Bootstrap para uma UI/UX moderna.
  - **Segurança & Docs:** Autenticação via JWT e documentação interativa com Swagger.
  
  ### Diferenciais
  - **Cálculo Automatizado:** Resultados instantâneos de lucro líquido e margens.
  - **Arquitetura Moderna:** Uso de microsserviços para maior independência entre módulos.
  - **Acessibilidade:** Interface focada em produtividade, acessível via qualquer navegador.
  
  ## Arquitetura da Solução
  O projeto segue o padrão **MVC (Model-View-Controller)** para a aplicação principal:
  - **Model:** Interação com o banco de dados relacional através do Prisma ORM.
  - **View:** Interface web dinâmica construída com HTML5, CSS3 e Bootstrap.
  - **Controller:** Camada responsável pelas regras de negócio, validações e controle de rotas.
  
  Além disso, o ecossistema adota uma abordagem moderna distribuída contendo:
  
  ### 🔌 Microsserviço de Frete
  Serviço independente responsável exclusivamente pelas regras de cálculo de envio. Baseia-se em:
  - Peso real;
  - Peso cúbico (cubagem);
  - Faixas de preço e tabelas tarifárias.

  ### 📦 Cálculo de Peso
  A cubagem é calculada utilizando a fórmula padrão dos Correios e transportadoras parceiras:
  
  $$\text{Peso Cúbico} = \frac{\text{Largura (cm)} \times \text{Altura (cm)} \times \text{Comprimento (cm)}}{6000}$$
  
  O sistema realiza a validação de segurança utilizando o maior peso para tarifação:
  
  $$\text{Peso Utilizado} = \max(\text{Peso Real}, \text{Peso Cúbico})$$

  ### 🚚 Cálculo de Frete
  Baseado na tabela oficial de tarifas do Mercado Livre. A precificação final do frete é cruzada dinamicamente cruzando as seguintes variáveis:
  - Faixa de preço do produto (isenções de frete grátis);
  - Faixa de peso calculada.
  
  ### 💰 Cálculo de Lucro
  
  $$\text{Lucro} = \text{Preço} - \text{Custo} - \text{Frete} - \text{Comissão} - \text{Impostos} - \text{Custo Operacional}$$
  
  ### 📊 Margem
  
  $$\text{Margem (\%)} = \left( \frac{\text{Lucro}}{\text{Preço}} \right) \times 100$$
  
  ### 🔐 Autenticação
  O sistema utiliza o padrão de mercado JWT (JSON Web Token) e o método Bearer Token para proteger as rotas da API e garantir a privacidade dos dados de cada vendedor. Fluxo de Autenticação:
```
  authFlow
    Autenticação ->> Usuário: Realiza login com e-mail/senha
    Usuário ->> API: Valida credenciais e gera JWT
    API ->> Usuário: Retorna Token JWT
    Usuário ->> Recursos Protegidos: Envia Token no Header de Autorização
```
Para todas as requisições autenticadas, insira o cabeçalho HTTP:

```
HTTPAuthorization: Bearer SEU_TOKEN_JWT
```

## Documentação do Projeto
[Acessar Workspace no Confluence]()<br>
[Acompanhar Quadro no Jira]()<br>
[Visualizar Documento de Requisitos]()<br>

### Sprints
| Nº Sprint | Objetivo Principal | Data Início | Data Término | Status |
| --- | --- | --- | --- | --- |
| 1 | Levantamento de requisitos, arquitetura e modelagem do banco. | 01/03/2026 | 15/03/2026 | Concluído |
| 2 | Desenvolvimento do Backend (API REST) e integração com o Prisma. | 16/03/2026 | 30/03/2026 | Concluído | 
| 3 | Desenvolvimento do Microsserviço de Frete e regras de cubagem. | 01/04/2026 | 15/04/2026 | Concluído |
| 4 | Criação do Frontend (Bootstrap), integração com API e Testes. | 16/04/2026 | 05/05/2026 | Em Andamento |

### Tecnologias Utilizadas
**Linguagem:** JavaScript (ES Modules)<br>
**Frontend:** HTML5, CSS3, Bootstrap 5<br>
**Backend:** Node.js, Express<br>
**Banco de Dados:** PostgreSQL (Prisma ORM)<br>
**Documentação da API:** Swagger UI<br>
**Gestão & Versionamento:** Git, GitHub, Jira, Confluence<br>

### Funcionalidades
- ✅ Cadastro de novos usuários
- ✅ Login seguro com autenticação JWT
- ✅ CRUD completo de anúncios (criar, visualizar, editar e excluir)
- ✅ Cálculo automatizado de Frete, Lucro Líquido e Margem (%)
- ✅ Configuração flexível de regras de negócio (taxas fixas, custos extras)
- ✅ Integração resiliente via REST com o Microsserviço de Frete

### Resultados Esperados
- Resolução do problema de negócio: Prover uma ferramenta real que evite prejuízos aos lojistas.
- Eficiência operacional: Redução drástica no tempo gasto para cadastrar e calcular a margem de um anúncio.
- Experiência simplificada: UI amigável e limpa que descomplica fórmulas matemáticas pesadas.
- Escalabilidade: Arquitetura desacoplada (microsserviços) preparada para novos mercados e integrações futuras.

### 📅 Roadmap (Futuro)
- [ ] Integração direta com as APIs oficiais do Mercado Livre (Sincronização em tempo real).
- [ ] Dashboard interativo com gráficos de desempenho de vendas.
- [ ] Mecanismo de Inteligência Artificial para sugestão automática de preço ideal.
- [ ] Deploy automatizado em infraestrutura de Nuvem (AWS/Vercel/Render).
- [ ] Arquitetura preparada para Multi-marketplace (Shopee, Amazon, etc.).

## Como Executar o Projeto

### Pré-requisitos
Node.js (versão 18.x ou superior recomendada)<br>
PostgreSQL<br>
Gerenciador de pacotes npm (incluso no Node.js)<br>

### Passo a Passo de Instalação
🔹 1. Clonar o repositório
```
git clone https://github.com/guilermes/meli-helper.git
cd meli-helper
```
🔹 2. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto principal e preencha as variáveis necessárias (exemplo):
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/melihelper?schema=public"
JWT_SECRET="sua_chave_secreta_super_segura"
PORT=3000
```
🔹 3. Instalar dependências do projeto principal
```
npm install
```
🔹 4. Executar Migrations do Banco de Dados
```
npx prisma migrate dev
```
🔹 5. Iniciar a API Principal (Backend)
```
npm run dev
```
🔹 6. Configurar e Rodar o Microsserviço de Frete
Em um novo terminal, navegue até a pasta do microsserviço:
```
cd frete-service
npm install
node server.js
```
🔹 7. Acessar o Sistema
Abra o seu navegador e acesse: [http://localhost:3000](http://localhost:3000)

## 👨‍💻 Equipe
Daniel Fernando — Fullstack Developer & DB Specialist<br>
Guilherme Nobrega — Fullstack Developer & Software Architect<br>
Wesley Fernando — Quality Assurance (QA) & Test Engineer<br>

## 📚 Considerações Finais
O desenvolvimento do Meli Helper consolida na prática conceitos cruciais de Engenharia de Software voltados ao mercado de trabalho, tais como:
- Aplicação prática e consistente do padrão de arquitetura MVC;
- Implementação de microsserviços e comunicação integrada via APIs REST;
- Garantia de segurança no tráfego de dados e controle de acessos;
- Uso de metodologias ágeis e ferramentas de nível corporativo para gestão de ciclo de vida de software.
