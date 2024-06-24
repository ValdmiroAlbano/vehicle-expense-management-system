const TecnicoManutencaoModel = require('../../models/Tecnico_Manutecao/tecnicoManutencao');
const UsuarioController = require('../Usuario/usuarioController');

class TecnicoManutencaoController extends UsuarioController{
    constructor(IDUsuario, nome, email, senha, foto, Especialidade , contato) {
        super(IDUsuario, nome, email, senha, foto, 'TecnicoManutencao');
        this.Especialidade  = Especialidade ;
        this.contato = contato;
        this.tecnicoManutencaoModel = new TecnicoManutencaoModel();
    }
    
    async visualizarDetalhesTarefa(req, res) {
        const IDManutencao = req.params.IDManutencao;
    
        this.tecnicoManutencaoModel.visualizarDetalhesTarefa(IDManutencao, (err, resultados) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor ao visualizar detalhes da tarefa.' });
          }
          res.json(resultados);
        });
    }
    
    async registrarManutencaoRealizada(req, res) {
        const {IDManutencao} = req.params;
        const Detalhes = req.body;

        const DataInicio = Detalhes.DataInicio.split('/').reverse().join('-');
        const dataFinal = Detalhes.DataFim.split('/').reverse().join('-');
        Detalhes.DataInicio = DataInicio;
        Detalhes.DataFim = dataFinal;
        this.tecnicoManutencaoModel.registrarManutencaoRealizada(IDManutencao, Detalhes, (err, resultados) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor ao registrar manutenção realizada.' });
          }
    
          res.json({ message: 'Manutenção registrada como concluída com sucesso.' });
        });
    }
       
    async visualizarStatusVeiculos(req, res) {
        this.tecnicoManutencaoModel.visualizarStatusVeiculos((err, resultados) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor ao visualizar status dos veículos.' });
          }
          if(resultados.length === 0){
            return res.status(404).json({ error: 'Não há veículos para Manutencao.' });
          }
    
          res.json(resultados);
        });
    }
    
    async atualizarStatusVeiculo(req, res) {
        const IDVeiculo = req.params.IDVeiculo;
        const Status = req.body.Status;
    
        this.tecnicoManutencaoModel.atualizarStatusVeiculo(IDVeiculo, Status, (err, resultados) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor ao atualizar status do veículo.' });
          }
    
          res.json({ message: 'Status do veículo atualizado com sucesso.' });
        });
    }

}

module.exports = TecnicoManutencaoController;