import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";

export class AlunoController {
    constructor(private _service = new AlunoService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (id) {
                if (isNaN(id) || id <= 0) {
                    return res.status(400).json({
                        message: "ID do aluno inválido ou não fornecido"
                    })
                }
                const resultado = await this._service.selecionarPorId(id);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Aluno não localizado"
                    });
                }
                res.status(200).json({ resultado })
            }
            const alunos = await this._service.selecionarTodos();
            res.status(200).json({ alunos })
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

    adicionarAluno = async (req: Request, res: Response) => {
        try {
            const { nome, email, matricula, curso, mediaFinal } = req.body;
            const novo = await this._service.adicionarAluno(nome, email, matricula, curso, mediaFinal)
            res.status(201).json({ novo })
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

    editarAluno = async (req: Request, res: Response) => {
        try {
            const { nome, email, matricula, curso, mediaFinal } = req.body;
            const id = Number(req.query.id);
            const alterado = await this._service.editarAluno(id, nome, email, matricula, curso, mediaFinal);
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
    deletarAluno = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (isNaN(id) || id <= 0) {
                return res.status(400).json({
                    message: "ID do aluno inválido ou não fornecido"
                })
            }

            const alunoSelecionado = await this._service.selecionarPorId(id)
            if (alunoSelecionado.affectedRows === 0) {
                return res.status(404).json({
                    message: "Aluno não localizado"
                });
            }

            const resultadoDelete = await this._service.deletarAluno(id);

            if (resultadoDelete.affectedRows !== 0) {
                return res.status(200).json({
                    message: "Aluno excluido com sucesso",
                    resultado: resultadoDelete
                })
            } else {
                res.status(500).json({
                    message: "Ocorreu um erro ao excluir o aluno"
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