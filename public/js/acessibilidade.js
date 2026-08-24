/**
 * Gerencia o estado e persistência dos modos de acessibilidade (Escuro e Daltônico)
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnModoEscuro = document.getElementById('btn-modo-escuro'); //[cite: 22]
    const btnModoDaltonico = document.getElementById('btn-modo-daltonico'); //[cite: 22]

    const modoEscuroSalvo = localStorage.getItem('modoEscuro') === 'true'; //[cite: 22]
    const modoDaltonicoSalvo = localStorage.getItem('modoDaltonico') === 'true'; //[cite: 22]

    if (modoEscuroSalvo) document.body.classList.add('modo-escuro'); //[cite: 22]
    if (modoDaltonicoSalvo) document.body.classList.add('modo-daltonico'); //[cite: 22]

    if (btnModoEscuro) {
        btnModoEscuro.addEventListener('click', () => {
            const estaAtivo = document.body.classList.toggle('modo-escuro'); //[cite: 22]
            localStorage.setItem('modoEscuro', estaAtivo); //[cite: 22]
            if (typeof exibirToast === 'function') {
                exibirToast(estaAtivo ? "Modo Escuro ativado." : "Modo Escuro desativado.", "sucesso"); //[cite: 22]
            }
        });
    }

    if (btnModoDaltonico) {
        btnModoDaltonico.addEventListener('click', () => {
            const estaAtivo = document.body.classList.toggle('modo-daltonico'); //[cite: 22]
            localStorage.setItem('modoDaltonico', estaAtivo); //[cite: 22]
            if (typeof exibirToast === 'function') {
                exibirToast(estaAtivo ? "Modo Daltônico ativado." : "Modo Daltônico desativado.", "sucesso"); //[cite: 22]
            }
        });
    }
});