/**
 * Gerenciamento das operações da entidade Instrutores
 */
document.addEventListener('DOMContentLoaded', () => {
    const formInstrutor = document.getElementById('form-instrutor');
    const tabela = document.getElementById('tabela-instrutores');

    async function carregarInstrutores() {
        if (!tabela) return;
        
        const resposta = await enviarParaPHP('InstrutorController.php', { acao: 'listar' }); //[cite: 25]
        if (resposta && resposta.sucesso) {
            const tbody = tabela.querySelector('tbody') || tabela; //[cite: 25]
            const perfilAtivo = localStorage.getItem('perfilAtivo'); //[cite: 25]
            const ehCoordenacao = perfilAtivo === 'Coordenação'; //[cite: 25]

            tbody.innerHTML = resposta.dados.map(i => `
                <tr>
                    <td>${escapeHTML(i.id)}</td>
                    <td>${escapeHTML(i.nome)}</td>
                    <td>${escapeHTML(i.cpf)}</td>
                    <td>${escapeHTML(i.email)}</td>
                    <td>${escapeHTML(i.especialidades || '-')}</td>
                    ${ehCoordenacao ? `<td>
                        <button class="btn-editar" data-id="${escapeHTML(i.id)}" data-nome="${escapeHTML(i.nome)}" data-cpf="${escapeHTML(i.cpf)}" data-email="${escapeHTML(i.email)}" data-especialidades="${escapeHTML(i.especialidades || '')}">Editar</button>
                        <button class="btn-deletar" data-id="${escapeHTML(i.id)}">Excluir</button>
                    </td>` : ''}
                </tr>
            `).join(''); //[cite: 25]

            anexarEventosExclusao(); //[cite: 25]
            anexarEventosEdicao(); //[cite: 25]
        }
    }

    function anexarEventosExclusao() {
        if (!tabela) return;
        tabela.querySelectorAll('.btn-deletar').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id'); //[cite: 25]
                if (confirm(`Deseja realmente excluir o instrutor ID ${id}?`)) { //[cite: 25]
                    const res = await enviarParaPHP('InstrutorController.php', { acao: 'deletar', id: id }); //[cite: 25]
                    if (res && res.sucesso) {
                        exibirToast(res.mensagem, "sucesso"); //[cite: 25]
                        carregarInstrutores(); //[cite: 25]
                    } else {
                        exibirToast(res?.mensagem || "Erro ao excluir.", "erro"); //[cite: 25]
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
                const campoId = document.getElementById('instrutor-id');
                if (campoId) campoId.value = alvo.getAttribute('data-id');
                if (document.getElementById('instrutor-nome')) document.getElementById('instrutor-nome').value = alvo.getAttribute('data-nome');
                if (document.getElementById('instrutor-cpf')) document.getElementById('instrutor-cpf').value = alvo.getAttribute('data-cpf');
                if (document.getElementById('instrutor-email')) document.getElementById('instrutor-email').value = alvo.getAttribute('data-email');
                if (document.getElementById('instrutor-especialidades')) document.getElementById('instrutor-especialidades').value = alvo.getAttribute('data-especialidades');

                const botaoSubmit = formInstrutor?.querySelector('button[type="submit"]');
                if (botaoSubmit) botaoSubmit.textContent = 'Salvar Alterações';
                formInstrutor?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }

    if (formInstrutor) {
        formInstrutor.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const idEdicao = document.getElementById('instrutor-id')?.value;
            const emEdicao = !!idEdicao;

            const dados = {
                acao: emEdicao ? 'atualizar' : 'cadastrar',
                nome: document.getElementById('instrutor-nome').value.trim(),
                cpf: document.getElementById('instrutor-cpf').value.trim(),
                email: document.getElementById('instrutor-email').value.trim(),
                especialidades: document.getElementById('instrutor-especialidades').value.trim()
            };
            if (emEdicao) dados.id = idEdicao;

            const resposta = await enviarParaPHP('InstrutorController.php', dados); //[cite: 25]
            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem, "sucesso"); //[cite: 25]
                formInstrutor.reset(); //[cite: 25]
                if (document.getElementById('instrutor-id')) document.getElementById('instrutor-id').value = '';
                const botaoSubmit = formInstrutor.querySelector('button[type="submit"]');
                if (botaoSubmit) botaoSubmit.textContent = 'Cadastrar Instrutor';
                carregarInstrutores(); //[cite: 25]
            } else {
                exibirToast(resposta?.mensagem || (emEdicao ? "Erro ao atualizar." : "Erro ao cadastrar."), "erro"); //[cite: 25]
            }
        });
    }

    carregarInstrutores(); //[cite: 25]
});