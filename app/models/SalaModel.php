<?php
require_once __DIR__ . '/../config/database.php';

class SalaModel {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function cadastrar($nome, $capacidade, $tipo) {
        $sql = "INSERT INTO salas (nome, capacidade, tipo) VALUES (:nome, :capacidade, :tipo)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            ':nome' => $nome,
            ':capacidade' => $capacidade,
            ':tipo' => $tipo
        ]);
    }
}