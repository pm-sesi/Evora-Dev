/**
 * Gerenciamento do agendamento de Aulas e geração de Relatórios
 */
document.addEventListener('DOMContentLoaded', () => {
    const formAula = document.getElementById('form-aula');
    const formFiltroRelatorio = document.getElementById('form-filtro-relatorio');

    async function carregarOpcoesSelects() {
        const selectTurma = document.getElementById('aula-turma-id');
        const selectInstrutor = document.getElementById('aula-instrutor-id');
        const selectSala = document.getElementById('aula-sala-id');

        const filtroTurma = document.getElementById('filtro-turma-id');
        const filtroInstrutor = document.getElementById('filtro-instrutor-id');
        const filtroSala = document.getElementById('filtro-sala-id');

        const [resTurmas, resInstrutores, resSalas] = await Promise.all([
            enviarParaPHP('TurmaController.php', { acao: 'listar' }), //[cite: 23]
            enviarParaPHP('InstrutorController.php', { acao: 'listar' }), //[cite: 23]
            enviarParaPHP('SalaController.php', { acao: 'listar' }) //[cite: 23]
        ]);

        if (resTurmas && resTurmas.sucesso) {
            const options = resTurmas.dados.map(t => `<option value="${t.id}">${escapeHTML(t.codigo)}</option>`).join(''); //[cite: 23]
            if (selectTurma) selectTurma.innerHTML = '<option value="">Selecione a Turma</option>' + options; //[cite: 23]
            if (filtroTurma) filtroTurma.innerHTML = '<option value="">Todas as Turmas</option>' + options; //[cite: 23]
        }

        if (resInstrutores && resInstrutores.sucesso) {
            const options = resInstrutores.dados.map(i => `<option value="${i.id}">${escapeHTML(i.nome)}</option>`).join(''); //[cite: 23]
            if (selectInstrutor) selectInstrutor.innerHTML = '<option value="">Selecione o Instrutor</option>' + options; //[cite: 23]
            if (filtroInstrutor) filtroInstrutor.innerHTML = '<option value="">Todos os Instrutores</option>' + options; //[cite: 23]
        }

        if (resSalas && resSalas.sucesso) {
            const options = resSalas.dados.map(s => `<option value="${s.id}">${escapeHTML(s.nome)}</option>`).join(''); //[cite: 23]
            if (selectSala) selectSala.innerHTML = '<option value="">Selecione a Sala</option>' + options; //[cite: 23]
            if (filtroSala) filtroSala.innerHTML = '<option value="">Todas as Salas</option>' + options; //[cite: 23]
        }
    }

    async function carregarAulas() {
        const tabela = document.getElementById('tabela-aulas');
        if (!tabela) return;

        const resposta = await enviarParaPHP('AulaController.php', { acao: 'listar' }); //[cite: 23]
        if (resposta && resposta.sucesso) {
            renderizarTabelaAulas(tabela, resposta.dados); //[cite: 23]
        }
    }

    function renderizarTabelaAulas(tabelaElement, dados) {
        const tbody = tabelaElement.querySelector('tbody') || tabelaElement; //[cite: 23]
        const perfilAtivo = localStorage.getItem('perfilAtivo'); //[cite: 23]
        const ehCoordenacao = perfilAtivo === 'Coordenação'; //[cite: 23]

        tbody.innerHTML = dados.map(a => `
            <tr>
                <td>${escapeHTML(a.id)}</td>
                <td>${escapeHTML(a.turma_codigo || a.turma_id)}</td>
                <td>${escapeHTML(a.instrutor_nome || a.instrutor_id)}</td>
                <td>${escapeHTML(a.sala_nome || a.sala_id)}</td>
                <td>${escapeHTML(a.data)}</td>
                <td>${escapeHTML(a.hora_inicio)} - ${escapeHTML(a.hora_fim)}</td>
                ${ehCoordenacao ? `<td><button class="btn-deletar" data-id="${a.id}">Excluir</button></td>` : ''}
            </tr>
        `).join(''); //[cite: 23]

        anexarEventosExclusao(tabelaElement); //[cite: 23]
    }

    function anexarEventosExclusao(tabelaElement) {
        tabelaElement.querySelectorAll('.btn-deletar').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id'); //[cite: 23]
                if (confirm(`Deseja realmente excluir a aula ID ${id}?`)) { //[cite: 23]
                    const res = await enviarParaPHP('AulaController.php', { acao: 'deletar', id: id }); //[cite: 23]
                    if (res && res.sucesso) {
                        exibirToast(res.mensagem, "sucesso"); //[cite: 23]
                        carregarAulas(); //[cite: 23]
                    } else {
                        exibirToast(res?.mensagem || "Erro ao excluir.", "erro"); //[cite: 23]
                    }
                }
            });
        });
    }

    if (formAula) {
        formAula.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const dados = {
                acao: 'cadastrar',
                turma_id: document.getElementById('aula-turma-id').value,
                instrutor_id: document.getElementById('aula-instrutor-id').value,
                sala_id: document.getElementById('aula-sala-id').value,
                data: document.getElementById('aula-data').value,
                hora_inicio: document.getElementById('aula-hora-inicio').value,
                hora_fim: document.getElementById('aula-hora-fim').value
            }; //[cite: 23]

            const resposta = await enviarParaPHP('AulaController.php', dados); //[cite: 23]
            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem, "sucesso"); //[cite: 23]
                formAula.reset(); //[cite: 23]
                carregarAulas(); //[cite: 23]
            } else {
                exibirToast(resposta?.mensagem || "Erro ao agendar.", "erro"); //[cite: 23]
            }
        });
    }

    if (formFiltroRelatorio) {
        formFiltroRelatorio.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const tabelaRelatorio = document.getElementById('tabela-relatorio');
            const dados = {
                acao: 'gerar_relatorio',
                data_inicio: document.getElementById('filtro-data-inicio')?.value,
                data_fim: document.getElementById('filtro-data-fim')?.value,
                sala_id: document.getElementById('filtro-sala-id')?.value,
                instrutor_id: document.getElementById('filtro-instrutor-id')?.value,
                turma_id: document.getElementById('filtro-turma-id')?.value
            }; //[cite: 23]

            const resposta = await enviarParaPHP('AulaController.php', dados); //[cite: 23]
            if (resposta && resposta.sucesso && tabelaRelatorio) {
                renderizarTabelaAulas(tabelaRelatorio, resposta.dados); //[cite: 23]
                exibirToast("Relatório atualizado com sucesso!", "sucesso"); //[cite: 23]
            }
        });
    }

    carregarOpcoesSelects(); //[cite: 23]
    carregarAulas(); //[cite: 23]
});