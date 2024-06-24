const motoristaModels = require("../../models/Motorista/motoristaMolels");
const UsuarioController = require("../Usuario/usuarioController");

class motoristaController extends UsuarioController {
  constructor(IDUsuario, nome, email, senha, foto, CarteiraMotorista, Contato) {
    super(IDUsuario, nome, email, senha, foto, "Motorista");
    this.CarteiraMotorista = CarteiraMotorista;
    this.Contato = Contato;
    this.motoristaModels = new motoristaModels();
  }

  getMotorista(req, res) {
    const { IDUsuario } = req.params;

    this.motoristaModels.getMotorista(IDUsuario, (err, results) => {
      if (err) {
        console.error(`Erro ao ver motorista: ${err}`);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum veículo atribuído a este motorista." });
      }
      res.json(results);
    });
  }

  visualizarVeiculosAtribuidos(req, res) {
    const { IDUsuario } = req.params;

    this.motoristaModels.visualizarVeiculosAtribuidos(
      IDUsuario,
      (err, results) => {
        if (err) {
          console.error(`Erro ao visualizar veículos atribuídos: ${err}`);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        if (results.length === 0) {
          return res.json({ message: "Nenhum veículo atribuído a este motorista." });
        }

        return res.json(results);
      }
    );
  }

  registrarDespesa(req, res) {
    const {
      postoNome,
      endereco,
      tipoCombustivel,
      litrosAbastecidos,
      custo,
      id_veiculo,
      id_motorista,
    } = req.body;

    this.motoristaModels.registrarDespesa(
      postoNome,
      endereco,
      tipoCombustivel,
      litrosAbastecidos,
      custo,
      id_veiculo,
      id_motorista,
      (err, resultados) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Erro interno do servidor ao registrar despesa." });
        }

        res.json({
          id_abastecimento: resultados.insertId,
          message: "Despesa registrada com sucesso.",
        });
      }
    );
  }

  visualizarDetalhesVeiculo(req, res) {
    const IDVeiculo = req.params.IDVeiculo;

    this.motoristaModels.visualizarDetalhesVeiculo(
      IDVeiculo,
      (err, resultados) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({
              error:
                "Erro interno do servidor ao visualizar detalhes do veículo.",
            });
        }

        res.json(resultados);
      }
    );
  }

  reportarProblema(req, res) {
    const { id_motorista, id_veiculo, descricao_problema } = req.body;

    this.motoristaModels.reportarProblema(
      id_motorista,
      id_veiculo,
      descricao_problema,
      (err, resultado) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ msg: "Erro interno do servidor ao relatar problema." });
        }

        res.json({
          id_relatorio_problema: resultado.insertId,
          msg: "Problema relatado com sucesso.",
        });
      }
    );
  }

  listarProblema(req, res) {
    const id_motorista = req.params.id_motorista;

    this.motoristaModels.listaReclamacoes(id_motorista, (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Erro interno do servidor ao visualizar despesas." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Sem registro!" });
      }

      res.json(results);
    });
  }
}

module.exports = motoristaController;
