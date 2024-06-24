require("dotenv").config();
const bcrypt = require("bcrypt");
const AdministradorModel = require("../../models/Adimistrador/adimistradorModel");
const UsuarioController = require("../Usuario/usuarioController");

class AdministradorController extends UsuarioController {
  constructor(IDUsuario, nome, email, senha, foto) {
    super(IDUsuario, nome, email, senha, foto, "Administrador");
    this.AdministradorModel = new AdministradorModel();
  }

  //#region CRUD Usuarios
  async criarUsuario(req, res) {
    const { nome, email, senha, contato, tipoUsuario } = req.body;

    const salto = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salto);

    if (!nome || !email || !senha) {
      return res
        .status(422)
        .json({ msg: "Campos obrigatórios não preenchidos!" });
    }

    // Verificar se o email já está cadastrado
    const nivel_acessoFinal = tipoUsuario || "Administrador";

    try {
      const caminhoArquivo = req.file ? req.file.path : "Sem foto";
      this.AdministradorModel.verificarEmail(email, (err, results) => {
        if (err) {
          console.log("Erro ao tentar cadastrar usuário: ", err);
          return res
            .status(500)
            .json({ msg: "Erro interno do servidor ao cadastrar usuário!" });
        }

        if (results.length > 0) {
          return res.status(422).json({ msg: "Email invalido!" });
        }

        this.AdministradorModel.criarUsuario(
          {
            nome,
            email,
            senha: senhaHash,
            foto: caminhoArquivo,
            contato,
            tipoUsuario: nivel_acessoFinal,
          },
          (err, results) => {
            if (err) {
              console.log("Erro ao tentar cadastrar usuário: ", err);
              return res.status(500).json({
                msg: "Erro interno do servidor ao cadastrar usuário!",
              });
            }

            console.log("Cadastrado com sucesso!");
            return res.json({
              id_usuario: results.insertId,
              nome,
              email,
              contato,
              tipoUsuario,
              foto: caminhoArquivo,
            });
          }
        );
      });
    } catch (error) {
      console.error("Erro ao Adicionar dados do motorista:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  async listarUsuario(req, res) {
    this.AdministradorModel.listarUsuario((err, results) => {
      if (err) {
        console.log("erro ao tentar ver usuarios!");
      }

      if (results.length === 0) {
        return res.status(422).json({ msg: "Não há usuário cadastrado!" });
      }

      res.json(results);
    });
  }

  atualizarUsuario(req, res) {
    const { IDUsuario } = req.params;
    const { nome, email, contato } = req.body;
    const caminhoArquivo = req.file ? req.file.filename : "Sem foto";

    try {
      if (nome) {
        this.AdministradorModel.atualizarNome(
          IDUsuario,
          nome,
          (err, results) => {
            if (err) {
              console.log(`Erro ao atualizar o nome do usuário ${IDUsuario}`);
              return res
                .status(500)
                .json({ msg: "Erro ao atualizar o nome do usuário" });
            }
          }
        );
      }
      if (email) {
        this.AdministradorModel.atualizarEmail(
          IDUsuario,
          email,
          (err, results) => {
            if (err) {
              console.log(`Erro ao atualizar o email do usuário ${IDUsuario}`);
              return res
                .status(500)
                .json({ msg: "Erro ao atualizar o email do usuário" });
            }
          }
        );
      }
      if (caminhoArquivo) {
        this.AdministradorModel.atualizarFoto(
          IDUsuario,
          caminhoArquivo,
          (err, results) => {
            if (err) {
              console.log(`Erro ao atualizar a foto do usuário ${IDUsuario}`);
              return res
                .status(500)
                .json({ msg: "Erro ao atualizar a foto do usuário" });
            }
          }
        );
      }
      if (contato) {
        this.AdministradorModel.atualizarContato(
          IDUsuario,
          contato,
          (err, results) => {
            if (err) {
              console.log(
                `Erro ao atualizar o contato do usuário ${IDUsuario}`
              );
              return res
                .status(500)
                .json({ msg: "Erro ao atualizar o contato do usuário" });
            }
          }
        );
      }
      res.status(200).json({ msg: "Usuário atualizado com sucesso" });
    } catch (err) {
      console.error("Erro ao atualizar dados do usuário:", err);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  async excluirUsuario(req, res) {
    const { IDUsuario } = req.params;
    this.AdministradorModel.excluirUsuario(IDUsuario, (err, results) => {
      if (err) {
        console.error(`Erro ao excluir usuário ${IDUsuario}:`, err);
        return res.status(500).json({ error: "Erro ao excluir usuário" });
      }
      res.json({ message: "Registro excluido com sucesso" });
    });
  }
  //#endregion

  //#region CRUD Veiculos
  adicionarVeiculo(req, res) {
    const {
      Marca,
      Modelo,
      Ano,
      Placa,
      QuilometragemAtual,
      DataUltimaManutencao,
      Status,
      CombustivelAtual,
      TipoCombustivel,
      CapacidadeTanque,
    } = req.body;

    if (
      !Marca ||
      !Modelo ||
      !Ano ||
      !Placa ||
      !QuilometragemAtual ||
      !DataUltimaManutencao ||
      !Status ||
      !CombustivelAtual ||
      !TipoCombustivel ||
      !CapacidadeTanque
    ) {
      return res
        .status(422)
        .json({ msg: "Campos obrigatórios não preenchidos!" });
    }

    // Verificar se a placa já existe
    this.AdministradorModel.VerificarPlaca(Placa, (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ msg: "Erro interno do servidor ao verificar placa!" });
      }

      if (results.length) {
        console.log(results);
        return res.status(422).json({ msg: "Placa já existe!" });
      }
      this.AdministradorModel.adicionarVeiculo(
        Marca,
        Modelo,
        Ano,
        Placa,
        QuilometragemAtual,
        DataUltimaManutencao,
        Status,
        CombustivelAtual,
        TipoCombustivel,
        CapacidadeTanque,
        (err, results) => {
          if (err) {
            console.error(err);
            console.log(Marca, " V ", Modelo);
            return res
              .status(500)
              .json({ msg: "Erro interno do servidor ao cadastrar veiculo!" });
          }

          console.log("Cadastrado com sucesso!");
          return res.json({
            IDVeiculo: results.insertId,
            Marca,
            Modelo,
            Ano,
            Placa,
            QuilometragemAtual,
            DataUltimaManutencao,
            Status,
            CombustivelAtual,
            TipoCombustivel,
            CapacidadeTanque,
          });
        }
      );
    });
  }

