-- =========================================================================
-- SISGED - Índices para otimizar a filtragem de aulas
-- Execute depois do schema.sql (e do seed, se já tiver rodado)
-- =========================================================================

USE `sisged`;

ALTER TABLE `aulas` ADD INDEX `idx_aulas_data` (`data`);
ALTER TABLE `aulas` ADD INDEX `idx_aulas_instrutor_data` (`instrutor_id`, `data`);
ALTER TABLE `aulas` ADD INDEX `idx_aulas_sala_data` (`sala_id`, `data`);
ALTER TABLE `aulas` ADD INDEX `idx_aulas_turma_data` (`turma_id`, `data`);
