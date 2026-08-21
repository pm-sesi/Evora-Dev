<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../models/InstrutorModel.php';

$dados = json_decode(file_get_contents('php://input'), true);

if (($dados['acao'] ?? '') === 'cadastrar') {
    $model = new InstrutorModel();
    $sucesso = $model->cadastrar(
        $dados['nome'],
        $dados['cpf'],
        $dados['email'],
        $dados['especialidades']
    );

    echo json_encode([
        'sucesso' => $sucesso,
        'mensagem' => $sucesso ? "Instrutor cadastrado com sucesso!" : "Erro ao cadastrar instrutor no banco."
    ]);
}