/**
 * Descrição: Gerencia a ativação e persistência do Modo Escuro e Modo Daltônico.
 */

document.addEventListener('DOMContentLoaded', () => {
    const btnModoEscuro = document.getElementById('btn-modo-escuro');
    const btnModoDaltonico = document.getElementById('btn-modo-daltonico');

    // 1. Carrega as preferências salvas pelo usuário no localStorage
    const modoEscuroSalvo = localStorage.getItem('modoEscuro') === 'true';
    const modoDaltonicoSalvo = localStorage.getItem('modoDaltonico') === 'true';

    if (modoEscuroSalvo) {
        document.body.classList.add('modo-escuro');
    }

    if (modoDaltonicoSalvo) {
        document.body.classList.add('modo-daltonico');
    }

    // 2. Evento para o botão de Modo Escuro (btn-modo-escuro)
    if (btnModoEscuro) {
        btnModoEscuro.addEventListener('click', () => {
            const estaAtivo = document.body.classList.toggle('modo-escuro');
            localStorage.setItem('modoEscuro', estaAtivo);

            if (typeof exibirToast === 'function') {
                exibirToast(
                    estaAtivo ? "Modo Escuro ativado." : "Modo Escuro desativado.",
                    "sucesso"
                );
            }
        });
    }

    // 3. Evento para o botão de Modo Daltônico (btn-modo-daltonico)
    if (btnModoDaltonico) {
        btnModoDaltonico.addEventListener('click', () => {
            const estaAtivo = document.body.classList.toggle('modo-daltonico');
            localStorage.setItem('modoDaltonico', estaAtivo);

            if (typeof exibirToast === 'function') {
                exibirToast(
                    estaAtivo ? "Modo Daltônico ativado." : "Modo Daltônico desativado.",
                    "sucesso"
                );
            }
        });
    }
});
