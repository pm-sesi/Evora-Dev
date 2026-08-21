<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../models/SalaModel.php';

$dados = json_decode(file_get_contents('php://input'), true);

if (($dados['acao'] ?? '') === 'cadastrar') {
    $model = new SalaModel();
    $sucesso = $model->cadastrar(
        $dados['nome'],
        $dados['capacidade'],
        $dados['tipo']
    );

    echo json_encode([
        'sucesso' => $sucesso,
        'mensagem' => $sucesso ? "Sala cadastrada com sucesso!" : "Erro ao cadastrar sala no banco."
    ]);
}