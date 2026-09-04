# ⏱ Just in Time

**Sistema web para gestão de produção e controle de estoque.**

O **Just in Time (JIT)** foi desenvolvido para facilitar o cadastro de produtos, o acompanhamento do estoque e o gerenciamento das movimentações de produção de uma fábrica.

---

##  Sobre o Projeto

O sistema permite que o usuário:

*  Realize login;
*  Cadastre produtos;
*  Pesquise produtos;
*  Edite produtos;
*  Exclua produtos;
*  Consulte o estoque;
*  Registre movimentações de produção;
*  Controle entradas e saídas de produtos.

O projeto é dividido em três partes principais:

* **WEB:** interface do sistema;
* **API:** responsável pelas regras e requisições;
* **DOCS:** documentação e imagens do projeto.

---

##  Objetivo

O objetivo do projeto é desenvolver um sistema simples para auxiliar no gerenciamento de produtos, estoque e produção de uma fábrica.

A aplicação centraliza as informações e facilita o controle das movimentações realizadas pelos usuários.

---

#  Tecnologias Utilizadas

## Front-end

* HTML5
* CSS3
* JavaScript

## Back-end

* Node.js
* Express.js

## Banco de Dados

* MySQL
* Prisma ORM

## Testes

* Thunder Client

## Ferramentas

* Visual Studio Code
* Git
* GitHub
* Prisma Studio
* phpMyAdmin

---

#  Estrutura do Projeto

```text
Just_in_Time/
│
├── API/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── estoqueController.js
│   │   │   ├── loginController.js
│   │   │   ├── producao.controller.js
│   │   │   └── produtoController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── estoqueRoutes.js
│   │   │   ├── login.routes.js
│   │   │   ├── producaoRoutes.js
│   │   │   └── produtoRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── WEB/
│   │
│   ├── html/
│   │   ├── index.html
│   │   ├── dashboard.html
│   │   ├── produtos.html
│   │   └── producao.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── login.js
│       ├── produtos.js
│       └── producao.js
│
├── DOCS/
│   ├── 1.png
│   ├── 2.png
│   ├── 3.png
│   ├── 4.png
│   └── DER.png
│
├── .gitignore
└── README.md
```

---

#  Login

A primeira tela do sistema é responsável pela autenticação do usuário.

O usuário informa:

* E-mail;
* Senha.

A aplicação envia os dados para a API através de uma requisição `POST`.

### Endpoint

```http
POST /login
```

### Exemplo de requisição

```json
{
  "email": "admin@jit.com",
  "senha": "123456"
}
```

### Resposta de sucesso

```json
{
  "mensagem": "Login realizado com sucesso.",
  "usuario": {
    "id_usuario": 1,
    "nome": "Administrador",
    "email": "admin@jit.com"
  }
}
```

Após o login, os dados do usuário são armazenados no `sessionStorage`.

---

#  Dashboard

Depois de realizar o login, o usuário é direcionado para o **Dashboard**.

O Dashboard apresenta as principais áreas do sistema:

###  Produtos

Permite acessar o gerenciamento dos produtos cadastrados.

###  Gestão de Produção

Permite controlar as entradas e saídas relacionadas ao estoque.

O Dashboard também apresenta o nome do usuário que está conectado.

---

#  Produtos

A página de produtos permite visualizar e administrar os produtos cadastrados.

As informações exibidas são:

| Campo     | Descrição                |
| --------- | ------------------------ |
| ID        | Identificação do produto |
| Produto   | Nome do produto          |
| Descrição | Descrição do produto     |
| Custo     | Custo do produto         |
| Estoque   | Quantidade disponível    |
| Mínimo    | Estoque mínimo           |
| Ações     | Editar ou excluir        |

##  Cadastro de Produto

Para cadastrar um produto, o usuário deve clicar no botão:

> **+ Novo Produto**

O formulário possui os seguintes campos:

* Nome do produto;
* Descrição;
* Custo;
* Estoque;
* Estoque mínimo.

### Exemplo

```text
Nome: Produto A
Descrição: Produto utilizado na produção
Custo: 25.50
Estoque: 100
Estoque mínimo: 20
```

---

##  Pesquisa de Produtos

A página possui um campo de busca para facilitar a localização dos produtos.

O usuário pode digitar o nome do produto e clicar em:

> **Buscar**

A aplicação realiza a consulta e apresenta os resultados na tabela.

---

##  Edição de Produtos

Os produtos cadastrados podem ser editados.

Ao selecionar a opção de edição, os dados existentes são carregados no formulário.

O usuário pode alterar:

* Nome;
* Descrição;
* Custo;
* Quantidade;
* Estoque mínimo.

---

##  Exclusão de Produtos

O sistema permite excluir produtos cadastrados.

Antes da exclusão, a API verifica se existem registros de produção relacionados ao produto.

