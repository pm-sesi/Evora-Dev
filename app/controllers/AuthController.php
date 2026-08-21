<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../models/UsuarioModel.php';

$dados = json_decode(file_get_contents('php://input'), true);
$acao = $dados['acao'] ?? '';

if ($acao === 'login') {
    $email = $dados['email'] ?? '';
    $senha = $dados['senha'] ?? '';
    $perfil = $dados['perfil'] ?? '';

    $model = new UsuarioModel();
    $usuario = $model->buscarPorEmail($email);

    if ($usuario && password_verify($senha, $usuario['senha']) && $usuario['perfil'] === $perfil) {
        session_start();
        $_SESSION['usuario'] = $usuario;
        echo json_encode(['sucesso' => true, 'mensagem' => 'Login realizado com sucesso!']);
    } else {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Credenciais inválidas.']);
    }
} elseif ($acao === 'logout') {
    session_start();
    session_destroy();
    echo json_encode(['sucesso' => true]);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Ação inválida.']);
}