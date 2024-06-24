const conexao = require("../../configs/db");

class MotoristaModel {
    constructor(){
        conexao.connect(err =>{
            if(err){
                console.log('Erro ao conectar ao banco: ', err);
            }else{
                console.log('Motorista conexao com banco bem-sucedida!');
            }
        })
    }
    getMotorista(IDUsuario, callback) {
        const sql = 'SELECT * FROM tb_usuario WHERE IDUsuario = ? AND tipoUsuario = "Motorista"';
        conexao.query(sql, [IDUsuario], callback);
    }
    visualizarVeiculosAtribuidos(IDUsuario, callback) {
        const sql = ' SELECT v.* FROM tb_veiculos v INNER JOIN tb_veiculo_motorista vm ON v.IDVeiculo = vm.IDVeiculo INNER JOIN tb_usuario u ON vm.IDMotorista = u.IDUsuario WHERE u.IDUsuario = ?';
        conexao.query(sql, [IDUsuario], callback);
    }
    
    registrarDespesa(postoNome, endereco, tipoCombustivel, litrosAbastecidos, custo, id_veiculo, id_motorista, callback) {
    const sql = 'INSERT INTO tb_abastecimento (postoNome, endereco, tipoCombustivel, litrosAbastecidos, custo, id_veiculo) SELECT ?, ?, ?, ?, ?, ? FROM tb_veiculo_motorista WHERE IDMotorista = ?';
    conexao.query(sql, [postoNome, endereco, tipoCombustivel, litrosAbastecidos, custo, id_veiculo, id_motorista], callback);
    }
    visualizarDetalhesVeiculo(IDVeiculo, callback) {
        const sql = 'SELECT * FROM tb_veiculos WHERE IDVeiculo = ?';
        conexao.query(sql, [IDVeiculo], callback);
    }


    reportarProblema(id_motorista, id_veiculo,descricao_problema , callback) {
        const sql = 'INSERT INTO tb_relatorio_problemas (id_motorista, id_veiculo, descricao_problema) SELECT ?, ?, ? FROM tb_veiculo_motorista WHERE IDMotorista = ?';
        conexao.query(sql, [id_motorista, id_veiculo, descricao_problema, id_motorista], callback);
    }
    listaReclamacoes(id_motorista, callback){
        const sql = 'SELECT * FROM tb_relatorio_problemas WHERE id_motorista = ?';
        conexao.query(sql,[id_motorista], callback );
    }


    
}

module.exports = MotoristaModel;
