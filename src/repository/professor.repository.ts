import { db } from "../database/connection.database";
import { Professor } from "../models/professor.model";
import { ResultSetHeader } from "mysql2";

export class ProfessorRepository {
    async selectTodos(): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM professores';
        const [rows] = await db.execute<ResultSetHeader>(sql);
        return rows;
    }
    async selectById(id: number): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM professores WHERE id = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async adicionarProfessor(dados: Professor): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO professores (nome, email, disciplina, cargaHoraria) VALUES (?,?,?,?);';
        const values = [dados.Nome, dados.Email, dados.Disciplina, dados.CargaHoraria];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async editarProfessor(id: number, dados: Professor): Promise<ResultSetHeader> {
        const sql = 'UPDATE professores SET nome = ?, email = ?, disciplina = ?, cargaHoraria = ? WHERE id = ?;';
        const values = [dados.Nome, dados.Email, dados.Disciplina, dados.CargaHoraria, id]
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }

    async deletaProfessor(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM professores WHERE id = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}