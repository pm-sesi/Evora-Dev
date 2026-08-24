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
                    ${ehCoordenacao ? `<td><button class="btn-deletar" data-id="${i.id}">Excluir</button></td>` : ''}
                </tr>
            `).join(''); //[cite: 25]

            anexarEventosExclusao(); //[cite: 25]
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

    if (formInstrutor) {
        formInstrutor.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const dados = {
                acao: 'cadastrar',
                nome: document.getElementById('instrutor-nome').value.trim(),
                cpf: document.getElementById('instrutor-cpf').value.trim(),
                email: document.getElementById('instrutor-email').value.trim(),
                especialidades: document.getElementById('instrutor-especialidades').value.trim()
            }; //[cite: 25]

            const resposta = await enviarParaPHP('InstrutorController.php', dados); //[cite: 25]
            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem, "sucesso"); //[cite: 25]
                formInstrutor.reset(); //[cite: 25]
                carregarInstrutores(); //[cite: 25]
            } else {
                exibirToast(resposta?.mensagem || "Erro ao cadastrar.", "erro"); //[cite: 25]
            }
        });
    }

    carregarInstrutores(); //[cite: 25]
});