import mongoose from "mongoose";

const contadorSchema = new mongoose.Schema(
  {
    n_cotacao:{type: Number},
  }

)

const contadores = mongoose.model('contador', contadorSchema)

export default contadores;

