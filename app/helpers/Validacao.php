<?php
/**
 * Validações compartilhadas pelos controllers do SISGED.
 * Toda validação feita no navegador é repetida aqui, porque o front-end
 * pode ser contornado (a API aceita chamadas diretas).
 */

/**
 * Valida o formato de um e-mail. Aceita "instrutor@sisged.com", rejeita "abc".
 */
function emailValido($email) {
    return filter_var(trim($email), FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Valida um CPF conferindo os dois dígitos verificadores.
 * Aceita com ou sem máscara (123.456.789-09 ou 12345678909).
 * Rejeita sequências repetidas (111.111.111-11), que passam no cálculo
 * mas não são CPFs válidos.
 */
function cpfValido($cpf) {
    $cpf = preg_replace('/\D/', '', (string) $cpf);

    if (strlen($cpf) !== 11) {
        return false;
    }
    if (preg_match('/^(\d)\1{10}$/', $cpf)) {
        return false;
    }

    // Calcula e confere os dois dígitos verificadores
    for ($posicao = 9; $posicao < 11; $posicao++) {
        $soma = 0;
        for ($i = 0; $i < $posicao; $i++) {
            $soma += $cpf[$i] * (($posicao + 1) - $i);
        }
        $digito = ((10 * $soma) % 11) % 10;

        if ((int) $cpf[$posicao] !== $digito) {
            return false;
        }
    }

    return true;
}

/**
 * Confere se o horário final é posterior ao inicial.
 * Espera strings no formato HH:MM ou HH:MM:SS.
 */
function horarioValido($horaInicio, $horaFim) {
    $inicio = strtotime($horaInicio);
    $fim = strtotime($horaFim);

    if ($inicio === false || $fim === false) {
        return false;
    }

    return $fim > $inicio;
}
