// assets/js/cruds.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- CADASTRO DE INSTRUTOR ---
    const formInstrutor = document.getElementById('form-instrutor');
    if (formInstrutor) {
        formInstrutor.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const dados = {
                acao: 'cadastrar',
                nome: document.getElementById('instrutor-nome').value,
                cpf: document.getElementById('instrutor-cpf').value,
                email: document.getElementById('instrutor-email').value,
                especialidades: document.getElementById('instrutor-especialidades').value
            };

            const resposta = await enviarParaPHP('controllers/InstrutorController.php', dados);
            if (resposta && resposta.sucesso) {
                exibirToast("Instrutor cadastrado com sucesso!");
                formInstrutor.reset(); // Limpa os campos
            }
        });
    }

    // --- CADASTRO DE SALA ---
    const formSala = document.getElementById('form-sala');
    if (formSala) {
        formSala.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const dados = {
                acao: 'cadastrar',
                nome: document.getElementById('sala-nome').value,
                capacidade: document.getElementById('sala-capacidade').value,
                tipo: document.getElementById('sala-tipo').value
            };

            const resposta = await enviarParaPHP('controllers/SalaController.php', dados);
            if (resposta && resposta.sucesso) {
                exibirToast("Sala cadastrada com sucesso!");
                formSala.reset();
            }
        });
    }
});

