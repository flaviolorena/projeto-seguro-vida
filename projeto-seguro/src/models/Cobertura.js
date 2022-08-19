import mongoose from "mongoose";

const coberturaSchema = new mongoose.Schema(
  {
    
    nome:{type: String},
    descricao:{type: String},
    
  }

)

const coberturas = mongoose.model('cobertura', coberturaSchema)

export default coberturas;

