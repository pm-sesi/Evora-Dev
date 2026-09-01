/**
 * Gerenciamento das operações da entidade Turmas e vinculo de chave estrangeira
 */
document.addEventListener('DOMContentLoaded', () => {
    const formTurma = document.getElementById('form-turma');
    const tabela = document.getElementById('tabela-turmas');

    async function carregarOpcoesSelects() {
        const selectInstrutor = document.getElementById('turma-instrutor-id');
        const selectSala = document.getElementById('turma-sala-id');

        if (selectInstrutor) {
            const resInst = await enviarParaPHP('InstrutorController.php', { acao: 'listar' }); //[cite: 29]
            if (resInst && resInst.sucesso) {
                selectInstrutor.innerHTML = '<option value="">Selecione um Instrutor</option>' + 
                    resInst.dados.map(i => `<option value="${i.id}">${escapeHTML(i.nome)}</option>`).join(''); //[cite: 29]
            }
        }

        if (selectSala) {
            const resSalas = await enviarParaPHP('SalaController.php', { acao: 'listar' }); //[cite: 29]
            if (resSalas && resSalas.sucesso) {
                selectSala.innerHTML = '<option value="">Selecione uma Sala</option>' + 
                    resSalas.dados.map(s => `<option value="${s.id}">${escapeHTML(s.nome)}</option>`).join(''); //[cite: 29]
            }
        }
    }

    async function carregarTurmas() {
        if (!tabela) return;

        const resposta = await enviarParaPHP('TurmaController.php', { acao: 'listar' }); //[cite: 29]
        if (resposta && resposta.sucesso) {
            const tbody = tabela.querySelector('tbody') || tabela; //[cite: 29]
            const perfilAtivo = localStorage.getItem('perfilAtivo'); //[cite: 29]
            const ehCoordenacao = perfilAtivo === 'Coordenação'; //[cite: 29]

            tbody.innerHTML = resposta.dados.map(t => `
                <tr>
                    <td>${escapeHTML(t.id)}</td>
                    <td>${escapeHTML(t.codigo)}</td>
                    <td>${escapeHTML(t.periodo)}</td>
                    <td>${escapeHTML(t.instrutor_nome || t.instrutor_id)}</td>
                    <td>${escapeHTML(t.sala_nome || t.sala_id)}</td>
                    <td>${escapeHTML(t.data_inicio)} até ${escapeHTML(t.data_fim)}</td>
                    ${ehCoordenacao ? `<td>
                        <button class="btn-editar" data-id="${escapeHTML(t.id)}" data-codigo="${escapeHTML(t.codigo)}" data-periodo="${escapeHTML(t.periodo)}" data-instrutor_id="${escapeHTML(t.instrutor_id)}" data-sala_id="${escapeHTML(t.sala_id)}" data-data_inicio="${escapeHTML(t.data_inicio)}" data-data_fim="${escapeHTML(t.data_fim)}">Editar</button>
                        <button class="btn-deletar" data-id="${escapeHTML(t.id)}">Excluir</button>
                    </td>` : ''}
                </tr>
            `).join(''); //[cite: 29]

            anexarEventosExclusao(); //[cite: 29]
            anexarEventosEdicao(); //[cite: 29]
        }
    }

    function anexarEventosExclusao() {
        if (!tabela) return;
        tabela.querySelectorAll('.btn-deletar').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id'); //[cite: 29]
                if (confirm(`Deseja realmente excluir a turma ID ${id}?`)) { //[cite: 29]
                    const res = await enviarParaPHP('TurmaController.php', { acao: 'deletar', id: id }); //[cite: 29]
                    if (res && res.sucesso) {
                        exibirToast(res.mensagem, "sucesso"); //[cite: 29]
                        carregarTurmas(); //[cite: 29]
                    } else {
                        exibirToast(res?.mensagem || "Erro ao excluir.", "erro"); //[cite: 29]
                    }
                }
            });
        });
    }

    function anexarEventosEdicao() {
        if (!tabela) return;
        tabela.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const alvo = e.target;
                const campoId = document.getElementById('turma-id');
                if (campoId) campoId.value = alvo.getAttribute('data-id');
                if (document.getElementById('turma-codigo')) document.getElementById('turma-codigo').value = alvo.getAttribute('data-codigo');
                if (document.getElementById('turma-periodo')) document.getElementById('turma-periodo').value = alvo.getAttribute('data-periodo');
                if (document.getElementById('turma-instrutor-id')) document.getElementById('turma-instrutor-id').value = alvo.getAttribute('data-instrutor_id');
                if (document.getElementById('turma-sala-id')) document.getElementById('turma-sala-id').value = alvo.getAttribute('data-sala_id');
                if (document.getElementById('turma-data-inicio')) document.getElementById('turma-data-inicio').value = alvo.getAttribute('data-data_inicio');
                if (document.getElementById('turma-data-fim')) document.getElementById('turma-data-fim').value = alvo.getAttribute('data-data_fim');

                const botaoSubmit = formTurma?.querySelector('button[type="submit"]');
                if (botaoSubmit) botaoSubmit.textContent = 'Salvar Alterações';
                formTurma?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }

    if (formTurma) {
        formTurma.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const idEdicao = document.getElementById('turma-id')?.value;
            const emEdicao = !!idEdicao;

            const dados = {
                acao: emEdicao ? 'atualizar' : 'cadastrar',
                codigo: document.getElementById('turma-codigo').value.trim(),
                periodo: document.getElementById('turma-periodo').value,
                instrutor_id: document.getElementById('turma-instrutor-id').value,
                sala_id: document.getElementById('turma-sala-id').value,
                data_inicio: document.getElementById('turma-data-inicio').value,
                data_fim: document.getElementById('turma-data-fim').value
            };
            if (emEdicao) dados.id = idEdicao;

            const resposta = await enviarParaPHP('TurmaController.php', dados); //[cite: 29]
            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem, "sucesso"); //[cite: 29]
                formTurma.reset(); //[cite: 29]
                if (document.getElementById('turma-id')) document.getElementById('turma-id').value = '';
                const botaoSubmit = formTurma.querySelector('button[type="submit"]');
                if (botaoSubmit) botaoSubmit.textContent = 'Cadastrar Turma';
                carregarTurmas(); //[cite: 29]
            } else {
                exibirToast(resposta?.mensagem || (emEdicao ? "Erro ao atualizar." : "Erro ao cadastrar."), "erro"); //[cite: 29]
            }
        });
    }

    carregarOpcoesSelects(); //[cite: 29]
    carregarTurmas(); //[cite: 29]
});