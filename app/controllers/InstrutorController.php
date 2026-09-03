<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
header('Content-Type: application/json');
require_once __DIR__ . '/../models/InstrutorModel.php';

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$acao = $input['acao'] ?? '';
$model = new InstrutorModel();

if ($acao === 'listar') {
    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Acesso negado: faça login para continuar.']);
        exit;
    }

    try {
        $dados = $model->listar();
        echo json_encode(['sucesso' => true, 'dados' => $dados]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao listar instrutores.']);
    }
    exit;
}

if ($acao === 'cadastrar') {
    if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['perfil'] !== 'Coordenação') {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Acesso negado: Permissão insuficiente.']);
        exit;
    }

    if (empty($input['nome']) || empty($input['cpf']) || empty($input['email'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha os campos obrigatórios.']);
        exit;
    }

    try {
        $sucesso = $model->cadastrar($input);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Instrutor cadastrado com sucesso!' : 'Erro ao cadastrar instrutor.'
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
        echo json_encode(['sucesso' => false, 'mensagem' => 'ID do instrutor não fornecido.']);
        exit;
    }

    if (empty($input['nome']) || empty($input['cpf']) || empty($input['email'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha os campos obrigatórios.']);
        exit;
    }

    try {
        $sucesso = $model->atualizar($id, $input);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Instrutor atualizado com sucesso!' : 'Erro ao atualizar instrutor.'
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
        echo json_encode(['sucesso' => false, 'mensagem' => 'ID do instrutor não fornecido.']);
        exit;
    }

    try {
        $sucesso = $model->deletar($id);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Instrutor excluído com sucesso!' : 'Erro ao excluir instrutor.'
        ]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao excluir instrutor (pode conter vínculos ativos).']);
    }
    exit;
}

echo json_encode(['sucesso' => false, 'mensagem' => 'Ação inválida.']);