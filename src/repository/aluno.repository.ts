import { db } from "../database/connection.database";
import { Aluno } from "../models/aluno.model";
import { ResultSetHeader } from "mysql2";

export class AlunoRepository {
    async selectTodos(): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM alunos';
        const [rows] = await db.execute<ResultSetHeader>(sql);
        return rows;
    }
    async selectById(id: number): Promise<ResultSetHeader> {
        const sql = 'SELECT * FROM alunos WHERE id = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async adicionarAluno(dados: Aluno): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO alunos (nome, email, matricula, curso, mediaFinal) VALUES (?,?,?,?,?);';
        const values = [dados.Nome, dados.Email, dados.Matricula, dados.Curso, dados.MediaFinal];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async editarAluno(id: number, dados: Aluno): Promise<ResultSetHeader> {
        const sql = 'UPDATE alunos SET nome = ?, email = ?, matricula = ?, curso = ?, mediaFinal = ? WHERE id = ?;';
        const values = [dados.Nome, dados.Email, dados.Matricula, dados.Curso, dados.MediaFinal, id]
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }

    async deletaAluno(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM alunos WHERE id = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}