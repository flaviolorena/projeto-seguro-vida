import mongoose from "mongoose";

const propostaSchema = new mongoose.Schema(
  {
    //referencia para a cotação
    n_proposta:{type: Number},
    nome:{type: String},
    cpf:{type: String},
    inicioVigencia: { type: Date},
    terminoVigencia: {type: Date},
    valorRisco: {type: Number, min: 5000, max: 1000000},
    valorPago: {type: Number, default: 0},
    // qtParcelas: {type: Number, default: 0},
    cobertura:{type: mongoose.Schema.Types.ObjectId, ref: 'coberturas'},
    
  }

)
//nome da criação no banco
const propostas = mongoose.model('proposta', propostaSchema)

export default propostas;

