<?php
/**
 * Gerenciador de Conexão com o Banco de Dados (PDO)
 * SISGED - Évora Dev
 */
class Database {
    private static $host = 'localhost';
    private static $dbName = 'sisged';
    private static $username = 'root';
    private static $password = '';
    private static $conn = null;

    public static function getConnection() {
        if (self::$conn === null) {
            try {
                self::$conn = new PDO(
                    "mysql:host=" . self::$host . ";dbname=" . self::$dbName . ";charset=utf8mb4",
                    self::$username,
                    self::$password,
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