import mongoose from "mongoose";

const apoliceSchema = new mongoose.Schema(
  {
    proposta:{type: mongoose.Schema.Types.ObjectId, ref: 'propostas'},
    
  }

)

const apolices = mongoose.model('apolice', apoliceSchema)

export default apolices;

