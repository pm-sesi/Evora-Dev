<?php
/**
 * Model de Gerenciamento e Agendamento de Aulas
 */
require_once __DIR__ . '/../config/database.php';

class AulaModel {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function listar() {
        $sql = "SELECT a.id, a.turma_id, a.instrutor_id, a.sala_id, a.data, a.hora_inicio, a.hora_fim,
                       t.codigo AS turma_codigo, i.nome AS instrutor_nome, s.nome AS sala_nome
                FROM aulas a
                LEFT JOIN turmas t ON a.turma_id = t.id
                LEFT JOIN instrutores i ON a.instrutor_id = i.id
                LEFT JOIN salas s ON a.sala_id = s.id
                ORDER BY a.data DESC, a.hora_inicio ASC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }

    public function cadastrar($dados) {
        $sql = "INSERT INTO aulas (turma_id, instrutor_id, sala_id, data, hora_inicio, hora_fim) 
                VALUES (:turma_id, :instrutor_id, :sala_id, :data, :hora_inicio, :hora_fim)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':turma_id' => $dados['turma_id'],
            ':instrutor_id' => $dados['instrutor_id'],
            ':sala_id' => $dados['sala_id'],
            ':data' => $dados['data'],
            ':hora_inicio' => $dados['hora_inicio'],
            ':hora_fim' => $dados['hora_fim']
        ]);
    }

    public function deletar($id) {
        $stmt = $this->db->prepare("DELETE FROM aulas WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function gerarRelatorio($filtros = []) {
        $sql = "SELECT a.id, a.turma_id, a.instrutor_id, a.sala_id, a.data, a.hora_inicio, a.hora_fim,
                       t.codigo AS turma_codigo, i.nome AS instrutor_nome, s.nome AS sala_nome
                FROM aulas a
                LEFT JOIN turmas t ON a.turma_id = t.id
                LEFT JOIN instrutores i ON a.instrutor_id = i.id
                LEFT JOIN salas s ON a.sala_id = s.id
                WHERE 1=1";
        
        $params = [];

        if (!empty($filtros['data_inicio'])) {
            $sql .= " AND a.data >= :data_inicio";
            $params[':data_inicio'] = $filtros['data_inicio'];
        }
        if (!empty($filtros['data_fim'])) {
            $sql .= " AND a.data <= :data_fim";
            $params[':data_fim'] = $filtros['data_fim'];
        }
        if (!empty($filtros['sala_id'])) {
            $sql .= " AND a.sala_id = :sala_id";
            $params[':sala_id'] = $filtros['sala_id'];
        }
        if (!empty($filtros['instrutor_id'])) {
            $sql .= " AND a.instrutor_id = :instrutor_id";
            $params[':instrutor_id'] = $filtros['instrutor_id'];
        }
        if (!empty($filtros['turma_id'])) {
            $sql .= " AND a.turma_id = :turma_id";
            $params[':turma_id'] = $filtros['turma_id'];
        }

        $sql .= " ORDER BY a.data ASC, a.hora_inicio ASC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}