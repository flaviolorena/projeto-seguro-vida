import mongoose from "mongoose";

const propostaSchema = new mongoose.Schema(
  {
    //referencia para a cotação
    n_proposta:{type: mongoose.Schema.Types.ObjectId, ref: 'cotacoes'},
    valorSerPago:{type: Number},
    formaPagamento:{type: Number, min: 0, max: 12}
  }

)
//nome da criação no banco
const propostas = mongoose.model('proposta', propostaSchema)

export default propostas;

