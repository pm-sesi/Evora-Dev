/**
 * Aplica restrições de controle de acesso baseadas no perfil ativado
 */
document.addEventListener('DOMContentLoaded', () => {
    const perfilAtivo = localStorage.getItem('perfilAtivo'); //[cite: 27]

    if (!perfilAtivo) {
        window.location.href = 'login.html'; // Padronizado com o login[cite: 27, 30]
        return;
    }

    // Mostra quem está logado e com qual perfil, ao lado do botão Sair
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout && !document.getElementById('usuario-logado')) {
        const indicador = document.createElement('span');
        indicador.id = 'usuario-logado';
        indicador.className = 'usuario-logado';
        indicador.textContent = nomeUsuario ? `${nomeUsuario} · ${perfilAtivo}` : perfilAtivo;
        btnLogout.insertAdjacentElement('beforebegin', indicador);
    }

    const PAGINAS_RESTRITAS = ['turmas.html', 'aulas.html', 'salas.html', 'instrutores.html'];
    const paginaAtual = window.location.pathname.split('/').pop();

    if (perfilAtivo !== 'Coordenação') { //[cite: 27]
        // Aluno e Instrutor só têm acesso à aba Consultas: some os outros links do menu
        document.querySelectorAll('.navegacao-principal a').forEach(link => {
            const href = link.getAttribute('href');
            if (PAGINAS_RESTRITAS.includes(href)) {
                const item = link.closest('li');
                (item || link).style.display = 'none';
            }
        });

        // E se a pessoa tentar acessar uma dessas páginas direto pela URL, manda para Consultas
        if (PAGINAS_RESTRITAS.includes(paginaAtual)) {
            window.location.href = 'consultas.html';
            return;
        }

        // Esconde o painel inteiro (título, descrição e formulário) de cadastro
        const forms = document.querySelectorAll('form[id^="form-"]:not(#form-filtro-relatorio)'); //[cite: 27]
        forms.forEach(form => {
            const painel = form.closest('.painel');
            (painel || form).style.display = 'none';
        });

        // Esconde botões de salvamento e exclusão que porventura fiquem fora de um painel de cadastro
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