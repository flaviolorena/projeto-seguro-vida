import express from 'express';
import ApolicesController from '../controllers/apolicesController.js';

const router = express.Router();

router
//rota para chamar o metodo
  .get('/apolices', ApolicesController.listarApolices)
  .get('/apolices/busca', ApolicesController.listarApolicePorNum)
  .get('/apolices/cpf', ApolicesController.listarApolicePorCPF)
  .get('/apolices/:id', ApolicesController.listarApolicePorId)
  .post('/apolices',ApolicesController.cadastrarApolice)
  .put('/apolices/:id',ApolicesController.atualizarApolice)
  .delete('/apolices/:id',ApolicesController.deletarApolice)

export default router;