  editarVeiculo(req, res) {
    const { IDVeiculo } = req.params;
    const informacoesVeiculo = req.body;

    this.AdministradorModel.editarVeiculo(
      IDVeiculo,
      informacoesVeiculo,
      (err, results) => {
        if (err) {
          console.error(`Erro ao editar veículo: ${err}`);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }

        res.json({ message: "Veículo editado com sucesso" });
      }
    );
  }

  excluirVeiculo(req, res) {
    const { IDVeiculo } = req.params;
    this.AdministradorModel.excluirVeiculo(IDVeiculo, (err, results) => {
      if (err) {
        console.error(`Erro ao excluir veículo: ${err}`);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }
      res.json({ message: "Veículo excluído com sucesso" });
    });
  }

  atribuirVeiculoAMotorista(req, res) {
    const { IDVeiculo, IDMotorista } = req.body;

    this.AdministradorModel.atribuirVeiculoAMotorista(
      IDVeiculo,
      IDMotorista,
      (err, results) => {
        if (err) {
          console.error(
            `Erro ao atribuir veículo ${IDVeiculo} ao motorista ${IDMotorista}`
          );
          return res.status(500).json({
            message:
              "Erro interno do servidor ao atribuir veículo a motorista!",
          });
        } else {
          res
            .status(200)
            .json({ message: "Veículo atribuído ao motorista com sucesso" });
        }
      }
    );
  }

