// assets/js/permissoes.js

document.addEventListener('DOMContentLoaded', () => {
    const perfilAtivo = localStorage.getItem('perfilAtivo');

    // Se o usuário não estiver logado (ou não tiver perfil salvo), expulsa para o login
    if (!perfilAtivo) {
        window.location.href = 'index.html';
        return;
    }

    // Se for Aluno ou Instrutor, não pode ter acesso a tudo
    if (perfilAtivo !== 'Coordenação') { // Coordenação é o Administrador
        
        // Esconde todos os formulários de cadastro
        const forms = document.querySelectorAll('form[id^="form-"]');
        forms.forEach(form => form.style.display = 'none');

        // Esconde botões de exclusão e salvamento
        const botoesAcao = document.querySelectorAll('button[id^="btn-salvar"], button[id^="btn-confirmar-exclusao"]');
        botoesAcao.forEach(btn => btn.style.display = 'none');

        console.log(`Interface ajustada para perfil restrito: ${perfilAtivo}`);
    }
});
