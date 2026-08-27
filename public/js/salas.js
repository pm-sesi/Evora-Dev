/**
 * Gerenciamento das operações da entidade Salas
 */
document.addEventListener('DOMContentLoaded', () => {
    const formSala = document.getElementById('form-sala');
    const tabela = document.getElementById('tabela-salas');

    async function carregarSalas() {
        if (!tabela) return;

        const resposta = await enviarParaPHP('SalaController.php', { acao: 'listar' }); //[cite: 28]
        if (resposta && resposta.sucesso) {
            const tbody = tabela.querySelector('tbody') || tabela; //[cite: 28]
            const perfilAtivo = localStorage.getItem('perfilAtivo'); //[cite: 28]
            const ehCoordenacao = perfilAtivo === 'Coordenação'; //[cite: 28]

            tbody.innerHTML = resposta.dados.map(s => `
                <tr>
                    <td>${escapeHTML(s.id)}</td>
                    <td>${escapeHTML(s.nome)}</td>
                    <td>${escapeHTML(s.capacidade)}</td>
                    <td>${escapeHTML(s.tipo || '-')}</td>
                    ${ehCoordenacao ? `<td>
                        <button class="btn-editar" data-id="${escapeHTML(s.id)}" data-nome="${escapeHTML(s.nome)}" data-capacidade="${escapeHTML(s.capacidade)}" data-tipo="${escapeHTML(s.tipo || '')}">Editar</button>
                        <button class="btn-deletar" data-id="${escapeHTML(s.id)}">Excluir</button>
                    </td>` : ''}
                </tr>
            `).join(''); //[cite: 28]

            anexarEventosExclusao(); //[cite: 28]
            anexarEventosEdicao(); //[cite: 28]
        }
    }

    function anexarEventosExclusao() {
        if (!tabela) return;
        tabela.querySelectorAll('.btn-deletar').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id'); //[cite: 28]
                if (confirm(`Deseja realmente excluir a sala ID ${id}?`)) { //[cite: 28]
                    const res = await enviarParaPHP('SalaController.php', { acao: 'deletar', id: id }); //[cite: 28]
                    if (res && res.sucesso) {
                        exibirToast(res.mensagem, "sucesso"); //[cite: 28]
                        carregarSalas(); //[cite: 28]
                    } else {
                        exibirToast(res?.mensagem || "Erro ao excluir.", "erro"); //[cite: 28]
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
                const campoId = document.getElementById('sala-id');
                if (campoId) campoId.value = alvo.getAttribute('data-id');
                if (document.getElementById('sala-nome')) document.getElementById('sala-nome').value = alvo.getAttribute('data-nome');
                if (document.getElementById('sala-capacidade')) document.getElementById('sala-capacidade').value = alvo.getAttribute('data-capacidade');
                if (document.getElementById('sala-tipo')) document.getElementById('sala-tipo').value = alvo.getAttribute('data-tipo');

                const botaoSubmit = formSala?.querySelector('button[type="submit"]');
                if (botaoSubmit) botaoSubmit.textContent = 'Salvar Alterações';
                formSala?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }

    if (formSala) {
        formSala.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const idEdicao = document.getElementById('sala-id')?.value;
            const emEdicao = !!idEdicao;

            const dados = {
                acao: emEdicao ? 'atualizar' : 'cadastrar',
                nome: document.getElementById('sala-nome').value.trim(),
                capacidade: document.getElementById('sala-capacidade').value,
                tipo: document.getElementById('sala-tipo').value
            };
            if (emEdicao) dados.id = idEdicao;

            const resposta = await enviarParaPHP('SalaController.php', dados); //[cite: 28]
            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem, "sucesso"); //[cite: 28]
                formSala.reset(); //[cite: 28]
                if (document.getElementById('sala-id')) document.getElementById('sala-id').value = '';
                const botaoSubmit = formSala.querySelector('button[type="submit"]');
                if (botaoSubmit) botaoSubmit.textContent = 'Cadastrar Sala';
                carregarSalas(); //[cite: 28]
            } else {
                exibirToast(resposta?.mensagem || (emEdicao ? "Erro ao atualizar." : "Erro ao cadastrar."), "erro"); //[cite: 28]
            }
        });
    }

    carregarSalas(); //[cite: 28]
});