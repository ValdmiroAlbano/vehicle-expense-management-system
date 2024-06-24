const conexao = require("../../configs/db");

class abastecimentoModel{
    constructor(tipo, posto, endereco, tipoCombustivel, litros, preco){
        this.tipo = tipo;
        this.posto = posto;
        this.endereco = endereco;
        this.tipoCombustivel = tipoCombustivel;
        this.litros = litros;
        this.preco = preco;
    }


    visualizarDespesas(id_motorista, callback) {
        const sql = 'SELECT a.* FROM tb_abastecimento a JOIN tb_veiculo_motorista vm ON a.id_veiculo = vm.IDVeiculo WHERE vm.IDMotorista = ?';
        conexao.query(sql, [id_motorista], callback);
    }

    listarAbastecimentoPorId(idVeiculo, callback){
        const sql = 'SELECT *, SUM(custo) AS total_abastecidos FROM tb_abastecimento WHERE id_veiculo = ? GROUP BY id_abastecimento';
        conexao.query(sql, [idVeiculo], callback);
    }
}

module.exports =  abastecimentoModel;