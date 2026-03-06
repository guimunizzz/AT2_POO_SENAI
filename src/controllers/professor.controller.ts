import { Request, Response } from "express";
import { ProfessorService } from "../services/professor.service";

export class ProfessorController {
    constructor(private _service = new ProfessorService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (id) {
                if (isNaN(id) || id <= 0) {
                    return res.status(400).json({
                        message: "ID do professor inválido ou não fornecido"
                    })
                }
                const resultado = await this._service.selecionarPorId(id);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Professor não localizado"
                    });
                }
                res.status(200).json({ resultado })
            }
            const professores = await this._service.selecionarTodos();
            res.status(200).json({ professores })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }

    adicionarProfessor = async (req: Request, res: Response) => {
        try {
            const { nome, email, disciplina, cargaHoraria } = req.body;
            const novoProfessor = await this._service.adicionarProfessor(nome, email, disciplina, cargaHoraria)
            res.status(201).json({ novoProfessor })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }

    editarProfessor = async (req: Request, res: Response) => {
        try {
            const { nome, email, disciplina, cargaHoraria } = req.body;
            const id = Number(req.query.id);
            const alterado = await this._service.editarProfessor(id, nome, email, disciplina, cargaHoraria);
            res.status(201).json({ alterado })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }
    deletarProfessor = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (isNaN(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do professor inválido ou não fornecido"
                })
            }

            const professorSelecionado = await this._service.selecionarPorId(id)
            if (professorSelecionado.affectedRows === 0) {
                return res.status(404).json({
                    message: "Professor não localizado"
                });
            }

            const resultadoDelete = await this._service.deletarProfessor(id);

            if (resultadoDelete.affectedRows !== 0) {
                return res.status(200).json({
                    message: "Professor excluido com sucesso",
                    resultado: resultadoDelete
                })
            } else {
                res.status(500).json({
                    message: "Ocorreu um erro ao excluir o professor"
                });
            }
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }
}