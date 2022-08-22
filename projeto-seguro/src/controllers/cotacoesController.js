import cotacoes from '../models/Cotacao.js';

class CotacoesController{

  static listarCotacoes = async (req,res) =>{
    try {
      const cotacao = await cotacoes.find()
      .populate({
        path: 'cobertura',
        model: 'cobertura'
      })
      .exec()
      res.status(200).json(cotacao);
    } catch (err) {
      res
      .status(400)
      .json({ message: `Lista não encontrada - ${err.message}  ` });
  
    }
  } 

  static listarCotacoesPorId = async (req,res) =>{
    try {
      const id = req.params.id;
      const cotacao = await cotacoes.findById(id)
      res.status(200).send(cotacao)
    } catch (err) {
      res.status(400).send({message: ` ID nao encontrado ${err.message}`})
    }

  } 


  static cadastrarCotacao = async (req, res) =>{
    try{
      let cotacao = new cotacoes(req.body);
        const cotac = await cotacao.save({ timestamps: { createdAt: true, updatedAt: false }})
        res.status(201).send(cotac.toJSON())
    }catch{
      res.status(500).json({'message': 'falha ao cadastrar'})
    }

  }

  static atualizarCotacao = async (req,res) => {
    try {
      const id = req.params.id;
      await cotacoes.findByIdAndUpdate(id,{$set: req.body })
      res.status(200).send({message: 'cotacao atualizada'})
    } catch (err) {
      res.status(500).send({message: err.message})  
    }
  }

  static deletarCotacao = async (req,res) => {
    try {
      const id = req.params.id;
      await cotacoes.findByIdAndDelete(id)
      res.status(200).send({message: 'cotacao deletada'})
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  }

  static listarCotacoesPorNum = (req,res) =>{
    const numeroCotacao = req.query.numeroCotacao
    cotacoes.find({'n_cotacao': numeroCotacao}, {},(err, cotacoes) =>{
      res.status(200).send(cotacoes)
    })
  }
}

export default CotacoesController;