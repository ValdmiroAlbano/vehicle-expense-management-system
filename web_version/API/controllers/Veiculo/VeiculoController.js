const veiculoModel = require('../../models/Veiculo/veiculoModel')
class veiculoController{
    constructor(){
        this.veiculoModel = new veiculoModel();
    }
    async listarVeiculos(req, res) {
        
        this.veiculoModel.listarVeiculos((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Erro interno do servidor ao listar veículos!' });
            }
            if(results.length === 0){
                return res.status(422).json({ msg: 'Não há veículos cadastrados!' });
            }
    
            return res.json(results);
        });
    }

    listarMotoristaVeiculo(req, res){
        const {idVeiculo} = req.params;
        this.veiculoModel.listarMotoristaVeiculo(idVeiculo, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Erro interno do servidor ao listar veículos!' });
            }
            if(results.length === 0){
                return res.status(200).json({ msg: 'Não há veículos cadastrados!' });
            }
            return res.json(results);
        })
    }

}

module.exports = veiculoController;