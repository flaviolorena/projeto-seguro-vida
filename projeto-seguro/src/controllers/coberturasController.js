import coberturas from '../models/Cobertura.js';

class CoberturasController {
	
  //find encontra todos os coberturas, o callback devolve os coberturas encontrados em json. há tratamento de erro como parametro
	static listarCoberturas = async (req, res) => {
		
		try {
			const cobertura = await coberturas.find();
			res.status(200).json(cobertura);
		} catch (err) {
			res
				.status(400)
				.json({ message: `Lista não encontrada - ${err.message}  ` });
		}
	};

	static listarCoberturaPorId = async (req, res) => {
		try {
			const id = req.params.id;
			const cobertura = await coberturas.findById(id);
			res.status(200).send(cobertura);
		} catch (err) {
			res.status(400).json({ message: `ID não encontrado - ${err.message}  ` });
		}
	};

	static cadastrarCobertura = async (req, res) => {
		try {
			let cobertura = new coberturas(req.body);
			const cadastraCobertura = await cobertura.save();
			res.status(201).send(cadastraCobertura.toJSON());
		} catch (err) {
			res
				.status(500)
				.json({ message: `Falha ao cadastrar - ${err.message}  ` });
		}
	};

	static atualizarCobertura = async (req, res) => {
		try {
			const id = req.params.id;
			await coberturas.findByIdAndUpdate(id, { $set: req.body });
			res.status(200).send({ message: 'cobertura atualizado com sucesso' });
		} catch (err) {
			res
				.status(500)
				.json({ message: `Falha ao atualizar - ${err.message}  ` });
		}
	};

	static deletarCobertura = async (req, res) => {
		try {
			const id = req.params.id;
			await coberturas.findByIdAndDelete(id);
			res.status(200).send({ message: 'Cobertura deletada com sucesso' });
		} catch (err) {
			res.status(500).json({ message: `Falha ao deletar - ${err.message}  ` });
		}
	};
}

export default CoberturasController;
