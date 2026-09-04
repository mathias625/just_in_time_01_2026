const usuario =
    sessionStorage.getItem("usuario");


if (!usuario) {

    window.location.href =
        "index.html";

}


document.getElementById(
    "nomeUsuario"
).textContent = usuario;

let produtos = [

    {
        id: 1,
        nome: "Nicho MDF",
        quantidade: 10,
        minimo: 5
    },

    {
        id: 2,
        nome: "Mesa MDF",
        quantidade: 8,
        minimo: 3
    },

    {
        id: 3,
        nome: "Porta MDF",
        quantidade: 15,
        minimo: 5
    }

];


let movimentacoes = [];

const selectProduto =
    document.getElementById(
        "produto"
    );


const listaEstoque =
    document.getElementById(
        "listaEstoque"
    );


const listaMovimentacoes =
    document.getElementById(
        "listaMovimentacoes"
    );


const producaoForm =
    document.getElementById(
        "producaoForm"
    );

function carregarProdutos() {

    selectProduto.innerHTML = `

        <option value="">
            Selecione um produto
        </option>

    `;


    const produtosOrdenados =
        [...produtos].sort(
            function (a, b) {

                return a.nome.localeCompare(
                    b.nome
                );

            }
        );


    produtosOrdenados.forEach(
        function (produto) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                produto.id;


            option.textContent =
                produto.nome;


            selectProduto.appendChild(
                option
            );

        }
    );

}

function mostrarEstoque() {

    listaEstoque.innerHTML = "";


    produtos.forEach(
        function (produto) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "estoque-card";


            let aviso = "";


            if (
                produto.quantidade <
                produto.minimo
            ) {

                card.classList.add(
                    "estoque-baixo"
                );


                aviso = `

                    <span class="alerta">
                        ⚠️ Estoque abaixo do mínimo
                    </span>

                `;

            }


            card.innerHTML = `

                <div>

                    <strong>
                        ${produto.nome}
                    </strong>

                    ${aviso}

                </div>


                <div class="estoque-numero">

                    <strong>
                        ${produto.quantidade}
                    </strong>

                    <small>
                        mínimo:
                        ${produto.minimo}
                    </small>

                </div>

            `;


            listaEstoque.appendChild(
                card
            );

        }
    );

}

producaoForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const produtoId =
            Number(
                selectProduto.value
            );


        const quantidade =
            Number(
                document.getElementById(
                    "quantidade"
                ).value
            );


        const data =
            document.getElementById(
                "data"
            ).value;


        const tipo =
            document.querySelector(
                'input[name="tipo"]:checked'
            ).value;


        const produto =
            produtos.find(
                produto =>
                    produto.id === produtoId
            );

        if (!produto) {

            mostrarMensagem(
                "Selecione um produto.",
                "erro"
            );

            return;

        }

        if (quantidade <= 0) {

            mostrarMensagem(
                "A quantidade deve ser maior que zero.",
                "erro"
            );

            return;

        }

        if (
            tipo === "fabricado"
        ) {

            produto.quantidade +=
                quantidade;

        }

        else {

            if (
                quantidade >
                produto.quantidade
            ) {

                mostrarMensagem(
                    "Não há estoque suficiente para este pedido.",
                    "erro"
                );

                return;

            }


            produto.quantidade -=
                quantidade;

        }

        movimentacoes.push({

            produto:
                produto.nome,

            tipo:
                tipo,

            quantidade:
                quantidade,

            data:
                data,

            usuario:
                usuario

        });



        mostrarMovimentacoes();

        mostrarEstoque();

        if (
            tipo === "pedido" &&
            produto.quantidade <
            produto.minimo
        ) {

            alert(
                `⚠️ Atenção!\n\nO estoque de ${produto.nome} está abaixo do mínimo configurado.`
            );

        }



        mostrarMensagem(
            "Movimentação registrada com sucesso!",
            "sucesso"
        );


        producaoForm.reset();

        document.getElementById(
            "data"
        ).value =
            new Date()
                .toISOString()
                .split("T")[0];

    }
)

function mostrarMovimentacoes() {

    listaMovimentacoes.innerHTML = "";


    movimentacoes.forEach(
        function (movimentacao) {

            const linha =
                document.createElement(
                    "tr"
                );


            const tipoTexto =
                movimentacao.tipo ===
                "fabricado"
                    ? "Fabricado"
                    : "Pedido";


            linha.innerHTML = `

                <td>
                    ${movimentacao.produto}
                </td>

                <td>

                    <span
                        class="tipo-${movimentacao.tipo}"
                    >
                        ${tipoTexto}
                    </span>

                </td>

                <td>
                    ${movimentacao.quantidade}
                </td>

                <td>
                    ${movimentacao.data}
                </td>

                <td>
                    ${movimentacao.usuario}
                </td>

            `;


            listaMovimentacoes.appendChild(
                linha
            );

        }
    );

}

function mostrarMensagem(
    texto,
    tipo
) {

    const mensagem =
        document.getElementById(
            "mensagemProducao"
        );


    mensagem.textContent =
        texto;


    mensagem.className =
        `mensagem ${tipo}`;

}

function logout() {

    sessionStorage.removeItem(
        "usuario"
    );


    window.location.href =
        "index.html";

}

document.getElementById(
    "data"
).value =
    new Date()
        .toISOString()
        .split("T")[0];

carregarProdutos();

mostrarEstoque();