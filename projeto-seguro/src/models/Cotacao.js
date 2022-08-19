import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment';
import db from '../config/dbConnect.js'

autoIncrement.initialize(db);

const cotacaoSchema = new mongoose.Schema(
  {
    id:{type: String},
    n_cotacao:{type: Number, default: 0},
    nome:{type: String},
    cpf:{type: String},
    inicioVigencia: { type: Date},
    terminoVigencia: {type: Date},
    valorRisco: {type: Number},
  },
  {  timestamps: {
    createdAt: 'inicioVigencia'
  }}

)
cotacaoSchema.plugin(autoIncrement.plugin, {model: 'cotacoes', field: 'n_cotacao' })

const cotacoes = mongoose.model('cotacoes', cotacaoSchema)

//teste
// let doc = await cotacoes.create({nome: 'teste'})
// console.log(doc.createdAt)
// console.log(doc.createdAt)
// console.log(doc)
export default cotacoes;