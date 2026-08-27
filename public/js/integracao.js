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

function exibirToast(mensagem, tipo = 'sucesso') { 
    let toastEl = document.getElementById('toast');

    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'toast';
        toastEl.className = 'toast';
        // WCAG: garante que leitores de tela anunciem a mensagem
        // assim que ela for inserida no DOM, sem exigir foco manual.
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