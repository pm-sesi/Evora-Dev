/**
 * Gerencia a autenticação e encerramento de sessão de usuários
 */
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (evento) => {
            evento.preventDefault(); 

            const email = document.getElementById('login-email')?.value.trim(); 
            const senha = document.getElementById('login-senha')?.value; 
            const msgErro = document.getElementById('msg-login-erro');

            if (msgErro) msgErro.textContent = '';

            if (!email || !senha) {
                if (msgErro) msgErro.textContent = "Por favor, preencha e-mail e senha."; //[cite: 24]
                return;
            }

            if (!emailValido(email)) {
                if (msgErro) msgErro.textContent = "Informe um e-mail válido (ex.: nome@dominio.com).";
                return;
            }

            const resposta = await enviarParaPHP('AuthController.php', { //[cite: 24]
                acao: 'login',
                email: email,
                senha: senha
            });

            if (resposta && resposta.sucesso) {
                // O perfil vem do próprio cadastro do usuário no banco — não é mais escolhido na tela.
                localStorage.setItem('perfilAtivo', resposta.usuario.perfil); //[cite: 24]
                localStorage.setItem('nomeUsuario', resposta.usuario.nome);
                window.location.href = 'turmas.html'; // Padronizado com index.php[cite: 24, 30]
            } else {
                if (msgErro) {
                    msgErro.textContent = resposta?.mensagem || "Credenciais inválidas."; //[cite: 24]
                } else {
                    exibirToast(resposta?.mensagem || "Credenciais inválidas.", "erro"); //[cite: 24]
                }
            }
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            await enviarParaPHP('AuthController.php', { acao: 'logout' }); //[cite: 24]
            localStorage.removeItem('perfilAtivo'); //[cite: 24]
            localStorage.removeItem('nomeUsuario');
            window.location.href = 'login.html'; // Padronizado[cite: 24, 30]
        });
    }
});