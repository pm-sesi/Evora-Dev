
document.addEventListener('DOMContentLoaded', () => {
    const formInstrutor = document.getElementById('form-instrutor');

    if (formInstrutor) {
        formInstrutor.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const dados = {
                acao: 'cadastrar',
                nome: document.getElementById('instrutor-nome').value.trim(),
                cpf: document.getElementById('instrutor-cpf').value.trim(),
                email: document.getElementById('instrutor-email').value.trim(),
                especialidades: document.getElementById('instrutor-especialidades').value.trim()
            };

            // Envia para o controller no caminho do MVC
            const resposta = await enviarParaPHP('../../app/controllers/InstrutorController.php', dados);

            if (resposta && resposta.sucesso) {
                exibirToast(resposta.mensagem || "Instrutor cadastrado com sucesso!", "sucesso");
                formInstrutor.reset();
            } else {
                exibirToast(resposta?.mensagem || "Erro ao cadastrar instrutor.", "erro");
            }
        });
    }
});