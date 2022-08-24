import express from 'express';
import ContadoresController from '../controllers/contadoresController.js';

const router = express.Router();

router
//rota para chamar o metodo
  .get('/contadores', ContadoresController.listarContadores)
  .get('/contadores/:id', ContadoresController.listarContadorPorId)
  .post('/contadores',ContadoresController.cadastrarContador)
  .put('/contadores/:id',ContadoresController.atualizarContador)
  .delete('/contadores/:id',ContadoresController.deletarContador)

export default router;