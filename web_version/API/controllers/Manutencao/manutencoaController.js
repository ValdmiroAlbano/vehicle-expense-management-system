const manutencaoModel = require('../../models/Manutencao/ManutencaoModel');

class manutencaoController{
   constructor(){
    this.manutencaoModel = new manutencaoModel();
   }

  visualizarTarefasAgendadas(req, res) {
        const IDUsuario = req.params.IDUsuario;
    
        this.manutencaoModel.visualizarTarefasAgendadas(IDUsuario, (err, resultados) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor ao visualizar tarefas agendadas.' });
          }
    
          res.json(resultados);
        });
  }

  TotalDecustoPorManutencao(req, res){
      const {IDVeiculo} = req.params;
      
      this.manutencaoModel.TotalGastoManutencaoPorVeiculo(IDVeiculo, (err, results) => {
        if(err){
          console.error(err);
          return res.status(500).json({ error: 'Erro interno do servidor ao visualizar tarefas agendadas.' });
        }

        res.json(results);
      });
  }

  VeiculosIdManutencao(req, res){
      const {idVeiculo} = req.params;
      this.manutencaoModel.veiculoIdMAnutencao(idVeiculo, (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ msg: 'Erro interno do servidor ao listar veículos!' });
          }
          return res.json(results);
      })
  }

  DadosGraficos(req, res){
    this.manutencaoModel.DadosGraficos((err, results) => {
      if(err){
        console.error(err);
        return res.status(500).json({ msg: 'Erro interno do servidor ao gerar dados para o grafico!' });
      }
      return res.json(results);
    })
  }

  AllReport(req, res){
    this.manutencaoModel.AllReport((err, results) => {
      if(err){
        console.error(err);
        return res.status(500).json({ msg: 'Erro interno do servidor!' });
      }
      return res.json(results);
    })
  }

  estadoReportAgendada(req, res){
    const {id_relatorio_problema}  = req.params;
    const {id_order_servico} = req.body;
    this.manutencaoModel.estadoReportAgendada(id_order_servico, id_relatorio_problema, (err, resultado) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor ao relatar problema." });
      }
      res.json(resultado);
    })
  } 

  estadoReportEmProgresso(req, res){
    const {id_order_servico}  = req.params;
    this.manutencaoModel.estadoReportEmProgresso(id_order_servico, (err, resultado) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor ao relatar problema." });
      }
      res.json(resultado);
    })
  }
  
  estadoReportConcluida(req, res){
    const {id_order_servico}  = req.params;
    this.manutencaoModel.estadoReportConcluida(id_order_servico, (err, resultado) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor ao relatar problema." });
      }
      res.json(resultado);
    })
  }

  //Ordem se serviço
  OrdemAgendadas(req, res){
    this.manutencaoModel.OrdemAgendadas((err, results) => {
      if(err){
        console.error(err);
        return res.status(500).json({ msg: 'Erro interno do servidor' });
      }
      return res.json(results);
    })
  }

  OrdemConcluidas(req, res){
    this.manutencaoModel.OrdemConcluidas((err, results) => {
      if(err){
        console.error(err);
        return res.status(500).json({ msg: 'Erro interno do servidor' });
      }
      return res.json(results);
    })
  }

  OrdemEmProgresso(req, res){
    this.manutencaoModel.OrdemEmProgresso((err, results) => {
      if(err){
        console.error(err);
        return res.status(500).json({ msg: 'Erro interno do servidor' });
      }
      return res.json(results);
    })
  }
}

module.exports = manutencaoController;