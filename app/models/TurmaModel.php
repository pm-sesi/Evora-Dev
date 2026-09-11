<?php
/**
 * Model de Gerenciamento de Turmas
 */
require_once __DIR__ . '/../config/database.php';

class TurmaModel {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function listar() {
        $sql = "SELECT t.id, t.codigo, t.periodo, t.sala_id, t.data_inicio, t.data_fim,
                       s.nome AS sala_nome
                FROM turmas t
                LEFT JOIN salas s ON t.sala_id = s.id
                ORDER BY t.codigo ASC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }

    /**
     * Verifica se a turma proposta conflita com outra que já usa a mesma sala
     * em período sobreposto (considerando "Integral" como sobreposto a
     * Manhã/Tarde/Noite) dentro de um intervalo de vigência (data_inicio/data_fim)
     * que também se sobrepõe.
     * Retorna true se houver conflito.
     */
    public function existeConflito($dados, $idExcluir = null) {
        $periodo = $dados['periodo'];
        $periodosConflitantes = ($periodo === 'Integral')
            ? ['Manhã', 'Tarde', 'Noite', 'Integral']
            : [$periodo, 'Integral'];

        $placeholders = [];
        $params = [
            ':sala_id' => $dados['sala_id'],
            ':data_inicio' => $dados['data_inicio'],
            ':data_fim' => $dados['data_fim']
        ];
        foreach ($periodosConflitantes as $i => $p) {
            $chave = ":periodo{$i}";
            $placeholders[] = $chave;
            $params[$chave] = $p;
        }

        $sql = "SELECT id FROM turmas
                WHERE sala_id = :sala_id
                  AND data_inicio <= :data_fim
                  AND data_fim >= :data_inicio
                  AND periodo IN (" . implode(',', $placeholders) . ")";

        if ($idExcluir) {
            $sql .= " AND id != :id_excluir";
            $params[':id_excluir'] = $idExcluir;
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetch() !== false;
    }

    public function cadastrar($dados) {
        $sql = "INSERT INTO turmas (codigo, periodo, sala_id, data_inicio, data_fim)
                VALUES (:codigo, :periodo, :sala_id, :data_inicio, :data_fim)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':codigo' => $dados['codigo'],
            ':periodo' => $dados['periodo'],
            ':sala_id' => $dados['sala_id'],
            ':data_inicio' => $dados['data_inicio'],
            ':data_fim' => $dados['data_fim']
        ]);
    }

    public function atualizar($id, $dados) {
        $sql = "UPDATE turmas
                SET codigo = :codigo,
                    periodo = :periodo,
                    sala_id = :sala_id,
                    data_inicio = :data_inicio,
                    data_fim = :data_fim
                WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':id' => $id,
            ':codigo' => $dados['codigo'],
            ':periodo' => $dados['periodo'],
            ':sala_id' => $dados['sala_id'],
            ':data_inicio' => $dados['data_inicio'],
            ':data_fim' => $dados['data_fim']
        ]);
    }

    public function deletar($id) {
        $stmt = $this->db->prepare("DELETE FROM turmas WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}