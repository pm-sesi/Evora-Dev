<?php
/**
 * Ponto de Entrada Principal (Root Gateway)
 * SISGED - Évora Dev
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Redireciona a sessão ativa para a view padrão do painel
if (isset($_SESSION['usuario']) && !empty($_SESSION['usuario'])) {
    header('Location: public/views/turmas.html'); 
    exit;
}

// Redireciona não autenticados para a tela de login
header('Location: public/views/login.html');
exit;