  removerVeiculoAtribuido(req, res) {
    const { IDVeiculo, IDMotorista } = req.params;

    this.AdministradorModel.removerAtribuicaoVeiculo(
      IDVeiculo,
      IDMotorista,
      (err, results) => {
        if (err) {
          console.error(`Erro ao remover veículo atribuído: ${err}`);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }

        return res
          .status(200)
          .json({ message: "Veículo removido com sucesso" });
      }
    );
  }

  visualizarVeiculoMotorista(req, res) {
    const { IDMotorista } = req.params;
    this.AdministradorModel.visualizarVeiculoMotorista(
      IDMotorista,
      (err, results) => {
        if (err) {
          console.log("erro ao tentar ver motorista!");
        }

        return res.status(200).json({ message: "Nenhum veículo atribuido" });
      }
    );
  }

  //#endregion

  //#region Motorista
  ListarMotorista(req, res) {
    this.AdministradorModel.ListarMotorista((err, results) => {
      if (err) {
        console.log("erro ao tentar ver motorista!");
      }
      if (results.length === 0) {
        return res.status(422).json({ msg: "Não há motoristas cadastradas!" });
      }
      res.json(results);
    });
  }

  //#endregion

  //#region Tecnico de Manutenção

  AdicionarTecnico(req, res) {
    const { nome, contato, especialidade } = req.body;
    this.AdministradorModel.AdicionarTecnico(
      nome,
      contato,
      especialidade,
      (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: "Erro ao cadastrar tecnico de manutenção" });
        }
        res.json({ IDTecnico: results.insertId, nome, contato, especialidade });
      }
    );
  }
  ListarTecnico(req, res) {
    this.AdministradorModel.ListarTecnico((err, results) => {
      if (err) {
        console.log("erro ao tentar ver tecnico de manutenção!");
      }
      if (results.length === 0) {
        return res
          .status(422)
          .json({ msg: "Não há tecnicos de manutenção cadastrados!" });
      }
      res.json(results);
    });
  }

  EditarTecnico(req, res) {
    const { IDTecnico } = req.params;
    const { nome, contato, especialidade } = req.body;
    this.AdministradorModel.EditarTecnico(
      IDTecnico,
      nome,
      contato,
      especialidade,
      (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: "Erro ao editar tecnico de manutenção" });
        }
        res.json({ message: "Tecnico de manutenção editado com sucesso" });
      }
    );
  }
  ExcluirTecnico(req, res) {
    const { IDTecnico } = req.params;
    this.AdministradorModel.RemoverTecnico(IDTecnico, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ msg: "Erro ao excluir tecnico de manutenção" });
      }
      res.json({ message: "Tecnico de manutenção excluído com sucesso" });
    });
  }

  ListarTecnicoDeManutencao(req, res) {
    this.AdministradorModel.ListarTecnicoManutencao((err, results) => {
      if (err) {
        console.log("erro ao tentar ver tecnico de manutenção!");
      }
      if (results.length === 0) {
        return res
          .status(422)
          .json({ msg: "Não há tecnicos de manutenção cadastrados!" });
      }
      res.json(results);
    });
  }

  ListarServico(req, res) {
    this.AdministradorModel.ListarServico((err, results) => {
      if (err) {
        console.log("erro ao tentar ver Servicos!");
      }
      if (results.length === 0) {
        return res.status(422).json({ msg: "Não há Servicos!" });
      }
      res.json(results);
    });
  }

  RealizarManutencao(req, res) {
    const {
      DataFim,
      Descricao,
      TipoManutencao,
      CustoPecas,
      CustoToTal,
      IDVeiculo,
      IDUsuario,
      IDTecnico,
    } = req.body;
    this.AdministradorModel.RealizarManutencao(
      DataFim,
      Descricao,
      TipoManutencao,
      CustoPecas,
      CustoToTal,
      IDVeiculo,
      IDUsuario,
      IDTecnico,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Erro ao realizar manutenção" });
        }
        res.json({
          IDManutencao: results.insertId,
          DataFim,
          Descricao,
          TipoManutencao,
          CustoPecas,
          CustoToTal,
          IDVeiculo,
          IDUsuario,
          IDTecnico,
        });
      }
    );
  }

  CriarOrdem(req, res) {
    const { DataInicio, DataFim, Descricao, IDVeiculo, IDTecnico } = req.body;

    this.AdministradorModel.CriarOrdem(
      DataInicio,
      DataFim,
      Descricao,
      IDVeiculo,
      IDTecnico,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Erro ao criar ordem" });
        }
        res.json({
          IDOS: results.insertId,
          DataInicio,
          DataFim,
          Descricao,
          IDVeiculo,
          IDTecnico,
        });
      }
    );
  }

  ListaOrdem(req, res) {
    this.AdministradorModel.ListaOrdem((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Erro ao listar Ordem!" });
      }
      if (results.length === 0) {
        return res.status(422).json({ msg: "Nenhuma Ordem Agendada!" });
      }

      res.json(results);
    });
  }

  FecharOrdem(req, res) {
    const { IDOS } = req.params;
    this.AdministradorModel.FecharOrdem(IDOS, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Erro ao fechar ordem!" });
      }
      res.json(results);
    });
  }

  ImprimirOrdem(req, res) {
    const { IDOS } = req.params;
    this.AdministradorModel.ImprimirOrdem(IDOS, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Erro ao imprimir ordem!" });
      }
      res.json(results);
    });
  }

  visualizarStatusEHistorico(req, res) {
    const { IDVeiculo } = req.params;
    this.AdministradorModel.visualizarHistoricoManutencoes(
      IDVeiculo,
      (err, results) => {
        if (err) {
          return res.status(500).json({ msg: "Erro ao verificar historia" });
        }
        if (results.length === 0) {
          return res
            .status(422)
            .json({ msg: "Não há manutenções cadastradas!" });
        }
        res.json(results);
      }
    );
  }

  visualizarVeiculo(req, res) {
    const { IDVeiculo } = req.params;
    this.AdministradorModel.visualizarVeiculo(IDVeiculo, (err, results) => {
      if (err) {
        return res.status(500).json({ msg: "Erro ao verificar veiculo" });
      }
      if (results.length === 0) {
        return res.status(422).json({ msg: "Não há veiculos cadastrados!" });
      }
      res.json(results);
    });
  }
  //#endregion

  //#region Frotas

  RelatorioManutencao(req, res) {
    this.AdministradorModel.RelatorioManutencao((err, results) => {
      if (err) {
        console.error("Erro ao gerar relatório de manutenção:", err);
        return res.status(500).json({
          message: "Erro interno do servidor ao gerar relatório de manutenção",
        });
      }
      if (results.length === 0) {
        return res.status(422).json({ msg: "Não há relatórios geral!" });
      }
      return res.json(results);
    });
  }

  RelatorioGeral(req, res) {
    this.AdministradorModel.RelatorioGeral((err, results) => {
      if (err) {
        console.error("Erro ao gerar relatório geral:", err);
        return res.status(500).json({
          message: "Erro interno do servidor ao gerar relatório geral",
        });
      }
      if (results.length === 0) {
        return res.status(422).json({ msg: "Não há relatórios geral!" });
      }
      return res.json(results);
    });
  }
  RelatorioAbastecimento(req, res) {
    this.AdministradorModel.RelatorioAbastecimento((err, results) => {
      if (err) {
        console.error("Erro ao gerar relatório de abastecimento:", err);
        return res.status(500).json({
          message:
            "Erro interno do servidor ao gerar relatório de abastecimento",
        });
      }
      if (results.length === 0) {
        return res.status(422).json({ msg: "Não há relatórios geral!" });
      }
      return res.json(results);
    });
  }
  //#endregion
}

module.exports = AdministradorController;
