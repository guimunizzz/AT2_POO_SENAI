import { Router } from "express";
import { ProfessorController } from "../controllers/professor.controller";

const professorController = new ProfessorController();
const professorRoutes = Router();

professorRoutes.get('/professores', professorController.selecionaTodos);

professorRoutes.post('/professores', professorController.adicionarProfessor);

professorRoutes.patch('/professores', professorController.editarProfessor);

professorRoutes.delete('/professores', professorController.deletarProfessor);

export default professorRoutes;