## Requisitos Funcionais

### RF01 — Interface de autenticação
- **RF01.1** — Solicitar email e senha do usuário.
- **RF01.2** — Validar as credenciais informadas.
- **RF01.3** — Informar ao usuário quando as credenciais forem inválidas.
- **RF01.4** — Criar uma sessão para o usuário autenticado.
- **RF01.5** — Redirecionar o usuário autenticado para a interface principal.

### RF02 — Interface principal
- **RF02.1** — Exibir o nome do usuário autenticado.
- **RF02.2** — Disponibilizar acesso ao cadastro de produtos.
- **RF02.3** — Disponibilizar acesso à gestão de produção.
- **RF02.4** — Disponibilizar a opção de logout.
- **RF02.5** — Redirecionar o usuário para a tela de login ao realizar logout.

### RF03 — Cadastro de produtos
- **RF03.1** — Listar os produtos cadastrados.
- **RF03.2** — Exibir os produtos em uma tabela.
- **RF03.3** — Permitir pesquisar produtos.
- **RF03.4** — Atualizar a listagem conforme o termo pesquisado.
- **RF03.5** — Permitir cadastrar um novo produto.
- **RF03.6** — Permitir editar um produto existente.
- **RF03.7** — Permitir excluir um produto existente.
- **RF03.8** — Validar os dados informados no cadastro.
- **RF03.9** — Validar os dados informados na edição.
- **RF03.10** — Informar o usuário sobre dados ausentes ou inválidos.
- **RF03.11** — Permitir retornar à interface principal.

### RF04 — Gestão de produção
- **RF04.1** — Listar os produtos cadastrados em ordem alfabética.
- **RF04.2** — Permitir selecionar um produto.
- **RF04.3** — Permitir selecionar o tipo de movimentação.
- **RF04.4** — Registrar uma movimentação de produto fabricado.
- **RF04.5** — Registrar uma movimentação de pedido.
- **RF04.6** — Permitir informar a data da movimentação.
- **RF04.7** — Aumentar o estoque quando houver produção.
- **RF04.8** — Diminuir o estoque quando houver pedido.
- **RF04.9** — Registrar a quantidade movimentada.
- **RF04.10** — Registrar o usuário responsável pela movimentação.
- **RF04.11** — Verificar automaticamente o estoque mínimo após uma saída.
- **RF04.12** — Exibir alerta quando o estoque estiver abaixo do mínimo.