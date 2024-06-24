// models/TecnicoManutencaoModel.js
const conexao = require("../../configs/db");

class TecnicoManutencaoModel {
    constructor(){
        conexao.connect(err =>{
            if(err){
                console.log('Erro ao conectar ao banco: ', err);
            }else{
                console.log('Tecnico de Manutencao conexao com banco bem-sucedida!');
            }
        })
    }

    visualizarDetalhesTarefa(IDManutencao, callback) {
        const sql = 'SELECT m.*, v.Marca, v.Modelo, v.Placa FROM tb_manutencoes m INNER JOIN tb_veiculos v ON m.IDVeiculo = v.IDVeiculo WHERE m.IDManutencao = ?';
        conexao.query(sql, [IDManutencao], callback);
    }

    registrarManutencaoRealizada(IDManutencao, detalhes, callback) {
        const sql = 'UPDATE tb_manutencoes SET DataInicio = ?, DataFim = ?, Descricao = ?, Custo = ?, Status = "Concluida" WHERE IDManutencao = ?';
        conexao.query(sql, [detalhes.DataInicio, detalhes.DataFim, detalhes.Descricao, detalhes.Custo, IDManutencao], callback);
    }      
    
    visualizarStatusVeiculos(callback) {
        const sql = 'SELECT * FROM tb_veiculos WHERE Status = "EmManutencao"';
        conexao.query(sql, callback);
    }

    atualizarStatusVeiculo(IDVeiculo, novoStatus, callback) {
        const sql = 'UPDATE tb_veiculos SET Status = ? WHERE IDVeiculo = ?';
        conexao.query(sql, [novoStatus, IDVeiculo], callback);
    }






}

module.exports = TecnicoManutencaoModel;
