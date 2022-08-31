import apolices from '../models/Apolice.js';

class ApolicesController {
	
  //find encontra todos os apolices, o callback devolve os apolices encontrados em json. há tratamento de erro como parametro
	static listarApolices = async (req, res) => {
		
		try {
			const apolice = await apolices.find()

			res.status(200).json(apolice);

		} catch (err) {
			res
				.status(400)
				.json({ message: `Lista não encontrada - ${err.message}  ` });
		}
	};

	static listarApolicePorId = async (req, res) => {
		try {
			const id = req.params.id;
			const apolice = await apolices.findById(id);
			res.status(200).send(apolice);
		} catch (err) {
			res.status(400).json({ message: `ID não encontrado - ${err.message}  ` });
		}
	};

	static cadastrarApolice = async (req, res) => {
		try {
			let apolice = new apolices(req.body);
			const cadastraApolice = await apolice.save();
			res.status(201).send(cadastraApolice.toJSON());
		} catch (err) {
			res
				.status(500)
				.json({ message: `Falha ao cadastrar - ${err.message}  ` });
		}
	};

	static atualizarApolice = async (req, res) => {
		try {
			const id = req.params.id;
			await apolices.findByIdAndUpdate(id, { $set: req.body });
			res.status(200).send({ message: 'apolice atualizado com sucesso' });
		} catch (err) {
			res
				.status(500)
				.json({ message: `Falha ao atualizar - ${err.message}  ` });
		}
	};

	static deletarApolice = async (req, res) => {
		try {
			const id = req.params.id;
			await apolices.findByIdAndDelete(id);
			res.status(200).send({ message: 'Apolice deletada com sucesso' });
		} catch (err) {
			res.status(500).json({ message: `Falha ao deletar - ${err.message}  ` });
		}
	};
	static listarApolicePorNum = async (req,res) =>{
    try{
      const numeroApolice = req.query.n_apolice
      const dadoApolice = await apolices.find({"n_apolice": numeroApolice}, )
      res.status(200).send(dadoApolice)
    }
    
    catch(err){
      res.status(400).json({'message': `Apolice não encontrada não encontrado - ${err.message}  `})
    }

  }
	static listarApolicePorCPF = async (req,res) =>{
    try{
      const numeroCPF = req.query.cpf
      const dadoCPF = await apolices.find({"cpf": numeroCPF},)
      res.status(200).send(dadoCPF)
    }

    catch(err){
      res.status(400).json({'message': `CPF não encontrado - ${err.message}  `})
    }

  }
}

export default ApolicesController;
