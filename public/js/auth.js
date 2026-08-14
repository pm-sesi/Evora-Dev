
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (evento) => {
            evento.preventDefault(); 

            const email = document.getElementById('login-email').value.trim(); 
            const senha = document.getElementById('login-senha').value.trim(); 
            const perfil = document.getElementById('login-perfil').value; 
            const msgErro = document.getElementById('msg-login-erro');

            if (!email || !senha) {
                msgErro.textContent = "Por favor, preencha e-mail e senha.";
                return;
            }

            // Caminho relativo ajustado para app/controllers/
            const resposta = await enviarParaPHP('../../app/controllers/LoginController.php', {
                acao: 'login',
                email: email,
                senha: senha,
                perfil: perfil
            });

            if (resposta && resposta.sucesso) {
                localStorage.setItem('perfilAtivo', perfil);
                window.location.href = 'painel.html'; 
            } else {
                msgErro.textContent = resposta?.mensagem || "Credenciais inválidas.";
            }
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            await enviarParaPHP('../../app/controllers/LoginController.php', { acao: 'logout' });
            localStorage.removeItem('perfilAtivo');
            window.location.href = 'index.html';
        });
    }
});