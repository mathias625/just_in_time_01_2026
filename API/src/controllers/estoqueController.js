const prisma = require("../database/prisma");

async function listarEstoque(req, res) {

    try {

        const produtos = await prisma.produto.findMany();

        const estoque = produtos.map(function (produto) {

            const situacao = produto.quantidade <= produto.estoque_minimo
                ? "ESTOQUE BAIXO"
                : "NORMAL";

            return {
                produto: produto.nome,
                quantidade_atual: produto.quantidade,
                estoque_minimo: produto.estoque_minimo,
                situacao: situacao
            };

        });

        return res.status(200).json(estoque);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar o estoque."
        });

    }
}

module.exports = {
    listarEstoque
};