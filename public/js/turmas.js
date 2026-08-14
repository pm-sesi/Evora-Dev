
document.addEventListener('DOMContentLoaded', () => {
    const formTurma = document.getElementById('form-turma');

    if (formTurma) {
        formTurma.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            // Mapeamento exato dos IDs definidos na documentação do SISGED
            const dados = {
                acao: 'cadastrar',
                codigo: document.getElementById('turma-codigo').value.trim(),
                periodo: document.getElementById('turma-periodo').value,
                instrutor_id: document.getElementById('turma-instrutor-id').value,
                sala_id: document.getElementById('turma-sala-id').value,
                data_inicio: document.getElementById('turma-data-inicio').value,
                data_fim: document.getElementById('turma-data-fim').value
            };

            // Envia para o controller no padrão MVC
            const resposta = await enviarParaPHP('../../app/controllers/TurmaController.php', dados);

            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem || "Turma cadastrada com sucesso!", "sucesso");
                formTurma.reset();
            } else {
                exibirToast(resposta?.mensagem || "Erro ao cadastrar turma.", "erro");
            }
        });
    }
});