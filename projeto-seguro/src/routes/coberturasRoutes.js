import express from 'express';
import CoberturasController from '../controllers/coberturasController.js';

const router = express.Router();

router
//rota para chamar o metodo
  .get('/coberturas', CoberturasController.listarCoberturas)
  .get('/coberturas/:id', CoberturasController.listarCoberturaPorId)
  .post('/coberturas',CoberturasController.cadastrarCobertura)
  .put('/coberturas/:id',CoberturasController.atualizarCobertura)
  .delete('/coberturas/:id',CoberturasController.deletarCobertura)

export default router;