import cotacoes from '../models/Cotacao.js';

class CotacoesController{

  static listarCotacoes = (req,res) =>{
    cotacoes.find()
      .populate(['nome', 'n_cotacao'])
      .exec((err, cotacoes) =>{
        res.status(200).json(cotacoes);
      })
  } 

  static listarCotacoesPorId = (req,res) =>{
    const id = req.params.id;
    cotacoes.findById(id, (err, cotacoes) =>{
      if(err){
        res.status(400).send({message: ` ID nao encontrado ${err.message}`})
      }else{
        res.status(200).send(cotacoes)
      }

    })

  } 

  static cadastrarCotacao = (req, res) =>{
    let cotacao = new cotacoes(req.body);
    cotacao.save((err) => {
      if(err){
        res.status(500).send({message: `${err.message} - falha ao cadastrar`})
      }else{
        res.status(201).send(cotacao.toJSON())
      }
    })
  }

  static atualizarCotacao = (req,res) => {
    //determina o parametro a ser buscado, sera n_cotacao em vez de id 
    const id = req.params.id;
    //usa o metodo, o id doelemento a ser atualizado, o que sera substituido (req.body) 
    cotacoes.findByIdAndUpdate(id,{$set: req.body }, (err) => {
      if(!err){
        res.status(200).send({message: 'cotacao atualizada'})
      }else{
        res.status(500).send({message: err.message})
      }
    } )
  }

  static deletarCotacao = (req,res) => {
    //determina o parametro a ser buscado, sera n_cotacao em vez de id 
    const id = req.params.id;
    cotacoes.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'cotacao deletada'})
      }else{
        res.status(500).send({message: err.message})
      }
    } )
  }

  static listarCotacoesPorNum = (req,res) =>{
    const numeroCotacao = req.query.numeroCotacao
    cotacoes.find({'n_cotacao': numeroCotacao}, {},(err, cotacoes) =>{
      res.status(200).send(cotacoes)
    })
  }
}

export default CotacoesController;