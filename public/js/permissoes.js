/**
 * Aplica restrições de controle de acesso baseadas no perfil ativado
 */
document.addEventListener('DOMContentLoaded', () => {
    const perfilAtivo = localStorage.getItem('perfilAtivo'); //[cite: 27]

    if (!perfilAtivo) {
        window.location.href = 'login.html'; // Padronizado com o login[cite: 27, 30]
        return;
    }

    if (perfilAtivo !== 'Coordenação') { //[cite: 27]
        // Esconde formulários de cadastro
        const forms = document.querySelectorAll('form[id^="form-"]:not(#form-filtro-relatorio)'); //[cite: 27]
        forms.forEach(form => form.style.display = 'none'); //[cite: 27]

        // Esconde botões de salvamento e exclusão
        const botoesAcao = document.querySelectorAll('button[id^="btn-salvar"], button[id^="btn-confirmar-exclusao"], .btn-deletar'); //[cite: 27]
        botoesAcao.forEach(btn => btn.style.display = 'none'); //[cite: 27]
    }

    // Regras específicas por perfil (além da restrição geral acima)
    if (perfilAtivo === 'Aluno') {
        // Aluno tem apenas leitura: some qualquer botão de ação que ainda esteja visível
        const botoesAluno = document.querySelectorAll('button[id^="btn-editar"], .btn-editar');
        botoesAluno.forEach(btn => btn.style.display = 'none');
    }

    if (perfilAtivo === 'Instrutor') {
        // Espaço reservado para regras futuras específicas de Instrutor
        // (ex.: mostrar apenas as turmas/aulas do próprio instrutor)
    }
});