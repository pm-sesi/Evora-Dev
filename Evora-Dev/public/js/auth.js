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
            const perfil = document.getElementById('login-perfil')?.value; 
            const msgErro = document.getElementById('msg-login-erro');

            if (msgErro) msgErro.textContent = '';

            if (!email || !senha) {
                if (msgErro) msgErro.textContent = "Por favor, preencha e-mail e senha."; //[cite: 24]
                return;
            }

            const resposta = await enviarParaPHP('AuthController.php', { //[cite: 24]
                acao: 'login',
                email: email,
                senha: senha,
                perfil: perfil
            });

            if (resposta && resposta.sucesso) {
                localStorage.setItem('perfilAtivo', perfil || resposta.usuario.perfil); //[cite: 24]
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
            window.location.href = 'login.html'; // Padronizado[cite: 24, 30]
        });
    }
});