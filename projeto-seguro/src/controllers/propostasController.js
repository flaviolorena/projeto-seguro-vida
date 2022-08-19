import propostas from '../models/Proposta.js';

class PropostasController{

  static listarPropostas = (req,res) =>{
    //qual campo deve ser populado
    propostas.find()
      .populate('n_proposta')
      .exec((err, propostas) =>{
        res.status(200).json(propostas);
      })

      // propostas.find((err, propostas) =>{
      //   res.status(200).json(propostas);
      // })
  } 

  static listarPropostasPorId = (req,res) =>{
    const id = req.params.id;
    propostas.findById(id, (err, propostas) =>{
      if(err){
        res.status(400).send({message: ` ID nao encontrado ${err.message}`})
      }else{
        res.status(200).send(propostas)
      }

    })

  } 

  static cadastrarProposta = (req, res) =>{
    let proposta = new propostas(req.body);
    proposta.save((err) => {
      if(err){
        res.status(500).send({message: `${err.message} - falha ao cadastrar`})
      }else{
        res.status(201).send(proposta.toJSON())
      }
    })
  }

  static atualizarProposta = (req,res) => {
    //determina o parametro a ser buscado, sera n_cotacao em vez de id 
    const id = req.params.id;
    //usa o metodo, o id doelemento a ser atualizado, o que sera substituido (req.body) 
    propostas.findByIdAndUpdate(id,{$set: req.body }, (err) => {
      if(!err){
        res.status(200).send({message: 'proposta atualizada'})
      }else{
        res.status(500).send({message: err.message})
      }
    } )
  }

  static deletarProposta = (req,res) => {
    //determina o parametro a ser buscado, sera n_cotacao em vez de id 
    const id = req.params.id;
    propostas.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'proposta deletada'})
      }else{
        res.status(500).send({message: err.message})
      }
    } )
  }
}

export default PropostasController;