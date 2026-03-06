import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller";

const alunoController = new AlunoController();
const alunoRoutes = Router();

alunoRoutes.get('/alunos', alunoController.selecionaTodos);

alunoRoutes.post('/alunos', alunoController.adicionarAluno);

alunoRoutes.patch('/alunos', alunoController.editarAluno);

alunoRoutes.delete('/alunos', alunoController.deletarAluno);

export default alunoRoutes;