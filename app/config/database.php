<?php
// =========================================================================
// SISGED - Sistema de Gestão Educacional Dinâmico
// app/config/database.php - Conexão com o Banco de Dados usando PDO
// =========================================================================

class Database {
    // Parâmetros de conexão do servidor de banco de dados (WAMP / XAMPP padrão)
    private $host = "localhost";
    private $db_name = "sisged";
    private $username = "root";
    private $password = ""; // Geralmente em branco no WAMP/XAMPP locais
    public $conn;

    /**
     * Retorna a instância de conexão com o banco de dados via PDO.
     * 
     * @return PDO|null
     */
    public function getConnection() {
        $this->conn = null;

        try {
            // DSN definindo host, nome do banco de dados e o conjunto de caracteres utf8mb4
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            
            // Configurações e opções recomendadas para conexões seguras e limpas com PDO
            $options = [
                // Lança exceções PDOException em caso de erros no SQL
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                // Retorna os dados como array associativo por padrão
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                // Desativa a emulação de prepared statements para maior segurança contra SQL Injection
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            
            // Instanciação do objeto PDO
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch (PDOException $exception) {
            // Em ambiente de desenvolvimento, logamos o erro detalhado.
            // Em produção, isso garante que o usuário final não veja credenciais de acesso ou caminhos físicos.
            error_log("Erro na Conexão SISGED: " . $exception->getMessage());
            
            // Interrompe a execução amigavelmente informando o erro de sistema
            die("Desculpe, ocorreu um erro de conexão com o Banco de Dados. Detalhes salvos nos logs do sistema.");
        }

        return $this->conn;
    }
}

// Exemplo rápido de teste de conexão (caso executado diretamente)
/*
if (basename(__FILE__) == basename($_SERVER['SCRIPT_FILENAME'])) {
    $database = new Database();
    $db = $database->getConnection();
    if ($db) {
        echo "Conexão com o banco de dados 'sisged' estabelecida com sucesso!";
    }
}
*/
?>
