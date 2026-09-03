-- =========================================================================
-- SISGED - Seed de usuários de teste (Aluno e Instrutor)
-- Execute depois do schema.sql
-- =========================================================================

-- 1) Gere o hash de cada senha com o PHP (no terminal, dentro do projeto):
--
--    php -r "echo password_hash('senha123', PASSWORD_DEFAULT), PHP_EOL;"
--
--    Rode o comando uma vez para cada senha que quiser usar e cole o
--    resultado no lugar de '$2y$10$SUBSTITUA_PELO_HASH_DO_ALUNO' e
--    '$2y$10$SUBSTITUA_PELO_HASH_DO_INSTRUTOR' abaixo.
--    NUNCA copie o hash do admin do schema.sql — cada senha gera um hash
--    diferente mesmo que o texto da senha seja igual.

USE `sisged`;

INSERT INTO `usuarios` (`nome`, `email`, `senha`, `perfil`) VALUES
('Aluno Teste', 'aluno@sisged.com', '$2y$10$SSFX5pJ64QFgXoLdHobC9ulHFKH7tM0C2YT6hj4FntxnU4w0aHz12', 'Aluno'),
('Instrutor Teste', 'instrutor@sisged.com', '$2y$10$SSFX5pJ64QFgXoLdHobC9ulHFKH7tM0C2YT6hj4FntxnU4w0aHz12', 'Instrutor');

-- Se o instrutor de teste também precisar aparecer nos cadastros de aulas/turmas,
-- crie o registro correspondente na tabela `instrutores` (é uma tabela separada,
-- usada para vincular aulas/turmas, e não tem relação direta com `usuarios`):
--
INSERT INTO `instrutores` (`nome`, `cpf`, `email`, `especialidades`) VALUES
('Instrutor Teste', '000.000.000-00', 'instrutor@sisged.com', 'Eletrônica');
