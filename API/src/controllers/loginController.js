const prisma = require("../database/prisma");

async function fazerLogin(req, res) {

    const { email, senha } = req.body;

    if (!email || !senha) {

        return res.status(400).json({
            mensagem: "Email e senha sao obrigatorios."
        });

    }

    try {

        const usuario = await prisma.usuario.findFirst({
            where: {
                email: email,
                senha: senha
            }
        });

        if (!usuario) {

            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });

        }

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",

            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            mensagem: "Erro ao consultar o banco de dados."
        });

    }
}

module.exports = {
    fazerLogin
};