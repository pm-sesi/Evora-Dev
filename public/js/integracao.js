/**
 * integracao.js - Camada Central de Integração e Funções Utilitárias
 * SISGED - Évora Dev
 */

const API_BASE_URL = '../../app/controllers/'; 

function escapeHTML(str) { 
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

async function enviarParaPHP(controller, dados = {}) {
    try {
        // Extrai apenas o nome do arquivo controller caso venha com caminho relativo
        const nomeController = controller.split('/').pop();
        const resposta = await fetch(`${API_BASE_URL}${nomeController}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error(`Falha no servidor: HTTP ${resposta.status}`); 
        }

        return await resposta.json(); 
    } catch (erro) {
        console.error(`[Integracao] Erro em ${controller}:`, erro); 
        throw erro;
    }
}

/**
 * Liga um campo de busca (input#idInput) a uma tabela (table#idTabela),
 * escondendo as linhas do <tbody> que não contêm o termo digitado.
 * Funciona mesmo quando a tabela é recarregada depois (o listener fica no input).
 */
/**
 * Valida o formato de um e-mail. Aceita "instrutor@sisged.com", rejeita "abc".
 */
function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
}

/**
 * Valida um CPF conferindo os dois dígitos verificadores.
 * Aceita com ou sem máscara. Rejeita sequências repetidas (111.111.111-11).
 */
function cpfValido(cpf) {
    const numeros = String(cpf).replace(/\D/g, '');

    if (numeros.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(numeros)) return false;

    for (let posicao = 9; posicao < 11; posicao++) {
        let soma = 0;
        for (let i = 0; i < posicao; i++) {
            soma += Number(numeros[i]) * ((posicao + 1) - i);
        }
        const digito = ((10 * soma) % 11) % 10;
        if (Number(numeros[posicao]) !== digito) return false;
    }

    return true;
}

/**
 * Confere se o horário final é posterior ao inicial (formato HH:MM).
 */
function horarioValido(horaInicio, horaFim) {
    if (!horaInicio || !horaFim) return false;
    return horaFim > horaInicio; // strings HH:MM comparam corretamente em ordem alfabética
}

function ativarBuscaTabela(idTabela, idInput) {
    const input = document.getElementById(idInput);
    const tabela = document.getElementById(idTabela);
    if (!input || !tabela) return;

    input.addEventListener('input', () => {
        const termo = input.value.trim().toLowerCase();
        const linhas = tabela.querySelectorAll('tbody tr');
        linhas.forEach(linha => {
            const texto = linha.textContent.toLowerCase();
            linha.style.display = (!termo || texto.includes(termo)) ? '' : 'none';
        });
    });
}

function exibirToast(mensagem, tipo = 'sucesso') { 
    let toastEl = document.getElementById('toast');

    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'toast';
        toastEl.className = 'toast';
        toastEl.setAttribute('role', 'status');
        toastEl.setAttribute('aria-live', 'polite');
        toastEl.setAttribute('aria-atomic', 'true');
        document.body.appendChild(toastEl);
    }

    toastEl.textContent = mensagem;
    toastEl.classList.remove('mostrar', 'erro', 'sucesso');
    toastEl.classList.add('mostrar', tipo === 'erro' ? 'erro' : 'sucesso');

    setTimeout(() => {
        toastEl.classList.remove('mostrar');
    }, 3000);
}

// Escuta o clique no botão de logout quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.getElementById('btn-logout');

    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            try {
                // Utiliza a função utilitária enviarParaPHP já existente no projeto
                const dados = await enviarParaPHP('AuthController.php', { acao: 'logout' });

                if (dados.sucesso) {
                    window.location.href = 'login.html';
                } else {
                    alert('Não foi possível encerrar a sessão.');
                }
            } catch (erro) {
                console.error('Erro ao realizar logout:', erro);
            }
        });
    }
});