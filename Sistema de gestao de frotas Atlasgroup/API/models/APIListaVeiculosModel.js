const conexao = require("../configs/db")
class ListaVeiculosModel{

    allVeiculos(callback){
        const sql = `SELECT * FROM tb_listaVeiculos`;
        conexao.query(sql, callback);
    }
}

module.exports = ListaVeiculosModel;