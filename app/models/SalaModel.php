<?php
/**
 * Model de Gerenciamento de Salas
 */
require_once __DIR__ . '/Database.php';

class SalaModel {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function listar() {
        $stmt = $this->db->query("SELECT id, nome, capacidade, tipo FROM salas ORDER BY nome ASC");
        return $stmt->fetchAll();
    }

    public function cadastrar($dados) {
        $sql = "INSERT INTO salas (nome, capacidade, tipo) VALUES (:nome, :capacidade, :tipo)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':nome' => $dados['nome'],
            ':capacidade' => $dados['capacidade'],
            ':tipo' => $dados['tipo'] ?? null
        ]);
    }

    public function deletar($id) {
        $stmt = $this->db->prepare("DELETE FROM salas WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}