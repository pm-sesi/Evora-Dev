<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../models/AulaModel.php';

$dados = json_decode(file_get_contents('php://input'), true);

if (($dados['acao'] ?? '') === 'cadastrar') {
    $model = new AulaModel();
    $sucesso = $model->cadastrar(
        $dados['turma_id'],
        $dados['instrutor_id'],
        $dados['sala_id'],
        $dados['data'],
        $dados['hora_inicio'],
        $dados['hora_fim']
    );

    echo json_encode([
        'sucesso' => $sucesso,
        'mensagem' => $sucesso ? "Aula agendada com sucesso!" : "Erro ao agendar aula no banco."
    ]);
}