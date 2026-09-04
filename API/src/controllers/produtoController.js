const prisma = require("../database/prisma");

async function listarProdutos(req, res) {

    try {

        const produtos = await prisma.produto.findMany();

        return res.status(200).json(produtos);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar os produtos."
        });

    }
}

async function buscarProdutoPorId(req, res) {

    const { id } = req.params;

    try {

        const produto = await prisma.produto.findUnique({
            where: {
                id_produto: Number(id)
            }
        });

        if (!produto) {

            return res.status(404).json({
                mensagem: "Produto nao encontrado."
            });

        }

        return res.status(200).json(produto);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar o produto."
        });

    }
}

async function cadastrarProduto(req, res) {

    const {
        nome,
        descricao,
        custo,
        quantidade,
        estoque_minimo
    } = req.body;

    if (
        !nome ||
        !descricao ||
        custo === undefined ||
        quantidade === undefined ||
        estoque_minimo === undefined
    ) {

        return res.status(400).json({
            mensagem: "Todos os campos sao obrigatorios."
        });

    }

    try {

        const produto = await prisma.produto.create({
            data: {
                nome: nome,
                descricao: descricao,
                custo: Number(custo),
                quantidade: Number(quantidade),
                estoque_minimo: Number(estoque_minimo)
            }
        });

        return res.status(201).json({
            mensagem: "Produto cadastrado com sucesso.",
            id_produto: produto.id_produto
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar o produto."
        });

    }
}

async function editarProduto(req, res) {

    const { id } = req.params;

    const {
        nome,
        descricao,
        custo,
        quantidade,
        estoque_minimo
    } = req.body;

    try {

        const produtoExistente = await prisma.produto.findUnique({
            where: {
                id_produto: Number(id)
            }
        });

        if (!produtoExistente) {

            return res.status(404).json({
                mensagem: "Produto nao encontrado."
            });

        }

        await prisma.produto.update({
            where: {
                id_produto: Number(id)
            },

            data: {
                nome: nome,
                descricao: descricao,
                custo: Number(custo),
                quantidade: Number(quantidade),
                estoque_minimo: Number(estoque_minimo)
            }
        });

        return res.status(200).json({
            mensagem: "Produto atualizado com sucesso."
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao atualizar o produto."
        });

    }
}

async function excluirProduto(req, res) {

    const { id } = req.params;

    try {

        const produtoExistente = await prisma.produto.findUnique({
            where: {
                id_produto: Number(id)
            }
        });

        if (!produtoExistente) {

            return res.status(404).json({
                mensagem: "Produto nao encontrado."
            });

        }

        const producao = await prisma.producao.findFirst({
            where: {
                id_produto: Number(id)
            }
        });

        if (producao) {

            return res.status(400).json({
                mensagem: "Este produto nao pode ser excluido pois possui registros de producao vinculados."
            });

        }

        await prisma.produto.delete({
            where: {
                id_produto: Number(id)
            }
        });

        return res.status(200).json({
            mensagem: "Produto excluido com sucesso."
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao excluir o produto."
        });

    }
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    cadastrarProduto,
    editarProduto,
    excluirProduto
};