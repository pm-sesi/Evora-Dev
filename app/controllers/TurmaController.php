<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../models/TurmaModel.php';

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$acao = $input['acao'] ?? '';
$model = new TurmaModel();

if ($acao === 'listar') {
    try {
        $dados = $model->listar();
        echo json_encode(['sucesso' => true, 'dados' => $dados]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao listar turmas.']);
    }
    exit;
}

if ($acao === 'cadastrar') {
    if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['perfil'] !== 'Coordenação') {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Acesso negado: Permissão insuficiente.']);
        exit;
    }

    if (empty($input['codigo']) || empty($input['periodo']) || empty($input['instrutor_id']) || empty($input['sala_id'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha todos os campos obrigatórios da turma.']);
        exit;
    }

    try {
        $sucesso = $model->cadastrar($input);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Turma cadastrada com sucesso!' : 'Erro ao cadastrar turma.'
        ]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro no banco de dados.']);
    }
    exit;
}

if ($acao === 'deletar') {
    if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['perfil'] !== 'Coordenação') {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Acesso negado: Permissão insuficiente.']);
        exit;
    }

    $id = $input['id'] ?? null;
    if (!$id) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'ID da turma não fornecido.']);
        exit;
    }

    try {
        $sucesso = $model->deletar($id);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Turma excluída com sucesso!' : 'Erro ao excluir turma.'
        ]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao excluir turma (pode conter aulas vinculadas).']);
    }
    exit;
}

echo json_encode(['sucesso' => false, 'mensagem' => 'Ação inválida.']);