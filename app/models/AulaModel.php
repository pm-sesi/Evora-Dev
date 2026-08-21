<?php
require_once __DIR__ . '/../config/database.php';

class AulaModel {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function cadastrar($turma_id, $instrutor_id, $sala_id, $data, $hora_inicio, $hora_fim) {
        $sql = "INSERT INTO aulas (turma_id, instrutor_id, sala_id, data, hora_inicio, hora_fim) 
                VALUES (:turma_id, :instrutor_id, :sala_id, :data, :hora_inicio, :hora_fim)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            ':turma_id' => $turma_id,
            ':instrutor_id' => $instrutor_id,
            ':sala_id' => $sala_id,
            ':data' => $data,
            ':hora_inicio' => $hora_inicio,
            ':hora_fim' => $hora_fim
        ]);
    }
}