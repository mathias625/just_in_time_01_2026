const prisma = require("../database/prisma");

async function listarProducoes(req, res) {

    try {

        const producoes = await prisma.producao.findMany({

            include: {
                usuario: true,
                produto: true
            },

            orderBy: {
                data: "desc"
            }

        });

        const resultado = producoes.map(function (producao) {

            return {
                id_producao: producao.id_producao,
                nome_usuario: producao.usuario.nome,
                nome_produto: producao.produto.nome,
                tipo: producao.tipo,
                quantidade: producao.quantidade,
                data: producao.data
            };

        });

        return res.status(200).json(resultado);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao buscar as producoes."
        });

    }
}

async function registrarProducao(req, res) {

    const {
        id_usuario,
        id_produto,
        tipo,
        quantidade,
        data
    } = req.body;

    if (
        !id_usuario ||
        !id_produto ||
        !tipo ||
        !quantidade ||
        !data
    ) {

        return res.status(400).json({
            mensagem: "Todos os campos sao obrigatorios."
        });

    }

    if (tipo !== "ENTRADA" && tipo !== "SAIDA") {

        return res.status(400).json({
            mensagem: "O campo tipo deve ser ENTRADA ou SAIDA."
        });

    }

    try {

        const usuario = await prisma.usuario.findUnique({
            where: {
                id_usuario: Number(id_usuario)
            }
        });

        if (!usuario) {

            return res.status(404).json({
                mensagem: "Usuario nao encontrado."
            });

        }

        const produto = await prisma.produto.findUnique({
            where: {
                id_produto: Number(id_produto)
            }
        });

        if (!produto) {

            return res.status(404).json({
                mensagem: "Produto nao encontrado."
            });

        }

        const quantidadeNumero = Number(quantidade);

        if (
            tipo === "SAIDA" &&
            quantidadeNumero > produto.quantidade
        ) {

            return res.status(400).json({
                mensagem: "Estoque insuficiente para realizar esta saida."
            });

        }

        const novaQuantidade = tipo === "ENTRADA"
            ? produto.quantidade + quantidadeNumero
            : produto.quantidade - quantidadeNumero;

        const resultado = await prisma.$transaction(async function (prismaTransaction) {

            await prismaTransaction.produto.update({

                where: {
                    id_produto: Number(id_produto)
                },

                data: {
                    quantidade: novaQuantidade
                }

            });

            const producao = await prismaTransaction.producao.create({

                data: {
                    id_usuario: Number(id_usuario),
                    id_produto: Number(id_produto),
                    tipo: tipo,
                    quantidade: quantidadeNumero,
                    data: new Date(data)
                }

            });

            return producao;

        });

        return res.status(201).json({

            mensagem: "Producao registrada com sucesso.",

            id_producao: resultado.id_producao

        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao registrar a producao."
        });

    }
}

module.exports = {
    listarProducoes,
    registrarProducao
};