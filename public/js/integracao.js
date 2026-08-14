
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
        
        return await resposta.json(); // O PHP deve retornar um JSON válido
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        exibirToast("Erro de comunicação com o servidor.", "erro");
        return null;
    }
}

/**
 * Exibe mensagens na tela usando o ID 'toast-mensagem'
 */
function exibirToast(mensagem, tipo = "sucesso") {
    const toast = document.getElementById('toast-mensagem');
    if (toast) {
        toast.textContent = mensagem;
        toast.classList.add('mostrar');
        if (tipo === "erro") toast.classList.add('erro');
        
        setTimeout(() => {
            toast.classList.remove('mostrar', 'erro');
        }, 3000);
    } else {
        alert(mensagem); // Fallback caso o HTML ainda não possua o container do Toast
    }
}