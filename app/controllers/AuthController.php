<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../models/UsuarioModel.php';

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$acao = $input['acao'] ?? '';

if ($acao === 'login') {
    $email = trim($input['email'] ?? '');
    $senha = $input['senha'] ?? '';
    $perfil = $input['perfil'] ?? null;

    if (empty($email) || empty($senha)) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Por favor, informe e-mail e senha.']);
        exit;
    }

    try {
        $model = new UsuarioModel();
        $usuario = $model->autenticar($email, $senha, $perfil);

        if ($usuario) {
            $_SESSION['usuario'] = $usuario;
            echo json_encode(['sucesso' => true, 'usuario' => $usuario]);
        } else {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Credenciais inválidas.']);
        }
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro no servidor: ' . $e->getMessage()]);
    }
    exit;
}

if ($acao === 'logout') {
    unset($_SESSION['usuario']);
    session_destroy();
    echo json_encode(['sucesso' => true, 'mensagem' => 'Sessão encerrada com sucesso.']);
    exit;
}

echo json_encode(['sucesso' => false, 'mensagem' => 'Ação inválida.']);