import cotacoes from '../models/Cotacao.js';
import propostas from '../models/Proposta.js';

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
      //4.1 salva os dados
      const cotac = await cotacao.save({ timestamps: { createdAt: true, updatedAt: false }})
      
      //4.2 calcular o valor a ser pago
      let valorPago = (cotacao.valorRisco * 0.05).toFixed(2)

      //4.3 cria let com os dados da cotacao
      let dadosNovaProposta = cotac.toJSON();
        //calcula o valor a ser pago na nova proposta
      dadosNovaProposta.valorPago = valorPago;
      dadosNovaProposta.n_proposta = dadosNovaProposta.n_cotacao

      delete dadosNovaProposta.n_cotacao

      let proposta = new propostas(dadosNovaProposta);
      const novaProposta = await proposta.save()

      // new propostas()
      res.status(201).send(novaProposta)

    }catch(err){
      res.status(500).json({'message': `${err.message} falha ao cadastrar`})
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