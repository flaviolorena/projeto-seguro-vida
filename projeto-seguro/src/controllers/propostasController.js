import apolices from '../models/Apolice.js';
import propostas from '../models/Proposta.js';

class PropostasController{

  static listarPropostas = (req,res) =>{
    //qual campo deve ser populado
    propostas.find()
      // .populate('n_proposta')
      .exec((err, propostas) =>{
        res.status(200).json(propostas);
      })
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

  static cadastrarProposta = async (req, res) =>{
    function geraHash() {
      var char = '';
      var num = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var numbers = '0123456789'
      var charactersLength = characters.length;
      var numbersLength = numbers.length;
      for ( var i = 0; i < 6; i++ ) {
        char += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      for ( var i = 0; i < 4; i++ ) {
        num += numbers.charAt(Math.floor(Math.random() * numbersLength));
      }
      return char + num;
     
    }

    try {
      let proposta = new propostas(req.body);
      const saveProposta = await proposta.save();
      let dadosNovaApolice = saveProposta.toJSON()
      dadosNovaApolice.n_apolice = dadosNovaApolice.n_proposta

      dadosNovaApolice.hash = geraHash()

      delete dadosNovaApolice.n_proposta

      let apolice = new apolices(dadosNovaApolice)
      const novaApolice = await apolice.save()

      res.status(201).send(novaApolice)
    } catch (err) {
      res.status(500).json({'message': `${err.message} falha ao cadastrar proposta`})

    }
    // proposta.save((err) => {
    //   if(err){
    //     res.status(500).send({message: `${err.message} - falha ao cadastrar`})
    //   }else{
    //   }
    // })
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

  static listarPropostaPorNum = async (req,res) =>{
    try{
      const numeroProposta = req.query.n_proposta
      const dadoProposta = await propostas.find({"n_proposta": numeroProposta}, )
      res.status(200).send(dadoProposta)
    }
    
    catch(err){
      res.status(400).json({'message': `Proposta não encontrada não encontrado - ${err.message}  `})
    }

  }

}

export default PropostasController;