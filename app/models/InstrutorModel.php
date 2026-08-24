<?php
/**
 * Model de Gerenciamento de Instrutores
 */
require_once __DIR__ . '/Database.php';

class InstrutorModel {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function listar() {
        $stmt = $this->db->query("SELECT id, nome, cpf, email, especialidades FROM instrutores ORDER BY nome ASC");
        return $stmt->fetchAll();
    }

    public function cadastrar($dados) {
        $sql = "INSERT INTO instrutores (nome, cpf, email, especialidades) 
                VALUES (:nome, :cpf, :email, :especialidades)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':nome' => $dados['nome'],
            ':cpf' => $dados['cpf'],
            ':email' => $dados['email'],
            ':especialidades' => $dados['especialidades'] ?? null
        ]);
    }

    public function deletar($id) {
        $stmt = $this->db->prepare("DELETE FROM instrutores WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}