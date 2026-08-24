<?php
/**
 * Model de Gerenciamento de Turmas
 */
require_once __DIR__ . '/Database.php';

class TurmaModel {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function listar() {
        $sql = "SELECT t.id, t.codigo, t.periodo, t.instrutor_id, t.sala_id, t.data_inicio, t.data_fim,
                       i.nome AS instrutor_nome, s.nome AS sala_nome
                FROM turmas t
                LEFT JOIN instrutores i ON t.instrutor_id = i.id
                LEFT JOIN salas s ON t.sala_id = s.id
                ORDER BY t.codigo ASC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }

    public function cadastrar($dados) {
        $sql = "INSERT INTO turmas (codigo, periodo, instrutor_id, sala_id, data_inicio, data_fim) 
                VALUES (:codigo, :periodo, :instrutor_id, :sala_id, :data_inicio, :data_fim)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':codigo' => $dados['codigo'],
            ':periodo' => $dados['periodo'],
            ':instrutor_id' => $dados['instrutor_id'],
            ':sala_id' => $dados['sala_id'],
            ':data_inicio' => $dados['data_inicio'],
            ':data_fim' => $dados['data_fim']
        ]);
    }

    public function deletar($id) {
        $stmt = $this->db->prepare("DELETE FROM turmas WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}