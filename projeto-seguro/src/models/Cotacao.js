import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment';
import db from '../config/dbConnect.js'

// autoIncrement.initialize(db);

const cotacaoSchema = new mongoose.Schema(
  {
    n_cotacao:{type: Number},
    nome:{type: String},
    cpf:{type: String},
    inicioVigencia: { type: Date},
    terminoVigencia: {type: Date},
    valorRisco: {type: Number, min: 5000, max: 1000000},
    cobertura:{type: mongoose.Schema.Types.ObjectId, ref: 'coberturas'},
    
  },
  {  timestamps: {
    createdAt: 'inicioVigencia'
  }}

)
// cotacaoSchema.plugin(autoIncrement.plugin, {model: 'cotacoes', field: 'n_cotacao' })

cotacaoSchema.pre('save', async function() {
    // let data =  this.inicioVigencia
    // data = data.setDate(data.getDate() + 1)
   
    // let data =  this.inicioVigencia
    // data = new Date()
    // data = data.setDate(data.getDate() + 1)
    // this.inicioVigencia = data

  })

const cotacoes = mongoose.model('cotacoes', cotacaoSchema)


export default cotacoes;