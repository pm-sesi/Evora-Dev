<?php
/**
 * Model para Autenticação e Controle de Acesso
 */
require_once __DIR__ . '/../config/database.php';

class UsuarioModel {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function autenticar($email, $senha, $perfil = null) {
        $sql = "SELECT id, nome, email, senha, perfil FROM usuarios WHERE email = :email";
        
        if ($perfil) {
            $sql .= " AND perfil = :perfil";
        }

        $stmt = $this->db->prepare($sql);
        $params = [':email' => $email];
        
        if ($perfil) {
            $params[':perfil'] = $perfil;
        }

        $stmt->execute($params);
        $usuario = $stmt->fetch();

        if ($usuario && (password_verify($senha, $usuario['senha']) || $senha === $usuario['senha'])) {
            unset($usuario['senha']);
            return $usuario;
        }

        return false;
    }
}