Caso existam registros vinculados, o produto não pode ser excluído.

---

#  Produção

A área de produção permite registrar movimentações de estoque.

Existem dois tipos de movimentação:

* **ENTRADA**
* **SAÍDA**

## ENTRADA

A quantidade informada é adicionada ao estoque atual.

### Exemplo

```text
Estoque atual: 20
Entrada: 10

Novo estoque: 30
```

## SAÍDA

A quantidade informada é retirada do estoque atual.

### Exemplo

```text
Estoque atual: 20
Saída: 5

Novo estoque: 15
```

O sistema verifica se existe estoque suficiente antes de realizar uma saída.

---

#  Controle de Estoque

O sistema possui uma funcionalidade para consultar a situação do estoque.

A situação pode ser:

* **NORMAL**
* **ESTOQUE BAIXO**

Quando a quantidade atual é menor ou igual ao estoque mínimo, o sistema identifica o produto como:

> **ESTOQUE BAIXO**

---

#  Banco de Dados

O projeto utiliza:

* MySQL;
* Prisma ORM.

O banco possui três principais tabelas:

* `USUARIO`
* `PRODUTO`
* `PRODUCAO`

##  Tabela `USUARIO`

Armazena os usuários do sistema.

| Campo        | Tipo   | Descrição                |
| ------------ | ------ | ------------------------ |
| `id_usuario` | Int    | Identificador do usuário |
| `nome`       | String | Nome do usuário          |
| `email`      | String | E-mail do usuário        |
| `senha`      | String | Senha do usuário         |

O campo `email` é único.

---

##  Tabela `PRODUTO`

Armazena os produtos cadastrados.

| Campo            | Tipo   | Descrição                |
| ---------------- | ------ | ------------------------ |
| `id_produto`     | Int    | Identificador do produto |
| `nome`           | String | Nome do produto          |
| `descricao`      | String | Descrição do produto     |
| `custo`          | Float  | Custo do produto         |
| `quantidade`     | Int    | Quantidade disponível    |
| `estoque_minimo` | Int    | Estoque mínimo           |

---

##  Tabela `PRODUCAO`

Armazena os registros de produção.

| Campo         | Tipo     | Descrição                 |
| ------------- | -------- | ------------------------- |
| `id_producao` | Int      | Identificador da produção |
| `id_usuario`  | Int      | Usuário responsável       |
| `id_produto`  | Int      | Produto movimentado       |
| `tipo`        | String   | Entrada ou saída          |
| `quantidade`  | Int      | Quantidade movimentada    |
| `data`        | DateTime | Data da movimentação      |

---

#  Relacionamentos

O banco possui os seguintes relacionamentos:

```text
USUARIO
   │
   │ 1:N
   ▼
PRODUCAO
   ▲
   │ 1:N
   │
PRODUTO
```

Um usuário pode possuir vários registros de produção.

Um produto pode possuir vários registros de produção.

A tabela `PRODUCAO` possui as chaves estrangeiras:

* `id_usuario`
* `id_produto`

---

#  DER — Diagrama Entidade-Relacionamento

O Diagrama Entidade-Relacionamento representa a estrutura do banco de dados e os relacionamentos entre as entidades `USUARIO`, `PRODUCAO` e `PRODUTO`.

<p align="center">
  <img src="./DOCS/DER.png" alt="Diagrama Entidade-Relacionamento" width="900">
</p>

---

#  Telas do Sistema

##  Tela de Login

<p align="center">
  <img src="./DOCS/1.png" alt="Tela de Login" width="900">
</p>

Tela inicial responsável pela autenticação do usuário no sistema.

---

##  Dashboard

<p align="center">
  <img src="./DOCS/2.png" alt="Dashboard" width="900">
</p>

Após o login, o usuário é direcionado para o Dashboard, onde pode acessar as áreas de produtos e gestão de produção.

---

##  Cadastro de Produtos

<p align="center">
  <img src="./DOCS/3.png" alt="Cadastro de Produtos" width="900">
</p>

Tela responsável pelo gerenciamento dos produtos disponíveis no estoque, permitindo pesquisar, cadastrar, editar e excluir produtos.

---

##  Gestão de Produção

<p align="center">
  <img src="./DOCS/4.png" alt="Gestão de Produção" width="900">
</p>

Tela responsável pelo registro das movimentações de entrada e saída e pelo acompanhamento do estoque atual.

---

#  API

A API foi desenvolvida utilizando **Node.js** e **Express**.

O servidor é executado localmente na porta:

```text
http://localhost:3000
```

---

#  Rotas da API

##  Login

### Login

```http
POST /login
```

Responsável por realizar a autenticação do usuário.

---

##  Produtos

### Listar produtos

```http
GET /produtos
```

Retorna todos os produtos cadastrados.

### Buscar produto

