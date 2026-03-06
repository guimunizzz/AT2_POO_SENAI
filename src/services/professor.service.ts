import { ProfessorRepository } from "../repository/professor.repository";
import { Professor } from "../models/professor.model";

export class ProfessorService {
    constructor(private _repository = new ProfessorRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    async selecionarPorId(id: number) {
        return await this._repository.selectById(id);
    }

    async adicionarProfessor(nome: string, email: string, disciplina: string, cargaHoraria: number) {
        const professor = Professor.adicionar(nome, email, disciplina, cargaHoraria);
        return await this._repository.adicionarProfessor(professor)
    }

    async editarProfessor(id: number, nome: string, email: string, disciplina: string, cargaHoraria: number) {
        const aluno = Professor.editar(nome, email, disciplina, cargaHoraria, id)
        return await this._repository.editarProfessor(id, aluno)
    }

    async deletarProfessor(id: number) {
        return await this._repository.deletaProfessor(id)
    }
}