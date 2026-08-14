
document.addEventListener('DOMContentLoaded', () => {
    const formAula = document.getElementById('form-aula');

    if (formAula) {
        formAula.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            // Mapeamento exato dos IDs definidos na documentação do SISGED
            const dados = {
                acao: 'cadastrar',
                turma_id: document.getElementById('aula-turma-id').value,
                instrutor_id: document.getElementById('aula-instrutor-id').value,
                sala_id: document.getElementById('aula-sala-id').value,
                data: document.getElementById('aula-data').value,
                hora_inicio: document.getElementById('aula-hora-inicio').value,
                hora_fim: document.getElementById('aula-hora-fim').value
            };

            // Envia para o controller no padrão MVC
            const resposta = await enviarParaPHP('../../app/controllers/AulaController.php', dados);

            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem || "Aula agendada com sucesso!", "sucesso");
                formAula.reset();
            } else {
                exibirToast(resposta?.mensagem || "Erro ao agendar aula.", "erro");
            }
        });
    }
});