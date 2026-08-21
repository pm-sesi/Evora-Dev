<?php
require_once __DIR__ . '/../config/database.php';

class InstrutorModel {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function cadastrar($nome, $cpf, $email, $especialidades) {
        $sql = "INSERT INTO instrutores (nome, cpf, email, especialidades) VALUES (:nome, :cpf, :email, :especialidades)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            ':nome' => $nome,
            ':cpf' => $cpf,
            ':email' => $email,
            ':especialidades' => $especialidades
        ]);
    }
}