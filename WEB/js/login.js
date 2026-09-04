const loginForm = document.getElementById("loginForm");
const loginMensagem = document.getElementById("loginMensagem");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    loginMensagem.textContent = "Entrando...";
    loginMensagem.className = "mensagem";


    try {

        const resposta = await fetch(
            "http://localhost:3000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            }
        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            loginMensagem.textContent =
                dados.mensagem;

            loginMensagem.className =
                "mensagem erro";

            return;
        }


        sessionStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );


        loginMensagem.textContent =
            "Login realizado com sucesso!";

        loginMensagem.className =
            "mensagem sucesso";


        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 500);


    } catch (erro) {

        console.error(erro);

        loginMensagem.textContent =
            "Não foi possível conectar ao servidor.";

        loginMensagem.className =
            "mensagem erro";
    }

});