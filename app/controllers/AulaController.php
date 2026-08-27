<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
header('Content-Type: application/json');
require_once __DIR__ . '/../models/AulaModel.php';

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$acao = $input['acao'] ?? '';
$model = new AulaModel();

if ($acao === 'listar') {
    try {
        $dados = $model->listar();
        echo json_encode(['sucesso' => true, 'dados' => $dados]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao listar aulas.']);
    }
    exit;
}

if ($acao === 'cadastrar') {
    if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['perfil'] !== 'Coordenação') {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Acesso negado: Permissão insuficiente.']);
        exit;
    }

    if (empty($input['turma_id']) || empty($input['instrutor_id']) || empty($input['sala_id']) || empty($input['data']) || empty($input['hora_inicio']) || empty($input['hora_fim'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha todos os dados da aula.']);
        exit;
    }

    try {
        $sucesso = $model->cadastrar($input);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Aula agendada com sucesso!' : 'Erro ao agendar aula.'
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
        echo json_encode(['sucesso' => false, 'mensagem' => 'ID da aula não fornecido.']);
        exit;
    }

    if (empty($input['turma_id']) || empty($input['instrutor_id']) || empty($input['sala_id']) || empty($input['data']) || empty($input['hora_inicio']) || empty($input['hora_fim'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha todos os dados da aula.']);
        exit;
    }

    try {
        $sucesso = $model->atualizar($id, $input);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Aula atualizada com sucesso!' : 'Erro ao atualizar aula.'
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
        echo json_encode(['sucesso' => false, 'mensagem' => 'ID da aula não fornecido.']);
        exit;
    }

    try {
        $sucesso = $model->deletar($id);
        echo json_encode([
            'sucesso' => $sucesso,
            'mensagem' => $sucesso ? 'Aula excluída com sucesso!' : 'Erro ao excluir aula.'
        ]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao excluir aula.']);
    }
    exit;
}

if ($acao === 'gerar_relatorio') {
    try {
        $dados = $model->gerarRelatorio($input);
        echo json_encode(['sucesso' => true, 'dados' => $dados]);
    } catch (Exception $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao gerar relatório.']);
    }
    exit;
}

echo json_encode(['sucesso' => false, 'mensagem' => 'Ação inválida.']);