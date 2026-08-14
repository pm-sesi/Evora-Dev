
document.addEventListener('DOMContentLoaded', () => {
    const formSala = document.getElementById('form-sala');

    if (formSala) {
        formSala.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const dados = {
                acao: 'cadastrar',
                nome: document.getElementById('sala-nome').value.trim(),
                capacidade: document.getElementById('sala-capacidade').value,
                tipo: document.getElementById('sala-tipo').value
            };

            // Envia para o controller no caminho do MVC
            const resposta = await enviarParaPHP('../../app/controllers/SalaController.php', dados);

            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem || "Sala cadastrada com sucesso!", "sucesso");
                formSala.reset();
            } else {
                exibirToast(resposta?.mensagem || "Erro ao cadastrar sala.", "erro");
            }
        });
    }
});