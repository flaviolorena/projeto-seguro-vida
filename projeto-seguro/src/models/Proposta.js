import mongoose from "mongoose";

const propostaSchema = new mongoose.Schema(
  {
    id: {type: String},
    //referencia para a cotação
    n_cotacao:{type: mongoose.Schema.Types.ObjectId, ref: 'cotacoes'},
    nome:{type: String},
  }

)
//nome da criação no banco
const propostas = mongoose.model('proposta', propostaSchema)

export default propostas;

