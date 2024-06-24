const AbastecimentoModel = require('../../models/Abastecimento/abastecimentoModel');

class AbastecimentoController{
    constructor(){
        this.AbastecimentoModel = new AbastecimentoModel();
    }
    
    visualizarDespesas(req, res) {
        const id_motorista = req.params.id_motorista; 
      
        this.AbastecimentoModel.visualizarDespesas(id_motorista, (err, resultados) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor ao visualizar despesas.' });
          }
      
          if (resultados.length === 0){
            return res.status(404).json({ message: 'Nenhuma despesa cadastrada para este motorista.' });
          }
      
          res.json(resultados);
        });
      }

      ListarAbastecimentoPorId(req, res){
        const{idVeiculo} = req.params;
        this.AbastecimentoModel.listarAbastecimentoPorId(idVeiculo, (err, results) => {
          if(err){
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor ao visualizar despesas.' });
          }
          res.json(results);
        })
      }
}
module.exports = AbastecimentoController;