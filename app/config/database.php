<?php
/**
 * Gerenciador de Conexão com o Banco de Dados (PDO)
 * SISGED - Évora Dev
 */

require_once __DIR__ . '/config.php';

class Database {
    private static $conn = null;

    public static function getConnection() {
        if (self::$conn === null) {
            try {
                self::$conn = new PDO(
                    "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                    DB_USER,
                    DB_PASS,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false
                    ]
                );
            } catch (PDOException $e) {
                error_log("Erro de Conexão: " . $e->getMessage());
                throw new Exception("Falha na conexão com o banco de dados.");
            }
        }
        return self::$conn;
    }
}