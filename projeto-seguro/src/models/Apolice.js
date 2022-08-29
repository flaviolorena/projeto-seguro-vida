import mongoose from "mongoose";

const apoliceSchema = new mongoose.Schema(
  {
    n_apolice:{type: Number},
    hash:{type: String},
    nome:{type: String},
    cpf:{type: String},
    inicioVigencia: { type: Date},
    terminoVigencia: {type: Date},
    valorRisco: {type: Number, min: 5000, max: 1000000},
    valorPago: {type: Number},
    qtParcelas: {type: Number},
    cobertura:{type: mongoose.Schema.Types.ObjectId, ref: 'coberturas'},
    
  }

)

const apolices = mongoose.model('apolice', apoliceSchema)

export default apolices;

