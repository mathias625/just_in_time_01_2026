# Just in Time - API

## Objetivo
API de back-end para o sistema "Just in Time", feito para uma fabrica de moveis em MDF. Controla usuarios, produtos e producao (entradas/saidas de estoque). O Front-End (pasta WEB/) ja existe e nao foi alterado por esta API.

## Tecnologias
- Node.js
- Express
- MySQL (via mysql2)
- CORS
- dotenv

## Estrutura da API
API/
├── src/
│ ├── controllers/ -> regras de cada rota (login, produto, producao, estoque)
│ ├── routes/ -> define os caminhos (URLs) de cada recurso
│ ├── database/ -> conexao com o MySQL e script SQL
│ └── server.js -> arquivo principal, inicia o servidor
├── .env -> configuracoes do banco de dados
├── package.json
└── README.md

## Como instalar
1. Entre na pasta API:

cd API

2. Instale as dependencias:

npm install


## Como configurar o .env
O arquivo `.env` ja vem pronto com valores padrao. Ajuste se o seu MySQL usar outro usuario/senha:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=preparacao_db
PORT=3000


## Como criar o banco de dados
1. Abra o MySQL Workbench (ou o terminal do MySQL).
2. Execute o arquivo `src/database/schema.sql`. Ele cria o banco `preparacao_db`, as 3 tabelas (USUARIO, PRODUTO, PRODUCAO) e ja insere os registros minimos de teste (3 usuarios, 3 produtos, 3 producoes).

Se preferir rodar pelo terminal:

mysql -u root -p < src/database/schema.sql


## Como iniciar a API

npm start

Se tudo estiver certo, vai aparecer no terminal:

Servidor rodando em http://localhost:3000


## Rotas disponiveis

### Login
- POST /login

### Produtos
- GET /produtos
- GET /produtos/:id
- POST /produtos
- PUT /produtos/:id
- DELETE /produtos/:id

### Producao
- GET /producao
- POST /producao

### Estoque
- GET /estoque

## Como testar (Thunder Client ou Postman)

### 1. POST /login
URL: http://localhost:3000/login
JSON enviado:

{
"email": "admin@jit.com",
"senha": "123456"
}

Resposta esperada (200):

{
"mensagem": "Login realizado com sucesso.",
"usuario": {
"id_usuario": 1,
"nome": "Administrador",
"email": "admin@jit.com"
}
}


### 2. GET /produtos
URL: http://localhost:3000/produtos
Resposta esperada: lista com os 3 produtos cadastrados.

### 3. GET /produtos/:id
URL: http://localhost:3000/produtos/1
Resposta esperada: dados do produto com id 1.

### 4. POST /produtos
URL: http://localhost:3000/produtos
JSON enviado:

{
"nome": "Mesa MDF",
"descricao": "Mesa produzida em MDF",
"custo": 250.00,
"quantidade": 10,
"estoque_minimo": 3
}

Resposta esperada (201): mensagem de sucesso com o id do novo produto.

### 5. PUT /produtos/:id
URL: http://localhost:3000/produtos/1
JSON enviado: mesmos campos do cadastro, com os valores atualizados.
Resposta esperada (200): mensagem de produto atualizado.

### 6. DELETE /produtos/:id
URL: http://localhost:3000/produtos/1
Resposta esperada: sucesso (200) se nao houver producao vinculada, ou erro (400) se houver.

### 7. GET /producao
URL: http://localhost:3000/producao
Resposta esperada: lista com nome do usuario, nome do produto, tipo, quantidade e data de cada producao.

### 8. POST /producao
URL: http://localhost:3000/producao
JSON enviado:

{
"id_usuario": 1,
"id_produto": 1,
"tipo": "ENTRADA",
"quantidade": 5,
"data": "2026-09-02"
}

Resposta esperada (201): mensagem de sucesso e o estoque do produto atualizado.

### 9. GET /estoque
URL: http://localhost:3000/estoque
Resposta esperada: lista de produtos com quantidade atual, estoque minimo e situacao (NORMAL ou ESTOQUE BAIXO).

## Sobre a ligacao com o Front-End
O Front-End (pasta WEB/) hoje funciona de forma independente, com dados simulados dentro do proprio JavaScript (nao faz nenhuma chamada fetch para uma API). Por isso, esta API foi criada seguindo exatamente os nomes de campos e valores definidos nas especificacoes do projeto (estoque_minimo, ENTRADA/SAIDA), sem alterar nenhum arquivo de WEB/.

Se um dia voce quiser conectar o Front a esta API, sera necessario adicionar chamadas fetch() nos arquivos login.js, produtos.js e producao.js, e ficar atento a estas diferencas de nomes:

| Front-End (WEB/js) | API (banco de dados) |
|---|---|
| minimo | estoque_minimo |
| tipo: "fabricado" | tipo: "ENTRADA" |
| tipo: "pedido" | tipo: "SAIDA" |