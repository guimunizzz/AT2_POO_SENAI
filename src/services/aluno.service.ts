import { AlunoRepository } from "../repository/aluno.repository";
import { Aluno } from "../models/aluno.model";

export class AlunoService {
    constructor (private _repository = new AlunoRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    async selecionarPorId(id:number) {
        return await this._repository.selectById(id);
    }

    async adicionarAluno(nome:string, email:string, matricula:string, curso:string, mediaFinal:number) {
        const aluno = Aluno.adicionar(nome, email, matricula, curso, mediaFinal);
        return await this._repository.adicionarAluno(aluno)
    }

    async editarAluno (id:number, nome:string, email:string, matricula:string, curso:string, mediaFinal:number) {
        const aluno = Aluno.editar(nome, email, matricula, curso, mediaFinal, id)
        return await this._repository.editarAluno(id, aluno)
    }

    async deletarAluno (id:number) {
        return await this._repository.deletaAluno(id)
    }
}