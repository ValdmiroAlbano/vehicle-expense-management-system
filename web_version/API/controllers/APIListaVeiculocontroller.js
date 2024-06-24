const listaveiculosModel = require('../models/APIListaVeiculosModel')


class ListaVeiculosController
{
   constructor(){
    this.listaveiculos = new listaveiculosModel();
   }
    allVeiculos(req, res){
        this.listaveiculos.allVeiculos((erro, result) =>{
            if(erro){
                return res.status(500).json("Erro ao liatar veiculos!");
            }
            res.json(result);
        })
    }
}

module.exports = ListaVeiculosController;