```http
GET /produtos/:id
```

Retorna um produto específico pelo ID.

### Cadastrar produto

```http
POST /produtos
```

Cadastra um novo produto.

### Editar produto

```http
PUT /produtos/:id
```

Atualiza um produto existente.

### Excluir produto

```http
DELETE /produtos/:id
```

Exclui um produto, caso ele não possua registros de produção vinculados.

---

##  Produção

### Listar produções

```http
GET /producao
```

Lista os registros de produção.

### Registrar produção

```http
POST /producao
```

Registra uma entrada ou saída de estoque.

---

##  Estoque

### Listar estoque

```http
GET /estoque
```

Retorna os produtos e suas respectivas situações de estoque.

---

#  Testes com Thunder Client

A API foi testada utilizando o **Thunder Client** dentro do Visual Studio Code.

## Teste de Login

**Método:**

```http
POST
```

**URL:**

```text
http://localhost:3000/login
```

**Body:**

```json
{
  "email": "admin@jit.com",
  "senha": "123456"
}
```

**Resposta esperada:**

```text
200 OK
```

---

#  Prisma

O **Prisma** é utilizado como ORM para facilitar o trabalho com o banco de dados.

O arquivo principal de configuração está localizado em:

```text
API/prisma/schema.prisma
```

## Gerar o Prisma Client

Dentro da pasta `API`, executar:

```bash
npx prisma generate
```

## Validar o Schema

```bash
npx prisma validate
```

## Sincronizar com o banco

```bash
npx prisma db push
```

## Abrir o Prisma Studio

```bash
npx prisma studio
```

---

#  Instalação

## 1. Clonar o projeto

```bash
git clone URL_DO_REPOSITORIO
```

Depois:

```bash
cd Just_in_Time
```

## 2. Entrar na API

```bash
cd API
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Configurar o arquivo `.env`

Dentro da pasta `API`, criar um arquivo chamado:

```text
.env
```

Adicionar a conexão com o banco:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/just_in_time"
```

## 5. Gerar o Prisma Client

```bash
npx prisma generate
```

## 6. Sincronizar o banco

```bash
npx prisma db push
```

## 7. Executar a API

```bash
npm run dev
```

A API será executada em:

```text
http://localhost:3000
```

---

#  Executando o Front-end

Abra a pasta `WEB` no **Visual Studio Code**.

O sistema pode ser executado utilizando o **Live Server**.

Abra:

```text
WEB/html/index.html
```

Depois, realize o login para acessar o sistema.

---

#  Fluxo da Aplicação

```text
┌─────────────────┐
│      LOGIN      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│       API       │
│     Express     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      MySQL      │
│     Prisma      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    DASHBOARD    │
└────────┬────────┘
         │
     ┌───┴────┐
     ▼        ▼
┌─────────┐ ┌────────────┐
│Produtos │ │  Produção  │
└─────────┘ └────────────┘
```

---

#  Funcionalidades

| Funcionalidade            | Status |
| ------------------------- | :----: |
| Login                     |    ✅   |
| Logout                    |    ✅   |
| Dashboard                 |    ✅   |
| Cadastro de produtos      |    ✅   |
| Listagem de produtos      |    ✅   |
| Pesquisa de produtos      |    ✅   |
| Edição de produtos        |    ✅   |
| Exclusão de produtos      |    ✅   |
| Controle de estoque       |    ✅   |
| Entrada de produção       |    ✅   |
| Saída de produção         |    ✅   |
| Banco de dados MySQL      |    ✅   |
| Prisma ORM                |    ✅   |
| API REST                  |    ✅   |
| Testes com Thunder Client |    ✅   |

---

#  Segurança

O sistema possui uma autenticação básica através de e-mail e senha.

Após o login, os dados do usuário são armazenados no `sessionStorage`.

Quando o usuário realiza logout, os dados são removidos.

> **Observação:** em uma aplicação real de produção, recomenda-se utilizar métodos mais seguros de autenticação, armazenamento e criptografia de senhas.

---

#  Interface

A interface foi desenvolvida buscando manter uma aparência:

*  Moderna;
*  Responsiva;
*  Simples;
*  Organizada;
*  Fácil de utilizar.

O sistema possui uma identidade visual própria para o projeto **Just in Time**.

---

#  Conceitos Trabalhados

Durante o desenvolvimento foram trabalhados conceitos de:

* HTML;
* CSS;
* JavaScript;
* Node.js;
* Express;
* API REST;
* MySQL;
* Prisma;
* CRUD;
* JSON;
* HTTP;
* `fetch()`;
* `async/await`;
* `sessionStorage`;
* Relacionamentos de banco de dados;
* Git;
* GitHub;
* Testes de API.

---

# Autor

**Mathias Domingos Pereira**

Projeto desenvolvido para fins acadêmicos e educacionais.
