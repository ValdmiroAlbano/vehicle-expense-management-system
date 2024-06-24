const conexao = require("../../configs/db");

class veiculoModel{
    constructor(marca, modelo, ano, placa, quilometragemAtual, dataUltimaManutencao, status, combustivelAtual, tipoCombustivel, capacidadeTanque){
        this.marca = marca;
        this.modelo = modelo, 
        this.ano = ano;
        this. placa = placa;
        this.quilometragemAtual = quilometragemAtual;
        this.dataUltimaManutencao = dataUltimaManutencao;
        this.status = status;
        this.combustivelAtual = combustivelAtual;
        this.tipoCombustivel = tipoCombustivel;
        this.capacidadeTanque = capacidadeTanque;
    }

    listarVeiculos(callback) {
        const sql = 'SELECT * FROM tb_veiculos';
        conexao.query(sql, callback);
    }

    listarMotoristaVeiculo(idVeiculo, callback){
        const sql = 'SELECT nome FROM tb_usuario u INNER JOIN tb_veiculo_motorista vm ON u.IDUsuario = vm.IDMotorista WHERE vm.IDVeiculo = ?';
        conexao.query(sql, [idVeiculo], callback);
    }

}
module.exports = veiculoModel;