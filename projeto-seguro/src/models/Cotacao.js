import mongoose from "mongoose";

const cotacaoSchema = new mongoose.Schema(
  {
    n_cotacao:{type: Number},
    nome:{type: String},
    cpf:{type: String},
    inicioVigencia: {type: Date },
    terminoVigencia: {type: Date},
    valorRisco: {type: Number}
  }

)


//nome da criação no banco
const cotacoes = mongoose.model('cotacoes', cotacaoSchema)

export default cotacoes;