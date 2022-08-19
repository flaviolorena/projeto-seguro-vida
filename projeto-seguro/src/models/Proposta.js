import mongoose from "mongoose";

const propostaSchema = new mongoose.Schema(
  {
    //referencia para a cotação
    n_proposta:{type: mongoose.Schema.Types.ObjectId, ref: 'cotacoes'},
    nome:{type: String},
    
  }

)
//nome da criação no banco
const propostas = mongoose.model('proposta', propostaSchema)

export default propostas;

