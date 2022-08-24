import express from 'express';
import cotacoes from './cotacoesRoutes.js';
import propostas from './propostasRoutes.js';
import coberturas from './coberturasRoutes.js';
import apolices from './apolicesRoutes.js';
import contadores from './contadoresRoutes.js';


const routes = (app) => {
  app.route('/').get((req,res) =>{
    res.status(200).send({titulo: "Seguro de vida"})
  })

  app.use(
    express.json(),
    cotacoes,
    propostas,
    coberturas,
    apolices,
    contadores
  )
}

export default routes