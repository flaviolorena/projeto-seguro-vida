import express from 'express';
import CotacoesController from '../controllers/cotacoesController.js';

const router = express.Router();

router
//rota para chamar o metodo
  .get('/cotacoes', CotacoesController.listarCotacoes)
  .get('/cotacoes/busca', CotacoesController.listarCotacoesPorNum)
  .get('/cotacoes/:id', CotacoesController.listarCotacoesPorId)
  .post('/cotacoes',CotacoesController.cadastrarCotacao)
  .put('/cotacoes/:id',CotacoesController.atualizarCotacao)
  .delete('/cotacoes/:id',CotacoesController.deletarCotacao)

export default router;