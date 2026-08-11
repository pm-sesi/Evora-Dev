// assets/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (evento) => {
            evento.preventDefault(); // Impede o recarregamento da página

            // Captura os valores dos IDs mapeados
            const email = document.getElementById('login-email').value.trim(); 
            const senha = document.getElementById('login-senha').value.trim(); 
            const perfil = document.getElementById('login-perfil').value; 
            const msgErro = document.getElementById('msg-login-erro');

            // Validação Front-end
            if (!email || !senha) {
                msgErro.textContent = "Por favor, preencha e-mail e senha.";
                return;
            }

            // Envia para o Guidu (Back-end)
            const resposta = await enviarParaPHP('controllers/LoginController.php', {
                acao: 'login',
                email: email,
                senha: senha,
                perfil: perfil
            });

            // Trata a resposta
            if (resposta && resposta.sucesso) {
                // Guarda quem logou para esconder os botões depois
                localStorage.setItem('perfilAtivo', perfil);
                window.location.href = 'painel.html'; // Redireciona para o sistema
            } else {
                msgErro.textContent = resposta.mensagem || "Credenciais inválidas.";
            }
        });
    }

    // Botão de Logout
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            await enviarParaPHP('controllers/LoginController.php', { acao: 'logout' });
            localStorage.removeItem('perfilAtivo');
            window.location.href = 'index.html';
        });
    }
});