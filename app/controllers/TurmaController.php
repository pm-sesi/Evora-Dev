<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../models/TurmaModel.php';

$dados = json_decode(file_get_contents('php://input'), true);

if (($dados['acao'] ?? '') === 'cadastrar') {
    $model = new TurmaModel();
    $sucesso = $model->cadastrar(
        $dados['codigo'],
        $dados['periodo'],
        $dados['instrutor_id'],
        $dados['sala_id'],
        $dados['data_inicio'],
        $dados['data_fim']
    );

    echo json_encode([
        'sucesso' => $sucesso,
        'mensagem' => $sucesso ? "Turma cadastrada com sucesso!" : "Erro ao cadastrar turma no banco."
    ]);
}