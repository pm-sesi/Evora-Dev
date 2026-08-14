
document.addEventListener('DOMContentLoaded', () => {
    const perfilAtivo = localStorage.getItem('perfilAtivo');

    // Se não houver sessão ativa no front-end, redireciona para a tela inicial
    if (!perfilAtivo) {
        window.location.href = 'index.html';
        return;
    }

    // Aplica restrições visuais para Aluno ou Instrutor
    if (perfilAtivo !== 'Coordenação') { 
        // Esconde formulários de cadastro
        const forms = document.querySelectorAll('form[id^="form-"]');
        forms.forEach(form => form.style.display = 'none');

        // Esconde botões de salvamento e exclusão
        const botoesAcao = document.querySelectorAll('button[id^="btn-salvar"], button[id^="btn-confirmar-exclusao"]');
        botoesAcao.forEach(btn => btn.style.display = 'none');

        console.log(`Interface adaptada para permissão restrita: ${perfilAtivo}`);
    }
});
