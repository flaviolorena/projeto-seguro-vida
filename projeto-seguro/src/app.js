import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js'

db.on('error', console.log.bind(console, 'erro de conexao no banco'))
db.once('open', () => console.log('sucesso, conexão com banco'))

const app = express();
app.use(express.json())
routes(app)

export default app;