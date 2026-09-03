<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
header('Content-Type: application/json');
require_once __DIR__ . '/../models/SalaModel.php';

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$acao = $input['acao'] ?? '';
$model = new SalaModel();

if ($acao === 'listar') {
    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Acesso negado: faça login para continuar.']);
        exit;
    }

    try {
        $dados = $model->listar();
        echo json_encode(['sucesso' => true, 'dados' => $dados]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao listar salas.']);
    }
    exit;
}

if ($acao === 'cadastrar') {
    if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['perfil'] !== 'Coordenação') {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Acesso negado: Permissão insuficiente.']);
        exit;
    }

    if (empty($input['nome']) || empty($input['capacidade'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha o nome e a capacidade da sala.']);
        exit;
    }

    try {
        $sucesso = $model->cadastrar($input);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Sala cadastrada com sucesso!' : 'Erro ao cadastrar sala.'
        ]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro no banco de dados.']);
    }
    exit;
}

if ($acao === 'atualizar') {
    if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['perfil'] !== 'Coordenação') {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Acesso negado: Permissão insuficiente.']);
        exit;
    }

    $id = $input['id'] ?? null;
    if (!$id) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'ID da sala não fornecido.']);
        exit;
    }

    if (empty($input['nome']) || empty($input['capacidade'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha o nome e a capacidade da sala.']);
        exit;
    }

    try {
        $sucesso = $model->atualizar($id, $input);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Sala atualizada com sucesso!' : 'Erro ao atualizar sala.'
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
        echo json_encode(['sucesso' => false, 'mensagem' => 'ID da sala não fornecido.']);
        exit;
    }

    try {
        $sucesso = $model->deletar($id);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Sala excluída com sucesso!' : 'Erro ao excluir sala.'
        ]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao excluir sala (pode conter vínculos ativos).']);
    }
    exit;
}

echo json_encode(['sucesso' => false, 'mensagem' => 'Ação inválida.']);