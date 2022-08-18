import express from 'express';
import cotacoes from './cotacoesRoutes.js';
import propostas from './propostasRoutes.js';

const routes = (app) => {
  app.route('/').get((req,res) =>{
    res.status(200).send({titulo: "Seguro de vida"})
  })

  app.use(
    express.json(),
    cotacoes,
    propostas
  )
}

export default routes