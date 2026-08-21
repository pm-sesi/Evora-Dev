<?php
require_once __DIR__ . '/../config/database.php';

class TurmaModel {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function cadastrar($codigo, $periodo, $instrutor_id, $sala_id, $data_inicio, $data_fim) {
        $sql = "INSERT INTO turmas (codigo, periodo, instrutor_id, sala_id, data_inicio, data_fim) 
                VALUES (:codigo, :periodo, :instrutor_id, :sala_id, :data_inicio, :data_fim)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            ':codigo' => $codigo,
            ':periodo' => $periodo,
            ':instrutor_id' => $instrutor_id,
            ':sala_id' => $sala_id,
            ':data_inicio' => $data_inicio,
            ':data_fim' => $data_fim
        ]);
    }
}