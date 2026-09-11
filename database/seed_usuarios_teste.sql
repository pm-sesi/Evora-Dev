-- =========================================================================
-- SISGED - Seed de usuários de teste (Aluno e Instrutor)
-- Execute depois do schema.sql
-- Senha de ambos: senha123
-- =========================================================================

USE `sisged`;

INSERT INTO `usuarios` (`nome`, `email`, `senha`, `perfil`) VALUES
('Aluno Teste', 'aluno@sisged.com', '$2b$12$dwlArrCTLkRejAKNVc7Dmuw3ClnFyLptdt47IiTrIxAxu1uWWxz6y', 'Aluno'),
('Instrutor Teste', 'instrutor@sisged.com', '$2b$12$5m5pD6lf3A79V6bLTf2IGeHA34WphVO2mUDhfhBgG6ocono88WHIy', 'Instrutor');

-- Se quiser trocar a senha depois, gere um novo hash com:
-- php -r "echo password_hash('sua_senha_aqui', PASSWORD_DEFAULT), PHP_EOL;"

-- Se o instrutor de teste também precisar aparecer nos cadastros de aulas/turmas,
-- crie o registro correspondente na tabela `instrutores` (é uma tabela separada,
-- usada para vincular aulas, e não tem relação direta com `usuarios`):
--
-- INSERT INTO `instrutores` (`nome`, `cpf`, `email`, `especialidades`) VALUES
-- ('Instrutor Teste', '000.000.000-00', 'instrutor@sisged.com', 'Eletrônica');
