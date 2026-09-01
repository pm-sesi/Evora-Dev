-- =========================================================================
-- SISGED - Sistema de Gestão Educacional Dinâmico
-- schema.sql - Estrutura do Banco de Dados (Corrigido)
-- =========================================================================

CREATE DATABASE IF NOT EXISTS `sisged` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sisged`;

-- Tabela de Usuários (Login)
CREATE TABLE IF NOT EXISTS `usuarios` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `senha` VARCHAR(255) NOT NULL,
    `perfil` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Instrutores
CREATE TABLE IF NOT EXISTS `instrutores` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `especialidades` TEXT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Salas
CREATE TABLE IF NOT EXISTS `salas` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(50) NOT NULL UNIQUE,
    `capacidade` INT NOT NULL,
    `tipo` VARCHAR(50) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Turmas
CREATE TABLE IF NOT EXISTS `turmas` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `codigo` VARCHAR(50) NOT NULL UNIQUE,
    `periodo` VARCHAR(50) NOT NULL,
    `instrutor_id` INT NOT NULL,
    `sala_id` INT NOT NULL,
    `data_inicio` DATE NOT NULL,
    `data_fim` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`instrutor_id`) REFERENCES `instrutores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`sala_id`) REFERENCES `salas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Aulas (Agendamentos)
CREATE TABLE IF NOT EXISTS `aulas` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `turma_id` INT NOT NULL,
    `instrutor_id` INT NOT NULL,
    `sala_id` INT NOT NULL,
    `data` DATE NOT NULL,
    `hora_inicio` TIME NOT NULL,
    `hora_fim` TIME NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`turma_id`) REFERENCES `turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`instrutor_id`) REFERENCES `instrutores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`sala_id`) REFERENCES `salas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserção de Usuário Administrador Inicial
INSERT INTO `usuarios` (`nome`, `email`, `senha`, `perfil`) VALUES
('Coordenador Geral', 'admin@sisged.com', '$2y$10$usesomesillystringforeYRrmbU.5AgmgdJEjfEDkxfL4uBOCS2e', 'Coordenação');

-- Cria o usuário aceitando conexões por localhost e por IP
CREATE USER IF NOT EXISTS 'sisged_admin'@'localhost' IDENTIFIED BY 'evoradev123';
CREATE USER IF NOT EXISTS 'sisged_admin'@'127.0.0.1' IDENTIFIED BY 'evoradev123';

-- Liberar acesso total ao banco sisged
GRANT ALL PRIVILEGES ON sisged.* TO 'sisged_admin'@'localhost';
GRANT ALL PRIVILEGES ON sisged.* TO 'sisged_admin'@'127.0.0.1';

-- Aplicar alterações
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user WHERE User = 'sisged_admin';