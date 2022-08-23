import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js'
import cors from 'cors'

db.on('error', console.log.bind(console, 'erro de conexao no banco'))
db.once('open', () => console.log('sucesso, conexão com banco'))

const app = express();
app.use(express.json())
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*")
  app.use(cors())
  next()
})
routes(app)

export default app;