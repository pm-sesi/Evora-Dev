// assets/js/integracao.js

/**
 * Função para centralizar todas as requisições ao PHP (Controllers)
 */
async function enviarParaPHP(urlController, dados) {
    try {
        const resposta = await fetch(urlController, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        return await resposta.json(); // O Guidu precisa garantir que o PHP retorne JSON
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        exibirToast("Erro de comunicação com o servidor.");
        return null;
    }
}

/**
 * Exibe mensagens na tela usando o ID mapeado
 */
function exibirToast(mensagem) {
    const toast = document.getElementById('toast-mensagem');
    if (toast) {
        toast.textContent = mensagem;
        toast.classList.add('mostrar');
        setTimeout(() => toast.classList.remove('mostrar'), 3000);
    } else {
        alert(mensagem); // Fallback caso html/css esqueça de criar o Toast
    }
}