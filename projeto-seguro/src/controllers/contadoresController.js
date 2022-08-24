import contadores from '../models/Contador.js';

class ContadoresController {
	
  //find encontra todos os contadores, o callback devolve os contadores encontrados em json. há tratamento de erro como parametro
	static listarContadores = async (req, res) => {
		
		try {
			const contador = await contadores.find()
			res.status(200).json(contador);

		} catch (err) {
			res
				.status(400)
				.json({ message: `Lista não encontrada - ${err.message}  ` });
		}
	};

	static listarContadorPorId = async (req, res) => {
		try {
			const id = req.params.id;
			const contador = await contadores.findById(id);
			res.status(200).send(contador);
		} catch (err) {
			res.status(400).json({ message: `ID não encontrado - ${err.message}  ` });
		}
	};

	static cadastrarContador = async (req, res) => {
		try {
			let contador = new contadores(req.body);
			const cadastraContador = await contador.save();
			res.status(201).send(cadastraContador.toJSON());
		} catch (err) {
			res
				.status(500)
				.json({ message: `Falha ao cadastrar - ${err.message}  ` });
		}
	};

	static atualizarContador = async (req, res) => {
		try {
			const id = req.params.id;
			await contadores.findByIdAndUpdate(id, { $set: req.body });
			res.status(200).send({ message: 'contador atualizado com sucesso' });
		} catch (err) {
			res
				.status(500)
				.json({ message: `Falha ao atualizar - ${err.message}  ` });
		}
	};

	static deletarContador = async (req, res) => {
		try {
			const id = req.params.id;
			await contadores.findByIdAndDelete(id);
			res.status(200).send({ message: 'Contador deletada com sucesso' });
		} catch (err) {
			res.status(500).json({ message: `Falha ao deletar - ${err.message}  ` });
		}
	};
}

export default ContadoresController;
