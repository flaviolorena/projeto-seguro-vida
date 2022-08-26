import express from 'express';
import PropostasController from '../controllers/propostasController.js';

const router = express.Router();

router
//rota para chamar o metodo
.get('/propostas', PropostasController.listarPropostas)
.get('/propostas/busca',PropostasController.listarPropostaPorNum)
.get('/propostas/:id', PropostasController.listarPropostasPorId)
.post('/propostas',PropostasController.cadastrarProposta)
.put('/propostas/:id',PropostasController.atualizarProposta)
.delete('/propostas/:id',PropostasController.deletarProposta)

export default router;